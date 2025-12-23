import pactum from '../../config/base.conf.js';
import { generateUser } from '../../utils/faker.factory.js';
import schemas from '../../test/contract/contracts.js';

describe('Login Suite', () => {
    const user = generateUser();

    before(async () => {
        // Cria um usuário para logar
        await pactum.spec()
            .post('/usuarios')
            .withJson(user)
            .expectStatus(201)
            .stores('LoginUserId', '_id');
    });

    after(async () => {
        // Limpar dados
        const userId = pactum.stash.getDataStore()['LoginUserId'];
        if (userId) {
            await pactum.spec()
                .delete('/usuarios/{id}')
                .withPathParams('id', userId)
                .expectStatus(200);
        }
    });

    it('deve realizar login com sucesso', async () => {
        await pactum.spec()
            .post('/login')
            .withJson({
                email: user.email,
                password: user.password
            })
            .expectStatus(200)
            .expectJsonLike({
                message: 'Login realizado com sucesso'
            })
            .expect('validateSchema', schemas.login)
            .stores('AuthToken', 'authorization');
    });
});
