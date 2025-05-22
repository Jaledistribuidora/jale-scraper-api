
const puppeteer = require('puppeteer');

async function buscarProdutos(busca) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const produtos = [];

  try {
    const searchUrl = `https://www.jaledistribuidora.com.br/buscar?q=${encodeURIComponent(busca)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });

    await page.waitForSelector('.listagem .item'); // ajuste baseado no HTML real

    const resultados = await page.$$eval('.listagem .item', itens => {
      return itens.map(item => {
        const nome = item.querySelector('.nome-produto')?.innerText || 'N/A';
        const preco = item.querySelector('.preco-produto')?.innerText || 'N/A';
        return { nome, preco };
      });
    });

    produtos.push(...resultados);
  } catch (error) {
    console.error('Erro no scraping com Puppeteer:', error.message);
  } finally {
    await browser.close();
  }

  return produtos;
}

module.exports = { buscarProdutos };
