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
    if (footerImage) footerImage.src = '/static/images/sidebar-2.png'; // Apply dark theme image
  } else {
    body.classList.remove('dark-theme');
    document.querySelector('.sun-icon').style.display = 'block';
    document.querySelector('.moon-icon').style.display = 'none';
    if (footerImage) footerImage.src = '/static/images/sidebar-1.png'; // Apply light theme image
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
        
        // For work projects page, make sure we get all content including what will be in expandable sections
        let content = section.textContent.replace(/\s+/g, ' ').trim();
        
        // Remove "Read more" and "Read less" text if it exists
        content = content.replace(/Read more|Read less/g, '');

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

// Default search suggestions
const defaultSuggestions = [
  "Artificial Intelligence",
  "Machine Learning",
  "Neural Network",
  "Documentation",
  "Web Development"
];

async function openSearch() {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const clearButton = document.getElementById('search-clear-button');

  searchModal.style.display = 'flex';
  searchInput.focus();
  searchInput.value = '';
  clearButton.style.display = 'none';
  
  // Show default suggestions
  showDefaultSuggestions(resultsContainer);

  if (!indexBuilt) await buildSearchIndex();
}

function showDefaultSuggestions(container) {
  const suggestionsHTML = defaultSuggestions.map(suggestion => 
    `<li class="search-suggestion" onclick="selectSuggestion('${suggestion}')">
      <span>${suggestion}</span>
    </li>`
  ).join('');
  
  container.innerHTML = `
    <li class="suggestion-header">Frequently searched:</li>
    ${suggestionsHTML}
  `;
}

function closeSearch() {
  document.getElementById('search-modal').style.display = 'none';
}

function clearSearch() {
  const searchInput = document.getElementById('search-input');
  const clearButton = document.getElementById('search-clear-button');
  const resultsContainer = document.getElementById('search-results');
  
  searchInput.value = '';
  clearButton.style.display = 'none';
  showDefaultSuggestions(resultsContainer);
  searchInput.focus();
}

function selectSuggestion(suggestion) {
  const searchInput = document.getElementById('search-input');
  searchInput.value = suggestion;
  searchContent(); // Trigger search with the selected suggestion
}

let debounceTimeout;
function searchContent() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('search-results');
  const clearButton = document.getElementById('search-clear-button');

  clearTimeout(debounceTimeout);
  
  // Show/hide clear button based on input content
  if (query) {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
    showDefaultSuggestions(resultsContainer);
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
              // Check if this is a work project section
              if (section.classList.contains('searchable-section')) {
                  // Find the expandable content within this section and expand it
                  const expandableContent = section.querySelector('.project-expandable-content');
                  const readMoreBtn = section.querySelector('.read-more-button');
                  
                  if (expandableContent && readMoreBtn) {
                      readMoreBtn.innerHTML = 'Read less <svg class="arrow up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>';
                      // Add slight delay for smoother visual transition
                      setTimeout(() => {
                          expandableContent.classList.add('expanded');
                      }, 50);
                  }
              }
              
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
      // Check if this is a work project section
      if (section.classList.contains('searchable-section') && window.location.pathname.includes('/work-projects/')) {
        // Find the expandable content within this section and expand it
        setTimeout(() => {
          const expandableContent = section.querySelector('.project-expandable-content');
          const readMoreBtn = section.querySelector('.read-more-button');
          
          if (expandableContent && readMoreBtn) {
            readMoreBtn.innerHTML = 'Read less <svg class="arrow up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>';
            // Add slight delay for smoother visual transition
            setTimeout(() => {
              expandableContent.classList.add('expanded');
            }, 50);
          }
        }, 600);
      }
      
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      highlightSection(section);
    }
  } else {
    const id = window.location.hash.substring(1);
    if (id) {
      const section = document.getElementById(id);
      if (section) {
        // Check if this is a work project section
        if (section.classList.contains('searchable-section') && window.location.pathname.includes('/work-projects/')) {
          // Find the expandable content within this section and expand it
          setTimeout(() => {
            const expandableContent = section.querySelector('.project-expandable-content');
            const readMoreBtn = section.querySelector('.read-more-button');
            
            if (expandableContent && readMoreBtn) {
              expandableContent.classList.add('expanded');
              readMoreBtn.innerHTML = 'Read less <svg class="arrow up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>';
            }
          }, 500);
        }
        
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
  
  // Initialize work project read more/less functionality
  initWorkProjectsExpand();
});


// Work Projects Expandable Content
function initWorkProjectsExpand() {
  // Check if we're on the work projects page
  const workProjectSections = document.querySelectorAll('.work-project');
  if (!workProjectSections.length || !window.location.pathname.includes('/work-projects/')) return;

  workProjectSections.forEach(project => {
    // Find the timeline paragraph
    const paragraphs = project.querySelectorAll('p');
    let timelineParagraph = null;
    
    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i];
      if (p.textContent.includes('Timeline:')) {
        timelineParagraph = p;
        break;
      }
    }
    
    if (!timelineParagraph) return;
    
    // Create expandable content container
    const expandableContent = document.createElement('div');
    expandableContent.className = 'project-expandable-content';
    
    // Move all content after timeline paragraph to the expandable container
    let currentNode = timelineParagraph.nextSibling;
    const nodesToMove = [];
    
    while (currentNode) {
      nodesToMove.push(currentNode);
      currentNode = currentNode.nextSibling;
    }
    
    nodesToMove.forEach(node => {
      expandableContent.appendChild(node);
    });
    
    // Create read more/less button with arrow
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'read-more-button';
    readMoreBtn.innerHTML = 'Read more <svg class="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>';
    
    // Insert button and expandable content
    timelineParagraph.parentNode.insertBefore(readMoreBtn, timelineParagraph.nextSibling);
    timelineParagraph.parentNode.insertBefore(expandableContent, readMoreBtn.nextSibling);
    
    // Add click event listener
    readMoreBtn.addEventListener('click', () => {
      const isExpanded = expandableContent.classList.contains('expanded');
      
      if (isExpanded) {
        // First update the button text
        readMoreBtn.innerHTML = 'Read more <svg class="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>';
        
        // Then collapse with animation
        expandableContent.classList.remove('expanded');
        
        // Scroll to the start of this section after collapsing, with timing adjusted for animation
        setTimeout(() => {
          const parentSection = project.closest('.searchable-section');
          if (parentSection) {
            parentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 600); // Increased timing to match the new CSS animation duration
      } else {
        // First update the button to show it's expanding
        readMoreBtn.innerHTML = 'Read less <svg class="arrow up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>';
        
        // Add a small delay before expanding to make the arrow animation more noticeable
        setTimeout(() => {
          expandableContent.classList.add('expanded');
        }, 50);
      }
    });
  });
  
  // Check if we arrived via a search with a hash
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Find the expandable content within this section and expand it
      setTimeout(() => {
        const expandableContent = targetSection.querySelector('.project-expandable-content');
        const readMoreBtn = targetSection.querySelector('.read-more-button');
        
        if (expandableContent && readMoreBtn) {
          readMoreBtn.innerHTML = 'Read less <svg class="arrow up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>';
          // Slight delay for better visual transition
          setTimeout(() => {
            expandableContent.classList.add('expanded');
          }, 50);
        }
      }, 600); // Delay to ensure DOM elements are ready, increased to match new animation timing
    }
  }
}

// Override the navigateToSection function to expand project content when accessed via search
// Store the original function for reference, but we're completely replacing it
// const originalNavigateToSection = navigateToSection;
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
              // Check if this is a work project section and expand it
              const expandableContent = section.querySelector('.project-expandable-content');
              const readMoreBtn = section.querySelector('.read-more-button');
              
              if (expandableContent && readMoreBtn) {
                expandableContent.classList.add('expanded');
                readMoreBtn.innerHTML = 'Read less <svg class="arrow up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>';
              }
              
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              highlightSection(section);
          }
      } else {
          sessionStorage.setItem('highlightSectionId', id);
          window.location.href = `${url}#${id}`;
      }
  }, 400); // Match the CSS transition duration
};

// Dynamic footer, Last updated and Copy rights
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.getElementById("footer");

  if (footer) {
    const currentYear = new Date().getFullYear();
    const lastModified = new Date(document.lastModified);

    const formattedDate = lastModified.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // footer.innerHTML = `
    //   <strong>Last update:</strong> ${formattedDate}<br>
    //   &copy; 2024-${currentYear} Muhammed Muzzammil Shah. All rights reserved.
    // `;
    footer.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 3px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3a9 9 0 1 0 7.14 14.58A9 9 0 0 0 13 3zm0 2a7 7 0 1 1-4.95 11.95A7 7 0 0 1 13 5zm-.5 2v5.38l4.25 2.52.75-1.23-3.5-2.08V7h-1z"/>
        </svg>
        <strong>Last update:</strong> ${formattedDate}
      </span><br>
      &copy; 2024-${currentYear} Muhammed Muzzammil Shah. All rights reserved.
    `;
  }
});



// Add to the end of scripts.js
// Typewriter effect for loading screen
if (document.getElementById('loading-screen')) {
  const text = "muhammedshah.com";
  const typewriterElement = document.getElementById('typewriter');
  let index = 0;

  function type() {
    if (index < text.length) {
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 60); // 0.3 seconds per character
    } else {
      // Typing finished, wait 2 seconds then show main content
      setTimeout(showMainContent, 1000);
    }
  }

  function showMainContent() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      const mainContent = document.getElementById('main-content');
      mainContent.style.display = 'block';
      setTimeout(() => {
        mainContent.style.opacity = '1';
      }, 10); // Small delay for transition to take effect
    }, 500); // Matches CSS transition duration
  }

  // Start the typing effect when the page loads
  window.addEventListener('load', type);
}

// SKILLS TABS

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.getAttribute('data-tab');

    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Hide all content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });

    // Show selected tab content
    const activeContent = document.querySelector(`.tab-content[data-tab-content="${tab}"]`);
    if (activeContent) activeContent.style.display = 'block';
  });
});

// BLOG POSTS CAROUSEL

document.addEventListener('DOMContentLoaded', () => {
  const blogContainer = document.getElementById('blog-posts-container');
  const leftArrow = document.getElementById('blog-nav-left');
  const rightArrow = document.getElementById('blog-nav-right');
  if (!blogContainer || !leftArrow || !rightArrow) return;

  const cards = blogContainer.querySelectorAll('.blog-post-card');
  const cardWidth = 280; // Card width
  const gap = 20; // Gap between cards
  const scrollAmount = cardWidth + gap; // Total scroll distance per card

  // Function to update arrow and view more visibility
  function updateNavigation() {
    const scrollLeft = blogContainer.scrollLeft;
    const maxScroll = blogContainer.scrollWidth - blogContainer.clientWidth;

    // Show/hide left arrow
    if (scrollLeft > 0) {
      leftArrow.classList.remove('hidden');
    } else {
      leftArrow.classList.add('hidden');
    }

    // Show/hide right arrow
    if (scrollLeft >= maxScroll - 5) { // -5 for rounding tolerance
      rightArrow.classList.add('hidden');
    } else {
      rightArrow.classList.remove('hidden');
    }
  }

  // Scroll left
  leftArrow.addEventListener('click', () => {
    blogContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  // Scroll right
  rightArrow.addEventListener('click', () => {
    blogContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Update navigation on scroll
  blogContainer.addEventListener('scroll', updateNavigation);

  // Initial navigation update
  updateNavigation();

  // Handle touch/mouse swipe for mobile and desktop
  let isDown = false;
  let startX;
  let scrollLeftStart;

  blogContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    blogContainer.style.cursor = 'grabbing';
    startX = e.pageX - blogContainer.offsetLeft;
    scrollLeftStart = blogContainer.scrollLeft;
  });

  blogContainer.addEventListener('mouseleave', () => {
    isDown = false;
    blogContainer.style.cursor = 'grab';
  });

  blogContainer.addEventListener('mouseup', () => {
    isDown = false;
    blogContainer.style.cursor = 'grab';
  });

  blogContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - blogContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    blogContainer.scrollLeft = scrollLeftStart - walk;
  });

  // Set cursor style
  blogContainer.style.cursor = 'grab';
});
