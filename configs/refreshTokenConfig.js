const TokenProvider = require('refresh-token');

const tokenProvider = new TokenProvider('http://token-url', {
   refresh_token: '', 
   client_id:     'client id', 
   client_secret: 'client secret'
   /* you can pass an access token optionally
   access_token:  'fdlaksd',
   expires_in:    2133
   */
 });

tokenProvider.getToken(function (err, token) {
    if (!err){
        
    }
});