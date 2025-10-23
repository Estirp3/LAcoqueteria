type Props = { name: string; price: string; image: string };

export default function ProductCard({ name, price, image }: Props) {
  return (
    <div className="text-center group">
      <div className="img-wrap h-80 mb-4">
        <div className="img-zoom" style={{ backgroundImage: `url(${image})` }} />
      </div>
      <h4 className="font-medium text-base mb-1">{name}</h4>
      <p className="text-sm text-gray-600">{price}</p>
    </div>
  );
}
