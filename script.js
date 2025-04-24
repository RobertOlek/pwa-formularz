document.getElementById("fullForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const resultDiv = document.getElementById("result");
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  
    if (username.length < 5) {
      alert("Nazwa użytkownika musi mieć co najmniej 5 znaków.");
      return;
    }
  
    if (!passwordRegex.test(password)) {
      alert("Hasło musi zawierać litery, cyfry i znak specjalny oraz mieć minimum 6 znaków.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Hasła nie są zgodne.");
      return;
    }
  
    if (!emailRegex.test(email)) {
      alert("Niepoprawny adres email.");
      return;
    }
  
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      resultDiv.innerHTML = `<p style="color:green;">Dane zostały wysłane! ID: ${data.id}</p>`;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color:red;">Wystąpił błąd: ${error.message}</p>`;
    });
  });
  