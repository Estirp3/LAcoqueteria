import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  nombre: string;
  precio: number;
  img: string;
  category: string;
};

export default function ProductCard({ id, nombre, precio, img, category }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navegar a la categoría del producto (o a una página de detalle si existiera)
    navigate(`/${category.toLowerCase()}`);
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-[3/4]">
        <div
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
          style={{ backgroundImage: `url(${img})` }}
        />
        {/* Overlay sutil al hacer hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="text-center">
        <h4 className="font-medium text-lg mb-1 text-gray-900">{nombre}</h4>
        <p className="text-gray-500 font-light">${(precio || 0).toLocaleString("es-CL")}</p>
      </div>
    </div>
  );
}
