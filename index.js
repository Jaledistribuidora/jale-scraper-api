
const express = require('express');
const scraper = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/produtos', async (req, res) => {
  const { busca } = req.query;
  if (!busca) return res.status(400).json({ erro: 'Parâmetro "busca" é obrigatório.' });

  try {
    const resultados = await scraper.buscarProdutos(busca);
    if (resultados.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
    res.json(resultados);
  } catch (err) {
    console.error('Erro ao consultar o site:', err.message);
    res.status(500).json({ erro: 'Erro ao acessar o site da Jale.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
