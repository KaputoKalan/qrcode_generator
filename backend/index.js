import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'

dotenv.config()

const app = express()

// Middleware
app.use(express.json()) // Parse JSON bodies
app.use(cors(corsOptions)) // Enable CORS with specified options

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

// Routes
app.use('/user', userRoutes) // Mount user routes under '/user'
mongoose.set('strictQuery', false) // Disable strict query mode for Mongoose

async function runServer() {
	try {
		// Connect to MongoDB
		await mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		// Start listening for incoming requests
		await app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	} catch (error) {
		console.log(error.message)
	}
}

runServer()
