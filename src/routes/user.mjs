import express from 'express'

import { Realm, UserSchema } from '../database'

const user = express.Router()

user.post('/insert', async (req, res) => {
	const r = await Realm.open({schema: [UserSchema]})
	r.write(() => {
		const person = r.create('User', {
			name: req.body.name,
			age: parseInt(req.body.age) || 0,
			RN: parseInt(req.body.RN)
		})
		// res.send({status: true, response: person})
		res.render('pages/AddPage', {message: 'Success'})
	})
})

user.get('/all', async (req, res) => {
	const r = await Realm.open({schema: [UserSchema]})
	const users = r.objects('User')
	res.send({status: true, response: users})
})

user.get('/get/:RN', async (req, res) => {
	const r = await Realm.open({schema: [UserSchema]})
	const users = r.objects('User').filtered(`RN == ${req.params.RN}`)
	res.send({status: true, response: users[0]})
})

user.get('/del/:RN', async (req, res) => {
	const r = await Realm.open({schema: [UserSchema]})
	const users = r.objects('User').filtered(`RN == ${req.params.RN}`)
	r.write(() => {
		r.delete(users[0])
	})
	// res.redirect('/list')
	res.render('pages/ListPage', {users: pu, message: 'User Deleted'})
})

user.post('/up', async (req, res) => {
	if(req.body.RN){
		const r = await Realm.open({schema: [UserSchema]})
		let users = r.objects('User').filtered(`RN == ${req.body.RN}`)
		let user = users[0]
		users = r.objects('User')
		
		delete req.body.RN

		r.write(() => {
			for(let key in req.body){
				if(user[key]){
					if(key.match(/(RN|age)/g))
						req.body[key] = parseInt(req.body[key])
					user[key] = req.body[key]
				}
			}
		})
		res.render('pages/ListPage', {users: users, message: 'User Edited'})
	}
})

user.delete('/all', async (req, res) => {
	const r = await Realm.open({schema: [UserSchema]})
	const users = r.objects('User')
	r.write(() => {
		r.delete(users)
	})

	res.send({status: true, response: {}})
})


export default user