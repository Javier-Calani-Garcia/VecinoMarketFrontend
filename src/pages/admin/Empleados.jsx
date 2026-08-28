import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserCog, ChevronLeft, ChevronRight, Ban, RotateCcw, Search } from 'lucide-react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { esStaff } from '../../utils/roles';

const ESTADOS = [
  { value: '', label: 'Todos los estados' },
  { value: 'ACTIVO', label: 'Activo' },
  { value: 'INACTIVO', label: 'Inactivo' },
];

function badgeEstado(estado) {
  return estado === 'ACTIVO'
    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
}

export default function Empleados() {
  const { usuario, cargando: cargandoAuth } = useAuth();
  const [resultados, setResultados] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [estado, setEstado] = useState('');
  const [q, setQ] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [accionando, setAccionando] = useState(null);
  const [error, setError] = useState('');

  const porPagina = 30;

  function cargarEmpleados() {
    return API.get('usuarios/empleados/lista-admin/', {
      params: { page: pagina, estado: estado || undefined, q: busqueda || undefined },
    })
      .then((res) => {
        setResultados(res.data.results);
        setTotal(res.data.count);
        setError('');
      })
      .catch(() => setError('No se pudo cargar la lista de empleados.'));
  }

  useEffect(() => {
    if (!usuario || !esStaff(usuario)) return;
    cargarEmpleados();
    API.get('usuarios/permisos/').then((res) => setPermisos(res.data)).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario, pagina, estado, busqueda]);

  if (cargandoAuth) return null;
  if (!usuario) return <Navigate to="/login?next=/admin/empleados" replace />;
  if (!esStaff(usuario)) return <Navigate to="/" replace />;

  async function toggleEstado(empleado) {
    setAccionando(empleado.id);
    const accion = empleado.estado === 'INACTIVO' ? 'reactivar-admin' : 'desactivar-admin';
    try {
      await API.post(`usuarios/empleados/${empleado.id}/${accion}/`);
      setResultados((prev) => prev.map((it) => (
        it.id === empleado.id ? { ...it, estado: accion === 'desactivar-admin' ? 'INACTIVO' : 'ACTIVO' } : it
      )));
    } catch {
      setError('No se pudo completar la acción.');
    } finally {
      setAccionando(null);
    }
  }

  async function togglePermiso(empleado, permiso) {
    const tiene = empleado.permisos.some((p) => p.id === permiso.id);
    try {
      const { data } = tiene
        ? await API.delete(`usuarios/empleados/${empleado.id}/permisos/${permiso.id}/`)
        : await API.post(`usuarios/empleados/${empleado.id}/permisos/${permiso.id}/`);
      setResultados((prev) => prev.map((it) => (it.id === empleado.id ? data : it)));
    } catch {
      setError('No se pudo actualizar el permiso.');
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
        <UserCog className="text-brand-600 dark:text-brand-400" size={24} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Empleados y permisos</h1>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        CU09 · Empleados de todas las empresas y a qué secciones tiene acceso cada cuenta.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <form onSubmit={buscar} className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, email o empresa..."
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-brand-300"
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

      <div className="space-y-3">
        {resultados.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 py-8 text-center">Sin resultados.</p>
        ) : resultados.map((emp) => (
          <div key={emp.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{emp.usuario_nombre}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeEstado(emp.estado)}`}>{emp.estado}</span>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{emp.usuario_email}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {emp.empresa_nombre}{emp.cargo ? ` · ${emp.cargo}` : ''}
                </div>
              </div>
              <button
                onClick={() => toggleEstado(emp)}
                disabled={accionando === emp.id}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50 ${
                  emp.estado === 'INACTIVO'
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100'
                    : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100'
                }`}
              >
                {emp.estado === 'INACTIVO' ? <RotateCcw size={12} /> : <Ban size={12} />}
                {emp.estado === 'INACTIVO' ? 'Reactivar' : 'Desactivar'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {permisos.map((permiso) => {
                const activo = emp.permisos.some((p) => p.id === permiso.id);
                return (
                  <button
                    key={permiso.id}
                    onClick={() => togglePermiso(emp, permiso)}
                    title={permiso.descripcion}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      activo
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    {permiso.codigo}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{total} empleados en total</span>
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
