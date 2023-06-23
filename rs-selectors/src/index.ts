import './style.css';

fetch('https://rs-selectors-iliashon-default-rtdb.firebaseio.com/user.json')
  .then((response) => response.json())
  .then((json) => console.log(json));
