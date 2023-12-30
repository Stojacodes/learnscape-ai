// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// This function now only interacts with OpenAI to generate the course structure.
export default async function getCourseStructure(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }

    const { OPENAI_API_KEY } = process.env;

    if (!req.body || !req.body.query || !req.body.query.instruction) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }

    const query = req.body.query;

    try {
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
            .map(step => step.trim()) // Trim each step
            .filter(step => step); // Filter out any empty strings

        // Send the course outline back to the client
        res.status(200).json({ courseOutline });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}
