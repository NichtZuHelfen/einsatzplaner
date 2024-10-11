# Fließgrund-App



## Entwicklungsserver starten


### `npm start`
Startet die App im Entwicklungsmodus. 

Im Browser [http://localhost:3000](http://localhost:3000) öffnen, um die App anzuzeigen.


## Version veröffentlichen
1. Branch 'gh-pages' auschecken
2. 'main' mergen
3. ```git subtree push --prefix build origin gh-pages```

Sollte diese Fehlermeldung kommen:

```
git push using:  origin gh-pages
To https://github.com/NichtZuHelfen/einsatzplaner.git
 ! [rejected]        f0ca5025cd2112f979157c0be2450727f125723c -> gh-pages (non-fast-forward)
error: failed to push some refs to 'https://github.com/NichtZuHelfen/einsatzplaner.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
dann folgendes ausführen: 

```
git push origin --delete gh-pages
git subtree push --prefix build origin gh-pages
```
