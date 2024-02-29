import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './config/theme'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<RouterProvider router={router}></RouterProvider>
			</ChakraProvider>
		</Provider>
	)
}

export default App
