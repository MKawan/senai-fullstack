const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "../data/produtos.json");

app.use(cors());
app.use(express.json());

// Função para ler os produtos do arquivo JSON
function getProdutos() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler produtos.json:", error);
    return [];
  }
}

// Função para salvar os produtos no arquivo JSON
function saveProdutos(produtos) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(produtos, null, 2), "utf8");
  } catch (error) {
    console.error("Erro ao salvar produtos.json:", error);
  }
}

// 1. Listar produtos
app.get("/api/products", (req, res) => {
  const produtos = getProdutos();
  res.json(produtos);
});

// 2. Consultar um produto por ID
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produtos = getProdutos();
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.json(produto);
});

// 3. Cadastrar produto
app.post("/api/products", (req, res) => {
  const { nome, descricao, categoria, preco, imagem } = req.body;

  // Validação simples
  if (!nome || !descricao || !categoria || preco === undefined || preco <= 0) {
    return res
      .status(400)
      .json({
        erro: "Dados inválidos. Verifique nome, descrição, categoria e preço.",
      });
  }

  const produtos = getProdutos();

  // Gerar ID automaticamente
  const maxId = produtos.reduce((max, p) => (p.id > max ? p.id : max), 0);
  const novoProduto = {
    id: maxId + 1,
    nome,
    descricao,
    categoria,
    preco: parseFloat(preco),
    imagem: imagem || "",
  };

  produtos.push(novoProduto);
  saveProdutos(produtos);

  res.status(201).json(novoProduto);
});

// 4. Atualizar produto
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, descricao, categoria, preco, imagem } = req.body;

  // Validação simples
  if (!nome || !descricao || !categoria || preco === undefined || preco <= 0) {
    return res
      .status(400)
      .json({
        erro: "Dados inválidos. Verifique nome, descrição, categoria e preço.",
      });
  }

  const produtos = getProdutos();
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  const produtoAtualizado = {
    id,
    nome,
    descricao,
    categoria,
    preco: parseFloat(preco),
    imagem: imagem || "",
  };

  produtos[index] = produtoAtualizado;
  saveProdutos(produtos);

  res.json(produtoAtualizado);
});

// 5. Excluir produto
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let produtos = getProdutos();
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produtos.splice(index, 1);
  saveProdutos(produtos);

  res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Testar endpoints em: http://localhost:${PORT}/api/products`);
});
