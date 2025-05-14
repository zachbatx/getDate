Not at the very end of your script — you want those two lines at the top of the loadJSFileContent function so every time you pull in a new file it starts from a clean slate. Here’s exactly what to do:

Open kb_editor_api_v1.7_5.13.25.html and find the loadJSFileContent declaration (around line 1495).
Immediately after the if (!editableContent || …) return; line, insert:
// clear out any previous content before loading a new file
editableContent.innerHTML = '';
jsEditorElement.textContent = '';

So that your function looks like:
   
   
   async function loadJSFileContent(filename) {
-    if (!editableContent || !jsEditorElement || !outputFileName || !exportBtn || !fileInfo) return; // Check elements
+    if (!editableContent || !jsEditorElement || !outputFileName || !exportBtn || !fileInfo) return; // Check elements

+    // clear out any previous content before loading a new file
+    editableContent.innerHTML = '';
+    jsEditorElement.textContent = '';

    console.log(`Loading JS file: ${filename}`);
    loadedJsFilename = filename; // Track loaded file
    showAlert(`Loading ${filename}...`, 'info', 2000);
    …
