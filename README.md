# Assistant de configuration de Freebox Call Notifier

Cet assistant permet d'autoriser le service [Freebox Call Notifier](https://github.com/Freebox-Tools/telegram-call-notifier) à accéder à votre Freebox Server. Il doit être exécuté sur un appareil connecté au même réseau que votre box.


## Utilisation

> Vous devrez avoir [Node.js](https://nodejs.org) et [npm](https://www.npmjs.com/) installés sur votre appareil.

Vous pouvez ouvrir un terminal et exécuter une de ces commandes :

**Avec `npx` :**

```bash
npx freebox-notifier-cli
```

**Avec `npm` :**

```bash
npm i -g freebox-notifier-cli
fbx-associate
```

**Utilisation avancée :**

> Utile uniquement pour les gens qui souhaitent utiliser une API différente de celle de Freebox Call Notifier, dans le cas où vous hébergeriez votre propre instance du service.

```bash
npm i -g freebox-notifier-cli
fbx-associate https://url-de-votre-api.com
```


## Licence

MIT © [Freebox Tools](https://github.com/freebox-tools)