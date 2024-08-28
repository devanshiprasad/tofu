// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FavoriteRecipe } = initSchema(schema);

export {
  FavoriteRecipe
};