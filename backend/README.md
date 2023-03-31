## Endpoints

### Usuário
- **POST** - /user/auth
- **GET** - /user/{id}
- **POST** - /user
- **PUT** - /user/{id} <token>
- **DELETE** - /user/{id} <token>

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