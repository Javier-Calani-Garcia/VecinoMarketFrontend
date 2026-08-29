import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import RequestCompany from './pages/RequestCompany';
import Bitacora from './pages/Bitacora';
import Usuarios from './pages/admin/Usuarios';
import EmpresasAdmin from './pages/admin/EmpresasAdmin';
import Empleados from './pages/admin/Empleados';
import Categorias from './pages/admin/Categorias';
import Productos from './pages/admin/Productos';
import CatalogosEmpresas from './pages/admin/CatalogosEmpresas';
import MetodosPagoEmpresas from './pages/admin/MetodosPagoEmpresas';
import MisMetodosPago from './pages/empresa/MisMetodosPago';
import InventarioEmpresas from './pages/admin/InventarioEmpresas';
import Carritos from './pages/admin/Carritos';
import PedidosVentas from './pages/admin/PedidosVentas';
import MisPedidos from './pages/empresa/MisPedidos';
import Entregas from './pages/admin/Entregas';
import MisEntregas from './pages/empresa/MisEntregas';
import MisDirecciones from './pages/MisDirecciones';
import Facturacion from './pages/admin/Facturacion';
import MisFacturas from './pages/empresa/MisFacturas';
import MisCompras from './pages/MisCompras';
import Reputacion from './pages/admin/Reputacion';
import MiReputacion from './pages/empresa/MiReputacion';
import MisResenas from './pages/MisResenas';
import Promociones from './pages/admin/Promociones';
import MisPromociones from './pages/empresa/MisPromociones';
import Referidos from './pages/admin/Referidos';
import MisReferidos from './pages/empresa/MisReferidos';
import Chat from './pages/Chat';
import MiChat from './pages/empresa/MiChat';
import ChatAdmin from './pages/admin/ChatAdmin';
import Live from './pages/Live';
import LiveViewer from './pages/LiveViewer';
import MisLives from './pages/empresa/MisLives';
import TransmitirLive from './pages/empresa/TransmitirLive';
import GrabacionLive from './pages/empresa/GrabacionLive';
import LivesAdmin from './pages/admin/LivesAdmin';
import MisFaqsChatbot from './pages/empresa/MisFaqsChatbot';
import ChatbotEmpresas from './pages/ChatbotEmpresas';
import ChatbotAdmin from './pages/admin/ChatbotAdmin';
import RolesBase from './pages/admin/RolesBase';
import CambiarRoles from './pages/admin/CambiarRoles';
import ReportesEmpresaAdmin from './pages/admin/ReportesEmpresaAdmin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import DashboardEmpresa from './pages/empresa/DashboardEmpresa';
import MisEmpleados from './pages/empresa/MisEmpleados';
import MisProductos from './pages/empresa/MisProductos';
import MiPerfilEmpresa from './pages/empresa/MiPerfilEmpresa';
import PlanesAdmin from './pages/admin/PlanesAdmin';
import Recomendaciones from './pages/Recomendaciones';
import NotificacionesAdmin from './pages/admin/NotificacionesAdmin';
import EnConstruccion from './pages/admin/EnConstruccion';
import NotFound from './pages/NotFound';
import { GRUPOS_ADMIN } from './config/adminMenu';

const rutasAdminPendientes = GRUPOS_ADMIN.flatMap((grupo) => grupo.items).filter((item) => !item.implementado);

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductListing />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/registro" element={<Auth />} />
        <Route path="/olvide-password" element={<ForgotPassword />} />
        <Route path="/restablecer-password" element={<ResetPassword />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/solicitar-empresa" element={<RequestCompany />} />
        <Route path="/bitacora" element={<Bitacora />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/empresas" element={<EmpresasAdmin />} />
        <Route path="/admin/empleados" element={<Empleados />} />
        <Route path="/admin/categorias" element={<Categorias />} />
        <Route path="/admin/productos" element={<Productos />} />
        <Route path="/admin/catalogo" element={<CatalogosEmpresas />} />
        <Route path="/admin/metodos-pago" element={<MetodosPagoEmpresas />} />
        <Route path="/mi-empresa/metodos-pago" element={<MisMetodosPago />} />
        <Route path="/admin/inventario" element={<InventarioEmpresas />} />
        <Route path="/admin/carritos" element={<Carritos />} />
        <Route path="/admin/pedidos" element={<PedidosVentas />} />
        <Route path="/mi-empresa/pedidos" element={<MisPedidos />} />
        <Route path="/admin/entregas" element={<Entregas />} />
        <Route path="/mi-empresa/entregas" element={<MisEntregas />} />
        <Route path="/mis-direcciones" element={<MisDirecciones />} />
        <Route path="/admin/facturacion" element={<Facturacion />} />
        <Route path="/mi-empresa/facturas" element={<MisFacturas />} />
        <Route path="/mis-compras" element={<MisCompras />} />
        <Route path="/admin/reputacion" element={<Reputacion />} />
        <Route path="/mi-empresa/reputacion" element={<MiReputacion />} />
        <Route path="/mis-resenas" element={<MisResenas />} />
        <Route path="/admin/promociones" element={<Promociones />} />
        <Route path="/mi-empresa/promociones" element={<MisPromociones />} />
        <Route path="/admin/referidos" element={<Referidos />} />
        <Route path="/mi-empresa/referidos" element={<MisReferidos />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mi-empresa/chat" element={<MiChat />} />
        <Route path="/admin/chat" element={<ChatAdmin />} />
        <Route path="/live" element={<Live />} />
        <Route path="/live/:id" element={<LiveViewer />} />
        <Route path="/mi-empresa/lives" element={<MisLives />} />
        <Route path="/mi-empresa/lives/:id/transmitir" element={<TransmitirLive />} />
        <Route path="/mi-empresa/lives/:id/grabacion" element={<GrabacionLive />} />
        <Route path="/admin/live-commerce" element={<LivesAdmin />} />
        <Route path="/mi-empresa/chatbot" element={<MisFaqsChatbot />} />
        <Route path="/chatbot" element={<ChatbotEmpresas />} />
        <Route path="/admin/chatbot" element={<ChatbotAdmin />} />
        <Route path="/admin/roles" element={<RolesBase />} />
        <Route path="/admin/cambiar-roles" element={<CambiarRoles />} />
        <Route path="/admin/reportes-empresa" element={<ReportesEmpresaAdmin />} />
        <Route path="/admin/reportes-admin" element={<DashboardAdmin />} />
        <Route path="/mi-empresa/dashboard" element={<DashboardEmpresa />} />
        <Route path="/mi-empresa/empleados" element={<MisEmpleados />} />
        <Route path="/mi-empresa/productos" element={<MisProductos />} />
        <Route path="/mi-empresa/perfil" element={<MiPerfilEmpresa />} />
        <Route path="/admin/planes" element={<PlanesAdmin />} />
        <Route path="/recomendados" element={<Recomendaciones />} />
        <Route path="/admin/notificaciones" element={<NotificacionesAdmin />} />
        {rutasAdminPendientes.map((item) => (
          <Route
            key={item.cu}
            path={item.to}
            element={<EnConstruccion cu={item.cu} titulo={item.titulo} descripcion={item.descripcion} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
