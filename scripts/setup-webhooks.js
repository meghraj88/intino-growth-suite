// Script to set up webhooks for connected stores
// Run this after connecting a new store

const WEBHOOK_ENDPOINTS = {
  shopify: [
    "orders/create",
    "orders/updated",
    "orders/cancelled",
    "products/create",
    "products/update",
    "app/uninstalled",
  ],
  woocommerce: ["order.created", "order.updated", "product.created", "product.updated"],
}

async function setupShopifyWebhooks(shopDomain, accessToken, baseUrl) {
  console.log(`Setting up Shopify webhooks for ${shopDomain}...`)

  for (const topic of WEBHOOK_ENDPOINTS.shopify) {
    try {
      const response = await fetch(`https://${shopDomain}/admin/api/2023-10/webhooks.json`, {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          webhook: {
            topic,
            address: `${baseUrl}/api/webhooks/shopify`,
            format: "json",
          },
        }),
      })

      if (response.ok) {
        console.log(`✓ Created webhook for ${topic}`)
      } else {
        console.error(`✗ Failed to create webhook for ${topic}:`, await response.text())
      }
    } catch (error) {
      console.error(`✗ Error creating webhook for ${topic}:`, error)
    }
  }
}

async function setupWooCommerceWebhooks(storeUrl, consumerKey, consumerSecret, baseUrl) {
  console.log(`Setting up WooCommerce webhooks for ${storeUrl}...`)

  for (const topic of WEBHOOK_ENDPOINTS.woocommerce) {
    try {
      const response = await fetch(`${storeUrl}/wp-json/wc/v3/webhooks`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Intino ${topic}`,
          topic,
          delivery_url: `${baseUrl}/api/webhooks/woocommerce`,
          status: "active",
        }),
      })

      if (response.ok) {
        console.log(`✓ Created webhook for ${topic}`)
      } else {
        console.error(`✗ Failed to create webhook for ${topic}:`, await response.text())
      }
    } catch (error) {
      console.error(`✗ Error creating webhook for ${topic}:`, error)
    }
  }
}

// Example usage:
// setupShopifyWebhooks('mystore.myshopify.com', 'access_token', 'https://myapp.vercel.app')
// setupWooCommerceWebhooks('https://mystore.com', 'ck_key', 'cs_secret', 'https://myapp.vercel.app')

module.exports = {
  setupShopifyWebhooks,
  setupWooCommerceWebhooks,
}
