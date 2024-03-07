/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/config/theme'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { BrowserRouter} from 'react-router-dom'
// import router from '@/router'

const withproviders = <P = any,>(WrappedComponent: React.FC<P>) => {
	return (props: P) => (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<WrappedComponent key={crypto.randomUUID()} {...props} />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	)
}

export default withproviders
