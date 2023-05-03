const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("userId");

async function userName(id){
  let serchData = await fetch(`http://localhost:3000/users/${id}`); 
  const user = await serchData.json();
  document.getElementById("userName").innerHTML = user.name
  console.log(9, user)
}
userName(userId)

function openModal(htmlId) {
  let modal = document.getElementById(htmlId);
  document.getElementById("inputCpfRegister").value = "";
  document.getElementById("inputNameRegister").value = "";
  document.getElementById("inputDateOfBirthRegister").value = "";
  document.getElementById("inputEmailRegister").value = "";
  document.getElementById("inputSexGenderRegister").value = "";
  document.getElementById("inputNationalityRegister").value = "";
  document.getElementById("inputNaturalnessRegister").value = "";
  document.getElementById("inputProfessionRegister").value = "";
  document.getElementById("inputSchoolingRegister").value = "";
  document.getElementById("inputMaritalStatusRegister").value = "";
  document.getElementById("inputMotherRegister").value = "";
  document.getElementById("inputFatherRegister").value = "";
  modal.style.display = "block";
}
function closeModal(htmlId) {
  let modal = document.getElementById(htmlId);
  modal.style.display = "none";
}
function openModalEdit(flagModalEdit) {
  if (flagModalEdit == true) {
    openModal("divModalEdit");
    document.getElementById("modalEditTitle").textContent = "Dados do paciente";
    document.getElementById("modalEditButtonEdit").style.display = "block";
    document.getElementById("inputCPF").disabled = true;
    document.getElementById("inputName").disabled = true;
    document.getElementById("inputBornDate").disabled = true;
    document.getElementById("inputEmail").disabled = true;
    document.getElementById("inputGender").disabled = true;
    document.getElementById("inputNationality").disabled = true;
    document.getElementById("inputBornIn").disabled = true;
    document.getElementById("inputProfession").disabled = true;
    document.getElementById("inputEcholarity").disabled = true;
    document.getElementById("inputCivilStatus").disabled = true;
    document.getElementById("inpuMotherName").disabled = true;
    document.getElementById("inpuFatherName").disabled = true;
    document.getElementById("modalFooterEditDisplay").style.display = "none";
    document.getElementById("modalFooterEditDelet").style.display = "block";
  } else {
    openModal("divModalEdit");
    document.getElementById("modalEditTitle").textContent =
      "Editar dados do paciente";
    document.getElementById("modalEditButtonEdit").style.display = "none";
    document.getElementById("inputCPF").disabled = false;
    document.getElementById("inputName").disabled = false;
    document.getElementById("inputBornDate").disabled = false;
    document.getElementById("inputEmail").disabled = false;
    document.getElementById("inputGender").disabled = false;
    document.getElementById("inputNationality").disabled = false;
    document.getElementById("inputBornIn").disabled = false;
    document.getElementById("inputProfession").disabled = false;
    document.getElementById("inputEcholarity").disabled = false;
    document.getElementById("inputCivilStatus").disabled = false;
    document.getElementById("inpuMotherName").disabled = false;
    document.getElementById("inpuFatherName").disabled = false;
    document.getElementById("modalFooterEditDisplay").style.display = "block";
    document.getElementById("modalFooterEditDelet").style.display = "none";
  }
}
async function dataListPatients() {
  // async faz a função ser assincrona
  let serchData = await fetch("http://localhost:3000/dados"); // A variavel sercData recebe o retorno da função fecth que traz os dados da API
  const patientsList = await serchData.json(); // utilizei o metado json para tratar os dados retornados da api
  console.log(patientsList); // para poder visualizar os dados no console do navegador
  let tr = "";
  patientsList.forEach((patient) => {
    // utiliza o metado forEach para percorrer todo o array de pacientes montando as tr(linhas da tabela)
    //reatribuindo tr a ela mesmo para não perder os dados das linhas anteriores.
    // patiente.id acessando as propriedades do objeto paciente para renderizar o conteudo da propriedade na td.
    tr =
      tr +
      ` 
            <tr>
                <td class="listCode">${patient.id}</td>
                <td colspan="2">${patient.name}</td>
                <td colspan="2">${patient.cpf}</td>
                <td class="listCode">
                  <img
                    class="buttoAction"
                    src="assets/Images/medical-record.png"
                    alt="Prontuario"
                    onclick="window.location.href = 'C:/Users/DELL/Desktop/Programa%C3%A7%C3%A3o%20Arnia/Modulo%201/Projeto-Modulo1/pages/medical-record/index.html?id=${patient.id}&userId=${userId}'"
                  />
                  <img
                    class="buttoAction"
                    src="assets/Images/edit.png"
                    alt="Editar"
                    onclick="editModalPatient(${patient.id})"
                  />
                  <img
                    class="buttoAction"
                    src="assets/Images/delete.png"
                    alt="Deletar"
                    onclick="openModalDelete(${patient.id})"
                  />
                </td>
            </tr>
            `;
  });
  document.getElementById("patientsTableBody").innerHTML = tr;
  // acessou o id do tbody e injetou html atraves do js para renderizar dinamicamente o coteudo da tabela
}
async function patientsFilter() {
  const serchData = await fetch("http://localhost:3000/dados");
  const patientsList = await serchData.json();
  const inputFilter = document.getElementById("imputFilterPatient");
  const filterValue = inputFilter.value;

  let filteredPatients

  if (filterValue) {
    filteredPatients = patientsList.filter((patient) => patient.name == filterValue);
  } else {
    filteredPatients = patientsList;
  }

  let tr = "";
  filteredPatients.forEach((patient) => {
    tr += ` 
      <tr>
        <td class="listCode">${patient.id}</td>
        <td colspan="2">${patient.name}</td>
        <td colspan="2">${patient.cpf}</td>
        <td class="listCode">
          <img
            class="buttoAction"
            src="assets/Images/medical-record.png"
            alt="Prontuario"
            onclick="window.location.href = 'C:/Users/DELL/Desktop/Programa%C3%A7%C3%A3o%20Arnia/Modulo%201/Projeto-Modulo1/pages/medical-record/index.html?id=${patient.id}&userId=${userId}'"
          />
          <img
            class="buttoAction"
            src="assets/Images/edit.png"
            alt="Editar"
            onclick="editModalPatient(${patient.id})"
          />
          <img
            class="buttoAction"
            src="assets/Images/delete.png"
            alt="Deletar"
            onclick="openModalDelete(${patient.id})"
          />
        </td>
      </tr>`;
  });

  const patientsTableBody = document.getElementById("patientsTableBody");
  patientsTableBody.innerHTML = tr;

  inputFilter.addEventListener("input", () => {
    const newFilterValue = inputFilter.value;
    if (newFilterValue !== filterValue) {
      patientsFilter();
    }
  });
}

async function registerPatients() {
  const cpfInput = document.getElementById("inputCpfRegister").value;
  const nameInput = document.getElementById("inputNameRegister").value;
  const dateOfbirthInput = document.getElementById(
    "inputDateOfBirthRegister"
  ).value;
  const emailInput = document.getElementById("inputEmailRegister").value;
  const sexGenderInput = document.getElementById(
    "inputSexGenderRegister"
  ).value;
  const nationalityInput = document.getElementById(
    "inputNationalityRegister"
  ).value;
  const naturalnessInput = document.getElementById(
    "inputNaturalnessRegister"
  ).value;
  const professionInput = document.getElementById(
    "inputProfessionRegister"
  ).value;
  const schoolingInput = document.getElementById(
    "inputSchoolingRegister"
  ).value;
  const maritalStatusInput = document.getElementById(
    "inputMaritalStatusRegister"
  ).value;
  const motherInput = document.getElementById("inputMotherRegister").value;
  const fatherInput = document.getElementById("inputFatherRegister").value;
  dados = {
    cpf: cpfInput,
    name: nameInput,
    birthDate: dateOfbirthInput,
    eMail: emailInput,
    sexGender: sexGenderInput,
    nationality: nationalityInput,
    naturalness: naturalnessInput,
    profession: professionInput,
    schooling: schoolingInput,
    maritalStatus: maritalStatusInput,
    mother: motherInput,
    father: fatherInput,
  };
  await fetch("http://localhost:3000/dados", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dados),
  });
  closeModal("divModal");
  dataListPatients();
}
async function editModalPatient(patientId) {
  const serchData = await fetch(`http://localhost:3000/dados/${patientId}`); // Atribui a variavel para receber os dados da api recebidos do retorno da função fetch
  const patient = await serchData.json(); // utiliza o metado json para tratar os dados retornados da api
  openModalEdit(false);
  document.getElementById("inputCPF").value = patient.cpf;
  document.getElementById("inputName").value = patient.name;
  document.getElementById("inputBornDate").value = patient.birthDate;
  document.getElementById("inputEmail").value = patient.eMail;
  document.getElementById("inputGender").value = patient.sexGender;
  document.getElementById("inputNationality").value = patient.nationality;
  document.getElementById("inputBornIn").value = patient.naturalness;
  document.getElementById("inputProfession").value = patient.profession;
  document.getElementById("inputEcholarity").value = patient.schooling;
  document.getElementById("inputCivilStatus").value = patient.maritalStatus;
  document.getElementById("inpuMotherName").value = patient.mother;
  document.getElementById("inpuFatherName").value = patient.father;
  document.getElementById("inputPatientId").value = patient.id
}
async function editPatient(){
  const cpfInput = document.getElementById("inputCPF").value;
  const nameInput = document.getElementById("inputName").value;
  const dateOfbirthInput = document.getElementById(
    "inputBornDate"
  ).value;
  const emailInput = document.getElementById("inputEmail").value;
  const sexGenderInput = document.getElementById(
    "inputGender"
  ).value;
  const nationalityInput = document.getElementById(
    "inputNationality"
  ).value;
  const naturalnessInput = document.getElementById(
    "inputBornIn"
  ).value;
  const professionInput = document.getElementById(
    "inputProfession"
  ).value;
  const schoolingInput = document.getElementById(
    "inputEcholarity"
  ).value;
  const maritalStatusInput = document.getElementById(
    "inputCivilStatus"
  ).value;
  const motherInput = document.getElementById("inpuMotherName").value;
  const fatherInput = document.getElementById("inpuFatherName").value;
  const patientId = document.getElementById('inputPatientId').value
  dados = {
    cpf: cpfInput,
    name: nameInput,
    birthDate: dateOfbirthInput,
    eMail: emailInput,
    sexGender: sexGenderInput,
    nationality: nationalityInput,
    naturalness: naturalnessInput,
    profession: professionInput,
    schooling: schoolingInput,
    maritalStatus: maritalStatusInput,
    mother: motherInput,
    father: fatherInput,
  };
  console.log(patientId)
  console.log(dados)
  await fetch(`http://localhost:3000/dados/${patientId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dados),
  });
  closeModal('divModalEdit')
  dataListPatients();
}
async function openModalDelete(patientId) {
  const serchData = await fetch(`http://localhost:3000/dados/${patientId}`); // Atribui a variavel para receber os dados da api recebidos do retorno da função fetch
  const patient = await serchData.json(); // utiliza o metado json para tratar os dados retornados da api
  openModalEdit(true);
  document.getElementById("inputCPF").value = patient.cpf;
  document.getElementById("inputName").value = patient.name;
  document.getElementById("inputBornDate").value = patient.birthDate;
  document.getElementById("inputEmail").value = patient.eMail;
  document.getElementById("inputGender").value = patient.sexGender;
  document.getElementById("inputNationality").value = patient.nationality;
  document.getElementById("inputBornIn").value = patient.naturalness;
  document.getElementById("inputProfession").value = patient.profession;
  document.getElementById("inputEcholarity").value = patient.schooling;
  document.getElementById("inputCivilStatus").value = patient.maritalStatus;
  document.getElementById("inpuMotherName").value = patient.mother;
  document.getElementById("inpuFatherName").value = patient.father;
  document.getElementById("inputPatientId").value = patient.id
}
async function deletePatient() {
  const patientId = document.getElementById('inputPatientId').value
  await fetch(`http://localhost:3000/dados/${patientId}`, {
    method: "DELETE",
  });
  closeModal('divModalEdit')
  dataListPatients();
}

dataListPatients();
