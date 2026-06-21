-- Tabelas do LibManager para o banco da nuvem (Aiven usa o database 'defaultdb')
-- Sem CREATE DATABASE: as tabelas entram no banco indicado na conexão.

CREATE TABLE categorias (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nome      VARCHAR(150) NOT NULL,
  email     VARCHAR(150) NOT NULL UNIQUE,
  senha     VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE livros (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  titulo         VARCHAR(200) NOT NULL,
  autor          VARCHAR(150) NOT NULL,
  ano_publicacao INT,
  status         ENUM('disponivel','emprestado') NOT NULL DEFAULT 'disponivel',
  categoria_id   INT,
  CONSTRAINT fk_livro_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE leitores (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(200) NOT NULL,
  cpf           VARCHAR(14)  NOT NULL UNIQUE,
  email         VARCHAR(150) NOT NULL,
  telefone      VARCHAR(20)
);

CREATE TABLE emprestimos (
  id                      INT AUTO_INCREMENT PRIMARY KEY,
  leitor_id               INT  NOT NULL,
  livro_id                INT  NOT NULL,
  data_emprestimo         DATE NOT NULL,
  data_devolucao_prevista DATE NOT NULL,
  data_devolucao_real     DATE NULL,
  status                  ENUM('ativo','devolvido') NOT NULL DEFAULT 'ativo',
  CONSTRAINT fk_emp_leitor FOREIGN KEY (leitor_id) REFERENCES leitores(id),
  CONSTRAINT fk_emp_livro  FOREIGN KEY (livro_id)  REFERENCES livros(id)
);

INSERT INTO categorias (nome) VALUES
  ('Programacao'), ('Engenharia de Software'), ('Banco de Dados'),
  ('Literatura'), ('Ciencias');