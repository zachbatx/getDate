//6. JavaScript Bookmarklet (Quick Fix)
//For a quick personal fix while viewing:
javascriptjavascript:(function(){
    document.querySelectorAll('iframe').forEach(iframe => {
        try {
            const doc = iframe.contentDocument;
            if (doc) {
                const style = doc.createElement('style');
                style.textContent = '.embed-video-player{max-width:none!important;}';
                doc.head.appendChild(style);
            }
        } catch(e) {
            console.log('Cross-origin iframe, cannot modify');
        }
    });
})();



1. URL Parameter Hack (if you control the video server)
If you have access to the internal video server's code, modify it to accept a style parameter:
javascript// On the video server, add this logic:
const urlParams = new URLSearchParams(window.location.search);
const customStyle = urlParams.get('style');

if (customStyle === 'confluence') {
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .embed-video-player { max-width: none !important; }
        </style>
    `);
}
Then in Confluence:
html<iframe src="https://internal-server.com/video?id=123&style=confluence"></iframe>
2. Proxy Server Solution
Set up a simple proxy that injects the CSS:
javascript// Node.js proxy server example
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/video-proxy/:videoId', async (req, res) => {
    try {
        // Fetch original video page
        const response = await axios.get(`https://internal-server.com/video/${req.params.videoId}`);
        let html = response.data;
        
        // Inject CSS fix before closing </head>
        const cssInjection = '<style>.embed-video-player { max-width: none !important; }</style></head>';
        html = html.replace('</head>', cssInjection);
        
        res.send(html);
    } catch (error) {
        res.status(500).send('Proxy error');
    }
});

app.listen(3000);
Then iframe your proxy URL instead:
html<iframe src="https://your-proxy.com/video-proxy/123"></iframe>
3. PostMessage Communication (if video server supports it)
If the video server can be modified to listen for messages:
javascript// On video server
window.addEventListener('message', (event) => {
    if (event.data.type === 'injectCSS') {
        const style = document.createElement('style');
        style.textContent = event.data.css;
        document.head.appendChild(style);
    }
});

// In Confluence (parent page)
const iframe = document.getElementById('video-iframe');
iframe.onload = function() {
    iframe.contentWindow.postMessage({
        type: 'injectCSS',
        css: '.embed-video-player { max-width: none !important; }'
    }, 'https://internal-server.com');
};
4. Direct Video Embedding (No iframe)
Fetch the video URL directly and embed it:
javascript// Use Confluence REST API to create custom content
async function embedVideoDirect() {
    // First, fetch video metadata from your internal server
    const videoData = await fetch('https://internal-server.com/api/video/123')
        .then(res => res.json());
    
    // Create HTML5 video element with proper styling
    const videoHtml = `
        <div style="max-width: none; width: 100%;">
            <video controls style="width: 100%; max-width: none;">
                <source src="${videoData.url}" type="video/mp4">
            </video>
        </div>
    `;
    
    // Update Confluence page
    const pageId = 'YOUR_PAGE_ID';
    const updateUrl = `/rest/api/content/${pageId}`;
    
    await fetch(updateUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Atlassian-Token': 'no-check'
        },
        body: JSON.stringify({
            version: { number: currentVersion + 1 },
            type: 'page',
            body: {
                storage: {
                    value: videoHtml,
                    representation: 'storage'
                }
            }
        })
    });
}
5. Confluence User Macro (Best for Confluence)
Create a user macro that properly embeds videos:
html## Macro title: Custom Video Embed
## Macro has a body: N
## @param VideoUrl:title=Video URL|type=string|required=true

<div class="custom-video-wrapper">
    <style>
        .custom-video-wrapper iframe {
            max-width: none !important;
            width: 100% !important;
        }
        /* Target nested elements if needed */
        .custom-video-wrapper .embed-video-player {
            max-width: none !important;
        }
    </style>
    <iframe src="$paramVideoUrl" 
            width="100%" 
            height="600" 
            frameborder="0">
    </iframe>
</div>