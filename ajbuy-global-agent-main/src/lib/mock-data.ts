export type SearchProduct = {
  id: string;
  title: string;
  cn: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sold: number;
  platform: "Taobao" | "1688";
  category: string;
  location: string;
};

export const allProducts: SearchProduct[] = [
  { id: "P-1001", title: "Wireless Earbuds Pro", cn: "无线蓝牙耳机 Pro", price: 10.8, oldPrice: 14.5, rating: 4.8, sold: 1284, platform: "Taobao", category: "Electronics", location: "Guangdong" },
  { id: "P-1002", title: "Smart Watch Series 9", cn: "智能手表 S9", price: 24.6, rating: 4.7, sold: 942, platform: "1688", category: "Electronics", location: "Shenzhen" },
  { id: "P-1003", title: "USB-C Fast Charger 65W", cn: "65W 快充充电器", price: 6.4, oldPrice: 9, rating: 4.9, sold: 5320, platform: "1688", category: "Electronics", location: "Dongguan" },
  { id: "P-1004", title: "Mechanical Keyboard RGB", cn: "机械键盘 RGB", price: 32, rating: 4.6, sold: 410, platform: "Taobao", category: "Electronics", location: "Shenzhen" },
  { id: "P-1005", title: "Cotton Oversized Hoodie", cn: "宽松卫衣", price: 12.2, rating: 4.7, sold: 2100, platform: "Taobao", category: "Clothing", location: "Hangzhou" },
  { id: "P-1006", title: "Linen Summer Shirt", cn: "亚麻衬衫", price: 9.8, rating: 4.5, sold: 870, platform: "1688", category: "Clothing", location: "Guangzhou" },
  { id: "P-1007", title: "Cargo Pants Streetwear", cn: "工装裤", price: 14.5, oldPrice: 18, rating: 4.6, sold: 1402, platform: "Taobao", category: "Clothing", location: "Hangzhou" },
  { id: "P-1008", title: "Running Sneakers Mesh", cn: "运动跑鞋", price: 16.9, rating: 4.7, sold: 3100, platform: "1688", category: "Shoes", location: "Fujian" },
  { id: "P-1009", title: "Leather Loafers", cn: "皮鞋乐福鞋", price: 28.4, rating: 4.5, sold: 220, platform: "Taobao", category: "Shoes", location: "Wenzhou" },
  { id: "P-1010", title: "Leather Crossbody Bag", cn: "皮革斜挎包", price: 22, oldPrice: 29, rating: 4.8, sold: 980, platform: "Taobao", category: "Bags", location: "Guangzhou" },
  { id: "P-1011", title: "Canvas Tote Bag", cn: "帆布包", price: 5.4, rating: 4.6, sold: 4200, platform: "1688", category: "Bags", location: "Hangzhou" },
  { id: "P-1012", title: "Ceramic Vase Set (3pc)", cn: "陶瓷花瓶套装", price: 18, rating: 4.7, sold: 312, platform: "Taobao", category: "Home Decor", location: "Jingdezhen" },
  { id: "P-1013", title: "LED Strip Lights 5m", cn: "LED 灯带 5米", price: 4.9, rating: 4.8, sold: 7600, platform: "1688", category: "Home Decor", location: "Zhongshan" },
  { id: "P-1014", title: "Matte Lipstick Set", cn: "哑光口红套装", price: 7.2, rating: 4.6, sold: 1820, platform: "Taobao", category: "Beauty", location: "Shanghai" },
  { id: "P-1015", title: "Jade Roller & Gua Sha", cn: "玉石滚轮刮痧板", price: 3.8, rating: 4.7, sold: 5400, platform: "1688", category: "Beauty", location: "Yiwu" },
  { id: "P-1016", title: "Plush Bear Giant 80cm", cn: "毛绒熊", price: 19.5, rating: 4.9, sold: 640, platform: "Taobao", category: "Toys", location: "Yangzhou" },
  { id: "P-1017", title: "Building Blocks 500pc", cn: "积木玩具", price: 11, rating: 4.5, sold: 1240, platform: "1688", category: "Toys", location: "Shantou" },
  { id: "P-1018", title: "Yoga Mat Non-Slip", cn: "瑜伽垫", price: 8.4, rating: 4.7, sold: 2800, platform: "1688", category: "Sports", location: "Ningbo" },
  { id: "P-1019", title: "Adjustable Dumbbells Pair", cn: "可调哑铃", price: 42, rating: 4.6, sold: 380, platform: "Taobao", category: "Sports", location: "Qingdao" },
  { id: "P-1020", title: "Cycling Jersey Pro", cn: "骑行服", price: 15.8, rating: 4.5, sold: 510, platform: "1688", category: "Sports", location: "Tianjin" },
];

export const recentSearches = ["Wireless Earbuds", "Cotton Hoodie", "Leather Bag", "Yoga Mat"];

export const user = {
  name: "Ahmed Al-Rashidi",
  email: "ahmed@example.com",
  country: "UAE",
  currency: "AED",
  wallet: 240,
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
  { id: "P-1004", title: "Gaming Keyboard RGB",     price: 32,   oldPrice: 39,  shipping: "Free shipping", platform: "Taobao", category: "Electronics", emoji: "⌨️" },
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
  { id: "REQ-00441", title: "Smart Watch Series 9 — Silver", qty: 1, date: "May 12, 2026", status: "Processing", price: 142 },
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
  { name: "Economy", carrier: "Yanwen", price: 12, eta: "15–25 business days", speed: 45 },
];

export const trackingEvents = [
  { time: "May 20, 14:22", location: "Dubai DXB", text: "Out for delivery" },
  { time: "May 19, 09:10", location: "Dubai DXB", text: "Arrived at destination facility" },
  { time: "May 17, 22:45", location: "Hong Kong HKG", text: "Departed origin facility" },
  { time: "May 16, 11:30", location: "Guangzhou Warehouse", text: "Shipment dispatched" },
  { time: "May 15, 16:00", location: "AJBuy Warehouse", text: "QC completed" },
];

export const transactions = [
  { id: 1, type: "credit", desc: "Top-up via Stripe", date: "May 18", amount: 100 },
  { id: 2, type: "debit", desc: "Order REQ-00449 payment", date: "May 16", amount: -59.5 },
  { id: 3, type: "credit", desc: "Referral bonus — Sara K.", date: "May 14", amount: 5 },
  { id: 4, type: "debit", desc: "Order REQ-00441 payment", date: "May 12", amount: -142 },
  { id: 5, type: "credit", desc: "Refund — REQ-00427", date: "May 09", amount: 24 },
];

export const referralStats = { clicks: 142, signups: 18, conversions: 7, earned: 34.5 };

export const referralEarnings = [
  { ref: "sara.k@…", date: "May 14", value: 120, commission: 6, status: "Paid" },
  { ref: "liam.b@…", date: "May 10", value: 240, commission: 12, status: "Paid" },
  { ref: "marie.l@…", date: "May 08", value: 90, commission: 4.5, status: "Pending" },
  { ref: "omar.n@…", date: "May 05", value: 180, commission: 9, status: "Pending" },
  { ref: "jin.h@…", date: "May 01", value: 60, commission: 3, status: "Paid" },
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
  { id: "AJ-10293", customer: "Ahmed Al-Rashidi", status: "Shipped", amount: 142, date: "May 20" },
  { id: "AJ-10288", customer: "Sara K.", status: "Processing", amount: 59.5, date: "May 19" },
  { id: "AJ-10277", customer: "Liam B.", status: "Completed", amount: 312, date: "May 18" },
  { id: "AJ-10269", customer: "Marie L.", status: "Pending Quote", amount: 0, date: "May 17" },
  { id: "AJ-10258", customer: "Omar N.", status: "Shipped", amount: 88.4, date: "May 16" },
];

export const adminWarehousePackages = [
  { id: "WH-4421", customer: "Ahmed Al-Rashidi", orderId: "AJ-10293", product: "Wireless Earbuds Pro", arrived: "May 15", dims: "32×24×18 cm", weight: "1.2 kg", status: "Awaiting QC", location: "Bay A-12" },
  { id: "WH-4418", customer: "Sara K.", orderId: "AJ-10288", product: "Leather Crossbody Bag", arrived: "May 14", dims: "20×15×10 cm", weight: "0.6 kg", status: "QC Complete", location: "Bay B-04" },
  { id: "WH-4402", customer: "Ahmed Al-Rashidi", orderId: "AJ-10277", product: "Smart Watch Series 9", arrived: "May 10", dims: "45×30×25 cm", weight: "3.4 kg", status: "Ready to Ship", location: "Bay C-07" },
  { id: "WH-4395", customer: "Liam B.", orderId: "AJ-10258", product: "Gaming Keyboard RGB", arrived: "May 09", dims: "50×20×10 cm", weight: "1.8 kg", status: "Awaiting QC", location: "Bay A-03" },
  { id: "WH-4381", customer: "Marie L.", orderId: "AJ-10241", product: "LED Desk Lamp", arrived: "May 07", dims: "60×15×15 cm", weight: "2.1 kg", status: "Ready to Ship", location: "Bay C-11" },
  { id: "WH-4370", customer: "Omar N.", orderId: "AJ-10233", product: "Portable Blender", arrived: "May 05", dims: "25×12×12 cm", weight: "0.9 kg", status: "QC Issue", location: "Bay D-02" },
  { id: "WH-4358", customer: "Jin H.", orderId: "AJ-10219", product: "Phone Accessories Kit", arrived: "May 03", dims: "18×12×8 cm", weight: "0.4 kg", status: "Shipped", location: "—" },
];

export const warehouseStats = {
  total: 18,
  awaitingQC: 5,
  qcComplete: 4,
  readyToShip: 6,
  issues: 2,
  shipped: 1,
};

export const adminQuotations = [
  { id: "QT-00341", requestId: "REQ-00451", customer: "Ahmed Al-Rashidi", product: "Wireless Earbuds Pro — Black ×2", amount: 59.5, status: "Sent", created: "May 18", expires: "May 19" },
  { id: "QT-00339", requestId: "REQ-00449", customer: "Sara K.", product: "Leather Crossbody Bag — Tan ×1", amount: 87.2, status: "Accepted", created: "May 16", expires: "May 17" },
  { id: "QT-00335", requestId: "REQ-00441", customer: "Liam B.", product: "Smart Watch Series 9 — Silver ×1", amount: 142, status: "Accepted", created: "May 12", expires: "May 13" },
  { id: "QT-00330", requestId: "REQ-00432", customer: "Marie L.", product: "Cotton Hoodie — Beige (M) ×3", amount: 78.2, status: "Expired", created: "May 08", expires: "May 09" },
  { id: "QT-00324", requestId: "REQ-00427", customer: "Omar N.", product: "Ceramic Vase Set ×1", amount: 45, status: "Rejected", created: "May 03", expires: "May 04" },
  { id: "QT-00318", requestId: "REQ-00418", customer: "Jin H.", product: "Gaming Keyboard RGB ×1", amount: 95.8, status: "Draft", created: "May 21", expires: "May 23" },
];

export const adminUsers = [
  { name: "Ahmed Al-Rashidi", email: "ahmed@…", country: "UAE", kyc: "Verified", wallet: 240 },
  { name: "Sara K.", email: "sara@…", country: "UAE", kyc: "Verified", wallet: 86.2 },
  { name: "Liam B.", email: "liam@…", country: "UK", kyc: "Pending", wallet: 0 },
  { name: "Marie L.", email: "marie@…", country: "FR", kyc: "Verified", wallet: 412.7 },
  { name: "Omar N.", email: "omar@…", country: "SA", kyc: "Verified", wallet: 55 },
];
