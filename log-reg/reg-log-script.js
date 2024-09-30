const user_reg_input = document.getElementById("user_reg_input");
const reg_psswrd_input = document.getElementById("reg_psswrd_input");
const re_pswrd = document.getElementById("re_pswrd");
const fullname_input = document.getElementById("fullname_input");

const user_log_input = document.getElementById("user_log_input");
const log_psswrd_input = document.getElementById("log_psswrd_input");

const reg_btn = document.getElementById("reg_btn");
const log_btn = document.getElementById("log_btn");

const errorMessage1 = document.getElementById('error_message1');
const errorMessage2 = document.getElementById('error_message2');
const errorMessage3 = document.getElementById('error_message3');
const errorMessage4 = document.getElementById('error_message4');

const log_errorMessage1 = document.getElementById("logerror1");
const log_errorMessage2 = document.getElementById("logerror2");

const overlay = document.querySelector(".overlay");
const alerBox = document.querySelector(".alert-box");

const eye_btn = document.querySelectorAll(".eye");
//Username check regex 

const UserCheck = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const fullNameCheck = /^[a-zA-Z]+( *[a-zA-Z]+)*$/;
//User object
let users = [];

users = JSON.parse(localStorage.getItem("users"));

reg_btn.onclick = () => {
    if (fullNameCheck.test(fullname_input.value)) {
        fullname_input.style.backgroundColor = "rgba(107, 245, 107, 0.623)";
        errorMessage4.innerText = "";
        if (UserCheck.test(user_reg_input.value)) {
            user_reg_input.style.backgroundColor = "rgba(107, 245, 107, 0.623)";
            errorMessage1.innerText = "";
            if (passwordCheck.test(reg_psswrd_input.value)) {
                reg_psswrd_input.style.backgroundColor = "rgba(107, 245, 107, 0.623)";
                errorMessage2.innerText = "";
                re_pswrd.oninput = () => {
                    if (re_pswrd.value == reg_psswrd_input.value) {
                        re_pswrd.style.backgroundColor = "rgba(107, 245, 107, 0.623)";
                        errorMessage3.innerText = "";

                    } else if (re_pswrd.value == "") {
                        re_pswrd.style.backgroundColor = "white";
                        errorMessage3.innerText = "Empty!";
                    } else {
                        re_pswrd.style.backgroundColor = "rgba(226, 79, 79, 0.869)";
                        errorMessage3.innerText = "Password not match!"
                    }
                }
                if (re_pswrd.value == reg_psswrd_input.value) {
                    let new_user = {
                        fullname: fullname_input.value,
                        user_name: user_reg_input.value,
                        password: reg_psswrd_input.value
                    }
                    let flag = false;
                    users.forEach((neuser) => {
                        if (neuser.user_name === new_user.user_name) {
                            flag = true;
                        }
                    })

                    if (flag) {
                        alert("Username exist! Use another one!");

                    } else {
                        users.push(new_user);
                        localStorage.setItem("users", JSON.stringify(users));
                        setTimeout(() => {
                            alert("Successfully registered");
                            document.getElementById("register_form").reset();
                            user_reg_input.style.backgroundColor = "white";
                            fullname_input.style.backgroundColor = "white";
                            reg_psswrd_input.style.backgroundColor = "white";
                            re_pswrd.style.backgroundColor = "white";
                        }, 400);
                        setTimeout(() => {
                            document.getElementById("reg_close").click();
                            document.getElementById("logg_btn").click();
                        }, 600);
                    }

                } else if (re_pswrd.value == "") {
                    re_pswrd.style.backgroundColor = "white";
                    errorMessage3.innerText = "Empty!";
                }

            } else {
                reg_psswrd_input.style.backgroundColor = "rgba(226, 79, 79, 0.869)";
                errorMessage2.innerText = "The password must be at least 8 characters long.\nIt must contain at least one lowercase letter.\nIt must contain at least one uppercase letter.\nIt must contain at least one numeric digit.\nIt must contain at least one special character (e.g., !@#$%^&*)."
            }
        } else {
            user_reg_input.style.backgroundColor = "rgba(226, 79, 79, 0.869)";
            errorMessage1.innerText = "Plase enter a valid username!";
        }

    } else {
        errorMessage4.innerText = "Invalid fullname";
        fullname_input.style.backgroundColor = "rgba(226, 79, 79, 0.869)";
    }

}

let log_user_name;
let userFound = false;
let passwordCorrect = false;
log_btn.onclick = () => {
    users = JSON.parse(localStorage.getItem("users"));

    if (UserCheck.test(user_log_input.value)) {
        user_log_input.style.backgroundColor = "rgba(107, 245, 107, 0.623)";
        log_errorMessage1.innerText = "";
        if (passwordCheck.test(log_psswrd_input.value)) {
            log_psswrd_input.style.backgroundColor = "rgba(107, 245, 107, 0.623)";
            log_errorMessage2.innerText = "";
            users.forEach((user) => {
                if (user_log_input.value === user.user_name) {
                    userFound = true;
                    if (log_psswrd_input.value === user.password) {
                        passwordCorrect = true;

                        overlay.style.display = "block";
                        alerBox.style.display = "block";
                        log_errorMessage1.innerText = "";
                        log_errorMessage2.innerText = "";
                        log_user_name = user_log_input.value;
                        localStorage.setItem("last_user", log_user_name);
                        document.getElementById("login_form").reset();
                        setTimeout(() => {
                            overlay.style.display = "none";
                            alerBox.style.display = "none";
                        }, 1200);
                        setTimeout(() => {
                            document.getElementById("login_close").click();
                            location = "../index.html";
                        }, 1300);
                    }
                }
            });

            // Handle different error cases
            if (!userFound) {
                log_errorMessage1.innerText = "User not found!";
                log_errorMessage2.innerText = "";
            } else if (!passwordCorrect) {
                log_errorMessage2.innerText = "Wrong password!";
                log_errorMessage1.innerText = "";
            }


        } else {
            log_psswrd_input.style.backgroundColor = "rgba(226, 79, 79, 0.869)";
            log_errorMessage2.innerText = "Invalid password!";
        }
    } else {
        user_log_input.style.backgroundColor = "rgba(226, 79, 79, 0.869)";
        log_errorMessage1.innerText = "Invalid username!";
    }

}
eye_btn.forEach((e) => {
    eye_move(e);

});

function eye_move(eye) {
    eye.addEventListener("click", () => {
        if (eye.parentElement.querySelector('input').getAttribute('type') == "password") {
            eye.parentElement.querySelector('input').setAttribute('type', "text");
            eye.className = "eye fa-regular fa-eye-slash";
        } else {
            eye.parentElement.querySelector('input').setAttribute('type', "password");
            eye.className = "eye fa-regular fa-eye";
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const darkbtn = document.querySelectorAll('.btn-dark');
    darkbtn.forEach((dark) => {
        dark.addEventListener('click', function() {

            this.blur();

        });
    })



});