import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { user } from "@/lib/mock-data";

export type ShippingAddress = {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  province: string;
  city: string;
  detailedAddress: string;
  houseNumber: string;
  postcode: string;
  phoneCode: string;
  phone: string;
  isDefault: boolean;
};

const defaultAddresses: ShippingAddress[] = [
  {
    id: "addr-1",
    firstName: "Ahmed",
    lastName: "Al-Rashidi",
    country: "United Arab Emirates",
    province: "Dubai",
    city: "Dubai Marina",
    detailedAddress: "Marina Heights",
    houseNumber: "Apartment 1402",
    postcode: "00000",
    phoneCode: "+971",
    phone: "50 *** **89",
    isDefault: true,
  },
];

const emptyForm: Omit<ShippingAddress, "id"> = {
  firstName: "", lastName: "", country: "", province: "", city: "",
  detailedAddress: "", houseNumber: "", postcode: "",
  phoneCode: "+971", phone: "", isDefault: false,
};

type Props = {
  onConfirm: (addr: ShippingAddress) => void;
  onClose: () => void;
};

export function ShippingAddressModal({ onConfirm, onClose }: Readonly<Props>) {
  const [addresses, setAddresses] = useState<ShippingAddress[]>(defaultAddresses);
  const [selected, setSelected] = useState<string>(defaultAddresses[0].id);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<ShippingAddress, "id">>(emptyForm);

  const field = (key: keyof typeof form) => ({
    value: form[key] as string,
    onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  function saveNew() {
    const addr: ShippingAddress = { ...form, id: `addr-${Date.now()}` };
    setAddresses((prev) => [...prev, addr]);
    setSelected(addr.id);
    setShowForm(false);
  }

  function confirm() {
    const addr = addresses.find((a) => a.id === selected);
    if (addr) onConfirm(addr);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-background z-10">
          <h2 className="font-display text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" /> Select Delivery Address
          </h2>
          <button type="button" onClick={onClose} className="h-9 w-9 rounded-full hover:bg-muted inline-flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {!showForm ? (
            <>
              {/* Saved addresses */}
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label key={addr.id}
                    className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                      selected === addr.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}>
                    <input type="radio" name="addr" value={addr.id} checked={selected === addr.id}
                      onChange={() => setSelected(addr.id)} className="accent-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">{addr.firstName} {addr.lastName}</span>
                        <span className="text-xs text-muted-foreground">{addr.phoneCode} {addr.phone}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">Default</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5">
                        {addr.houseNumber}, {addr.detailedAddress}, {addr.city}
                      </div>
                      <div className="text-sm text-muted-foreground">{addr.country} · {addr.postcode}</div>
                    </div>
                  </label>
                ))}
              </div>

              <button type="button" onClick={() => setShowForm(true)}
                className="w-full rounded-xl border-2 border-dashed border-border py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                + Add new address
              </button>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 rounded-full border py-3 text-sm hover:bg-muted transition-colors">Cancel</button>
                <button type="button" onClick={confirm}
                  className="flex-1 rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary-deep transition-colors">
                  Confirm Address
                </button>
              </div>
            </>
          ) : (
            /* Add new address form */
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground">New Address</h3>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">First Name <span className="text-primary">*</span></span>
                  <input {...field("firstName")} className="mt-1 w-full rounded-xl border bg-muted/30 px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </label>
                <label className="block text-sm">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Last Name <span className="text-primary">*</span></span>
                  <input {...field("lastName")} className="mt-1 w-full rounded-xl border bg-muted/30 px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(["country","province","city"] as const).map((k) => (
                  <label key={k} className="block text-sm">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider capitalize">{k} <span className="text-primary">*</span></span>
                    <input {...field(k)} className="mt-1 w-full rounded-xl border bg-muted/30 px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                  </label>
                ))}
              </div>

              <label className="block text-sm">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Detailed Address <span className="text-primary">*</span></span>
                <textarea {...field("detailedAddress")} rows={2}
                  className="mt-1 w-full rounded-xl border bg-muted/30 px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">House / Apt No.</span>
                  <input {...field("houseNumber")} className="mt-1 w-full rounded-xl border bg-muted/30 px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </label>
                <label className="block text-sm">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Postcode <span className="text-primary">*</span></span>
                  <input {...field("postcode")} className="mt-1 w-full rounded-xl border bg-muted/30 px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </label>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-3">
                <label className="block text-sm">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Code</span>
                  <select {...field("phoneCode")} className="mt-1 w-full rounded-xl border bg-muted/30 px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                    <option>+971</option><option>+966</option><option>+44</option><option>+1</option>
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Mobile <span className="text-primary">*</span></span>
                  <input {...field("phone")} type="tel" className="mt-1 w-full rounded-xl border bg-muted/30 px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 rounded-full border py-3 text-sm hover:bg-muted transition-colors">Back</button>
                <button type="button" onClick={saveNew}
                  disabled={!form.firstName || !form.lastName || !form.country || !form.detailedAddress || !form.postcode || !form.phone}
                  className="flex-1 rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  Save Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { defaultAddresses };
export { user };
