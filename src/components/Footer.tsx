import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12 px-6 text-sm bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-8">
        <div>
          <h3 className="tracking-[0.2em] font-medium mb-2">LA COQUETERÍA</h3>
          <p className="text-gray-600">Moda minimalista y sostenible</p>
        </div>
        <div>
          <h3 className="tracking-[0.2em] font-medium mb-2">NAVEGACIÓN</h3>
          <div className="flex flex-col space-y-2 text-gray-600">
            <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
            <Link to="/vestidos" className="hover:text-black transition-colors">Vestidos</Link>
            <Link to="/pantalones" className="hover:text-black transition-colors">Pantalones</Link>
            <Link to="/tops" className="hover:text-black transition-colors">Tops</Link>
            <Link to="/faldas" className="hover:text-black transition-colors">Faldas</Link>
          </div>
        </div>
        <div>
          <h3 className="tracking-[0.2em] font-medium mb-2">CONTACTO</h3>
          <p className="text-gray-600">Email: info@lacoqueteria.com</p>
          <p className="text-gray-600">Teléfono: +56 9 1234 5678</p>
        </div>
        <div>
          <h3 className="tracking-[0.2em] font-medium mb-2">SÍGUENOS</h3>
          <div className="flex flex-col space-y-2 text-gray-600">
            <a href="https://www.instagram.com/la_coqueteria_boutique/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:underline hover:text-black transition-colors">Facebook</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto text-center text-gray-400 text-xs pt-8 border-t border-gray-200">
        &copy; {new Date().getFullYear()} La Coquetería. Todos los derechos reservados.
      </div>
    </footer>
  );
}
