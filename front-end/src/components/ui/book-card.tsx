/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Card, CardBody, Heading, Image, Stack, Tag, TagLabel, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import bookImg from '@/assets/book.png'
// @ts-ignore
const BookCard = ({ book }) => {
	// const { title, author, genre, image } = book
	return (
		<Link to="/books/1" className="w-fit">
			<Card maxW="sm" cursor={'pointer'} variant="outline">
				<CardBody>
					<Image src={bookImg} alt="Book" />
					<Stack mt="6" spacing="3">
						<Heading size="xxs" color={'gray.500'}>
							John Doe
						</Heading>
						<Heading size="md">Living room Sofa</Heading>
						<Text>
							This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned
							spaces and for people who love a chic design with a sprinkle of vintage design.
						</Text>
					</Stack>
				</CardBody>
			</Card>
		</Link>
	)
}

export default BookCard
