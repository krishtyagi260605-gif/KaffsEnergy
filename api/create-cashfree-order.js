export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      amount,
      customer_name,
      customer_phone,
      customer_email,
      customer_address,
      customer_city,
      customer_pincode,
      order_items,
      order_note,
    } = req.body || {};

    const envMode = process.env.CASHFREE_ENV || 'production';
    const baseUrl = envMode === 'production'
      ? 'https://api.cashfree.com/pg'
      : 'https://sandbox.cashfree.com/pg';

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return res.status(500).json({ error: 'Cashfree API keys are not configured in environment variables' });
    }

    const cleanPhone = (customer_phone || '').replace(/\D/g, '').slice(-10) || '9999999999';
    const orderId = `kaffs_${Date.now()}`;
    const fullAddress = [customer_address, customer_city, customer_pincode].filter(Boolean).join(', ');

    const cfRes = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: Number(amount),
        order_currency: 'INR',
        customer_details: {
          customer_id: `cust_${cleanPhone}`,
          customer_name: customer_name || 'Customer',
          customer_email: customer_email || 'orders@kaffsenergy.shop',
          customer_phone: cleanPhone,
        },
        order_meta: {
          return_url: 'https://www.kaffsenergy.shop/?order_id={order_id}',
          notify_url: 'https://kaffsenergy.shop/api/cashfree-webhook',
        },
        order_note: order_note || (fullAddress ? `DELIVERY: ${fullAddress}` : "KAFF'S Energy Pre-Order Batch 001"),
        order_tags: {
          address: String(customer_address || '').substring(0, 100),
          city: String(customer_city || '').substring(0, 50),
          pincode: String(customer_pincode || '').substring(0, 20),
          items: String(order_items || '').substring(0, 100),
        },
      }),
    });

    const cfData = await cfRes.json();
    return res.status(cfRes.status).json(cfData);
  } catch (error) {
    console.error('Cashfree Order Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
