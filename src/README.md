In this project I have done this things-
-Create, retrieve, update and delete products.
-Create, retrieve orders.
-Update stocks with change of order.
-Validation with Zod.

To create Products my Endpoint is- http://localhost:5000/api/products/
I used POST method.

To retrieve all Products Endpoint is- http://localhost:5000/api/products/
I used GET method.

To retrieve a Products Endpoint is- http://localhost:5000/api/products/:productId
I used GET method.

To update a Products Endpoint is- http://localhost:5000/api/products/:productId
I used PUT method.

To Delete a Products Endpoint is- http://localhost:5000/api/products/:productId
I used DELETE method.

To search a Products Endpoint is- http://localhost:5000/api/products/searchTerm
I used GET method.

To create Order my Endpoint is- http://localhost:5000/api/orders/
I used POST method.

To retrieve all Order Endpoint is- http://localhost:5000/api/orders/
I used GET method.

To retrieve Order using email Endpoint is- http://localhost:5000/api/orders?email=
I used GET method.

All request bodies are validated using Zod to ensure data integrity. Validation errors will result in a 400 Bad Request response with details about the validation issues.
