/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDogProfile = /* GraphQL */ `
  mutation CreateDogProfile($input: CreateDogProfileInput!) {
    createDogProfile(input: $input) {
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
export const updateDogProfile = /* GraphQL */ `
  mutation UpdateDogProfile($input: UpdateDogProfileInput!) {
    updateDogProfile(input: $input) {
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
export const deleteDogProfile = /* GraphQL */ `
  mutation DeleteDogProfile($input: DeleteDogProfileInput!) {
    deleteDogProfile(input: $input) {
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
export const createJobProfile = /* GraphQL */ `
  mutation CreateJobProfile($input: CreateJobProfileInput!) {
    createJobProfile(input: $input) {
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
export const updateJobProfile = /* GraphQL */ `
  mutation UpdateJobProfile($input: UpdateJobProfileInput!) {
    updateJobProfile(input: $input) {
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
export const deleteJobProfile = /* GraphQL */ `
  mutation DeleteJobProfile($input: DeleteJobProfileInput!) {
    deleteJobProfile(input: $input) {
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
