
const signupForm = document.getElementById('signup-form');
const signupBtn = document.getElementById('signup-btn')



signupForm.onsubmit = function() {myFunction()};
function myFunction() {

    var pwdObj = signupForm.password.value

    signUpFunc()
    alert(pwdObj)
  }

function signUpFunc() {
    var name = signupForm.name.value
    var lastName = signupForm.lastName.value
    var email = signupForm.email.value
    var password = signupForm.password.value
    var promoCode = signupForm.promoCode.value
    
    var json = {
            'name': name,
            'lastName':lastName,
            'email':email,
              'password': password,
              'promoCode':promoCode
            
          }


    $.ajax({
      url: "/sign-up-parameters",
      type: "POST",
      data: json,
      success: function (response) {
        $("#resbox").append("<br>");
        $("#resbox").append(response);
      },
      error: function (xhr, status, errmsg) {  // XHR - XMLHttpRequest  
        alert(errmsg + "  " + status);
      }
    });
  }

