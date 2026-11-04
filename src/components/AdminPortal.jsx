import React, { useState, useEffect, useMemo } from 'react';

const DEFAULT_PIN = 'kaffs2026';

export default function AdminPortal({ onExit }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('kaffs_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('kaffs_admin_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'UNDELIVERED' | 'DELIVERED'
  const [copiedId, setCopiedId] = useState(null);

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_address: '',
    customer_city: '',
    customer_pincode: '',
    items: '1x Pack of 5 (Cool Mint)',
    amount: '229',
    delivery_status: 'UNDELIVERED',
    notes: '',
  });

  // Fetch orders from API on authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchServerOrders();
    }
  }, [isAuthenticated]);

  // Persist to localStorage whenever orders update
  useEffect(() => {
    localStorage.setItem('kaffs_admin_orders', JSON.stringify(orders));
  }, [orders]);

  const fetchServerOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/orders?pin=${DEFAULT_PIN}`, {
        headers: { 'x-admin-pin': DEFAULT_PIN },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          // Merge server orders with local orders (preserving newer local edits)
          setOrders((prevLocal) => {
            const mergedMap = new Map();
            // Start with server orders
            data.orders.forEach((o) => mergedMap.set(o.id, o));
            // Layer in local orders (if local was modified)
            prevLocal.forEach((o) => {
              if (!mergedMap.has(o.id)) {
                mergedMap.set(o.id, o);
              } else {
                // If local has newer status, keep local
                const serverOrder = mergedMap.get(o.id);
                mergedMap.set(o.id, { ...serverOrder, ...o });
              }
            });
            return Array.from(mergedMap.values());
          });
        }
      }
    } catch (err) {
      console.warn('Could not sync with server orders, using local storage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setAuthError('');
      if (rememberMe) {
        localStorage.setItem('kaffs_admin_auth', 'true');
      }
    } else {
      setAuthError('Incorrect PIN. Please re-enter founder security PIN.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kaffs_admin_auth');
  };

  // Toggle Delivery Status (Delivered <-> Undelivered)
  const toggleDeliveryStatus = async (orderId) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    const newStatus = target.delivery_status === 'DELIVERED' ? 'UNDELIVERED' : 'DELIVERED';

    // Update locally immediately
    const updated = orders.map((o) => (o.id === orderId ? { ...o, delivery_status: newStatus } : o));
    setOrders(updated);

    // Sync to server in background
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': DEFAULT_PIN,
        },
        body: JSON.stringify({ id: orderId, delivery_status: newStatus }),
      });
    } catch (err) {
      console.warn('Failed to sync delivery status to server:', err);
    }
  };

  // Delete Order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to delete order ${orderId}? This cannot be undone.`)) {
      return;
    }

    setOrders((prev) => prev.filter((o) => o.id !== orderId));

    try {
      await fetch(`/api/orders?id=${orderId}&pin=${DEFAULT_PIN}`, {
        method: 'DELETE',
        headers: { 'x-admin-pin': DEFAULT_PIN },
      });
    } catch (err) {
      console.warn('Failed to delete on server:', err);
    }
  };

  // Save (Create or Edit) Order
  const handleSaveOrder = async (e) => {
    e.preventDefault();
    const orderId = formData.id || `KAFFS-${Date.now()}`;
    const fullAddress = [formData.customer_address, formData.customer_city, formData.customer_pincode]
      .filter(Boolean)
      .join(', ');

    const orderObj = {
      ...formData,
      id: orderId,
      full_address: fullAddress,
      amount: Number(formData.amount) || 229,
      created_at: editingOrder?.created_at || new Date().toISOString(),
      payment_status: 'PAID',
    };

    setOrders((prev) => {
      const idx = prev.findIndex((o) => o.id === orderId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = orderObj;
        return copy;
      }
      return [orderObj, ...prev];
    });

    setIsModalOpen(false);
    setEditingOrder(null);

    // Sync to server
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': DEFAULT_PIN,
        },
        body: JSON.stringify(orderObj),
      });
    } catch (err) {
      console.warn('Could not sync created order to server:', err);
    }
  };

  const openAddModal = () => {
    setEditingOrder(null);
    setFormData({
      id: `KAFFS-${Date.now()}`,
      customer_name: '',
      customer_phone: '',
      customer_email: '',
      customer_address: '',
      customer_city: '',
      customer_pincode: '',
      items: '1x Pack of 5 (Cool Mint)',
      amount: '229',
      delivery_status: 'UNDELIVERED',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setFormData({
      id: order.id,
      customer_name: order.customer_name || '',
      customer_phone: order.customer_phone || '',
      customer_email: order.customer_email || '',
      customer_address: order.customer_address || '',
      customer_city: order.customer_city || '',
      customer_pincode: order.customer_pincode || '',
      items: order.items || '1x Pack of 5 (Cool Mint)',
      amount: String(order.amount || '229'),
      delivery_status: order.delivery_status || 'UNDELIVERED',
      notes: order.notes || '',
    });
    setIsModalOpen(true);
  };

  // Copy Courier Ready Label
  const copyCourierLabel = (order) => {
    const text = `SHIP TO:\nName: ${order.customer_name}\nPhone: ${order.customer_phone}\nAddress: ${order.full_address || `${order.customer_address}, ${order.customer_city} - ${order.customer_pincode}`}\nItems: ${order.items}\nPayment: Prepaid (₹${order.amount})\nRef: ${order.id}`;
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (orders.length === 0) {
      alert('No orders to export yet.');
      return;
    }

    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone Number',
      'Email',
      'Delivery Address',
      'City',
      'Pincode',
      'Items Ordered',
      'Amount (INR)',
      'Delivery Status',
      'Notes',
    ];

    const rows = orders.map((o) => [
      `"${o.id || ''}"`,
      `"${new Date(o.created_at || Date.now()).toLocaleDateString()}"`,
      `"${(o.customer_name || '').replace(/"/g, '""')}"`,
      `"${(o.customer_phone || '').replace(/"/g, '""')}"`,
      `"${(o.customer_email || '').replace(/"/g, '""')}"`,
      `"${(o.customer_address || o.full_address || '').replace(/"/g, '""')}"`,
      `"${(o.customer_city || '').replace(/"/g, '""')}"`,
      `"${(o.customer_pincode || '').replace(/"/g, '""')}"`,
      `"${(o.items || '').replace(/"/g, '""')}"`,
      o.amount || 229,
      o.delivery_status || 'UNDELIVERED',
      `"${(o.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kaffs_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.delivery_status !== 'DELIVERED').length;
  const deliveredOrders = orders.filter((o) => o.delivery_status === 'DELIVERED').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Status filter
      if (filterStatus === 'UNDELIVERED' && o.delivery_status === 'DELIVERED') return false;
      if (filterStatus === 'DELIVERED' && o.delivery_status !== 'DELIVERED') return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (o.customer_name || '').toLowerCase().includes(q) ||
        (o.customer_phone || '').toLowerCase().includes(q) ||
        (o.customer_city || '').toLowerCase().includes(q) ||
        (o.full_address || '').toLowerCase().includes(q) ||
        (o.id || '').toLowerCase().includes(q)
      );
    });
  }, [orders, filterStatus, searchQuery]);

  // 1. PIN GATE SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center p-4 selection:bg-cyan-400 selection:text-black">
        <div className="w-full max-w-md bg-[#0B0F19] border border-cyan-500/30 rounded-3xl p-8 sm:p-10 shadow-[0_0_80px_rgba(0,240,255,0.12)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto text-2xl font-black">
              🔒
            </div>
            <h1 className="text-2xl font-black font-heading text-white uppercase tracking-tight">
              FOUNDER DISPATCH HQ
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Restricted Portal • Enter PIN to access orders & delivery addresses
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 font-mono text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5 font-bold">
                Admin Security PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: kaffs2026)"
                className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                autoFocus
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 bg-black/40 text-cyan-400 focus:ring-0"
              />
              <label htmlFor="remember" className="text-xs text-slate-400 font-mono cursor-pointer">
                Keep me logged in on this browser
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-cyan-400 text-black font-mono font-black text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-98"
            >
              UNLOCK ORDER PORTAL ➔
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={onExit}
              className="text-xs text-slate-500 hover:text-white font-mono transition-colors cursor-pointer"
            >
              ← Return to Public Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 font-sans selection:bg-cyan-400 selection:text-black pb-20">
      
      {/* Top Founder Navigation */}
      <header className="sticky top-0 z-40 bg-[#080B12]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-black text-sm">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-white text-base tracking-tight uppercase">
                  KAFF'S DISPATCH HQ
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                  LIVE SECURED
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                Order Fulfillment • Courier Routing • Address Book
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={exportToCSV}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Download Excel / CSV format for shipping"
            >
              <span>📥</span>
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={onExit}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🌐</span>
              <span className="hidden sm:inline">View Store</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-mono transition-all cursor-pointer font-bold"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F19] border border-white/[0.08] space-y-1">
            <div className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
              Total Pre-Orders
            </div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-white">
              {totalOrders}
            </div>
            <div className="text-[10px] font-mono text-cyan-400">Founder Batch 001</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F19] border border-white/[0.08] space-y-1">
            <div className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
              Total Revenue
            </div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-400">
              ₹{totalRevenue}
            </div>
            <div className="text-[10px] font-mono text-slate-500">100% Cashfree Prepaid</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F19] border border-amber-500/30 space-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/5 rounded-full blur-xl" />
            <div className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
              ⏳ Pending Dispatch
            </div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-amber-300">
              {pendingOrders}
            </div>
            <div className="text-[10px] font-mono text-amber-400/80">Need Courier Booking</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F19] border border-emerald-500/30 space-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-400/5 rounded-full blur-xl" />
            <div className="text-[10px] sm:text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
              ✅ Delivered
            </div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-300">
              {deliveredOrders}
            </div>
            <div className="text-[10px] font-mono text-emerald-400/80">Successfully Fulfilled</div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F19] border border-white/[0.08] space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer name, phone, city, or order ID..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setFilterStatus('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === 'ALL' ? 'bg-cyan-400 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({totalOrders})
              </button>
              <button
                onClick={() => setFilterStatus('UNDELIVERED')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === 'UNDELIVERED'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pending ({pendingOrders})
              </button>
              <button
                onClick={() => setFilterStatus('DELIVERED')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === 'DELIVERED'
                    ? 'bg-emerald-400 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Delivered ({deliveredOrders})
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={openAddModal}
                className="px-4 py-2.5 rounded-xl bg-cyan-400 text-black font-mono font-black text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-400/20 active:scale-95"
              >
                <span>➕</span>
                <span>Add Order</span>
              </button>

              <button
                onClick={fetchServerOrders}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-all cursor-pointer"
                title="Refresh from server"
              >
                <span className={isLoading ? 'animate-spin inline-block' : ''}>🔄</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order List */}
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0B0F19] border border-white/[0.08] space-y-4">
            <div className="text-4xl">📦</div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No Orders Found</h3>
              <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                {searchQuery
                  ? 'No orders match your search query.'
                  : 'No orders recorded yet. When a customer checks out, their full address and order items appear here automatically.'}
              </p>
            </div>
            {!searchQuery && (
              <button
                onClick={openAddModal}
                className="px-5 py-3 rounded-full bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>➕ Add Existing / Offline Order</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isDelivered = order.delivery_status === 'DELIVERED';
              const cleanPhone = (order.customer_phone || '').replace(/\D/g, '').slice(-10);

              return (
                <div
                  key={order.id}
                  className={`p-5 sm:p-6 rounded-2xl bg-[#0B0F19] border transition-all space-y-4 ${
                    isDelivered
                      ? 'border-emerald-500/30 hover:border-emerald-500/50'
                      : 'border-amber-500/40 hover:border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.06)]'
                  }`}
                >
                  {/* Top Line: Order ID, Date & Status Toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-black text-cyan-400 text-sm tracking-wider">
                        {order.id}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(order.created_at || Date.now()).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        ₹{order.amount} • {order.payment_status || 'PAID'}
                      </span>
                    </div>

                    {/* BIG DELIVERED / UNDELIVERED STATUS TOGGLE */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleDeliveryStatus(order.id)}
                        className={`px-4 py-2 rounded-xl font-mono font-bold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 active:scale-95 ${
                          isDelivered
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-amber-400 text-black border border-amber-400 hover:bg-amber-300 font-black shadow-lg shadow-amber-400/20 animate-pulse'
                        }`}
                        title="Click to toggle status"
                      >
                        <span>{isDelivered ? '✅' : '⏳'}</span>
                        <span>{isDelivered ? 'STATUS: DELIVERED' : 'PENDING DISPATCH'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer & Address Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    
                    {/* Customer Info */}
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase text-slate-500 font-bold">Recipient:</div>
                      <div className="text-white font-bold text-sm">{order.customer_name || 'Customer'}</div>
                      <div className="text-slate-300 flex items-center gap-2">
                        <span>📞 +91 {cleanPhone || order.customer_phone}</span>
                      </div>
                      {order.customer_email && (
                        <div className="text-slate-400 text-[11px] truncate">✉️ {order.customer_email}</div>
                      )}
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-1 md:col-span-1">
                      <div className="text-[10px] uppercase text-slate-500 font-bold">Delivery Address:</div>
                      <div className="text-slate-200 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-white/5">
                        <span className="text-cyan-400 font-bold">📍 </span>
                        {order.full_address || order.customer_address ? (
                          <span>
                            {order.customer_address && `${order.customer_address}, `}
                            {order.customer_city && `${order.customer_city} `}
                            {order.customer_pincode && `- ${order.customer_pincode}`}
                          </span>
                        ) : (
                          <span className="text-amber-300 italic">
                            House address missing. WhatsApp customer to confirm flat number.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase text-slate-500 font-bold">Items & Pack:</div>
                      <div className="text-white font-bold bg-black/40 p-2.5 rounded-xl border border-white/5">
                        📦 {order.items || '1x Pack of 5 (Cool Mint)'}
                      </div>
                      {order.notes && (
                        <div className="text-[11px] text-slate-400 italic">
                          Note: {order.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2 flex-wrap">
                      
                      {/* Copy Courier Label Button */}
                      <button
                        onClick={() => copyCourierLabel(order)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Copy formatted shipping label for Shiprocket/Delhivery"
                      >
                        <span>{copiedId === order.id ? '✅' : '📋'}</span>
                        <span>{copiedId === order.id ? 'Copied to Clipboard!' : 'Copy Courier Label'}</span>
                      </button>

                      {/* WhatsApp Direct Customer Chat */}
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                            `Hi ${order.customer_name || 'there'}! 👋 This is Krish from KAFF'S Energy regarding your order #${order.id}. Your Batch 001 energy pouches are being packed for courier dispatch! ⚡`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>💬</span>
                          <span>WhatsApp Customer</span>
                        </a>
                      )}

                      {/* Edit Order */}
                      <button
                        onClick={() => openEditModal(order)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
                      >
                        ✏️ Edit Details
                      </button>
                    </div>

                    {/* Delete Order */}
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="px-2.5 py-1.5 text-[11px] font-mono text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete order record"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ADD / EDIT ORDER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B0F19] border border-cyan-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-lg font-black font-heading text-white uppercase tracking-tight">
                {editingOrder ? 'Edit Order Details' : 'Add New Order'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveOrder} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                  Order ID / Reference
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                    Phone Number (10 Digits)
                  </label>
                  <input
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    placeholder="9315060525"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                  Street Address / Flat / Floor / Building
                </label>
                <input
                  type="text"
                  value={formData.customer_address}
                  onChange={(e) => setFormData({ ...formData, customer_address: e.target.value })}
                  placeholder="e.g. Flat 402, Sunshine Heights, Cyber City"
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.customer_city}
                    onChange={(e) => setFormData({ ...formData, customer_city: e.target.value })}
                    placeholder="e.g. Gurgaon"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={formData.customer_pincode}
                    onChange={(e) => setFormData({ ...formData, customer_pincode: e.target.value })}
                    placeholder="122002"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                    Items & Quantity
                  </label>
                  <input
                    type="text"
                    value={formData.items}
                    onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                    placeholder="1x Pack of 5 (Cool Mint)"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                    Amount Paid (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="229"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-slate-400 block mb-1 font-bold">
                  Delivery Status
                </label>
                <select
                  value={formData.delivery_status}
                  onChange={(e) => setFormData({ ...formData, delivery_status: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono cursor-pointer"
                >
                  <option value="UNDELIVERED">⏳ UNDELIVERED (Pending Dispatch)</option>
                  <option value="DELIVERED">✅ DELIVERED (Fulfilled)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-mono font-black uppercase tracking-wider hover:bg-cyan-300 transition-all cursor-pointer shadow-lg shadow-cyan-400/20"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
