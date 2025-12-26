import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../api/products";

/**
 * Simple Product Debug Page
 * Shows raw API response for debugging
 */
const ProductDebugPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      console.log("=== PRODUCT DEBUG PAGE ===");
      console.log("Slug from URL:", slug);

      setLoading(true);
      setError(null);

      try {
        const result = await fetchProductBySlug(slug);
        console.log("API Result:", result);
        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Debug Page</h1>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p>
          <strong>URL Slug/ID:</strong> {slug}
        </p>
        <p>
          <strong>Loading:</strong> {loading ? "Yes" : "No"}
        </p>
        <p>
          <strong>Error:</strong> {error || "None"}
        </p>
        <p>
          <strong>Has Data:</strong> {data ? "Yes" : "No"}
        </p>
      </div>

      {loading && (
        <div className="p-4 bg-blue-50 rounded">
          <p>Loading product data...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {data && (
        <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[80vh]">
          <h2 className="font-bold mb-2">Raw API Response:</h2>
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {!loading && !error && !data && (
        <div className="p-4 bg-yellow-50 rounded">
          <p>No data returned from API</p>
        </div>
      )}
    </div>
  );
};

export default ProductDebugPage;
