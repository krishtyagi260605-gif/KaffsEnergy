// Serverless API for KAFF'S Energy Order Management & Admin Portal
const ADMIN_DEFAULT_PIN = process.env.ADMIN_PIN || 'kaffs2026';

// In-memory fallback cache across warm serverless invocations
let memoryOrders = [];

async function getStoredOrders() {
  // 1. If Upstash Redis is configured, fetch from Redis
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/kaffs_orders`, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      });
      const data = await res.json();
      if (data && data.result) {
        return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      }
    } catch (err) {
      console.warn('Upstash fetch failed, using memory cache:', err.message);
    }
  }

  return memoryOrders;
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
  // When a checkout occurs, frontend or webhook can submit order details here
  if (req.method === 'POST') {
    try {
      const orderData = req.body;

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
