import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useMenuStore } from "../store/menu";


const CreatePage = () => {

    const [newMenu, setNewMenu] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        });

        const toast = useToast();
        const {createMenu} = useMenuStore()
        const handleAddMenu = async () => {
            const {success, message} = await createMenu(newMenu)
                if(!success) {
                    toast({
                        title: 'Error',
                        description: message,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
                else{
                    toast({
                        title: 'Success',
                        description: message,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        });
                }
                setNewMenu({
                    name: "",
                    price: "",
                    description: "",
                    image: "",
                    });
        };

    return (
    <Container maxW={"container.sm"}>
        <VStack
            spacing={8}
        >
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Menu
            </Heading>

            <Box 
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                p={6} rounded={"lg"} shadow={"md"}    
            >
                <VStack spacing={4}>
                    <Input 
                        placeholder="Dish Name"
                        name='name'
                        value={newMenu.name}
                        onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                    />

                    <Input
                        placeholder='Price'
                        name='price'
                        type='number'
                        value={newMenu.price}
                        onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
                    />
                    <Input
                        placeholder='Description'
                        name='description'
                        value={newMenu.description}
                        onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
                    />
                    <Input
                        placeholder='Image URL'
                        name='image'
                        value={newMenu.image}
                        onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })}
                    />
                    <Button colorScheme="green" onClick={handleAddMenu} w={"full"}>
                        Add New Dish to Menu
                    </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
    );
};

export default CreatePage;