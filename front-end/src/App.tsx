import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './config/theme'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
	return (
		<ChakraProvider theme={theme}>
			<RouterProvider router={router}></RouterProvider>
		</ChakraProvider>
	)
}

export default App
