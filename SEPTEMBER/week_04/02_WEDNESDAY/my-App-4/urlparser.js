// urlParser.js
function urlParser(url) {
    try {
        const parsedUrl = new URL(url);
        return {
            protocol: parsedUrl.protocol,
            host: parsedUrl.host,
            path: parsedUrl.pathname,
            query: Object.fromEntries(parsedUrl.searchParams) 
        };
    } catch (error) {
        console.error("Invalid URL:", error.message);
        return null;
    }
}

module.exports = urlParser;
