import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function cargarScriptRecaptcha() {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha?.render) {
      resolve();
      return;
    }
    if (document.getElementById('recaptcha-script')) {
      const anterior = window.__onRecaptchaLoad;
      window.__onRecaptchaLoad = () => {
        anterior?.();
        resolve();
      };
      return;
    }
    window.__onRecaptchaLoad = resolve;
    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = 'https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit';
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Widget de reCAPTCHA v2 ("no soy un robot"). expuesto imperativamente vía
// `recaptchaRef` para poder resetearlo al cambiar de pestaña o tras un envío.
export default function RecaptchaCheckbox({ onChange, onError, recaptchaRef }) {
  const contenedorRef = useRef(null);
  const widgetId = useRef(null);
  const { tema } = useTheme();
  const [noDisponible] = useState(() => !SITE_KEY);

  useEffect(() => {
    if (!SITE_KEY || !contenedorRef.current) return;

    let cancelado = false;

    cargarScriptRecaptcha()
      .then(() => {
        if (cancelado || !contenedorRef.current || widgetId.current !== null) return;
        widgetId.current = window.grecaptcha.render(contenedorRef.current, {
          sitekey: SITE_KEY,
          theme: tema === 'dark' ? 'dark' : 'light',
          callback: (token) => onChange(token),
          'expired-callback': () => onChange(''),
        });
        if (recaptchaRef) {
          recaptchaRef.current = {
            reset: () => {
              if (widgetId.current !== null) window.grecaptcha.reset(widgetId.current);
              onChange('');
            },
          };
        }
      })
      .catch(() => {
        if (!cancelado) onError?.('No se pudo cargar el reCAPTCHA.');
      });

    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (noDisponible) return null;

  return <div ref={contenedorRef} />;
}
