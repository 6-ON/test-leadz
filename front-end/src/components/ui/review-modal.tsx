/* eslint-disable no-constant-condition */
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
	FormHelperText,
	FormLabel,
	Input,
	Textarea,
} from '@chakra-ui/react'
import { StarsIcon } from 'lucide-react'

const ReviewModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

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
						<FormControl isInvalid={false}>
							<FormLabel>Full Name</FormLabel>
							<Input type="text" />
							{!false ? (
								<FormHelperText></FormHelperText>
							) : (
								<FormErrorMessage>Email is required.</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={false}>
							<FormLabel>Email</FormLabel>
							<Input type="email" />
							{!false ? (
								<FormHelperText></FormHelperText>
							) : (
								<FormErrorMessage>Email is required.</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={false}>
							<FormLabel>Comment</FormLabel>
							<Textarea resize="none" isInvalid={false} placeholder="Here is a sample placeholder" />
							{!false ? (
								<FormHelperText></FormHelperText>
							) : (
								<FormErrorMessage>Email is required.</FormErrorMessage>
							)}
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button variant="ghost" colorScheme='blue'>Review</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ReviewModal
