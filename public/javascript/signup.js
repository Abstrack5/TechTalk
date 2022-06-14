async function signup (event) {
    event.preventDefault();

    const username = document.querySelector('#user-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { "Content-Type": "application/json"}
        });

        if (response.ok) {
            console.log("Success!");
            document.location.replace('/dashboard');
        } else {
            alert("Error: Inappropriate input values. Email must be valid, and password requires length of 4 or more characters");
        }
    }
};



document.querySelector(".signup-form").addEventListener("submit", signup);