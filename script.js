const employeeForm = document.getElementById('employeeForm');
const employeeTableBody = document.getElementById('employeeTableBody');
const searchInput = document.getElementById('search');
let employees = [];
let currentPage = 1;
const rowsPerPage = 5;

employeeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const employeeId = document.getElementById('employeeId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const department = document.getElementById('department').value;

    if (employeeId) {
        // Update existing employee
        const index = employees.findIndex(emp => emp.id == employeeId);
        employees[index] = { id: employeeId, name, email, jobTitle, department };
    } else {
        // Add new employee
        const newEmployee = { id: Date.now(), name, email, jobTitle, department };
        employees.push(newEmployee);
    }

    employeeForm.reset();
    loadEmployees();
});

function loadEmployees() {
    employeeTableBody.innerHTML = '';
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedEmployees = employees.slice(start, end);

    paginatedEmployees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.jobTitle}</td>
            <td>${emp.department}</td>
            <td>
                <button onclick="editEmployee(${emp.id})">Edit</button>
                <button onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        `;
        employeeTableBody.appendChild(row);
    });

    updatePagination();
}

function editEmployee(id) {
    const employee = employees.find(emp => emp.id == id);
    document.getElementById('employeeId').value = employee.id;
    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('jobTitle').value = employee.jobTitle;
    document.getElementById('department').value = employee.department;
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(emp => emp.id !== id);
        loadEmployees();
    }
}

function searchEmployees() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm) ||
        emp.email.toLowerCase().includes(searchTerm) ||
        emp.jobTitle.toLowerCase().includes(searchTerm) ||
        emp.department.toLowerCase().includes(searchTerm)
    );
    employeeTableBody.innerHTML = '';
    filteredEmployees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.jobTitle}</td>
            <td>${emp.department}</td>
            <td>
                <button onclick="editEmployee(${emp.id})">Edit</button>
                <button onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        `;
        employeeTableBody.appendChild(row);
    });
}

function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const pageCount = Math.ceil(employees.length / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement('a');
        pageLink.innerText = i;
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.onclick = function () {
            currentPage = i;
            loadEmployees();
        };
        pagination.appendChild(pageLink);
    }
}

// Initial load
loadEmployees();