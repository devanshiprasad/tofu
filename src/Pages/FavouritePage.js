import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { Card, Image, Flex, Heading, Badge, Button } from '@aws-amplify/ui-react';

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const params = {
          TableName: 'Recipes', 
        };

        const data = await dynamoDB.scan(params).promise();
        setFavorites(data.Items);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

 
  const removeFromFavorites = async (recipeId) => {
    console.log("Attempting to remove recipe with ID:", recipeId); 
  
    try {
      const params = {
        TableName: 'Recipes', 
        Key: { 
          RecipeID: recipeId 
        },
      };
  
      await dynamoDB.delete(params).promise();


      setFavorites((prevFavorites) => prevFavorites.filter((recipe) => recipe.RecipeID !== recipeId));
  
      
      alert("Recipe removed from favorites successfully!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Failed to remove recipe from favorites. Please check the console for more details.");
    }
  };

  return (
    <Flex direction="column" alignItems="center" padding="20px">
      <Heading level={2}>Favorite Recipes</Heading>
      <Flex direction="row" wrap="wrap" gap="20px" justifyContent="center">
        {favorites.map((recipe) => (
          <Card
            key={recipe.id}
            width="250px"
            height="300px"
            backgroundColor="#f9f9f9"
            border="2px solid #e0e0e0"
            justifyContent="space-between"
            borderRadius="10px"
          >
            <Flex direction="column" alignItems="flex-start" gap="10px">
              <Image
                alt={recipe.label}
                src={recipe.image}
                width="100%"
                height="120px"
                objectFit="cover"
                borderRadius="10px"
              />
              <Flex>
                <Badge size="small" variation="info">Vegan</Badge>
                <Badge size="small" variation="success">Gluten-Free</Badge>
              </Flex>
              <Heading level={6}>{recipe.label}</Heading>
              <Button
                onClick={() => removeFromFavorites(recipe.RecipeID)}
                size="small"
                variation="link"
              >
                Remove
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default FavoritesPage;
