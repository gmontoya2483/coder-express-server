import {Schema, model} from 'mongoose';

const ProductoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    }
});

export const Producto = model('Producto', ProductoSchema);
