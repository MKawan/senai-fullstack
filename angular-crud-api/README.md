# Atividade: Integração com APIs

Este projeto é destinado aos alunos da unidade curricular **Interação com APIs**.

O objetivo da atividade é colocar em prática a integração de um projeto Front-End desenvolvido com Angular com uma API Back-End desenvolvida com Node.js e Express, utilizando o `HttpClient`.

O Back-End já está desenvolvido e funcional. O Front-End também já possui as telas, os formulários, as validações e a estilização necessários.

Sua tarefa será implementar a comunicação entre o Front-End e o Back-End por meio de requisições HTTP.

## Estrutura do projeto

O repositório está dividido em duas partes principais:

```text
angular-crud-api/
├── frontend/
└── backend/
```

* `frontend/`: aplicação Angular;
* `backend/`: API desenvolvida com Node.js e Express.

## Pré-requisitos

Antes de iniciar a atividade, verifique se as seguintes ferramentas estão instaladas:

* Node.js, preferencialmente na versão LTS;
* NPM, instalado junto com o Node.js;
* Angular CLI;
* Git;
* Visual Studio Code;
* Postman ou Insomnia;
* Conta no GitHub.

### Verificar o Node.js

Abra o terminal e execute:

```bash
node -v
```

O terminal deverá apresentar a versão instalada.

### Verificar o NPM

Execute:

```bash
npm -v
```

### Verificar o Angular CLI

Execute:

```bash
ng version
```

Caso o Angular CLI ainda não esteja instalado, execute:

```bash
npm install -g @angular/cli
```

### Verificar o Git

Execute:

```bash
git --version
```

Caso algum comando não seja reconhecido, instale a ferramenta correspondente antes de continuar.

## 1. Realizar o fork do projeto

Acesse o link do repositório disponibilizado pelo professor.

Na página do GitHub, clique no botão **Fork**, localizado na parte superior da tela.

O GitHub criará uma cópia do projeto no seu próprio perfil.

Confirme se o endereço do repositório contém o seu nome de usuário:

```text
https://github.com/seu-usuario/angular-crud-api
```

Todas as alterações da atividade deverão ser enviadas para essa cópia.

## 2. Clonar o seu fork

No seu repositório, clique no botão **Code** e copie o endereço HTTPS.

Abra o terminal na pasta em que deseja salvar o projeto e execute:

```bash
git clone https://github.com/seu-usuario/angular-crud-api.git
```

Substitua `seu-usuario` pelo seu nome de usuário no GitHub.

Depois, entre na pasta do projeto:

```bash
cd angular-crud-api
```

Abra o projeto no Visual Studio Code:

```bash
code .
```

## Como executar o projeto

Para que o sistema funcione corretamente, o Back-End e o Front-End deverão ser executados simultaneamente em dois terminais diferentes.

Mantenha os dois terminais abertos durante o desenvolvimento e os testes.

## 3. Executar o Back-End

Abra o primeiro terminal e entre na pasta do Back-End:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

O Back-End ficará disponível em:

```text
http://localhost:3000
```

A rota principal dos produtos poderá ser acessada em:

```text
http://localhost:3000/api/products
```

Antes de continuar, abra esse endereço no navegador ou faça uma requisição no Postman para verificar se a API está funcionando.

## 4. Executar o Front-End

Abra um segundo terminal na raiz do projeto e entre na pasta do Front-End:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação Angular:

```bash
npm start
```

Também é possível executar:

```bash
ng serve
```

O Front-End ficará disponível em:

```text
http://localhost:4200
```

## Endpoints disponíveis no Back-End

A API utiliza o endereço-base:

```text
http://localhost:3000
```

Os seguintes endpoints estão disponíveis:

| Método | Endpoint            | Descrição                    |
| ------ | ------------------- | ---------------------------- |
| GET    | `/api/products`     | Listar todos os produtos     |
| GET    | `/api/products/:id` | Consultar um produto pelo ID |
| POST   | `/api/products`     | Cadastrar um produto         |
| PUT    | `/api/products/:id` | Atualizar um produto         |
| DELETE | `/api/products/:id` | Excluir um produto           |

O trecho `:id` deverá ser substituído pelo identificador do produto.

Exemplo:

```text
http://localhost:3000/api/products/1
```

## Testar os endpoints

Antes de implementar as chamadas no Angular, utilize o Postman ou o Insomnia para testar as rotas da API.

Durante os testes, observe:

* O método HTTP utilizado;
* O endereço do endpoint;
* Os dados enviados no corpo da requisição;
* O código de status retornado;
* A mensagem retornada;
* Os dados recebidos como resposta.

Essa etapa ajudará a compreender como o Front-End deverá se comunicar com o Back-End.

## Parte que deverá ser implementada

Sua tarefa consiste em implementar os métodos do serviço `ProdutoService`, localizado em:

```text
frontend/src/app/produtos/produto.service.ts
```

Você deverá utilizar o `HttpClient` do Angular, que já está configurado e injetado no serviço, para realizar as chamadas aos endpoints da API.

Os métodos que deverão ser implementados são:

```typescript
listar()
```

Responsável por realizar:

```text
GET /api/products
```

```typescript
buscarPorId(id)
```

Responsável por realizar:

```text
GET /api/products/:id
```

```typescript
cadastrar(produto)
```

Responsável por realizar:

```text
POST /api/products
```

```typescript
atualizar(id, produto)
```

Responsável por realizar:

```text
PUT /api/products/:id
```

```typescript
excluir(id)
```

Responsável por realizar:

```text
DELETE /api/products/:id
```

As telas, os formulários e os botões já estão prontos. Não será necessário desenvolver um novo Front-End nem alterar o Back-End.

## Enviar as alterações para o GitHub

Depois de concluir e testar a atividade, execute os comandos na raiz do projeto.

Verifique os arquivos modificados:

```bash
git status
```

Adicione as alterações:

```bash
git add .
```

Crie um commit:

```bash
git commit -m "Implementa integração do CRUD de produtos"
```

Envie as alterações para o seu repositório:

```bash
git push
```

Depois, acesse o seu repositório no GitHub e confirme se os arquivos foram atualizados.

## Entrega

No Ambiente Virtual de Aprendizagem, envie o link público do seu repositório.

Exemplo:

```text
https://github.com/seu-usuario/angular-crud-api
```

Antes de enviar, verifique se:

* O repositório está público;
* O Back-End executa corretamente;
* O Front-End executa corretamente;
* As cinco operações estão integradas;
* As mensagens de sucesso e erro são exibidas;
* As alterações foram enviadas para o GitHub.

Bom trabalho!
