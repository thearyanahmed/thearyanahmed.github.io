Passwordless authentication is a popular alternative to traditional password-based systems. With passwordless authentication, users are able to securely access their accounts without the need for a password. This new approach to authentication has several benefits, including improved security, increased convenience, and reduced risk of password-related attacks. In this article, we’ll take a closer look at what passwordless authentication is, how it works, and why it may be the future of online security.

We’ll be building a passwordless login system using laravel. But laravel is a tool being used here, the concept should be the same.

### The setup

I have a [laravel](http://laravel.com) application with breeze setup. And [mailtrap](http://mailtrap.io) for trapping emails.

### The approach

The idea is to take the email of the user as an input and send a unique url to that email, through which the user will be verified and authenticated. Without any password.

To write it down the plain-text way,

 1. Display a form where we can take email as an input.

 2. Validate that email, check if it exists in the database or not.

 3. If yes, create a temporary signed url.

 4. The signed url should have some sort of identifier of that user. So when we verify, we know which user is trying to login.

 5. Send that signed url via email.

 6. When a user clicks on the link of that email, we handle the request, verify if the url has been tampered with.

 7. If not tampered with (if verified), we log the user in.

### The coding part

According to our ‘plain-text’ way, we need 3 routes. One that displays a form for the email input, one route to handle that form request and sending the email. And one for handling the callback, meaning verifying the url and creating a session (or equivalent) to log the user in.

So our first route is pretty simple.

    Route::get('/login/passwordless',[LoginWithEmail::class,'displayPasswordlessLoginForm'])
        ->name('passwordlessLoginView');

Btw, I’m trying to keep the naming long and easy to read and understand. Use the naming convention that you follow and best for your project & team.

This route simply renders a view that looks like so,

![passwordless authentication form](https://cdn-images-1.medium.com/max/4824/1*oGV1odqK-xbBTeDvZsRMeg.png)

Using inertiajs, so this form only does the following,

    
    const submit = () => {
        form.post(route('handlePasswordlessLoginRequest'), {
            onFinish: () => { /** handle according to your applicaton logic **/ },
        });
    };

Secondly, the code for `handlePasswordlessLoginRequest` would be

    Route::post('/login/passwordless',[LoginWithEmail::class,'handlePasswordlessLoginRequest'])
        ->name('handlePasswordlessLoginRequest');

And the controller logic,

    public function handlePasswordlessLoginRequest(Request $request): Response
    {
        // step 2
        // we validate the given input is an email and exists in our database
        $request->validate(['email' => 'email|exists:users,email']);
    
        // at this point, we have a record with that email
        // so we grab the user
    
        
        // would be good just to select id and email, cause thats what we are using.
        $user = User::where('email',$request->get('email'))->first();
        
        // step 3
        // create a temporary signed url
        // the URL::temporarySignedRoute() method takes a route name,
        // time or expiration and any extra parameter can be passed as an array.
    
        // our route for handling the callback url is 
        // `/login/passwordless/{user}` 
        // and we have given the name `processPasswordlessLogin`
        // the {user} param is being populated using 
        // ['user' => $id], this is step 4
        $url = URL::temporarySignedRoute('processPasswordlessLogin',now()->addMinutes(10), ['user' => $user->id]);
        
        // step 5
        // we are using notify to send the link, it could've been a (new Mail)->send()
        $user->notify(new PasswordlessLinkNotification($url));
    
        // finally, let our viewing user now, that we've sent an email.
        return Inertia::render('Auth/LoginWithEmail',[
               'status' => 'please check your email.'
        ]);
    }

### A bit about Signed URLs

Signed URLs, are URLs that include a signature or token to grant temporary access to a resource or endpoint.

The purpose of a signed URL is to provide secure access to protected resources or endpoints for a limited period of time. This is often used in situations where you want to share a private resource, such as a video or file, with a specific user or set of users, but don’t want to grant permanent access.

When you generate a signed URL, you typically specify the resource or endpoint that you want to grant access to, as well as a time limit for how long the URL should be valid. The URL is then signed with a secret key or token, which is used to verify the authenticity of the request when the URL is accessed.

### Vulnerability?

Some of us might that what is stopping us from changing the url parameter? As an attacker, I want to get a login url to my email and change the **{user}** parameter to gain access to someone else’s account?

Well, with signed urls, if we change 1 bit of it, it will be invalid. And this is handled by the `**\App\Http\Middleware\ValidateSignature::class**` middleware, which can be found registered inside the `Http/kernel.php`

### Handling callback

After our user has clicked the link that was sent to his email, we need to verify the url (make sure it wasn’t tampered with), get the user and log the user in.

So our route looks like,

    Route::get('/login/passwordless/{user}',[LoginWithEmail::class,'processPasswordlessLogin'])
        ->name('processPasswordlessLogin')
        ->middleware('signed');

Note the **signed** middleware. Without that bit, our application will be vulnerable. the signed middleware handles the tamper verification part.

And as the middleware is taking care of our validation’s heavy lifting, our controller is pretty simple with this part,

    public function processPasswordlessLogin(Request $request, User $user): RedirectResponse
    {
        // we have the user from the route /{user} param
        // and as we are using route model binding, if the user id is invalid 
        // or not found, it should abort(404) automatically.
        Auth::login($user);
    
        $request->session()->regenerate();
    
        return redirect()->route('dashboard');
    }

Thats it. Now, if we try it out, after sending a valid email, it’ll send us an email with the appropriate link and clicking it will log us in.

![requesting for an invitation link](https://cdn-images-1.medium.com/max/5288/1*awdj8cERP2y3WgZ-cODEQg.png)

![receiving the email with the signed url](https://cdn-images-1.medium.com/max/4284/1*rjubcCGw3V19KGhwdPzT8A.png)

![and signing in without a password](https://cdn-images-1.medium.com/max/6640/1*0-REzXmv72_AyfY2xkxNYg.png)

While using laravel made it super simple, the idea remains the same for all frameworks across the board.