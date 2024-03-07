/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Book } from '@/interfaces'

type Props = {
	book: Book
}

const BookCard: React.FC<Props> = ({ book }) => {
	const { id, author, title } = book
	return (
		<Link to={`/books/${id}`}>
			<Card w="40" h={'full'} overflow={'hidden'} textAlign={'center'} cursor={'pointer'} variant="outline" data-cy="book-card">
				<CardBody pt={0} px={0}>
					<Image
						mx="auto"
						roundedBottom={5}
						src="https://ia804703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_82.zip&file=0012827208-L.jpg"
						alt="Book"
					/>
					<Stack mt="6" spacing="3" px={2}>
						<Heading size="xs" color={'gray.500'} data-cy="fullName">
							{author?.fullName}
						</Heading>
						<Heading size="sm" data-cy="book-title">
							{title}
						</Heading>
					</Stack>
				</CardBody>
			</Card>
		</Link>
	)
}

export default BookCard
