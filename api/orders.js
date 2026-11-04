// Serverless API for KAFF'S Energy Order Management & Admin Portal
const ADMIN_DEFAULT_PIN = process.env.ADMIN_PIN || 'kaffs2026';

// Pre-seeded with verified live Cashfree founder orders
const INITIAL_ORDERS = [
  {
    id: 'KAFFS-1793787713500',
    cf_order_id: '7356652287',
    created_at: '2026-11-04T15:51:54.000Z',
    customer_name: 'Shristi',
    customer_phone: '9971175639',
    customer_email: 'varmashristi@gmail.com',
    customer_address: '',
    customer_city: 'Ghaziabad',
    customer_pincode: '201002',
    full_address: 'Ghaziabad, 201002',
    items: '1x Pack of 5 (☕ Coffee Clash)',
    amount: 229,
    payment_status: 'PAID',
    delivery_status: 'UNDELIVERED',
    notes: 'Batch 001 Pre-Order: Ghaziabad, 201002 [5pk-Coffee Clash]',
  },
  {
    id: 'KAFFS-1793779000411',
    cf_order_id: '7355337297',
    created_at: '2026-11-04T13:26:41.000Z',
    customer_name: 'Abhishek Mehta',
    customer_phone: '9711882195',
    customer_email: 'abhimht9@gmail.com',
    customer_address: '',
    customer_city: 'Ghaziabad',
    customer_pincode: '201017',
    full_address: 'Ghaziabad, 201017',
    items: '1x Pack of 5 (❄️ Cool Mint)',
    amount: 229,
    payment_status: 'PAID',
    delivery_status: 'UNDELIVERED',
    notes: 'Batch 001 Pre-Order: Ghaziabad , 201017 [5pk-Cool Mint]',
  },
  {
    id: 'KAFFS-1793709401741',
    cf_order_id: '7348195259',
    created_at: '2026-11-03T18:06:42.000Z',
    customer_name: 'Vaibhav Tyagi',
    customer_phone: '7827328861',
    customer_email: 'vaibhavvatatyagi@gmail.com',
    customer_address: '',
    customer_city: 'Ghaziabad',
    customer_pincode: '201017',
    full_address: 'Ghaziabad, 201017',
    items: '1x Pack of 10 (☕ Coffee Clash)',
    amount: 399,
    payment_status: 'PAID',
    delivery_status: 'UNDELIVERED',
    notes: 'Batch 001 Pre-Order: GHAZIABAD, 201017 [10pk-Coffee Clash]',
  },
  {
    id: 'KAFFS-1793703151852',
    cf_order_id: '7347488441',
    created_at: '2026-11-03T16:22:32.000Z',
    customer_name: 'Krish Tyagi (Founder Order)',
    customer_phone: '9315060525',
    customer_email: 'krishtyagi260605@gmail.com',
    customer_address: 'Raj Nagar Extension',
    customer_city: 'Ghaziabad',
    customer_pincode: '201017',
    full_address: 'Raj Nagar Extension, Ghaziabad - 201017',
    items: '1x Pack of 5 (❄️ Cool Mint)',
    amount: 229,
    payment_status: 'PAID',
    delivery_status: 'UNDELIVERED',
    notes: 'Batch 001 Pre-Order: Raj Nagar Extension, 201017 [5pk-Cool Mint]',
  },
  {
    id: 'KAFFS-1793645103745',
    cf_order_id: '7340729294',
    created_at: '2026-11-03T00:15:04.000Z',
    customer_name: 'Krish Tyagi',
    customer_phone: '9315060525',
    customer_email: 'krishtyagi726@gmail.com',
    customer_address: '',
    customer_city: 'Ghaziabad',
    customer_pincode: '201017',
    full_address: 'Ghaziabad - 201017',
    items: '1x Pack of 5 (❄️ Cool Mint)',
    amount: 229,
    payment_status: 'PAID',
    delivery_status: 'UNDELIVERED',
    notes: 'Batch 001 Pre-Order: ghaziabad, 201017 [5pk-Cool Mint]',
  },
  {
    id: 'KAFFS-1793645014295',
    cf_order_id: '7340724624',
    created_at: '2026-11-03T00:13:35.000Z',
    customer_name: 'Krish Tyagi',
    customer_phone: '9315060525',
    customer_email: 'krishtyagi726@gmail.com',
    customer_address: '',
    customer_city: 'Ghaziabad',
    customer_pincode: '201017',
    full_address: 'Ghaziabad - 201017',
    items: '1x Pack of 10 (❄️ Cool Mint)',
    amount: 399,
    payment_status: 'PAID',
    delivery_status: 'UNDELIVERED',
    notes: 'Batch 001 Pre-Order: ghaziabad, 201017 [10pk-Cool Mint]',
  },
];

// In-memory fallback cache across warm serverless invocations
let memoryOrders = [...INITIAL_ORDERS];

async function getStoredOrders() {
  // 1. If Upstash Redis is configured, fetch from Redis
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/kaffs_orders`, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      });
      const data = await res.json();
      if (data && data.result) {
        const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.warn('Upstash fetch failed, using memory cache:', err.message);
    }
  }

  return memoryOrders.length > 0 ? memoryOrders : INITIAL_ORDERS;
}

async function saveStoredOrders(orders) {
  memoryOrders = orders;

  // 1. If Upstash Redis is configured, persist to Redis
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/kaffs_orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orders),
      });
    } catch (err) {
      console.warn('Upstash save failed:', err.message);
    }
  }

  // 2. If an external webhook is configured (e.g. Google Sheets / Slack / Discord), notify it
  if (process.env.ORDERS_WEBHOOK_URL) {
    try {
      await fetch(process.env.ORDERS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'ORDER_SYNC', orders }),
      });
    } catch (err) {
      console.warn('Webhook sync failed:', err.message);
    }
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-pin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const clientPin = req.headers['x-admin-pin'] || req.query.pin;

  // 1. GET ALL ORDERS (Requires Admin PIN)
  if (req.method === 'GET') {
    if (clientPin !== ADMIN_DEFAULT_PIN) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
    }

    try {
      const orders = await getStoredOrders();
      return res.status(200).json({ success: true, orders });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // 2. CREATE OR SYNC ORDER
  // Supports single order, bulk list, or automatic Cashfree order IDs lookup
  if (req.method === 'POST') {
    try {
      const body = req.body;

      // 2A. BULK IMPORT FROM CASHFREE BY ORDER IDs
      if (body.action === 'IMPORT_CASHFREE_IDS' && Array.isArray(body.order_ids)) {
        if (clientPin !== ADMIN_DEFAULT_PIN) {
          return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
        }

        const envMode = process.env.CASHFREE_ENV || 'production';
        const baseUrl = envMode === 'production'
          ? 'https://api.cashfree.com/pg'
          : 'https://sandbox.cashfree.com/pg';
        const appId = process.env.CASHFREE_APP_ID;
        const secretKey = process.env.CASHFREE_SECRET_KEY;

        const orders = await getStoredOrders();
        const imported = [];

        for (const rawId of body.order_ids) {
          const cleanId = String(rawId || '').trim();
          if (!cleanId) continue;

          try {
            const cfRes = await fetch(`${baseUrl}/orders/${cleanId}`, {
              method: 'GET',
              headers: {
                'x-client-id': appId,
                'x-client-secret': secretKey,
                'x-api-version': '2023-08-01',
              },
            });

            if (cfRes.ok) {
              const cfData = await cfRes.json();
              const cust = cfData.customer_details || {};
              const tags = cfData.order_tags || {};
              const fullAddr = tags.address
                ? `${tags.address}, ${tags.city || ''} - ${tags.pincode || ''}`
                : (cfData.order_note || '');

              const orderObj = {
                id: cfData.order_id || cleanId,
                cf_order_id: cfData.cf_order_id || null,
                created_at: cfData.created_at || new Date().toISOString(),
                customer_name: cust.customer_name || 'Customer',
                customer_phone: cust.customer_phone || '',
                customer_email: cust.customer_email || '',
                customer_address: tags.address || '',
                customer_city: tags.city || '',
                customer_pincode: tags.pincode || '',
                full_address: fullAddr,
                items: tags.items || (Number(cfData.order_amount) >= 399 ? '1x Pack of 10' : '1x Pack of 5 (Cool Mint)'),
                amount: Number(cfData.order_amount) || 229,
                payment_status: cfData.order_status || 'PAID',
                delivery_status: 'UNDELIVERED',
                notes: cfData.order_note || '',
              };

              const existingIdx = orders.findIndex((o) => o.id === orderObj.id);
              if (existingIdx >= 0) {
                orders[existingIdx] = { ...orders[existingIdx], ...orderObj };
              } else {
                orders.unshift(orderObj);
              }
              imported.push(orderObj);
            }
          } catch (err) {
            console.warn(`Failed to import order ${cleanId}:`, err.message);
          }
        }

        await saveStoredOrders(orders);
        return res.status(200).json({ success: true, importedCount: imported.length, orders });
      }

      // 2B. BULK ADD MANUAL ORDERS
      if (body.action === 'BULK_ADD' && Array.isArray(body.orders)) {
        if (clientPin !== ADMIN_DEFAULT_PIN) {
          return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
        }

        const orders = await getStoredOrders();
        for (const o of body.orders) {
          if (!o.customer_phone) continue;
          const orderObj = {
            id: o.id || `KAFFS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            created_at: o.created_at || new Date().toISOString(),
            customer_name: o.customer_name || 'Customer',
            customer_phone: o.customer_phone || '',
            customer_email: o.customer_email || '',
            customer_address: o.customer_address || o.address || '',
            customer_city: o.customer_city || o.city || '',
            customer_pincode: o.customer_pincode || o.pincode || '',
            full_address: o.full_address || `${o.customer_address || ''}, ${o.customer_city || ''} - ${o.customer_pincode || ''}`,
            items: o.items || (Number(o.amount) >= 399 ? '1x Pack of 10' : '1x Pack of 5 (Cool Mint)'),
            amount: Number(o.amount) || 229,
            payment_status: o.payment_status || 'PAID',
            delivery_status: o.delivery_status || 'UNDELIVERED',
            notes: o.notes || '',
          };

          const existingIdx = orders.findIndex((ex) => ex.id === orderObj.id);
          if (existingIdx >= 0) {
            orders[existingIdx] = { ...orders[existingIdx], ...orderObj };
          } else {
            orders.unshift(orderObj);
          }
        }

        await saveStoredOrders(orders);
        return res.status(200).json({ success: true, total: orders.length, orders });
      }

      // 2C. SINGLE ORDER SAVE
      const orderData = body;
      if (!orderData || !orderData.customer_phone) {
        return res.status(400).json({ error: 'Missing required order fields' });
      }

      const orders = await getStoredOrders();

      const newOrder = {
        id: orderData.id || `KAFFS-${Date.now()}`,
        cf_order_id: orderData.cf_order_id || null,
        created_at: orderData.created_at || new Date().toISOString(),
        customer_name: orderData.customer_name || 'Customer',
        customer_phone: orderData.customer_phone || '',
        customer_email: orderData.customer_email || '',
        customer_address: orderData.customer_address || orderData.address || '',
        customer_city: orderData.customer_city || orderData.city || '',
        customer_pincode: orderData.customer_pincode || orderData.pincode || '',
        full_address: orderData.full_address || `${orderData.customer_address || ''}, ${orderData.customer_city || ''} - ${orderData.customer_pincode || ''}`,
        items: orderData.items || orderData.order_items || '1x Pack of 5 (Cool Mint)',
        amount: Number(orderData.amount) || 229,
        payment_status: orderData.payment_status || 'PAID',
        delivery_status: orderData.delivery_status || 'UNDELIVERED',
        notes: orderData.notes || '',
      };

      // Check if order already exists by id
      const existingIdx = orders.findIndex((o) => o.id === newOrder.id);
      if (existingIdx >= 0) {
        orders[existingIdx] = { ...orders[existingIdx], ...newOrder };
      } else {
        orders.unshift(newOrder); // Newest on top
      }

      await saveStoredOrders(orders);
      return res.status(200).json({ success: true, order: newOrder, total: orders.length });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // 3. UPDATE DELIVERY STATUS (Requires Admin PIN)
  if (req.method === 'PATCH') {
    if (clientPin !== ADMIN_DEFAULT_PIN) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
    }

    try {
      const { id, delivery_status, notes } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'Missing order id' });
      }

      const orders = await getStoredOrders();
      const order = orders.find((o) => o.id === id);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      if (delivery_status) {
        order.delivery_status = delivery_status; // 'DELIVERED' or 'UNDELIVERED'
        order.updated_at = new Date().toISOString();
      }
      if (notes !== undefined) {
        order.notes = notes;
      }

      await saveStoredOrders(orders);
      return res.status(200).json({ success: true, order });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // 4. DELETE ORDER (Requires Admin PIN)
  if (req.method === 'DELETE') {
    if (clientPin !== ADMIN_DEFAULT_PIN) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
    }

    try {
      const { id } = req.body || req.query || {};
      if (!id) {
        return res.status(400).json({ error: 'Missing order id' });
      }

      let orders = await getStoredOrders();
      orders = orders.filter((o) => o.id !== id);

      await saveStoredOrders(orders);
      return res.status(200).json({ success: true, remaining: orders.length });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
