// This code creates a React component called `App`. It renders a `BrowserRouter` component, which contains a `Routes` component. The `Routes` component contains two `Route` components: one for the `/` path, and one for the `/user/:email` path.

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './pages/Form'
import User from './pages/User'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Form />} />
				<Route path="user/:email" element={<User />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
