-- Script de criação do banco LibManager (MySQL)
DROP DATABASE IF EXISTS libmanager;
CREATE DATABASE libmanager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE libmanager;

-- Tabela "pai" no relacionamento 1:N com livros
CREATE TABLE categorias (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

-- Bibliotecários que fazem login (senha guardada como hash, nunca texto puro)
CREATE TABLE usuarios (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nome      VARCHAR(150) NOT NULL,
  email     VARCHAR(150) NOT NULL UNIQUE,
  senha     VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1:N -> uma categoria possui vários livros (categoria_id = Foreign Key)
CREATE TABLE livros (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  titulo         VARCHAR(200) NOT NULL,
  autor          VARCHAR(150) NOT NULL,
  ano_publicacao INT,
  status         ENUM('disponivel','emprestado') NOT NULL DEFAULT 'disponivel',
  categoria_id   INT,
  CONSTRAINT fk_livro_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Os leitores (alunos) do acervo
CREATE TABLE leitores (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(200) NOT NULL,
  cpf           VARCHAR(14)  NOT NULL UNIQUE,
  email         VARCHAR(150) NOT NULL,
  telefone      VARCHAR(20)
);

-- 1:N duplo -> liga leitores e livros através das Foreign Keys
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

-- Dados iniciais de categorias
INSERT INTO categorias (nome) VALUES
  ('Programacao'), ('Engenharia de Software'), ('Banco de Dados'),
  ('Literatura'), ('Ciencias');