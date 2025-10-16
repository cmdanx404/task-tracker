import { featuredProducts } from "@/data/featuredProducts";

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuredProducts.map((item) => (
          <div key={item.id} className="bg-white shadow p-4 rounded-lg text-center">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-blue-600 font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
