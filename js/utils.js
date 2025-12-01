/**
 * Utility functions for the Homelab Upgrade Guide
 */

/**
 * Save state to localStorage
 */
export function saveState(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Load state from localStorage
 */
export function loadState(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
}

/**
 * Format section content based on type
 */
export function formatSection(section) {
    switch (section.type) {
        case 'table':
            return formatTable(section.data);
        case 'checklist':
            return formatChecklist(section.items);
        case 'steps':
            return formatSteps(section.items);
        case 'info':
            return `<div class="info-box">${section.content}</div>`;
        case 'warning':
            return `<div class="warning-box">${section.content}</div>`;
        case 'success':
            return `<div class="success-box">${section.content}</div>`;
        case 'danger':
            return `<div class="danger-box">${section.content}</div>`;
        case 'html':
            return section.content;
        default:
            return `<p>${section.content || ''}</p>`;
    }
}

/**
 * Format table data
 */
function formatTable(data) {
    const { headers, rows } = data;

    let html = '<table class="config-table"><thead><tr>';
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += '</tr></thead><tbody>';

    rows.forEach(row => {
        const rowClass = row[0].startsWith('__') ?
            (row[0] === '__final__' ? 'final-row' : 'total-row') : '';
        const displayRow = rowClass ? row.slice(1) : row;

        html += `<tr class="${rowClass}">`;
        displayRow.forEach(cell => {
            html += `<td>${cell}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
}

/**
 * Format checklist items
 */
function formatChecklist(items) {
    let html = '<ul class="checklist">';
    items.forEach((item, index) => {
        html += `
            <li class="checklist-item" data-item-id="${index}">
                <div class="checkbox"></div>
                <div>${item}</div>
            </li>
        `;
    });
    html += '</ul>';
    return html;
}

/**
 * Format step-by-step items
 */
function formatSteps(items) {
    let html = '<div class="steps-container">';
    items.forEach((step, index) => {
        html += `
            <div class="step">
                <h4><span class="step-number">${index + 1}</span>${step.title}</h4>
                <p>${step.content}</p>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

/**
 * Update progress bar
 */
export function updateProgress(currentPhaseId, allPhases) {
    const phaseIds = allPhases.map(p => p.id);
    const currentIndex = phaseIds.indexOf(currentPhaseId);
    const progress = (currentIndex / (phaseIds.length - 1)) * 100;

    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

/**
 * Debounce function for performance
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Scroll to top smoothly
 */
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
