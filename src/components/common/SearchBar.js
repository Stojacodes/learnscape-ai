import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';


const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 60%; // Set to the desired percentage of the parent container
  min-width: 600px; // Ensures that it has a larger initial width
  margin: auto; // Center the search bar
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 1rem;
  border: none;
  border-radius: 25px 0 0 25px;
  font-size: 1rem;
  color: var(--greyscale-grey-5);
  &::placeholder {
    color: var(--greyscale-grey-5);
  }
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0 25px 25px 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #48CFEC;
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Hook to access the Next.js router

  const generateQuery = (topic, level = "beginner") => {
    const instruction = `Create a list of 6 concise step-by-step headings for a beginner course in ${topic}. Please only list the course headings and avoid additional explanations or details.`;
    const examples = [
      {
        instruction: "Create a list of 6 concise step-by-step headings for a beginner course in wildlife photography. Please only list the course headings and avoid additional explanations or details.`;",
        response: [
          "Introduction to Wildlife Photography",
          "Essential Camera Gear and Settings",
          "Field Techniques and Composition",
          "Understanding Wildlife Behavior",
          "Post-Processing and Editing",
          "Ethics and Conservation in Wildlife Photography"
        ]
      }
    ];
    return {
      instruction: instruction,
      examples: examples,
      level: level
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (searchTerm) {
      const chatGPTQuery = generateQuery(searchTerm);
  
      try {
        const courseResponse = await fetch('/api/getCourseStructure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: chatGPTQuery })
        });
  
        if (!courseResponse.ok) {
          throw new Error(`Error fetching course structure: ${courseResponse.statusText}`);
        }
        
        const courseData = await courseResponse.json();
  
        let videos = [];
        for (const step of courseData.courseOutline) {
          const videoResponse = await fetch(`/api/searchYouTube?q=${encodeURIComponent(step)}`);
          if (!videoResponse.ok) {
            throw new Error(`Failed to fetch videos for step: ${step}`);
          }
          const videoData = await videoResponse.json();
          videos.push({ title: step, videos: videoData.items });
        }
  
        // Navigate to the course page with the course outline and videos
        router.push({
          pathname: '/courses/[courseId]',
          query: { courseId: searchTerm, courseOutline: courseData.courseOutline, videos: videos }
        });
  
      } catch (error) {
        console.error("Error during course creation:", error);
        setError(error.message);
      }
    } else {
      setError("Please enter a valid query.");
    }
  };

  return (
    <SearchBarContainer>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <SearchInput
          type="text"
          placeholder="e.g. The French Revolution, Skateboarding, Fermat's Last Theorem..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">Create Course</SearchButton>
      </form>
    </SearchBarContainer>
  );
};

export default SearchBar;