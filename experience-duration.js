/**
 * Work Experience Duration Calculator
 * 
 * This script calculates and displays the duration of work experience
 * beside company names based on start dates and end dates (or current date if ongoing).
 */

// Parse date string in 'MMM YYYY' format (e.g., 'Sep 2023')
// Handles both 'Sep' and 'Sept' month abbreviations
function parseDate(dateStr) {
  const [monthStr, yearStr] = dateStr.split(' ');
  const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Sept': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  return new Date(parseInt(yearStr), monthMap[monthStr], 1);
}

// Calculate the duration between a start date and end date (or current date if no end date)
function calculateDuration(startDateStr, endDateStr) {
  const startDate = parseDate(startDateStr);
  
  // Determine end date - either provided end date or current date
  const endDate = endDateStr ? parseDate(endDateStr) : new Date();
  
  // Calculate difference in years and months
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  
  // Adjust if months is negative
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Format the duration string
  let durationStr = '';
  if (years > 0) {
    durationStr += `${years} yr`;
    if (years > 1) durationStr += 's';
    if (months > 0) durationStr += ' ';
  }
  
  if (months > 0 || years === 0) {
    durationStr += `${months} mo`;
  }
  
  return durationStr;
}

// Display the duration for all company experiences
function displayExperienceDuration() {
  // Find all elements with the data-start-date attribute
  const experienceElements = document.querySelectorAll('[data-start-date]');
  
  experienceElements.forEach(element => {
    const startDate = element.getAttribute('data-start-date');
    const endDate = element.getAttribute('data-end-date');
    const duration = calculateDuration(startDate, endDate);
    
    // Create a span to display the duration
    const durationSpan = document.createElement('span');
    durationSpan.className = 'duration-text';
    durationSpan.textContent = `ㆍ${duration}`;
    
    // Add class for current positions (no end date)
    if (!endDate) {
      // Find the closest timeline-item to apply styling
      const parent = element.closest('.timeline-item') || element.parentNode;
      if (parent) {
        parent.classList.add('active-position');
      } else {
        element.classList.add('active-position');
      }
    }
    
    // Append it to the company name
    element.appendChild(durationSpan);
  });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayExperienceDuration);
