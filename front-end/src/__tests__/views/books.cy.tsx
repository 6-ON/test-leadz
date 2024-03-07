import withproviders from '@/utils/testing/with-providers'
import BooksPageComp from '@/views/books'

describe('Book Page Test', () => {
	it('renders book page', () => {
		const BooksPage = withproviders(BooksPageComp)
        cy.viewport(1080, 720)
        cy.mount(<BooksPage />)
        cy.get('[data-cy=book-card]').should('have.length', 30)
	})
})
