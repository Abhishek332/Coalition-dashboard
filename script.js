import { DEFAULT_DIAGNOSIS_HISTORY, STATUS_TYPE, VITALS_STATIC_DATA } from './app.constants.js';

let selectedPatientIndex = 3;

document.addEventListener('DOMContentLoaded', function () {
  let username = 'coalition';
  let password = 'skills-test';
  let auth = window.btoa(`${username}:${password}`);

  fetchPatientsData(auth).then((patients) => {
    renderPatientsList(patients);
    renderPatientDiagnosisHistory(patients[selectedPatientIndex]);
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

function selectPatient(patients, index) {
  selectedPatientIndex = index;
  renderPatientDiagnosisHistory(patients[index]);
}

function renderPatientDiagnosisHistory(patient) {
  const averageDiagnosisForInterval = getAverageDiagnosis(patient, 6);

  renderVitals(averageDiagnosisForInterval);

  console.log(averageDiagnosisForInterval);
}

//get average of last 6 months
function getAverageDiagnosis(patient, months) {
  //last 6 months
  const diagnosisHistory = patient.diagnosis_history.slice(0, months);

  const averageDiagnosisCalculation = { ...DEFAULT_DIAGNOSIS_HISTORY };

  diagnosisHistory.forEach((diagnosis) => {
    //average blood pressure
    averageDiagnosisCalculation.blood_pressure.systolic.value +=
      diagnosis.blood_pressure.systolic.value / diagnosisHistory.length;
    averageDiagnosisCalculation.blood_pressure.diastolic.value +=
      diagnosis.blood_pressure.diastolic.value / diagnosisHistory.length;

    averageDiagnosisCalculation.blood_pressure.systolic.levels[
      diagnosis.blood_pressure.systolic.levels
    ]++;
    averageDiagnosisCalculation.blood_pressure.diastolic.levels[
      diagnosis.blood_pressure.diastolic.levels
    ]++;

    // average heart rate
    averageDiagnosisCalculation.heart_rate.value +=
      diagnosis.heart_rate.value / diagnosisHistory.length;
    averageDiagnosisCalculation.heart_rate.levels[
      diagnosis.heart_rate.levels
    ]++;

    // average respiratory rate
    averageDiagnosisCalculation.respiratory_rate.value +=
      diagnosis.respiratory_rate.value / diagnosisHistory.length;
    averageDiagnosisCalculation.respiratory_rate.levels[
      diagnosis.respiratory_rate.levels
    ]++;

    //average temperature
    averageDiagnosisCalculation.temperature.value +=
      diagnosis.temperature.value / diagnosisHistory.length;
    averageDiagnosisCalculation.temperature.levels[
      diagnosis.temperature.levels
    ]++;
  });

  return {
    systolic: {
      value: Number(
        averageDiagnosisCalculation.blood_pressure.systolic.value.toFixed(1)
      ),
      levels: chooseLevelToShow(
        averageDiagnosisCalculation.blood_pressure.systolic.levels
      ),
    },
    diastolic: {
      value: Number(
        averageDiagnosisCalculation.blood_pressure.diastolic.value.toFixed(1)
      ),
      levels: chooseLevelToShow(
        averageDiagnosisCalculation.blood_pressure.diastolic.levels
      ),
    },
    heart_rate: {
      value: Number(averageDiagnosisCalculation.heart_rate.value.toFixed(1)),
      levels: chooseLevelToShow(averageDiagnosisCalculation.heart_rate.levels),
    },
    respiratory_rate: {
      value: Number(
        averageDiagnosisCalculation.respiratory_rate.value.toFixed(1)
      ),
      levels: chooseLevelToShow(
        averageDiagnosisCalculation.respiratory_rate.levels
      ),
    },
    temperature: {
      value: Number(averageDiagnosisCalculation.temperature.value.toFixed(1)),
      levels: chooseLevelToShow(averageDiagnosisCalculation.temperature.levels),
    },
  };
}

function chooseLevelToShow(levelsData) {
  const normal = levelsData[STATUS_TYPE.NORMAL];
  const lowerThanAverage = levelsData[STATUS_TYPE.LOWER];
  const higherThanAverage = levelsData[STATUS_TYPE.HIGHER];

  // Check the specific conditions
  if (normal >= lowerThanAverage && normal >= higherThanAverage) {
    return STATUS_TYPE.NORMAL;
  } else if (
    lowerThanAverage > normal &&
    lowerThanAverage > higherThanAverage
  ) {
    return STATUS_TYPE.LOWER;
  } else {
    return STATUS_TYPE.HIGHER;
  }
}

function renderVitals (data){
  const vitalContainer = document.getElementById('vitals');
  let vitalsHtml = '';

  for(const [vitalKey, vital] of Object.entries(VITALS_STATIC_DATA)){
    console.log(data[vitalKey]);

    vitalsHtml += `
      <div class="vital flex flex-col items-start justify-between gap-3">
        <img src="${vital.icon}" alt="respiratory-rate" />
        <div class="flex flex-col items-start gap-1">
          <p class="font-16 font-medium">${vital.heading}</p>
          <p class="font-30 font-extra-bold">${data[vitalKey].value}${vital.unit}</p>
        </div>
        <p class="font-14 font-regular">${data[vitalKey].levels}</p>
      </div>
    `
  }

  vitalContainer.innerHTML = vitalsHtml;
}