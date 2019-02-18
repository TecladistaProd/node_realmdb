import express from 'express'
import bodyParser from 'body-parser'
import routes from './src/routes'
import expressLayouts from 'express-ejs-layouts'

const app = express()

app.set('view engine', 'ejs')    // Setamos que nossa engine será o ejs
app.use(expressLayouts)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(3000, () => console.log('Listening on Port 3000'))