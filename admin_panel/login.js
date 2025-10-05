const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const error = document.getElementById('error');

loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // For simplicity, we'll check if the logged-in user's email is a specific admin email.
            // In a real-world scenario, you would have a more robust admin verification system,
            // such as checking a custom claim or a document in Firestore.
            if (email === "shivamsoni290411@gmail.com") { // Replace with your admin email
                window.location.href = 'dashboard.html';
            } else {
                error.textContent = 'You are not authorized to access this panel.';
                firebase.auth().signOut();
            }
        })
        .catch((err) => {
            error.textContent = 'Invalid credentials';
        });
});
