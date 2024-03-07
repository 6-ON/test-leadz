import withproviders from '@/utils/testing/with-providers'
import BookOverviewComp from '@/components/partial/book-overview'
import { generateBook } from '@/utils/testing/generateBook'
import { Book } from '@/interfaces'
import { format } from 'date-fns'
describe('Book Overview', () => {
	it('renders book overview', () => {
		const BookOverview = withproviders(BookOverviewComp)
		const book: Book = generateBook()
		cy.viewport(1080, 720)
		cy.mount(<BookOverview book={book} />)
		cy.get('[data-cy=book-title]').contains(book.title)
		cy.get('[data-cy=author]').contains(book.author.fullName)
		cy.get('[data-cy=genre]').contains(book.genre)
		cy.get('[data-cy=publicationDate]').contains(format(book.publicationDate, 'yyyy-MM-dd'))
		cy.get('[data-cy=description]').contains(book.description)
	})
})
