import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Building2, ChevronLeft, ChevronRight, Ban, RotateCcw, Search } from 'lucide-react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const ESTADOS = [
  { value: '', label: 'Todos los estados' },
  { value: 'ACTIVA', label: 'Activa' },
  { value: 'SUSPENDIDA', label: 'Suspendida' },
  { value: 'CANCELADA', label: 'Cancelada' },
];

function badgeEstado(estado) {
  if (estado === 'ACTIVA') return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  if (estado === 'SUSPENDIDA') return 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
  return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
}

export default function EmpresasAdmin() {
  const { usuario, cargando: cargandoAuth } = useAuth();
  const [resultados, setResultados] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [estado, setEstado] = useState('');
  const [q, setQ] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [accionando, setAccionando] = useState(null);
  const [error, setError] = useState('');

  const porPagina = 30;

  useEffect(() => {
    if (!usuario || usuario.rol !== 'ADMIN') return;
    API.get('usuarios/empresas/lista/', { params: { page: pagina, estado: estado || undefined, q: busqueda || undefined } })
      .then((res) => {
        setResultados(res.data.results);
        setTotal(res.data.count);
        setError('');
      })
      .catch(() => setError('No se pudo cargar la lista de empresas.'));
  }, [usuario, pagina, estado, busqueda]);

  if (cargandoAuth) return null;
  if (!usuario) return <Navigate to="/login?next=/admin/empresas" replace />;
  if (usuario.rol !== 'ADMIN') return <Navigate to="/" replace />;

  async function toggleEstado(empresa) {
    setAccionando(empresa.id);
    const accion = empresa.estado === 'SUSPENDIDA' ? 'reactivar' : 'suspender';
    try {
      await API.post(`usuarios/empresas/${empresa.id}/${accion}/`);
      setResultados((prev) => prev.map((it) => (
        it.id === empresa.id ? { ...it, estado: accion === 'suspender' ? 'SUSPENDIDA' : 'ACTIVA' } : it
      )));
    } catch (err) {
      setError(err?.response?.data?.detail || 'No se pudo completar la acción.');
    } finally {
      setAccionando(null);
    }
  }

  function buscar(e) {
    e.preventDefault();
    setPagina(1);
    setBusqueda(q);
  }

  const totalPaginas = Math.max(1, Math.ceil(total / porPagina));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center gap-2 mb-1">
        <Building2 className="text-brand-600 dark:text-brand-400" size={24} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gestión de empresas</h1>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Todas las cuentas de empresa activas en VecinoMarket (ver solicitudes pendientes en su propia sección).
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <form onSubmit={buscar} className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por razón social o NIT..."
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <button type="submit" className="grid h-8 w-8 place-items-center rounded-md bg-brand-600 text-white hover:bg-brand-700">
            <Search size={16} />
          </button>
        </form>
        <select
          value={estado}
          onChange={(e) => { setEstado(e.target.value); setPagina(1); }}
          className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {ESTADOS.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-left text-gray-500 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 font-medium">Empresa</th>
              <th className="px-4 py-3 font-medium">Dueño</th>
              <th className="px-4 py-3 font-medium">Ubicación</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {resultados.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">Sin resultados.</td></tr>
            ) : resultados.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-3">
                  <div className="text-gray-800 dark:text-gray-200 font-medium">{e.razon_social}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">NIT {e.nit}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-700 dark:text-gray-300">{e.dueno_nombre}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{e.dueno_email}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{e.ciudad || '—'}{e.departamento ? `, ${e.departamento}` : ''}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeEstado(e.estado)}`}>{e.estado}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  {e.estado !== 'CANCELADA' && (
                    <button
                      onClick={() => toggleEstado(e)}
                      disabled={accionando === e.id}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50 ${
                        e.estado === 'SUSPENDIDA'
                          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100'
                          : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100'
                      }`}
                    >
                      {e.estado === 'SUSPENDIDA' ? <RotateCcw size={12} /> : <Ban size={12} />}
                      {e.estado === 'SUSPENDIDA' ? 'Reactivar' : 'Suspender'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{total} empresas en total</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={pagina <= 1}
            className="grid h-8 w-8 place-items-center rounded-full border border-gray-300 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronLeft size={16} />
          </button>
          <span>Página {pagina} de {totalPaginas}</span>
          <button onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={pagina >= totalPaginas}
            className="grid h-8 w-8 place-items-center rounded-full border border-gray-300 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
