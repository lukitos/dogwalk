/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDogProfile = /* GraphQL */ `
  subscription OnCreateDogProfile(
    $dog: String
    $owner: String
    $breed: String
    $color: String
    $age: String
  ) {
    onCreateDogProfile(
      dog: $dog
      owner: $owner
      breed: $breed
      color: $color
      age: $age
    ) {
      dog
      owner
      breed
      color
      age
      weight
      photokey
      isValidBreed
    }
  }
`;
export const onUpdateDogProfile = /* GraphQL */ `
  subscription OnUpdateDogProfile(
    $dog: String
    $owner: String
    $breed: String
    $color: String
    $age: String
  ) {
    onUpdateDogProfile(
      dog: $dog
      owner: $owner
      breed: $breed
      color: $color
      age: $age
    ) {
      dog
      owner
      breed
      color
      age
      weight
      photokey
      isValidBreed
    }
  }
`;
export const onDeleteDogProfile = /* GraphQL */ `
  subscription OnDeleteDogProfile(
    $dog: String
    $owner: String
    $breed: String
    $color: String
    $age: String
  ) {
    onDeleteDogProfile(
      dog: $dog
      owner: $owner
      breed: $breed
      color: $color
      age: $age
    ) {
      dog
      owner
      breed
      color
      age
      weight
      photokey
      isValidBreed
    }
  }
`;
export const onCreateJobProfile = /* GraphQL */ `
  subscription OnCreateJobProfile {
    onCreateJobProfile {
      id
      owner
      owner_email
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
export const onUpdateJobProfile = /* GraphQL */ `
  subscription OnUpdateJobProfile(
    $id: String
    $owner: String
    $walker: String
    $dog: String
    $geo_url: String
  ) {
    onUpdateJobProfile(
      id: $id
      owner: $owner
      walker: $walker
      dog: $dog
      geo_url: $geo_url
    ) {
      id
      owner
      owner_email
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
export const onDeleteJobProfile = /* GraphQL */ `
  subscription OnDeleteJobProfile(
    $id: String
    $owner: String
    $walker: String
    $dog: String
    $geo_url: String
  ) {
    onDeleteJobProfile(
      id: $id
      owner: $owner
      walker: $walker
      dog: $dog
      geo_url: $geo_url
    ) {
      id
      owner
      owner_email
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
