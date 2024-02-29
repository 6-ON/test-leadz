/* eslint-disable no-constant-condition */
import { fetchBook, reviewBook } from '@/features/books/booksSlice'
import { ReviewForm } from '@/interfaces'
import { useAppDispatch } from '@/store'
import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from '@chakra-ui/react'
import { StarsIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
	bookId: string
}

const ReviewModal: React.FC<Props> = ({ bookId }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ReviewForm>({ defaultValues: { book: bookId } })
	const dispatch = useAppDispatch()
	const onSubmit: SubmitHandler<ReviewForm> = async (data) => {
		await dispatch(reviewBook(data))
		await dispatch(fetchBook((bookId.split('/').pop()!)))
		reset()
		onClose()
	}
	return (
		<>
			<Button leftIcon={<StarsIcon />} onClick={onOpen} colorScheme="blue" variant="link">
				Review
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Make a Review</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl isInvalid={!!errors['fullName']}>
							<FormLabel>Full Name</FormLabel>
							<Input type="text" {...register('fullName', { required: true })} />
							{errors['fullName'] && <FormErrorMessage>Email is required.</FormErrorMessage>}
						</FormControl>
						<FormControl isInvalid={!!errors['email']}>
							<FormLabel>Email</FormLabel>
							<Input type="email" {...register('email', { required: true })} />
							{errors['email'] && <FormErrorMessage>Email is required.</FormErrorMessage>}
						</FormControl>
						<FormControl isInvalid={!!errors['comment']}>
							<FormLabel>Comment</FormLabel>
							<Textarea
								resize="none"
								placeholder="Here is a sample placeholder"
								{...register('comment', { required: true })}
							/>
							{errors['comment'] && <FormErrorMessage>Email is required.</FormErrorMessage>}
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button
							variant="ghost"
							colorScheme="blue"
							onClick={handleSubmit(onSubmit)}
							isLoading={isSubmitting}
						>
							Review
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ReviewModal
