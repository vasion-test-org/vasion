/**
 * MSP Demo form customizations (run after Marketo form is rendered):
 * 1. Override MSP qualification field labels to question format
 * 2. Add disclaimer under "Preferred MSP Group Demo Date"
 * 3. Hide past date options in the demo date dropdown
 */

const MSP_LABEL_OVERRIDES = {
  MSP_Initial_Printers_Supported__c:
    'How many printers will you need to initially support with our product?',
  MSP_Total_Printers_Supported__c:
    'How many printers does your company support in total across all of your customers?',
  MSP_Number_of_Users_Supported__c:
    'How many users does your company support in total across all of your customers?',
};

const MSP_DEMO_DATE_DISCLAIMER =
  'MSP demos are conducted in a group format and may include other attendees.';

/**
 * Apply question-style labels to the three MSP qualification fields.
 * @param {HTMLFormElement} formEl - The Marketo form element
 */
function applyMspLabels(formEl) {
  if (!formEl || !formEl.querySelector) return;
  Object.entries(MSP_LABEL_OVERRIDES).forEach(([fieldId, labelText]) => {
    const label =
      formEl.querySelector(`label[for="${fieldId}"]`) ||
      formEl.querySelector(`#Lbl${fieldId}`);
    if (label) {
      label.textContent = labelText;
    }
  });
}

/**
 * Find the "Preferred MSP Group Demo Date" label and insert the disclaimer below the field
 * (after the field descriptor) so it is not clipped by the descriptor's max-height.
 * @param {HTMLFormElement} formEl - The Marketo form element
 */
function applyMspDemoDateDisclaimer(formEl) {
  if (!formEl || !formEl.querySelectorAll) return;
  const labels = formEl.querySelectorAll('label');
  for (const label of labels) {
    const text = (label.textContent || '').trim();
    if (text.includes('Preferred MSP Group Demo Date') || text.includes('Preferred MSP Group Demo')) {
      const disclaimer = document.createElement('p');
      disclaimer.className = 'msp-demo-date-disclaimer';
      disclaimer.setAttribute('aria-live', 'polite');
      disclaimer.textContent = MSP_DEMO_DATE_DISCLAIMER;
      const fieldDescriptor = label.closest('.mktoFieldDescriptor');
      if (fieldDescriptor && fieldDescriptor.parentNode) {
        fieldDescriptor.parentNode.insertBefore(disclaimer, fieldDescriptor.nextSibling);
      }
      break;
    }
  }
}

/**
 * Parse option text or value as a date. Handles common formats (e.g. "March 5, 2025 10:00 AM").
 * @param {string} text
 * @returns {Date|null}
 */
function parseOptionDate(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  const d = new Date(trimmed);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Hide select options whose date is in the past. Only affects options that look like dates.
 * @param {HTMLFormElement} formEl - The Marketo form element
 */
function filterPastDemoDates(formEl) {
  if (!formEl || !formEl.querySelectorAll) return;
  const now = new Date();
  // Reset to start of day for date-only comparison so "today" is still valid
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const selects = formEl.querySelectorAll('select');
  selects.forEach((select) => {
    const options = Array.from(select.querySelectorAll('option'));
    let hasDateOptions = false;
    options.forEach((opt, index) => {
      // Skip placeholder / first empty option
      const value = (opt.value || '').trim();
      const text = (opt.textContent || '').trim();
      const date = parseOptionDate(value) || parseOptionDate(text);
      if (date) {
        hasDateOptions = true;
        const optionDateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (optionDateStart < todayStart) {
          opt.style.display = 'none';
          opt.setAttribute('data-msp-past-date', 'true');
        }
      }
    });
  });
}

/**
 * Run all MSP demo form customizations on the given form element.
 * Safe to call multiple times; only mutates DOM when matching elements exist.
 *
 * @param {HTMLFormElement} formEl - The Marketo form DOM element (e.g. from form.getFormElem())
 */
export function applyMspFormCustomizations(formEl) {
  if (!formEl) return;
  applyMspLabels(formEl);
  applyMspDemoDateDisclaimer(formEl);
  filterPastDemoDates(formEl);
}
