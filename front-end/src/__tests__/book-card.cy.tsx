import BookCardComp from '@/components/ui/book-card'
import { Book } from '@/interfaces'
import { generateBook } from '@/utils/testing/generateBook'
import withproviders from '@/utils/testing/with-providers'

describe('testing <BookCard />', () => {
	it('renders', () => {
		const BookCard = withproviders(BookCardComp)
		const book: Book = generateBook()
		cy.mount(<BookCard book={book} />)
		cy.get('[data-cy=fullName]').contains(book.author.fullName)
		cy.get('[data-cy=book-title]').contains(book.title)
	})
})
