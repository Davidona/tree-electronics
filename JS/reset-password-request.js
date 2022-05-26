const passwordResetRequestForm = document.getElementById('request-password-reset-form');
const passwordResetRequestBtn = document.getElementById('request-password-reset-btn')

passwordResetRequestBtn.addEventListener('click', (e) => {
    

    const password = passwordResetRequestForm.email.value
    
    alert ("If the email is in the data-base a password reset form will be sent to you via email");

    
})

