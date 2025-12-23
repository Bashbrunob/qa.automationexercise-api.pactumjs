import pactum from 'pactum';
import 'dotenv/config';

// Define a URL base para todas as requisições
pactum.request.setBaseUrl(process.env.BASE_URL);

// Expectativas padrão globais ou configurações podem ser adicionadas aqui
pactum.settings.setReporterAutoRun(false);

// Registra Handler Customizado de Expectativa para Validação de Schema Joi
pactum.handler.addExpectHandler('validateSchema', (ctx) => {
    const schema = ctx.data;
    const { error } = schema.validate(ctx.res.json);
    if (error) {
        throw new Error(`Schema Validation Failed: ${error.message}`);
    }
});

export default pactum;
