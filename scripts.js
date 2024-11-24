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

// // Open Search Modal
// function openSearch() {
//   const modal = document.getElementById('search-modal');
//   modal.style.display = 'flex';
//   const searchInput = document.getElementById('search-input');
//   searchInput.focus();
//   searchInput.value = ''; // Clear the search input on opening the modal
//   document.getElementById('search-results').innerHTML = ''; // Clear previous results
//   document.addEventListener('click', closeSearchOnOutsideClick);
// }

// // Close Search Modal
// function closeSearch() {
//   const modal = document.getElementById('search-modal');
//   modal.style.display = 'none';
//   document.getElementById('search-results').innerHTML = ''; // Clear search results
//   document.getElementById('search-input').value = ''; // Clear search input
//   document.removeEventListener('click', closeSearchOnOutsideClick);
// }

// // Close Search Modal on Outside Click
// function closeSearchOnOutsideClick(event) {
//   const modal = document.getElementById('search-modal');
//   if (!modal.contains(event.target) && event.target.id !== 'search-button') {
//     closeSearch();
//   }
// }

// // Define the pages to search through
// const pagesToSearch = [
//   { name: "Overview", path: "index.html" },
//   { name: "Work Experience", path: "work-experience.html" },
//   { name: "Work Projects", path: "work-projects.html" },
//   { name: "Certifications", path: "certifications.html" },
//   { name: "Personal Projects", path: "personal-projects.html" },
//   { name: "Education", path: "education.html" }
// ];

// let debounceTimeout;

// function searchContent() {
//   const query = document.getElementById('search-input').value.toLowerCase();
//   const results = document.getElementById('search-results');
//   results.innerHTML = ''; // Clear previous results

//   if (!query) return; // Exit if no query is entered

//   // Clear previous timeout to reset the debounce
//   clearTimeout(debounceTimeout);

//   // Set a new timeout to execute the search after 300ms of idle time
//   debounceTimeout = setTimeout(async () => {
//     const matches = [];
//     console.log("Search query:", query);  // Debugging line

//     // Fetch and process content from all pages
//     const fetchPromises = pagesToSearch.map(page => fetchPageContent(page));

//     for (let pagePromise of fetchPromises) {
//       try {
//         const pageContents = await pagePromise;
//         const sanitizedContent = sanitizeContent(pageContents); // Clean content
//         console.log("Sanitized content:", sanitizedContent);  // Debugging line

//         // Split sanitized content into sentences
//         const sentences = sanitizedContent.match(/[^.!?]*[.!?]/g) || []; // Split by sentences

//         // Find matching sentences
//         sentences.forEach(sentence => {
//           if (sentence.toLowerCase().includes(query)) {
//             matches.push({
//               page: page,
//               sentence: sentence.trim()
//             });
//           }
//         });
//       } catch (error) {
//         console.error("Error processing page content:", error);
//       }
//     }

//     // Display the results
//     displaySearchResults(matches, query, results);
//   }, 300); // Adjust the debounce delay (in ms) as necessary
// }

// const pageCache = {};

// async function fetchPageContent(page) {
//   if (pageCache[page.path]) {
//     return pageCache[page.path]; // Return cached content if available
//   }

//   try {
//     const response = await fetch(page.path);
//     if (!response.ok) throw new Error(`Failed to fetch ${page.path}`);

//     const html = await response.text();
//     const doc = new DOMParser().parseFromString(html, 'text/html');

//     // Extract visible text only
//     const content = doc.body.textContent || '';
//     pageCache[page.path] = content; // Cache the content for future use
    
//     console.log(`Fetched content for ${page.path}:`, content);  // Debugging line
//     return content;
//   } catch (error) {
//     console.error(`Error fetching ${page.path}:`, error);
//     return ''; // Return empty string on error
//   }
// }

// // Clean and sanitize fetched content
// function sanitizeContent(content) {
//   return content
//     .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove <script> tags
//     .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
//     .replace(/^\s+|\s+$/gm, '') // Trim leading/trailing whitespace
//     .replace(/\s+/g, ' '); // Normalize all spaces
// }

// // Display results in a cleaner format
// function displaySearchResults(matches, query, resultsContainer) {
//   if (matches.length === 0) {
//     resultsContainer.innerHTML = '<li>No results found</li>';
//     console.log("No matches found!");  // Debugging line
//     return;
//   }

//   // Clear previous results
//   resultsContainer.innerHTML = '';

//   console.log("Matches found:", matches);  // Debugging line

//   matches.forEach(match => {
//     // Use a regular expression to highlight the matched query (case insensitive)
//     const highlightedSentence = match.sentence.replace(
//       new RegExp(`(${query})`, 'gi'), // Case insensitive regex matching the word
//       (match) => `<span style="background-color: yellow; font-weight: bold;">${match}</span>`
//     );

//     // Display only the line containing the matched word along with the page section name
//     resultsContainer.innerHTML += `
//       <li onclick="navigateToPage('${match.page.path}')">
//         <strong>${match.page.name}</strong> - <em>${highlightedSentence}</em>
//       </li>
//     `;
//   });
// }

// // Navigate to the page of the result and clear the search input
// function navigateToPage(path) {
//   document.getElementById('search-input').value = ''; // Clear search input
//   window.location.href = path;
// }

// // Close Search Modal on Escape Key Press
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape') {
//     closeSearch();
//   }
// });


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
  searchInput.placeholder = `Search on ${pageName}`;
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
      (match) => `<span>${match}</span>`
    );

    // Display only the matching line (sentence) along with the section name
    resultsContainer.innerHTML += `
      <li onclick="navigateToSection('${match.section.id}')">
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