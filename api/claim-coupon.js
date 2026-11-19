// Serverless API to permanently mark single-use coupon as claimed
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, order_id, customer_name, customer_phone } = req.body || {};
    const cleanCode = (code || '').trim().toLowerCase();

    if (cleanCode !== 'founder001') {
      return res.status(400).json({ error: 'Invalid coupon code' });
    }

    // Persist claim status in Redis if configured
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/kaffs_coupon_founder001_claimed`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            claimed: true,
            claimed_at: new Date().toISOString(),
            order_id: order_id || null,
            customer_name: customer_name || null,
            customer_phone: customer_phone || null,
          }),
        });
      } catch (err) {
        console.warn('Redis claim-coupon error:', err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Coupon founder001 claimed successfully. Single-use limit reached.',
      claimed: true,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
