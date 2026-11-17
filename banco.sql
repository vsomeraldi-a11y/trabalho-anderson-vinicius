
-- cria o banco database
CREATE DATABASE IF NOT EXISTS novamind
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE novamind;

-- tabela do modal de download
CREATE TABLE IF NOT EXISTS downloads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tabela do formulario de contato
CREATE TABLE IF NOT EXISTS contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    mensagem TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exemplos de dados
INSERT INTO downloads (email) VALUES ('aluno@exemplo.com');

INSERT INTO contatos (nome, email, mensagem)
VALUES ('Jao Gordão', 'joaoobeso6767@exemplo.com', 'Gostei muito do novak :)))');

SELECT * FROM downloads ORDER BY criado_em DESC;
SELECT * FROM contatos ORDER BY criado_em DESC;
