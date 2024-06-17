import { DEFAULT_DIAGNOSIS_HISTORY, STATUS_TYPE, VITALS_STATIC_DATA } from './app.constants.js';

let selectedPatientIndex = 3;

document.addEventListener('DOMContentLoaded', function () {
  let username = 'coalition';
  let password = 'skills-test';
  let auth = window.btoa(`${username}:${password}`);

  fetchPatientsData(auth).then((patients) => {
    renderPatientsList(patients);
  });
});

async function fetchPatientsData(auth) {
  try {
    const response = await fetch(
      'https://fedskillstest.coalitiontechnologies.workers.dev',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    const patients = await response.json();

    return patients;
  } catch (error) {
    console.error(error);
  }
}

function renderPatientsList(patients) {
  const patientListContainer = document.getElementById('patients-list');

  let patientTiles = '';

  patients.forEach((patient, index) => {
    patientTiles += `
  <div
  class="patient flex items-center justify-between ${
    index === selectedPatientIndex ? 'selected' : ''
  }"
  >
  <div class="flex items-center gap-2">
    <div class="profile-container">
      <img src="${patient.profile_picture}" alt="${patient.name}" />
    </div>
    <div class="flex flex-col font-14">
      <h4 class="font-bold">${patient.name}</h4>
      <p class="font-regular text-secondary">
        ${patient.gender} ${patient.age}
      </p>
    </div>
  </div>
  <button onclick="selectPatient(${patients},${index})">
    <img src="assets/more-horizontal.svg" alt="more-horizontal" />
  </button>
</div>
  `;
  });

  patientListContainer.innerHTML = patientTiles;
}