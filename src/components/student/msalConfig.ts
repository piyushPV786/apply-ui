export const msalConfig = {
  auth: {
    clientId: '9aafa63c-e33b-407b-8d33-4c37e38e17ce',
    authority: 'https://login.microsoftonline.com/1858e891-16dd-4802-a098-680a17275121', // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: '/'
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    asyncPopups: true,
    allowRedirectInIframe: true // Needed for Front-channel logout
  }
}

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['openid']
}

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
}
