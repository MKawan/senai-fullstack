/*
    Projeto: Banco de Dados - Jogo de RPG Online
    Atividade: Avaliação 1 - Criação de tabelas com linguagem DDL
    SGBD: Microsoft SQL Server

    Descrição:
    Script desenvolvido com base no diagrama entidade-relacionamento
    fornecido na atividade. Cria o banco de dados e as cinco tabelas,
    incluindo chaves primárias, chaves estrangeiras e relacionamentos.

    Relacionamentos implementados:
      1. USUARIOS (1) -------- (N) PERSONAGENS
      2. CLASSES  (1) -------- (N) PERSONAGENS
      3. CLASSES  (1) -------- (N) CLASSES_HABILIDADES
      4. HABILIDADES (1) ----- (N) CLASSES_HABILIDADES

    O relacionamento N:N entre CLASSES e HABILIDADES é implementado
    pela tabela associativa CLASSES_HABILIDADES.
*/

-- =========================================================
-- 1. CRIAÇÃO E SELEÇÃO DO BANCO DE DADOS
-- =========================================================

-- Cria o banco somente se ele ainda não existir.
IF DB_ID(N'RPG_Online') IS NULL
BEGIN
    CREATE DATABASE RPG_Online;
END;
GO

-- Seleciona o banco no qual as tabelas serão criadas.
USE RPG_Online;
GO

-- =========================================================
-- 2. TABELA: USUARIOS
-- =========================================================
-- Armazena os dados de acesso dos usuários do jogo.
-- Um usuário pode possuir vários personagens.
-- UsuarioId é a chave primária da tabela.

CREATE TABLE dbo.USUARIOS
(
    UsuarioId INT IDENTITY(1,1) NOT NULL,
    Email     NVARCHAR(255) NOT NULL,
    Senha     NVARCHAR(255) NOT NULL,

    CONSTRAINT PK_USUARIOS
        PRIMARY KEY (UsuarioId),

    -- Garante que não existam duas contas com o mesmo e-mail.
    CONSTRAINT UQ_USUARIOS_Email
        UNIQUE (Email)
);
GO

-- =========================================================
-- 3. TABELA: CLASSES
-- =========================================================
-- Armazena as classes disponíveis no RPG.
-- Uma classe pode estar associada a vários personagens
-- e a várias habilidades, por meio da tabela associativa.

CREATE TABLE dbo.CLASSES
(
    ClasseId  INT IDENTITY(1,1) NOT NULL,
    Nome      NVARCHAR(100) NOT NULL,
    Descricao NVARCHAR(500) NULL,

    CONSTRAINT PK_CLASSES
        PRIMARY KEY (ClasseId)
);
GO

-- =========================================================
-- 4. TABELA: PERSONAGENS
-- =========================================================
-- Armazena os personagens criados pelos usuários.
-- Cada personagem pertence a exatamente um usuário e
-- a uma classe. As chaves estrangeiras implementam
-- os relacionamentos 1:N indicados no diagrama.

CREATE TABLE dbo.PERSONAGENS
(
    PersonagemId   INT IDENTITY(1,1) NOT NULL,
    NomePersonagem NVARCHAR(100) NOT NULL,
    UsuarioId      INT NOT NULL,
    ClasseId       INT NOT NULL,

    CONSTRAINT PK_PERSONAGENS
        PRIMARY KEY (PersonagemId),

    -- Relacionamento: USUARIOS (1) para PERSONAGENS (N).
    CONSTRAINT FK_PERSONAGENS_USUARIOS
        FOREIGN KEY (UsuarioId)
        REFERENCES dbo.USUARIOS (UsuarioId),

    -- Relacionamento: CLASSES (1) para PERSONAGENS (N).
    CONSTRAINT FK_PERSONAGENS_CLASSES
        FOREIGN KEY (ClasseId)
        REFERENCES dbo.CLASSES (ClasseId)
);
GO

-- =========================================================
-- 5. TABELA: HABILIDADES
-- =========================================================
-- Armazena as habilidades que podem ser associadas às classes.
-- Uma habilidade pode pertencer a várias classes.

CREATE TABLE dbo.HABILIDADES
(
    HabilidadeId INT IDENTITY(1,1) NOT NULL,
    Nome         NVARCHAR(100) NOT NULL,

    CONSTRAINT PK_HABILIDADES
        PRIMARY KEY (HabilidadeId)
);
GO

-- =========================================================
-- 6. TABELA ASSOCIATIVA: CLASSES_HABILIDADES
-- =========================================================
-- Resolve o relacionamento N:N entre CLASSES e HABILIDADES.
-- Cada registro associa uma classe a uma habilidade.
-- A chave primária é composta pelas duas chaves estrangeiras,
-- impedindo que a mesma habilidade seja associada duas vezes
-- à mesma classe.

CREATE TABLE dbo.CLASSES_HABILIDADES
(
    ClasseId     INT NOT NULL,
    HabilidadeId INT NOT NULL,

    CONSTRAINT PK_CLASSES_HABILIDADES
        PRIMARY KEY (ClasseId, HabilidadeId),

    -- Relacionamento: CLASSES (1) para CLASSES_HABILIDADES (N).
    CONSTRAINT FK_CLASSES_HABILIDADES_CLASSES
        FOREIGN KEY (ClasseId)
        REFERENCES dbo.CLASSES (ClasseId),

    -- Relacionamento: HABILIDADES (1) para CLASSES_HABILIDADES (N).
    CONSTRAINT FK_CLASSES_HABILIDADES_HABILIDADES
        FOREIGN KEY (HabilidadeId)
        REFERENCES dbo.HABILIDADES (HabilidadeId)
);
GO

-- =========================================================
-- 7. CONSULTA DE CONFERÊNCIA
-- =========================================================
-- Lista as tabelas criadas no banco de dados selecionado.
SELECT
    TABLE_SCHEMA AS Esquema,
    TABLE_NAME AS Tabela
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
GO

/*
    Observações:
    - IDENTITY(1,1) gera automaticamente os identificadores.
    - INT foi utilizado para os campos de identificação.
    - NVARCHAR permite armazenar textos com caracteres acentuados.
    - Senha comporta até 255 caracteres para armazenar um hash
      de senha; não se deve armazenar senhas em texto puro.
    - As chaves estrangeiras garantem a integridade referencial.
    - Não foi configurada exclusão em cascata, evitando que a
      remoção de um usuário, classe ou habilidade apague registros
      relacionados automaticamente.
*/
