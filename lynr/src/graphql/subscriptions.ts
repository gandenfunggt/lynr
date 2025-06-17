/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateClothingItem = /* GraphQL */ `subscription OnCreateClothingItem(
  $filter: ModelSubscriptionClothingItemFilterInput
) {
  onCreateClothingItem(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateClothingItemSubscriptionVariables,
  APITypes.OnCreateClothingItemSubscription
>;
export const onUpdateClothingItem = /* GraphQL */ `subscription OnUpdateClothingItem(
  $filter: ModelSubscriptionClothingItemFilterInput
) {
  onUpdateClothingItem(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateClothingItemSubscriptionVariables,
  APITypes.OnUpdateClothingItemSubscription
>;
export const onDeleteClothingItem = /* GraphQL */ `subscription OnDeleteClothingItem(
  $filter: ModelSubscriptionClothingItemFilterInput
) {
  onDeleteClothingItem(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteClothingItemSubscriptionVariables,
  APITypes.OnDeleteClothingItemSubscription
>;
