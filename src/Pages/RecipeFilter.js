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
    Pagination,
    useTheme,
} from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const bookmark = getImageUrl("Bookmark.png"); 

const RecipeFilter = () => {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('');
  const [health, setHealth] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  // Amplify UI
  const { tokens } = useTheme();

  const searchRecipes = () => {
    const APP_ID = 'ee2ad164';
    const APP_KEY = '4fb460d25e14579b1405a623a8ba2930';

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&diet=${diet}&health=${health}`;

    axios.get(url)
      .then(response => {
        setRecipes(response.data.hits);
        setCurrentPage(1); 
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  };

  const logo = getImageUrl('logo.png');

  const toggleFavorite = async (recipe) => {
    const params = {
      TableName: 'Recipes', 
      Item: {
        RecipeID: recipe.recipe.label,
        label: recipe.recipe.label,
        image: recipe.recipe.image,
        dietLabels: recipe.recipe.dietLabels,
        healthLabels: recipe.recipe.healthLabels,
        url: recipe.recipe.url
      }
    };
  
    try {

      if (!params.Item.label || !params.Item.image || !params.Item.url) {
        throw new Error('Missing required fields');
      }
  
      await dynamoDB.put(params).promise();
      alert(`${recipe.recipe.label} has been added to favorites!`);
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert(`Failed to add to favorites: ${error.message}`);
    }
  };

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const image1 = getImageUrl('dish1.png')
  const image2 = getImageUrl('dish2.png');
  const image3 = getImageUrl('dish3.png');
  const image4= getImageUrl('dish4.png');
  const image5 = getImageUrl('dish5.png');
  const image6 = getImageUrl('dish6.png');

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100vh"
    >
        <View width="14rem" height="11rem" paddingTop="50px" className='logo' alignSelf="flex-start">
          <Image src={logo} />
        </View>
        <Link to= '/FavouritePage' style={{textDecoration:'none'}}>
          <View as='button'
            className='viewrecipe'
            backgroundColor="#7D4646"
            borderRadius="50px"
            border="2px solid #000000"
            padding="12px 24px"
            justifyContent="center"
            cursor="pointer"
            width='fit-content'
            height='fit-content'
            alignSelf='flex-end'
          >
            show favourites
          </View>
        </Link>

      <View className='search'>
        <Flex direction="row" alignItems="center" justifyContent="flex-start">
          <View as='input'
            className='input'
            onChange={e => setQuery(e.target.value)}
            placeholder='enter a food item'
            style={{ marginRight: '8px'}}
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
        <Flex direction="row" alignItems="center" justifyContent="flex-start" className='flex'>
          <View as='select' className='diet' onChange={e => setDiet(e.target.value)} alignSelf="center">
            <option value="">Select Diet</option>
            <option value="low-carb">Low Carb</option>
            <option value="high-protein">High Protein</option>
            <option value="low-fat">Low Fat</option>
            <option value="vegan">Vegan</option>
            <option value='vegetarian'>Vegetarian</option>
            <option value='balanced'>Balanced</option>
          </View>

          <View as='select' className='diet' onChange={e => setHealth(e.target.value)} alignSelf="center">
            <option value="">Select Allergy</option>
            <option value="peanut-free">Peanut Free</option>
            <option value="gluten-free">Gluten Free</option>
            <option value="dairy-free">Dairy Free</option>

          </View>
        </Flex>
      </View>

      <View padding={tokens.space.large} width='fit-content' height='fit-content' className='cardi'>
        <Flex direction="row" wrap="wrap" gap='5rem' justifyContent="center">
          {currentRecipes.map((recipe, index) => (
            <Card
              key={index}
              width="250px" 
              height="300px" 
              backgroundColor={tokens.colors.background.primary}
              border={`2px solid ${tokens.colors.border.primary}`}
              justifyContent='space-between'
              borderRadius={tokens.radii.medium}
            >
              <Flex direction="column" alignItems="flex-start" gap={tokens.space.xs}>
                <Image
                  alt={recipe.recipe.label}
                  src={recipe.recipe.image}
                  width="100%"
                  height="120px" 
                  objectFit="cover"
                  borderRadius={tokens.radii.medium} 
                />
                <Flex>
                {diet && <Badge size="small" variation="info">{diet}</Badge>}
                {health && <Badge size="small" variation="success">{health}</Badge>}
                </Flex>
                <Heading level={6}>{recipe.recipe.label}</Heading>
                <Flex direction="row" alignItems="flex-start">
                  <View as='button'
                    className='details'
                    backgroundColor="#7D4646"
                    borderRadius="50px"
                    border="2px solid #000000"
                    padding="12px 24px"
                    justifyContent="center"
                    cursor="pointer"
                    width='11rem'
                    height='2rem'
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => window.open(recipe.recipe.url, '_blank')}
                  >
                    view recipe
                  </View>
                  <View
                    as='button'
                    onClick={() => toggleFavorite(recipe)}
                    style={{ marginLeft: '12px', cursor: 'pointer', backgroundColor: 'transparent', bottom: '3rem' }}
                    alignSelf='flex-end'
                    width="fit-content"
                    height='fit-content'
                  >
                    <Image src={bookmark} alt="Favorite Icon" width="60px" height="20px" />
                  </View>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </View>
      <View className='photos'>
      <Flex direction='row' height='50px' width='100px' >
      <Image src={image1}/>
      <Image src={image2}/>
      <Image src={image3}/>
      <Image src={image4}/>
      <Image src={image5}/>

      </Flex>
      </View>
     

      <View className='page'>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(recipes.length / itemsPerPage)}
          onChange={(page) => setCurrentPage(page)}
          siblingCount={1}
          boundaryCount={1}
        />
      </View>
    </Flex>
  );
};

export default RecipeFilter;
