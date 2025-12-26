import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";

const DebugApiPage = () => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts({ page, per_page: perPage });
        setData(response);
        // If the API returns meta separately, we'd need to adjust this
        // For now, assuming fetchProducts returns the data array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, perPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">API Debug: /products</h1>

      {/* Pagination Controls */}
      <div className="mb-4 flex gap-4 items-center">
        <div>
          <label className="mr-2">Page:</label>
          <input
            type="number"
            min="1"
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value) || 1)}
            className="border px-2 py-1 w-20"
          />
        </div>
        <div>
          <label className="mr-2">Per Page:</label>
          <select
            value={perPage}
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            className="border px-2 py-1"
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="px-3 py-1 bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-300"
        >
          Next
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {data && (
        <>
          <p className="mb-2 text-sm text-gray-600">
            Showing {data.length} products
          </p>

          {/* Product Links for Testing */}
          <div className="mb-4 p-4 bg-blue-50 rounded">
            <h2 className="font-bold mb-2">Quick Test Links:</h2>
            <div className="flex flex-wrap gap-2">
              {data.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  {product.slug}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[80vh]">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

export default DebugApiPage;
