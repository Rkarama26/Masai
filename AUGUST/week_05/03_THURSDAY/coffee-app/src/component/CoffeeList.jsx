import { fetchCoffeeData, sortData } from '../redux/action';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Badge, Box, Button, Card, Grid, HStack, Image, GridItem, Field, Select, Menu, MenuItem } from "@chakra-ui/react"



const CoffeeList = () => {

    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state);


    useEffect(() => {
        dispatch(fetchCoffeeData());
    }, [dispatch]);

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === "name-asc") dispatch(sortData("name", "asc"));
        if (value === "name-desc") dispatch(sortData("name", "desc"));
        if (value === "price-asc") dispatch(sortData("price", "asc"));
        if (value === "price-desc") dispatch(sortData("price", "desc"));
    };
    return (
        <>
            <Grid
                h="200px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1}>

                    {/* Sorting Dropdown */}

                    

                    
                    <Field.Root>
                        <Field.Label>Sort by:</Field.Label>
                    </Field.Root>
                    <select onChange={handleSortChange}>
                        <option value="">Default</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                

                </GridItem>

                <GridItem colSpan={4}>
                    <Grid
                        templateColumns={{ base: "1fr", md: "1fr", lg: "repeat(3, 1fr)" }}
                        mt={20}
                        color="gray.500"
                        gap={6}
                        width="90%"
                        m="auto"
                        position="relative"
                        top="10"
                    >
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}

                        {data.map((coffee) => (
                            <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
                                <Image
                                    objectFit="cover"
                                    maxW="200px"
                                    src={coffee.image}
                                    alt="Caffe Latte"
                                />
                                <Box>
                                    <Card.Body>
                                        <Card.Title mb="2">{coffee.title}</Card.Title>
                                        <Card.Description>
                                            {coffee.description}
                                        </Card.Description>
                                        <HStack mt="4">
                                            {coffee.ingredients.map((ingredient, index) => (
                                                <Badge key={index}>{ingredient}</Badge>
                                            ))}
                                        </HStack>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button>$ {coffee.price}</Button>
                                    </Card.Footer>
                                </Box>
                            </Card.Root>

                        ))}
                    </Grid>
                </GridItem>
            </Grid>



        </>
    );
}

export default CoffeeList;




