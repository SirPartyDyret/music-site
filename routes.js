module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: {
            file: 'page.html'
        }
    },

    {
        method: 'GET',
        path: '/dashboard',
        handler: function (request, reply) {
            const context = {
                session: request.auth.credentials,
              };
        
              reply.view('dashboard', {
                title: 'Dashboard', 
                context : context
              });
        }
    },

    {
        method: ['GET', 'POST'], // Must handle both GET and POST
        path: '/login',          // The callback endpoint registered with the provider
        config: {
            auth: 'spotify',
            handler: function (request, reply) {
    
                if (!request.auth.isAuthenticated) {
                    return reply.redirect('/');
                }
    
                const username = request.auth.credentials.profile.username
                request.cookieAuth.set({ username });
               
                return reply.redirect('/dashboard');
            }
        }
    }
]