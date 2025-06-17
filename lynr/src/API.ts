/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateClothingItemInput = {
  id?: string | null,
  name: string,
  type: string,
  size?: string | null,
  imageKey: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelClothingItemConditionInput = {
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  size?: ModelStringInput | null,
  imageKey?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelClothingItemConditionInput | null > | null,
  or?: Array< ModelClothingItemConditionInput | null > | null,
  not?: ModelClothingItemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ClothingItem = {
  __typename: "ClothingItem",
  id: string,
  name: string,
  type: string,
  size?: string | null,
  imageKey: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateClothingItemInput = {
  id: string,
  name?: string | null,
  type?: string | null,
  size?: string | null,
  imageKey?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteClothingItemInput = {
  id: string,
};

export type ModelClothingItemFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  size?: ModelStringInput | null,
  imageKey?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelClothingItemFilterInput | null > | null,
  or?: Array< ModelClothingItemFilterInput | null > | null,
  not?: ModelClothingItemFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelClothingItemConnection = {
  __typename: "ModelClothingItemConnection",
  items:  Array<ClothingItem | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionClothingItemFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  size?: ModelSubscriptionStringInput | null,
  imageKey?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionClothingItemFilterInput | null > | null,
  or?: Array< ModelSubscriptionClothingItemFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateClothingItemMutationVariables = {
  input: CreateClothingItemInput,
  condition?: ModelClothingItemConditionInput | null,
};

export type CreateClothingItemMutation = {
  createClothingItem?:  {
    __typename: "ClothingItem",
    id: string,
    name: string,
    type: string,
    size?: string | null,
    imageKey: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateClothingItemMutationVariables = {
  input: UpdateClothingItemInput,
  condition?: ModelClothingItemConditionInput | null,
};

export type UpdateClothingItemMutation = {
  updateClothingItem?:  {
    __typename: "ClothingItem",
    id: string,
    name: string,
    type: string,
    size?: string | null,
    imageKey: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteClothingItemMutationVariables = {
  input: DeleteClothingItemInput,
  condition?: ModelClothingItemConditionInput | null,
};

export type DeleteClothingItemMutation = {
  deleteClothingItem?:  {
    __typename: "ClothingItem",
    id: string,
    name: string,
    type: string,
    size?: string | null,
    imageKey: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetClothingItemQueryVariables = {
  id: string,
};

export type GetClothingItemQuery = {
  getClothingItem?:  {
    __typename: "ClothingItem",
    id: string,
    name: string,
    type: string,
    size?: string | null,
    imageKey: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListClothingItemsQueryVariables = {
  filter?: ModelClothingItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClothingItemsQuery = {
  listClothingItems?:  {
    __typename: "ModelClothingItemConnection",
    items:  Array< {
      __typename: "ClothingItem",
      id: string,
      name: string,
      type: string,
      size?: string | null,
      imageKey: string,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateClothingItemSubscriptionVariables = {
  filter?: ModelSubscriptionClothingItemFilterInput | null,
};

export type OnCreateClothingItemSubscription = {
  onCreateClothingItem?:  {
    __typename: "ClothingItem",
    id: string,
    name: string,
    type: string,
    size?: string | null,
    imageKey: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateClothingItemSubscriptionVariables = {
  filter?: ModelSubscriptionClothingItemFilterInput | null,
};

export type OnUpdateClothingItemSubscription = {
  onUpdateClothingItem?:  {
    __typename: "ClothingItem",
    id: string,
    name: string,
    type: string,
    size?: string | null,
    imageKey: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteClothingItemSubscriptionVariables = {
  filter?: ModelSubscriptionClothingItemFilterInput | null,
};

export type OnDeleteClothingItemSubscription = {
  onDeleteClothingItem?:  {
    __typename: "ClothingItem",
    id: string,
    name: string,
    type: string,
    size?: string | null,
    imageKey: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};
