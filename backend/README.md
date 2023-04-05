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
- **POST** - /recipe //token
- **GET** - /recipes/user/{id} <Retorna as receitas publicas do usuario>
- **PUT** - /recipe/{id} <token>
- **DELETE** - /recipe/{id} <token>

#### Ingrediente
- **GET** - /ingredient/{id}
- **GET** - /ingredient/search/{name} <Retorna ingredientes com nome semelhante para uso na própria receita>
- **POST** - /ingredient <token>
- **PUT** - /ingredient/{id} <token>

#### Avaliação

- **GET** - /rating/user/{id}
- **GET** - /rating/recipe/average/{id}
- **POST** - /rating
- **PUT** - /rating/{id}
- **DELETE** - /rating/{id}

#### Comentário

- **GET** - /comment/user/{id}
- **POST** - /comment
- **PUT** - /comment/{id}
- **DELETE** - /comment/{id}