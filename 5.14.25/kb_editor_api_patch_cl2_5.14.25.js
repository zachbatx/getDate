// Find this section in loadJSFileContent function
// Around line 656 where it extracts data from JS code
if (extractedData.type === 'llmPrimer') {
  // Add this unescaping code
  currentMarkdownContent = extractedData.content
    .replace(/\\\\/g, '\\') // Unescape backslashes first
    .replace(/\\`/g, '`')   // Unescape backticks
    .replace(/\\\$/g, '$'); // Unescape dollar signs
  
  currentJsObject = { // Create a basic JS object representation
    name: extractedData.name,
    title: extractedData.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Infer title
    category: '', // Category not stored in llmPrimer, leave empty
    content: '' // Will be populated by markdown->html conversion
  };
  documentName = currentJsObject.name; // Update global var if needed

  // Convert Markdown to HTML for the rich text editor
  const htmlContent = markdownToHtml(currentMarkdownContent);
  editableContent.innerHTML = htmlContent;
  currentJsObject.content = htmlContent; // Store HTML in object

  // Update Markdown view
  markdownEditor.textContent = currentMarkdownContent;

  // Rest of the function remains unchanged
}