fetch("http://127.0.0.1:8000/api/ticket-list")
  .then((response) => response.json())
  .then((data) => console.log(data));
//testing restapi works correctly and returns a promise and data object
