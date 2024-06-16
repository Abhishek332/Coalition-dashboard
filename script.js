const ctx = document.getElementById('bloodPressureChart').getContext('2d');
const bloodPressureChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'],
    datasets: [
      {
        label: 'Systolic',
        data: [120, 130, 125, 140, 135, 160],
        borderColor: '#C26EB4',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Diastolic',
        data: [80, 85, 75, 90, 70, 78],
        borderColor: '#7E6CAB',
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
        line: {
            tension : 0.4  // smooth lines
        },
    },
  },
});
