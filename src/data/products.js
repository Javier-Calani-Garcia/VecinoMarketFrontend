// Catálogo de ejemplo. Cuando exista GET /api/catalogo/productos/ en el
// backend, esta lista se reemplaza por datos reales (los campos ya están
// nombrados igual que el modelo Producto: precio, precio_descuento, etc).
// Las fotos vienen de LoremFlickr filtradas por palabras clave en inglés
// específicas de cada producto (no un feed genérico). `lock=1` deja fija la
// misma foto en vez de cambiar en cada recarga; no hay colisión entre
// productos porque cada uno usa una combinación de palabras clave distinta.
const img = (keywords) => `https://loremflickr.com/600/600/${keywords}?lock=1`;

export const productos = [
  { id: 1, nombre: 'Pan integral artesanal (bolsa x6)', categoriaId: 'panaderia', empresa: 'Panadería Doña Ana', precio: 18, precio_descuento: null, rating: 4.7, resenas: 132, stock: 40, imagen: img('wholewheat,bread,loaf'), descripcion: 'Pan integral horneado a diario con harina 100% integral y sin conservantes.' },
  { id: 2, nombre: 'Torta de chocolate (porción familiar)', categoriaId: 'panaderia', empresa: 'Repostería Sabor Local', precio: 65, precio_descuento: 55, rating: 4.9, resenas: 88, stock: 12, imagen: img('cake,slice'), descripcion: 'Torta húmeda de chocolate con cobertura de ganache, ideal para compartir.' },
  { id: 3, nombre: 'Empanadas de queso (docena)', categoriaId: 'panaderia', empresa: 'Panadería Doña Ana', precio: 24, precio_descuento: null, rating: 4.6, resenas: 54, stock: 30, imagen: img('empanada,pastry'), descripcion: 'Empanadas horneadas rellenas de queso criollo.' },

  { id: 4, nombre: 'Arroz integral (5kg)', categoriaId: 'abarrotes', empresa: 'Abarrotes El Vecino', precio: 42, precio_descuento: null, rating: 4.5, resenas: 210, stock: 60, imagen: img('rice,grain'), descripcion: 'Arroz integral de grano largo, empacado al vacío.' },
  { id: 5, nombre: 'Aceite de girasol (900ml)', categoriaId: 'abarrotes', empresa: 'Abarrotes El Vecino', precio: 16, precio_descuento: 13.5, rating: 4.3, resenas: 96, stock: 75, imagen: img('cooking,oil,bottle'), descripcion: 'Aceite vegetal de girasol, botella de 900ml.' },
  { id: 6, nombre: 'Café molido orgánico (500g)', categoriaId: 'abarrotes', empresa: 'Café de los Yungas', precio: 38, precio_descuento: null, rating: 4.8, resenas: 145, stock: 25, imagen: img('roasted,coffee,beans'), descripcion: 'Café 100% arábica, cultivado y tostado localmente.' },

  { id: 7, nombre: 'Chompa de alpaca unisex', categoriaId: 'ropa', empresa: 'Textiles Andinos', precio: 180, precio_descuento: 150, rating: 4.9, resenas: 62, stock: 18, imagen: img('wool,sweater'), descripcion: 'Chompa tejida a mano con lana de alpaca, disponible en varios colores.' },
  { id: 8, nombre: 'Polera de algodón orgánico', categoriaId: 'ropa', empresa: 'Ropa Consciente Bolivia', precio: 55, precio_descuento: null, rating: 4.4, resenas: 40, stock: 50, imagen: img('tshirt,cotton'), descripcion: 'Polera básica de algodón 100% orgánico.' },
  { id: 9, nombre: 'Gorro de lana tejido', categoriaId: 'ropa', empresa: 'Textiles Andinos', precio: 35, precio_descuento: null, rating: 4.7, resenas: 28, stock: 33, imagen: img('winter,hat,knit'), descripcion: 'Gorro de lana con diseño tradicional, tejido a mano.' },

  { id: 10, nombre: 'Set de velas aromáticas (x3)', categoriaId: 'hogar', empresa: 'Casa Cálida', precio: 48, precio_descuento: 39, rating: 4.6, resenas: 71, stock: 22, imagen: img('scented,candles'), descripcion: 'Velas de soya con aromas de lavanda, vainilla y sándalo.' },
  { id: 11, nombre: 'Maceta de cerámica pintada a mano', categoriaId: 'hogar', empresa: 'Cerámica Wari', precio: 60, precio_descuento: null, rating: 4.8, resenas: 34, stock: 15, imagen: img('clay,pot,painted'), descripcion: 'Maceta mediana de cerámica, pintada a mano con motivos andinos.' },
  { id: 12, nombre: 'Manta tejida para sofá', categoriaId: 'hogar', empresa: 'Textiles Andinos', precio: 95, precio_descuento: null, rating: 4.5, resenas: 19, stock: 20, imagen: img('knit,blanket'), descripcion: 'Manta gruesa tejida en telar, 100% lana de oveja.' },

  { id: 13, nombre: 'Jabón artesanal de miel y avena', categoriaId: 'belleza', empresa: 'Cosmética Natural La Paz', precio: 12, precio_descuento: null, rating: 4.6, resenas: 58, stock: 90, imagen: img('olive,soap'), descripcion: 'Jabón artesanal hecho a mano con ingredientes naturales.' },
  { id: 14, nombre: 'Aceite esencial de eucalipto', categoriaId: 'belleza', empresa: 'Cosmética Natural La Paz', precio: 22, precio_descuento: 18, rating: 4.4, resenas: 45, stock: 40, imagen: img('eucalyptus,leaves'), descripcion: 'Aceite esencial 100% puro, frasco de 30ml.' },

  { id: 15, nombre: 'Funda protectora para laptop 15"', categoriaId: 'tecnologia', empresa: 'TechBo Accesorios', precio: 45, precio_descuento: null, rating: 4.2, resenas: 33, stock: 28, imagen: img('laptop,case'), descripcion: 'Funda acolchada resistente al agua para laptops de 15 pulgadas.' },
  { id: 16, nombre: 'Audífonos inalámbricos', categoriaId: 'tecnologia', empresa: 'TechBo Accesorios', precio: 120, precio_descuento: 99, rating: 4.3, resenas: 87, stock: 17, imagen: img('wireless,headphones'), descripcion: 'Audífonos Bluetooth con cancelación de ruido básica.' },

  { id: 17, nombre: 'Cama para perro mediana', categoriaId: 'mascotas', empresa: 'Mascotas Felices', precio: 85, precio_descuento: null, rating: 4.7, resenas: 22, stock: 14, imagen: img('puppy,bed'), descripcion: 'Cama acolchada lavable para perros medianos.' },
  { id: 18, nombre: 'Snacks naturales para gato (bolsa)', categoriaId: 'mascotas', empresa: 'Mascotas Felices', precio: 20, precio_descuento: null, rating: 4.5, resenas: 41, stock: 60, imagen: img('cat,food,treats'), descripcion: 'Snacks de pollo deshidratado, sin conservantes.' },

  { id: 19, nombre: 'Tejido de tapiz andino (pequeño)', categoriaId: 'artesania', empresa: 'Cerámica Wari', precio: 130, precio_descuento: null, rating: 4.9, resenas: 15, stock: 8, imagen: img('woven,tapestry,textile'), descripcion: 'Tapiz decorativo tejido a mano con diseños tradicionales.' },
  { id: 20, nombre: 'Figura de cerámica decorativa', categoriaId: 'artesania', empresa: 'Cerámica Wari', precio: 55, precio_descuento: null, rating: 4.6, resenas: 20, stock: 25, imagen: img('ceramic,figurine'), descripcion: 'Figura decorativa hecha y pintada a mano.' },

  { id: 21, nombre: 'Set de destornilladores (12 piezas)', categoriaId: 'ferreteria', empresa: 'Ferretería San Pedro', precio: 65, precio_descuento: 55, rating: 4.4, resenas: 30, stock: 24, imagen: img('screwdriver,toolbox'), descripcion: 'Set de destornilladores con puntas intercambiables.' },
  { id: 22, nombre: 'Candado de seguridad reforzado', categoriaId: 'ferreteria', empresa: 'Ferretería San Pedro', precio: 40, precio_descuento: null, rating: 4.3, resenas: 18, stock: 35, imagen: img('padlock'), descripcion: 'Candado de acero reforzado con 3 llaves.' },

  { id: 23, nombre: 'Rompecabezas de madera (100 piezas)', categoriaId: 'juguetes', empresa: 'Juguetes de Madera Boliviana', precio: 48, precio_descuento: null, rating: 4.8, resenas: 26, stock: 20, imagen: img('jigsaw,puzzle,wooden'), descripcion: 'Rompecabezas educativo hecho de madera reciclada.' },
  { id: 24, nombre: 'Set de bloques de construcción', categoriaId: 'juguetes', empresa: 'Juguetes de Madera Boliviana', precio: 70, precio_descuento: 60, rating: 4.7, resenas: 33, stock: 16, imagen: img('wooden,blocks,toy'), descripcion: 'Bloques de madera natural, seguros y sin pintura tóxica.' },
];

export function buscarProductos({ q = '', categoriaId = '' } = {}) {
  const query = q.trim().toLowerCase();
  return productos.filter((p) => {
    const coincideTexto = !query || p.nombre.toLowerCase().includes(query) || p.empresa.toLowerCase().includes(query);
    const coincideCategoria = !categoriaId || p.categoriaId === categoriaId;
    return coincideTexto && coincideCategoria;
  });
}

export function obtenerProducto(id) {
  return productos.find((p) => p.id === Number(id));
}

export function productosDestacados(limite = 8) {
  return [...productos].sort((a, b) => b.rating - a.rating).slice(0, limite);
}

export function productosEnOferta(limite = 8) {
  return productos.filter((p) => p.precio_descuento).slice(0, limite);
}
