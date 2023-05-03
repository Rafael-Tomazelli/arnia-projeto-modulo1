let obj = {
  name: "",
  email: "",
  password: "",
};

function saveNameAndEmail(event) {
  
  event.preventDefault();
  const saveName = document.getElementById("InputSaveName").value;
  const saveEmail = document.getElementById("InputSaveEmail").value;
  obj.name = saveName;
  obj.email = saveEmail;
  document.getElementById("boxUserName").style.display = "none";
  document.getElementById("boxUserPassword").style.display = "block";
  console.log(obj);
}

document.addEventListener('DOMContentLoaded', function() {
  const form1 = document.getElementById('formRegisterName')
  form1.addEventListener('submit', saveNameAndEmail)
})

function validatePassword(password) {
  // Verifica se a senha tem pelo menos 8 caracteres
  if (password.length < 8) {
    return false;
  }
  
  // Verifica se a senha contém um caractere especial / ou +
  const specialChars = /[\/\+\!\@\#\$\%\&\*]/;
  if (!specialChars.test(password)) {
    return false;
  }
  
  // Verifica se a senha contém uma letra maiúscula
  const uppercaseChars = /[A-Z]/;
  if (!uppercaseChars.test(password)) {
    return false;
  }
  
  // Se a senha passou em todas as verificações, retorna true
  return true;
}


async function savePassword(event){
  event.preventDefault();
  const savePassword = document.getElementById("exampleInputpassword1").value;
  const saveConfirmPassword = document.getElementById("exampleInputpassword2").value;    

  // Verifica se a senha atende aos requisitos de validação
  if (!validatePassword(savePassword)) {
    alert("A senha precisa ter pelo menos 8 caracteres, um caractere especial / ou +, e uma letra maiúscula.");
    return;
  }

  obj.password = savePassword;
  console.log(obj);

  if(savePassword == saveConfirmPassword){
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    window.location.href = "C:/Users/DELL/Desktop/Programa%C3%A7%C3%A3o%20Arnia/Modulo%201/Projeto-Modulo1/pages/login/index.html"
  }else{
    alert('Senhas não conferem')
    return
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const form2 = document.getElementById('formRegisterPassword')
  form2.addEventListener('submit', savePassword)
})