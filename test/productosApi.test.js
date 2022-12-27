import request from 'supertest'
import { expect } from 'chai'
import {config} from "../src/utils/config.js";

const baseUrl = `${config.axios.baseUrl}/api/productos`;


describe('test products api', () => {

    describe('get all products', ()=> {
        it('deberia retornar Status 200', async ()=> {
            const req = request(baseUrl)
            const resp = req.get('/');
            expect(resp.status).to.eql(200)
        });

    });

});


