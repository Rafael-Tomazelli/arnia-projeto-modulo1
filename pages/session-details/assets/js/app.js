const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const medicalRecordId = urlParams.get("id");
const userId = urlParams.get("userId");
let patientId = ''
console.log(5, userId, medicalRecordId)

function pageBack() {
  window.location.href = `C:/Users/DELL/Desktop/Programa%C3%A7%C3%A3o%20Arnia/Modulo%201/Projeto-Modulo1/pages/medical-record/index.html?userId=${userId}&id=${patientId}`;
}

async function userName(id){
  let serchData = await fetch(`http://localhost:3000/users/${id}`); 
  const user = await serchData.json();
  document.getElementById("userName").innerHTML = user.name
  console.log(9, user)
}
userName(userId)

async function searchData(id){
    let result = await fetch(`http://localhost:3000/medicalRecord/${id}`)
    let medicalRecord = await result.json()
    console.log(medicalRecord) 

    document.getElementById('sessionTitle').innerHTML = medicalRecord.title;
    document.getElementById('sessionDate').innerHTML = medicalRecord.date;
    document.getElementById('startTime').innerHTML = medicalRecord.startTime;
    document.getElementById('endTime').innerHTML = medicalRecord.endTime;
    document.getElementById('sessionText').innerHTML = medicalRecord.sessionSummary;
    document.getElementById('sessionPrice').innerHTML = medicalRecord.sessionPrice;
    document.getElementById('paymentForm').innerHTML = medicalRecord.formOfPayment;
    document.getElementById('paymentStatus').innerHTML = medicalRecord.status;
    patientId = medicalRecord.patientId
}
searchData(medicalRecordId)