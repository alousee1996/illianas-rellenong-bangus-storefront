import Image from "next/image";
import { Quote } from "lucide-react";

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-forest-dark py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/story.jpg"
                alt="Hands preparing rellenong bangus in a Filipino kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gold text-center shadow-xl lg:-right-6">
              <span className="font-display text-2xl text-forest-dark">62</span>
              <span className="text-[9px] font-medium uppercase tracking-wider text-forest-dark">
                Years
              </span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="font-serif text-sm tracking-[0.3em] text-gold uppercase">
              Our Story
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
              A recipe passed
              <br />
              <span className="italic text-gold">from lola to mother to me.</span>
            </h2>

            <div className="mt-6 space-y-4 text-cream/70">
              <p className="leading-relaxed">
                In 1962, in a small kitchen in Malabon, Illiana&apos;s
                grandmother perfected a way to debone a milkfish without
                breaking the skin — then stuff it with a sofrito so fragrant
                the neighbors would come knocking.
              </p>
              <p className="leading-relaxed">
                Three generations later, we still make it the same way: by
                hand, with patience, with the same knife her grandmother
                sharpened every Sunday. No preservatives. No shortcuts. Just
                the dish that built our family.
              </p>
            </div>

            <figure className="mt-8 border-l-2 border-gold pl-5">
              <Quote className="h-5 w-5 text-gold/50" />
              <blockquote className="mt-2 font-serif text-lg italic text-cream/90">
                &ldquo;If the fish isn&apos;t smiling when it comes out of the
                pan, it&apos;s not done. That&apos;s the only rule.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-xs tracking-wider text-cream/50 uppercase">
                — Illiana, founder
              </figcaption>
            </figure>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "3", label: "Generations" },
                { value: "12", label: "Steps, by hand" },
                { value: "24h", label: "Marinade time" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl text-gold">{stat.value}</div>
                  <div className="mt-1 text-xs text-cream/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
