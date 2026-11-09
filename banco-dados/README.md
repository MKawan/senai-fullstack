# Banco de Dados - Jogo de RPG Online

Este projeto cria um banco de dados para um jogo de RPG online utilizando SQL Server. O script implementa a estrutura principal do sistema, com usuários, personagens, classes, habilidades e a relação entre classes e habilidades.

## Objetivo

O banco foi modelado para armazenar:

- os dados de acesso dos usuários;
- os personagens criados por cada usuário;
- as classes disponíveis no jogo;
- as habilidades que cada classe pode possuir;
- a associação entre classes e habilidades.

A estrutura foi pensada para garantir integridade referencial, ou seja, impedir que sejam cadastrados registros inconsistentes.

---

## Estrutura geral do banco

O banco de dados chama-se `RPG_Online` e contém cinco tabelas principais:

1. `USUARIOS`
2. `CLASSES`
3. `PERSONAGENS`
4. `HABILIDADES`
5. `CLASSES_HABILIDADES`

Além disso, o script também cria as chaves primárias e estrangeiras necessárias para manter os relacionamentos correctos.

---

## 1. Criação e seleção do banco de dados

O primeiro bloco verifica se o banco já existe:

```sql
IF DB_ID(N'RPG_Online') IS NULL
BEGIN
    CREATE DATABASE RPG_Online;
END;
GO
```

### O que acontece?

- `DB_ID(N'RPG_Online')` verifica se o banco de dados existe.
- Se o retorno for `NULL`, o banco é criado com `CREATE DATABASE RPG_Online;`.
- `GO` separa os blocos de execução do SQL Server.

Em seguida, o banco é selecionado para receber as tabelas:

```sql
USE RPG_Online;
GO
```

Isso indica que todas as próximas instruções devem ser executadas dentro do banco `RPG_Online`.

---

## 2. Tabela `USUARIOS`

```sql
CREATE TABLE dbo.USUARIOS
(
    UsuarioId INT IDENTITY(1,1) NOT NULL,
    Email     NVARCHAR(255) NOT NULL,
    Senha     NVARCHAR(255) NOT NULL,

    CONSTRAINT PK_USUARIOS
        PRIMARY KEY (UsuarioId),

    CONSTRAINT UQ_USUARIOS_Email
        UNIQUE (Email)
);
GO
```

### Função da tabela

Essa tabela guarda os dados de acesso dos usuários do jogo.

### Campos

- `UsuarioId`: identificador único do usuário. É gerado automaticamente pelo `IDENTITY(1,1)`, ou seja, começa em 1 e aumenta de 1 em 1.
- `Email`: endereço de e-mail do usuário. É obrigatório (`NOT NULL`).
- `Senha`: senha armazenada. Também é obrigatória.

### Regras aplicadas

- `PRIMARY KEY (UsuarioId)`: define `UsuarioId` como chave primária, garantindo unicidade.
- `UNIQUE (Email)`: impede que dois usuários tenham o mesmo e-mail.

### Observação importante

A senha não deve ser armazenada em texto puro em um ambiente real. O ideal é guardar um hash da senha, como exemplo de boa prática de segurança.

---

## 3. Tabela `CLASSES`

```sql
CREATE TABLE dbo.CLASSES
(
    ClasseId  INT IDENTITY(1,1) NOT NULL,
    Nome      NVARCHAR(100) NOT NULL,
    Descricao NVARCHAR(500) NULL,

    CONSTRAINT PK_CLASSES
        PRIMARY KEY (ClasseId)
);
GO
```

### Função da tabela

Armazena as classes possíveis no jogo, como guerreiro, mago, arqueiro, sacerdote etc.

### Campos

- `ClasseId`: identificador da classe.
- `Nome`: nome da classe.
- `Descricao`: descrição opcional da classe.

### Observação

`Descricao` aceita valor nulo, porque nem toda classe precisa ter uma descrição detalhada.

---

## 4. Tabela `PERSONAGENS`

```sql
CREATE TABLE dbo.PERSONAGENS
(
    PersonagemId   INT IDENTITY(1,1) NOT NULL,
    NomePersonagem NVARCHAR(100) NOT NULL,
    UsuarioId      INT NOT NULL,
    ClasseId       INT NOT NULL,

    CONSTRAINT PK_PERSONAGENS
        PRIMARY KEY (PersonagemId),

    CONSTRAINT FK_PERSONAGENS_USUARIOS
        FOREIGN KEY (UsuarioId)
        REFERENCES dbo.USUARIOS (UsuarioId),

    CONSTRAINT FK_PERSONAGENS_CLASSES
        FOREIGN KEY (ClasseId)
        REFERENCES dbo.CLASSES (ClasseId)
);
GO
```

### Função da tabela

Armazena os personagens criados pelos usuários.

### Relações

- Um usuário pode ter vários personagens.
- Cada personagem pertence a uma única classe.

### Campos

- `PersonagemId`: chave primária do personagem.
- `NomePersonagem`: nome do personagem.
- `UsuarioId`: identifica o usuário dono do personagem.
- `ClasseId`: identifica a classe do personagem.

### Chaves estrangeiras

- `FK_PERSONAGENS_USUARIOS`: garante que o `UsuarioId` exista na tabela `USUARIOS`.
- `FK_PERSONAGENS_CLASSES`: garante que a `ClasseId` exista na tabela `CLASSES`.

Esses dois relacionamentos representam o relacionamento do tipo 1:N:

- `USUARIOS (1) ----- (N) PERSONAGENS`
- `CLASSES (1) ----- (N) PERSONAGENS`

---

## 5. Tabela `HABILIDADES`

```sql
CREATE TABLE dbo.HABILIDADES
(
    HabilidadeId INT IDENTITY(1,1) NOT NULL,
    Nome         NVARCHAR(100) NOT NULL,

    CONSTRAINT PK_HABILIDADES
        PRIMARY KEY (HabilidadeId)
);
GO
```

### Função da tabela

Representa as habilidades do jogo, como ataque forte, cura, fogo, defesa, entre outras.

### Campos

- `HabilidadeId`: identificador da habilidade.
- `Nome`: nome da habilidade.

---

## 6. Tabela associativa `CLASSES_HABILIDADES`

```sql
CREATE TABLE dbo.CLASSES_HABILIDADES
(
    ClasseId     INT NOT NULL,
    HabilidadeId INT NOT NULL,

    CONSTRAINT PK_CLASSES_HABILIDADES
        PRIMARY KEY (ClasseId, HabilidadeId),

    CONSTRAINT FK_CLASSES_HABILIDADES_CLASSES
        FOREIGN KEY (ClasseId)
        REFERENCES dbo.CLASSES (ClasseId),

    CONSTRAINT FK_CLASSES_HABILIDADES_HABILIDADES
        FOREIGN KEY (HabilidadeId)
        REFERENCES dbo.HABILIDADES (HabilidadeId)
);
GO
```

### Função da tabela

Essa tabela resolve o relacionamento muitos-para-muitos (N:N) entre `CLASSES` e `HABILIDADES`.

### Como funciona?

- Uma classe pode ter várias habilidades.
- Uma habilidade pode pertencer a várias classes.

A tabela associativa armazena cada associação entre uma classe e uma habilidade.

### Chave primária composta

```sql
PRIMARY KEY (ClasseId, HabilidadeId)
```

Essa combinação atua como chave primária, garantindo que a mesma associação não seja cadastrada duas vezes.

### Relacionamentos

- `CLASSES (1) ----- (N) CLASSES_HABILIDADES`
- `HABILIDADES (1) ----- (N) CLASSES_HABILIDADES`

Ou seja, a tabela `CLASSES_HABILIDADES` funciona como ponte entre as duas tabelas.

---

## 7. Consulta de conferência

No final do script, o banco executa uma consulta para listar todas as tabelas criadas:

```sql
SELECT
    TABLE_SCHEMA AS Esquema,
    TABLE_NAME AS Tabela
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
GO
```

### O que essa consulta faz?

- lê as tabelas do banco atual;
- filtra apenas as tabelas base (`BASE TABLE`);
- exibe o nome do esquema e o nome da tabela;
- ordena o resultado por nome da tabela.

Essa consulta serve como validação rápida para confirmar que as tabelas foram criadas corretamente.

---

## Relacionamentos do modelo

O diagrama de relacionamento implementado pelo script é:

- `USUARIOS` 1 para N `PERSONAGENS`
- `CLASSES` 1 para N `PERSONAGENS`
- `CLASSES` 1 para N `CLASSES_HABILIDADES`
- `HABILIDADES` 1 para N `CLASSES_HABILIDADES`

Esses relacionamentos são protegidos por chaves estrangeiras, o que evita a criação de dados inconsistentes.

---

## Observações finais

O script usa:

- `IDENTITY(1,1)` para gerar valores automáticos;
- `INT` para identificar registros;
- `NVARCHAR` para armazenar textos com caracteres acentuados;
- `NOT NULL` para campos obrigatórios;
- `NULL` para campos opcionais;
- `FOREIGN KEY` para garantir a integridade referencial.

Também foi incluído um comentário importante: a senha não deve ser armazenada em texto puro em um sistema real. O ideal é utilizar hash para proteger as senhas.

---

## Conclusão

Esse script representa uma base sólida para um sistema de RPG online, com organização em tabelas, relacionamento entre entidades e regras de integridade. Ele mostra como criar um banco de dados funcional usando SQL Server e como estruturar corretamente as relações entre usuários, personagens, classes e habilidades.
