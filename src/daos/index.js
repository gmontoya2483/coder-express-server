let ProductosDao;
let ChatsDao;

const {default: ProductosDaoKnex} = await import('./productos/productosDaoKnex.js');
const {default: ChatsDaoArchivo} = await import('./chat/chatsDaoArchivo.js')

ProductosDao = ProductosDaoKnex;
ChatsDao = ChatsDaoArchivo;

export {ProductosDao, ChatsDao}
