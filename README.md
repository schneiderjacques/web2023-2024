# Nouvelles technologies du web

Création d'une application permettant la gestion d'évènements par utilisateurs en utilisant une carte du monde pour les visualiser.




## Installation

Télécharger le dossier et décompressez le.


Placez vous à la racine du projet et exécutez les commandes suivantes avec votre terminal : 

Installer le project avec yarn

```bash
  cd frontend
  yarn install
  cd ../backend
  yarn install
  cd dataBase
  docker compose up -d(Assurez-vous par la suite qu'il ai bien démarré)
  node script.js
```

Ensuite pour démarrer votre projet vous avez plusieurs possibilités :

```bash
  cd frontend
  yarn start:client //Démarre l'application front
  yarn start:server //Démarre le serveur
  yarn start:both //Démarre les deux en même temps
```

Jeu de données de base : 
    
    Mail : test@test.fr
    Password : Test1234

    Mail : test123@test.fr
    Password : TestTest57

Si vous souhaitez créer un compte et confirmer votre email nous avons utilisé un SMTP gratuit : 

https://ethereal.email/login

Connectez vous avec les informations présentent dans la config du backend :

```bash
   user : ismael.dicki18@ethereal.email
   pass : 5gphWRrjNcU8ZzGTyp
```

Puis rendez-vous dans la section message ou vous pourrez trouver votre mail et cliquer sur le mail de confirmation.

Ces informations sont sensées êtres privées et inaccessibles et se trouver dans un fichier .env par exemple mais pour ce projet étant privé et pour l'école nous les avons mis dans le code source.

Si vous désirez changer la clé secrète de jwt elle se trouve dans backend/src/auth/constants.ts