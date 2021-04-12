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
            'Content-Type': 'application/json;charset=UTF-8',
            ... getCsrfHeader()

           },
           body: JSON.stringify({country: countryId})
        })
    .then(resp => { if (Number(resp.status) >= 400) { throw resp.json() }})
}

export function getCsrfHeader() {
    const csrfHeaders: any = {};
    const csrfToken = _getCSRFCookie();

    if (csrfToken) {
      csrfHeaders['x-csrftoken'] = csrfToken;
    }
    return csrfHeaders;
}
  
   
export function _getCSRFCookie() {
    // check for a csrftoken cookie and return its value
    const csrfCookieName = 'csrftoken';
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, csrfCookieName.length + 1) === csrfCookieName + '=') {
            csrfToken = decodeURIComponent(cookie.substring(csrfCookieName.length + 1));
            break;
        }
        }
    }
    return csrfToken;
}