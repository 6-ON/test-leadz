import { Card, CardBody, HStack, Heading, Image } from '@chakra-ui/react'
import ReviewModal from '../ui/review-modal'
import { Book } from '@/interfaces'
import { format } from 'date-fns'
type Props = {
	book: Book
}
const BookOverview: React.FC<Props> = ({ book }) => {
	const { author, title, description, publicationDate, genre } = book

	return (
		<div className="flex max-md:flex-col items-center max-md:text-center max-md:p-3 gap-5 pe-2">
			<Image
				src="https://ia804703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_82.zip&file=0012827208-L.jpg"
				w={'2xs'}
				alt="Book"
			/>
			<div className="space-y-5 w-full">
				<div className="flex max-md:flex-col gap-2">
					<Heading size="md" data-cy="book-title">
						{title}
					</Heading>
					<ReviewModal bookId={book['@id']} />
				</div>
				<Heading size="xs" color={'gray.500'}>
					Author Name :
					<span className="font-bold text-gray-800" data-cy="author">
						{author.fullName}
					</span>
				</Heading>
				<Heading size="xs" color={'gray.500'}>
					Publishing date :
					<span className="font-bold text-gray-800" data-cy="publicationDate">
						{format(publicationDate, 'yyyy-MM-dd')}
					</span>
				</Heading>
				<Heading size="xs" color={'gray.500'}>
					Genre :
					<span className="font-bold text-gray-800" data-cy="genre">
						{genre}
					</span>
				</Heading>
				<div className="space-y-2">
					<Heading size="xs" color={'gray.500'}>
						Description :
					</Heading>
					<Card bg={'green.100'}>
						<CardBody>
							<p className="text-gray-800" data-cy="description">
								{description}
							</p>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	)
}
export default BookOverview
