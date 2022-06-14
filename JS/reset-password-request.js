const passwordResetRequestForm = document.getElementById('request-password-reset-form');
const passwordResetRequestBtn = document.getElementById('request-password-reset-btn')

passwordResetRequestBtn.addEventListener('click', (e) => {


    const password = passwordResetRequestForm.email.value

    alert("If your email exist, a password reset will be sent to you via email");


})

