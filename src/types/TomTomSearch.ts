// Taken from here: https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search#request-parameters
// Note: this is a somewhat cut down version of what is actually present in the TomTom web API

export type TomTomSearchRequest = {
  key: string,
  query?: string,
  typeahead?: boolean,
  limit?: number,
  ofs?: number,
  countrySet?: string,
  lat?: number,
  lon?: number,
  radius?: number,
  topLeft?: string,
  btmRight?: string,
  geobias?: string,
  language?: string,
  extendedPostalCodesFor?: string,
  minFuzzyLevel?: number,
  maxFuzzyLevel?: number,
  idxSet?: string,
  categorySet?: string,
  brandSet?: string,
  connectorSet?: string,
  minPowerKW?: number,
  maxPowerKW?: number,
  fuelSet?: string,
  vehicleTypeSet?: string,
  view?: string,
  openingHours?: string,
  timeZone?: string,
  mapcodes?: string,
  relatedPois?: string,
  entityTypeSet?: string
}


type VehicleType = "Car" | "Truck";
type FuelType = "Petrol" | "LPG" | "Diesel" | "Biodiesel" | "DieselForCommercialVehicles" | "E85" | "LNG" | "CNG" | "Hydrogen" | "AdBlue";

type Address = {
  streetNumber: string,
  streetName: string,
  municipalitySubdivision: string,
  municipality: string,
  countrySecondarySubdivision: string,
  countryTertiarySubdivision: string,
  countrySubdivision: string,
  postalCode: string,
  postalName: string,
  extendedPostalCode: string,
  countryCode: string,
  country: string,
  countryCodeISO3: string,
  freeformAddress: string,
  countrySubdivisionName: string,
  countrySubdivisionCode: string,
  localName: string
};

type LatLon = {
  lat: number,
  lon: number
};

type TomTomSearchResult = {
  type: string,
  id: string,
  score: number,
  dist: number,
  info: string,
  entityType: string,
  poi: object,
  relatedPois: object,
  address: Address,
  position: LatLon,
  mapcodes: object[],
  viewport: object,
  boundingBox: object,
  entrypoints: object[],
  addressRanges: object,
  chargingPark: object,
  dataSources: object,
  fuelTypes: FuelType[],
  vehicleTypes: VehicleType[],
};

export type TomTomSearchResponse = {
  summary: {
    query: string,
    queryType: string,
    queryTime: number,
    numResults: number,
    offset: number,
    totalResults: number,
    fuzzyLevel: number,
    geoBias: LatLon,
    queryIntent: {
      type: string,
      details: unknown,
    }
  },
  results: TomTomSearchResult[]
}