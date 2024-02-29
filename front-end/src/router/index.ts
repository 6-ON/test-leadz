import { RouteObject, createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/main-layout'
import React from 'react'

const routes: RouteObject[] = [
	{
		path: '/',
		Component: MainLayout,
		children: [
			{
				path: '/books',
				Component: React.lazy(() => import('@/views/books')),
			},
			{
				path: '/books/:id',
				Component: React.lazy(() => import('@/views/single-book')),
			},
			{
				path: '/authors',
				Component: React.lazy(() => import('@/views/authors')),
			},
		],
	},
]

const router = createBrowserRouter(routes)
export default router
