/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// VideoCard component styles
const videoCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background); // Using global color variable
  color: var(--text-color-primary-dark); // Using global color variable
  margin-bottom: 16px; // Spacing between cards, adjust as needed
`;

const videoFrameStyle = css`
  width: 989px; // Width as per Figma
  height: 589px; // Height as per Figma
  background-color: #000; // Placeholder for video background
`;

const videoInfoStyle = css`
  width: 989px; // Width as per Figma
  height: 134px; // Height as per Figma
  padding: 16px 24px; // Padding as per Figma
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Align text to the start
  gap: 8px; // Space between title and description
`;

// VideoCard component
const VideoCard = ({ video }) => {
  // Placeholder for video iframe src url
  const videoUrl = `https://www.youtube.com/embed/${video.id}`;

  return (
    <div css={videoCardStyle}>
      <iframe
        css={videoFrameStyle}
        src={videoUrl}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div css={videoInfoStyle}>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
