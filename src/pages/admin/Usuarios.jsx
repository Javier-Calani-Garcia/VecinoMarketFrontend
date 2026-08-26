import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Users, ChevronLeft, ChevronRight, Lock, Unlock, Search } from 'lucide-react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const ROLES = [
  { value: '', label: 'Todos los roles' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'EMPRESA', label: 'Empresa' },
  { value: 'EMPLEADO', label: 'Empleado' },
  { value: 'COMPRADOR', label: 'Comprador' },
];

const ESTADOS = [
  { value: '', label: 'Todos los estados' },
  { value: 'ACTIVO', label: 'Activo' },
  { value: 'INACTIVO', label: 'Inactivo' },
  { value: 'BLOQUEADO', label: 'Bloqueado' },
];

function badgeEstado(estado) {
  if (estado === 'ACTIVO') return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  if (estado === 'BLOQUEADO') return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400';
  return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
}

export default function Usuarios() {
  const { usuario, cargando: cargandoAuth } = useAuth();
  const [resultados, setResultados] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [rol, setRol] = useState('');
  const [estado, setEstado] = useState('');
  const [q, setQ] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [accionando, setAccionando] = useState(null);
  const [error, setError] = useState('');

  const porPagina = 30;

  useEffect(() => {
    if (!usuario || usuario.rol !== 'ADMIN') return;
    API.get('usuarios/lista/', { params: { page: pagina, rol: rol || undefined, estado: estado || undefined, q: busqueda || undefined } })
      .then((res) => {
        setResultados(res.data.results);
        setTotal(res.data.count);
        setError('');
      })
      .catch(() => setError('No se pudo cargar la lista de usuarios.'));
  }, [usuario, pagina, rol, estado, busqueda]);

  if (cargandoAuth) return null;
  if (!usuario) return <Navigate to="/login?next=/admin/usuarios" replace />;
  if (usuario.rol !== 'ADMIN') return <Navigate to="/" replace />;

  async function toggleBloqueo(u) {
    setAccionando(u.id);
    const accion = u.estado === 'BLOQUEADO' ? 'desbloquear' : 'bloquear';
    try {
      await API.post(`usuarios/${u.id}/${accion}/`);
      setResultados((prev) => prev.map((it) => (
        it.id === u.id ? { ...it, estado: accion === 'bloquear' ? 'BLOQUEADO' : 'ACTIVO' } : it
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
        <Users className="text-brand-600 dark:text-brand-400" size={24} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gestión de usuarios</h1>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Usuarios de toda la plataforma: compradores, empresas, empleados y administradores.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <form onSubmit={buscar} className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <button type="submit" className="grid h-8 w-8 place-items-center rounded-md bg-brand-600 text-white hover:bg-brand-700">
            <Search size={16} />
          </button>
        </form>
        <select
          value={rol}
          onChange={(e) => { setRol(e.target.value); setPagina(1); }}
          className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {ROLES.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
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
              <th className="px-4 py-3 font-medium">Usuario</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Registrado</th>
              <th className="px-4 py-3 font-medium text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {resultados.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">Sin resultados.</td></tr>
            ) : resultados.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3">
                  <div className="text-gray-800 dark:text-gray-200 font-medium">{u.nombre} {u.apellido}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{u.email}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.rol}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeEstado(u.estado)}`}>{u.estado}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {new Date(u.fecha_registro).toLocaleDateString('es-BO')}
                </td>
                <td className="px-4 py-3 text-right">
                  {u.id === usuario.id ? (
                    <span className="text-xs text-gray-400 dark:text-gray-500">Tu cuenta</span>
                  ) : (
                    <button
                      onClick={() => toggleBloqueo(u)}
                      disabled={accionando === u.id}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50 ${
                        u.estado === 'BLOQUEADO'
                          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100'
                          : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100'
                      }`}
                    >
                      {u.estado === 'BLOQUEADO' ? <Unlock size={12} /> : <Lock size={12} />}
                      {u.estado === 'BLOQUEADO' ? 'Desbloquear' : 'Bloquear'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{total} usuarios en total</span>
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
