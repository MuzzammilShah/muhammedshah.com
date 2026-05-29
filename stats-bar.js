(function () {
  // --- Date parsing (mirrors experience-duration.js logic, kept self-contained) ---
  function parseDate(dateStr) {
    const [monthStr, yearStr] = dateStr.split(' ');
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Sept': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return new Date(parseInt(yearStr), monthMap[monthStr], 1);
  }

  function monthsBetween(startDateStr, endDateStr) {
    const start = parseDate(startDateStr);
    const end = endDateStr ? parseDate(endDateStr) : new Date();
    return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  }

  // --- Calculate total experience in years from [data-start-date] on current page ---
  function calculateTotalExperienceYears() {
    const spans = document.querySelectorAll('[data-start-date]');
    let totalMonths = 0;
    spans.forEach(el => {
      const start = el.getAttribute('data-start-date');
      const end = el.getAttribute('data-end-date') || null;
      totalMonths += monthsBetween(start, end);
    });
    return Math.round((totalMonths / 12) * 10) / 10;
  }

  // --- Fetch an HTML page and count elements matching selector ---
  async function fetchCount(url, selector) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const doc = new DOMParser().parseFromString(text, 'text/html');
      return doc.querySelectorAll(selector).length;
    } catch (_) {
      return 0;
    }
  }

  // --- Counter animation using requestAnimationFrame ---
  function animateCounter(el, target, isDecimal, duration) {
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isDecimal ? target.toFixed(1) : target.toString();
    }
    requestAnimationFrame(step);
  }

  function runAnimations() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const isDecimal = el.getAttribute('data-decimal') === 'true';
      animateCounter(el, target, isDecimal, 1200);
    });
  }

  // --- Set target value on a stat element ---
  function setTarget(id, value, isDecimal) {
    const el = document.querySelector(`#${id} .stat-number`);
    if (!el) return;
    el.setAttribute('data-target', value);
    if (isDecimal) el.setAttribute('data-decimal', 'true');
  }

  // --- Main init ---
  async function init() {
    // Years of experience — synchronous, from current page DOM
    const expYears = calculateTotalExperienceYears();
    setTarget('stat-experience', expYears, true);

    // Counts — async fetch from sub-pages
    const [workCount, personalCount, certCount] = await Promise.all([
      fetchCount('/work-projects/', '.work-project'),
      fetchCount('/personal-projects/', '.project'),
      fetchCount('/certifications/', '.certification')
    ]);

    setTarget('stat-work-projects', workCount, false);
    setTarget('stat-personal-projects', personalCount, false);
    setTarget('stat-certifications', certCount, false);

    // Fire animation when stats bar enters viewport
    const statsBar = document.getElementById('stats-bar');
    if (!statsBar) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runAnimations();
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsBar);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
