import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	qrCode: {
		type: String,
	},
})

const User = mongoose.model('User', UserSchema)

export default User
