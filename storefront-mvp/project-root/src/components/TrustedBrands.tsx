import { trustedBrands } from "@/data/trustedBrands";

export default function TrustedBrands() {
  return (
    <section className="py-16 bg-white text-center overflow-hidden">
      <h2 className="text-3xl font-bold mb-8">Trusted Brands</h2>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {trustedBrands.map((logo, index) => (
          <img key={index} src={logo} alt="Brand Logo" className="h-16 inline-block" />
        ))}
      </div>
    </section>
  );
}
