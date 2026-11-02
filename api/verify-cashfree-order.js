export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { order_id } = req.query || {};

    if (!order_id) {
      return res.status(400).json({ error: 'Missing order_id parameter' });
    }

    const envMode = process.env.CASHFREE_ENV || 'production';
    const baseUrl = envMode === 'production'
      ? 'https://api.cashfree.com/pg'
      : 'https://sandbox.cashfree.com/pg';

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return res.status(500).json({ error: 'Cashfree API keys are not configured in environment variables' });
    }

    const cfRes = await fetch(`${baseUrl}/orders/${order_id}`, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
      },
    });

    const cfData = await cfRes.json();
    return res.status(cfRes.status).json(cfData);
  } catch (error) {
    console.error('Cashfree Verification Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
