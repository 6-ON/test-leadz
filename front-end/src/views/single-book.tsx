import { Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ReviewsSection from '@/components/partial/reviews-section'
import BookOverview from '@/components/partial/book-overview'
import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'
import { fetchBook, resetSelectedBook } from '@/features/books/booksSlice'
import { Review } from '@/interfaces'

const SingleBookPage = () => {
	const { id } = useParams<{ id: string }>()

	const dispacth = useAppDispatch()
	const {
		selectedBook: { book, error, loading },
	} = useAppSelector((state) => state.books)

	useEffect(() => {
		if (id) dispacth(fetchBook(id))
		return () => {
			dispacth(resetSelectedBook())
		}
	}, [id, dispacth])

	if (!book) {
		if (loading) return <div>loading ...</div>
		if (error) return <div>Book Not Found</div>
		return null
	}
	return (
		<div>
			<Heading textAlign="center" m="12">
				Book Overview
			</Heading>
			<BookOverview book={book} />
			<ReviewsSection reviews={book.reviews as Review[]} />
		</div>
	)
}

export default SingleBookPage
