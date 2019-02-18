import path from 'path'
import express from 'express'
import user from './user'
import { Realm, UserSchema } from '../database'

const route = express.Router()

// route.use('/', express.static(path.resolve('public')))

route.get('/main.css', (req, res) => {
	res.sendFile(path.resolve('views/main.css'))
})

route.get('/', (req, res) => {
	res.render('pages/Home')
})

route.get('/add', (req, res) => {
	res.render('pages/AddPage', {message: null})
})

route.get('/list', async (req, res) => {
	const r = await Realm.open({schema: [UserSchema]})
	const users = r.objects('User')
	let pu = []
	for(let i in users){
		pu.push(users[i])
	}

	res.render('pages/ListPage', {users: pu, message: null})
})

route.get('/edit/:RN', async (req, res) => {
	const r = await Realm.open({schema: [UserSchema]})
	const users = r.objects('User').filtered(`RN == ${req.params.RN}`)

	res.render('pages/EditPage', {user: users[0] })
})

route.use('/user', user)

export default route