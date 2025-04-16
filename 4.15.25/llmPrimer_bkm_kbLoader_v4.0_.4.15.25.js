/**
 * llmPrimer_bkm_kbLoader_v1.0.js
 * Knowledge Base Categories and Domains for llmPrimer Bookmarklet
 */

// Global state to track content loading
window.llmPrimer = window.llmPrimer || {};
window.llmPrimer.contentLoaded = false;
window.llmPrimer.contentLoadingStatus = {
    total: 0,
    completed: 0,
    failed: 0
};

// Categories for knowledge bases
const kbCategory = [
    {
        id: 'designReview',
        title: 'Design Review Tools'
    },
    {
        id: 'research',
        title: 'Research Tools'
    },
    {
        id: 'accessibility',
        title: 'Accessibility Tools'
    }
    // Additional categories can be added here
];

// Knowledge base entries
const kbDomain = [
    {
        id: 'usabilityHeuristics',
        title: 'Usability Heuristics',
        contentUrl: 'https://your-domain.com/path/to/docx_kbtemplate.js', 
        category: 'designReview',
        loadingStatus: 'pending' // Add loading status to each domain
    },
    {
        id: 'accessibilityGuidelines',
        title: 'Accessibility Guidelines',
        contentUrl: 'https://your-domain.com/path/to/accessibilityGuidelines.js',
        category: 'accessibility',
        loadingStatus: 'pending'
    },
    {
        id: 'researchMethods',
        title: 'Research Methods',
        contentUrl: 'https://your-domain.com/path/to/researchMethods.js',
        category: 'research',
        loadingStatus: 'pending'
    }
    // Additional knowledge bases can be added here
];

// Update the UI with loading status if panel exists
function updateLoadingUI() {
    const statusElement = document.getElementById('llmPrimer-loading-status');
    if (statusElement) {
        const { total, completed, failed } = window.llmPrimer.contentLoadingStatus;
        statusElement.textContent = `Loading: ${completed}/${total} complete${failed > 0 ? `, ${failed} failed` : ''}`;
        
        // Update button states if all content is loaded
        if (completed + failed === total) {
            const allButtons = document.querySelectorAll('#llmPrimer-panel button');
            allButtons.forEach(button => {
                if (button.disabled && button.id !== 'llmPrimer-theme-btn' && 
                    button.id !== 'llmPrimer-toggle-btn' && button.id !== 'llmPrimer-close-btn') {
                    button.disabled = false;
                }
            });
            
            // Hide loading status after a delay
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 3000);
        }
    }
}

// Function to dynamically load a JavaScript file
function loadScript(url) {
    return new Promise((resolve, reject) => {
        console.log(`Attempting to load script: ${url}`);
        
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            console.log(`Successfully loaded script: ${url}`);
            resolve();
        };
        script.onerror = (error) => {
            console.error(`Failed to load script: ${url}`, error);
            reject(new Error(`Failed to load ${url}`));
        };
        
        document.head.appendChild(script);
    });
}

// Function to load JS file content via fetch
async function loadJsFile(url) {
    console.log(`Fetching JS file: ${url}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin', // Helps with CORS for same-origin requests
            headers: {
                'Accept': 'application/javascript',
                'Cache-Control': 'no-cache'
            },
        });
        
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
        }
        
        const content = await response.text();
        console.log(`Successfully fetched content from ${url} (${content.length} bytes)`);
        return content;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

// Extract markdown content from JS file content with robust pattern matching
function extractMarkdown(jsContent, domainId) {
    if (!jsContent) {
        console.error(`No content to extract for ${domainId}`);
        return null;
    }
    
    console.log(`Extracting markdown from JS content for ${domainId} (${jsContent.length} bytes)`);
    
    // Try multiple patterns for maximum compatibility
    
    // Pattern 1: Standard variable assignment with single quotes
    let markdownMatch = jsContent.match(/const\s+markdownContent\s*=\s*'([\s\S]*?)';/);
    
    // Pattern 2: If pattern 1 fails, try with double quotes
    if (!markdownMatch) {
        markdownMatch = jsContent.match(/const\s+markdownContent\s*=\s*"([\s\S]*?)";/);
    }
    
    // Pattern 3: Check for window assignment
    if (!markdownMatch) {
        markdownMatch = jsContent.match(/window\.markdownContent\s*=\s*['"]?([\s\S]*?)['"]?;/);
    }
    
    if (markdownMatch && markdownMatch[1]) {
        console.log(`Successfully extracted markdown content for ${domainId} (${markdownMatch[1].length} bytes)`);
        return markdownMatch[1];
    }
    
    // Check if the global variable was set directly by the script
    if (window.markdownContent) {
        console.log(`Found window.markdownContent global variable for ${domainId}`);
        return window.markdownContent;
    }
    
    console.error(`Could not extract markdown content for ${domainId}`);
    // For debugging, log a snippet of the JS content
    console.error(`JS content snippet: ${jsContent.substring(0, 200)}...`);
    return null;
}

// Load content for a single domain
async function loadDomainContent(domain) {
    try {
        console.log(`Loading content for ${domain.id} from ${domain.contentUrl}`);
        domain.loadingStatus = 'loading';
        
        // Try two methods: fetch and script injection
        let jsContent = await loadJsFile(domain.contentUrl);
        
        // If fetch fails, try script injection
        if (!jsContent) {
            console.log(`Fetch failed for ${domain.id}, trying script injection`);
            await loadScript(domain.contentUrl);
            
            // The script might have set window.markdownContent
            if (window.markdownContent) {
                domain.markDown = window.markdownContent;
                domain.loadingStatus = 'loaded';
                console.log(`Successfully loaded markdown for ${domain.id} via script injection`);
                return true;
            }
        } else {
            // Extract markdown from fetched content
            const markdown = extractMarkdown(jsContent, domain.id);
            if (markdown) {
                domain.markDown = markdown;
                domain.loadingStatus = 'loaded';
                console.log(`Successfully loaded markdown for ${domain.id} via fetch`);
                return true;
            }
        }
        
        console.error(`Failed to load content for ${domain.id}`);
        domain.loadingStatus = 'failed';
        return false;
    } catch (error) {
        console.error(`Error processing ${domain.id}:`, error);
        domain.loadingStatus = 'failed';
        return false;
    }
}

// Load all markdown content when the file loads
(async function loadAllMarkdownContent() {
    console.log("=== Starting markdown content loading process ===");
    
    // Initialize loading status
    window.llmPrimer.contentLoadingStatus.total = kbDomain.length;
    updateLoadingUI();
    
    // Create a loading promise for each domain
    for (const domain of kbDomain) {
        try {
            const success = await loadDomainContent(domain);
            
            if (success) {
                window.llmPrimer.contentLoadingStatus.completed++;
            } else {
                window.llmPrimer.contentLoadingStatus.failed++;
            }
            
            updateLoadingUI();
        } catch (error) {
            console.error(`Unexpected error loading ${domain.id}:`, error);
            domain.loadingStatus = 'failed';
            window.llmPrimer.contentLoadingStatus.failed++;
            updateLoadingUI();
        }
    }
    
    // Set global loading status
    window.llmPrimer.contentLoaded = true;
    
    console.log("=== All markdown content loading complete ===");
    console.log(`Successful: ${window.llmPrimer.contentLoadingStatus.completed}, Failed: ${window.llmPrimer.contentLoadingStatus.failed}`);
    
    // Dispatch an event to notify that content is loaded
    document.dispatchEvent(new CustomEvent('llmPrimer_contentLoaded', {
        detail: {
            success: window.llmPrimer.contentLoadingStatus.completed,
            failed: window.llmPrimer.contentLoadingStatus.failed,
            total: window.llmPrimer.contentLoadingStatus.total
        }
    }));
})();

// Make these available in the global scope
window.kbCategory = kbCategory;
window.kbDomain = kbDomain;
