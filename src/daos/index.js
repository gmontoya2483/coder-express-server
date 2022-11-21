let ProductosDao;
let ChatsDao;
let UsuariosDao;

// const {default: ProductosDaoKnex} = await import('./productos/productosDaoKnex.js');
const { default: ProductosDaoMongo} = await import('./productos/productosDaoMongo.js')
const {default: ChatsDaoArchivo} = await import('./chat/chatsDaoArchivo.js')
const {default: UsuariosDaoMongo} = await import('./usuarios/usuariosDaoMongo.js')

ProductosDao = ProductosDaoMongo;
ChatsDao = ChatsDaoArchivo;
UsuariosDao = UsuariosDaoMongo;

export {ProductosDao, ChatsDao, UsuariosDao}
