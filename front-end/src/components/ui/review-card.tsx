import { Review } from '@/interfaces'
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
type Props = {
	review: Review
}
const ReviewCard: React.FC<Props> = function ({ review }) {
	const { comment, fullName, email } = review
	return (
		<Card variant="filled" textAlign="center" w="xs" data-cy="review-card">
			<CardBody>
				<Heading size="md" mb={3} data-cy="fullName">
					{fullName}
				</Heading>
				<div className="mb-2">
					<Text size="sm" data-cy="email">
						{email}
					</Text>
					<Text fontSize={'small'} data-cy="creationDate">
						{formatDistanceToNow(new Date(review.creationDate), { addSuffix: true })}
					</Text>
				</div>
				<p className="text-sm" data-cy="comment">
					{comment}
				</p>
			</CardBody>
		</Card>
	)
}
export default ReviewCard
