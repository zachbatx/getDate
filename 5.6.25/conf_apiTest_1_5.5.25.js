/**
 * Confluence Attachment API Test Utility
 * For testing uploads and retrievals of .js files to/from Confluence attachments
 */

// Configuration - Replace these placeholders with your actual values
const CONFLUENCE_BASE_URL = 'YOUR_CONFLUENCE_URL'; // e.g., 'https://your-domain.atlassian.net/wiki'
const PAGE_ID = 'YOUR_PAGE_ID';
const AUTH_TOKEN = 'YOUR_AUTH_TOKEN'; // Base64 encoded username:api_token

/**
 * Upload a .js file to Confluence as an attachment
 * @param {string} fileName - Name of the file to upload
 * @param {string} fileContent - Content of the JS file
 * @returns {Promise} - Promise resolving to the API response
 */
async function uploadJsFileToConfluence(fileName, fileContent) {
  try {
    console.log(`Uploading file ${fileName} to Confluence...`);
    
    // Create blob from file content
    const blob = new Blob([fileContent], { type: 'application/javascript' });
    
    // Create FormData and append file
    const formData = new FormData();
    formData.append('file', blob, fileName);
    
    // Make API request
    const response = await fetch(
      `${CONFLUENCE_BASE_URL}/rest/api/content/${PAGE_ID}/child/attachment`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${AUTH_TOKEN}`,
          'X-Atlassian-Token': 'no-check'
        },
        body: formData
      }
    );
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Upload successful:', data);
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Get a .js file from Confluence attachments
 * @param {string} attachmentId - ID of the attachment to retrieve (if known)
 * @param {string} fileName - Name of the file to retrieve (alternative to ID)
 * @returns {Promise} - Promise resolving to the file content
 */
async function getJsFileFromConfluence(attachmentId = null, fileName = null) {
  try {
    console.log('Retrieving file from Confluence...');
    
    // If no attachment ID is provided, get attachments list and find by filename
    if (!attachmentId && fileName) {
      console.log(`Looking for attachment with filename: ${fileName}`);
      
      // Get list of attachments
      const listResponse = await fetch(
        `${CONFLUENCE_BASE_URL}/rest/api/content/${PAGE_ID}/child/attachment`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${AUTH_TOKEN}`,
            'Accept': 'application/json'
          }
        }
      );
      
      if (!listResponse.ok) {
        throw new Error(`Failed to get attachments list: ${listResponse.status} ${listResponse.statusText}`);
      }
      
      const attachments = await listResponse.json();
      
      // Find attachment by filename
      const attachment = attachments.results.find(att => att.title === fileName);
      
      if (!attachment) {
        throw new Error(`Attachment with filename ${fileName} not found`);
      }
      
      attachmentId = attachment.id;
      console.log(`Found attachment ID: ${attachmentId}`);
    }
    
    if (!attachmentId) {
      throw new Error('Either attachment ID or filename must be provided');
    }
    
    // Get the attachment content
    const response = await fetch(
      `${CONFLUENCE_BASE_URL}/rest/api/content/${attachmentId}/data`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${AUTH_TOKEN}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to get attachment: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    console.log('File retrieved successfully');
    return content;
  } catch (error) {
    console.error('Error retrieving file:', error);
    throw error;
  }
}

/**
 * Test function to try uploading and retrieving a sample JS file
 */
async function testConfluenceAttachmentApi() {
  try {
    // Sample JavaScript content (you would use content from your KB editor)
    const sampleJsContent = `
    // Knowledge Base Sample
    const kb_sample = {
      title: "Sample Knowledge Base",
      categories: [
        {
          name: "Getting Started",
          items: [
            { title: "Introduction", content: "This is an introduction to our product." },
            { title: "Installation", content: "Steps to install the application." }
          ]
        }
      ]
    };
    
    export default kb_sample;
    `;
    
    const fileName = 'kb_sample.js';
    
    // Upload the file
    const uploadResult = await uploadJsFileToConfluence(fileName, sampleJsContent);
    console.log('Upload complete. Attachment ID:', uploadResult.results[0].id);
    
    // Retrieve the file
    const retrievedContent = await getJsFileFromConfluence(null, fileName);
    console.log('Retrieved content:', retrievedContent);
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Uncomment to run the test
// testConfluenceAttachmentApi();

// Export functions for use in other contexts
if (typeof module !== 'undefined') {
  module.exports = {
    uploadJsFileToConfluence,
    getJsFileFromConfluence,
    testConfluenceAttachmentApi
  };
}