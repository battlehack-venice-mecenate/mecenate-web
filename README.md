# mecenate-web

Braintree, Heroku, Node.js, AngularJS

Italy has a great number of wonderful monuments and artworks. Keep them beautiful as they are, it is an expensive task. As tourists we can get more responsible and contribute to these expenses.

Mecenate lets you donate to keep your preferred artworks and monuments healthy. Let all people in the words be able to see historic monuments and artworks: help to keep them up!

```
git clone https://github.com/battlehack-venice-mecenate/mecenate-web.git

// generate
yo meanjs

// run locally with heroku
foreman start web

run locally
grunt

// first time
heroku login
heroku create mecenate-web
git push heroku master
heroku open

// deploy heroku (webhook)
git push origin master
```

[mecenate-web](https://mecenate-web.herokuapp.com/)

service integrated
* [angular-google-maps](http://angular-ui.github.io/angular-google-maps)
* [braintreepayments](https://www.braintreepayments.com/docs/javascript)

TODO
* clean up unused MEAN.js
* security issues: move API key of maps and braintree on server side
* https://github.com/demianborba/demo-braintree-angular-node
