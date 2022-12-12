import passport from "passport";
import { Strategy } from "passport-local";
import {validateHash} from "./security.js";
import {UsuarioService} from "../services/usuario.service.js";

const LocalStrategy = Strategy;

const usuarioService = new UsuarioService();

passport.use(new LocalStrategy(
    async function(username, password, done) {
        // console.log(`${username} ${password}`)
        //Logica para validar si un usuario existe
        const existeUsuario = await usuarioService.getUserByUserName(username);
        if (!existeUsuario)
            return done(null, false);

        const match = await validateHash(password, existeUsuario.password);
        if (!match)
            return done(null, false);

        return done(null, existeUsuario);
    }
));

passport.serializeUser((usuario, done)=>{
    done(null, usuario.email);
});

passport.deserializeUser(async (email, done) => {
    const existeUsuario = await usuarioService.getUserByUserName(email);
    done(null, existeUsuario);
});

export default passport;
