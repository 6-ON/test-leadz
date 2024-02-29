import { Box } from '@chakra-ui/react'
import Navbar from '@/components/partial/navbar'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import PLHBooksPage from '@/placeholders/views/books'

const MainLayout = () => {
	return (
		<Box>
			<Navbar />
			<div className="container m-auto">
				<Suspense fallback={<PLHBooksPage />}>
					<Outlet />
				</Suspense>
			</div>
		</Box>
	)
}

export default MainLayout
