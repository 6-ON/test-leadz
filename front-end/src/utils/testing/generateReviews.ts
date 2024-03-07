import { Review } from '@/interfaces'
import { faker } from '@faker-js/faker'

export const generateReview = (id: number = 1): Review => ({
	'@id': `api/reviews/${id}`,
	'@type': 'Review',
	id: id,
	fullName: faker.person.fullName(),
	comment: faker.lorem.paragraph(),
	creationDate: faker.date.past().toISOString(),
	email: faker.internet.email(),
})

export const generateReviews = (length: number): Review[] => Array.from({ length }, (_, i) => generateReview(i + 1))
