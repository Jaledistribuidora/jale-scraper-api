
const axios = require('axios');
const cheerio = require('cheerio');

const JALE_URL = 'https://www.jaledistribuidora.com.br';

async function buscarProdutos(busca) {
  try {
    const response = await axios.get(`${JALE_URL}/buscar?q=${encodeURIComponent(busca)}`);
    const $ = cheerio.load(response.data);
    const produtos = [];

    $('.product-box').each((i, el) => {
      const nome = $(el).find('.product-title').text().trim();
      const preco = $(el).find('.price').text().trim();
      const sku = $(el).attr('data-sku') || 'N/A';

      produtos.push({ nome, preco, sku });
    });

    return produtos;
  } catch (error) {
    console.error('Erro no scraping:', error.message);
    return [];
  }
}

module.exports = { buscarProdutos };
