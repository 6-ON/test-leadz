import BookCard from '@/components/ui/book-card'
import NoBooksFound from '@/components/ui/no-books-found'
import { fetchBooks } from '@/features/books/booksSlice'
import { useAppDispatch, useAppSelector } from '@/store'
import { Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Paginator } from '../components/ui/paginator'

const BooksPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const dispatch = useAppDispatch()
	const { books, metaData } = useAppSelector((state) => state.books)

	useEffect(() => {
		dispatch(fetchBooks(searchParams))
	}, [dispatch, searchParams])

	const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!e.target.value) return setSearchParams({})
		setSearchParams({ title: e.target.value })
	}
	return (
		<div>
			<Heading p={4} textAlign={'center'} my={12}>
				Books
			</Heading>
			<div className="flex justify-center w-full">
				<InputGroup maxW={'sm'}>
					<InputLeftElement pointerEvents="none">
						<SearchIcon />
					</InputLeftElement>
					<Input
						type="tel"
						size="lg"
						placeholder="Search for Books"
						onChange={handleSearch}
						defaultValue={searchParams.get('title') || ''}
					/>
				</InputGroup>
			</div>
			{metaData && metaData['hydra:view'] && <Paginator metadata={metaData['hydra:view']} />}

			<div className="gap-5 flex flex-wrap my-12 w-full justify-center">
				{books.length === 0 ? (
					<NoBooksFound />
				) : (
					books.map((book) => <BookCard book={book} key={book['@id']} />)
				)}
			</div>
		</div>
	)
}

export default BooksPage
