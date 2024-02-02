const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outputFile = path.join(__dirname, '/build/index.html'); // Chemin où le fichier HTML sera enregistré

(async () => {
  // Lance Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Ouvre l'URL de votre application locale
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2' // Attends que le réseau soit inactif pendant au moins 500 ms
  });

  // Récupère le contenu HTML de la page
  const content = await page.content();

  // Écrit le contenu dans un fichier HTML
  fs.writeFileSync(outputFile, content);

  // Ferme le navigateur
  await browser.close();

  console.log(`Le fichier HTML a été généré : ${outputFile}`);
})();
