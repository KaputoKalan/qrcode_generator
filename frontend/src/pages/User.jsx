// This component fetches the user data from the backend and displays it on the screen.

// useParams is a React hook that returns an object of key/value pairs of URL parameters.

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const User = () => {
	// The value of email is retrieved from the URL parameter.
	const { email } = useParams()
	// userData is set to null by default.
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		// This function is declared inside useEffect to prevent it from being called on every render.
		const fetchData = async () => {
			try {
				// The email is decoded before it is used in the API call.
				const decodedEmail = decodeURIComponent(email)
				// The API call is made to the backend.
				const response = await axios.get(
					`http://localhost:5000/user/${decodedEmail}`,
				)
				// The data returned from the backend is destructured from the response.
				const { data } = response
				// The userData state is set to the data returned from the backend.
				setUserData(data)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		// fetchData is called inside useEffect.
		fetchData()
		// The email is included as a dependency of useEffect.
	}, [email])

	return (
		<div>
			{userData && (
				<>
					<div className="flex flex-col items-center justify-center ">
						<div className="max-w-sm rounded-xl overflow-hidden shadow-lg h-full p-10 gap-5">
							<h1 className="text-xl font-medium pb-5 ">
								Below is the User data of {userData.name}
							</h1>
							<div className="flex flex-col">
								<p className="text-lg py-2 ">Name: {userData.name}</p>
								<p className="text-lg py-2 ">Email: {userData.email}</p>
								<p className="text-lg py-2 ">
									Phone Number: {userData.phoneNumber}
								</p>
								<p className="text-lg py-2 ">Address: {userData.address}</p>

								<img src={userData.qrCode} alt="QR Code" />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default User
