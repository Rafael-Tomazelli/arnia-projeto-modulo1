async function makeLogin(event){
  event.preventDefault();
  const email = document.getElementById("exampleInputEmail1").value
  const password = document.getElementById("exampleInputPassword1").value

  let response = await fetch("http://localhost:3000/users")
  let userResponse = await response.json()
  console.log(userResponse)

  const corretLogin = await userResponse.filter(user => user.email == email && user.password == password)
  console.log(corretLogin, email, password)

  if(corretLogin.length == 0){
    alert("Login ou senha incorretos!")
    console.log("não deu")
  }else{
       window.location.href = `C:/Users/DELL/Desktop/Programação%20Arnia/Modulo%201/Projeto-Modulo1/pages/patients-list/index.html?userId=${corretLogin[0].id}`
      console.log("entrou aqui")
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const formLogin = document.getElementById('formLogin')
  formLogin.addEventListener('submit', makeLogin)
})