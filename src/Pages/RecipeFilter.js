import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { getImageUrl } from '../components/Images';
import {
    Card,
    Image,
    View,
    Heading,
    Flex,
    Badge,
    Text,
    Button,
    useTheme,
    Input,
    SelectField,
  } from '@aws-amplify/ui-react';

const RecipeFilter = () => {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('');
  const [health, setHealth] = useState('');
  const [recipes, setRecipes] = useState([]);

  //amplify ui 
  const {tokens}= useTheme();

  const searchRecipes = () => {
    const APP_ID = 'ee2ad164';
    const APP_KEY = '4fb460d25e14579b1405a623a8ba2930';

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&diet=${diet}&health=${health}`;

    axios.get(url)
      .then(response => {
        setRecipes(response.data.hits);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  };

  const logo= getImageUrl('logo.png') 

  return (
    //flex for the entire page
    <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    height="100vh">
  
    <View width="12rem" height="9rem" paddingTop="70px" className='logo' alignSelf="flex-start">
      <Image src={logo}/>
    </View>


<View className='search'> 
  <Flex direction="row" alignItems="center" justifyContent="flex-start">
    <View as='input' 
          className='input' 
          onChange={e => setQuery(e.target.value)} 
          placeholder='enter a food item' 
          style={{ marginRight: '8px' }} 
    />
    <View as='button' 
          className='go'  
          backgroundColor="#7D4646" 
          borderRadius="50px" 
          border="2px solid #000000" 
          padding="12px 24px" 
          justifyContent="center" 
          cursor="pointer"
          style={{ display: 'flex', alignItems: 'center' }} 
          onClick={searchRecipes}
    >
      go!
    </View>
  </Flex>
</View>
   
   
    <View className='select'>
    <Flex direction="row" alignItems="center" justifyContent="flex-start"  className='flex'>
    <View as='select' className='diet' onChange={e => setDiet(e.target.value)} alignSelf="center"  >
      <option value="">Select Diet</option>
        <option value="low-carb">Low Carb</option>
        <option value="high-protein">High Protein</option>
        <option value="low-fat">Low Fat</option>
        <option value="vegan">Vegan</option>
      </View>

      <View as='select' className='diet' onChange={e => setHealth(e.target.value)} alignSelf="center">
      <option value="">Select Allergy</option>
        <option value="peanut-free">Peanut Free</option>
        <option value="gluten-free">Gluten Free</option>
        <option value="dairy-free">Dairy Free</option>
      </View>
    </Flex>
       </View>
    

      <View padding={tokens.space.medium}>
      <Flex direction="row" wrap="wrap" gap={tokens.space.medium}>
        {recipes.map((recipe, index) => (
          <Card key={index} width="300px" height="350px" backgroundColor={tokens.colors.background.primary}  border={`1px solid ${tokens.colors.border.primary}`}>
            <Flex direction="column" alignItems="flex-start" gap={tokens.space.xs}>
              <Image
                alt={recipe.recipe.label}
                src={recipe.recipe.image}
                width="100%"
                height="150px"
                objectFit="cover"
                borderRadius={tokens.radii.large}
              />
              <Flex>
                <Badge size="small" variation="info">Vegan</Badge>
                <Badge size="small" variation="success">Gluten-Free</Badge>
              </Flex>
              <Heading level={5}>{recipe.recipe.label}</Heading>
              <Button
                as="a"
                href={recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                variation="primary"
                marginTop="auto"
              >
                View Recipe
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </View>
  </Flex>
  );
};

export default RecipeFilter;
