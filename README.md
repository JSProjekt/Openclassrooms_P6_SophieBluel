# Portfolio Architecte - Sophie Bluel

Ce projet est un site portfolio interactif développé pour Sophie Bluel, une architecte d'intérieur. Il inclut une galerie de projets, une gestion d'administrateur pour ajouter ou supprimer des projets, et une page de connexion pour l'authentification.

## Fonctionnalités principales

- **Page d'accueil** :
  - Affichage dynamique de la galerie de projets à partir du back-end.
  - Filtrage des projets par catégories.
- **Administration** :
  - Connexion avec authentification via une API.
  - Ajout et suppression de projets depuis une interface modale.
- **Interface responsive** :
  - Conception optimisée pour une variété de dispositifs.

## Prérequis

Avant de démarrer le projet, assurez-vous d'avoir les éléments suivants installés :

- [Node.js](https://nodejs.org) (version récente recommandée)
- npm (inclus avec Node.js)

## Installation et démarrage

1. **Cloner le dépôt** :
   ```bash
   git clone <https://github.com/JSProjekt/Openclassrooms_P6_SophieBluel.git>
   ```

2. **Installer les dépendances du back-end** :
   - Naviguez dans le dossier back-end :
     ```bash
     cd backend
     ```
   - Installez les dépendances :
     ```bash
     npm install
     ```

3. **Démarrer le back-end** :
   - Lancer le serveur :
     ```bash
     npm start
     ```
   - Par défaut, l'API est accessible sur `http://localhost:5678`.

4. **Configurer le front-end** :
   - Naviguez dans le dossier front-end :
     ```bash
     cd frontend
     ```
   - Ouvrez le fichier `index.html` dans un navigateur ou servez-le via une extension comme Live Server.

5. **Tester l'API** :
   - Accédez à la documentation Swagger sur `http://localhost:5678/api-docs` pour explorer les routes.
   - Vérifiez les endpoints avec un outil comme Postman ou Swagger.

## Structure du projet

- **HTML** : Fichiers de base pour la page d'accueil et la page de connexion.
- **CSS** : Fichier `style.css` pour le style global.
- **JavaScript** :
  - `index.js` : Gestion de la galerie dynamique.
  - `modal.js` : Gestion des modales pour l'ajout/suppression de projets.
  - `api.js` : Appels à l'API pour récupérer et envoyer des données.
  - `auth.js` : Gestion de l'authentification utilisateur.

## Ressources utiles

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Swagger Documentation](https://swagger.io/docs/)
- [Postman](https://www.postman.com/)

---
