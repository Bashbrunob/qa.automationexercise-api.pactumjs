import { faker } from '@faker-js/faker';

/**
 * Data Factory para geração de dados de teste dinâmicos.
 * @namespace DataFactory
 */

/**
 * Gera um novo usuário com nome, email, senha e status de administrador.
 * @param {string} [administrador='true'] - Se o usuário é administrador ('true' ou 'false').
 * @returns {object} O objeto usuário.
 */
export const generateUser = (administrador = 'true') => {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: administrador
  };
};

/**
 * Gera um novo produto com nome, preço, descrição e quantidade.
 * @returns {object} O objeto produto.
 */
export const generateProduct = () => {
  return {
    nome: `${faker.commerce.productName()} ${faker.string.uuid()}`, // Garante unicidade
    preco: parseInt(faker.commerce.price({ min: 10, max: 1000 })),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 100 })
  };
};
