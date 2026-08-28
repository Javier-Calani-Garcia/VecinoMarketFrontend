// Personal de la plataforma: ADMIN (soporte) o SUPERADMIN (dueño).
// Las acciones sensibles (roles, bitácora, planes/suscripciones, contraseñas
// ajenas) son exclusivas de SUPERADMIN — ver esSuperAdmin().
export function esStaff(usuario) {
  return !!usuario && (usuario.rol === 'ADMIN' || usuario.rol === 'SUPERADMIN');
}

export function esSuperAdmin(usuario) {
  return !!usuario && usuario.rol === 'SUPERADMIN';
}
