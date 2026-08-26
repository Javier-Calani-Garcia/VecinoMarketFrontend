import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, Store, CreditCard, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// No existe todavía POST /api/pedidos/ en el backend (falta la app "pedidos"),
// así que este checkout simula la creación del pedido. Cuando exista la API,
// el submit de este formulario se reemplaza por la llamada real.
export default function Checkout() {
  const { items, subtotal, vaciarCarrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [modalidad, setModalidad] = useState('ENVIO_DOMICILIO');
  const [metodoPago, setMetodoPago] = useState('QR');
  const [direccion, setDireccion] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState('');

  if (!usuario) return <Navigate to="/login?next=/checkout" replace />;
  if (items.length === 0 && !confirmado) return <Navigate to="/carrito" replace />;

  function confirmarPedido(e) {
    e.preventDefault();
    const numero = `VM-${Date.now().toString().slice(-8)}`;
    setNumeroPedido(numero);
    setConfirmado(true);
    vaciarCarrito();
  }

  if (confirmado) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 size={56} className="mx-auto text-green-600 dark:text-green-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">¡Pedido confirmado!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-1">Tu número de pedido es</p>
        <p className="text-lg font-mono font-semibold text-brand-600 dark:text-brand-400 mb-6">{numeroPedido}</p>
        <button
          onClick={() => navigate('/productos')}
          className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
        >
          Seguir comprando
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Finalizar compra</h1>

      <form onSubmit={confirmarPedido} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Modalidad de entrega</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModalidad('ENVIO_DOMICILIO')}
                className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${modalidad === 'ENVIO_DOMICILIO' ? 'border-brand-500 bg-brand-50 dark:bg-gray-800 text-brand-700 dark:text-brand-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}
              >
                <MapPin size={18} /> Envío a domicilio
              </button>
              <button
                type="button"
                onClick={() => setModalidad('RECOJO_TIENDA')}
                className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${modalidad === 'RECOJO_TIENDA' ? 'border-brand-500 bg-brand-50 dark:bg-gray-800 text-brand-700 dark:text-brand-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}
              >
                <Store size={18} /> Recojo en tienda
              </button>
            </div>

            {modalidad === 'ENVIO_DOMICILIO' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección de envío</label>
                <input
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Calle, número, zona, ciudad"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Método de pago</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMetodoPago('QR')}
                className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${metodoPago === 'QR' ? 'border-brand-500 bg-brand-50 dark:bg-gray-800 text-brand-700 dark:text-brand-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}
              >
                <QrCode size={18} /> Pago QR
              </button>
              <button
                type="button"
                onClick={() => setMetodoPago('TARJETA')}
                className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${metodoPago === 'TARJETA' ? 'border-brand-500 bg-brand-50 dark:bg-gray-800 text-brand-700 dark:text-brand-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}
              >
                <CreditCard size={18} /> Tarjeta
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 h-fit">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resumen</h2>
          <ul className="space-y-2 mb-4 max-h-56 overflow-y-auto text-sm">
            {items.map((it) => (
              <li key={it.id} className="flex justify-between text-gray-600 dark:text-gray-400">
                <span className="truncate pr-2">{it.cantidad}× {it.nombre}</span>
                <span className="shrink-0">Bs {(it.precio * it.cantidad).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-800 pt-3 mb-4">
            <span>Total</span>
            <span>Bs {subtotal.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Confirmar pedido
          </button>
        </div>
      </form>
    </div>
  );
}
