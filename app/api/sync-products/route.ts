
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { storeId, shopDomain } = await req.json();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
    if (!url || !key) return NextResponse.json({ error: "Missing Supabase env" }, { status: 500 });
    const supa = createClient(url, key);

    const { data: store, error: storeErr } = storeId
      ? await supa.from("stores").select("*").eq("id", storeId).single()
      : await supa.from("stores").select("*").eq("shop_domain", shopDomain).single();
    if (storeErr || !store?.access_token || !store?.shop_domain) {
      return NextResponse.json({ error: "Store not found or missing token" }, { status: 404 });
    }

    const r = await fetch(`https://${store.shop_domain}/admin/api/2024-04/products.json?limit=250`, {
      headers: { "X-Shopify-Access-Token": store.access_token, "Content-Type": "application/json" },
      next: { revalidate: 0 },
    });
    if (!r.ok) return NextResponse.json({ error: `Shopify ${r.status}` }, { status: 500 });

    const { products = [] } = await r.json();
    const rows = products.map((p: any) => ({
      shopify_product_id: String(p.id),
      store_id: store.id,
      title: p.title,
      description: p.body_html,
      vendor: p.vendor,
      product_type: p.product_type,
      handle: p.handle,
      images: p.images,
      variants: p.variants,
      updated_at: new Date().toISOString(),
    }));

    const { error: upErr } = await supa.from("products").upsert(rows, { onConflict: "shopify_product_id" });
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

    return NextResponse.json({ success: true, count: rows.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
