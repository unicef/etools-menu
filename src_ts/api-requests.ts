import { endpoints } from "./endpoints";

export function getUserProfile() {
   return fetch(endpoints.userProfile.url).then(response => {
       if (response.status == 403) {
           throw response;
       }    
    return response.json();
   });
}