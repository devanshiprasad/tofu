import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerFavoriteRecipe = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FavoriteRecipe, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label: string;
  readonly image: string;
  readonly dietLabels?: (string | null)[] | null;
  readonly healthLabels?: (string | null)[] | null;
  readonly url: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFavoriteRecipe = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FavoriteRecipe, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label: string;
  readonly image: string;
  readonly dietLabels?: (string | null)[] | null;
  readonly healthLabels?: (string | null)[] | null;
  readonly url: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FavoriteRecipe = LazyLoading extends LazyLoadingDisabled ? EagerFavoriteRecipe : LazyFavoriteRecipe

export declare const FavoriteRecipe: (new (init: ModelInit<FavoriteRecipe>) => FavoriteRecipe) & {
  copyOf(source: FavoriteRecipe, mutator: (draft: MutableModel<FavoriteRecipe>) => MutableModel<FavoriteRecipe> | void): FavoriteRecipe;
}