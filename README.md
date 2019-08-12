Ana Luisa Dashboard API Reference 

**************Horoscope Routes**************
-POST: /api/v1/horoscope
Query: qName 
It will return the automatically generated ID in the database

-PUT  /api/v1/horoscope/:id

Query:  qBirthDate: String
  		qBirthTime:String
   		qBirthPlace:String
   		qEmail:String
   		browser:String
   		utm_source:String
   		utm_medium:String
   		utm_compaign:String
   		utm_content:String
It will update the rest of the properties of the Horoscope model in the database

-DELETE /api/v1/horoscope/:id 
PROTECTED
It will delete the passed ID in the Database

**************Inventory Routes**************
-GET:  /api/v1/inventory
PROTECTED
It will return the last fetched data in the database

-POST:  /api/v1/inventory NOTE:     This route is defined in fetchRoutes.js file
PROTECTED
It will fetch Shopify's API and it will sort and store the data in the database

-GET:  /api/v1/inventory/:id
PROTECTED
It will return the product that matches the passed id

-GET: /api/v1/inventory/date/:date
PROTECTED
It will return all the products at the passed date inventory

-GET: /api/v1/inventory/:id/:date
PROTECTED
It will return the Product that matches the passed id and date

**************OAuth Routes**************
-GET:  /auth/google
It will redirect to the sign in page of Google

-GET: /auth/google/callback
it will store the following Google Account information in the database:
    googleId: String,
    firstName: String,
    lastName: String,
    picture: String,
    email: String,
    hd: String,
    role:String
Once the user has been authenticated this route will be triggered and it will send the user to /a/dashboard

-GET: /auth/logout
It will log out the user

-GET: /auth/current_user
It will return the current signed on user if exists


**************Order Routes**************
-POST: /api/cocreation
body:comes from shopify, it saves part of the order information to the database
It saves the following proprties:
    id:String,
    email:String,
    created_at:String,
    updated_at:String,
    note:String,
    line_items:Object,
    total_price:String,
    discount_codes:Object

-GET: /api/cocreation/:name
It gets all the products of the passed name 

-GET: /api/cocreation/:name/:id
It recieves the product and it's orders history




**************Local Deployment**************
install yarn & npm
Go to the root folder, run 'npm install'
Go to the client folder, run 'npm install'
From the root folder, run 'yarn dev' to start the project

**************Heroku Deployment**************
Create the app on heroku
Add the environment variables on heroku 
Open terminal, run 'npm install -g heroku'
On terminal, run 'heroku login'
On terminal, run 'heroku git:clone -a dashboard-analuisa'
On terminal, run 'cd dashboard-analuisa'

TO PUSH:
$ git add .
$ git commit -am "make it better"
$ git push heroku master
