import { Book } from '@/interfaces'
import { faker } from '@faker-js/faker'

export const generateBook = (id: number = 1): Book => ({
	'@id': `api/books/${id}`,
	'@type': 'Book',
	id: 1,
	title: faker.music.songName(),
	description: faker.lorem.paragraph(),
	author: {
		'@id': `/api/authors/${id}`,
		'@type': 'Author',
		id,
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		bibliography: faker.lorem.paragraph(),
		fullName: faker.person.fullName(),
	},
	genre: faker.music.genre(),
	publicationDate: faker.date.past().toISOString(),
	reviews: [],
})

export const generateBooks = (length: number): Book[] => Array.from({ length }, (_, i) => generateBook(i + 1))
