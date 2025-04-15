/**
 * llmPrimer_bkm_kbLoader_v1.0.js
 * Knowledge Base Categories and Domains for llmPrimer Bookmarklet
 */

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
        category: 'designReview'
    },
    {
        id: 'accessibilityGuidelines',
        title: 'Accessibility Guidelines',
        contentUrl: 'https://your-domain.com/path/to/accessibilityGuidelines.js',
        category: 'accessibility'
    },
    {
        id: 'researchMethods',
        title: 'Research Methods',
        contentUrl: 'https://your-domain.com/path/to/researchMethods.js',
        category: 'research'
    }
    // Additional knowledge bases can be added here
];

// Function to load JS file content
async function loadJsFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

// Extract markdown content from JS file content
function extractMarkdown(jsContent) {
    if (!jsContent) return null;
    
    // Extract content between single quotes after markdownContent declaration
    const markdownMatch = jsContent.match(/const\s+markdownContent\s*=\s*'([\s\S]*?)';/);
    if (markdownMatch && markdownMatch[1]) {
        return markdownMatch[1];
    }
    
    console.error("Could not extract markdown content from JS file");
    return null;
}

// Load all markdown content when the file loads
(async function loadAllMarkdownContent() {
    console.log("Loading markdown content from all contentUrl files...");
    
    // Create a loading promise for each domain
    const loadingPromises = kbDomain.map(async (domain) => {
        try {
            console.log(`Loading content for ${domain.id} from ${domain.contentUrl}`);
            
            // Load the JS file
            const jsContent = await loadJsFile(domain.contentUrl);
            
            if (jsContent) {
                // Extract and store the markdown
                const markdown = extractMarkdown(jsContent);
                if (markdown) {
                    domain.markDown = markdown;
                    console.log(`Successfully loaded markdown for ${domain.id}`);
                } else {
                    console.error(`Failed to extract markdown from ${domain.contentUrl}`);
                }
            }
        } catch (error) {
            console.error(`Error processing ${domain.id}:`, error);
        }
    });
    
    // Wait for all content to load
    await Promise.all(loadingPromises);
    
    console.log("All markdown content loading complete");
    
    // Dispatch an event to notify that content is loaded
    document.dispatchEvent(new CustomEvent('llmPrimer_contentLoaded'));
})();