function func(){
 document.getElementById("loginButton").addEventListener('click' , function(){

    const name = document.getElementById('inputName').value;

    fetch('http://localhost:8080/api/login',{
        method : 'Post' ,
        headers : {
            'Content-Type' : 'application/json',

        },
        body : JSON.stringify({
          username : name  
        }),
    }) .then(response => response.json())
    .then(data => {
        console.log('Succes' , data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

 });
}