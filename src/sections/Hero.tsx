export default function Hero() {
  return (
    <section id="nueva-coleccion" className="h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center text-center bg-bone px-6">
      <h2 className="text-3xl tracking-[0.2em] font-light mb-4">NUEVA COLECCIÓN</h2>
      <p className="text-lg mb-6">Descubre nuestras nuevas prendas</p>
      <a href="#destacados" className="border border-ink px-8 py-3 uppercase tracking-[0.2em] text-sm hover:bg-ink hover:text-white transition">
        Ver Colección
      </a>
    </section>
  );
}
