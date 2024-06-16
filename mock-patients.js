const patients = [
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
  {
    name: 'Emily Williams',
    gender: 'Female',
    age: 18,
    profile_pic: 'assets/doctors/1.png',
  },
];

const patientListContainer = document.querySelector('#patients-list');

patients.forEach((patient, index) => {
  const patientElement = document.createElement('div');
  patientElement.classList = `patient flex items-center justify-between  ${index === 2 ? 'selected' : ''}`;
  patientElement.innerHTML = `
  <div class="flex items-center gap-2">
        <div class="profile-container">
            <img src="${patient.profile_pic}" alt="${patient.name}" />
        </div>
        <div class="flex flex-col font-14">
            <h4 class="font-bold">${patient.name}</h4>
            <p class="font-regular text-secondary">${patient.gender} ${patient.age}</p>
        </div>
 </div>
 <button><img src="assets/more-horizontal.svg" alt="more-horizontal" /></button>
  `;
  patientListContainer.appendChild(patientElement);
});
