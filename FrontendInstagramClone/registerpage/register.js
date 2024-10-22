function register() {
    document.getElementById("loginButton").addEventListener('click', function() {
        const name = document.getElementById('inputNumberOrName').value;
        const password = document.getElementById('inputNewPassword').value;
        const fullName = document.getElementById('inputFullName').value;
        const username = document.getElementById('inputNewUsername').value;

        console.log(name);
        console.log(password);
        console.log(fullName);
        console.log(username);

        fetch('http://localhost:8080/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                usernameOrNumber: name, 
                password: password, 
                fullName: fullName, 
                username: username 
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}



     



