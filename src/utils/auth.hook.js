import pactum from 'pactum';
import { generateUser } from './faker.factory.js';

/**
 * Função auxiliar para criar um usuário e autenticar.
 * Armazena 'AuthUserId' e 'AuthToken' no stash do pactum.
 */
export async function createUserAndAuth() {
    const user = generateUser();

    // 1. Cria Usuário
    await pactum.spec()
        .post('/usuarios')
        .withJson(user)
        .expectStatus(201)
        .stores('AuthUserId', '_id');

    // 2. Realiza Login
    await pactum.spec()
        .post('/login')
        .withJson({
            email: user.email,
            password: user.password
        })
        .expectStatus(200)
        .stores('AuthToken', 'authorization');
}
