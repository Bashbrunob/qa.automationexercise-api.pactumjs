import pactum from '../../config/base.conf.js';
import { generateProduct } from '../../utils/faker.factory.js';
import { createUserAndAuth } from '../../utils/auth.hook.js';
import schemas from '../../test/contract/contracts.js';


describe('Product Suite', () => {
    const product = generateProduct();

    before(async () => {
        // Utiliza helper customizado para criar usuário e logar
        await createUserAndAuth();
    });

    after(async () => {
        const store = pactum.stash.getDataStore();
        const productId = store['ProductId'];
        const userId = store['AuthUserId'];
        const token = store['AuthToken'];

        // Limpar Produto
        if (productId && token) {
            await pactum.spec()
                .delete('/produtos/{id}')
                .withHeaders('Authorization', token)
                .withPathParams('id', productId)
                .expectStatus(200);
        }

        // Limpar Usuário
        if (userId) {
            await pactum.spec()
                .delete('/usuarios/{id}')
                .withPathParams('id', userId)
                .expectStatus(200);
        }
    });

    it('deve cadastrar um novo produto com sucesso', async () => {
        await pactum.spec()
            .post('/produtos')
            .withHeaders('Authorization', '$S{AuthToken}')
            .withJson(product)
            .expectStatus(201)
            .expectJsonMatch({
                message: 'Cadastro realizado com sucesso'
            })
            .expect('validateSchema', schemas.productCreation)
            .stores('ProductId', '_id');
    });
});
