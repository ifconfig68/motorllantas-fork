import React, { useState } from "react";
import "./TireSearch.css";
import plateIcon from "../assets/img/placa.png";
// @ts-ignore
import vehicleData from "../data/vehicleData";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard"; // 👈 IMPORTANTE

const API_URL = import.meta.env.VITE_API_URL;

const searchOptions = [
  { name: "PLACA", icon: plateIcon, type: "plate" },
  { name: "MARCA DE VEHÍCULO", type: "vehicle" },
  { name: "MEDIDA DE LLANTA", type: "size" },
  { name: "MARCA DE LLANTA", type: "tire-brand" },
];

const TireSearch: React.FC = () => {
  const [selected, setSelected] = useState(searchOptions[1].name);
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [assignedCar, setAssignedCar] = useState<any>(null);

  const { addToCart } = useCart();

  // 🔍 Buscar por marca/año/modelo
  const handleSearch = async (customBrand?: string, customYear?: string, customModel?: string) => {
    const b = customBrand || brand;
    const y = customYear || year;
    const m = customModel || model;

    if (!b || !y || !m) {
      alert("Selecciona marca, año y modelo o busca por placa");
      return;
    }

    const tireSizes = vehicleData[b]?.[y]?.[m] || [];
    if (tireSizes.length === 0) {
      alert("No hay medidas disponibles para la selección");
      setSizes([]);
      setResults([]);
      return;
    }

    setSizes(tireSizes);
    setResults([]);
    setLoading(true);

    try {
      // @ts-ignore
      const fetchPromises = tireSizes.map((size) =>
        fetch(`${API_URL}/match?size=${encodeURIComponent(size)}`)
          .then((res) => (res.ok ? res.json() : []))
          .catch((err) => {
            console.error(`Error buscando medida ${size}:`, err);
            return [];
          })
      );

      const resultsBySize = await Promise.all(fetchPromises);
      const allResults = Array.from(
        // @ts-ignore
        new Map(resultsBySize.flat().map((r) => [r.id, r])).values()
      );

      setResults(allResults);
    } catch (err) {
      console.error("Error al buscar llantas:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 🚗 Buscar por placa (random)
  const handlePlateSearch = async () => {
    if (!plate) {
      alert("Ingresa una placa válida");
      return;
    }

    const brands = Object.keys(vehicleData);
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    const years = Object.keys(vehicleData[randomBrand]);
    const randomYear = years[Math.floor(Math.random() * years.length)];
    const models = Object.keys(vehicleData[randomBrand][randomYear]);
    const randomModel = models[Math.floor(Math.random() * models.length)];

    const tempCar = {
      plate,
      brand: randomBrand,
      year: randomYear,
      model: randomModel,
    };

    setAssignedCar(tempCar);

    console.log(`🔹 ${plate} asignado a:`, tempCar);

    await handleSearch(randomBrand, randomYear, randomModel);
  };

  // 🛒 Añadir al Carrito
  const handleAddToCart = (product: any) => {
    const productToAdd = {
      id: product.id,
      name: product.title || product.name,
      price: product.regular_price || product.price || 0,
      image: product.image_link || product.image || "/default.jpg",
      quantity: 1,
    };

    addToCart(productToAdd);
  };

  return (
    <div className="tire-search-container">
      {/* HEADER */}
      <div className="header">
        <div className="step-number">2</div>
        <div className="step-title">BUSCA TU LLANTA POR:</div>
      </div>

      {/* OPCIONES */}
      <div className="search-options">
        {searchOptions.map((option) => (
          <div
            key={option.name}
            className={`search-option ${selected === option.name ? "selected" : ""} ${
              !option.icon ? "no-icon" : ""
            }`}
            onClick={() => setSelected(option.name)}
          >
            {option.icon && (
              <div className="icon">
                <img src={option.icon} alt={option.name} />
              </div>
            )}
            <div className="text">{option.name}</div>
          </div>
        ))}
      </div>

      {/* 🚗 Buscar por PLACA */}
      {selected === "PLACA" && (
        <div className="plate-search">
          <h3>Buscar por placa</h3>
          <input
            type="text"
            placeholder="Ej: ABC123"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
          />
          <button onClick={handlePlateSearch}>Buscar placa</button>

          {assignedCar && (
            <p>
              🔹 Placa <strong>{assignedCar.plate}</strong> asignada a{" "}
              <strong>{assignedCar.brand} {assignedCar.model} ({assignedCar.year})</strong>.
            </p>
          )}
        </div>
      )}

      {/* 🔍 Buscar por MARCA DE VEHÍCULO */}
      {selected === "MARCA DE VEHÍCULO" && (
        <div className="vehicle-search">
          <h3>Buscar por marca, año y modelo</h3>

          <div className="selectors">
            <select onChange={(e) => setBrand(e.target.value)} value={brand}>
              <option value="">Marca</option>
              {Object.keys(vehicleData).map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {brand && (
              <select onChange={(e) => setYear(e.target.value)} value={year}>
                <option value="">Año</option>
                {Object.keys(vehicleData[brand]).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            )}

            {brand && year && (
              <select onChange={(e) => setModel(e.target.value)} value={model}>
                <option value="">Modelo</option>
                {Object.keys(vehicleData[brand][year]).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            )}

            <button onClick={() => handleSearch()}>Buscar</button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && <p>🔄 Buscando llantas disponibles...</p>}

      {/* MEDIDAS */}
      {!loading && sizes.length > 0 && (
        <p>
          <strong>Medidas compatibles:</strong> {sizes.join(", ")}
        </p>
      )}

      {/* 🧾 RESULTADOS */}
      <div className="results">
        {!loading && results.length > 0 ? (
          results.map((r) => (
            <ProductCard
              key={r.id}
              imageUrl={r.image_link || "/default.jpg"}
              title={r.title}
              grip={r.grip || "A"}
              rating={r.rating || 4}
              stock={r.stock}
              shipping={r.availability === "in_stock" ? "Envío inmediato" : "Bajo pedido"}
              oldPrice={r.old_price ? `S/ ${r.old_price}` : undefined}
              price={`S/ ${r.regular_price}`}
              brandLogo={r.brand_logo || "/default-brand.png"}
              discount={r.discount || 10}
              onAddToCart={() => handleAddToCart(r)}
            />
          ))
        ) : (
          !loading && <p>No se encontraron llantas compatibles.</p>
        )}
      </div>
    </div>
  );
};

export default TireSearch;
