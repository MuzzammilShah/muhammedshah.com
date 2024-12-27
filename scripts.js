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
    footerImage.src = '/static/images/sidebar-1.png'; // Apply light theme image
  }
})();

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const isOpen = sidebar.classList.contains('open');

  if (isOpen) {
      closeSidebar(); // Use the same close logic as outside clicks
  } else {
      sidebar.style.visibility = 'visible'; // Ensure visibility before animation
      sidebar.classList.add('open');
      localStorage.setItem('sidebarOpen', true);
      document.addEventListener('click', closeSidebarOnClickOutside);
  }
}

function closeSidebarOnClickOutside(event) {
  const sidebar = document.getElementById('sidebar');
  const menuIcon = document.querySelector('.menu-icon');

  if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
      closeSidebar();
  }
}

// Once DOM is ready, set the sidebar state correctly
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.visibility = 'hidden'; // Ensure hidden on load
  sidebar.classList.remove('open'); // Remove "open" state
});



/* =================================== */
/* Other page-specific scripts would go below here */
/* =================================== */

// The search index and navigation functions remain the same as your original code

// const pagesToIndex = [
//   { page: 'Overview', url: '/' },
//   { page: 'Work Experience', url: '/work-experience/' },
//   { page: 'Work Projects', url: '/work-projects/' },
//   { page: 'Certifications', url: '/certifications/' },
//   { page: 'Personal Projects', url: '/personal-projects/' },
//   { page: 'Education', url: '/education/' }
// ];

// let searchIndex = [];
// let isIndexBuilding = false;
// let indexBuilt = false;

// async function buildSearchIndex() {
//   if (indexBuilt || isIndexBuilding) return;

//   isIndexBuilding = true;

//   const fetchPromises = pagesToIndex.map(async (pageInfo) => {
//     try {
//       const response = await fetch(pageInfo.url);
//       const html = await response.text();
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, 'text/html');
//       const sections = [];

//       doc.querySelectorAll('.searchable-section').forEach(section => {
//         const id = section.getAttribute('id');
//         const name = section.getAttribute('data-name') || section.querySelector('h3')?.textContent || '';
//         const content = section.textContent.replace(/\s+/g, ' ').trim();

//         sections.push({
//           id: id,
//           name: name,
//           content: content
//         });
//       });

//       searchIndex.push({
//         page: pageInfo.page,
//         url: pageInfo.url,
//         sections: sections
//       });
//     } catch (error) {
//       console.error(`Error fetching page ${pageInfo.url}:`, error);
//     }
//   });

//   await Promise.all(fetchPromises);
//   isIndexBuilding = false;
//   indexBuilt = true;
//   console.log('Search index built:', searchIndex);
// }

// async function openSearch() {
//   const searchModal = document.getElementById('search-modal');
//   const searchInput = document.getElementById('search-input');
//   searchInput.placeholder = `Search across pages`;
//   searchModal.style.display = 'flex'; // Show the modal

//   searchInput.value = '';
//   document.getElementById('search-results').innerHTML = '';
//   searchInput.focus();

//   if (!indexBuilt) {
//     await buildSearchIndex();
//   }
// }

// function closeSearch() {
//     const searchModal = document.getElementById('search-modal');
//     if (searchModal) {
//         searchModal.style.display = 'none';
//         document.getElementById('search-input').value = '';
//         document.getElementById('search-results').innerHTML = '';
//     }
// }


// let debounceTimeout;
// function searchContent() {
//   const query = document.getElementById('search-input').value.toLowerCase();
//   const results = document.getElementById('search-results');
//   results.innerHTML = '';

//   if (!query) return;

//   clearTimeout(debounceTimeout);

//   debounceTimeout = setTimeout(async () => {
//     if (!indexBuilt) {
//       results.innerHTML = '<li>Building search index, please wait...</li>';
//       await buildSearchIndex();
//     }

//     const matches = [];
//     searchIndex.forEach(page => {
//       page.sections.forEach(section => {
//         const sectionText = section.content.toLowerCase();
//         if (sectionText.includes(query)) {
//           const sentences = section.content.split('.').filter(sentence => sentence.toLowerCase().includes(query));
//           sentences.forEach(sentence => {
//             matches.push({
//               page: page.page,
//               url: page.url,
//               sectionId: section.id,
//               sectionName: section.name,
//               sentence: sentence.trim()
//             });
//           });
//         }
//       });
//     });

//     displaySearchResults(matches, query, results);
//   }, 300);
// }

// function displaySearchResults(matches, query, resultsContainer) {
//   if (matches.length === 0) {
//     resultsContainer.innerHTML = '<li>No results found</li>';
//     return;
//   }

//   resultsContainer.innerHTML = '';
//   matches.forEach(match => {
//     const highlightedSentence = match.sentence.replace(
//       new RegExp(`(${query})`, 'gi'),
//       (matched) => `<span class="highlight">${matched}</span>`
//     );

//     resultsContainer.innerHTML += `
//       <li class="result-item" onclick="navigateToSection('${match.url}', '${match.sectionId}')">
//         <strong>${match.page} page > ${match.sectionName}</strong>: <em>${highlightedSentence}.</em>
//       </li>
//     `;
//   });
// }

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

async function buildSearchIndex() {
  if (isIndexBuilding || indexBuilt) return;

  isIndexBuilding = true;

  const fetchPromises = pagesToIndex.map(async (pageInfo) => {
    try {
      const response = await fetch(pageInfo.url);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const sections = [];

      doc.querySelectorAll('.searchable-section').forEach((section) => {
        const id = section.getAttribute('id');
        const name = section.getAttribute('data-name') || section.querySelector('h3')?.textContent || '';
        const content = section.textContent.replace(/\s+/g, ' ').trim();

        sections.push({ id, name, content });
      });

      searchIndex.push({ page: pageInfo.page, url: pageInfo.url, sections });
    } catch (error) {
      console.error(`Error indexing ${pageInfo.url}:`, error);
    }
  });

  await Promise.all(fetchPromises);
  indexBuilt = true;
  isIndexBuilding = false;
}

async function openSearch() {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  searchModal.style.display = 'flex';
  searchInput.focus();
  searchInput.value = '';
  resultsContainer.innerHTML = '';

  if (!indexBuilt) await buildSearchIndex();
}

function closeSearch() {
  document.getElementById('search-modal').style.display = 'none';
}

let debounceTimeout;
function searchContent() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('search-results');

  clearTimeout(debounceTimeout);
  if (!query) {
    resultsContainer.innerHTML = '<li>Please enter a keyword to search</li>';
    return;
  }

  debounceTimeout = setTimeout(() => {
    const matches = searchIndex.flatMap((page) =>
      page.sections
        .filter((section) => section.content.toLowerCase().includes(query))
        .map((section) => ({
          page: page.page,
          url: page.url,
          sectionId: section.id,
          sectionName: section.name,
          content: section.content,
        }))
    );

    renderSearchResults(matches, query, resultsContainer);
  }, 300);
}

function renderSearchResults(matches, query, container) {
  if (!matches.length) {
    container.innerHTML = '<li>No results found</li>';
    return;
  }

  container.innerHTML = matches
    .map(
      (match) => `
      <li onclick="navigateToSection('${match.url}', '${match.sectionId}')">
        <strong>${match.page} > ${match.sectionName}</strong>
        <p>${match.content.replace(new RegExp(query, 'gi'), (m) => `<span class="highlight">${m}</span>`)}</p>
      </li>
    `
    )
    .join('');
}

function navigateToSection(url, id) {
  const sidebar = document.getElementById('sidebar');

  // Close sidebar gracefully
  closeSidebar();

  // Close the search modal regardless of the navigation type
  closeSearch();

  // Wait for the sidebar's transition to complete before navigating
  setTimeout(() => {
      const currentUrl = window.location.pathname;
      const targetUrl = new URL(url, window.location.origin).pathname;

      if (currentUrl === targetUrl) {
          const section = document.getElementById(id);
          if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              highlightSection(section);
          }
      } else {
          sessionStorage.setItem('highlightSectionId', id);
          window.location.href = `${url}#${id}`;
      }
  }, 400); // Match the CSS transition duration
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');

  // Remove the "open" class to start the closing animation
  sidebar.classList.remove('open');

  // Wait for the animation to complete before hiding the sidebar
  setTimeout(() => {
      sidebar.style.visibility = 'hidden';
  }, 400); // Match the CSS transition duration

  localStorage.setItem('sidebarOpen', false);
  document.removeEventListener('click', closeSidebarOnClickOutside);
}


function highlightSection(section) {
  document.querySelectorAll('.highlighted-section').forEach(el => {
    el.classList.remove('highlighted-section');
  });
  section.classList.add('highlighted-section');
  setTimeout(() => {
    section.classList.remove('highlighted-section');
  }, 2000);
}

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
  if (event.target === searchModal) {
    closeSearch();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const pageContainer = document.querySelector('.container'); // Target your container or body

  // Apply the fade-up class for animation
  if (pageContainer) {
      pageContainer.classList.add('fade-up');
  }
});