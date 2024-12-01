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
// function getPageName() {
//   const activeLink = document.querySelector('.sidebar a.active');
//   if (activeLink) {
//     return activeLink.textContent; // Use text of the active link (e.g., 'Work Experience')
//   }
//   return 'Overview'; // Default to 'Overview' if no active link is found
// }

// // Open the search modal and update the placeholder dynamically
// function openSearch() {
//   const searchModal = document.getElementById('search-modal');
//   const searchInput = document.getElementById('search-input');
//   const pageName = getPageName();
//   searchInput.placeholder = `(Beta) Search in ${pageName}`;
//   searchModal.style.display = 'flex'; // Show the modal
  
//   // Clear the search input and results when opening
//   searchInput.value = '';
//   document.getElementById('search-results').innerHTML = '';
//   searchInput.focus(); // Auto-focus the input field
// }

// // Close the search modal
// function closeSearch() {
//   const searchModal = document.getElementById('search-modal');
//   searchModal.style.display = 'none'; // Hide the modal
  
//   // Clear the search input and results when closing
//   document.getElementById('search-input').value = '';
//   document.getElementById('search-results').innerHTML = '';
// }

// // Add your search functionality here...
// const sectionsToSearch = [];

// // Get all sections with class 'searchable-section'
// const sectionElements = document.querySelectorAll('.searchable-section');

// sectionElements.forEach(section => {
//   sectionsToSearch.push({
//     name: section.getAttribute('data-name'),  // Use 'data-name' attribute for the name
//     id: section.id
//   });
// });

// let debounceTimeout;

// // Function to perform the search operation
// function searchContent() {
//   const query = document.getElementById('search-input').value.toLowerCase();
//   const results = document.getElementById('search-results');
//   results.innerHTML = ''; // Clear previous results

//   if (!query) return; // Exit if no query is entered

//   // Clear previous timeout to reset the debounce
//   clearTimeout(debounceTimeout);

//   // Set a new timeout to execute the search after 300ms of idle time
//   debounceTimeout = setTimeout(() => {
//     const matches = [];

//     // Loop through all the sections and search for the query in the section text
//     sectionsToSearch.forEach(section => {
//       const sectionElement = document.getElementById(section.id);
//       if (sectionElement) {
//         const sectionText = sectionElement.textContent.toLowerCase();

//         // If the section text contains the query
//         if (sectionText.includes(query)) {
//           // Extract sentences that contain the query
//           const sentences = sectionElement.textContent.split('.').filter(sentence => sentence.toLowerCase().includes(query));
          
//           sentences.forEach(sentence => {
//             matches.push({
//               section: section,
//               sentence: sentence.trim()
//             });
//           });
//         }
//       }
//     });

//     // Display the results
//     displaySearchResults(matches, query, results);
//   }, 300); // Adjust the debounce delay (in ms) as necessary
// }

// // Function to display results in a cleaner format
// function displaySearchResults(matches, query, resultsContainer) {
//   if (matches.length === 0) {
//     resultsContainer.innerHTML = '<li>No results found</li>';
//     return;
//   }

//   // Clear previous results
//   resultsContainer.innerHTML = '';

//   matches.forEach(match => {
//     // Use a regular expression to highlight the matched query (case insensitive)
//     const highlightedSentence = match.sentence.replace(
//       new RegExp(`(${query})`, 'gi'), // Case insensitive regex matching the word
//       (match) => `<span class="highlight">${match}</span>`
//     );

//     // Display only the matching line (sentence) along with the section name
//     resultsContainer.innerHTML += `
//       <li class="result-item" onclick="navigateToSection('${match.section.id}')">
//         <strong>${match.section.name}</strong>: <em>${highlightedSentence}.</em>
//       </li>
//     `;
//   });
// }

// // Function to navigate to the section of the result
// function navigateToSection(id) {
//   const section = document.getElementById(id);
//   if (section) {
//     section.scrollIntoView({ behavior: 'smooth' });
//     // Highlight the target section temporarily for better visibility
//     section.classList.add('highlighted-section');
//     setTimeout(() => {
//       section.classList.remove('highlighted-section');
//     }, 2000); // Remove highlight after 2 seconds
//   }

//   // Clear the search bar when a result is clicked
//   document.getElementById('search-input').value = '';
//   document.getElementById('search-results').innerHTML = '';
//   closeSearch(); // Close the modal after navigation (optional)
// }

// // Close Search Modal on Escape Key Press
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape') {
//     closeSearch();
//   }
// });

// // Close Search Modal when clicking anywhere on the screen (outside the modal)
// window.addEventListener('click', function(event) {
//   const searchModal = document.getElementById('search-modal');
//   // Check if the click was outside the modal
//   if (event.target === searchModal) {
//     closeSearch();
//   }
// });


// List of pages to include in the search index
const pagesToIndex = [
  { page: 'Overview', url: '/' },
  { page: 'Work Experience', url: '/work-experience/' },
  { page: 'Work Projects', url: '/work-projects/' },
  { page: 'Certifications', url: '/certifications/' },
  { page: 'Personal Projects', url: '/personal-projects/' },
  { page: 'Education', url: '/education/' }
];

let searchIndex = [];
let isIndexBuilding = false;
let indexBuilt = false;

// Function to build the search index dynamically
async function buildSearchIndex() {
  if (indexBuilt || isIndexBuilding) {
    // Index is already built or in the process of building
    return;
  }

  isIndexBuilding = true;

  const fetchPromises = pagesToIndex.map(async (pageInfo) => {
    try {
      const response = await fetch(pageInfo.url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const sections = [];

      doc.querySelectorAll('.searchable-section').forEach(section => {
        const id = section.getAttribute('id');
        const name = section.getAttribute('data-name') || section.querySelector('h3')?.textContent || '';
        const content = section.textContent.replace(/\s+/g, ' ').trim();

        sections.push({
          id: id,
          name: name,
          content: content
        });
      });

      searchIndex.push({
        page: pageInfo.page,
        url: pageInfo.url,
        sections: sections
      });
    } catch (error) {
      console.error(`Error fetching page ${pageInfo.url}:`, error);
    }
  });

  await Promise.all(fetchPromises);

  isIndexBuilding = false;
  indexBuilt = true;

  console.log('Search index built:', searchIndex);
}

// Open the search modal and build the search index if not already built
async function openSearch() {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  searchInput.placeholder = `Search across pages`;
  searchModal.style.display = 'flex'; // Show the modal

  // Clear the search input and results when opening
  searchInput.value = '';
  document.getElementById('search-results').innerHTML = '';
  searchInput.focus(); // Auto-focus the input field

  // Build the search index if it hasn't been built yet
  if (!indexBuilt) {
    await buildSearchIndex();
  }
}

// Close the search modal
function closeSearch() {
  const searchModal = document.getElementById('search-modal');
  searchModal.style.display = 'none'; // Hide the modal

  // Clear the search input and results when closing
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
}

// Debounce timeout variable
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
  debounceTimeout = setTimeout(async () => {
    if (!indexBuilt) {
      results.innerHTML = '<li>Building search index, please wait...</li>';
      await buildSearchIndex();
    }

    const matches = [];

    // Loop through all the pages and their sections to search for the query
    searchIndex.forEach(page => {
      page.sections.forEach(section => {
        const sectionText = section.content.toLowerCase();

        // If the section text contains the query
        if (sectionText.includes(query)) {
          // Extract sentences that contain the query
          const sentences = section.content.split('.').filter(sentence => sentence.toLowerCase().includes(query));

          sentences.forEach(sentence => {
            matches.push({
              page: page.page,
              url: page.url,
              sectionId: section.id,
              sectionName: section.name,
              sentence: sentence.trim()
            });
          });
        }
      });
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
      (matched) => `<span class="highlight">${matched}</span>`
    );

    // Display the matching line (sentence) along with the page and section name
    resultsContainer.innerHTML += `
      <li class="result-item" onclick="navigateToSection('${match.url}', '${match.sectionId}')">
        <strong>${match.page} page > ${match.sectionName}</strong>: <em>${highlightedSentence}.</em>
      </li>
    `;
  });
}

// Function to navigate to the section of the result
function navigateToSection(url, id) {
  // Close the search modal
  closeSearch();

  // Check if navigating within the same page
  const currentUrl = window.location.pathname;
  const targetUrl = new URL(url, window.location.origin).pathname;

  if (currentUrl === targetUrl) {
    // Navigate within the same page
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      highlightSection(section);
    }
  } else {
    // Navigate to a different page
    // Save the target id in sessionStorage to highlight after navigation
    sessionStorage.setItem('highlightSectionId', id);
    window.location.href = `${url}#${id}`;
  }
}

// Function to highlight a section
function highlightSection(section) {
  // Remove any existing highlights
  document.querySelectorAll('.highlighted-section').forEach(el => {
    el.classList.remove('highlighted-section');
  });
  // Highlight the target section temporarily
  section.classList.add('highlighted-section');
  setTimeout(() => {
    section.classList.remove('highlighted-section');
  }, 2000); // Adjust the duration as needed
}

// Highlight section on page load (for navigation to other pages)
window.addEventListener('load', function() {
  const idFromStorage = sessionStorage.getItem('highlightSectionId');
  if (idFromStorage) {
    sessionStorage.removeItem('highlightSectionId');
    const section = document.getElementById(idFromStorage);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      highlightSection(section);
    }
  } else {
    const id = window.location.hash.substring(1);
    if (id) {
      const section = document.getElementById(id);
      if (section) {
        highlightSection(section);
      }
    }
  }
});

// Highlight section on hash change (for same-page navigation)
window.addEventListener('hashchange', function() {
  const id = window.location.hash.substring(1);
  const section = document.getElementById(id);
  if (section) {
    highlightSection(section);
  }
});

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