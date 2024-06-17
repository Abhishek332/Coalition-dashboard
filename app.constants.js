export const STATUS_TYPE = {
  NORMAL: 'Normal',
  LOWER: 'Lower than Average',
  HIGHER: 'Higher than Average',
};

export const VITALS = {
  RESPIRATORY_RATE: 'respiratory_rate',
  TEMPERATURE: 'temperature',
  HEART_RATE: 'heart_rate',
};

export const VITALS_STATIC_DATA = {
  [VITALS.RESPIRATORY_RATE]: {
    heading: 'Respiratory Rate',
    icon: 'assets/respiratory rate.svg',
    unit: ' bpm',
  },
  [VITALS.TEMPERATURE]: {
    heading: 'Temperature',
    icon: 'assets/temperature.svg',
    unit: '°F',
  },
  [VITALS.HEART_RATE]: {
    heading: 'Heart Rate',
    icon: 'assets/HeartBPM.svg',
    unit: ' bpm',
  },
};

export const DEFAULT_DIAGNOSIS_HISTORY = {
  blood_pressure: {
    systolic: {
      value: 0,
      levels: {
        [STATUS_TYPE.NORMAL]: 0,
        [STATUS_TYPE.LOWER]: 0,
        [STATUS_TYPE.HIGHER]: 0,
      },
    },
    diastolic: {
      value: 0,
      levels: {
        [STATUS_TYPE.NORMAL]: 0,
        [STATUS_TYPE.LOWER]: 0,
        [STATUS_TYPE.HIGHER]: 0,
      },
    },
  },
  heart_rate: {
    value: 0,
    levels: {
      [STATUS_TYPE.NORMAL]: 0,
      [STATUS_TYPE.LOWER]: 0,
      [STATUS_TYPE.HIGHER]: 0,
    },
  },
  respiratory_rate: {
    value: 0,
    levels: {
      [STATUS_TYPE.NORMAL]: 0,
      [STATUS_TYPE.LOWER]: 0,
      [STATUS_TYPE.HIGHER]: 0,
    },
  },
  temperature: {
    value: 0,
    levels: {
      [STATUS_TYPE.NORMAL]: 0,
      [STATUS_TYPE.LOWER]: 0,
      [STATUS_TYPE.HIGHER]: 0,
    },
  },
};

export const LEVELS_ICONS = {
  [STATUS_TYPE.NORMAL]: '',
  [STATUS_TYPE.LOWER]: `<img src="assets/ArrowDown.svg" alt="arrow-up" />`,
  [STATUS_TYPE.HIGHER]: `<img src="assets/ArrowUp.svg" alt="arrow-up" />`,
};

export const PATIENT_INFO_KEYS = {
  DOB: 'date_of_birth',
  GENDER: 'gender',
  CONTACT_INFO: 'phone_number',
  EMERGENCY_CONTACT: 'emergency_contact',
  INSURANCE_PROVIDER: 'insurance_type',
};

export const PATIENT_INFO_STATIC_DATA = {
  [PATIENT_INFO_KEYS.DOB]: {
    heading: 'Date of Birth',
    icon: 'assets/calender.svg',
  },
  [PATIENT_INFO_KEYS.GENDER]: {
    heading: 'Gender',
    icon: 'assets/FemaleIcon.svg',
  },
  [PATIENT_INFO_KEYS.CONTACT_INFO]: {
    heading: 'Contact Info',
    icon: 'assets/PhoneIcon.svg',
  },
  [PATIENT_INFO_KEYS.EMERGENCY_CONTACT]: {
    heading: 'Emergency Contact',
    icon: 'assets/PhoneIcon.svg',
  },
  [PATIENT_INFO_KEYS.INSURANCE_PROVIDER]: {
    heading: 'Insurance Provider',
    icon: 'assets/InsuranceIcon.svg',
  },
};
