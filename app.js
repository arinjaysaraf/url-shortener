const express = require('express')
const shortId = require('shortid');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(__dirname + '/public')); // add public files

app.use(express.json()) // middleware
app.use(express.urlencoded({ extended: true })) //middleware

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')); //adds views files

app.get('/', async (req, res) => {
  res.render('index.ejs')
})

app.post('/', async (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})