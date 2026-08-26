import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function RequestCompany() {
  const { usuario, cargando } = useAuth();
  const [form, setForm] = useState({ razon_social: '', nit: '', documento_url: '' });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (cargando) return null;
  if (!usuario) return <Navigate to="/login?next=/solicitar-empresa" replace />;

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await API.post('usuarios/solicitudes-empresa/', form);
      setEnviado(true);
    } catch {
      setError('No se pudo enviar la solicitud. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 size={48} className="mx-auto text-green-600 dark:text-green-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Solicitud enviada</h1>
        <p className="text-gray-500 dark:text-gray-400">
          El equipo de VecinoMarket revisará tu solicitud y te notificaremos por email
          cuando sea aprobada.
        </p>
      </div>
    );
  }

  const inputClass = 'w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300';
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Solicita tu cuenta de empresa</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Completa estos datos para registrar tu emprendimiento. Un administrador revisará
        tu solicitud antes de activar tu tienda.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Razón social / nombre del negocio</label>
          <input
            name="razon_social" required value={form.razon_social} onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>NIT</label>
          <input
            name="nit" required value={form.nit} onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Documento de respaldo (URL) <span className="text-gray-400 dark:text-gray-500 font-normal">— opcional</span>
          </label>
          <input
            name="documento_url" value={form.documento_url} onChange={onChange}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-full bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 transition-colors disabled:opacity-60"
        >
          {enviando ? 'Enviando...' : 'Enviar solicitud'}
        </button>
      </form>
    </div>
  );
}
