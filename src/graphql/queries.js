/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDogProfile = /* GraphQL */ `
  query GetDogProfile($owner: String!, $dog: String!) {
    getDogProfile(owner: $owner, dog: $dog) {
      dog
      owner
      breed
      color
      age
      weight
      photokey
    }
  }
`;
export const listDogProfiles = /* GraphQL */ `
  query ListDogProfiles(
    $filter: TableDogProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDogProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        dog
        owner
        breed
        color
        age
        weight
        photokey
      }
      nextToken
    }
  }
`;
export const getJobProfile = /* GraphQL */ `
  query GetJobProfile($id: String!) {
    getJobProfile(id: $id) {
      id
      owner
      walker
      dog
      geo_url
      start_time
      end_time
      status
      distance
    }
  }
`;
export const listJobProfiles = /* GraphQL */ `
  query ListJobProfiles(
    $filter: TableJobProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        walker
        dog
        geo_url
        start_time
        end_time
        status
        distance
      }
      nextToken
    }
  }
`;
export const queryJobProfilesByOwnerIndex = /* GraphQL */ `
  query QueryJobProfilesByOwnerIndex(
    $owner: String!
    $first: Int
    $after: String
  ) {
    queryJobProfilesByOwnerIndex(owner: $owner, first: $first, after: $after) {
      items {
        id
        owner
        walker
        dog
        geo_url
        start_time
        end_time
        status
        distance
      }
      nextToken
    }
  }
`;
export const queryJobProfilesByWalkerIndex = /* GraphQL */ `
  query QueryJobProfilesByWalkerIndex(
    $walker: String!
    $first: Int
    $after: String
  ) {
    queryJobProfilesByWalkerIndex(
      walker: $walker
      first: $first
      after: $after
    ) {
      items {
        id
        owner
        walker
        dog
        geo_url
        start_time
        end_time
        status
        distance
      }
      nextToken
    }
  }
`;
export const getRekognition = /* GraphQL */ `
  query GetRekognition($key: String!, $breed: String) {
    getRekognition(key: $key, breed: $breed) {
      key
      breed
      valid
      result
    }
  }
`;
