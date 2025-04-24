async function saveChangesToLoader() {
  if (!currentLoader || !currentLoader.filename || !currentLoader.content) {
    showAlert('No loader file loaded, or content missing. Cannot save changes.', 'error');
    return;
  }

  // 1) Build the updated JS text (same as before)
  const categoryJson   = JSON.stringify(categories.map(c => ({ id: c.originalId, title: c.name })), null, 2);
  const domainJson     = JSON.stringify(knowledgeBases.map(kb => ({
    id:       kb.originalId,
    title:    kb.name,
    category: kb.categoryIds[0] 
               ? categories.find(c => c.id === kb.categoryIds[0]).originalId 
               : null,
    url:      kb.url
  })), null, 2);

  let updated = currentLoader.content
    .replace(/\bkbCategory\s*=\s*\[[\s\S]*?\]/i,   `kbCategory = ${categoryJson}`)
    .replace(/\bkbDomain\s*=\s*\[[\s\S]*?\]/i,     `kbDomain   = ${domainJson}`);

  // 2) Prepare the file blob
  const blob = new Blob([updated], { type: 'application/javascript' });
  const jsFile = new File([blob], currentLoader.filename, { type: 'application/javascript' });

  // 3) Hit the Confluence attachments API
  const baseUrl  = 'https://confluence.prod.aws.jpmchase.net/confluence';
  const pageId   = '<YOUR_PAGE_ID_HERE>';
  const token    = '<YOUR_API_TOKEN_HERE>';

  // 3a) Find existing attachment (by filename)
  const listRes = await fetch(
    `${baseUrl}/rest/api/content/${pageId}/child/attachment?filename=${encodeURIComponent(jsFile.name)}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  const listJson = await listRes.json();
  let attachmentId;

  if (listJson.results && listJson.results.length > 0) {
    attachmentId = listJson.results[0].id;        // update existing
  } else {
    // no existing attachment → create a new one
    const form = new FormData();
    form.append('file', jsFile);
    const createRes = await fetch(
      `${baseUrl}/rest/api/content/${pageId}/child/attachment?allowDuplicates=true`,
      {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Atlassian-Token': 'no-check'
        },
        body: form
      }
    );
    const createJson = await createRes.json();
    attachmentId = createJson.results[0].id;
  }

  // 3b) Upload the new blob to overwrite the attachment
  const updateForm = new FormData();
  updateForm.append('file', jsFile);
  const updateRes = await fetch(
    `${baseUrl}/rest/api/content/${pageId}/child/attachment/${attachmentId}/data`,
    {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Atlassian-Token': 'no-check'
      },
      body:    updateForm
    }
  );

  if (!updateRes.ok) {
    const err = await updateRes.text();
    throw new Error(`Confluence API error: ${updateRes.status} ${err}`);
  }

  showAlert(`Successfully saved changes to ${jsFile.name}!`, 'success');
}


//Swap out <YOUR_PAGE_ID_HERE> and <YOUR_API_TOKEN_HERE>, drop this into your code, and your loader will save just as reliably as your exports do—no more drag-and-drop hacks!