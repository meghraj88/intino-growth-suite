# Intino - Unified Dropship Growth Suite

A comprehensive SaaS platform for dropshipping automation featuring dynamic pricing, smart returns management, and localized trend scanning.

## Features

- **Dynamic Price & Profit Optimizer**: Real-time supplier and shipping price sync with AI-powered pricing suggestions
- **Smart Returns & Refund Manager**: Automated return processing with predictive refund risk analysis
- **Localized Trend Scanner & Alerts**: Geo-based product trend detection with instant WhatsApp/Email alerts

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Serverless Functions
- **Database**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Deployment**: Vercel
- **Integrations**: Shopify, WooCommerce, AliExpress, WhatsApp, OpenAI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd intino-dropship-suite
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL schema from `scripts/supabase-schema.sql` in the Supabase SQL editor
   - Create a storage bucket named `product_assets`
   - Enable Auth providers (email + optional Google)

5. Configure environment variables in `.env.local`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Store Integrations
SHOPIFY_API_KEY=
SHOPIFY_API_SECRET=
SHOPIFY_SCOPES=read_products,write_products,read_orders,write_orders

# WhatsApp Provider (Twilio/Gupshup)
WHATSAPP_PROVIDER_API_KEY=

# AI Services
OPENAI_API_KEY=

# Payments
STRIPE_SECRET_KEY=

# Optional
SENTRY_DSN=
ANALYTICS_WRITE_KEY=
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utility functions
├── scripts/              # Database scripts
└── types/                # TypeScript type definitions
\`\`\`

## API Routes

- `GET /api/me` - Get current user profile
- `POST /api/stores/connect` - Connect store (Shopify/WooCommerce)
- `GET /api/stores` - List connected stores
- `POST /api/sync/products/:storeId` - Sync products from store
- `POST /api/price/suggest` - Get AI price suggestions
- `GET /api/orders` - List orders
- `POST /api/returns/:orderId/request` - Create return request
- `POST /api/trends/scan` - Trigger trend scanning
- `POST /api/alerts/send_whatsapp` - Send WhatsApp notification

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
