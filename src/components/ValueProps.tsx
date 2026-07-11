import { Truck, Leaf, Award, Clock } from "lucide-react";

const props = [
  {
    icon: Clock,
    title: "Hand-Made Fresh",
    description: "Packed every Tuesday & Friday",
  },
  {
    icon: Truck,
    title: "Cold-Chain Delivery",
    description: "Metro Manila & nationwide shipping",
  },
  {
    icon: Leaf,
    title: "No Preservatives",
    description: "Just real food, real ingredients",
  },
  {
    icon: Award,
    title: "Three Generations",
    description: "The same recipe since 1962",
  },
];

export function ValueProps() {
  return (
    <section className="border-b border-bone bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {props.map((prop) => (
            <div
              key={prop.title}
              className="flex items-start gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/8 text-forest">
                <prop.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-sm text-charcoal">
                  {prop.title}
                </h3>
                <p className="mt-0.5 text-xs text-stone">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
