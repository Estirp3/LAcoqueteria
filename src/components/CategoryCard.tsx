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
      className="group text-center border border-line bg-bone p-6 hover:shadow-md transition-transform duration-300 hover:-translate-y-1 rounded-2xl"
    >
      <div className="img-wrap h-64 mb-4">
        <div
          className="img-zoom w-full h-full bg-cover bg-center rounded-2xl group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <h3 className="text-lg tracking-[0.2em] font-normal mb-2">{title}</h3>
      <span className="underline text-sm">Ver colección</span>
    </Link>
  );
}
