import {Container, VStack, Text, Link, SimpleGrid} from "@chakra-ui/react";
import { useEffect } from "react";
import { useMenuStore } from "../store/menu";
// import {MenuCard} from "../components/MenuCard";


const HomePage = () => {

  const {fetchMenu, menu} = useMenuStore();
  useEffect(() => {
    fetchMenu();
  }, [ fetchMenu ]);
  console.log("menu", menu);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>

        <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            Latest Dishes 🚀
          </Text>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
            >
                {/* {Array.isArray(menu) && menu.map((menuItem) => (
                <MenuCard key={menuItem._id} menu={menuItem} />
              ))} */}
				</SimpleGrid>


          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No Dishes found 😢{" "}
						<Link href={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Dish
							</Text>
						</Link>
					</Text>

      </VStack>
    </Container>
  )
};

export default HomePage;