#### [Link para o repositório no Github](https://github.com/Denilson21R/projeto-pw4)

## Configurações
- Para persistência, o arquivo config.js deve conter as configurações do seu banco de dados, como senha e usuário, o exemplo ja preenchido é usado para o MySQL.
- A porta em que o sistema é executado pode ser configurada no arquivo app.js
- As tabelas do banco de dados são geradas ao executar o sistema

## Bibliotecas
- Todas as bibliotecas usadas no sistema que não foram apresentadas em aula, são acessíveis via npm, são elas:
  - [crypto](https://www.npmjs.com/package/crypto), usada para gerar o token do usuário, para autenticação
  - [bcrypt](https://www.npmjs.com/package/bcrypt), usada para criptografar as senhas dos usuários antes de enviar ao banco de dados

## Execução
  - Antes, lembre-se de instalar as bibliotecas com o `npm install`
  - O arquivo package.json foi configurado para executar o sistema com o comando `npm start`, basta executá-lo no terminal.
  - Se as seguintes mensagens aparecerem, e as tabelas forem geradas, está tudo pronto, só resta testar os endpoints
    > Server running on port 8080<br>
    Database connected

## Endpoints
### Usuário
- **POST** - /user
- **POST** - /user/auth
- **GET** - /user/{id}
- **PUT** - /user/{id} <token>
- **DELETE** - /user/{id} <token>

### Receita
- **GET** - /recipe/{id}
- **GET** - /recipe 
- **GET** - /recipe/search/{name}
- **GET** - /recipe/user/{id}
- **POST** - /recipe <token>
- **PUT** - /recipe/{id} <token>
- **DELETE** - /recipe/{id} <token>

#### Ingrediente
- **GET** - /ingredient
- **GET** - /ingredient/{id}
- **GET** - /ingredient/search/name/{name}
- **POST** - /ingredient <token>
- **PUT** - /ingredient/{id} <token>

#### Comentário

- **GET** - /comment/user/{id}
- **GET** - /comment/recipe/{id}
- **POST** - /comment <token>
- **PUT** - /comment/{id} <token>
- **DELETE** - /comment/{id} <token>