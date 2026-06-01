import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { OrderStepper } from "@/components/ajbuy/OrderStepper";
import { useCart } from "@/context/CartContext";
import { user } from "@/lib/mock-data";
import { useState } from "react";
import { MapPin, Plus, Pencil, Info, ChevronRight, Minus, X } from "lucide-react";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

type Address = {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  province: string;
  city: string;
  detailedAddress: string;
  houseNumber: string;
  shippingCompany: string;
  postcode: string;
  phoneCode: string;
  phone: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: "addr-1",
    firstName: "Ahmed",
    lastName: "Al-Rashidi",
    country: "United Arab Emirates",
    province: "Dubai",
    city: "Dubai Marina",
    detailedAddress: "Marina Heights",
    houseNumber: "Apartment 1402",
    shippingCompany: "",
    postcode: "00000",
    phoneCode: "+971",
    phone: "50 *** **89",
    isDefault: true,
  },
];

const emptyForm: Omit<Address, "id"> = {
  firstName: "", lastName: "", country: "", province: "", city: "",
  detailedAddress: "", houseNumber: "", shippingCompany: "",
  postcode: "", phoneCode: "+971", phone: "", isDefault: false,
};

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddr, setSelectedAddr] = useState(initialAddresses[0].id);
  const [agreed, setAgreed] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; editing: Address | null }>({ open: false, editing: null });
  const [form, setForm] = useState<Omit<Address, "id">>(emptyForm);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const serviceFee = +(subtotal * 0.12).toFixed(2);
  const total = +(subtotal + serviceFee).toFixed(2);

  function openAdd() {
    setForm(emptyForm);
    setModal({ open: true, editing: null });
  }

  function openEdit(addr: Address) {
    const { id: _, ...rest } = addr;
    setForm(rest);
    setModal({ open: true, editing: addr });
  }

  function closeModal() {
    setModal({ open: false, editing: null });
  }

  function saveAddress() {
    if (modal.editing) {
      setAddresses((prev) => prev.map((a) => a.id === modal.editing!.id ? { ...form, id: modal.editing!.id } : a));
    } else {
      const newAddr: Address = { ...form, id: `addr-${Date.now()}` };
      setAddresses((prev) => [...prev, newAddr]);
      setSelectedAddr(newAddr.id);
    }
    closeModal();
  }

  function handleSubmit() {
    if (!agreed) return;
    clearCart();
    void navigate({ to: "/payment", search: { orderId: `D${Date.now()}`, amount: total } });
  }

  const field = (key: keyof typeof form) => ({
    value: form[key] as string,
    onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-5xl space-y-5">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Confirm Order</h1>
          <p className="text-sm text-muted-foreground mt-1">Review your order details before submitting.</p>
        </div>

        <OrderStepper activeStep={1} />

        {/* Shipping address */}
        <div className="rounded-2xl border bg-card shadow-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Select Shipping Address
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <button onClick={openAdd} className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <Plus className="h-4 w-4" /> Add
              </button>
              <button onClick={openAdd} className="text-primary hover:underline font-medium">Change</button>
            </div>
          </div>

          {addresses.map((addr) => (
            <label
              key={addr.id}
              className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                selectedAddr === addr.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <input type="radio" name="address" value={addr.id} checked={selectedAddr === addr.id}
                onChange={() => setSelectedAddr(addr.id)} className="accent-primary mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{addr.firstName} {addr.lastName}</span>
                  <span className="text-sm text-muted-foreground">{addr.phoneCode} {addr.phone}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">Default</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {addr.houseNumber}, {addr.detailedAddress}, {addr.city}, {addr.province}
                </div>
                <div className="text-sm text-muted-foreground">{addr.country} · {addr.postcode}</div>
              </div>
              <button type="button" onClick={(e) => { e.preventDefault(); openEdit(addr); }}
                className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
            </label>
          ))}
        </div>

        {/* Product confirmation */}
        <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-display text-lg">Confirm Product Information</h2>
            <Link to="/cart" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Return to Cart <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Your cart is empty.{" "}
              <Link to="/cart" className="text-primary hover:underline">Go back to cart</Link>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-muted/40 text-xs uppercase text-muted-foreground border-b">
                <span>Product Details</span>
                <span className="text-right">Unit Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-muted/20">
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">A</div>
                  <span className="text-sm font-medium">AJBuy Store</span>
                </div>

                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`}
                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                        {item.emoji ?? "📦"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium line-clamp-2">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">Color: {item.color} · Size: {item.size}</div>
                      </div>
                    </div>
                    <div className="text-sm md:text-right">
                      <span className="md:hidden text-xs text-muted-foreground">Price: </span>
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="flex md:justify-center items-center gap-2">
                      <span className="md:hidden text-xs text-muted-foreground">Qty: </span>
                      <div className="inline-flex items-center border rounded px-2 py-1 text-sm gap-3">
                        <Minus className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium w-4 text-center">{item.qty}</span>
                        <Plus className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-primary md:text-right">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t px-5 py-4 space-y-2 text-sm bg-muted/20">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total of {items.reduce((s, i) => s + i.qty, 0)} goods</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Service fee (12%)</span>
                  <span className="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t">
                  <span>Total Price of Goods</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Friendly reminder */}
        <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
          <p>
            <span className="font-medium">Friendly Reminder: </span>
            After the order is submitted and payment is successful, please wait patiently for the goods to be stored. After storage, you can submit the items for shipment.
          </p>
        </div>

        {/* Service agreement */}
        <div className="rounded-2xl border bg-card shadow-card p-5 space-y-3 text-sm">
          <p className="text-muted-foreground text-xs">
            <span className="text-foreground font-medium">Service Agreement: </span>
            "Purchase Notice", "Prohibited Items Statement", "Terms of Service and User Management", "Return and Exchange Service", "Disclaimer"
          </p>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="accent-primary h-4 w-4 rounded" />
              <span>I have read and agree to the above agreement</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none text-muted-foreground">
              <input type="checkbox" checked={dontAskAgain} onChange={(e) => setDontAskAgain(e.target.checked)} className="accent-primary h-4 w-4 rounded" />
              <span>Do not ask me again to agree to the above agreement</span>
            </label>
          </div>
        </div>

        {/* Submit bar */}
        <div className="sticky bottom-20 lg:bottom-0 rounded-2xl border bg-card shadow-card-hover px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Total Amount to be Paid <span className="text-xs">(international shipping fees are not included)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-0.5">
              <span className="text-muted-foreground text-sm">$</span>
              <span className="font-display text-3xl text-primary">{total.toFixed(2)}</span>
            </div>
            <button onClick={handleSubmit} disabled={!agreed || items.length === 0}
              className="rounded-full bg-primary text-primary-foreground px-10 py-3 font-semibold text-sm hover:bg-primary-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
              Submit Order
            </button>
          </div>
        </div>
      </div>

      {/* Address modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-background z-10">
              <h2 className="font-display text-xl">{modal.editing ? "Edit Shipping Address" : "Added Shipping Address"}</h2>
              <button onClick={closeModal} className="h-9 w-9 rounded-full hover:bg-muted inline-flex items-center justify-center transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-primary mr-0.5">*</span> Name
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input {...field("firstName")} placeholder="First Name"
                    className="rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground" />
                  <input {...field("lastName")} placeholder="Last Name"
                    className="rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground" />
                </div>
              </div>

              {/* Location address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  <span className="text-primary mr-0.5">*</span> Location Address
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  If your province or city is not listed, please enter it directly in the input field at the bottom of the dropdown.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: "country" as const, placeholder: "Country" },
                    { key: "province" as const, placeholder: "Province" },
                    { key: "city" as const, placeholder: "City" },
                  ].map(({ key, placeholder }) => (
                    <div key={key} className="relative">
                      <select {...field(key)}
                        className="w-full appearance-none rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary text-muted-foreground">
                        <option value="">{placeholder}</option>
                        {key === "country" && <>
                          <option>United Arab Emirates</option>
                          <option>Saudi Arabia</option>
                          <option>United Kingdom</option>
                          <option>France</option>
                          <option>United States</option>
                        </>}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▾</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-primary mr-0.5">*</span> Detailed Address
                </label>
                <textarea {...field("detailedAddress")} rows={3}
                  placeholder="Enter the street/road name. Please fill in the house number/room number in the corresponding fields below."
                  className="w-full rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground resize-none" />
              </div>

              {/* House number */}
              <div>
                <label className="block text-sm font-medium mb-2">House number</label>
                <input {...field("houseNumber")}
                  placeholder="Please enter the building number/room number. Do not repeat this information in the detailed address."
                  className="w-full rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground" />
              </div>

              {/* Shipping company */}
              <div>
                <label className="block text-sm font-medium mb-2">Shipping Company</label>
                <input {...field("shippingCompany")}
                  placeholder="Please enter the recipient company name (if applicable), otherwise leave blank."
                  className="w-full rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground" />
              </div>

              {/* Postcode */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-primary mr-0.5">*</span> Postcode
                </label>
                <input {...field("postcode")}
                  className="w-full rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </div>

              {/* Mobile number */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-primary mr-0.5">*</span> Mobile Number
                </label>
                <div className="grid grid-cols-[140px_1fr] gap-3">
                  <div className="relative">
                    <select {...field("phoneCode")}
                      className="w-full appearance-none rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary text-muted-foreground">
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+1">🇺🇸 +1</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▾</span>
                  </div>
                  <input {...field("phone")} type="tel"
                    className="rounded-xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>

              {/* Default address toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Default Address</span>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, isDefault: !f.isDefault }))}
                  className={`relative h-6 w-11 rounded-full transition-colors ${form.isDefault ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.isDefault ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex gap-3 px-6 py-5 border-t sticky bottom-0 bg-background">
              <button onClick={closeModal}
                className="flex-1 rounded-xl border py-3 text-sm font-medium hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={saveAddress}
                className="flex-1 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary-deep transition-colors">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
