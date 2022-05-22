const signupForm = document.getElementById('signup-form');
const signupBtn = document.getElementById('signup-btn')

signupBtn.addEventListener('click', (e) => {
    

    const password = signupForm.password.value
    const passwordConfirm = signupForm.passwordConfirm.value

    if(password!=passwordConfirm){
        alert ("passwords do not match");
        e.preventDefault()
    }
})

