# QA Automation – PactumJS API Testing

Bem-vindo ao projeto de automação de testes da API ServeRest!

Este projeto tem como objetivo validar os principais fluxos da API, como cadastro de usuários, autenticação e gerenciamento de produtos, garantindo o correto funcionamento das regras de negócio e dos contratos definidos.

## Tecnologias Utilizadas

- **JavaScript**: Linguagem de programação utilizada no projeto.
- **PactumJS**: Biblioteca para testes automatizados de API.
- **Mocha**: Test runner responsável pela execução dos testes.
- **Joi**: Biblioteca utilizada para validação de contratos (schemas).
- **FakerJS**: Geração de dados de teste dinâmicos.
- **Mochawesome**: Geração de relatórios de execução dos testes.
- **GitHub Actions**: Integração contínua (CI).

## Pré-requisitos

- **Node.js**: versão 14 ou superior instalado.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/qa.automationexercise-api.pactumjs.git
   cd qa.automationexercise-api.pactumjs
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

O projeto utiliza um arquivo `.env` para gerenciar as variáveis de ambiente.
Certifique-se de que ele exista na raiz do projeto com o seguinte conteúdo:

```env
BASE_URL=https://serverest.dev
```

## Execução dos Testes

Para executar todos os testes e gerar o relatório:

```bash
npm test
```

## Arquitetura e Estrutura de Pastas

### Configuração Core (`src/config/`)
- **`base.conf.js`**: Arquivo central de configuração. Define a URL base via `.env`, desabilita o relatório padrão do Pactum e registra o handler customizado `validateSchema`, responsável por integrar a validação dos schemas Joi.

### Contratos (`src/test/contract/`)
- **`contracts.js`**: Contém os schemas Joi que definem a estrutura esperada das respostas da API, garantindo que os contratos estabelecidos sejam mantidos.

### Utilitários (`src/utils/`)
- **`auth.hook.js`**: Contém a função `createUserAndAuth`, responsável por criar um usuário, realizar o login e armazenar o token de autenticação, evitando repetição de código.
- **`faker.factory.js`**: Responsável pela geração de dados de teste (usuários e produtos) utilizando o FakerJS, garantindo dados únicos para cada execução.

### Estrutura de Diretórios
```text
src/
├── config/
│   └── base.conf.js          # Configuração global do Pactum e ambiente
├── test/
│   ├── contract/
│   │   └── contracts.js      # Schemas Joi para validação de contratos da API
│   └── functional/
│       ├── login.spec.js     # Testes do endpoint de Login
│       ├── products.spec.js  # Testes do endpoint de Produtos
│       └── users.spec.js     # Testes do endpoint de Usuários
└── utils/
    ├── auth.hook.js          # Criação de usuário e geração de token
    └── faker.factory.js      # Geração de dados de teste com FakerJS
```

## Cobertura dos Testes

### 1. Suíte de Login (`login.spec.js`)
- **Objetivo**: Validar a autenticação de usuários.
- **Cenário**: Login com usuário válido criado dinamicamente.
- **Validações**: Status code 200, mensagem de sucesso e retorno do token JWT conforme contrato.

### 2. Suíte de Usuários (`users.spec.js`)
- **Objetivo**: Validar o ciclo de vida do usuário.
- **Cenários**:
    - Cadastro de usuário com dados gerados dinamicamente.
    - Exclusão do usuário utilizando o ID capturado durante a execução.
- **Validações**: Contrato de criação, unicidade de e-mail e persistência dos dados.

### 3. Suíte de Produtos (`products.spec.js`)
- **Objetivo**: Validar o cadastro de produtos em rota protegida.
- **Cenário**:
    - Preparação do ambiente com criação de usuário e autenticação.
    - Cadastro de produto com nome único.
    - Exclusão do produto e do usuário ao final do teste.
- **Validações**: Autorização via header (Bearer Token), status code 201 e validação de contrato.

## Relatórios

Após a execução dos testes, um relatório HTML é gerado na pasta `mochawesome-report`.
O arquivo `mochawesome.html` pode ser aberto no navegador para visualização dos resultados.

## Pipeline CI/CD

O projeto possui integração contínua configurada em `.github/workflows/main.yml`.
- A cada `push` ou `pull_request` na branch `main`, os testes são executados automaticamente em um ambiente Ubuntu com Node.js.
- O relatório do Mochawesome é armazenado como artefato da build.