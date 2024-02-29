import { HStack, Heading, Image } from '@chakra-ui/react'
import bookImg from '@/assets/book.png'
import ReviewModal from '../ui/review-modal'

const BookOverview = () => {
	return (
		<div className="flex max-md:flex-col items-center max-md:text-center max-md:p-3">
			<Image src={bookImg} w="sm" alt="Book" />
			<div className="space-y-5">
				<HStack>
					<Heading size="md">Book Title</Heading>
					<ReviewModal />
				</HStack>
				<Heading size="xs" color={'gray.500'}>
					Author Name : <span className="font-bold text-gray-800">John Doe</span>
				</Heading>
				<Heading size="xs" color={'gray.500'}>
					Publishing date : <span className="font-bold text-gray-800">{new Date().toDateString()}</span>
				</Heading>
				<Heading size="xs" color={'gray.500'}>
					Genre : <span className="font-bold text-gray-800">Lol</span>
				</Heading>
				<div className="space-y-2">
					<Heading size="xs" color={'gray.500'}>
						Description :
					</Heading>
					<p className="max-w-md">
						This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces
						and for people who love a chic design with a sprinkle of vintage design.
					</p>
				</div>
			</div>
		</div>
	)
}
export default BookOverview
