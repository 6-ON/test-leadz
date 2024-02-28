import { Button, ChakraProvider } from '@chakra-ui/react'
import { theme } from './config/theme'

function App() {
	return (
		<ChakraProvider theme={theme}>
			<div>
				{/* <Button colorScheme="blue">Button</Button> */}
				<Button>Buttodezdzn</Button>
			</div>
		</ChakraProvider>
	)
}

export default App
