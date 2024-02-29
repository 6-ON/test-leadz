import { Book, BooksResponse, ReviewForm } from '@/interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface BooksState {
	books: Book[]
	metaData?: Omit<BooksResponse, 'hydra:member'> | undefined
	loading: boolean
	error: string | null
	selectedBook: {
		book: Book | null
		loading: boolean
		error: string | null
	}
}

// thunks
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (title: string | null) => {
	const searchParams = new URLSearchParams()
	if (title) searchParams.set('title', title)
	const response = await fetch('http://localhost:8000/api/books?' + searchParams.toString())
	const data: BooksResponse = await response.json()
	return data
})
export const fetchBook = createAsyncThunk('books/fetchBook', async (id: string) => {
	const response = await fetch(`http://localhost:8000/api/books/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch book')
    }
	const data: Book = await response.json()
	return data
})
export const reviewBook = createAsyncThunk('books/reviewBook', async (reviewForm: ReviewForm) => {
	const response = await fetch(`http://localhost:8000/api/reviews`, {
		method: 'POST',
		body: JSON.stringify(reviewForm),
		headers: {
			'Content-Type': 'application/ld+json',
		},
	})
	const data: Book = await response.json()
	return data
})
const initialState: BooksState = {
	books: [],
	loading: false,
	error: null,
	selectedBook: {
		book: null,
		loading: false,
		error: null,
	},
}

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		resetSelectedBook: (state) => {
			state.selectedBook.book = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBooks.pending, (state) => {
			state.loading = true
			state.metaData = undefined
			state.error = null
		})
		builder.addCase(fetchBooks.fulfilled, (state, action) => {
			const { 'hydra:member': metaData, ...rest } = action.payload
			state.books = metaData
			state.metaData = rest
			state.loading = false
			state.error = null
		})
		builder.addCase(fetchBook.pending, (state) => {
			state.selectedBook.loading = true
		})
		builder.addCase(fetchBook.fulfilled, (state, action) => {
			state.selectedBook.book = action.payload
			state.selectedBook.loading = false
		})
		builder.addCase(fetchBook.rejected, (state) => {
			state.selectedBook.loading = false
			state.selectedBook.error = 'error'
		})
	},
})

const booksReducer = booksSlice.reducer
export const { resetSelectedBook } = booksSlice.actions
export default booksReducer
