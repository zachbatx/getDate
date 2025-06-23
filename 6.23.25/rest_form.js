// Confluence Response Table Editor
// Configuration - Replace with your actual values
const CONFIG = {
    formId: 'YOUR_FORM_ID_HERE', // Replace with actual Confluence form ID
    pageId: 'YOUR_PAGE_ID_HERE', // Replace with actual page ID
    spaceKey: 'YOUR_SPACE_KEY', // Replace with actual space key
    baseUrl: 'https://your-confluence-instance.com', // Replace with your Confluence URL
    restApiPath: '/rest/api/content'
};

// Main class for handling table editing
class ConfluenceTableEditor {
    constructor() {
        this.editingRow = null;
        this.originalData = {};
        this.init();
    }

    init() {
        this.addEditButtons();
        this.addStyles();
        this.setupEventListeners();
    }

    // Add edit buttons to each row in the response table
    addEditButtons() {
        const responseTables = document.querySelectorAll('.confluence-form-table, table[data-layout="default"]');
        
        responseTables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach((row, index) => {
                if (row.querySelector('.edit-actions')) return; // Skip if already has edit buttons
                
                const actionsCell = document.createElement('td');
                actionsCell.className = 'edit-actions';
                actionsCell.innerHTML = `
                    <button class="edit-btn" data-row-id="${index}" title="Edit">
                        ✏️ Edit
                    </button>
                    <button class="save-btn" data-row-id="${index}" title="Save" style="display:none;">
                        ✅ Save
                    </button>
                    <button class="cancel-btn" data-row-id="${index}" title="Cancel" style="display:none;">
                        ❌ Cancel
                    </button>
                `;
                row.appendChild(actionsCell);
            });

            // Add header for actions column if not exists
            const headerRow = table.querySelector('thead tr, tr:first-child');
            if (headerRow && !headerRow.querySelector('.actions-header')) {
                const headerCell = document.createElement('th');
                headerCell.className = 'actions-header';
                headerCell.textContent = 'Actions';
                headerRow.appendChild(headerCell);
            }
        });
    }

    // Add CSS styles for the editor
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .edit-actions {
                white-space: nowrap;
                padding: 8px;
            }
            
            .edit-btn, .save-btn, .cancel-btn {
                margin: 2px;
                padding: 5px 10px;
                border: 1px solid #ccc;
                border-radius: 3px;
                background: #f9f9f9;
                cursor: pointer;
                font-size: 12px;
            }
            
            .edit-btn:hover { background: #e3f2fd; }
            .save-btn:hover { background: #e8f5e8; }
            .cancel-btn:hover { background: #ffebee; }
            
            .editing-row {
                background-color: #fff3e0 !important;
            }
            
            .editable-input {
                width: 100%;
                padding: 4px;
                border: 1px solid #ddd;
                border-radius: 3px;
                font-family: inherit;
                font-size: inherit;
            }
            
            .editable-select {
                width: 100%;
                padding: 4px;
                border: 1px solid #ddd;
                border-radius: 3px;
            }
            
            .status-draft { color: #ff9800; }
            .status-review { color: #2196f3; }
            .status-approved { color: #4caf50; }
            .status-implemented { color: #9c27b0; }
        `;
        document.head.appendChild(style);
    }

    // Setup event listeners
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                this.enableEdit(e.target.dataset.rowId);
            } else if (e.target.classList.contains('save-btn')) {
                this.saveChanges(e.target.dataset.rowId);
            } else if (e.target.classList.contains('cancel-btn')) {
                this.cancelEdit(e.target.dataset.rowId);
            }
        });
    }

    // Enable editing for a specific row
    enableEdit(rowId) {
        if (this.editingRow !== null) {
            alert('Please save or cancel the current edit before editing another row.');
            return;
        }

        const row = this.getRowByIndex(rowId);
        if (!row) return;

        this.editingRow = rowId;
        this.originalData = {};
        
        // Store original data and convert cells to inputs
        const cells = row.querySelectorAll('td:not(.edit-actions)');
        cells.forEach((cell, index) => {
            const originalText = cell.textContent.trim();
            this.originalData[index] = originalText;
            
            const input = this.createInputForCell(cell, originalText, index);
            cell.innerHTML = '';
            cell.appendChild(input);
        });

        // Toggle button visibility
        row.classList.add('editing-row');
        row.querySelector('.edit-btn').style.display = 'none';
        row.querySelector('.save-btn').style.display = 'inline-block';
        row.querySelector('.cancel-btn').style.display = 'inline-block';
    }

    // Create appropriate input element for cell
    createInputForCell(cell, value, cellIndex) {
        const headerCells = cell.closest('table').querySelectorAll('th, tr:first-child td');
        const headerText = headerCells[cellIndex]?.textContent.toLowerCase() || '';
        
        // Create select dropdown for status and phase columns
        if (headerText.includes('status')) {
            const select = document.createElement('select');
            select.className = 'editable-select';
            const options = ['Draft', 'In Review', 'Approved', 'Implemented'];
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                optionElement.selected = option === value;
                select.appendChild(optionElement);
            });
            return select;
        } else if (headerText.includes('phase')) {
            const select = document.createElement('select');
            select.className = 'editable-select';
            const options = ['Discovery', 'Design', 'Development', 'Testing', 'Deployment'];
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                optionElement.selected = option === value;
                select.appendChild(optionElement);
            });
            return select;
        } else if (headerText.includes('priority')) {
            const select = document.createElement('select');
            select.className = 'editable-select';
            const options = ['Low', 'Medium', 'High', 'Critical'];
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                optionElement.selected = option === value;
                select.appendChild(optionElement);
            });
            return select;
        } else {
            // Default to text input
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'editable-input';
            input.value = value;
            return input;
        }
    }

    // Save changes to the row
    async saveChanges(rowId) {
        const row = this.getRowByIndex(rowId);
        if (!row) return;

        const cells = row.querySelectorAll('td:not(.edit-actions)');
        const newData = {};
        
        // Collect new data from inputs
        cells.forEach((cell, index) => {
            const input = cell.querySelector('input, select');
            newData[index] = input ? input.value : cell.textContent.trim();
        });

        try {
            // Show loading state
            row.querySelector('.save-btn').textContent = '⏳ Saving...';
            
            // Call API to save changes
            await this.updateRowData(rowId, newData);
            
            // Update the display
            cells.forEach((cell, index) => {
                const value = newData[index];
                cell.innerHTML = this.formatCellValue(value, index);
            });

            this.exitEditMode(row);
            this.showMessage('Changes saved successfully!', 'success');

        } catch (error) {
            console.error('Error saving changes:', error);
            this.showMessage('Error saving changes. Please try again.', 'error');
            row.querySelector('.save-btn').textContent = '✅ Save';
        }
    }

    // Cancel editing and restore original values
    cancelEdit(rowId) {
        const row = this.getRowByIndex(rowId);
        if (!row) return;

        const cells = row.querySelectorAll('td:not(.edit-actions)');
        cells.forEach((cell, index) => {
            const originalValue = this.originalData[index];
            cell.innerHTML = this.formatCellValue(originalValue, index);
        });

        this.exitEditMode(row);
    }

    // Exit edit mode
    exitEditMode(row) {
        row.classList.remove('editing-row');
        row.querySelector('.edit-btn').style.display = 'inline-block';
        row.querySelector('.save-btn').style.display = 'none';
        row.querySelector('.cancel-btn').style.display = 'none';
        row.querySelector('.save-btn').textContent = '✅ Save';
        
        this.editingRow = null;
        this.originalData = {};
    }

    // Format cell value with appropriate styling
    formatCellValue(value, cellIndex) {
        const headerCells = document.querySelectorAll('th, tr:first-child td');
        const headerText = headerCells[cellIndex]?.textContent.toLowerCase() || '';
        
        if (headerText.includes('status')) {
            const statusClass = `status-${value.toLowerCase().replace(/\s+/g, '')}`;
            return `<span class="${statusClass}">${value}</span>`;
        }
        return value;
    }

    // Get row by index
    getRowByIndex(rowId) {
        const tables = document.querySelectorAll('.confluence-form-table, table[data-layout="default"]');
        for (let table of tables) {
            const row = table.querySelector(`tbody tr:nth-child(${parseInt(rowId) + 1})`);
            if (row) return row;
        }
        return null;
    }

    // Update row data via REST API
    async updateRowData(rowId, newData) {
        const payload = {
            formId: CONFIG.formId,
            rowId: rowId,
            data: newData,
            timestamp: new Date().toISOString()
        };

        // Placeholder REST API call - replace with actual Confluence REST API
        const response = await fetch(`${CONFIG.baseUrl}${CONFIG.restApiPath}/${CONFIG.pageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_TOKEN', // Replace with actual token
                'X-Atlassian-Token': 'no-check'
            },
            body: JSON.stringify({
                version: {
                    number: await this.getPageVersion()
                },
                type: 'page',
                body: {
                    storage: {
                        value: await this.getUpdatedPageContent(payload),
                        representation: 'storage'
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    // Get current page version (placeholder implementation)
    async getPageVersion() {
        try {
            const response = await fetch(`${CONFIG.baseUrl}${CONFIG.restApiPath}/${CONFIG.pageId}?expand=version`);
            const data = await response.json();
            return data.version.number + 1;
        } catch (error) {
            console.warn('Could not get page version, using default');
            return 1;
        }
    }

    // Get updated page content (placeholder implementation)
    async getUpdatedPageContent(updatePayload) {
        // This is a placeholder - you'd need to implement the logic to update
        // the specific table content within the page's storage format
        console.log('Updating page content with:', updatePayload);
        
        // In a real implementation, you would:
        // 1. Get the current page content
        // 2. Parse the storage format
        // 3. Update the specific table row
        // 4. Return the updated storage content
        
        return '<p>Updated content placeholder</p>';
    }

    // Show user messages
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            z-index: 9999;
            background-color: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Alternative simple localStorage-based approach for offline persistence
class LocalStorageTableEditor extends ConfluenceTableEditor {
    constructor() {
        super();
        this.storageKey = `confluence-table-${CONFIG.formId}`;
    }

    async updateRowData(rowId, newData) {
        // Store data locally instead of API call
        const existingData = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        existingData[rowId] = {
            data: newData,
            lastModified: new Date().toISOString()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(existingData));
        
        // Simulate API delay
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    // Load stored data on page load
    loadStoredData() {
        const storedData = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        
        Object.keys(storedData).forEach(rowId => {
            const row = this.getRowByIndex(rowId);
            if (row) {
                const cells = row.querySelectorAll('td:not(.edit-actions)');
                const data = storedData[rowId].data;
                
                cells.forEach((cell, index) => {
                    if (data[index] !== undefined) {
                        cell.innerHTML = this.formatCellValue(data[index], index);
                    }
                });
            }
        });
    }
}

// Initialize the editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Use LocalStorageTableEditor for offline persistence or ConfluenceTableEditor for API integration
    const editor = new LocalStorageTableEditor();
    editor.loadStoredData();
    
    console.log('Confluence Table Editor initialized');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ConfluenceTableEditor, LocalStorageTableEditor };
}