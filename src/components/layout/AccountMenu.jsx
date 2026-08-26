import { Link } from 'react-router-dom';
import { User, LogOut, ChevronDown, ScrollText, Users, Building2, ShieldCheck } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import { useAuth } from '../../context/AuthContext';

export default function AccountMenu() {
  const { usuario, logout } = useAuth();

  return (
    <Dropdown
      align="right"
      triggerClassName="rounded-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      panelClassName="w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 shadow-lg text-sm text-gray-700 dark:text-gray-200"
      trigger={
        <>
          <User size={20} />
          <span className="hidden lg:inline max-w-[100px] truncate">{usuario ? usuario.nombre : 'Cuenta'}</span>
          <ChevronDown size={14} className="hidden md:block" />
        </>
      }
    >
      {usuario ? (
        <>
          <div className="px-4 py-1.5 text-xs text-gray-400 dark:text-gray-500">Hola, {usuario.nombre}</div>
          <Link to="/perfil" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">Mi perfil</Link>
          {usuario.rol === 'ADMIN' && (
            <>
              <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
              <Link to="/bitacora" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                <ScrollText size={16} /> Bitácora
              </Link>
              <Link to="/admin/usuarios" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Users size={16} /> Usuarios
              </Link>
              <Link to="/admin/empresas" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Building2 size={16} /> Empresas
              </Link>
              <Link to="/admin/roles" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                <ShieldCheck size={16} /> Roles y permisos
              </Link>
            </>
          )}
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">Ingresar</Link>
          <Link to="/registro" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">Crear cuenta</Link>
        </>
      )}
    </Dropdown>
  );
}
