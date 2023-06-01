import User from '../models/User.js'
import qr from 'qrcode'

// Create new user
export const createNewUser = async (req, res) => {
	const { name, email, phoneNumber, address } = req.body

	// Confirm data
	if (!name || !email || !phoneNumber || !address) {
		// Return 400 Bad Request if any required field is missing
		return res.status(400).json({ message: 'Please fill all required fields' })
	}

	try {
		// Generate QR Code
		const encodedEmail = encodeURIComponent(email.replace(/\./g, '%2E'))
		const qrCodeData = `http://localhost:5173/user/${encodedEmail}`
		const qrCode = await qr.toDataURL(qrCodeData) // Assuming qr is a valid module

		// Check if user already exists
		const duplicate = await User.findOne({ email }).lean().exec()
		if (duplicate) {
			// Return 400 Bad Request if user already exists
			return res.status(400).json({ message: 'User already exists' })
		}

		const userObject = { name, email, phoneNumber, address, qrCode }

		const user = await User.create(userObject)

		if (user) {
			// Return 201 Created if user is created successfully
			res.status(201).json({ message: 'User created successfully', qrCode })
		} else {
			// Return 400 Bad Request if something went wrong during user creation
			res.status(400).json({ message: 'Something went wrong' })
		}
	} catch (error) {
		console.error('Error creating user:', error)
		// Return 500 Internal Server Error if an error occurs
		res.status(500).json({ message: 'Internal server error' })
	}
}

// Get User Data
export const getUser = async (req, res) => {
	try {
		const { email } = req.params

		const user = await User.findOne({ email }).lean().exec()
		if (user) {
			// Return 200 OK if user is found
			res.status(200).json(user)
		} else {
			// Return 404 Not Found if user is not found
			res.status(404).json({ message: 'User not found' })
		}
	} catch (error) {
		console.error('Error retrieving user data:', error)
		// Return 500 Internal Server Error if an error occurs
		res.status(500).json({ message: 'Internal server error' })
	}
}
