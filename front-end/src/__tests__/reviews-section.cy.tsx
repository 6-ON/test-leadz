import withproviders from '@/utils/testing/with-providers'
import ReviewsSectionComp from '@/components/partial/reviews-section'
import { generateReviews } from '@/utils/testing/generateReviews'
describe('<ReviewsSection>', () => {
	it('renders', () => {
		const ReviewsSection = withproviders(ReviewsSectionComp)
		cy.viewport(1080, 720)
		const reviews = generateReviews(6)
		cy.mount(<ReviewsSection reviews={reviews} />)
		cy.get('[data-cy=review-card]').should('have.length', 6)
	})
})
