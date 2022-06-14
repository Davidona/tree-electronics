const passwordResetForm = document.getElementById('password-reset-form');
const resetBtn = document.getElementById('Reset-password-btn')

resetBtn.addEventListener('click', (e) => {


    const password = passwordResetForm.password.value
    const passwordConfirm = passwordResetForm.passwordConfirm.value

    if (password != passwordConfirm) {
        alert("passwords do not match");
        e.preventDefault()
    }
})

