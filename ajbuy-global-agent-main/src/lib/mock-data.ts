export const user = {
  name: "Ahmed Al-Rashidi",
  email: "ahmed@example.com",
  country: "UAE",
  currency: "AED",
  wallet: 240.0,
  bonus: 12.5,
  avatar: "AA",
};

export const categories = [
  { name: "Electronics", icon: "📱", popular: true },
  { name: "Clothing", icon: "👕", popular: true },
  { name: "Shoes", icon: "👟", popular: false },
  { name: "Bags", icon: "👜", popular: true },
  { name: "Home Decor", icon: "🏠", popular: false },
  { name: "Beauty", icon: "💄", popular: false },
  { name: "Toys", icon: "🧸", popular: false },
  { name: "Sports", icon: "⚽", popular: false },
];

export type FeaturedProduct = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  shipping: string;
  platform: "Taobao" | "1688";
  category: string;
  emoji: string;
};

export const featuredProducts: FeaturedProduct[] = [
  { id: "P-1001", title: "Wireless Earbuds Pro",   price: 10.8, oldPrice: 14.5, shipping: "Free shipping", platform: "Taobao", category: "Electronics", emoji: "🎧" },
  { id: "P-1002", title: "Smart Watch Series 9",    price: 24.6,                shipping: "Ships in 3d",   platform: "1688",   category: "Electronics", emoji: "⌚" },
  { id: "P-1004", title: "Gaming Keyboard RGB",     price: 32.0, oldPrice: 39.0, shipping: "Free shipping", platform: "Taobao", category: "Electronics", emoji: "⌨️" },
  { id: "P-1030", title: "LED Desk Lamp",           price:  8.4,                shipping: "Ships in 2d",   platform: "1688",   category: "Home Decor",  emoji: "💡" },
  { id: "P-1031", title: "Portable Blender",        price: 13.9, oldPrice: 18.5, shipping: "Free shipping", platform: "Taobao", category: "Home Decor",  emoji: "🥤" },
  { id: "P-1032", title: "Phone Accessories Kit",   price:  6.2,                shipping: "Ships in 1d",   platform: "1688",   category: "Electronics", emoji: "📱" },
];

export const howItWorks = [
  { step: 1, title: "Submit Product URL", desc: "Paste any Taobao or 1688 link", icon: "🔗" },
  { step: 2, title: "We Source & Quote", desc: "Get a clear all-in quote within hours", icon: "💬" },
  { step: 3, title: "You Approve & Pay", desc: "Pay securely from your AJBuy wallet", icon: "✅" },
  { step: 4, title: "We Ship to You", desc: "QC, consolidate, and ship worldwide", icon: "✈️" },
];

export const testimonials = [
  { name: "Sara K.", country: "UAE", rating: 5, text: "Super smooth! QC photos saved me from a bad batch." },
  { name: "Liam B.", country: "UK", rating: 5, text: "Best shipping rates I've found for 1688 sourcing." },
  { name: "Marie L.", country: "FR", rating: 4, text: "Love the wallet system. Reordering is instant." },
];

export const activeOrders = [
  { id: "AJ-10293", title: "Wireless Earbuds Pro", status: "In Warehouse", step: 2 },
  { id: "AJ-10288", title: "Leather Crossbody Bag", status: "QC Ready", step: 3 },
  { id: "AJ-10277", title: "Smart Watch Series 9", status: "Shipped", step: 4 },
];

export const purchaseRequests = [
  { id: "REQ-00451", title: "Wireless Earbuds Pro — Black", qty: 2, date: "May 18, 2026", status: "Pending Quote", price: null },
  { id: "REQ-00449", title: "Leather Crossbody Bag — Tan", qty: 1, date: "May 16, 2026", status: "Awaiting Payment", price: 59.5 },
  { id: "REQ-00441", title: "Smart Watch Series 9 — Silver", qty: 1, date: "May 12, 2026", status: "Processing", price: 142.0 },
  { id: "REQ-00432", title: "Cotton Hoodie — Beige (M)", qty: 3, date: "May 08, 2026", status: "Completed", price: 78.2 },
  { id: "REQ-00427", title: "Ceramic Vase Set", qty: 1, date: "May 03, 2026", status: "Rejected", price: null },
];

export const packages = [
  { id: "WH-4421", arrived: "May 15", dims: "32×24×18 cm", weight: "1.2 kg", status: "Awaiting QC" },
  { id: "WH-4418", arrived: "May 14", dims: "20×15×10 cm", weight: "0.6 kg", status: "QC Complete" },
  { id: "WH-4402", arrived: "May 10", dims: "45×30×25 cm", weight: "3.4 kg", status: "Ready to Ship" },
];

export const shippingMethods = [
  { name: "Air Express", carrier: "DHL", price: 28.5, eta: "4–6 business days", speed: 95 },
  { name: "Standard Air", carrier: "EMS", price: 18.5, eta: "7–12 business days", speed: 70 },
  { name: "Sea Freight", carrier: "Maersk", price: 9.2, eta: "30–45 business days", speed: 25 },
  { name: "Economy", carrier: "Yanwen", price: 12.0, eta: "15–25 business days", speed: 45 },
];

export const trackingEvents = [
  { time: "May 20, 14:22", location: "Dubai DXB", text: "Out for delivery" },
  { time: "May 19, 09:10", location: "Dubai DXB", text: "Arrived at destination facility" },
  { time: "May 17, 22:45", location: "Hong Kong HKG", text: "Departed origin facility" },
  { time: "May 16, 11:30", location: "Guangzhou Warehouse", text: "Shipment dispatched" },
  { time: "May 15, 16:00", location: "AJBuy Warehouse", text: "QC completed" },
];

export const transactions = [
  { id: 1, type: "credit", desc: "Top-up via Stripe", date: "May 18", amount: 100.0 },
  { id: 2, type: "debit", desc: "Order REQ-00449 payment", date: "May 16", amount: -59.5 },
  { id: 3, type: "credit", desc: "Referral bonus — Sara K.", date: "May 14", amount: 5.0 },
  { id: 4, type: "debit", desc: "Order REQ-00441 payment", date: "May 12", amount: -142.0 },
  { id: 5, type: "credit", desc: "Refund — REQ-00427", date: "May 09", amount: 24.0 },
];

export const referralStats = { clicks: 142, signups: 18, conversions: 7, earned: 34.5 };

export const referralEarnings = [
  { ref: "sara.k@…", date: "May 14", value: 120.0, commission: 6.0, status: "Paid" },
  { ref: "liam.b@…", date: "May 10", value: 240.0, commission: 12.0, status: "Paid" },
  { ref: "marie.l@…", date: "May 08", value: 90.0, commission: 4.5, status: "Pending" },
  { ref: "omar.n@…", date: "May 05", value: 180.0, commission: 9.0, status: "Pending" },
  { ref: "jin.h@…", date: "May 01", value: 60.0, commission: 3.0, status: "Paid" },
];

export const tickets = [
  { id: "T-2041", subject: "QC photos missing for WH-4421", status: "Open", updated: "May 20" },
  { id: "T-2034", subject: "Wrong color variant delivered", status: "Closed", updated: "May 12" },
  { id: "T-2021", subject: "Wallet top-up not reflected", status: "Closed", updated: "May 05" },
];

export const adminKpis = {
  revenue: 18420,
  ordersToday: 47,
  pendingQuotes: 127,
  activeShipments: 89,
};

export const adminRevenueSeries = [
  4200, 3800, 5100, 4700, 6200, 5900, 7100, 6400, 5800, 7700,
  8200, 7400, 9100, 8600, 9400, 10200, 9800, 11100, 10500, 12200,
  11800, 13000, 12400, 13900, 13200, 14800, 14100, 15600, 14900, 18420,
];

export const adminRecentOrders = [
  { id: "AJ-10293", customer: "Ahmed Al-Rashidi", status: "Shipped", amount: 142.0, date: "May 20" },
  { id: "AJ-10288", customer: "Sara K.", status: "Processing", amount: 59.5, date: "May 19" },
  { id: "AJ-10277", customer: "Liam B.", status: "Completed", amount: 312.0, date: "May 18" },
  { id: "AJ-10269", customer: "Marie L.", status: "Pending Quote", amount: 0, date: "May 17" },
  { id: "AJ-10258", customer: "Omar N.", status: "Shipped", amount: 88.4, date: "May 16" },
];

export const adminUsers = [
  { name: "Ahmed Al-Rashidi", email: "ahmed@…", country: "UAE", kyc: "Verified", wallet: 240.0 },
  { name: "Sara K.", email: "sara@…", country: "UAE", kyc: "Verified", wallet: 86.2 },
  { name: "Liam B.", email: "liam@…", country: "UK", kyc: "Pending", wallet: 0 },
  { name: "Marie L.", email: "marie@…", country: "FR", kyc: "Verified", wallet: 412.7 },
  { name: "Omar N.", email: "omar@…", country: "SA", kyc: "Verified", wallet: 55.0 },
];
