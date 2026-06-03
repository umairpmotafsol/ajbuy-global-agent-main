import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type ServiceId =
  | "garment-pocket"
  | "product-photos"
  | "zipper-bag"
  | "bubble-mailer"
  | "customized-shipping"
  | "bubble-wrap"
  | "epe-filling"
  | "thread-trimming"
  | "air-column"
  | "corner-protector"
  | "palletized"
  | "power-test"
  | "box-removal"
  | "vacuum-bag"
  | "moisture-bag"
  | "inspection"
  | "product-videos"
  | "inspection-original";

export type Service = {
  id: ServiceId;
  name: string;
  description: string;
  price: string;
  category: "garment" | "photo-video" | "product-packaging" | "parcel-packaging" | "inspection" | "customized";
};

const services: Service[] = [
  {
    id: "garment-pocket",
    name: "Garment Pocket Opening Service",
    description: "Open all unopened pockets on garment items for enhanced practicality and detail quality.",
    price: "Free",
    category: "garment",
  },
  {
    id: "product-photos",
    name: "Detailed Product Photos",
    description: "Take product photos per your personalized needs.",
    price: "Free",
    category: "photo-video",
  },
  {
    id: "product-videos",
    name: "Product Videos",
    description: "Provide 360° videos of the products.",
    price: "CN ¥20 / PCS",
    category: "photo-video",
  },
  {
    id: "inspection-original",
    name: "Product Inspection with Original Packing",
    description: "Inspection on the outer packaging before product stock-in.",
    price: "CN ¥1 / PCS",
    category: "photo-video",
  },
  {
    id: "zipper-bag",
    name: "Unbranded Zipper Bag Replacement",
    description: "AJBuy uses a standard, unbranded zipper bag to package your products.",
    price: "Free",
    category: "product-packaging",
  },
  {
    id: "bubble-wrap",
    name: "Bubble Column Wrap",
    description: "Pack with bubble cushioning wraps for products.",
    price: "CN ¥7.5 / PCS",
    category: "product-packaging",
  },
  {
    id: "box-removal",
    name: "Packing Box Removal",
    description: "Remove the original packing box from products.",
    price: "CN ¥0.5 / Parcel",
    category: "product-packaging",
  },
  {
    id: "bubble-mailer",
    name: "Bubble Mailer Packaging",
    description: "Pack parcels with bubble mailers.",
    price: "Free",
    category: "parcel-packaging",
  },
  {
    id: "epe-filling",
    name: "EPE Filling",
    description: "Fill up the space inside carton-packaged parcels with foam boards.",
    price: "CN ¥5 / Parcel",
    category: "parcel-packaging",
  },
  {
    id: "air-column",
    name: "Air Column Bags",
    description: "Pack parcels with air column bags.",
    price: "CN ¥15 / Parcel",
    category: "parcel-packaging",
  },
  {
    id: "corner-protector",
    name: "Corner Protector",
    description: "Reinforce carton-packaged parcels with paper corner protectors for better protection.",
    price: "CN ¥8 / Parcel",
    category: "parcel-packaging",
  },
  {
    id: "palletized",
    name: "Palletized Packaging",
    description: "Standard palletized packaging for large-sized items per export standards.",
    price: "CN ¥180 / Parcel",
    category: "parcel-packaging",
  },
  {
    id: "vacuum-bag",
    name: "Vacuum Bag Packaging",
    description: "Pack parcels with vacuum bags for compression and space efficiency.",
    price: "CN ¥20 / Parcel",
    category: "parcel-packaging",
  },
  {
    id: "moisture-bag",
    name: "Moisture-Proof Bag Packaging",
    description: "Pack parcels with moisture-proof bags for better protection.",
    price: "CN ¥7 / Parcel",
    category: "parcel-packaging",
  },
  {
    id: "inspection",
    name: "Detailed Product Inspection",
    description: "Detailed inspection before product stock-in.",
    price: "CN ¥3 / PCS",
    category: "inspection",
  },
  {
    id: "power-test",
    name: "Power-on Test for Electronics",
    description: "Power-on test before product stock-in (for 3C/Electronics).",
    price: "CN ¥5 / PCS",
    category: "inspection",
  },
  {
    id: "customized-shipping",
    name: "Customized Shipping Solution",
    description: "AJBuy's shipping experts will provide specific customized shipping solutions.",
    price: "CN ¥50 / Time",
    category: "customized",
  },
  {
    id: "thread-trimming",
    name: "Thread Trimming",
    description: "Remove excess threads from products.",
    price: "CN ¥2 / PCS",
    category: "inspection",
  },
];

const categoryLabels: Record<string, string> = {
  garment: "Garment Services",
  "photo-video": "Photo & Video Services",
  "product-packaging": "Product Packaging",
  "parcel-packaging": "Parcel Packaging",
  inspection: "Inspection & Testing",
  customized: "Shipping Experts",
};

type Props = {
  selectedServices: ServiceId[];
  onSelectionChange: (services: ServiceId[]) => void;
  remarks?: Record<string, string>;
  onRemarksChange?: (remarks: Record<string, string>) => void;
  type?: "product" | "parcel";
};

export function ValueAddedServices({ selectedServices, onSelectionChange, remarks, onRemarksChange, type = "parcel" }: Readonly<Props>) {
  const safeRemarks = remarks || {};
  const productCategories = ["garment", "photo-video", "product-packaging", "inspection"];
  const parcelCategories = ["customized", "parcel-packaging"];
  const allowedCategories = type === "product" ? productCategories : parcelCategories;

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(type === "product" ? ["product-packaging"] : ["parcel-packaging"])
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleService = (serviceId: ServiceId) => {
    const newSelected = selectedServices.includes(serviceId)
      ? selectedServices.filter((id) => id !== serviceId)
      : [...selectedServices, serviceId];
    onSelectionChange(newSelected);
  };

  const handleRemarkChange = (serviceId: ServiceId, value: string) => {
    if (onRemarksChange) {
      onRemarksChange({ ...remarks, [serviceId]: value });
    }
  };

  const categories = allowedCategories.filter((cat) => services.some((s) => s.category === cat));

  return (
    <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b">
        <h3 className="font-display text-lg">Value-Added Services</h3>
        <p className="text-xs text-muted-foreground mt-1">Enhance your order with optional services</p>
      </div>

      <div className="divide-y">
        {categories.map((category) => {
          const categoryServices = services.filter((s) => s.category === category && allowedCategories.includes(s.category));
          const isExpanded = expandedCategories.has(category);
          const selectedCount = categoryServices.filter((s) => selectedServices.includes(s.id)).length;

          return (
            <div key={category}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-muted/40 transition-colors"
              >
                <div className="text-left">
                  <p className="font-medium text-sm">{categoryLabels[category]}</p>
                  {selectedCount > 0 && (
                    <p className="text-xs text-primary">{selectedCount} selected</p>
                  )}
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Services list */}
              {isExpanded && (
                <div className="px-5 py-3 bg-muted/20 space-y-3">
                  {categoryServices.map((service) => (
                    <label key={service.id} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                        className="accent-primary mt-1 shrink-0 h-4 w-4 rounded"
                        aria-label={service.name}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-sm">{service.name}</p>
                          <span className="text-xs font-semibold text-primary whitespace-nowrap">
                            {service.price}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Remarks section */}
      {selectedServices.length > 0 && (
        <div className="px-5 py-4 bg-muted/20 space-y-3 border-t">
          <p className="text-sm font-medium">Service Instructions</p>
          {selectedServices.map((serviceId) => {
            const service = services.find((s) => s.id === serviceId);
            if (!service) return null;
            return (
              <div key={serviceId} className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {service.name} <span className="text-muted-foreground/60">(Optional)</span>
                </label>
                <textarea
                  value={safeRemarks[serviceId] ?? ""}
                  onChange={(e) => handleRemarkChange(serviceId, e.target.value)}
                  placeholder="Enter any specific instructions or details for this service..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  rows={2}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
