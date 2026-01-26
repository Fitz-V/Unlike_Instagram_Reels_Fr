# Unlike_Instagram_Reels_Fr
Un script JS pour enlever vos likes Instagram (réels, photos, vidéos), fonctionne uniquement sur la version française.

# Description
Ce script s'exécute directement dans la console de votre navigateur et permet de supprimer automatiquement tous vos likes Instagram.
Il est spécialement conçu pour la version française d'Instagram et utilise l'interface "Votre activité" pour supprimer les publications que vous avez liké.
Le script inclut un flag DEBUG pour activer/désactiver les messages de débogage et une valeur par défaut volontairement basse (modifiable) afin de servir de démonstration.

# Avertissement important
**LISEZ CE QUI SUIT AVANT D'UTILISER CE SCRIPT** :

**Usage à vos risques et périls** - Ce script est fourni "tel quel", sans garantie d'aucune sorte

**Bon sens** - Ne collez pas de code dans la console de votre Navigateur Internet sans vous être assuré de son contenu et l'avoir compris

**Limitations d'Instagram** - Instagram peut détecter et limiter les activités automatisées

**Irréversible** - Les likes supprimés ne peuvent pas être restaurés

**Compte à risque** - Une utilisation excessive pourrait entraîner une suspension temporaire, voire un bannissement

**Version française uniquement** - Le script fonctionne uniquement sur la version Française d'Instagram

# Fonctionnalités

- Unlike par lots de 18 publications
  
- Gestion des pauses entre chaque lot pour éviter la détection
  
- Rafraichis les publications lorsqu'elles ne s'affichent plus, en passant sur l'onglet "Commentaires" de "Votre activité" puis en revenant sur l'onglet des posts likés
  
- Déboguage dans la console possible avec le paramètre "DEBUG = true"
  
- Scroll automatique pendant la séléction

# Prérequis

- Navigateur web (Chrome, FireFox, Brave, ...), utilisez de préférence un ordinateur
  
- Compte Instagram **avec interface en Français**
  
- Être connecté à son compte

# Utilisation

**1 - Accédez à votre page d'activités Instagram**

	- Connectez-vous à Instagram depuis votre ordinateur
	- Dans le menu à gauche, appuyez sur le bouton menu ( 3 lignes horizontales)
	- Sélectionnez le bouton "Votre activité"
	- Vérifiez que vous êtes bien sur la section "J'aime"

**2 - Ouvrez la console de votre navigateur**

	- Windows / Linux : F12 ou CTRL+SHIFT+I
	- Mac : Cmd+Option+I
	- En haut de la fenêtre qui s'affiche, sélectionnez "Console"

**3 - Copiez-collez le script**

	- Copiez l'intégralité du script
	- Collez-le dans la console
		- En règle générale, votre navigateur vous demandera une confirmation pour pouvoir coller quelque-chose dans votre console.
		- Assurez-vous de bien prendre en compte tout avertissement / dangers liés à cette opération.
	- Appuyez sur Entrée une fois le code collé

**4 - Paramètres importants**

	- maxCycle : nombre de cycles ( par défaut 1), chaque cycle supprime jusqu'à 18 publications de vos likes.
		-> ajustable selon vos besoin, mais **il n'est pas recommandé de mettre de grandes valeurs**
	- DEBUG : **true** pour voir les messages de déboguage détaillé, **false** sinon

	Exemple d'execution :

	removeAllLikesDebugAdvanced(1, false);
		-> Un cycle donc 18 publications supprimées, pas de mesage de déboguage sauf en cas d'arrêt du script.
	removeAllLikesDebugAdvanced(10, true);
		-> 10 cycles donc 180 publications supprimées, déboguage activé.

**4 - Une fois le code lancé**

	- Vérifiez qu'il se lance correctement grâce aux messages de déboguage
	- Vous pouvez laisser la fenêtre ouverte en arrière-plan et vaquer à vos occupations
	- Il est recommandé de vérifier de temps en temps la bonne exécution du script afin de le lancer à nouveau en cas d'arrêt


# Limitations et problèmes connus

**Problèmes Techniques**

	- Interface Instagram : Le script dépend de la structure HTML actuelle (01/2026) d'Instagram
	- Traduction : Nécessite d'avoir l'interface en Français
	- Performance : La vitesse de suppression ne peut pas être augmentée à moins de risquer un bloquage
	- En cas de bloquage des suppressions : Il est recommandé d'attendre 24-48h avant de relancer
	- Certaines publications likées ne sont pas supprimables et peuvent générer une erreur.
	  =>Ce bug ne provient pas du script mais d'Instagram et sa façon de gérer les publications dans leur base de données

# CE PROJET EST FOURNIT A TITRE EDUCATIF, LES UTILISATEURS POTENTIELS ASSUMENT L'ENTIERE RESPONSABILITE DE SON UTILISATION !
# L'UTILISATION DE CE SCRIPT NE SUIT PAS LES TOS D'INSTAGRAM, IL N'EST EN AUCUN CAS AFFILIE A META OU INSTAGRAM !
# L'AUTEUR DU SCRIPT DECLINE TOUTE RESPONSABILITE EN CAS DE DOMMAGE DIRECT ET INDIRECT LIE A SON UTILISATION
# EN UTILISANT CE SCRIPT, VOUS CONFIRMEZ QUE VOUS AVEZ COMPRIS ET ACCEPTE TOUT RISQUE LIE A SON UTILISATION
