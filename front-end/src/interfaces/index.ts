export interface BooksResponse {
	'@context': string
	'@id': string
	'@type': string
	'hydra:totalItems': number
	'hydra:member': Book[]
	'hydra:search': HydraSearch
	'hydra:view': HydraView
}

export interface Book {
	'@id': string
	'@type': string
	id: number
	title: string
	description: string
	publicationDate: string
	genre: string
	author: Author
	reviews: string[] | Review[]
}

export interface HydraView {
	'@id': string
	'@type': string
	'hydra:first': string
	'hydra:last': string
	'hydra:next': string
}

export interface Author {
	'@id': string
	'@type': string
	id: number
	firstName: string
	lastName: string
	bibliography: string
	fullName: string
}

export interface HydraSearch {
	'@type': string
	'hydra:template': string
	'hydra:variableRepresentation': string
	'hydra:mapping': HydraMapping[]
}

export interface HydraMapping {
	'@type': string
	variable: string
	property: string
	required: boolean
}

export interface Author {
	'@id': string
	'@type': string
	id: number
	firstName: string
	lastName: string
	bibliography: string
	fullName: string
}

export interface Review {
	'@id': string
	'@type': string
	id: number
	fullName: string
	email: string
	comment: string
	creationDate: Date
}

export type ReviewForm = Pick<Review, 'fullName' | 'email' | 'comment'> & { book: string }
