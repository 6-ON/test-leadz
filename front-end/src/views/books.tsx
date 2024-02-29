import BookCard from '@/components/ui/book-card'
import { Heading, Input, InputGroup, InputLeftElement, SimpleGrid } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const BooksPage = () => {
	const [searchParams, setSearchParams] = useSearchParams('ezfzf')
	useEffect(() => {
		console.log(searchParams.get('q'))
	}, [searchParams])

	const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!e.target.value) return setSearchParams({})
		setSearchParams({ q: e.target.value })
	}
	return (
		<div>
			<Heading p={4} textAlign={'center'} my={12}>
				Books
			</Heading>
			<InputGroup>
				<InputLeftElement pointerEvents="none">
					<SearchIcon />
				</InputLeftElement>
				<Input
					type="tel"
					size="lg"
					placeholder="Search for Books"
					maxW={'sm'}
					onChange={handleSearch}
					defaultValue={searchParams.get('q') || ''}
				/>
			</InputGroup>
			<SimpleGrid minChildWidth={72} gap={5} my={12} justifyItems="center">
				{Array.from({ length: 10 }).map((_, i) => (
					<BookCard book={{}} key={i} />
				))}
			</SimpleGrid>
		</div>
	)
}

export default BooksPage
