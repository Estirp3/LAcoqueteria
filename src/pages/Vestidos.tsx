import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

type Vestido = {
  id: string;
  nombre: string;
  precio: number;
  img: string;
  color: "NEGRO" | "BLANCO" | "ARENA" | "VERDE";
  talla: "XS" | "S" | "M" | "L" | "XL";
};

const SIZES: Vestido["talla"][] = ["XS", "S", "M", "L", "XL"];
const COLORS: Vestido["color"][] = ["NEGRO", "BLANCO", "ARENA", "VERDE"];

const ITEMS: Vestido[] = [
  { id: "v1", nombre: "Vestido lino arena",   precio: 39990, img: "https://picsum.photos/id/1011/800/1000", color: "ARENA", talla: "S" },
  { id: "v2", nombre: "Vestido midi negro",   precio: 44990, img: "https://picsum.photos/id/1005/800/1000", color: "NEGRO", talla: "M" },
  { id: "v3", nombre: "Vestido seda oliva",   precio: 54990, img: "https://picsum.photos/id/1015/800/1000", color: "VERDE", talla: "M" },
  { id: "v4", nombre: "Vestido camisero",     precio: 36990, img: "https://picsum.photos/id/1027/800/1000", color: "BLANCO", talla: "L" },
  { id: "v5", nombre: "Vestido satín negro",  precio: 59990, img: "https://picsum.photos/id/1021/800/1000", color: "NEGRO", talla: "S" },
  { id: "v6", nombre: "Vestido maxi arena",   precio: 48990, img: "https://picsum.photos/id/1035/800/1000", color: "ARENA", talla: "M" },
  { id: "v7", nombre: "Vestido cruzado",      precio: 42990, img: "https://picsum.photos/id/1042/800/1000", color: "BLANCO", talla: "XS" },
  { id: "v8", nombre: "Vestido halter oliva", precio: 51990, img: "https://picsum.photos/id/1048/800/1000", color: "VERDE", talla: "L" },
  { id: "v9", nombre: "Vestido recto negro",  precio: 33990, img: "https://picsum.photos/id/1050/800/1000", color: "NEGRO", talla: "XL" },
  { id: "v10", nombre: "Vestido midi arena",  precio: 45990, img: "https://picsum.photos/id/1062/800/1000", color: "ARENA", talla: "S" },
  { id: "v11", nombre: "Vestido drapeado",    precio: 48990, img: "https://picsum.photos/id/1074/800/1000", color: "BLANCO", talla: "M" },
  { id: "v12", nombre: "Vestido A-line verde",precio: 37990, img: "https://picsum.photos/id/1084/800/1000", color: "VERDE", talla: "S" },
];

function formatCLP(n: number) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
}

export default function Vestidos() {
  const [query, setQuery] = useState("");
  const [talla, setTalla] = useState<Vestido["talla"] | "">("");
  const [color, setColor] = useState<Vestido["color"] | "">("");
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [sort, setSort] = useState<"relevancia" | "precio-asc" | "precio-desc">("relevancia");

  const filtered = useMemo(() => {
    let arr = [...ITEMS];

    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(v => v.nombre.toLowerCase().includes(q));
    }
    if (talla) arr = arr.filter(v => v.talla === talla);
    if (color) arr = arr.filter(v => v.color === color);
    arr = arr.filter(v => v.precio <= maxPrice);

    if (sort === "precio-asc") arr.sort((a, b) => a.precio - b.precio);
    if (sort === "precio-desc") arr.sort((a, b) => b.precio - a.precio);

    return arr;
  }, [query, talla, color, maxPrice, sort]);

  return (
    <section className="px-6 py-8 md:py-12">
      {/* Encabezado */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-8">
        <h1 className="text-2xl tracking-[0.3em] font-light text-center">VESTIDOS</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px,1fr] gap-8">
        {/* Filtros */}
        <aside className="md:sticky md:top-[88px] h-max rounded-2xl border border-line p-4 bg-white">
          <div className="space-y-4">
            {/* Buscador */}
            <div>
              <label className="block text-xs tracking-wider mb-1">BUSCAR</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nombre del producto…"
                className="w-full border border-line rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Talla */}
            <div>
              <label className="block text-xs tracking-wider mb-1">TALLA</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTalla("")}
                  className={`px-3 py-1 rounded-full border ${talla === "" ? "bg-ink text-white" : "border-line"}`}
                >
                  Todas
                </button>
                {SIZES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTalla(t)}
                    className={`px-3 py-1 rounded-full border ${talla === t ? "bg-ink text-white" : "border-line"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs tracking-wider mb-1">COLOR</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setColor("")}
                  className={`px-3 py-1 rounded-full border ${color === "" ? "bg-ink text-white" : "border-line"}`}
                >
                  Todos
                </button>
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-3 py-1 rounded-full border ${color === c ? "bg-ink text-white" : "border-line"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-xs tracking-wider mb-1">
                PRECIO MÁXIMO: <span className="font-medium">{formatCLP(maxPrice)}</span>
              </label>
              <input
                type="range"
                min={30000}
                max={60000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Ordenar */}
            <div>
              <label className="block text-xs tracking-wider mb-1">ORDENAR</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="w-full border border-line rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Grid productos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                name={p.nombre}
                price={formatCLP(p.precio)}
                image={p.img}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
