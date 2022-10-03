import {schema, normalize} from "normalizr";
import util from 'util';

const authorSchema = new schema.Entity('author');
const mensajeSchema = new schema.Entity('mensaje', {
    author: authorSchema
});

const dataSchema =  new schema.Entity('mensajes', {
    mensajes: [mensajeSchema]
});


export const normalizeData = (mensajes) => {
    const data = {id: 0, mensajes };
    const normalizedData = normalize(data, dataSchema);
    return normalizedData;
}


export function print(object) {
    console.log(
        util.inspect(object, false, 12, true)
    )
}
