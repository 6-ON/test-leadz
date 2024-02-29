import { Card, CardBody, HStack, Heading, Image } from '@chakra-ui/react'
import bookImg from '@/assets/book.png'
import ReviewModal from '../ui/review-modal'
import { Book } from '@/interfaces'
type Props = {
	book: Book
}
const BookOverview: React.FC<Props> = ({ book }) => {
	const { author, title, description, publicationDate, genre } = book

	return (
		<div className="flex max-md:flex-col items-center max-md:text-center max-md:p-3">
			<Image src={bookImg} w="sm" alt="Book" />
			<div className="space-y-5 w-full">
				<HStack>
					<Heading size="md">{title}</Heading>
					<ReviewModal bookId={book['@id']} />
				</HStack>
				<Heading size="xs" color={'gray.500'}>
					Author Name : <span className="font-bold text-gray-800">{author.fullName}</span>
				</Heading>
				<Heading size="xs" color={'gray.500'}>
					Publishing date : <span className="font-bold text-gray-800">{publicationDate}</span>
				</Heading>
				<Heading size="xs" color={'gray.500'}>
					Genre : <span className="font-bold text-gray-800">{genre}</span>
				</Heading>
				<div className="space-y-2">
					<Heading size="xs" color={'gray.500'}>
						Description :
					</Heading>
					<Card bg={"green.100"}>
						<CardBody >
							<p className="text-gray-800">{description}</p>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	)
}
export default BookOverview
