/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import bookImg from '@/assets/book.png'
import { Book } from '@/interfaces'

type Props = {
	book: Book
}

const BookCard: React.FC<Props> = ({ book }) => {
	const { id, author, description, title } = book
	return (
		<Link to={`/books/${id}`}>
			<Card maxW="64" cursor={'pointer'} variant="outline">
				<CardBody>
					<Image src={bookImg} alt="Book" />
					<Stack mt="6" spacing="3">
						<Heading size="xxs" color={'gray.500'}>
							{author?.fullName}
						</Heading>
						<Heading size="md">{title}</Heading>
						<Text>{description}</Text>
					</Stack>
				</CardBody>
			</Card>
		</Link>
	)
}

export default BookCard
