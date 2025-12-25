// State
let currentMode = 'detailed'; // 'detailed' or 'quick'

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Add initial inputs for detailed mode
  addGradeInput('p1');
  addGradeInput('p1');
  addGradeInput('p1');
  addGradeInput('p2');
  addGradeInput('p2');
  addGradeInput('p2');
  addGradeInput('p3');
  addGradeInput('p3');
  addGradeInput('p3');

  // Add validation for Quick Mode inputs
  ['quick-p1', 'quick-p2', 'quick-p3'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => validateInput(input));
    }
  });
});

// Mode Switching
function switchMode(mode) {
  currentMode = mode;

  // UI Updates
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-${mode}`).classList.add('active');

  document.querySelectorAll('.calculator-card').forEach(card => card.classList.add('hidden'));
  document.getElementById(`${mode}-mode`).classList.remove('hidden'); // This assumes IDs are 'detailed-mode' and 'quick-mode'

  // Clear results
  document.getElementById('results-display').classList.add('hidden');
  document.getElementById('gpa-message').textContent = '';
}

// Detailed Mode: Add Grade Input
function addGradeInput(period) {
  const container = document.getElementById(`${period}-grades`);
  const wrapper = document.createElement('div');
  wrapper.className = 'grade-input-wrapper';

  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'grade-input';
  input.placeholder = '0.00';
  input.min = '0';
  input.max = '100';
  input.step = '0.01';
  input.oninput = () => {
    validateInput(input);
    updatePeriodAverage(period);
  };

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.innerHTML = '&times;';
  removeBtn.onclick = () => {
    container.removeChild(wrapper);
    updatePeriodAverage(period);
  };

  wrapper.appendChild(input);
  wrapper.appendChild(removeBtn);
  container.appendChild(wrapper);
}

// Validate Input (0-100)
function validateInput(input) {
  if (input.value > 100) input.value = 100;
  if (input.value < 0) input.value = 0;
}

// Calculate Period Average
function updatePeriodAverage(period) {
  const inputs = document.querySelectorAll(`#${period}-grades .grade-input`);
  let sum = 0;
  let count = 0;

  inputs.forEach(inp => {
    const val = parseFloat(inp.value);
    if (!isNaN(val)) {
      sum += val;
      count++;
    }
  });

  const avg = count > 0 ? sum / count : 0;
  document.getElementById(`${period}-avg-display`).textContent = `Avg: ${avg.toFixed(2)}`;
  return avg;
}

// Get Period Average (Helper)
function getPeriodAverage(period) {
  if (currentMode === 'detailed') {
    return updatePeriodAverage(period);
  } else {
    const val = parseFloat(document.getElementById(`quick-${period}`).value);
    return isNaN(val) ? 0 : val;
  }
}

// Main Calculate Function
function calculateFinalGPA() {
  // 1. Get Averages
  const p1 = getPeriodAverage('p1');
  const p2 = getPeriodAverage('p2');
  const p3 = getPeriodAverage('p3');

  // 2. Compute Sem Average
  const semAvg = (p1 + p2 + p3) / 3;

  // 3. Compute GPA
  let gpa;
  // Logic from user's python script:
  // if Sem_Average < 50: GPA = 4.00
  // else: GPA = -0.04 * Sem_Average + 5

  if (semAvg < 50) {
    gpa = 4.00; // Failing grade based on user logic (usually 5.0 in PH but 4.0 here)
    // Wait, did the user mean 4.0 scale? 
    // 100 * -0.04 + 5 = 1.0.
    // 50 * -0.04 + 5 = 3.0.
    // So < 50 is worse than 3.0?
    // If 4.0 is the fail grade, then it makes sense.
  } else {
    gpa = (-0.04 * semAvg) + 5;
  }

  // 4. Display Results
  document.getElementById('final-sem-avg').textContent = semAvg.toFixed(2);
  document.getElementById('final-gpa').textContent = gpa.toFixed(2);

  const resultsDisplay = document.getElementById('results-display');
  resultsDisplay.classList.remove('hidden');

  // Add some color coding
  const gpaValue = document.getElementById('final-gpa');
  if (gpa <= 3.0) {
    gpaValue.style.color = '#1e7e34'; // Green for passing/good
    document.getElementById('gpa-message').textContent = gpa <= 1.5 ? "Excellent work!" : "Common Passed!";
    if (gpa > 1.5 && gpa <= 3.0) document.getElementById('gpa-message').textContent = "Passed!";
  } else {
    gpaValue.style.color = '#dc3545'; // Red for fail/low
    document.getElementById('gpa-message').textContent = "Needs Improvement.";
  }
}
