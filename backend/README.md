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

#### Curtida

- **GET** - /reaction/likes/user/{id}
- **GET** - /reaction/like/{id}
- **POST** - /reaction/like
- **DELETE** - /reaction/like/{id}

#### Comentário

- **GET** - /comments/user/{id}
- **GET** - /comment/{id}
- **POST** - /comment
- **PUT** - /comment/{id}
- **DELETE** - /comment/{id}