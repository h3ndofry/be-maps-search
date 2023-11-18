import axios, { AxiosResponse } from 'axios'
import { TomTomSearchRequest, TomTomSearchResponse } from './types/TomTomSearch';
import { AutocompleteResult } from './types/AutocompleteResult';

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string, params: Omit<TomTomSearchRequest, 'key'> = {}): Promise<AutocompleteResult[]|string> {
    
    // we might pass in another region but we are only interested in returning AU addresses
    if (params.countrySet && params.countrySet !== 'AU') {
        return Promise.reject('Incorrect country set. Accepted values: "AU".');
    }

    const autocomplete: AxiosResponse<TomTomSearchResponse> = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json'`, {
        params: {
            key,
            limit: 100,
            countrySet: 'AU',
            ...params
        } as TomTomSearchRequest
    });

    return autocomplete.data.results.map((result): AutocompleteResult => {
        // destructure the result, discard everything else we don't need
        const { id, address: { streetNumber, streetName, countryCode, country, freeformAddress, municipality, postalCode, countrySubdivision, municipalitySubdivision } } = result;

        return {
            placeId: id,
            streetNumber,
            streetName,
            suburb: municipalitySubdivision,
            municipality,
            state: countrySubdivision,
            postcode: postalCode,
            countryCode,
            country,
            freeformAddress
        };
    });
}
