////testing restapi get requests work correctly and returns object


// fetch("http://127.0.0.1:8000/api/ticket-list/")
//   .then((response) => response.json())
//   .then((data) => {
//       ticketData.push(...data);
//       console.log(ticketData); // This will log the fetched data in an array
//   });

////testing if the post request works correctly and posts the object to the database on the server
// fetch("http://127.0.0.1:8000/api/ticket-create/", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(
//     {
//       "TicketDescription": "Frontend cannot connect to server issue",
//       "TicketStatus": "OP",
//       "TicketPriority": "L",
//       "TicketPoints": 3,
//       "TicketProject": 1,
//       "ticketassignedto": 3,
//       "TicketSubmittedBy": 1
//   }
//   )
// })
// .then(() => console.log('success'));
