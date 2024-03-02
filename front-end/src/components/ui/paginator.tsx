import { HydraView } from '@/interfaces'

import { parsePage } from '@/utils/dataAcess'
import { Button } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
type Props = {
	metadata: HydraView
}

export const Paginator: React.FC<Props> = ({ metadata }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { firstPage, lastPage, nextPage, previousPage, currentPage } = useMemo(() => {
		const {
			'@id': currentPage,
			'hydra:previous': previousPage,
			'hydra:next': nextPage,
			'hydra:last': lastPage,
			'hydra:first': firstPage,
		} = metadata
		return {
			previousPage: previousPage ? parsePage(previousPage) : undefined,
			lastPage: lastPage ? parsePage(lastPage) : undefined,
			nextPage: nextPage ? parsePage(nextPage) : undefined,
			firstPage: firstPage ? parsePage(firstPage) : undefined,
			currentPage: parsePage(currentPage),
		}
	}, [metadata])

	return (
		<div className="flex space-x-4 justify-center mt-4">
			{previousPage && (
				<Button
					variant="outline"
					children={<ChevronLeft />}
					colorScheme="blue"
					onClick={() => {
						setSearchParams((params) => {
							params.set('page', previousPage.toString())
							return params
						})
					}}
				/>
			)}
			{lastPage &&
				firstPage &&
				Array.from({ length: lastPage - firstPage + 1 }, (_, i) => i + firstPage).map((page) => (
					<Button
						key={page}
						colorScheme="blue"
						variant={page === currentPage ? 'solid' : 'outline'}
						onClick={() =>
							setSearchParams((params) => {
								params.set('page', page.toString())
								return params
							})
						}
						children={page}
					/>
				))}
			{nextPage && (
				<Button
					variant="outline"
					children={<ChevronRight />}
					colorScheme="blue"
					onClick={() => {
						setSearchParams((params) => {
							params.set('page', nextPage.toString())
							return params
						})
					}}
				/>
			)}
		</div>
	)
}
