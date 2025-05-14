async function loadJSFileContent(filename) {
  if (!editableContent || !jsEditorElement || !outputFileName || !exportBtn || !fileInfo) return; // Check elements

  console.log(`Loading JS file: ${filename}`);
  loadedJsFilename = filename; // Track loaded file
  showAlert(`Loading ${filename}...`, 'info', 2000);

  try {
    const jsContent = await getJsFileFromConfluence(filename);
    
    if (!jsContent) {
      throw new Error("Received empty content.");
    }
    console.log(`Content loaded for ${filename}. Length: ${jsContent.length}`);
    jsEditorElement.textContent = jsContent; // Show raw content in JS view first

    const extractedData = extractDataFromJsCode(jsContent);
    console.log("Extracted data:", extractedData);

    if (extractedData.type === 'llmPrimer') {
      // IMPORTANT FIX: Unescape template literal escape sequences before processing
      let unescapedContent = extractedData.content
        .replace(/\\`/g, '`')     // Unescape backticks
        .replace(/\\\$/g, '$')    // Unescape dollar signs
        .replace(/\\\\/g, '\\');  // Unescape backslashes (must come last)
      
      // Store the properly unescaped content
      currentMarkdownContent = unescapedContent;
      
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

      // Update Markdown view with unescaped content
      markdownEditor.textContent = currentMarkdownContent;

      // Switch to the original content tab by default when loading
      contentTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.content-tab-panel').forEach(c => c.classList.remove('active'));
      document.querySelector('.content-tab[data-content-tab="original"]').classList.add('active');
      document.getElementById('originalContent').classList.add('active');
    } else {
      // Handle other potential types if needed in the future
      throw new Error("Loaded JS file is not in the expected llmPrimerRegister format.");
    }

    outputFileName.value = filename; // Ensure filename matches loaded file
    exportBtn.disabled = false;
    exportBtn.textContent = 'Save'; // Change button text to 'Save'
    fileInfo.classList.remove('show'); // Hide DOCX info area
    userModifiedFilename = false; // Reset after successful load

    showAlert(`JS File '${filename}' loaded successfully!`, 'success');
  } catch (error) {
    console.error(`Error loading JS file '${filename}':`, error);
    editableContent.innerHTML = `<p>Error displaying content. Invalid or unsupported JS file format.<br><i>${error.message}</i></p>`;
    if (markdownEditor) markdownEditor.textContent = "Error processing JS file.";
    if (jsEditorElement) jsEditorElement.textContent = error.message; // Show error in JS view
    showAlert(`Error loading JS File '${filename}': ${error.message}`, 'error', 6000);
    exportBtn.disabled = true; // Disable saving if processing failed
    resetEditorState(true); // Clear everything on load failure
  }
}