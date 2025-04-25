/**
 * Confluence Text File Manager
 * 
 * A JavaScript module for managing text files in Confluence attachments.
 * This includes functionality to:
 * - Upload text files to a Confluence page's attachments
 * - List text files from a Confluence page's attachments
 * - Edit text files in a simple editor
 * - Save edited files back to Confluence
 * 
 * This script is designed to be integrated into a Confluence page
 * and uses the Confluence REST API.
 */

class ConfluenceAPI {
  /**
   * Initialize the Confluence API interface
   * @param {string} baseUrl - Base URL of the Confluence instance
   * @param {string} token - API token for authentication
   * @param {string} pageId - ID of the Confluence page
   */
  constructor(baseUrl, token, pageId) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.pageId = pageId;
    this.headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };
  }

  /**
   * Get all attachments from the Confluence page
   * @returns {Promise<Array>} Promise resolving to an array of attachment objects
   */
  async getAttachments() {
    try {
      const response = await fetch(`${this.baseUrl}/rest/api/content/${this.pageId}/child/attachment`, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch attachments: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error getting attachments:', error);
      throw error;
    }
  }

  /**
   * Get all text file attachments from the Confluence page
   * @returns {Promise<Array>} Promise resolving to an array of text file attachment objects
   */
  async getTextFileAttachments() {
    try {
      const attachments = await this.getAttachments();
      // Filter for .txt files only
      return attachments.filter(attachment => 
        attachment.title.toLowerCase().endsWith('.txt') || 
        attachment.metadata?.mediaType === 'text/plain'
      );
    } catch (error) {
      console.error('Error getting text file attachments:', error);
      throw error;
    }
  }

  /**
   * Get the content of a specific attachment
   * @param {string} attachmentId - ID of the attachment
   * @returns {Promise<string>} Promise resolving to the text content of the file
   */
  async getAttachmentContent(attachmentId) {
    try {
      const response = await fetch(`${this.baseUrl}/rest/api/content/${attachmentId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch attachment content: ${response.status} ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Error getting attachment content:', error);
      throw error;
    }
  }

  /**
   * Upload a new text file attachment
   * @param {string} fileName - Name of the file to create
   * @param {string} content - Text content of the file
   * @returns {Promise<Object>} Promise resolving to the created attachment object
   */
  async uploadTextFile(fileName, content) {
    try {
      // Ensure the filename ends with .txt
      if (!fileName.toLowerCase().endsWith('.txt')) {
        fileName += '.txt';
      }

      // Create a form with the file
      const formData = new FormData();
      const file = new Blob([content], { type: 'text/plain' });
      formData.append('file', file, fileName);

      const response = await fetch(`${this.baseUrl}/rest/api/content/${this.pageId}/child/attachment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'X-Atlassian-Token': 'no-check'
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.error('Error uploading text file:', error);
      throw error;
    }
  }

  /**
   * Update an existing text file attachment
   * @param {string} attachmentId - ID of the attachment to update
   * @param {string} fileName - Name of the file
   * @param {string} content - New text content of the file
   * @returns {Promise<Object>} Promise resolving to the updated attachment object
   */
  async updateTextFile(attachmentId, fileName, content) {
    try {
      // Ensure the filename ends with .txt
      if (!fileName.toLowerCase().endsWith('.txt')) {
        fileName += '.txt';
      }

      // Create a form with the file
      const formData = new FormData();
      const file = new Blob([content], { type: 'text/plain' });
      formData.append('file', file, fileName);

      const response = await fetch(`${this.baseUrl}/rest/api/content/${this.pageId}/child/attachment/${attachmentId}/data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'X-Atlassian-Token': 'no-check'
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to update file: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.error('Error updating text file:', error);
      throw error;
    }
  }

  /**
   * Delete an attachment
   * @param {string} attachmentId - ID of the attachment to delete
   * @returns {Promise<boolean>} Promise resolving to true if successful
   */
  async deleteAttachment(attachmentId) {
    try {
      const response = await fetch(`${this.baseUrl}/rest/api/content/${attachmentId}`, {
        method: 'DELETE',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Failed to delete attachment: ${response.status} ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting attachment:', error);
      throw error;
    }
  }
}

class TextFileManager {
  /**
   * Initialize the Text File Manager
   * @param {ConfluenceAPI} confluenceAPI - Instance of the ConfluenceAPI class
   * @param {string} containerId - ID of the HTML container element
   */
  constructor(confluenceAPI, containerId) {
    this.confluenceAPI = confluenceAPI;
    this.container = document.getElementById(containerId);
    this.textFiles = [];
    this.currentFile = null;
    
    // Create UI elements
    this.createUI();
    
    // Initialize the UI
    this.initialize();
  }

  /**
   * Create the user interface
   */
  createUI() {
    // Clear the container
    this.container.innerHTML = '';
    
    // Create toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'text-file-manager-toolbar';
    toolbar.style.marginBottom = '10px';
    
    // Create file dropdown
    this.fileSelect = document.createElement('select');
    this.fileSelect.style.padding = '8px';
    this.fileSelect.style.marginRight = '10px';
    this.fileSelect.style.borderRadius = '4px';
    this.fileSelect.style.border = '1px solid #ccc';
    
    // Create buttons
    this.newFileButton = document.createElement('button');
    this.newFileButton.textContent = 'New File';
    this.newFileButton.style.padding = '8px 12px';
    this.newFileButton.style.marginRight = '5px';
    this.newFileButton.style.backgroundColor = '#0052CC';
    this.newFileButton.style.color = 'white';
    this.newFileButton.style.border = 'none';
    this.newFileButton.style.borderRadius = '4px';
    this.newFileButton.style.cursor = 'pointer';
    
    this.saveButton = document.createElement('button');
    this.saveButton.textContent = 'Save';
    this.saveButton.style.padding = '8px 12px';
    this.saveButton.style.marginRight = '5px';
    this.saveButton.style.backgroundColor = '#00875A';
    this.saveButton.style.color = 'white';
    this.saveButton.style.border = 'none';
    this.saveButton.style.borderRadius = '4px';
    this.saveButton.style.cursor = 'pointer';
    
    this.deleteButton = document.createElement('button');
    this.deleteButton.textContent = 'Delete';
    this.deleteButton.style.padding = '8px 12px';
    this.deleteButton.style.backgroundColor = '#DE350B';
    this.deleteButton.style.color = 'white';
    this.deleteButton.style.border = 'none';
    this.deleteButton.style.borderRadius = '4px';
    this.deleteButton.style.cursor = 'pointer';
    
    // Add elements to toolbar
    toolbar.appendChild(this.fileSelect);
    toolbar.appendChild(this.newFileButton);
    toolbar.appendChild(this.saveButton);
    toolbar.appendChild(this.deleteButton);
    
    // Create editor
    this.editorContainer = document.createElement('div');
    this.editorContainer.style.marginBottom = '10px';
    
    this.fileNameInput = document.createElement('input');
    this.fileNameInput.type = 'text';
    this.fileNameInput.placeholder = 'File name';
    this.fileNameInput.style.display = 'block';
    this.fileNameInput.style.width = '100%';
    this.fileNameInput.style.padding = '8px';
    this.fileNameInput.style.marginBottom = '10px';
    this.fileNameInput.style.borderRadius = '4px';
    this.fileNameInput.style.border = '1px solid #ccc';
    this.fileNameInput.style.boxSizing = 'border-box';
    
    this.editor = document.createElement('textarea');
    this.editor.style.width = '100%';
    this.editor.style.height = '300px';
    this.editor.style.padding = '10px';
    this.editor.style.borderRadius = '4px';
    this.editor.style.border = '1px solid #ccc';
    this.editor.style.boxSizing = 'border-box';
    this.editor.style.fontFamily = 'monospace';
    
    this.editorContainer.appendChild(this.fileNameInput);
    this.editorContainer.appendChild(this.editor);
    
    // Create status area
    this.statusArea = document.createElement('div');
    this.statusArea.style.padding = '10px';
    this.statusArea.style.marginTop = '10px';
    this.statusArea.style.borderRadius = '4px';
    this.statusArea.style.display = 'none';
    
    // Add everything to the container
    this.container.appendChild(toolbar);
    this.container.appendChild(this.editorContainer);
    this.container.appendChild(this.statusArea);
    
    // Add event listeners
    this.fileSelect.addEventListener('change', () => this.loadSelectedFile());
    this.newFileButton.addEventListener('click', () => this.newFile());
    this.saveButton.addEventListener('click', () => this.saveFile());
    this.deleteButton.addEventListener('click', () => this.deleteFile());
  }

  /**
   * Initialize the UI by loading text files
   */
  async initialize() {
    try {
      await this.loadTextFiles();
      this.showStatus('Ready', 'info');
    } catch (error) {
      this.showStatus(`Error initializing: ${error.message}`, 'error');
    }
  }

  /**
   * Load text files from Confluence
   */
  async loadTextFiles() {
    try {
      this.showStatus('Loading files...', 'info');
      
      // Clear the dropdown
      this.fileSelect.innerHTML = '';
      
      // Add a default option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = '-- Select a file --';
      this.fileSelect.appendChild(defaultOption);
      
      // Get text files from Confluence
      this.textFiles = await this.confluenceAPI.getTextFileAttachments();
      
      // Add options to dropdown
      this.textFiles.forEach(file => {
        const option = document.createElement('option');
        option.value = file.id;
        option.textContent = file.title;
        this.fileSelect.appendChild(option);
      });
      
      this.showStatus(`Loaded ${this.textFiles.length} text files`, 'success');
      
      // Disable editor until a file is selected
      this.editor.value = '';
      this.fileNameInput.value = '';
      this.editor.disabled = true;
      this.fileNameInput.disabled = true;
      this.saveButton.disabled = true;
      this.deleteButton.disabled = true;
    } catch (error) {
      this.showStatus(`Error loading files: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Load the selected file into the editor
   */
  async loadSelectedFile() {
    const fileId = this.fileSelect.value;
    
    if (!fileId) {
      // No file selected
      this.editor.value = '';
      this.fileNameInput.value = '';
      this.editor.disabled = true;
      this.fileNameInput.disabled = true;
      this.saveButton.disabled = true;
      this.deleteButton.disabled = true;
      this.currentFile = null;
      return;
    }
    
    try {
      this.showStatus('Loading file...', 'info');
      
      // Find the file in the list
      this.currentFile = this.textFiles.find(file => file.id === fileId);
      
      if (!this.currentFile) {
        throw new Error('File not found');
      }
      
      // Load file content
      const content = await this.confluenceAPI.getAttachmentContent(this.currentFile.id);
      
      // Update UI
      this.fileNameInput.value = this.currentFile.title;
      this.editor.value = content;
      this.editor.disabled = false;
      this.fileNameInput.disabled = false;
      this.saveButton.disabled = false;
      this.deleteButton.disabled = false;
      
      this.showStatus(`Loaded file: ${this.currentFile.title}`, 'success');
    } catch (error) {
      this.showStatus(`Error loading file: ${error.message}`, 'error');
      
      // Reset the UI
      this.editor.value = '';
      this.fileNameInput.value = '';
      this.editor.disabled = true;
      this.fileNameInput.disabled = true;
      this.saveButton.disabled = true;
      this.deleteButton.disabled = true;
      this.currentFile = null;
    }
  }

  /**
   * Create a new file
   */
  newFile() {
    // Clear the editor
    this.editor.value = '';
    this.fileNameInput.value = 'new_file.txt';
    this.editor.disabled = false;
    this.fileNameInput.disabled = false;
    this.saveButton.disabled = false;
    this.deleteButton.disabled = true;
    
    // Reset current file
    this.currentFile = null;
    
    // Deselect any option in the dropdown
    this.fileSelect.value = '';
    
    this.showStatus('New file created. Save to upload to Confluence.', 'info');
  }

  /**
   * Save the current file
   */
  async saveFile() {
    try {
      const fileName = this.fileNameInput.value.trim();
      const content = this.editor.value;
      
      if (!fileName) {
        throw new Error('Please enter a file name');
      }
      
      this.showStatus('Saving file...', 'info');
      
      let savedFile;
      
      if (this.currentFile) {
        // Update existing file
        savedFile = await this.confluenceAPI.updateTextFile(
          this.currentFile.id,
          fileName,
          content
        );
        this.showStatus(`File updated: ${fileName}`, 'success');
      } else {
        // Create new file
        savedFile = await this.confluenceAPI.uploadTextFile(fileName, content);
        this.showStatus(`File created: ${fileName}`, 'success');
      }
      
      // Reload the file list
      await this.loadTextFiles();
      
      // Select the saved file
      this.fileSelect.value = savedFile.id;
      
      // Load the saved file
      await this.loadSelectedFile();
    } catch (error) {
      this.showStatus(`Error saving file: ${error.message}`, 'error');
    }
  }

  /**
   * Delete the current file
   */
  async deleteFile() {
    if (!this.currentFile) {
      this.showStatus('No file selected', 'error');
      return;
    }
    
    // Confirm deletion
    if (!confirm(`Are you sure you want to delete ${this.currentFile.title}?`)) {
      return;
    }
    
    try {
      this.showStatus('Deleting file...', 'info');
      
      await this.confluenceAPI.deleteAttachment(this.currentFile.id);
      
      this.showStatus(`File deleted: ${this.currentFile.title}`, 'success');
      
      // Reload the file list
      await this.loadTextFiles();
      
      // Reset the editor
      this.editor.value = '';
      this.fileNameInput.value = '';
      this.editor.disabled = true;
      this.fileNameInput.disabled = true;
      this.saveButton.disabled = true;
      this.deleteButton.disabled = true;
      this.currentFile = null;
    } catch (error) {
      this.showStatus(`Error deleting file: ${error.message}`, 'error');
    }
  }

  /**
   * Show a status message
   * @param {string} message - Message to display
   * @param {string} type - Type of message ('info', 'success', 'error')
   */
  showStatus(message, type = 'info') {
    this.statusArea.textContent = message;
    this.statusArea.style.display = 'block';
    
    // Set background color based on type
    if (type === 'info') {
      this.statusArea.style.backgroundColor = '#DEEBFF';
      this.statusArea.style.color = '#0747A6';
    } else if (type === 'success') {
      this.statusArea.style.backgroundColor = '#E3FCEF';
      this.statusArea.style.color = '#006644';
    } else if (type === 'error') {
      this.statusArea.style.backgroundColor = '#FFEBE6';
      this.statusArea.style.color = '#BF2600';
    }
    
    // Auto-hide after 5 seconds for success messages
    if (type === 'success') {
      setTimeout(() => {
        this.statusArea.style.display = 'none';
      }, 5000);
    }
  }
}

/**
 * Initialize the Confluence Text File Manager
 * @param {Object} config - Configuration object
 * @param {string} config.confluenceUrl - URL of the Confluence instance
 * @param {string} config.apiToken - API token for authentication
 * @param {string} config.pageId - ID of the Confluence page
 * @param {string} config.containerId - ID of the HTML container element
 * @returns {Object} Instance of the TextFileManager
 */
function initConfluenceTextFileManager(config) {
  const confluenceAPI = new ConfluenceAPI(
    config.confluenceUrl,
    config.apiToken,
    config.pageId
  );
  
  return new TextFileManager(confluenceAPI, config.containerId);
}

// Example usage:
// document.addEventListener('DOMContentLoaded', function() {
//   const textFileManager = initConfluenceTextFileManager({
//     confluenceUrl: 'https://your-confluence-instance.atlassian.net',
//     apiToken: 'YOUR_API_TOKEN',
//     pageId: 'YOUR_PAGE_ID',
//     containerId: 'confluence-text-file-manager'
//   });
// });
