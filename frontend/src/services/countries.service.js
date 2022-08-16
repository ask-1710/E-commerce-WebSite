const API_KEY = 'NGZuVmhoUXNoWmVmejFKTjh6UkhmbDhFWmNHd3J5c2FJRUNkZGVaTw=='

class CountriesService {
        
    async getCountries() {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", API_KEY);

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        return await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    }           

    async getStates(countryiso2) {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", API_KEY);

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };
        const url = `https://api.countrystatecity.in/v1/countries/${countryiso2}/states`
        console.log(url)
        return await fetch(url, requestOptions)
    }

    async getCities(countryiso2, stateiso2) {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", API_KEY);

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };
        const url = `https://api.countrystatecity.in/v1/countries/${countryiso2}/states/${stateiso2}/cities`
        console.log(url)
        return await fetch(url, requestOptions)
    }

}

export default new CountriesService();