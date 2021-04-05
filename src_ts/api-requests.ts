import { endpoints } from "./endpoints";

export function getUserProfile() {
   return fetch(endpoints.userProfile.url).then(response => {
       if (response.status == 403) {
           throw response;
       }    
    return response.json();
   });
}

export function changeCountry(countryId: string) {
    return fetch(endpoints.changeCountry.url,
         { method: 'POST',
           headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
           },
           body: JSON.stringify({country: countryId})
        })
    .then(resp => { if (Number(resp.status) >= 400) { throw resp.json() }})
}