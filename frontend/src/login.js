let email;
let password;

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    axios({
      method: "post",
      url: "http://localhost/expenseTracker/backend/api/login.php",
      data: new URLSearchParams({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("id", response.data.user_id);
        localStorage.setItem("password", password);
        window.location.href = "/pages/home.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });
