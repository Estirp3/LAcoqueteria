import { Link } from "react-router-dom";

type Props = {
  title: string;
  image: string;
  to: string;
};

export default function CategoryCard({ title, image, to }: Props) {
  return (
    <Link
      to={to}
      className="group relative block h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-2xl tracking-[0.2em] font-light mb-2">{title}</h3>
        <span className="inline-block text-xs uppercase tracking-widest border-b border-white/50 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          Ver Colección
        </span>
      </div>
    </Link>
  );
}
