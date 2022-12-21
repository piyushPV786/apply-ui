export enum AddressEnums {
  ADDRESSTYPE1 = 1,
  ADDRESSTYPE2 = 2,
  STATE = "state",
  COUNTRY = "country",
}

export const AddressApi = {
  GETCOUNTRIES: "global/getCountries",
  GETSTATES: "global/getStatesOfCountry",
  GETCITY: "global/getCitiesOfState",
};
