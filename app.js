const express = require('express')
const shortId = require('shortid');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const path = require('path')
const ShortUrl = require('./models/url.model');
const { nextTick } = require('process');
const createHttpError = require('http-errors');

const app = express()
const port = 3000

app.use(express.static(__dirname + '/public')); // add public files

app.use(express.json()) // middleware
app.use(express.urlencoded({ extended: true })) //middleware

mongoose.connect('mongodb://localhost:27017', {
  dbName: 'url-shoterner',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Mongoose CONNECTED')
}).catch((err) => {
  console.log(err)
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')); //adds views files

app.get('/', async (req, res) => {
  res.render('index.ejs')
})

app.post('/', async (req, res, next) => {
  try {
    const { url } = req.body
    if (!url) {
      throw createHttpError.BadRequest('Provide a valid URL')
    }
    const urlexists = await ShortUrl.findOne({ url })
    if (urlexists) {
      res.render('index', { short_url: `http://localhost:3000/${urlexists.shortId}`, })
      return
    }
    const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
    const reult = await shortUrl.save()
    res.render('index', { short_url: `http://localhost:3000/${result.shortId}`, })
  } catch (error) {
    next(error)
  }
})

app.get('/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params
    const result = await ShortUrl.findOne({ shortId })
    if (!result) {
      throw createHttpError.NotFound('Short url does not exist')
    }
    res.redirect(result.url)
  } catch (error) {
    next(error)
  }
})

app.use((req, res, next) => {
  next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('index', { error: err.message })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})