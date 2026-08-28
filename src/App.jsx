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
import RolesBase from './pages/admin/RolesBase';
import CambiarRoles from './pages/admin/CambiarRoles';
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
        <Route path="/admin/roles" element={<RolesBase />} />
        <Route path="/admin/cambiar-roles" element={<CambiarRoles />} />
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
