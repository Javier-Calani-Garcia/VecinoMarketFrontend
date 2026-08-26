import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categorias } from '../data/categories';
import { buscarProductos } from '../data/products';
import ProductCard from '../components/product/ProductCard';

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const categoriaId = searchParams.get('categoria') || '';

  const resultados = useMemo(() => buscarProductos({ q, categoriaId }), [q, categoriaId]);

  function cambiarCategoria(id) {
    const params = new URLSearchParams(searchParams);
    if (id) params.set('categoria', id);
    else params.delete('categoria');
    setSearchParams(params);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
        {q ? `Resultados para "${q}"` : 'Todos los productos'}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{resultados.length} productos encontrados</p>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-56 shrink-0">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Categorías</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <button
                onClick={() => cambiarCategoria('')}
                className={`w-full text-left rounded px-2 py-1.5 ${!categoriaId ? 'bg-brand-50 dark:bg-gray-800 text-brand-700 dark:text-brand-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                Todas
              </button>
            </li>
            {categorias.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => cambiarCategoria(cat.id)}
                  className={`w-full text-left rounded px-2 py-1.5 ${categoriaId === cat.id ? 'bg-brand-50 dark:bg-gray-800 text-brand-700 dark:text-brand-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  {cat.nombre}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          {resultados.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No encontramos productos con esos filtros.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {resultados.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
