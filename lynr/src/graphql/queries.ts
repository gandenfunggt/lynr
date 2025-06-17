/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getClothingItem = /* GraphQL */ `query GetClothingItem($id: ID!) {
  getClothingItem(id: $id) {
    id
    name
    type
    size
    imageKey
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetClothingItemQueryVariables,
  APITypes.GetClothingItemQuery
>;
export const listClothingItems = /* GraphQL */ `query ListClothingItems(
  $filter: ModelClothingItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listClothingItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      type
      size
      imageKey
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListClothingItemsQueryVariables,
  APITypes.ListClothingItemsQuery
>;
