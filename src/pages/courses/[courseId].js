import { css } from '@emotion/react';
import VideoCard from '../../components/coursecomponents/VideoCard';
import Accordion from '../../components/coursecomponents/Accordion';
import Header from '../../components/layout/Header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const pageStyle = css`
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-dark);
`;

const contentStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const safeJsonParse = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return null; // or a sensible default value like {}
    }
  };

const CoursePage = () => {
  const [courseOutline, setCourseOutline] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { courseOutline, videos } = router.query;
      if (courseOutline && videos) {
        const parsedCourseOutline = safeJsonParse(courseOutline);
        const parsedVideos = safeJsonParse(videos);

        // Only update the state if parsing was successful
        if (parsedCourseOutline && parsedVideos) {
          setCourseOutline(parsedCourseOutline);
          setVideos(parsedVideos);
          setCurrentVideoIndex(0); // Assuming the first video is the default
        }
      }
    }
  }, [router.isReady]);
 // Dependency on router.isReady to ensure the query params are available

  const handleStepChange = (index) => {
    // Update the current video based on the selected step
    setCurrentVideoIndex(index);
  };

  // Get the current video object based on the currentVideoIndex
  const currentVideo = videos.length > 0 ? videos[currentVideoIndex]?.videos[0] : null;

  return (
    <div css={pageStyle}>
      <Header />
      <div css={contentStyle}>
        {currentVideo && <VideoCard video={currentVideo} />}
        <Accordion
          steps={courseOutline}
          onStepChange={handleStepChange}
        />
      </div>
    </div>
  );
};

export default CoursePage;
