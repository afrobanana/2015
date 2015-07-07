
Requirements

- jekyll
- node
- npm


```
npm install
```

```
grunt dev
```

```
grunt serve
```

```
grunt deploy
```

install libs in gemfile

```
bundle install --path _vendor/bundle
```

```
# https://stackoverflow.com/questions/7412208/imagemagick-and-os-x-lion-trouble/11661050
brew install libtool --universal
```

If building from scratch keep an eye on this:

https://github.com/yeoman/grunt-usemin/pull/564



no static / predefined urls
app state hashed into short url, eg. example.com/12fh2h67
on every action / state change, generate and push state (update url)
