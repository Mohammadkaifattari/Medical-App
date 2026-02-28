// Simple Medical App JavaScript with Heroicons
let currentUser = null;
let currentRole = null;
let currentSection = null;

// Demo data
const demoData = {
  patients: [
    { id: '1', name: 'Ali Hassan', age: 35, gender: 'Male', contact: '+92 300 1111111', bloodGroup: 'B+', address: 'Karachi' },
    { id: '2', name: 'Sara Ahmed', age: 28, gender: 'Female', contact: '+92 300 2222222', bloodGroup: 'A+', address: 'Lahore' },
    { id: '3', name: 'Omar Khan', age: 52, gender: 'Male', contact: '+92 300 3333333', bloodGroup: 'O+', address: 'Islamabad' }
  ],
  appointments: [
    { id: '1', patientId: '1', patientName: 'Ali Hassan', doctor: 'Dr. Zainab Mir', date: '2024-01-15', time: '09:00', status: 'confirmed' },
    { id: '2', patientId: '2', patientName: 'Sara Ahmed', doctor: 'Dr. Bilal Raza', date: '2024-01-16', time: '11:30', status: 'pending' }
  ],
  prescriptions: [
    { id: '1', patientId: '3', patientName: 'Omar Khan', doctor: 'Dr. Bilal Raza', diagnosis: 'Type 2 Diabetes', date: '2024-01-10' }
  ]
};

// Auth Functions
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1));
  });
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  
  if (!email || !password) {
    toast('Please fill all fields', 'error');
    return;
  }
  
  // Demo login - simple role detection
  let role = 'patient';
  if (email.includes('doctor')) role = 'doctor';
  if (email.includes('receptionist')) role = 'receptionist';
  if (email.includes('admin')) role = 'admin';
  
  currentUser = { email, name: email.split('@')[0], role };
  currentRole = role;
  
  initApp();
  toast('Login successful!', 'success');
}

function doRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;
  
  if (!name || !email || !password || !role) {
    toast('Please fill all fields', 'error');
    return;
  }
  
  if (password.length < 6) {
    toast('Password must be at least 6 characters', 'error');
    return;
  }
  
  currentUser = { name, email, role };
  currentRole = role;
  
  initApp();
  toast('Account created successfully!', 'success');
}

function doLogout() {
  currentUser = null;
  currentRole = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  toast('Logged out successfully', 'info');
}

// App Initialization
function initApp() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  
  // Set user info
  document.getElementById('sidebar-name').textContent = currentUser.name;
  document.getElementById('sidebar-role').textContent = currentRole;
  
  buildNav();
  renderDashboard();
}

// Navigation with Heroicons
const NAV_CONFIG = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>' },
    { id: 'patients', label: 'Patients', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H15V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h12c.55 0 1-.45 1-1h2.5z"/></svg>' },
    { id: 'appointments', label: 'Appointments', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>' },
    { id: 'prescriptions', label: 'Prescriptions', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>' }
  ],
  doctor: [
    { id: 'dashboard', label: 'Dashboard', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>' },
    { id: 'patients', label: 'My Patients', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H15V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h12c.55 0 1-.45 1-1h2.5z"/></svg>' },
    { id: 'appointments', label: 'My Schedule', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>' },
    { id: 'prescriptions', label: 'Prescriptions', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>' }
  ],
  receptionist: [
    { id: 'dashboard', label: 'Dashboard', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>' },
    { id: 'patients', label: 'Patients', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H15V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h12c.55 0 1-.45 1-1h2.5z"/></svg>' },
    { id: 'appointments', label: 'Appointments', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>' }
  ],
  patient: [
    { id: 'dashboard', label: 'My Health', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>' },
    { id: 'appointments', label: 'My Appointments', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>' },
    { id: 'prescriptions', label: 'My Prescriptions', icon: '<svg class="heroicon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>' }
  ]
};

function buildNav() {
  const navConfig = NAV_CONFIG[currentRole] || NAV_CONFIG.patient;
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  
  navConfig.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.id = `nav-${item.id}`;
    btn.innerHTML = `${item.icon} ${item.label}`;
    btn.onclick = () => navigateTo(item.id);
    nav.appendChild(btn);
  });
  
  navigateTo('dashboard');
}

function navigateTo(sectionId) {
  currentSection = sectionId;
  
  // Update active nav
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  const navBtn = document.getElementById(`nav-${sectionId}`);
  if (navBtn) navBtn.classList.add('active');
  
  // Update page title
  const titles = {
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    prescriptions: 'Prescriptions'
  };
  
  document.getElementById('page-title').textContent = titles[sectionId] || 'Dashboard';
  
  // Render content
  const renderers = {
    dashboard: renderDashboard,
    patients: renderPatients,
    appointments: renderAppointments,
    prescriptions: renderPrescriptions
  };
  
  const renderer = renderers[sectionId];
  if (renderer) renderer();
}

// Dashboard
function renderDashboard() {
  const content = document.getElementById('content-area');
  content.innerHTML = `
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-value">${demoData.patients.length}</div>
        <div class="stat-label">Total Patients</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${demoData.appointments.length}</div>
        <div class="stat-label">Appointments</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${demoData.prescriptions.length}</div>
        <div class="stat-label">Prescriptions</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">3</div>
        <div class="stat-label">Active Doctors</div>
      </div>
    </div>
    
    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Recent Patients</h3>
        </div>
        <div class="card-body">
          ${demoData.patients.slice(0, 3).map(p => `
            <div style="padding: 0.75rem 0; border-bottom: 1px solid #eee;">
              <strong>${p.name}</strong>
              <div class="text-muted">${p.contact}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Upcoming Appointments</h3>
        </div>
        <div class="card-body">
          ${demoData.appointments.map(a => `
            <div style="padding: 0.75rem 0; border-bottom: 1px solid #eee;">
              <strong>${a.patientName}</strong> with ${a.doctor}
              <div class="text-muted">${a.date} at ${a.time}</div>
              <span class="badge badge-${a.status === 'confirmed' ? 'success' : 'warning'}">${a.status}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Patients
function renderPatients() {
  const content = document.getElementById('content-area');
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Patient Records</h3>
        <button class="btn btn-primary" onclick="openModal('modal-patient')">
          <svg class="heroicon" style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          Add Patient
        </button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Blood Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${demoData.patients.map(p => `
              <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.gender}</td>
                <td>${p.contact}</td>
                <td><span class="badge badge-info">${p.bloodGroup}</span></td>
                <td>
                  <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="viewPatient('${p.id}')">
                    <svg class="heroicon" style="width: 14px; height: 14px; margin-right: 4px;" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    View
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Appointments
function renderAppointments() {
  const content = document.getElementById('content-area');
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Appointments</h3>
        <button class="btn btn-primary" onclick="openModal('modal-appointment')">
          <svg class="heroicon" style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          Book Appointment
        </button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${demoData.appointments.map(a => `
              <tr>
                <td>${a.patientName}</td>
                <td>${a.doctor}</td>
                <td>${a.date}</td>
                <td>${a.time}</td>
                <td><span class="badge badge-${a.status === 'confirmed' ? 'success' : 'warning'}">${a.status}</span></td>
                <td>
                  <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">
                    <svg class="heroicon" style="width: 14px; height: 14px; margin-right: 4px;" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    Edit
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Prescriptions
function renderPrescriptions() {
  const content = document.getElementById('content-area');
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Prescriptions</h3>
        <button class="btn btn-primary" onclick="openModal('modal-prescription')">
          <svg class="heroicon" style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          New Prescription
        </button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${demoData.prescriptions.map(p => `
              <tr>
                <td>${p.patientName}</td>
                <td>${p.doctor}</td>
                <td>${p.diagnosis}</td>
                <td>${p.date}</td>
                <td>
                  <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">
                    <svg class="heroicon" style="width: 14px; height: 14px; margin-right: 4px;" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    View
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

// Patient Modal
function savePatient() {
  const name = document.getElementById('p-name').value.trim();
  const age = document.getElementById('p-age').value;
  const gender = document.getElementById('p-gender').value;
  const contact = document.getElementById('p-contact').value.trim();
  
  if (!name || !age || !gender || !contact) {
    toast('Please fill all required fields', 'error');
    return;
  }
  
  // Add to demo data
  const newPatient = {
    id: Date.now().toString(),
    name,
    age: parseInt(age),
    gender,
    contact,
    bloodGroup: document.getElementById('p-blood').value,
    address: document.getElementById('p-address').value.trim()
  };
  
  demoData.patients.push(newPatient);
  closeModal('modal-patient');
  renderPatients();
  toast('Patient added successfully!', 'success');
  
  // Reset form
  document.getElementById('patient-form').reset();
}

// Appointment Modal
function saveAppointment() {
  const patientId = document.getElementById('appt-patient').value;
  const doctor = document.getElementById('appt-doctor').value;
  const date = document.getElementById('appt-date').value;
  const time = document.getElementById('appt-time').value;
  
  if (!patientId || !doctor || !date || !time) {
    toast('Please fill all required fields', 'error');
    return;
  }
  
  const patient = demoData.patients.find(p => p.id === patientId);
  if (!patient) {
    toast('Patient not found', 'error');
    return;
  }
  
  const newAppointment = {
    id: Date.now().toString(),
    patientId,
    patientName: patient.name,
    doctor,
    date,
    time,
    status: 'pending'
  };
  
  demoData.appointments.push(newAppointment);
  closeModal('modal-appointment');
  renderAppointments();
  toast('Appointment booked successfully!', 'success');
}

// Prescription Modal
function savePrescription() {
  const patientId = document.getElementById('rx-patient').value;
  const diagnosis = document.getElementById('rx-diagnosis').value.trim();
  
  if (!patientId || !diagnosis) {
    toast('Please fill all required fields', 'error');
    return;
  }
  
  const patient = demoData.patients.find(p => p.id === patientId);
  if (!patient) {
    toast('Patient not found', 'error');
    return;
  }
  
  const newPrescription = {
    id: Date.now().toString(),
    patientId,
    patientName: patient.name,
    doctor: currentUser.name,
    diagnosis,
    date: new Date().toISOString().split('T')[0]
  };
  
  demoData.prescriptions.push(newPrescription);
  closeModal('modal-prescription');
  renderPrescriptions();
  toast('Prescription created successfully!', 'success');
}

// Utility Functions
function viewPatient(patientId) {
  const patient = demoData.patients.find(p => p.id === patientId);
  if (!patient) return;
  
  document.getElementById('profile-content').innerHTML = `
    <div style="padding: 1.5rem;">
      <h3>${patient.name}</h3>
      <div style="margin: 1rem 0;">
        <p><strong>Age:</strong> ${patient.age}</p>
        <p><strong>Gender:</strong> ${patient.gender}</p>
        <p><strong>Contact:</strong> ${patient.contact}</p>
        <p><strong>Blood Group:</strong> ${patient.bloodGroup}</p>
        <p><strong>Address:</strong> ${patient.address}</p>
      </div>
    </div>
  `;
  
  openModal('modal-profile');
}

function toast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toastEl = document.createElement('div');
  toastEl.className = `toast toast-${type}`;
  toastEl.textContent = message;
  
  container.appendChild(toastEl);
  
  setTimeout(() => {
    toastEl.remove();
  }, 3000);
}

// Populate dropdowns when modals open
document.addEventListener('DOMContentLoaded', function() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (target.classList.contains('open')) {
          setTimeout(() => {
            populateDropdowns();
          }, 100);
        }
      }
    });
  });
  
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
  });
});

function populateDropdowns() {
  // Patient dropdowns
  const patientSelects = ['appt-patient', 'rx-patient'];
  patientSelects.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.innerHTML = '<option value="">Select Patient</option>';
      demoData.patients.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
      });
    }
  });
  
  // Doctor dropdown
  const doctorSelect = document.getElementById('appt-doctor');
  if (doctorSelect) {
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    const doctors = ['Dr. Zainab Mir', 'Dr. Bilal Raza', 'Dr. Sarah Ahmed'];
    doctors.forEach(d => {
      const option = document.createElement('option');
      option.value = d;
      option.textContent = d;
      doctorSelect.appendChild(option);
    });
  }
}