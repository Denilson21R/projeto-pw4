## Endpoints

### Usuário
- **POST** - /user/auth
- **GET** - /user/{id}
- **POST** - /user
- **PUT** - /user/{id}
- **DELETE** - /user/{id}

### Receita
- **GET** - /recipe/{id}
- **GET** - /recipe <Retorna receitas com paginacao>
- **POST** - /recipe
- **PUT** - /recipe/{id}
- **DELETE** - /recipe/{id}

#### Ingrediente
- **GET** - /ingredient/{id}
- **GET** - /ingredient/{name} <Retorna ingredientes com nome semelhante para uso na própria receita>
- **POST** - /ingredient
- **PUT** - /ingredient/{id} <Somente o usuário que criou pode atualizar>