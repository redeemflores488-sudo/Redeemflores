// --- Configuration ---
// REPLACE THIS URL with your actual Railway domain!
const API_URL = 'https://your-nest-api-production.up.railway.app'; 

const COURSE_API = `${API_URL}/courses`;
const STUDENT_API = `${API_URL}/students`;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("EduPortal Script Active");
    initApp();
});

function initApp() {
    // Page Routing Logic
    if (document.getElementById('courseCount')) updateDashboard();
    if (document.getElementById('courseList'))  fetchCourses();
    if (document.getElementById('studentList')) fetchStudents();
}

// --- 1. Dashboard Logic ---
async function updateDashboard() {
    try {
        const [cRes, sRes] = await Promise.all([
            fetch(COURSE_API),
            fetch(STUDENT_API)
        ]);

        const courses = await cRes.json();
        const students = await sRes.json();

        const cCount = document.getElementById('courseCount');
        const sCount = document.getElementById('studentCount');

        if (cCount) cCount.innerText = Array.isArray(courses) ? courses.length : 0;
        if (sCount) sCount.innerText = Array.isArray(students) ? students.length : 0;
    } catch (err) {
        console.error("Dashboard sync error:", err);
    }
}

// --- 2. Course Logic ---
async function fetchCourses() {
    const list = document.getElementById('courseList');
    if (!list) return;

    try {
        const response = await fetch(COURSE_API);
        const data = await response.json();
        const courses = Array.isArray(data) ? data : [];

        list.innerHTML = courses.map(course => `
            <tr>
                <td>#${course.id}</td>
                <td style="color: var(--accent); font-weight: bold;">${course.title}</td>
                <td class="text-muted small">${course.description}</td>
                <td><span style="background: rgba(110,231,183,0.1); color: var(--accent); padding: 4px 8px; border-radius: 6px; font-size: 0.8rem;">${course.credits} Credits</span></td>
                <td class="text-end">
                    <button class="btn btn-sm text-danger border-0" onclick="deleteCourse(${course.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        console.error("Course fetch error:", err);
    }
}

async function deleteCourse(id) {
    if (!confirm('Delete this course permanently?')) return;
    
    try {
        const response = await fetch(`${COURSE_API}/${id}`, { method: 'DELETE' });
        if (response.ok) fetchCourses();
    } catch (err) {
        alert("Action failed. Is the Railway server sleeping?");
    }
}

// --- 3. Student Logic ---
async function fetchStudents() {
    const list = document.getElementById('studentList');
    if (!list) return;

    try {
        const response = await fetch(STUDENT_API);
        const data = await response.json();
        const students = Array.isArray(data) ? data : [];

        list.innerHTML = students.map(student => `
            <tr>
                <td>#${student.id}</td>
                <td style="font-weight: bold;">${student.name}</td>
                <td class="text-muted">${student.email}</td>
                <td class="text-end">
                    <button class="btn btn-sm text-danger border-0" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        console.warn("Student API endpoint not found on Railway yet.");
    }
}
