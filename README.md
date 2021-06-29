# Awesome eCommerce App
Our team has built an e-commerce Site where users may peruse a list of available
items, add them to their shopping cart, and checkout with our included payment
system. With our app, users may also view their past purchase history and if
they are unsatisfied with their purchases, may return them and receive a full
refund. Items will be visible for unregistered users to preview, however they
will need to sign-up in order to buy our items.

This application works by combining a custom backend server and database with
our one of a kind front end client. Our team has built this app with love and
dedication. We welcome all feedback and tips to improve and grow. Thank you
for your time and attention!

## Team Members
- Ryan Salandy
- Scott Mackey
- Moe Yassine
- Michael Van Le

## Links
- [eCommerce client Repository](https://github.com/Boo-leans/eCommerce-client)
- [Deployed eCommerce Client](https://boo-leans.github.io/eCommerce-client/)
- [Deployed eCommerce Heroku Api](https://guarded-taiga-09203.herokuapp.com)

## List of Technologies used
- HTML
- SCSS
- JavaScript
- Bootstrap
- React
- MongoDB
- Mongoose
- Express

## List of unsolved problems to be fixed in future iterations
- Stripe integration
- Patch to update order (return a single item in an order)
- Accurate messaging

## Planning, process, problem-solving Strategy
- Standup schedule: twice a day 9:05am/ 4:15pm
  - Standup meetings would cover what we did yesterday, what we will do today, and issues we're currently facing. 
  - Review and merge sessions following standup meeting
- We set off on our team project with mob programming for the backend API. Once this was set and we understood our intentions, we split up into pair programming for most of our tasks. Nearing the end of the project, we had a mix of pair and solo coding to fix bugs and other issues. 
- Tools: Github projects as our kanban board. 
- Problem solving strategy: Going through the docs and googling was our first point of attack. If we were stuck on an issue, we would come together as a group and attempt to solve it. If this still didn't work, an issue would be put in and we would tackle the problem with assistance from our instructors. 

## User Stories
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As an unregistered user, I would like to see all of the products.
- As a signed in user, I would like to add and remove products from a shopping cart.
- As a signed in user, I would like to purchase products in a shopping cart using Stripe with react https://github.com/azmenak/react-stripe-checkout
- As a signed in user, I would like to see all my past orders.

## Images

### Entity Relationship Diagram
![Entity Relationship Diagram](https://github.com/Boo-leans/eCommerce-api/blob/main/ERD.png)

### Wireframe
![Wireframes](https://github.com/Boo-leans/eCommerce-api/blob/main/WireFrame.png)

## Catalog of routes that the API expects
```javascript
// add/Update purchase history
export const productCreate = (user, item) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/purchases',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      purchase: {
        item: item,
        owner: user._id
      }
    }
  })
}
```
```javascript
// delete (refund) purchased product
export const productRefund = (user, itemId) => {
  return axios({
    url: apiUrl + '/purchases/' + itemId,
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${user.token}` }
  })
}
```
```javascript
// index purchase history
export const productIndex = (user) => {
  return axios({
    url: apiUrl + '/purchases',
    headers: { 'Authorization': `Bearer ${user.token}` }
  })
}
```
```javascript
export const itemRefund = (user, itemId, itemData) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/purchases' + itemId,
    header: { 'Authorization': `Bearer ${user.token}` },
    data: {
      purchase: {
        item: itemData
      }
    }
  })
}
```
