function register() {
   const url = 'http://localhost:8080/api/user/create';

   const userData = {
    numberOrName: "testq123",
    password: "pass123",
    fullName: "Test User",
    username: "testuser1"

   };

   fetch(url ,{
  method: 'Post',
  headers:{
    'Content-Type' : 'application/json'
  },
   body: JSON.stringify(userData)
   })
   .then(response => response.json())
   .then(data =>{
    console.log('Sucsses:' , data)
   })
   .catch((error) => {
    console.error('Error:', error);
  });


}



     



