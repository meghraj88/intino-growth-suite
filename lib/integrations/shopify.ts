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

    console.log('[SHOPIFY] Fetching products from:', url)
    console.log('[SHOPIFY] Using token:', this.config.accessToken.substring(0, 10) + '...')

    const response = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": this.config.accessToken,
        "Content-Type": "application/json",
      },
    })

    console.log('[SHOPIFY] Response status:', response.status)
    console.log('[SHOPIFY] Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[SHOPIFY] Error response body:', errorText)
      
      if (response.status === 401) {
        throw new Error(`Shopify API error: Unauthorized. Check your access token.`)
      } else if (response.status === 403) {
        throw new Error(`Shopify API error: Forbidden. Check your store permissions.`)
      } else if (response.status === 404) {
        throw new Error(`Shopify API error: Store not found. Check your store domain.`)
      } else {
        throw new Error(`Shopify API error: ${response.status} - ${response.statusText}`)
      }
    }

    const data = await response.json()
    console.log('[SHOPIFY] Products fetched successfully:', data.products?.length || 0)
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
