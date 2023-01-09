import {buildSchema} from "graphql";

const ProductosSchema = buildSchema(`
type Producto {
_id: ID!,
title: String,
price: Number,
thumbnail: String
}
type Query {
obtenerProductos: [Producto],
}
`);

export default ProductosSchema;
