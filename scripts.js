/* =================================== */
/* Global Script (All Pages) */
/* =================================== */

function toggleTheme() {
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const footerImage = document.getElementById('footer-image'); // Reference to the image element

    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        footerImage.src = '/static/images/sidebar-2.png'; // Change to dark theme image
        localStorage.setItem('theme', 'dark');
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        footerImage.src = '/static/images/sidebar-1.png'; // Change to light theme image
        localStorage.setItem('theme', 'light');
    }
}

// Immediately invoked function to apply saved theme and corresponding image
(function () {
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');
  const footerImage = document.getElementById('footer-image'); // Reference to the image element

  if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      document.querySelector('.sun-icon').style.display = 'none';
      document.querySelector('.moon-icon').style.display = 'block';
      footerImage.src = '/static/images/sidebar-2.png'; // Apply dark theme image
  } else {
      body.classList.remove('dark-theme');
      document.querySelector('.sun-icon').style.display = 'block';
      document.querySelector('.moon-icon').style.display = 'none';
      footerImage.src = '/static/images/sidebar-1.png'; // Apply light theme image explicitly
  }
})();

  
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');

  if (sidebar.classList.contains('open')) {
    // Add a global click listener when the sidebar is open
    document.addEventListener('click', closeSidebarOnClickOutside);
  } else {
    // Remove the listener when the sidebar is closed
    document.removeEventListener('click', closeSidebarOnClickOutside);
  }
}

function closeSidebarOnClickOutside(event) {
  const sidebar = document.getElementById('sidebar');
  const menuIcon = document.querySelector('.menu-icon');

  // Check if the click is outside the sidebar and the menu icon
  if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
    sidebar.classList.remove('open');
    // Clean up the event listener
    document.removeEventListener('click', closeSidebarOnClickOutside);
  }
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

// Open Search Modal
// Get the current page name from the sidebar link
function getPageName() {
  const activeLink = document.querySelector('.sidebar a.active');
  if (activeLink) {
    return activeLink.textContent; // Use text of the active link (e.g., 'Work Experience')
  }
  return 'Overview'; // Default to 'Overview' if no active link is found
}

// Open the search modal and update the placeholder dynamically
function openSearch() {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const pageName = getPageName();
  searchInput.placeholder = `(Beta) Search in ${pageName}`;
  searchModal.style.display = 'flex'; // Show the modal
  
  // Clear the search input and results when opening
  searchInput.value = '';
  document.getElementById('search-results').innerHTML = '';
  searchInput.focus(); // Auto-focus the input field
}

// Close the search modal
function closeSearch() {
  const searchModal = document.getElementById('search-modal');
  searchModal.style.display = 'none'; // Hide the modal
  
  // Clear the search input and results when closing
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
}

// Add your search functionality here...
const sectionsToSearch = [];

// Get all sections with class 'searchable-section'
const sectionElements = document.querySelectorAll('.searchable-section');

sectionElements.forEach(section => {
  sectionsToSearch.push({
    name: section.getAttribute('data-name'),  // Use 'data-name' attribute for the name
    id: section.id
  });
});

let debounceTimeout;

// Function to perform the search operation
function searchContent() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const results = document.getElementById('search-results');
  results.innerHTML = ''; // Clear previous results

  if (!query) return; // Exit if no query is entered

  // Clear previous timeout to reset the debounce
  clearTimeout(debounceTimeout);

  // Set a new timeout to execute the search after 300ms of idle time
  debounceTimeout = setTimeout(() => {
    const matches = [];

    // Loop through all the sections and search for the query in the section text
    sectionsToSearch.forEach(section => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        const sectionText = sectionElement.textContent.toLowerCase();

        // If the section text contains the query
        if (sectionText.includes(query)) {
          // Extract sentences that contain the query
          const sentences = sectionElement.textContent.split('.').filter(sentence => sentence.toLowerCase().includes(query));
          
          sentences.forEach(sentence => {
            matches.push({
              section: section,
              sentence: sentence.trim()
            });
          });
        }
      }
    });

    // Display the results
    displaySearchResults(matches, query, results);
  }, 300); // Adjust the debounce delay (in ms) as necessary
}

// Function to display results in a cleaner format
function displaySearchResults(matches, query, resultsContainer) {
  if (matches.length === 0) {
    resultsContainer.innerHTML = '<li>No results found</li>';
    return;
  }

  // Clear previous results
  resultsContainer.innerHTML = '';

  matches.forEach(match => {
    // Use a regular expression to highlight the matched query (case insensitive)
    const highlightedSentence = match.sentence.replace(
      new RegExp(`(${query})`, 'gi'), // Case insensitive regex matching the word
      (match) => `<span class="highlight">${match}</span>`
    );

    // Display only the matching line (sentence) along with the section name
    resultsContainer.innerHTML += `
      <li class="result-item" onclick="navigateToSection('${match.section.id}')">
        <strong>${match.section.name}</strong>: <em>${highlightedSentence}.</em>
      </li>
    `;
  });
}

// Function to navigate to the section of the result
function navigateToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    // Highlight the target section temporarily for better visibility
    section.classList.add('highlighted-section');
    setTimeout(() => {
      section.classList.remove('highlighted-section');
    }, 2000); // Remove highlight after 2 seconds
  }

  // Clear the search bar when a result is clicked
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
  closeSearch(); // Close the modal after navigation (optional)
}

// Close Search Modal on Escape Key Press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearch();
  }
});

// Close Search Modal when clicking anywhere on the screen (outside the modal)
window.addEventListener('click', function(event) {
  const searchModal = document.getElementById('search-modal');
  // Check if the click was outside the modal
  if (event.target === searchModal) {
    closeSearch();
  }
});