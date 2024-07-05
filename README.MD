# Gestionnaire d'Habitudes

## Description

Notre application propose une interface simple pour suivre vos habitudes quotidiennes. Vous pouvez marquer les habitudes comme faites, ajouter de nouvelles habitudes et consulter l'historique de vos habitudes.

## Fonctionnalités

### 1. Interface Principale

- Affichage de toutes les habitudes du jour.
- Possibilité de marquer une habitude comme faite en cliquant dessus. Seules les habitudes du jour peuvent être cliquées.

### 2. Création d'Habitudes

- Bouton pour créer une nouvelle habitude.
- Ouverture d'une modale avec un champ texte pour saisir le nom de la nouvelle habitude et un bouton pour valider.
- Fermeture automatique de la modale après validation et ajout de l'habitude à la liste des habitudes du jour.

### 3. Historique des Habitudes

- Bouton pour visionner l'historique des habitudes.
- Ouverture d'une dialog avec un tableau listant toutes les habitudes et, pour chaque date, un émoji indiquant si l'habitude a été faite ou non.

## Technologies Utilisées

- **HTML** pour la structure de base.
- **CSS** pour le style.
- **JavaScript** pour l'interactivité.
- **Dialog Element** pour les modales.
- \*\*NodeJs pour le backend

## Installation

1. Clonez le dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/Fanou59/habits-tracker.git
   ```
2. ```bash
   npm install
   ```
3. Dans le dossier frontend -> `bash npm run dev`
4. Dans le dossier backend -> `bash npm run dev`
5. Ouvrez l'adresse http://localhost:5173

## Utilisation

### Interface Principale

1. Visualisez les habitudes du jour.
2. Cliquez sur une habitude pour la marquer comme faite.

### Création d'Habitudes

1. Cliquez sur le bouton "Créer une habitude".
2. Saisissez le nom de la nouvelle habitude dans le champ texte de la modale.
3. Cliquez sur le bouton de validation pour ajouter l'habitude à la liste.

### Historique des Habitudes

1. Cliquez sur le bouton "Voir l'historique".
2. Consultez le tableau pour voir l'état des habitudes pour chaque date.

## Auteurs

- **Stéphane Guery** - _Développeur Principal_ - [Votre Profil GitHub](https://github.com/Fanou59)
