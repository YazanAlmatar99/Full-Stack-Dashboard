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