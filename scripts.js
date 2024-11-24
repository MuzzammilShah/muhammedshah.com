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

// Open Search Modal
function openSearch() {
  const modal = document.getElementById('search-modal');
  modal.style.display = 'flex';
  const searchInput = document.getElementById('search-input');
  searchInput.focus();
  searchInput.value = ''; // Clear the search input on opening the modal
  document.getElementById('search-results').innerHTML = ''; // Clear previous results
  document.addEventListener('click', closeSearchOnOutsideClick);
}

// Close Search Modal
function closeSearch() {
  const modal = document.getElementById('search-modal');
  modal.style.display = 'none';
  document.getElementById('search-results').innerHTML = ''; // Clear search results
  document.getElementById('search-input').value = ''; // Clear search input
  document.removeEventListener('click', closeSearchOnOutsideClick);
}

// Close Search Modal on Outside Click
function closeSearchOnOutsideClick(event) {
  const modal = document.getElementById('search-modal');
  if (!modal.contains(event.target) && event.target.id !== 'search-button') {
    closeSearch();
  }
}

// Define the pages to search through
const pagesToSearch = [
  { name: "Overview", path: "index.html" },
  { name: "Work Experience", path: "work-experience.html" },
  { name: "Work Projects", path: "work-projects.html" },
  { name: "Certifications", path: "certifications.html" },
  { name: "Personal Projects", path: "personal-projects.html" },
  { name: "Education", path: "education.html" }
];

async function searchContent() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const results = document.getElementById('search-results');
  results.innerHTML = ''; // Clear previous results

  if (!query) return; // Exit if no query is entered

  const matches = [];

  // Fetch and process content from all pages
  const fetchPromises = pagesToSearch.map(page => fetchPageContent(page));

  try {
    const pageContents = await Promise.all(fetchPromises);

    // Process each page's content
    pageContents.forEach((content, index) => {
      const page = pagesToSearch[index];
      const sanitizedContent = sanitizeContent(content); // Clean content

      // Split sanitized content into sentences
      const sentences = sanitizedContent.match(/[^.!?]*[.!?]/g) || []; // Split by sentences

      // Find matching sentences
      sentences.forEach(sentence => {
        if (sentence.toLowerCase().includes(query)) {
          matches.push({
            page: page,
            sentence: sentence.trim()
          });
        }
      });
    });

    // Display the results
    displaySearchResults(matches, query, results);
  } catch (error) {
    console.error("Error fetching page content:", error);
    results.innerHTML = '<li>Error loading search results</li>';
  }
}

// Fetch page content and return its text
async function fetchPageContent(page) {
  try {
    const response = await fetch(page.path);
    if (!response.ok) throw new Error(`Failed to fetch ${page.path}`);

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Extract visible text only
    return doc.body.textContent || '';
  } catch (error) {
    console.error(`Error fetching ${page.path}:`, error);
    return ''; // Return empty string on error
  }
}

// Clean and sanitize fetched content
function sanitizeContent(content) {
  return content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove <script> tags
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/^\s+|\s+$/gm, '') // Trim leading/trailing whitespace
    .replace(/\s+/g, ' '); // Normalize all spaces
}

// Display results in a cleaner format
function displaySearchResults(matches, query, resultsContainer) {
  if (matches.length === 0) {
    resultsContainer.innerHTML = '<li>No results found</li>';
    return;
  }

  matches.forEach(match => {
    // Highlight the matched query in the sentence
    const highlightedSentence = match.sentence.replace(
      new RegExp(query, 'gi'),
      match => `<span style="background-color: yellow;">${match}</span>`
    );

    // Display the matched sentence
    resultsContainer.innerHTML += `
      <li onclick="navigateToPage('${match.page.path}')">
        <strong>${match.page.name}</strong> (${match.page.path})
        <div>${highlightedSentence}</div>
      </li>
    `;
  });
}

// Navigate to the page of the result and clear the search input
function navigateToPage(path) {
  document.getElementById('search-input').value = ''; // Clear search input
  window.location.href = path;
}

// Close Search Modal on Escape Key Press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearch();
  }
});