import { Review } from '@/interfaces'
import ReviewCardComp from '../components/ui/review-card'
import withproviders from '@/utils/testing/with-providers'
import { formatDistanceToNow } from 'date-fns'
import { generateReview } from '@/utils/testing/generateReviews'

describe('<ReviewCard />', () => {
	it('renders', () => {
		const ReviewCard = withproviders(ReviewCardComp)
		const review: Review = generateReview()
		cy.mount(<ReviewCard review={review} />)
		cy.get('[data-cy=fullName]').contains(review.fullName)
		cy.get('[data-cy=email]').contains(review.email)
		cy.get('[data-cy=comment]').contains(review.comment)
		cy.get('[data-cy=creationDate]').contains(formatDistanceToNow(review.creationDate))
	})
})
