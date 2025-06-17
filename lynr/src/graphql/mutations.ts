/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createClothingItem = /* GraphQL */ `mutation CreateClothingItem(
  $input: CreateClothingItemInput!
  $condition: ModelClothingItemConditionInput
) {
  createClothingItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateClothingItemMutationVariables,
  APITypes.CreateClothingItemMutation
>;
export const updateClothingItem = /* GraphQL */ `mutation UpdateClothingItem(
  $input: UpdateClothingItemInput!
  $condition: ModelClothingItemConditionInput
) {
  updateClothingItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateClothingItemMutationVariables,
  APITypes.UpdateClothingItemMutation
>;
export const deleteClothingItem = /* GraphQL */ `mutation DeleteClothingItem(
  $input: DeleteClothingItemInput!
  $condition: ModelClothingItemConditionInput
) {
  deleteClothingItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteClothingItemMutationVariables,
  APITypes.DeleteClothingItemMutation
>;
