# MCPHUB File Manager

MCPHUB File Manager est une application Web simple basée sur Node.js et Express. Elle permet aux utilisateurs de naviguer dans un répertoire de fichiers, de voir des détails tels que la taille et la date de modification des fichiers, et de télécharger des fichiers directement depuis leur navigateur.

## Caractéristiques

- Liste tous les fichiers d'un répertoire spécifique.
- Affiche la taille et la date de modification de chaque fichier.
- Téléchargement sécurisé des fichiers via une URL spécifique.
- Interface utilisateur minimaliste et responsive.

## Comment ça marche ?

L'application utilise Node.js et le framework Express pour servir les fichiers et les informations sur les fichiers d'un répertoire donné. Chaque fichier est listé avec sa taille et sa date de dernière modification. Les utilisateurs peuvent télécharger les fichiers en cliquant sur un lien de téléchargement.

## Prérequis

- Node.js
- npm (Node Package Manager)

## Installation

Pour installer et exécuter cette application, suivez ces étapes :

1. **Cloner le dépôt :**

   ```sh
   git clone https://github.com/Mcp-Hub/McpHub-WebSite
   ```

2. **Installer les dépendances :**

   Dans le répertoire du projet, exécutez :

   ```sh
   npm install
   ```

3. **Démarrer le serveur :**

   ```sh
   npm start
   ```

   Le serveur démarrera et écoutera sur le port spécifié (par défaut : 3000).

4. **Build le site :**

   ```sh
   npm build
   ```

   Allez dans le dossier build pour voir le fichier html

## Usage

Une fois le serveur démarré, ouvrez votre navigateur et allez à l'adresse `http://localhost:3000`. Vous devriez voir la liste des fichiers du répertoire spécifié. Vous pouvez cliquer sur le lien "Télécharger" pour télécharger un fichier.

## Sécurité

L'application inclut une vérification de base pour s'assurer que les chemins relatifs ne sont pas utilisés dans les demandes de téléchargement, empêchant ainsi l'accès à des fichiers en dehors du répertoire spécifié.

## Personnalisation

Vous pouvez personnaliser le répertoire des fichiers en modifiant la variable `directoryPath` dans le fichier principal de l'application.

## Contribution

Les contributions sont les bienvenues. Pour contribuer, veuillez forker le dépôt, créer une branche pour vos modifications, et soumettre une pull request.

## Support

Pour le support, veuillez ouvrir un issue sur le dépôt GitHub du projet.

---

Powered by Danbenba

Regardez les vidéos sur la playlist : [YouTube Playlist](https://www.youtube.com/playlist?list=mcp)

---