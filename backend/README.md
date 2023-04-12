## Endpoints

### Usuário
- **POST** - /user
- **POST** - /user/auth
- **GET** - /user/{id}
- **PUT** - /user/{id} <need auth token>
- **DELETE** - /user/{id} <need auth token>

### Receita
- **GET** - /recipe/{id}
- **GET** - /recipe <Retorna receitas com paginacao opcional>
- **GET** - /recipe/search/{name} <Retorna receitas com nome semelhante>
- **GET** - /recipe/user/{id} <Retorna as receitas do usuario>
- **POST** - /recipe <token>
- **PUT** - /recipe/{id} <token>
- **DELETE** - /recipe/{id} <token>

#### Ingrediente
- **GET** - /ingredient/{id}
- **GET** - /ingredient/search/name/{name} <Retorna ingredientes visiveis com nome semelhante para uso na própria receita>
- **POST** - /ingredient <token>
- **PUT** - /ingredient/{id} <token>

#### Comentário

- **GET** - /comment/user/{id}
- **GET** - /comment/recipe/{id}
- **POST** - /comment <token>
- **PUT** - /comment/{id} <token>
- **DELETE** - /comment/{id} <token>