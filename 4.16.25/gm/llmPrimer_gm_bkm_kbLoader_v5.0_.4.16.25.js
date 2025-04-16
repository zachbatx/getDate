/**
 * llmPrimer_bkm_kbLoader_v4.0_.4.16.25.js (REVISED + Enhanced Logging)
 * Knowledge Base Categories and Domains for llmPrimer Bookmarklet
 * Loads content from JSON files in parallel with detailed logging.
 */

// --- Global state ---
window.llmPrimer = window.llmPrimer || {};
window.llmPrimer.contentLoaded = false;
window.llmPrimer.contentLoadingStatus = {
    total: 0,
    completed: 0,
    failed: 0
};

// --- Categories ---
const kbCategory = [
    { id: 'designReview', title: 'Design Review Tools' },
    { id: 'research', title: 'Research Tools' },
    { id: 'accessibility', title: 'Accessibility Tools' }
    // Add more categories as needed
];

// --- Knowledge Base Definitions (pointing to JSON files) ---
const kbDomain = [
    {
        id: 'usabilityHeuristics',
        title: 'Usability Heuristics',
        contentUrl: 'https://your-domain.com/path/to/usabilityHeuristics.json', // <-- Ensure this points to your JSON
        category: 'designReview',
        loadingStatus: 'pending', // Values: pending, loading, loaded, failed
        markDown: null // To store loaded content
    },
    {
        id: 'accessibilityGuidelines',
        title: 'Accessibility Guidelines',
        contentUrl: 'https://your-domain.com/path/to/accessibilityGuidelines.json', // <-- Ensure this points to your JSON
        category: 'accessibility',
        loadingStatus: 'pending',
        markDown: null
    },
    {
        id: 'researchMethods',
        title: 'Research Methods',
        contentUrl: 'https://your-domain.com/path/to/researchMethods.json', // <-- Ensure this points to your JSON
        category: 'research',
        loadingStatus: 'pending',
        markDown: null
    }
    // Add more knowledge bases as needed
];

// --- UI Update Function ---
function updateLoadingUI() {
    const statusElement = document.getElementById('llmPrimer-loading-status');
    if (statusElement) {
        const { total, completed, failed } = window.llmPrimer.contentLoadingStatus;
        statusElement.textContent = `Loading KB: ${completed}/${total} complete${failed > 0 ? `, ${failed} failed` : ''}`;
    }
    // Refresh dropdown if visible to show updated status icons (✓/failed)
    // This relies on the UI script's 'x' function being available globally or attached to window.
    // A more robust way would be event-driven updates or direct DOM manipulation here.
    if (typeof x === 'function') { // Check if UI function exists
        const categorySelect = document.querySelector('.categorySelect');
         if (categorySelect && categorySelect.value) {
             try {
                x(categorySelect.value); // Call the UI function to repopulate KB dropdown
             } catch (uiError) {
                 console.error("Error calling UI update function 'x':", uiError);
             }
         }
    } else {
        // Fallback or alternative: directly update dropdown options if 'x' isn't reliable
        const kbSelect = document.querySelector('.knowledgeBaseSelect');
        if (kbSelect) {
            kbDomain.forEach(domain => {
                const option = kbSelect.querySelector(`option[value="${domain.id}"]`);
                if (option) {
                    let text = domain.title;
                    if (domain.loadingStatus === 'loaded') text += ' ✓';
                    else if (domain.loadingStatus === 'loading') text += ' (loading...)';
                    else if (domain.loadingStatus === 'failed') text += ' (failed)';
                    option.textContent = text;
                }
            });
        }
    }
}


// --- Function to load content for a single domain from JSON (with enhanced logging) ---
async function loadDomainContent(domain) {
    const url = domain.contentUrl;
    const domainId = domain.id; // For clearer logging association
    console.log(`[${domainId}] Attempting to fetch JSON from: ${url}`);
    domain.loadingStatus = 'loading'; // Set status early

    // Create a reference that can be cloned for reading body after potential .json() failure
    let response;

    try {
        response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache' // Ensures fresh data during debugging
            },
            // credentials: 'omit' // Default
        });

        console.log(`[${domainId}] Fetch response received. Status: ${response.status}, OK: ${response.ok}`);

        if (!response.ok) {
            // Log the response body text for non-OK responses to see error details
            let errorBody = '(Could not read error body)';
            try {
                // Clone response to read body without consuming original
                const errorResponseClone = response.clone();
                errorBody = await errorResponseClone.text();
                console.error(`[${domainId}] Fetch response body (error): ${errorBody.substring(0, 500)}...`);
            } catch (bodyError) {
                console.error(`[${domainId}] Error reading response body:`, bodyError);
            }
            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }

        // Check Content-Type header BEFORE parsing JSON
        const contentType = response.headers.get('content-type');
        console.log(`[${domainId}] Response Content-Type: ${contentType}`);
        if (!contentType || !contentType.includes('application/json')) {
            console.warn(`[${domainId}] Warning: Received Content-Type ('${contentType}') is not 'application/json'. Attempting to parse anyway.`);
            // Depending on server/browser, response.json() might still work, but it's risky.
        }

        let data;
        // Clone the response *before* attempting to parse JSON, so we can read text if it fails
        const responseCloneForParsing = response.clone();

        try {
            data = await response.json(); // Attempt to parse JSON from original response
            console.log(`[${domainId}] JSON parsing successful.`);
        } catch (parseError) {
            console.error(`[${domainId}] JSON parsing failed:`, parseError);
            // Try to log the raw text response using the clone
            try {
                 const rawText = await responseCloneForParsing.text(); // Use the clone
                 console.error(`[${domainId}] Raw response text that failed parsing: ${rawText.substring(0, 500)}...`);
            } catch(textError){
                 console.error(`[${domainId}] Could not read raw text from response clone after JSON parse failure.`, textError);
            }
            throw new Error(`JSON parsing error: ${parseError.message}`);
        }


        // Check the structure AFTER successful parsing
        if (data && typeof data.markdownContent === 'string') {
            domain.markDown = data.markdownContent;
            domain.loadingStatus = 'loaded';
            console.log(`[${domainId}] Successfully loaded and validated markdown (${domain.markDown.length} bytes)`);
            return true; // Indicate success
        } else {
            console.error(`[${domainId}] JSON structure invalid or missing 'markdownContent' (type string). Found keys:`, data ? Object.keys(data) : 'null/undefined');
            console.error(`[${domainId}] Value of markdownContent:`, data ? data.markdownContent : 'N/A', `Type:`, data ? typeof data.markdownContent : 'N/A');
            throw new Error(`Invalid JSON structure in ${url}`);
        }

    } catch (error) {
        // Log the final error causing the failure state
        console.error(`[${domainId}] Final error in loadDomainContent:`, error);
        domain.loadingStatus = 'failed';
        domain.markDown = null;
        return false; // Indicate failure
    }
}


// --- Load all markdown content (in parallel) ---
(async function loadAllMarkdownContent() {
    console.log("=== Starting parallel markdown content loading process ===");

    window.llmPrimer.contentLoadingStatus.total = kbDomain.length;
    updateLoadingUI(); // Initial UI update

    // Create an array of promises, one for each domain load
    const loadingPromises = kbDomain.map(async (domain) => {
        const success = await loadDomainContent(domain); // Calls the revised function
        // Update global counters based on success/failure
        // Using atomics might be safer in highly concurrent environments, but unlikely needed here.
        if (success) {
            window.llmPrimer.contentLoadingStatus.completed++;
        } else {
            window.llmPrimer.contentLoadingStatus.failed++;
        }
        updateLoadingUI(); // Update UI progress after each attempt
        return { id: domain.id, status: domain.loadingStatus }; // Return status
    });

    // Wait for all loading attempts to complete (either success or failure)
    const results = await Promise.allSettled(loadingPromises);

    console.log("=== All markdown content loading attempts finished ===");
    // Optional: Log detailed results for debugging
    console.log("Loading results:", results.map(r => r.status === 'fulfilled' ? r.value : { status: 'rejected', reason: r.reason?.message || r.reason }));


    // Set global flag and log final summary
    window.llmPrimer.contentLoaded = true;
    console.log(`Final Status - Total: ${window.llmPrimer.contentLoadingStatus.total}, ` +
                `Successful: ${window.llmPrimer.contentLoadingStatus.completed}, ` +
                `Failed: ${window.llmPrimer.contentLoadingStatus.failed}`);

    // Dispatch the final event to notify the UI script
    document.dispatchEvent(new CustomEvent('llmPrimer_contentLoaded', {
        detail: {
            success: window.llmPrimer.contentLoadingStatus.completed,
            failed: window.llmPrimer.contentLoadingStatus.failed,
            total: window.llmPrimer.contentLoadingStatus.total
        }
    }));

    // Final UI update (e.g., hide status message in UI script's event listener)
    updateLoadingUI();

})();

// --- Make data available globally ---
window.kbCategory = kbCategory;
window.kbDomain = kbDomain;

console.log("llmPrimer Knowledge Base Loader initialized with enhanced logging.");