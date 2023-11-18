import 'dotenv/config';
import { describe } from '@jest/globals';
import { getPlaceAutocomplete } from '../src/maps-api';
import { getAutoCompleteDetails } from '../src';

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
        
    let apiKey: string = 'NO_KEY_PROVIDED';

    beforeEach(() => {
        if (process.env.TOMTOM_API_KEY) {
            apiKey = process.env.TOMTOM_API_KEY;
        }
    });

    afterEach(() => {
        apiKey = 'NO_KEY_PROVIDED';
    });

    describe('getAutoCompleteDetails', () => {
        it('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street');
            expect(res).toBeInstanceOf(Promise);
        })

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street')
            const firstRes = res[0]
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('streetName')
            expect(firstRes).toHaveProperty('suburb')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes).toHaveProperty('state')
            expect(firstRes).toHaveProperty('postcode')
        })
        
        it('can fetch a list of addresses based on your current location', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street', { lat: -37.808951746050475, lon: 144.97343012254174 })
            const firstRes = res[0]
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('streetName')
            expect(firstRes).toHaveProperty('suburb')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes).toHaveProperty('state')
            expect(firstRes).toHaveProperty('postcode')
        })


        it('can fetch one specific address', async () => {
            const res = await getAutoCompleteDetails('46A Charlotte Street Bega New South Wales');
            expect(res).toHaveLength(1)
        })

        it('can fetch a partial address', async () => {
            const res = await getAutoCompleteDetails('46A Char');
            const firstRes = res[0]
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('streetName')
            expect(firstRes).toHaveProperty('suburb')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes).toHaveProperty('state')
            expect(firstRes).toHaveProperty('postcode')
        })

        it('can fetch a similar-sounding address', async () => {
            // Dropbear (Drop Bear) Lane is an address just north of Tamworth
            // https://maps.app.goo.gl/qGqVSZnDWCb1UvkG8
            // ...however it seems TomTom doesn't pick up on this...
            const res = await getAutoCompleteDetails('Dropbear Lane');
            const firstRes = res[0]
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('streetName')
            expect(firstRes).toHaveProperty('suburb')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes).toHaveProperty('state')
            expect(firstRes).toHaveProperty('postcode')
        });
    })

    describe('getPlaceAutocomplete', () => {

        it('handles no results', async () => {
            const res = await getPlaceAutocomplete(apiKey, 'asfasffasfasafsafs');
            expect(res).toStrictEqual([]);
        })

        it('handles non-australian configuration', async () => {
            const res = getPlaceAutocomplete(apiKey, 'Charlotte Street', { countrySet: 'US' });
            expect(res).rejects.toEqual('Incorrect country set. Accepted values: \"AU\".')
        })

        it('handles error', async () => {
            expect(getPlaceAutocomplete(apiKey, '')).rejects.toThrow();
        })

    })

})
