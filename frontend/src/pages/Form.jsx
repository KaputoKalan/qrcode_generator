import { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

function Form() {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm()

	const [qrCode, setQrCode] = useState('')

	const onSubmit = async (data) => {
		try {
			const response = await axios.post('http://localhost:5000/user', data)
			const { message, qrCode } = response.data
			console.log(message) // Display the server response message
			console.log(qrCode) // Use the generated QR code
			setQrCode(qrCode)
		} catch (error) {
			console.error('Error creating user:', error)
		}
	}

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset()
		}
	}, [formState, reset])

	const formStyles =
		'  form-input block w-full rounded-md border-0  py-2 px-1 text-gray-900 shadow-sm ring-1 rign-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
	return (
		<>
			<section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md h-screen">
				<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="mb-4">
							<label
								className=" block text-sm font-medium leading-6 text-gray-900 "
								for="name">
								Name
							</label>
							<input
								className={formStyles}
								id="name"
								type="text"
								placeholder="Name"
								name="name"
								{...register('name', { required: true })}
							/>
						</div>
						<div className="mb-4">
							<label
								className=" block text-sm font-medium leading-6 text-gray-900 "
								for="email">
								Email
							</label>
							<input
								className={formStyles}
								id="email"
								type="email"
								name="email"
								placeholder="user@example.com"
								{...register('email', { required: true })}
							/>
						</div>
						<div className="mb-4">
							<label
								className=" block text-sm font-medium leading-6 text-gray-900 "
								for="phoneNumber">
								Phone Number
							</label>
							<input
								className={formStyles}
								id="phoneNumber"
								type="text"
								placeholder="09777777777"
								name="phoneNumber"
								{...register('phoneNumber', { required: true })}
							/>
						</div>
						<div className="mb-4">
							<label
								className=" block text-sm font-medium leading-6 text-gray-900 "
								for="address">
								Your Address
							</label>
							<input
								className={formStyles}
								id="address"
								type="text"
								placeholder="address"
								name="address"
								{...register('address', { required: true })}
							/>
						</div>

						<div className="flex items-center justify-between">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit">
								Submit
							</button>
						</div>
					</form>
					<div className="flex flex-col items-center justify-center">
						{qrCode && <img src={qrCode} alt="QR Code" />}
						{qrCode && (
							<p>
								Your QR Code is Ready, please scan it using a QR code scanner
								such as the one at the following link{' '}
								<a
									className="text-blue-500 hover:text-blue-700 underline"
									href="https://chrome.google.com/webstore/detail/qr-code-reader-for-google/gmloihcgbhbonllenincdakeijmikcne/related"
									target="_blank">
									QR code scanner
								</a>
							</p>
						)}
					</div>
				</div>
			</section>
		</>
	)
}

export default Form
