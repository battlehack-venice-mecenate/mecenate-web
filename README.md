# mecenate-web

Braintree, Heroku, Node.js, AngularJS

Italy has a great number of wonderful monuments and artworks. Keep them beautiful as they are is expensive. As tourists we can be more responsible and contribute to keep them alive.

Mecenate lets you donate to keep them up!

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

Navigate to [mecenate-web](https://mecenate-web.herokuapp.com/)
Navigate also to [mecenate-api](https://mecenate-api.herokuapp.com/)

#### Service integrated:
* [angular-google-maps](http://angular-ui.github.io/angular-google-maps)
* [braintreepayments](https://www.braintreepayments.com/docs/javascript)

TODO
* clean up unused MEAN.js
* security issues: move maps API key on server side
* TESTS!!
