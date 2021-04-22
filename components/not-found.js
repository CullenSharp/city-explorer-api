async function notFound(request, response) {
  console.log('Route not found');
  response.status(404).send(`Can't find the page`);
}

//can only export one thing, so if you have more, use an object here
module.exports = notFound;
