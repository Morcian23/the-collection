const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const endpoint = `https://${domain}/api/2024-01/graphql.json`

async function shopifyFetch<T>(query: string): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 60 },
  })
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  variants: {
    edges: Array<{
      node: {
        id: string
        title: string
        availableForSale: boolean
        price: { amount: string; currencyCode: string }
      }
    }>
  }
  images: {
    edges: Array<{ node: { url: string; altText: string | null } }>
  }
  metafields: Array<{ key: string; value: string } | null>
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(`{
    products(first: 12, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id title handle description
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 10) {
            edges { node { id title availableForSale price { amount currencyCode } } }
          }
          images(first: 2) { edges { node { url altText } } }
          metafields(identifiers: [
            { namespace: "custom", key: "artist_name" }
            { namespace: "custom", key: "edition_size" }
          ]) { key value }
        }
      }
    }
  }`)
  return data.products.edges.map((e) => e.node)
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(`{
    product(handle: "${handle}") {
      id title handle description
      priceRange { minVariantPrice { amount currencyCode } }
      variants(first: 10) {
        edges { node { id title availableForSale price { amount currencyCode } } }
      }
      images(first: 5) { edges { node { url altText } } }
      metafields(identifiers: [
        { namespace: "custom", key: "artist_name" }
        { namespace: "custom", key: "edition_size" }
        { namespace: "custom", key: "artist_bio" }
      ]) { key value }
    }
  }`)
  return data.product
}

export async function createCart(variantId: string): Promise<string> {
  const data = await shopifyFetch<{
    cartCreate: { cart: { checkoutUrl: string } }
  }>(`
    mutation {
      cartCreate(input: {
        lines: [{ merchandiseId: "${variantId}", quantity: 1 }]
      }) {
        cart { checkoutUrl }
      }
    }
  `)
  return data.cartCreate.cart.checkoutUrl
}
