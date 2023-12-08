// pages/api/searchYouTube.js

export default async function searchYouTube(req, res) {
    const { YOUTUBE_API_KEY } = process.env;
    const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

    try {
        const query = req.query.q; // Retrieve the query parameter from the request

        const url = new URL(YOUTUBE_API_URL);
        url.searchParams.append('part', 'snippet');
        url.searchParams.append('maxResults', '6'); // You can change the number of results
        url.searchParams.append('q', query);
        url.searchParams.append('key', YOUTUBE_API_KEY);

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`YouTube API responded with status: ${response.status}`);
        }

        // Log the URL and raw response for debugging
        console.log('URL:', url.toString());
        const data = await response.json();
        console.log('Received YouTube data:', data);

        res.status(200).json(data); // Return the results as JSON
    } catch (error) {
        console.error('Error in serverless function:', error);
        res.status(500).json({ error: 'An error occurred while fetching videos.' });
    }
}
