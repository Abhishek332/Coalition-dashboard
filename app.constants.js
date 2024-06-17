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
