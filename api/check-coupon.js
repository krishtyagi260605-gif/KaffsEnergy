// Serverless API to check single-use coupon validity
let memoryClaimed = false;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { code } = req.query || {};
  const cleanCode = (code || '').trim().toLowerCase();

  if (cleanCode !== 'founder001') {
    return res.status(200).json({ valid: false, message: 'Invalid coupon code' });
  }

  let isClaimed = memoryClaimed;

  // 1. Check Upstash Redis if configured
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const redisRes = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/kaffs_coupon_founder001_claimed`, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      });
      const data = await redisRes.json();
      if (data && (data.result === 'true' || data.result === true || data.result === 1 || data.result === '1')) {
        isClaimed = true;
      }

      // Also check orders for FREE-FOUNDER-PASS
      if (!isClaimed) {
        const ordersRes = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/kaffs_orders`, {
          headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        });
        const ordersData = await ordersRes.json();
        if (ordersData && ordersData.result) {
          const parsed = typeof ordersData.result === 'string' ? JSON.parse(ordersData.result) : ordersData.result;
          if (Array.isArray(parsed) && parsed.some(o => o.cf_order_id === 'FREE-FOUNDER-PASS' || (o.notes && o.notes.includes('founder001')))) {
            isClaimed = true;
          }
        }
      }
    } catch (err) {
      console.warn('Redis check-coupon check error:', err.message);
    }
  }

  return res.status(200).json({
    valid: true,
    code: 'founder001',
    claimed: isClaimed,
    discountType: '100_PERCENT_PACK_5',
    maxUses: 1,
    description: '100% Free Pack of 5 (1 unit)',
  });
}
