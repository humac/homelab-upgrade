/**
 * Navigation module for phase switching and menu management
 */

import { saveState, loadState, updateProgress, scrollToTop } from './utils.js';

let currentPhase = 'overview';
let phases = [];

/**
 * Initialize navigation
 */
export function initNavigation(phasesData) {
    phases = phasesData;
    const savedPhase = loadState('currentPhase', 'overview');
    renderNavigation();
    goToPhase(savedPhase);
}

/**
 * Render navigation menu
 */
function renderNavigation() {
    const nav = document.getElementById('navigation');
    if (!nav) return;

    nav.innerHTML = '';

    phases.forEach(phase => {
        const navItem = document.createElement('button');
        navItem.className = 'nav-item';
        navItem.dataset.phase = phase.id;

        navItem.innerHTML = `
            <span class="phase-number">${phase.icon}</span>
            <span>${phase.title.substring(0, 20)}${phase.title.length > 20 ? '...' : ''}</span>
        `;

        navItem.addEventListener('click', () => goToPhase(phase.id));
        nav.appendChild(navItem);
    });
}

/**
 * Navigate to a specific phase
 */
export function goToPhase(phaseId) {
    currentPhase = phaseId;
    saveState('currentPhase', phaseId);

    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.phase === phaseId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update progress bar
    updateProgress(phaseId, phases);

    // Render phase content
    renderPhaseContent(phaseId);

    // Scroll to top
    scrollToTop();

    // Restore checklist state for this phase
    restoreChecklistState(phaseId);
}

/**
 * Render phase content
 */
function renderPhaseContent(phaseId) {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase) return;

    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    let html = `
        <div class="phase" id="${phase.id}">
            <div class="phase-header">
                <div class="phase-badge">${phase.badge}</div>
                <h2 class="phase-title">${phase.title}</h2>
            </div>
    `;

    // Add metadata if present
    if (phase.meta && phase.meta.length > 0) {
        html += '<div class="phase-meta">';
        phase.meta.forEach(meta => {
            html += `
                <div class="meta-item">
                    <span class="meta-icon">${meta.icon}</span>
                    <span><strong>${meta.label}:</strong> ${meta.value}</span>
                </div>
            `;
        });
        html += '</div>';
    }

    // Add intro
    if (phase.content.intro) {
        html += `<div class="success-box"><p>${phase.content.intro}</p></div>`;
    }

    // Add sections
    if (phase.content.sections) {
        phase.content.sections.forEach(section => {
            html += `
                <div class="section">
                    <h3 class="section-title">${section.title}</h3>
                    ${formatSectionContent(section)}
                </div>
            `;
        });
    }

    // Add navigation buttons
    const currentIndex = phases.findIndex(p => p.id === phaseId);
    const prevPhase = currentIndex > 0 ? phases[currentIndex - 1] : null;
    const nextPhase = currentIndex < phases.length - 1 ? phases[currentIndex + 1] : null;

    html += '<div class="nav-buttons">';

    if (prevPhase) {
        html += `<button class="btn btn-secondary" data-goto="${prevPhase.id}">← ${prevPhase.title}</button>`;
    } else {
        html += '<button class="btn btn-secondary" disabled>← Previous</button>';
    }

    if (nextPhase) {
        html += `<button class="btn btn-primary" data-goto="${nextPhase.id}">${nextPhase.title} →</button>`;
    } else {
        html += '<button class="btn btn-primary" disabled>Complete</button>';
    }

    html += '</div></div>';

    mainContent.innerHTML = html;

    // Add event listeners to nav buttons
    document.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetPhase = e.target.dataset.goto;
            goToPhase(targetPhase);
        });
    });

    // Add event listeners to checklist items
    document.querySelectorAll('.checklist-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
            saveChecklistState(phaseId);
        });
    });
}

/**
 * Format section content based on type
 */
function formatSectionContent(section) {
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
        default:
            return `<p>${section.content || ''}</p>`;
    }
}

/**
 * Format table
 */
function formatTable(data) {
    const { headers, rows } = data;
    let html = '<table class="config-table"><thead><tr>';

    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });

    html += '</tr></thead><tbody>';

    rows.forEach(row => {
        let rowClass = '';
        let displayRow = row;

        if (row[0] && row[0].startsWith('__')) {
            if (row[0] === '__final__') rowClass = 'final-row';
            else if (row[0] === '__total__') rowClass = 'total-row';
            else if (row[0] === '__credit__') rowClass = 'credit-row';
            displayRow = row.slice(1);
        }

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
 * Format checklist
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
 * Format steps
 */
function formatSteps(items) {
    let html = '<div class="steps-container">';
    items.forEach((step, index) => {
        html += `
            <div class="step" style="margin: 1.5rem 0;">
                <h4 style="margin-bottom: 0.5rem;"><span class="step-number">${index + 1}</span>${step.title}</h4>
                <p style="margin-left: 3rem;">${step.content}</p>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

/**
 * Save checklist state
 */
function saveChecklistState(phaseId) {
    const checkedItems = [];
    document.querySelectorAll('.checklist-item.checked').forEach(item => {
        checkedItems.push(parseInt(item.dataset.itemId));
    });

    const allStates = loadState('checklistStates', {});
    allStates[phaseId] = checkedItems;
    saveState('checklistStates', allStates);
}

/**
 * Restore checklist state
 */
function restoreChecklistState(phaseId) {
    const allStates = loadState('checklistStates', {});
    const checkedItems = allStates[phaseId] || [];

    setTimeout(() => {
        document.querySelectorAll('.checklist-item').forEach(item => {
            const itemId = parseInt(item.dataset.itemId);
            if (checkedItems.includes(itemId)) {
                item.classList.add('checked');
            }
        });
    }, 100);
}

/**
 * Get current phase
 */
export function getCurrentPhase() {
    return currentPhase;
}
