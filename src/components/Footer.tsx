export default function Footer() {
  return (
    <footer className="border-t border-line py-12 px-6 text-sm">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-8">
        <div>
          <h3 className="tracking-[0.2em] font-medium mb-2">LA COQUETERÍA</h3>
          <p>Moda minimalista y sostenible</p>
        </div>
        <div>
          <h3 className="tracking-[0.2em] font-medium mb-2">CONTACTO</h3>
          <p>Email: info@lacoqueteria.com</p>
          <p>Teléfono: +56 9 1234 5678</p>
        </div>
        <div>
          <h3 className="tracking-[0.2em] font-medium mb-2">SÍGUENOS</h3>
          <div className="flex flex-col space-y-2">
            <a href="https://www.instagram.com/la_coqueteria_boutique/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Facebook</a>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} La Coquetería. Todos los derechos reservados.
      </p>
    </footer>
  );
}
