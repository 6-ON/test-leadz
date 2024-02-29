import { Card, CardBody, Heading, Text } from '@chakra-ui/react'

function ReviewCard() {
	return (
		<Card variant="filled" textAlign="center">
			<CardBody>
				<Heading size="md">John Doe</Heading>
				<Text size="sm" mb={4}>
					johndoe@email.com
				</Text>
				<p className="text-sm">Good book</p>
			</CardBody>
		</Card>
	)
}
export default ReviewCard
