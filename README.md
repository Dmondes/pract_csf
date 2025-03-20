# pract_csf


shopping cart - 3 views

view 0 - landing page
list of product categories on left
top right show added items to cart + checkout
message to show cart when empty

view 1 - details of product in product categories
click on a category to navigate here
quantity can be specified and added
cart remains on the right, value persist between views
cannot hop between categories, need to back and click on another category

view 2 - can reach here via checkout, only if cart not empty
User to fill delivery address
Show list of all products and total order prices of items in cart

Complete functionality
1.1  complete the routing
1.2  load csv file using mongoimport with headerlines
1.3  copy proxy-config-file

Products are temp held on client side store
2.1 implement cart.store.ts
2.2 add button to integrate in stroe
2.3 items in cart and store to be updated, only unqiue products
2.4 disable checkout when no item in cart, form.invalid

Sql function
3.1 implements
create model checkoutDetails
if form.invalid, placeOrder button disabled
Calculate and display total cost
3.2 sqlRepo -> service -> controller -> service.ts -> checkout.ts
3.3 model checkoutDetails
3.4 

Dockerfile -ng build, front end to be served by springboot, three stages

Analyse the file, if receive json, first thing to do is to npm install

router-outlet link to	const Routes: routes

The error message shows that your application is making a request to http://localhost:4200/api/categories and expecting a JSON response. However, the server is returning HTML content (starting with <!doctype html>) instead of JSON.
The interesting part is that the status code is 200 (OK), which means the request was successful from the server's perspective, but the content type is wrong for what your application expects.

copy proxyfile then 	ng serve --proxy-config proxy-config.js

mongoimport csv	mongoimport -d categories -c products --type=csv --file=products.csv --headerline ( find row is header columns)
mongo auto handles jsonArray 

check pom.xml, check application.properties

if see this
this.router.navigate(['/category', category])	path: 'category/:category', component: CategoryComponent 

implement rxjs component store, updater and select
updater: inject cartStore -> normal method call
select: declare variable and subscription and subscribe to method -> assign method value to variable