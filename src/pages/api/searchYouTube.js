export default async function searchYouTube(req, res) {
    const { YOUTUBE_API_KEY } = process.env;
    const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

    try {
        const { q: query } = req.query; // Retrieve the query parameter from the request

        const url = `${YOUTUBE_API_URL}?part=snippet&maxResults=6&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`YouTube API responded with status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Received YouTube data:', data);
        res.status(200).json(data); // Return the results as JSON
    } catch (error) {
        console.error('Error in serverless function:', error);
        res.status(500).json({ error: 'An error occurred while fetching videos.' });
    }
}

