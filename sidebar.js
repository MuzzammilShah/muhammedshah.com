/* =================================== */
/* Sidebar Configuration & Generator   */
/* =================================== */

/**
 * SIDEBAR CONFIGURATION
 * 
 * To add, remove, or reorder menu items, simply edit this array.
 * Each item needs:
 *   - name: Display text for the menu item
 *   - path: URL path (use '/' for home, '/folder-name/' for subpages)
 * 
 * The active state is automatically determined based on the current URL.
 */
const sidebarConfig = {
  menuItems: [
    { name: 'Overview', path: '/' },
    { name: 'My Space', path: '/my-space/' },
    { name: 'Work Experience', path: '/work-experience/' },
    { name: 'Work Projects', path: '/work-projects/' },
    { name: 'Certifications', path: '/certifications/' },
    { name: 'Personal Projects', path: '/personal-projects/' },
    { name: 'Education', path: '/education/' }
  ],
  footerImage: {
    light: '/static/images/sidebar-1.png',
    dark: '/static/images/sidebar-2.png',
    alt: 'mms.'
  }
};

/**
 * Determines if a menu item should be marked as active
 * based on the current page URL
 */
function isActivePage(itemPath) {
  const currentPath = window.location.pathname;
  
  // Handle home page
  if (itemPath === '/') {
    return currentPath === '/' || currentPath === '/index.html';
  }
  
  // For other pages, check if current path starts with the item path
  // This handles both '/work-experience/' and '/work-experience/index.html'
  return currentPath.startsWith(itemPath);
}

/**
 * Generates and injects the sidebar HTML into the page
 */
function generateSidebar() {
  const sidebarElement = document.getElementById('sidebar');
  if (!sidebarElement) return;

  // Get current theme for footer image
  const savedTheme = localStorage.getItem('theme');
  const footerImageSrc = savedTheme === 'dark' 
    ? sidebarConfig.footerImage.dark 
    : sidebarConfig.footerImage.light;

  // Build menu items HTML
  const menuItemsHTML = sidebarConfig.menuItems
    .map(item => {
      const activeClass = isActivePage(item.path) ? ' class="active"' : '';
      return `      <li><a href="${item.path}"${activeClass}>${item.name}</a></li>`;
    })
    .join('\n');

  // Build complete sidebar HTML
  const sidebarHTML = `
    <ul>
${menuItemsHTML}
    </ul>
    <div class="sidebar-footer">
      <div class="footer-image">
        <img src="${footerImageSrc}" alt="${sidebarConfig.footerImage.alt}" id="footer-image">
      </div>
    </div>`;

  sidebarElement.innerHTML = sidebarHTML;
}

// Generate sidebar when DOM is ready
document.addEventListener('DOMContentLoaded', generateSidebar);
