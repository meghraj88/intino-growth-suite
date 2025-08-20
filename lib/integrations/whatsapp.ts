interface WhatsAppConfig {
  apiKey: string
  baseUrl: string
  fromNumber: string
}

export class WhatsAppIntegration {
  private config: WhatsAppConfig

  constructor(config: WhatsAppConfig) {
    this.config = config
  }

  async sendMessage(to: string, message: string) {
    const response = await fetch(`${this.config.baseUrl}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.config.fromNumber,
        to,
        type: "text",
        text: {
          body: message,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${response.statusText}`)
    }

    return await response.json()
  }

  async sendTemplate(to: string, templateName: string, variables: Record<string, string>) {
    const response = await fetch(`${this.config.baseUrl}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.config.fromNumber,
        to,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: "en",
          },
          components: [
            {
              type: "body",
              parameters: Object.entries(variables).map(([key, value]) => ({
                type: "text",
                text: value,
              })),
            },
          ],
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`WhatsApp template error: ${response.statusText}`)
    }

    return await response.json()
  }

  async getMessageStatus(messageId: string) {
    const response = await fetch(`${this.config.baseUrl}/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`WhatsApp status error: ${response.statusText}`)
    }

    return await response.json()
  }
}
