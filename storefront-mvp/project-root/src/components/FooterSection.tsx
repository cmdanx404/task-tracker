export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-8 text-center">
      <p>© {new Date().getFullYear()} Flash Appliances. All rights reserved.</p>
      <a
        href="https://www.google.com/maps"
        target="_blank"
        className="block mt-4"
      >
        <img
          src="/placeholder/map-location.png"
          alt="Store Location"
          className="mx-auto w-48 rounded-lg border-2 border-white"
        />
      </a>
    </footer>
  );
}
