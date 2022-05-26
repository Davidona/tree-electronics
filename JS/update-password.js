const updatePasswordFrom = document.getElementById('password-update-form');
const updatePasswordBtn = document.getElementById('update-password-btn')

updatePasswordBtn.addEventListener('click', (e) => {
    

    const password = updatePasswordFrom.password.value
    const passwordConfirm = updatePasswordFrom.passwordConfirm.value
    const oldPassword = updatePasswordFrom.oldPassword.value
    
    if(password!=passwordConfirm){
        alert ("passwords do not match");
        e.preventDefault()
    }

    else if(oldPassword==password){
        alert ("old and new passwords cant be the same");
        e.preventDefault()
    }
    else{
        alert ("password was updated");
    }
})

