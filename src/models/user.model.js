import {Schema, model} from 'mongoose';

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

export const Usuario = model('Usuario', UsuarioSchema);
