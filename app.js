const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const directoryPath = path.join(__dirname, 'files'); // Chemin du dossier

// Fonction pour obtenir la taille (en Mo) et la date de modification d'un fichier
const getFileDetails = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          // Convertir la taille en Mo, arrondie à deux chiffres après la virgule
          const sizeInMb = (stats.size / (1024 * 1024)).toFixed(2);
          resolve({
            size: sizeInMb, // Taille en Mo
            mtime: stats.mtime // Date de modification
          });
        }
      });
    });
  };

// Fonction pour formater la date de modification d'un fichier
const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};



app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(directoryPath, filename);

    // Sécurité: assurez-vous que le paramètre ne contient pas de chemins relatifs
    if (filename.indexOf('..') !== -1) {
        return res.status(403).send('Forbidden');
    }

    // Vérifiez si le fichier existe
    if (fs.existsSync(filePath)) {
        res.download(filePath); // Set disposition and send it.
    } else {
        res.status(404).send('Fichier non trouvé');
    }
});


app.get('/', async (req, res) => {
    try {
        const files = await fs.promises.readdir(directoryPath);
        const fileDetailsPromises = files.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const details = await getFileDetails(filePath);
            return `<tr>
            <td>${file}</td>
            <td>${details.size} Mo          </td>
            <td class="date-column">          ${formatDate(details.mtime)}</td>
            <td><a href="/files/${file}" class="button">Télécharger</a></td>
          </tr>`;  
        });

        const fileDetails = await Promise.all(fileDetailsPromises);
        const tableRows = fileDetails.join('');

        res.send(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>AlgoForge - MCPHUB</title>
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Source+Sans+Pro&display=swap" rel="stylesheet">
                <link href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" rel="stylesheet">
                <style>
                @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Source+Sans+Pro&display=swap");
@import url("https://use.fontawesome.com/releases/v5.15.2/css/all.css");

* {
	/* font-family: 'Noto Sans', sans-serif; */ font-family: 'Source Sans Pro', sans-serif;
	margin: 0;
	padding: 0;
	
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
}

html {
	line-height: 2em;
	color: #FFF;
}

body {
	margin: 0 auto;
	padding-top: 20px;
	padding-bottom: 20px;
	
	max-width: 800px;
	min-height: 100vh;

	background-color: #0F0F0F;	
	background-image: url("/theme/images/background.jpg");
	background-attachment: fixed;
	/*background-size: 100% 100%; */ background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

header {
	display: flex;
	justify-content: space-between;
	
	padding: 5px;
}

footer {
	font-size: 14px;
	text-align: center;
	line-height: normal;
	
	padding: 10px;
}

div.container {
	background-color: rgba(0, 0, 0, 0.5);
	
	padding: 10px;
	
	position: relative;
	
	border-radius: 7px;
	-webkit-border-radius: 7px;
	-moz-border-radius: 7px;
}

div.back-link {
	position: absolute;
	
	left: 10px;
	top: 10px;
}

div.friendly-header {
	display: flex;
	
	justify-content: center;
	align-content: center;
	align-items: center;

	flex-direction: column;
	flex-wrap: nowrap;
	
	text-align: center;
	
	padding: 5px;
}

div.friendly-desc {
	margin-top: 5px;
}

a.blue {
	color: #4287F5;
}

p.web-repo, p.web-desc {
	font-size: 16px;
	line-height: normal;
	
	text-align: center;
}

p.web-desc {
	font-size: 14px;
}

img.web-logo {
	width: 50%;
	height: auto;
}

div.title {
	display: flex;
	
	flex-direction: column;
}

div.title h1 {
	text-align: left;
}

div.search-box {
	display: flex;
	
	justify-content: center;
	align-content: center;
	
	flex-direction: column;
}

div.table-list {
	margin: 10px 0 10px 0;
}

div.notfound-container {
	display: flex; 
	
	flex-direction: column;
	
	justify-content: center;
	align-content: center;
	
	align-items: center;
	
	gap: 10px;
	
	padding: 10px;
}

div.notfound-title {
	display: flex;
	
	flex-direction: row;
	
	justify-content: center;
	align-content: center;
	
	align-items: center;
	
	gap: 10px;
}

hr.separator {
	background: linear-gradient(to right, transparent, white, transparent);
	border: none;
	
	margin: 5px 0 5px 0;
	
	height: 1px;
}

h1 {
	font-weight: 200;
	font-size: 30px;
	
	text-align: center;
}

a {
	color: #FFF;
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
}
a.clear, a.clear:link, a.clear:visited {
	color: #666;
	
	font-size: 14px;
	line-height: normal;
	
	transition: all 200ms ease-in;
	-webkit-transition: all 200ms ease-in;
	-moz-transition: all 200ms ease-in;
	-ms-transition: all 200ms ease-in;
	-o-transition: all 200ms ease-in;
}
a.logo {
	width: auto;
}

p, h1 {
	text-shadow: black 2px 0 2px;
}

#search {	
	padding: 5px; 
	width: 250px;
	height: 20px;
	
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	
	-webkit-appearance: textfield;

	font-size: 14px;
	
	border: 1px solid #ccc;
	
	background-color: #fff;
	color: #555;
	
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	
	transition: border linear .2s, box-shadow linear .2s;
	-webkit-transition: border linear .2s, box-shadow linear .2s;
	-moz-transition: border linear .2s, box-shadow linear .2s;
	-o-transition: border linear .2s, box-shadow linear .2s;
}
#search:focus {
	outline: 0;
	border-color: rgba(0, 0, 0, 0.8);
	
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 0, 0, 0.6);
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 0, 0, 0.6);
	-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 0, 0, 0.6);
}
#search::-moz-focus-inner {
	padding: 0;
	border: 0;
}

.button {
    font-size: 20px;
    font-weight: 500;
    color: #007bff;
    padding: 10px 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
}

.button:hover {
    color: #fff; /* Changement de couleur du texte au survol */
    background: #007bff; /* Changement de couleur de l'arrière-plan au survol */
    transform: scale(1.1); /* Effet de grossissement au survol */
}

.icons {
	height: 24px;
	width: 24px;
}

table {
	margin: 0 auto;
	min-width: 400px;
	
	border-collapse: collapse;

	table-layout: fixed;	
}

tr {
	outline: 0;
	border-bottom: 1px solid #444;
}
tr:hover td:not(#not-found) {
	color: #FFF;	
	background: rgba(0, 0, 0, 0.4);
}
tr td:first-of-type {
	padding-left: 10px;
	padding-right: 10px;
}
tr:last-child, tr#not-found-border {
	border-bottom: none;
}

th {
	text-align: left;
}


td {
    padding: 8px; /* Ajouter de l'espace autour du contenu */
    text-align: left; /* Aligner le texte à gauche */
}

.date-column {
    padding-right: 10px; /* Ajouter plus d'espace à droite de la date */
}

td.link {
	width: 60%;
}

td.size {
	width: 15%;
}

td.date {
	width: 20%;
	
	padding-right: 10px;
}

td {
	padding: 5px 0;
	
	outline: 0;
	border: 0;
	
	text-align: left;
	
	transition: background 200ms ease-in;
	-webkit-transition: background 200ms ease-in;
	-moz-transition: background 200ms ease-in;
	-ms-transition: background 200ms ease-in;
	-o-transition: background 200ms ease-in;
}
td a {
	display: block;
}

td:last-child,th:last-child {
	text-align: right;
}

.parent a:hover {
	color: #2a2a2a;
}

.no-stretch {
	object-fit: scale-down;
}

.center-text {
	text-align: center;
}

                </style>
            </head>
            <body>
                <div class="container">
                    <header> <!-- En-tête de votre application --> </header>
                    <div class="file-container">
                        <table>
                            <tr>
                                <th>Nom</th>
                                <th>Taille</th>
                                <th>Date de modification</th>
                            </tr>
                            ${tableRows}
                        </table>
                    </div>
                    <footer>
                    <p>Powered by Danbenba</p>
                    <p><a href="https://www.youtube.com/playlist?list=mcp">Regardez les vidéos sur la playlist</a></p>
                    </footer>
                </div>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send('Erreur lors de la lecture du dossier');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`-----------MCPHUB-----------`);
	console.log(`Version 1.0.0`);
	console.log(`Powered by danbenba`);
	console.log(`----------------------------`);
    console.log(`Serveur démarré sur le port ${PORT}`);
	console.log(` `);
	console.log(`URL : localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Le port ${PORT} est déjà utilisé.`);
        app.listen(0); // Écoute sur un port aléatoire disponible
    } else {
        console.error(err);
    }
});
