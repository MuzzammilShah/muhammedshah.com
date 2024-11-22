/* =================================== */
/* Global Script (All Pages) */
/* =================================== */

function toggleTheme() {
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
  
    body.classList.toggle('dark-theme');
  
    if (body.classList.contains('dark-theme')) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      localStorage.setItem('theme', 'dark');
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      localStorage.setItem('theme', 'light');
    }
  }
  
  (function () {
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
  
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      document.querySelector('.sun-icon').style.display = 'none';
      document.querySelector('.moon-icon').style.display = 'block';
    } else {
      body.classList.remove('dark-theme');
      document.querySelector('.sun-icon').style.display = 'block';
      document.querySelector('.moon-icon').style.display = 'none';
    }
  })();
  
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  }
  
  /* =================================== */
  /* Index Page Script (index.html) */
  /* =================================== */
  // Add any index-specific JavaScript here
  
  /* =================================== */
  /* Work Experience Page Script (work-experience.html) */
  /* =================================== */
  // Add any work-experience-specific JavaScript here
  
  /* =================================== */
  /* Work Projects Page Script (work-projects.html) */
  /* =================================== */
  // Add any work-projects-specific JavaScript here
  
  /* =================================== */
  /* Certifications Page Script (certifications.html) */
  /* =================================== */
  // Add any certifications-specific JavaScript here
  
  /* =================================== */
  /* Personal Projects Page Script (personal-projects.html) */
  /* =================================== */
  // Add any personal-projects-specific JavaScript here
  
  /* =================================== */
  /* Education Page Script (education.html) */
  /* =================================== */
  // Add any education-specific JavaScript here