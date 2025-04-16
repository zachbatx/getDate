//llmPrimer_gm_bkm_kbLoader_v5.0_.4.16.25.js
/**
 * llmPrimer_bkm_kbLoader_v4.0_.4.16.25.js (REVISED)
 * Knowledge Base Categories and Domains for llmPrimer Bookmarklet
 * Loads content from JSON files.
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
        contentUrl: 'https://your-domain.com/path/to/usabilityHeuristics.json', // <-- Changed to .json
        category: 'designReview',
        loadingStatus: 'pending', // Values: pending, loading, loaded, failed
        markDown: null // To store loaded content
    },
    {
        id: 'accessibilityGuidelines',
        title: 'Accessibility Guidelines',
        contentUrl: 'https://your-domain.com/path/to/accessibilityGuidelines.json', // <-- Changed to .json
        category: 'accessibility',
        loadingStatus: 'pending',
        markDown: null
    },
    {
        id: 'researchMethods',
        title: 'Research Methods',
        contentUrl: 'https://your-domain.com/path/to/researchMethods.json', // <-- Changed to .json
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
    const categorySelect = document.querySelector('.categorySelect');
    if (categorySelect && categorySelect.value) {
        const event = new Event('change'); // Simulate a change event
        categorySelect.dispatchEvent(event);
    }
}

// --- Function to load content for a single domain from JSON ---
async function loadDomainContent(domain) {
    try {
        console.log(`Fetching JSON content for ${domain.id} from ${domain.contentUrl}`);
        domain.loadingStatus = 'loading';
        // Note: UI update for individual status (e.g., in dropdown) happens via updateLoadingUI

        const response = await fetch(domain.contentUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache' // Or configure server-side caching appropriately
            },
            // credentials: 'omit' // Usually suitable for static assets, adjust if auth needed
        });

        if (!response.ok) {
            throw new Error(`Failed to load ${domain.contentUrl}: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse the response as JSON

        if (data && typeof data.markdownContent === 'string') {
            domain.markDown = data.markdownContent;
            domain.loadingStatus = 'loaded';
            console.log(`Successfully loaded markdown for ${domain.id} (${domain.markDown.length} bytes)`);
            return true; // Indicate success
        } else {
            throw new Error(`Invalid JSON structure or missing 'markdownContent' string in ${domain.contentUrl}`);
        }

    } catch (error) {
        console.error(`Error processing ${domain.id} (${domain.contentUrl}):`, error);
        domain.loadingStatus = 'failed';
        domain.markDown = null; // Ensure markdown is null on failure
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
        const success = await loadDomainContent(domain);
        // Update global counters based on success/failure
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
    // console.log("Loading results:", results);

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

console.log("llmPrimer Knowledge Base Loader initialized.");