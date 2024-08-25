import React, { useState } from 'react';
import axios from 'axios';
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

  return (
    <div>
      <h1>Recipe Search</h1>
      {/* <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter a food item"
      /> */}
      <Input border-radius={50}  onChange={e => setQuery(e.target.value)} placeholder='Enter a food item' size='small' alignSelf="center" width="50%"/>
      <select value={diet} onChange={e => setDiet(e.target.value)}>
        <option value="">Select Diet</option>
        <option value="low-carb">Low Carb</option>
        <option value="high-protein">High Protein</option>
        <option value="low-fat">Low Fat</option>
        <option value="vegan">Vegan</option>
      </select>
      <select value={health} onChange={e => setHealth(e.target.value)}>
        <option value="">Select Allergy</option>
        <option value="peanut-free">Peanut Free</option>
        <option value="gluten-free">Gluten Free</option>
        <option value="dairy-free">Dairy Free</option>
      </select>
      <button onClick={searchRecipes}>Search</button>

      {/* <div>
       {recipes.map((recipe, index) => (
          //<div key={index}>
            //<h2>{recipe.recipe.label}</h2>
            //<img src={recipe.recipe.image} alt={recipe.recipe.label} />
            //<a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
          //</div>
        //))}
      //</div> */}

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
    </div>
  );
};

export default RecipeFilter;
