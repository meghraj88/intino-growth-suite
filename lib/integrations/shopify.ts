interface ShopifyConfig {
  apiKey: string
  apiSecret: string
  accessToken: string
  shopDomain: string
}

export class ShopifyIntegration {
  private config: ShopifyConfig

  constructor(config: ShopifyConfig) {
    this.config = config
  }

  async getProducts(limit = 50) {
    const url = `https://${this.config.shopDomain}/admin/api/2023-10/products.json?limit=${limit}`

    const response = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": this.config.accessToken,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.products
  }

  async updateProductPrice(productId: string, variantId: string, price: number) {
    const url = `https://${this.config.shopDomain}/admin/api/2023-10/variants/${variantId}.json`

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "X-Shopify-Access-Token": this.config.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variant: {
          id: variantId,
          price: price.toString(),
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update price: ${response.statusText}`)
    }

    return await response.json()
  }

  async getOrders(limit = 50) {
    const url = `https://${this.config.shopDomain}/admin/api/2023-10/orders.json?limit=${limit}&status=any`

    const response = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": this.config.accessToken,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.orders
  }

  async createWebhook(topic: string, address: string) {
    const url = `https://${this.config.shopDomain}/admin/api/2023-10/webhooks.json`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": this.config.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webhook: {
          topic,
          address,
          format: "json",
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to create webhook: ${response.statusText}`)
    }

    return await response.json()
  }
}
