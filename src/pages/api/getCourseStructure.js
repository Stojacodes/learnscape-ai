// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function getCourseStructure(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }

    const { OPENAI_API_KEY, YOUTUBE_API_KEY } = process.env;
    const MAX_WORDS_PER_STEP = 10;
    const MAX_RESULTS_PER_STEP = 3;

    function removeDuplicateWords(str) {
        let words = str.split(" ");
        let uniqueWords = [...new Set(words)];
        return uniqueWords.join(" ");
    }

    if (!req.body || !req.body.query || !req.body.query.instruction) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }

    const query = req.body.query;

    try {
        // Log the request body
        console.log("Request body:", req.body);

        // Extract the topic from the instruction
        const matches = query.instruction.match(/a beginner course in (.+?)\./);
        if (!matches) {
            console.error("Failed to extract topic from instruction:", query.instruction);
            res.status(400).json({ error: "Failed to extract topic from instruction" });
            return;
        }
        const topic = matches[1];

        // Construct the messages for OpenAI
        const messages = [
            { role: "system", content: "You are a helpful assistant specialized in creating educational course outlines." },
            { role: "user", content: query.instruction }
        ];

        // Call OpenAI API
        const chatGPTResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages
            })
        });

        const chatGPTData = await chatGPTResponse.json();

        // Extract the course outline from the OpenAI response
        const courseOutline = chatGPTData.choices[0].message.content.trim().split('\n')
            .filter(step => step.split(' ').length <= MAX_WORDS_PER_STEP);

        // Fetch YouTube videos
        const videos = [];
        const errors = [];
        const selectedVideoIds = [];

        for (const step of courseOutline) {
            // Construct the YouTube search query
            const searchQuery = `${step} ${topic}`;
            const cleanedSearchQuery = removeDuplicateWords(searchQuery);

            // Call YouTube API
            const youtubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(cleanedSearchQuery)}&maxResults=${MAX_RESULTS_PER_STEP}&type=video&key=${YOUTUBE_API_KEY}`);
            const youtubeData = await youtubeResponse.json();

        }

        // Send the response with videos and any errors
        res.status(200).json({ videos: videos, errors: errors });
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}
