import pactum from '../../config/base.conf.js';
import { generateUser } from '../../utils/faker.factory.js';
import schemas from '../../test/contract/contracts.js';


describe('User Suite', () => {
    it('deve cadastrar um novo usuário com sucesso', async () => {
        const user = generateUser();

        await pactum.spec()
            .post('/usuarios')
            .withJson(user)
            .expectStatus(201)
            .expectJsonMatch({
                message: 'Cadastro realizado com sucesso'
            })
            .expect('validateSchema', schemas.userCreation)
            .stores('UserId', '_id');
    });

    it('deve excluir o usuário pelo ID', async () => {
        await pactum.spec()
            .delete('/usuarios/{id}')
            .withPathParams('id', '$S{UserId}')
            .expectStatus(200)
            .expectJson({
                message: 'Registro excluído com sucesso'
            });
    });
});
