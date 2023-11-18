import 'dotenv/config';
import { getPlaceAutocomplete } from './maps-api';
import { AutocompleteResult } from './types/AutocompleteResult';
import { TomTomSearchRequest } from './types/TomTomSearch';

export async function getAutoCompleteDetails(address: string, params: Omit<TomTomSearchRequest, 'key'> = {}): Promise<string | AutocompleteResult[]> {

    let apiKey: string;

    if (process.env.TOMTOM_API_KEY) {
        apiKey = process.env.TOMTOM_API_KEY;
    } else {
        return Promise.reject('Environment variable TOMTOM_API_KEY is required!');
    }

    // get autocomplete results
    const res = await getPlaceAutocomplete(apiKey, address, params);

    // loop over and get details and map results
    return res;

}
