import BookCard from '@/components/ui/book-card'
import NoBooksFound from '@/components/ui/no-books-found'
import Pagination from '@/components/ui/pagination'
import { fetchBooks } from '@/features/books/booksSlice'
import { useAppDispatch, useAppSelector } from '@/store'
import { Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const BooksPage = () => {
	const [searchParams, setSearchParams] = useSearchParams('ezfzf')
	const dispatch = useAppDispatch()
	const { books } = useAppSelector((state) => state.books)

	useEffect(() => {
		dispatch(fetchBooks(searchParams.get('q')))
	}, [dispatch, searchParams])

	const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!e.target.value) return setSearchParams({})
		setSearchParams({ q: e.target.value })
	}
	return (
		<div>
			<Heading p={4} textAlign={'center'} my={12}>
				Books
			</Heading>
			<div className="flex max-md:justify-center w-full">
				<InputGroup maxW={'sm'}>
					<InputLeftElement pointerEvents="none">
						<SearchIcon />
					</InputLeftElement>
					<Input
						type="tel"
						size="lg"
						placeholder="Search for Books"
						onChange={handleSearch}
						defaultValue={searchParams.get('q') || ''}
					/>
				</InputGroup>
			</div>
			<div className="gap-5 flex flex-wrap mt-12 w-full max-md:justify-center">
				{books.length === 0 ? (
					<NoBooksFound />
				) : (
					books.map((book) => <BookCard book={book} key={book['@id']} />)
				)}
			</div>
			<Pagination />
		</div>
	)
}

export default BooksPage
