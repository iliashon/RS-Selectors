fetch('https://rs-selectors-default-rtdb.firebaseio.com/user.json')
  .then((response) => response.json())
  .then((json) => console.log(json));
