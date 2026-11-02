import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

function cashfreeDevPlugin() {
  return {
    name: 'cashfree-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 1. Order Creation Endpoint
        if (req.url === '/api/create-cashfree-order' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const env = loadEnv('development', process.cwd(), '');
              const payload = JSON.parse(body || '{}');

              const appId = env.CASHFREE_APP_ID || process.env.CASHFREE_APP_ID;
              const secretKey = env.CASHFREE_SECRET_KEY || process.env.CASHFREE_SECRET_KEY;
              const isProd = (env.CASHFREE_ENV || process.env.CASHFREE_ENV || 'production') === 'production';
              const baseUrl = isProd ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

              const phone = (payload.customer_phone || '').replace(/\D/g, '').slice(-10) || '9876543210';
              const orderId = `kaffs_${Date.now()}`;

              const cfResponse = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {
                  'x-client-id': appId,
                  'x-client-secret': secretKey,
                  'x-api-version': '2023-08-01',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  order_id: orderId,
                  order_amount: Number(payload.amount || 399),
                  order_currency: 'INR',
                  customer_details: {
                    customer_id: `cust_${phone}`,
                    customer_name: payload.customer_name || 'Customer',
                    customer_email: payload.customer_email || 'orders@kaffs.in',
                    customer_phone: phone,
                  },
                  order_meta: {
                    notify_url: 'https://kaffs.in/api/cashfree-webhook',
                  },
                  order_note: payload.order_note || "KAFF'S Energy Pre-Order Batch 001",
                }),
              });

              const data = await cfResponse.json();
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = cfResponse.status;
              res.end(JSON.stringify(data));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
            }
          });
          return;
        }

        // 2. Order Verification Endpoint
        if (req.url?.startsWith('/api/verify-cashfree-order') && req.method === 'GET') {
          try {
            const env = loadEnv('development', process.cwd(), '');
            const parsedUrl = new URL(req.url, 'http://localhost');
            const orderId = parsedUrl.searchParams.get('order_id');

            const appId = env.CASHFREE_APP_ID || process.env.CASHFREE_APP_ID;
            const secretKey = env.CASHFREE_SECRET_KEY || process.env.CASHFREE_SECRET_KEY;
            const isProd = (env.CASHFREE_ENV || process.env.CASHFREE_ENV || 'production') === 'production';
            const baseUrl = isProd ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

            const cfResponse = await fetch(`${baseUrl}/orders/${orderId}`, {
              method: 'GET',
              headers: {
                'x-client-id': appId,
                'x-client-secret': secretKey,
                'x-api-version': '2023-08-01',
              },
            });

            const data = await cfResponse.json();
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = cfResponse.status;
            res.end(JSON.stringify(data));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
          }
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cashfreeDevPlugin()],
})
