// Personal de la plataforma: ADMIN (soporte) o SUPERADMIN (dueño).
// Las acciones sensibles (roles, bitácora, planes/suscripciones, contraseñas
// ajenas) son exclusivas de SUPERADMIN — ver esSuperAdmin().
export function esStaff(usuario) {
  return !!usuario && (usuario.rol === 'ADMIN' || usuario.rol === 'SUPERADMIN');
}

export function esSuperAdmin(usuario) {
  return !!usuario && usuario.rol === 'SUPERADMIN';
}

// Dueño de una empresa o empleado suyo — quienes pueden llegar a tener acceso
// a las secciones de autogestión de la empresa (aunque el empleado necesite
// además el permiso puntual, que valida el backend).
export function esEmpresaOEmpleado(usuario) {
  return !!usuario && (usuario.rol === 'EMPRESA' || usuario.rol === 'EMPLEADO');
}

export function esComprador(usuario) {
  return !!usuario && usuario.rol === 'COMPRADOR';
}
