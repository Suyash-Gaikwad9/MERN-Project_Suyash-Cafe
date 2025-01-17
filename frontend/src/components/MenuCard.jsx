import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMenuStore } from "../store/menu";

const MenuCard = ({ menu }) => {
	const [updatedMenu, setUpdatedMenu] = useState({ ...menu });

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteMenu, updateMenu } = useMenuStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteMenu = async (id) => {
		const { success, message } = await deleteMenu(id);
		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleUpdateMenu = async (id, updatedMenu) => {
        const { success, message } = await updateMenu(id, updatedMenu);
        onClose();
        if(!success) {
            return toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        else {
            return toast({
                title: "Success",
                description: "Menu Updated Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }   
    };
    

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={menu.image} alt={menu.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{menu.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ₹{menu.price}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteMenu(menu._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Menu</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Dish Name'
								name='name'
								value={updatedMenu.name}
								onChange={(e) =>
									setUpdatedMenu({ ...updatedMenu, name: e.target.value })
								}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedMenu.price}
								onChange={(e) =>
									setUpdatedMenu({ ...updatedMenu, price: e.target.value })
								}
							/>
							<Input
								placeholder='Description'
								name='description'
								value={updatedMenu.description}
								onChange={(e) =>
									setUpdatedMenu({ ...updatedMenu, description: e.target.value })
								}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedMenu.image}
								onChange={(e) =>
									setUpdatedMenu({ ...updatedMenu, image: e.target.value })
								}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateMenu(menu._id, updatedMenu)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default MenuCard;
