/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import VideoCard from '../components/coursecomponents/VideoCard';
import Accordion from '../components/coursecomponents/Accordion';
import Header from '../components/layout/Header'; // Update this path if necessary

const pageStyle = css`
  display: flex;
  flex-direction: column; // Stack elements vertically
  background-color: var(--color-background-dark); // Use the global background color
`;

const contentStyle = css`
  display: flex;
  justify-content: space-between; // Space out the VideoCard and Accordion
  padding: 20px; // Add padding around the content area
`;

const TestPage = () => {
  // Mock video data
  const mockVideo = {
    id: 'aK0aSbw6anxpzOwu', // Example YouTube video ID
    title: 'Understanding Animal Behavior',
    description: 'In this step, you will learn the importance of understanding wildlife behavior...',
  };

  return (
    <div css={pageStyle}>
      <Header /> {/* This will place the Header at the top */}
      <div css={contentStyle}>
        {/* The VideoCard and Accordion will be placed side by side below the Header */}
        <VideoCard video={mockVideo} />
        <Accordion />
      </div>
    </div>
  );
};

export default TestPage;

