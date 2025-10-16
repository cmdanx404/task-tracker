import { reviews } from "@/data/reviews";

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 italic mb-3">{r.message}</p>
            <p className="font-semibold text-gray-800">{r.name}</p>
            <p className="text-yellow-500">{"★".repeat(r.rating)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
