import {
  DEFAULT_DIAGNOSIS_HISTORY,
  LEVELS_ICONS,
  PATIENT_INFO_KEYS,
  PATIENT_INFO_STATIC_DATA,
  STATUS_TYPE,
  VITALS_STATIC_DATA,
} from './app.constants.js';

let selectedPatientIndex = 3;
let patients = [];
let bloodPressureChart = null;

document.addEventListener('DOMContentLoaded', function () {
  let username = 'coalition';
  let password = 'skills-test';
  let auth = window.btoa(`${username}:${password}`);

  fetchPatientsData(auth).then((patientsData) => {
    patients = patientsData;

    renderPatientsList(patients);
    renderPatientDiagnosisHistory(patients[selectedPatientIndex]);
    renderPatientDiagnosisList(patients[selectedPatientIndex]);
    renderPatientInfo(patients[selectedPatientIndex]);
    renderLabResults(patients[selectedPatientIndex]);
  });
});

document
  .getElementById('monthSelector')
  .addEventListener('change', updateMonthInterval);

function updateMonthInterval(event) {
  const months = parseInt(event.target.value ?? 6);
  bloodPressureChart.destroy();
  renderPatientDiagnosisHistory(patients[selectedPatientIndex], months);
}

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
  renderPatientDiagnosisHistory(patients[selectedPatientIndex]);
  renderPatientDiagnosisList(patients[selectedPatientIndex]);
  renderPatientInfo(patients[selectedPatientIndex]);
  renderLabResults(patients[selectedPatientIndex]);
}

function filterLastMonths(data, months) {
  const currentDate = new Date();
  const result = data.filter((item) => {
    const itemDate = new Date(`${item.month} 1, ${item.year}`);
    const diffInMonths =
      (currentDate.getFullYear() - item.year) * 12 +
      currentDate.getMonth() -
      itemDate.getMonth();
    return diffInMonths <= months;
  });
  return result;
}

function renderPatientDiagnosisHistory(patient, months = 6) {
  //last 6 months
  const diagnosisHistory = filterLastMonths(patient.diagnosis_history, months);
  const averageDiagnosisForInterval = getAverageDiagnosis(diagnosisHistory);

  renderBloodPressureChart(diagnosisHistory);
  renderSystolicAndDiastolic(averageDiagnosisForInterval);
  renderVitals(averageDiagnosisForInterval);
}

function getAverageDiagnosis(diagnosisHistory) {
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

function renderVitals(data) {
  const vitalContainer = document.getElementById('vitals');
  let vitalsHtml = '';

  for (const [vitalKey, vital] of Object.entries(VITALS_STATIC_DATA)) {
    vitalsHtml += `
      <div class="vital flex flex-col items-start justify-between gap-3">
        <img src="${vital.icon}" alt="respiratory-rate" />
        <div class="flex flex-col items-start gap-1">
          <p class="font-16 font-medium">${vital.heading}</p>
          <p class="font-30 font-extra-bold">${data[vitalKey].value}${
      vital.unit
    }</p>
        </div>
        <p class="font-14 font-regular flex items-center gap-2">${LEVELS_ICONS[data[vitalKey].levels]}${
      data[vitalKey].levels
    }</p>
      </div>
    `;
  }

  vitalContainer.innerHTML = vitalsHtml;
}

function renderBloodPressureChart(diagnosisHistory) {
  const bloodPressureChartContainer = document
    .getElementById('bloodPressureChart')
    .getContext('2d');

  // creating map to reduce redundant iterations
  const diagnosisMap = diagnosisHistory.reduce(
    (currentMap, diagnosis) => {
      currentMap.labels.push(
        `${diagnosis.month.slice(0, 3)} ${diagnosis.year}`
      );
      currentMap.systolic.push(diagnosis.blood_pressure.systolic.value);
      currentMap.diastolic.push(diagnosis.blood_pressure.diastolic.value);
      return currentMap;
    },
    {
      labels: [],
      systolic: [],
      diastolic: [],
    }
  );

  bloodPressureChart = new Chart(bloodPressureChartContainer, {
    type: 'line',
    data: {
      labels: diagnosisMap.labels,
      datasets: [
        {
          label: 'Systolic',
          data: diagnosisMap.systolic,
          borderColor: '#C26EB4',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Diastolic',
          data: diagnosisMap.diastolic,
          borderColor: '#7E6CAB',
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0.4, // smooth lines
        },
      },
    },
  });
}

function renderSystolicAndDiastolic(averageData) {
  const systolicAndDiastolicContainer = document.querySelector(
    '.blood-pressure-card > .right'
  );
  let systolicAndDiastolicHtml = `
    <div class="info flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <div class="point"></div>
          <h3 class="font-14 font-bold">Systolic</h3>
        </div>
        <p class="font-22 font-bold">${averageData.systolic.value}</p>
        <span class="font-14 font-regular flex items-center gap-2">${
          LEVELS_ICONS[averageData.systolic.levels]
        }${averageData.systolic.levels}</span>
      </div>
    </div>
    <hr style="background: #CBC8D4" />
    <div class="info flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <div class="point"></div>
          <h3 class="font-14 font-bold">Diastolic</h3>
        </div>
        <p class="font-22 font-bold">${averageData.diastolic.value}</p>
        <span class="font-14 font-regular flex items-center gap-2">${
          LEVELS_ICONS[averageData.diastolic.levels]
        }${averageData.diastolic.levels}</span>
      </div>
    </div>
  `;

  systolicAndDiastolicContainer.innerHTML = systolicAndDiastolicHtml;
}

function renderPatientDiagnosisList(patient) {
  const diagnosticListTableBody = document.querySelector(
    '#diagnostic-list-table tbody'
  );
  let diagnosticListHtml = ``;

  patient.diagnostic_list.forEach((diagnostic) => {
    diagnosticListHtml += `
      <tr>
        <td>${diagnostic.name}</td>
        <td>${diagnostic.description}</td>
        <td>${diagnostic.status}</td>
      </tr>
    `;
  });

  diagnosticListTableBody.innerHTML = diagnosticListHtml;
}

function renderPatientInfo(patient) {
  const patientInfoContainer = document.querySelector('#patient-info');
  console.log(patient);

  let patientInfoHtml = `
    <div class="img-container">
            <img
              src="${patient.profile_picture}"
              alt="${patient.name}"
            />
          </div>
          <h2 class="section-heading">${patient.name}</h2>
          <div class="details flex flex-col gap-4">
            ${Object.values(PATIENT_INFO_KEYS)
              .map((key) => {
                return `
                  <div class="info-line flex items-center gap-3">
                    <div class="icon-container flex items-center justify-center">
                      <img src="${PATIENT_INFO_STATIC_DATA[key].icon}" alt="${PATIENT_INFO_STATIC_DATA[key].heading}" />
                    </div>
                    <div class="flex flex-col gap-2">
                      <p class="title font-14 font-medium">${PATIENT_INFO_STATIC_DATA[key].heading}</p>
                      <p class="value font-14 font-bold">${patient[key]}</p>
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
          <button>Show All Information</button>
  `;

  patientInfoContainer.innerHTML = patientInfoHtml;
}

function renderLabResults(patient) {
  const labResultListContainer = document.querySelector('#lab-result-list');

  const labResultListHtml = patient.lab_results
    .map((labResult) => {
      return `
      <div class="flex justify-between items-center">
        <p class="font-14 font-regular">${labResult}</p>
        <button><img src="assets/download.svg" alt="download" /></button>
      </div>
    `;
    })
    .join('');

  labResultListContainer.innerHTML = labResultListHtml;
}
