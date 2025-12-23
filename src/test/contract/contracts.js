import Joi from 'joi';

/**
 * Schemas Joi para Testes de Contrato da API.
 */
const schemas = {
    login: Joi.object({
        message: Joi.string().required(),
        authorization: Joi.string().required()
    }),

    userCreation: Joi.object({
        message: Joi.string().required(),
        _id: Joi.string().required()
    }),

    productCreation: Joi.object({
        message: Joi.string().required(),
        _id: Joi.string().required()
    })
};

export default schemas;
