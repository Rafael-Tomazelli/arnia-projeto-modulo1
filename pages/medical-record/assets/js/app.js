const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const patientId = urlParams.get("id");
const userId = urlParams.get("userId");
console.log(5, userId)
async function userName(id){
  let serchData = await fetch(`http://localhost:3000/users/${id}`); 
  const user = await serchData.json();
  document.getElementById("userName").innerHTML = user.name
  console.log(9, user)
}

async function searchDataPatient(id) {
  const response = await fetch(`http://localhost:3000/dados/${id}`);
  let userResponse = await response.json();
  console.log(userResponse);

  document.getElementById("namePatient").innerHTML = userResponse.name;
  document.getElementById("dateOfBirthPatient").innerHTML =
    userResponse.birthDate;
  document.getElementById("professionPatient").innerHTML =
    userResponse.profession;
  document.getElementById("schoolingPatient").innerHTML =
    userResponse.schooling;
}

async function registerNewSession() {
  const radios = document.querySelectorAll('input[name="inlineRadioOptions"]');
  let paymentStatus;
  for (const radio of radios) {
    if (radio.checked) {
      paymentStatus = radio.value;
      break;
    }
  }
  const dateInput = document.getElementById("inputDateRegister").value;
  const startTimeInput = document.getElementById(
    "inputStartTimeRegister"
  ).value;
  const endTimeInput = document.getElementById("inputEndTimeRegister").value;
  const textRegisterInput = document.getElementById("inputTextRegister").value;
  const sessionSummaryRegisterInput = document.getElementById(
    "inputSessionSummaryRegister"
  ).value;
  const sessionPriceInput = document.getElementById("inputSessionPrice").value;
  const paymentTypeInput = document.getElementById("inputPaymentType").value;
  medicalRecord = {
    date: dateInput,
    startTime: startTimeInput,
    endTime: endTimeInput,
    title: textRegisterInput,
    sessionSummary: sessionSummaryRegisterInput,
    sessionPrice: sessionPriceInput,
    formOfPayment: paymentTypeInput,
    status: paymentStatus,
    sessionFlag: true,
    patientId: patientId,
  };
  await fetch("http://localhost:3000/medicalRecord", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(medicalRecord),
  });
  closeModal("modalRegisterSession");
  searchDataMedicalRecordPatient(patientId);
}

async function saveEditSession(id) {
  const radios = document.querySelectorAll('input[name="inlineRadioOptions"]');
  let paymentStatus = radios.forEach((radio) => {
    if (radio.checked) {
      return radio.value;
    }
  });
  const dateInput = document.getElementById("inputDateRegister").value;
  const startTimeInput = document.getElementById(
    "inputStartTimeRegister"
  ).value;
  const endTimeInput = document.getElementById("inputEndTimeRegister").value;
  const textRegisterInput = document.getElementById("inputTextRegister").value;
  const sessionSummaryRegisterInput = document.getElementById(
    "inputSessionSummaryRegister"
  ).value;
  const sessionPriceInput = document.getElementById("inputSessionPrice").value;
  const paymentTypeInput = document.getElementById("inputPaymentType").value;
  medicalRecord = {
    date: dateInput,
    startTime: startTimeInput,
    endTime: endTimeInput,
    title: textRegisterInput,
    sessionSummary: sessionSummaryRegisterInput,
    sessionPrice: sessionPriceInput,
    formOfPayment: paymentTypeInput,
    status: paymentStatus,
    sessionFlag: true,
    patientId: patientId,
  };
  await fetch(`http://localhost:3000/medicalRecord/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(medicalRecord),
  });
  closeModal("modalRegisterSession");
  searchDataMedicalRecordPatient(patientId);
}

async function registerNewFact() {
  const factInput = document.getElementById("inputDateRegisterFact").value;
  const textRegisterFactInput = document.getElementById(
    "inputTextRegisterFact"
  ).value;
  const SessionSummaryRegisterFactInput = document.getElementById(
    "inputSessionSummaryRegisterFact"
  ).value;
  medicalRecord = {
    date: factInput,
    title: textRegisterFactInput,
    sessionSummary: SessionSummaryRegisterFactInput,
    sessionFlag: false,
    patientId: patientId,
  };
  await fetch("http://localhost:3000/medicalRecord", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(medicalRecord),
  });
  closeModal("modalRegisterFact");
  searchDataMedicalRecordPatient(patientId);
}

function pageBack() {
  window.location.href = `C:/Users/DELL/Desktop/Programa%C3%A7%C3%A3o%20Arnia/Modulo%201/Projeto-Modulo1/pages/patients-list/index.html?userId=${userId}`;
}
function openOrCloseOptions(htmlId) {
  let modal = document.getElementById(htmlId);
  if (modal.style.display == "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}
function openModal(htmlId) {
  let modal = document.getElementById(htmlId);
  document.getElementById("divModal").style.display = "block";
  modal.style.display = "block";
  if (htmlId == 'modalRegisterSession'){
  document.getElementById("radioInputs").innerHTML = `<div id="divInlineRadio1" class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio1"
      value="Pago"
    />
    <label class="form-check-label paymentClass" for="inlineRadio1">Pago</label>
  </div>
  <div id="divInlineRadio2" class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio2"
      value="Não Pago" 
      checked
    />
    <label class="form-check-label paymentClass" for="inlineRadio2"
      >Não pago</label
    >
  </div>`
    document.getElementById("modalFooter").innerHTML = `<div>
    <span class="textRiquired">*Campos obrigatórios</span>
  </div>
  <div class="footerButtons">
    <div class="textCancel" onclick="closeModal('modalRegisterSession')">
      <span>Cancelar</span>
    </div>
    <div class="d-grid gap-2">
      <button
        type="button"
        class="btn btn-success createButton"
        onclick="registerNewSession()"
      >
        Criar
      </button>
    </div>
  </div>`
}else{
  document.getElementById("modalFooterFact").innerHTML = `<div>
    <span class="textRiquired">*Campos obrigatórios</span>
  </div>
  <div class="footerButtons">
    <div class="textCancel" onclick="closeModal('modalRegisterFact')">
      <span>Cancelar</span>
    </div>
    <div class="d-grid gap-2">
      <button
        type="button"
        class="btn btn-success createButton"
        onclick="registerNewFact()"
      >
        Criar
      </button>
    </div>
  </div>`
}
}
function closeModal(htmlId) {
  let modal = document.getElementById(htmlId);
  document.getElementById("divModal").style.display = "none";
  modal.style.display = "none";
  if (htmlId == "modalRegisterSession") {
    document.getElementById("inputDateRegister").value = "";
    document.getElementById("inputStartTimeRegister").value = "";
    document.getElementById("inputEndTimeRegister").value = "";
    document.getElementById("inputTextRegister").value = "";
    document.getElementById("inputSessionSummaryRegister").value = "";
    document.getElementById("inputSessionPrice").value = "";
    document.getElementById("inputPaymentType").value = "";
  } else {
    document.getElementById("inputDateRegisterFact").value = "";
    document.getElementById("inputTextRegisterFact").value = "";
    document.getElementById("inputSessionSummaryRegisterFact").value = "";
  }
}
async function saveEditFact(id) {
  const factInput = document.getElementById("inputDateRegisterFact").value;
  const textRegisterFactInput = document.getElementById(
    "inputTextRegisterFact"
  ).value;
  const SessionSummaryRegisterFactInput = document.getElementById(
    "inputSessionSummaryRegisterFact"
  ).value;
  medicalRecord = {
    date: factInput,
    title: textRegisterFactInput,
    sessionSummary: SessionSummaryRegisterFactInput,
    sessionFlag: false,
    patientId: patientId,
  };
  await fetch(`http://localhost:3000/medicalRecord/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(medicalRecord),
  });
  closeModal("modalRegisterFact");
  searchDataMedicalRecordPatient(patientId);
}
async function editSession(id){
  console.log(id)
 let result = await fetch(`http://localhost:3000/medicalRecord/${id}`)
 const editSession = await result.json()
 console.log(editSession)
  if (editSession.sessionFlag == true){
    document.getElementById("inputDateRegister").value = editSession.date;
    document.getElementById("inputStartTimeRegister").value = editSession.startTime;
    document.getElementById("inputEndTimeRegister").value = editSession.endTime;
    document.getElementById("inputTextRegister").value = editSession.title;
    document.getElementById("inputSessionSummaryRegister").value = editSession.sessionSummary;
    document.getElementById("inputSessionPrice").value = editSession.sessionPrice;
    document.getElementById("inputPaymentType").value = editSession.formOfPayment;
    if (editSession.status == 'Pago'){ 
    document.getElementById("radioInputs").innerHTML = `<div id="divInlineRadio1" class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio1"
      value="Pago"
      checked
    />
    <label class="form-check-label paymentClass" for="inlineRadio1">Pago</label>
  </div>
  <div id="divInlineRadio2" class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio2"
      value="Não Pago" 
    />
    <label class="form-check-label paymentClass" for="inlineRadio2"
      >Não pago</label
    >
  </div>`
  let modal = document.getElementById('modalRegisterSession');
  document.getElementById("divModal").style.display = "block";
  modal.style.display = "block";
  }else{
    document.getElementById("radioInputs").innerHTML = `<div id="divInlineRadio1" class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio1"
      value="Pago"
    />
    <label class="form-check-label paymentClass" for="inlineRadio1">Pago</label>
  </div>
  <div id="divInlineRadio2" class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio2"
      value="Não Pago" 
      checked
    />
    <label class="form-check-label paymentClass" for="inlineRadio2"
      >Não pago</label
    >
  </div>`
  let modal = document.getElementById('modalRegisterSession');
  document.getElementById("divModal").style.display = "block";
  modal.style.display = "block";
  }
  document.getElementById("modalFooter").innerHTML = `<div>
    <span class="textRiquired">*Campos obrigatórios</span>
  </div>
  <div class="footerButtons">
    <div class="textCancel" onclick="closeModal('modalRegisterSession')">
      <span>Cancelar</span>
    </div>
    <div class="d-grid gap-2">
      <button
        type="button"
        class="btn btn-success createButton"
        onclick="saveEditSession(${id})"
      >
        Salvar
      </button>
    </div>
  </div>`
  }else{
    document.getElementById("inputDateRegisterFact").value = editSession.date;
    document.getElementById("inputTextRegisterFact").value = editSession.title;
    document.getElementById("inputSessionSummaryRegisterFact").value = editSession.sessionSummary;
    document.getElementById("modalFooterFact").innerHTML = `<div>
    <span class="textRiquired">*Campos obrigatórios</span>
  </div>
  <div class="footerButtons">
    <div class="textCancel" onclick="closeModal('modalRegisterFact')">
      <span>Cancelar</span>
    </div>
    <div class="d-grid gap-2">
      <button
        type="button"
        class="btn btn-success createButton"
        onclick="saveEditFact(${id})"
      >
        Salvar
      </button>
    </div>
  </div>`
    openModal('modalRegisterFact')
  }
}
async function deleteSessionOrFact(id){
  await fetch(`http://localhost:3000/medicalRecord/${id}`, {
    method: "PUT",
  })
  searchDataMedicalRecordPatient(patientId);
}

function auxSort(a, b) {
  if (a.id > b.id) {
    return -1;
  }
  if (a.id < b.id) {
    return 1;
  }
  return 0;
}

async function searchDataMedicalRecordPatient(id){
  const response = await fetch(`http://localhost:3000/medicalRecord`);
  let userResponse = await response.json();
  console.log(userResponse);

  const filteredMedicalRecord = userResponse.filter(medicalRecord => {
    return medicalRecord.patientId == id
  })
  const sorted = filteredMedicalRecord.sort(auxSort); 
  console.log(filteredMedicalRecord, sorted)

  let sessionCards = ''
  
  filteredMedicalRecord.forEach((medicalRecord, index) => {
    const iconRetangle = index == 0 ? '' : `
    <div class="iconRetangle">
      <img src="${medicalRecord.sessionFlag ? 'assets/images/retangle.png' : 'assets/images/retangleBlue.png'}" alt="Barra" />
    </div>
  `;
  const goToDetail = medicalRecord.sessionFlag == false ? '' : `
  onclick="window.location.href='C:/Users/DELL/Desktop/Programa%C3%A7%C3%A3o%20Arnia/Modulo%201/Projeto-Modulo1/pages/session-details/index.html?id=${medicalRecord.id}&userId=${userId}'"
  `;
    sessionCards = sessionCards + ` 
    <div class="${medicalRecord.sessionFlag == true ? 'contentSessionCard' : 'contentFactCard'}">
              <div class="contentHeaderCard">
                <div class="${medicalRecord.sessionFlag == true ? 'boxIconSession' : 'boxIconFact'}">
                ${iconRetangle}
                  <div class=" ${medicalRecord.sessionFlag == true ? 'iconSession' : 'iconFact'}">
                    <img
                      src=" ${medicalRecord.sessionFlag == true ? 'assets/images/iconSession.png' : 'assets/images/iconFact.png'}"
                      alt="Icone Sessão"
                    />
                  </div>
                </div>
                <div
                  class="iconOptions"
                  onclick="openOrCloseOptions('menuOptions${medicalRecord.id}')"
                >
                  <img src="assets/images/options.png" alt="Botão de opção" />
                </div>
              </div>
              <div class="menuOptions" id="menuOptions${medicalRecord.id}">
                <div class="cardOptions">
                  <div class="textEdit" onclick="editSession(${medicalRecord.id})">
                    <img src="assets/images/iconEdite.png" alt="Editar" />
                    <span> Editar</span>
                  </div>
                  <div class="textDelete" onclick="deleteSessionOrFact(${medicalRecord.id})">
                    <img src="assets/images/iconDelete.png" alt="Excluir" />
                    <span> Excluir</span>
                  </div>
                </div>
              </div>
              <div class="textInformation">
                <div class="titleSession">
                  <span>${medicalRecord.title}</span>
                </div>
                <div class="textDate">
                  <span>${medicalRecord.date}</span>
                </div>
                <div class="textSession" ${goToDetail}>
                  <span
                    >${medicalRecord.sessionSummary}</span
                  >
                </div>
              </div>
            </div>
    `
  })
  document.getElementById("contentSessionCard").innerHTML = sessionCards;
}

async function filterSessionOrFact(sessionFlag){
  const serchData = await fetch(`http://localhost:3000/medicalRecord/`); // Atribui a variavel para receber os dados da api recebidos do retorno da função fetch
  const sessionOrFactList = await serchData.json(); // utiliza o metado json para tratar os dados retornados da api
  let filteredSessionOrFact = sessionOrFactList.filter(
    (sessionOrFac) => sessionOrFac.sessionFlag == sessionFlag && sessionOrFac.patientId == patientId
  ); // usado o metado filter para retornar um novo array filtrado pelo nome
  let sessionCards = ''
  
  filteredSessionOrFact.forEach((medicalRecord, index) => {
    const iconRetangle = index == 0 ? '' : `
    <div class="iconRetangle">
      <img src="${medicalRecord.sessionFlag ? 'assets/images/retangle.png' : 'assets/images/retangleBlue.png'}" alt="Barra" />
    </div>
  `;
    sessionCards = sessionCards + ` 
    <div class="${medicalRecord.sessionFlag == true ? 'contentSessionCard' : 'contentFactCard'}">
              <div class="contentHeaderCard">
                <div class="${medicalRecord.sessionFlag == true ? 'boxIconSession' : 'boxIconFact'}">
                ${iconRetangle}
                  <div class=" ${medicalRecord.sessionFlag == true ? 'iconSession' : 'iconFact'}">
                    <img
                      src=" ${medicalRecord.sessionFlag == true ? 'assets/images/iconSession.png' : 'assets/images/iconFact.png'}"
                      alt="Icone Sessão"
                    />
                  </div>
                </div>
                <div
                  class="iconOptions"
                  onclick="openOrCloseOptions('menuOptions${medicalRecord.id}')"
                >
                  <img src="assets/images/options.png" alt="Botão de opção" />
                </div>
              </div>
              <div class="menuOptions" id="menuOptions${medicalRecord.id}">
                <div class="cardOptions">
                  <div class="textEdit" onclick="editSession(${medicalRecord.id})">
                    <img src="assets/images/iconEdite.png" alt="Editar" />
                    <span> Editar</span>
                  </div>
                  <div class="textDelete" onclick="deleteSessionOrFact(${medicalRecord.id})">
                    <img src="assets/images/iconDelete.png" alt="Excluir" />
                    <span> Excluir</span>
                  </div>
                </div>
              </div>
              <div class="textInformation">
                <div class="titleSession">
                  <span>${medicalRecord.title}</span>
                </div>
                <div class="textDate">
                  <span>${medicalRecord.date}</span>
                </div>
                <div class="textSession">
                  <span
                    >${medicalRecord.sessionSummary}</span
                  >
                </div>
              </div>
            </div>
    `
  })
  document.getElementById("contentSessionCard").innerHTML = sessionCards;
}
async function searchAllMedicalRecord(){
  await searchDataMedicalRecordPatient(patientId);
}
async function loadFull(){
  // let spinner = document.getElementById("loader")
  // spinner.style.display = 'block'
  await searchDataPatient(patientId);
  await searchDataMedicalRecordPatient(patientId);
  await userName(userId)
  // spinner.style.display = 'none'
}
loadFull()
