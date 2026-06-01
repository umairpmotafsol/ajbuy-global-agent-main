import { Link } from "@tanstack/react-router";
import { ShoppingCart, ClipboardList, CreditCard, Search, Package, Send, Truck } from "lucide-react";

const steps = [
  { label: "Select\nProducts",          icon: ShoppingCart, to: "/cart" },
  { label: "Confirm\nOrder",            icon: ClipboardList, to: "/checkout" },
  { label: "Payment of\norder fees",    icon: CreditCard,    to: "/payment" },
  { label: "Inspection &\nWarehousing", icon: Search,        to: "/warehouse" },
  { label: "Submit\nParcels",           icon: Package,       to: "/warehouse" },
  { label: "Pay Shipping",              icon: Send,          to: "/shipping/consol-1" },
  { label: "Wait for\nReceipt",         icon: Truck,         to: "/tracking/AJ-10277" },
];

function stepCircleClass(isActive: boolean, isDone: boolean) {
  if (isActive) return "border-primary bg-primary/10 text-primary";
  if (isDone)   return "border-primary bg-primary text-primary-foreground";
  return "border-muted bg-muted/40 text-muted-foreground";
}

function stepLabelClass(isActive: boolean, isDone: boolean) {
  if (isActive) return "text-primary font-semibold";
  if (isDone)   return "text-primary/70";
  return "text-muted-foreground";
}

function dotClass(isDone: boolean, isCurrent: boolean) {
  if (isDone)    return "bg-primary/50";
  if (isCurrent) return "bg-primary/30";
  return "bg-muted";
}

export function OrderStepper({ activeStep = 0 }: Readonly<{ activeStep?: number }>) {
  return (
    <div className="rounded-2xl border bg-card shadow-card p-5 md:p-6">
      <div className="flex items-start w-full">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === activeStep;
          const isDone = i < activeStep;
          const isClickable = isDone || isActive;

          const inner = (
            <div className="flex flex-col items-center gap-2 flex-1 min-w-0 text-center">
              <div className={`h-10 w-10 md:h-14 md:w-14 rounded-full flex items-center justify-center border-2 transition-colors shrink-0 ${stepCircleClass(isActive, isDone)}`}>
                <Icon className="h-4 w-4 md:h-6 md:w-6" strokeWidth={1.5} />
              </div>
              <span className={`text-[10px] md:text-xs leading-tight whitespace-pre-line px-1 ${stepLabelClass(isActive, isDone)}`}>
                {step.label}
              </span>
            </div>
          );

          return (
            <div key={step.label} className="flex items-start flex-1 min-w-0">
              {isClickable ? (
                <Link to={step.to} className="flex-1 min-w-0 hover:opacity-80 transition-opacity">
                  {inner}
                </Link>
              ) : (
                <div className="flex-1 min-w-0 cursor-default">{inner}</div>
              )}
              {i < steps.length - 1 && (
                <div className="flex items-center mt-5 md:mt-7 shrink-0">
                  <div className="flex gap-0.5">
                    {["d1","d2","d3","d4","d5"].map((k) => (
                      <div key={k} className={`h-1 w-1.5 rounded-full ${dotClass(isDone, isActive)}`} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
