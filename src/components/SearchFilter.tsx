import { useMemo, useState } from "react";

type Category = "All" | "Electronics" | "Accessories" | "Home";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  description: string;
  icon: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    description: "Comfortable over-ear headphones with clear sound.",
    icon: "🎧",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 3299,
    description: "A tactile keyboard for focused work and gaming.",
    icon: "⌨️",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    description: "Track activity and stay connected throughout the day.",
    icon: "⌚",
  },
  {
    id: 4,
    name: "Desk Lamp",
    category: "Home",
    price: 1299,
    description: "An adjustable lamp for your desk or reading corner.",
    icon: "💡",
  },
  {
    id: 5,
    name: "USB-C Hub",
    category: "Accessories",
    price: 1799,
    description: "Expand your laptop connectivity with one compact hub.",
    icon: "🔌",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 2199,
    description: "Portable speaker with rich audio for everyday use.",
    icon: "🔊",
  },
  {
    id: 7,
    name: "Coffee Mug",
    category: "Home",
    price: 499,
    description: "A simple ceramic mug for your daily coffee.",
    icon: "☕",
  },
  {
    id: 8,
    name: "Laptop Stand",
    category: "Accessories",
    price: 1499,
    description: "Raise your screen for a more comfortable workspace.",
    icon: "💻",
  },
];

const categories: Category[] = ["All", "Electronics", "Accessories", "Home"];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [maxPrice, setMaxPrice] = useState(5000);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, maxPrice]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMaxPrice(5000);
  };

  return (
    <section className="search-panel" aria-labelledby="catalog-heading">
      <div className="panel-heading">
        <div>
          <h2 id="catalog-heading">Product catalog</h2>
          <p>Use one or more filters to refine the list.</p>
        </div>
        <span className="result-count" aria-live="polite">
          {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
        </span>
      </div>

      <div className="filters">
        <div className="search-field">
          <label htmlFor="product-search">Search products</label>
          <div className="input-with-icon">
            <span aria-hidden="true">⌕</span>
            <input
              id="product-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Try headphones, keyboard..."
            />
          </div>
        </div>

        <div className="category-field">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value as Category)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="price-field">
          <div className="price-label-row">
            <label htmlFor="price-filter">Maximum price</label>
            <output htmlFor="price-filter">{formatPrice(maxPrice)}</output>
          </div>
          <input
            id="price-filter"
            type="range"
            min="500"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
          <div className="range-labels">
            <span>₹500</span>
            <span>₹5,000</span>
          </div>
        </div>

        <button className="clear-button" type="button" onClick={clearFilters}>
          Clear filters
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-icon" aria-hidden="true">
                {product.icon}
              </div>
              <div className="product-card-content">
                <div className="product-meta">
                  <span className="category-tag">{product.category}</span>
                  <span className="product-id">#{product.id.toString().padStart(3, "0")}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong className="product-price">{formatPrice(product.price)}</strong>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <span aria-hidden="true">🔎</span>
          <h3>No products found</h3>
          <p>Try a different search term or adjust your filters.</p>
          <button className="clear-button" type="button" onClick={clearFilters}>
            Reset search
          </button>
        </div>
      )}
    </section>
  );
}

export default SearchFilter;
