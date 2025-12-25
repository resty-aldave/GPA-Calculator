// State
let currentMode = 'detailed'; // 'detailed' or 'quick'
let uniqueIdCounter = 1; // Always increases to ensure unique IDs

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // We'll treat the initial static ones as ID 1 for simplicity if they exist statically,
  // or better, let's just use the addSemester logic for everything if we were refactoring fully.
  // But given current HTML, the first semester is "sem-1".

  // Set up initial uniqueIdCounter to 2 since 1 is taken by default static block
  uniqueIdCounter = 2;

  // Add initial inputs for detailed mode (Semester 1)
  addGradeInput(1, 'p1');
  addGradeInput(1, 'p1');
  addGradeInput(1, 'p1');
  addGradeInput(1, 'p2');
  addGradeInput(1, 'p2');
  addGradeInput(1, 'p2');
  addGradeInput(1, 'p3');
  addGradeInput(1, 'p3');
  addGradeInput(1, 'p3');

  // Initialize Quick Mode inputs validation
  setupQuickInputsValidation(1);

  // Update labels for any initial static blocks to ensure consistency
  updateSemesterLabels('semesters-container');
  updateSemesterLabels('quick-semesters-container');
});

// Mode Switching
function switchMode(mode) {
  currentMode = mode;

  // UI Updates
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-${mode}`).classList.add('active');

  document.querySelectorAll('.calculator-card').forEach(card => card.classList.add('hidden'));
  document.getElementById(`${mode}-mode`).classList.remove('hidden');

  // Clear results
  document.getElementById('results-display').classList.add('hidden');
  document.getElementById('gpa-message').textContent = '';
}

// Detailed Mode: Add Grade Input
function addGradeInput(semId, period) {
  const container = document.getElementById(`sem${semId}-${period}-grades`);
  if (!container) return;

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
    updatePeriodAverage(semId, period);
  };

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.innerHTML = '&times;';
  removeBtn.onclick = () => {
    container.removeChild(wrapper);
    updatePeriodAverage(semId, period);
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
function updatePeriodAverage(semId, period) {
  const inputs = document.querySelectorAll(`#sem${semId}-${period}-grades .grade-input`);
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
  const displayId = `sem${semId}-${period}-avg-display`;
  const display = document.getElementById(displayId);
  if (display) display.textContent = `Avg: ${avg.toFixed(2)}`;
  return avg;
}

// Get Period Average (Helper)
function getPeriodAverage(semId, period) {
  if (currentMode === 'detailed') {
    return updatePeriodAverage(semId, period);
  } else {
    const id = `quick-sem${semId}-${period}`;
    const input = document.getElementById(id);
    const val = parseFloat(input ? input.value : 0);
    return isNaN(val) ? 0 : val;
  }
}

// --- Dynamic Semester Management ---

function updateSemesterLabels(containerId) {
  const blocks = document.querySelectorAll(`#${containerId} .semester-block`);
  blocks.forEach((block, index) => {
    const title = block.querySelector('.semester-header h3');
    if (title) {
      title.textContent = `Semester ${index + 1}`;
    }
  });
}

// Add Semester (Detailed Mode)
function addSemester() {
  const newId = uniqueIdCounter++;
  const container = document.getElementById('semesters-container');
  const semDiv = document.createElement('div');
  semDiv.className = 'semester-block';
  semDiv.id = `sem-${newId}`;

  semDiv.innerHTML = `
    <div class="semester-header">
        <h3>Semester</h3> 
        <button class="remove-sem-btn" onclick="removeSemester(${newId})">&times;</button>
    </div>
    <div class="periods-container">
        <!-- P1 -->
        <div class="period-group" id="sem${newId}-p1-group">
            <div class="period-header">
                <h4>Prelim (P1)</h4>
                <span class="period-avg" id="sem${newId}-p1-avg-display">Avg: 0.00</span>
            </div>
            <div class="grades-list" id="sem${newId}-p1-grades"></div>
            <button class="add-grade-btn" onclick="addGradeInput(${newId}, 'p1')">+ Add Grade</button>
        </div>

        <!-- P2 -->
        <div class="period-group" id="sem${newId}-p2-group">
            <div class="period-header">
                <h4>Midterm (P2)</h4>
                <span class="period-avg" id="sem${newId}-p2-avg-display">Avg: 0.00</span>
            </div>
            <div class="grades-list" id="sem${newId}-p2-grades"></div>
            <button class="add-grade-btn" onclick="addGradeInput(${newId}, 'p2')">+ Add Grade</button>
        </div>

        <!-- P3 -->
        <div class="period-group" id="sem${newId}-p3-group">
            <div class="period-header">
                <h4>Finals (P3)</h4>
                <span class="period-avg" id="sem${newId}-p3-avg-display">Avg: 0.00</span>
            </div>
            <div class="grades-list" id="sem${newId}-p3-grades"></div>
            <button class="add-grade-btn" onclick="addGradeInput(${newId}, 'p3')">+ Add Grade</button>
        </div>
    </div>
  `;
  container.appendChild(semDiv);

  // Add initial inputs
  addGradeInput(newId, 'p1');
  addGradeInput(newId, 'p1');
  addGradeInput(newId, 'p1');
  addGradeInput(newId, 'p2');
  addGradeInput(newId, 'p2');
  addGradeInput(newId, 'p2');
  addGradeInput(newId, 'p3');
  addGradeInput(newId, 'p3');
  addGradeInput(newId, 'p3');

  updateSemesterLabels('semesters-container');
}

// Add Semester (Quick Mode)
function addQuickSemester() {
  const newId = uniqueIdCounter++;

  const container = document.getElementById('quick-semesters-container');
  const semDiv = document.createElement('div');
  semDiv.className = 'semester-block';
  semDiv.id = `quick-sem-${newId}`;

  semDiv.innerHTML = `
        <div class="semester-header">
            <h3>Semester</h3>
            <button class="remove-sem-btn" onclick="removeQuickSemester(${newId})">&times;</button>
        </div>
        <div class="quick-inputs">
            <div class="input-group">
                <label for="quick-sem${newId}-p1">Prelim Average (P1)</label>
                <input type="number" id="quick-sem${newId}-p1" placeholder="0.00" min="0" max="100" step="0.01">
            </div>
            <div class="input-group">
                <label for="quick-sem${newId}-p2">Midterm Average (P2)</label>
                <input type="number" id="quick-sem${newId}-p2" placeholder="0.00" min="0" max="100" step="0.01">
            </div>
            <div class="input-group">
                <label for="quick-sem${newId}-p3">Finals Average (P3)</label>
                <input type="number" id="quick-sem${newId}-p3" placeholder="0.00" min="0" max="100" step="0.01">
            </div>
        </div>
    `;
  container.appendChild(semDiv);
  setupQuickInputsValidation(newId);

  updateSemesterLabels('quick-semesters-container');
}

// Remove Semester
function removeSemester(semId) {
  const el = document.getElementById(`sem-${semId}`);
  if (el) {
    el.remove();
    updateSemesterLabels('semesters-container');
  }
}

function removeQuickSemester(semId) {
  const el = document.getElementById(`quick-sem-${semId}`);
  if (el) {
    el.remove();
    updateSemesterLabels('quick-semesters-container');
  }
}

// Setup validation for Quick Inputs
function setupQuickInputsValidation(semId) {
  ['p1', 'p2', 'p3'].forEach(p => {
    const id = `quick-sem${semId}-${p}`;
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => validateInput(input));
    }
  });
}


// Calculate GPA from scale
function getGpaFromAverage(av) {
  if (av >= 94.8) return 1.00;
  if (av >= 89.2) return 1.25;
  if (av >= 83.6) return 1.50;
  if (av >= 78.0) return 1.75;
  if (av >= 72.4) return 2.00;
  if (av >= 66.8) return 2.25;
  if (av >= 61.2) return 2.50;
  if (av >= 55.6) return 2.75;
  if (av >= 50.0) return 3.00;
  return 4.00;
}

// Main Calculate Function
function calculateFinalGPA() {
  let semesterResultsHTML = '';
  let totalGPA = 0;
  let semCount = 0;

  const containerID = currentMode === 'detailed' ? 'semesters-container' : 'quick-semesters-container';
  const blocks = document.querySelectorAll(`#${containerID} .semester-block`);

  blocks.forEach((block, index) => { // Use index for labeling in results
    // Extract ID number from "sem-X" or "quick-sem-X"
    // id structure: sem-X, quick-sem-X
    const parts = block.id.split('-');
    const idNum = parts[parts.length - 1]; // Internal unique ID

    // 1. Get Averages
    const p1 = getPeriodAverage(idNum, 'p1');
    const p2 = getPeriodAverage(idNum, 'p2');
    const p3 = getPeriodAverage(idNum, 'p3');

    // 2. Compute Sem Average
    const semAvg = (p1 + p2 + p3) / 3;

    // 3. Compute GPA
    const gpa = getGpaFromAverage(semAvg);

    totalGPA += gpa;
    semCount++;

    // Append to results HTML
    // Use the index + 1 for consistent labeling in results too
    const title = `Semester ${index + 1}`;

    semesterResultsHTML += `
            <div class="sem-result-item">
                <h4>${title}</h4>
                <div class="sem-gpa" style="color: ${getGpaColor(gpa)}">${gpa.toFixed(2)}</div>
                <small>${semAvg.toFixed(2)}</small>
            </div>
        `;
  });

  // 4. Compute Cumulative GPA
  const cgpa = semCount > 0 ? totalGPA / semCount : 0;

  // 5. Display Results
  const resultsContainer = document.getElementById('semesters-results');
  resultsContainer.innerHTML = semesterResultsHTML;

  // Update CGPA Display
  const cgpaEl = document.getElementById('final-cgpa');
  cgpaEl.textContent = cgpa.toFixed(2);
  cgpaEl.style.color = getGpaColor(cgpa);

  document.getElementById('results-display').classList.remove('hidden');

  // Message
  if (cgpa <= 3.0) {
    document.getElementById('gpa-message').textContent = cgpa <= 1.5 ? "First Class Standing!" : "Good Standing!";
  } else {
    document.getElementById('gpa-message').textContent = "Needs Improvement.";
  }
}

function getGpaColor(gpa) {
  if (gpa <= 3.0) return '#1e7e34';
  return '#dc3545';
}
