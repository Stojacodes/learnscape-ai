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

const CoursePage = () => {
    const [courseOutline, setCourseOutline] = useState([]);
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { courseId } = router.query;
  
    useEffect(() => {
      if (!router.isReady || !courseId) return;
  
      const fetchCourseData = async () => {
        setIsLoading(true);
        try {
          // Generate query with examples and level
          const chatGPTQuery = {
            instruction: `List only 6 headings for a beginner course in ${courseId}, without any additional details or explanations.`,
            examples: [
              {
                instruction: "List only 6 headings for a beginner course in wildlife photography, without any additional details or explanations.",
                response: [
                  "Introduction to Wildlife Photography",
                  "Essential Camera Gear and Settings",
                  "Field Techniques and Composition",
                  "Understanding Wildlife Behavior",
                  "Post-Processing and Editing",
                  "Ethics and Conservation in Wildlife Photography"
                ]
              }
            ],
            level: "beginner"
          };

          // Fetch Course Structure
          const courseResponse = await fetch('/api/getCourseStructure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: chatGPTQuery })
          });

          if (!courseResponse.ok) throw new Error('Failed to fetch course structure');
          const courseOutlineData = await courseResponse.json();

          // Fetch Videos
          let fetchedVideos = [];
          for (const step of courseOutlineData.courseOutline) {
            const videoResponse = await fetch(`/api/searchYouTube?q=${encodeURIComponent(step)}`);
            if (!videoResponse.ok) continue;
            const videoData = await videoResponse.json();
            fetchedVideos.push({ title: step, videos: videoData.items });
          }

          setCourseOutline(courseOutlineData.courseOutline);
          setVideos(fetchedVideos);
        } catch (error) {
          console.error("Error fetching course data:", error);
          setError('Failed to load course data.');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCourseData();
    }, [router.isReady, courseId]);

    const handleStepChange = (index) => {
      setCurrentVideoIndex(index);
    };

    const currentVideo = videos.length > 0 ? videos[currentVideoIndex]?.videos[0] : null;

    return (
      <div css={pageStyle}>
        <Header />
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div css={contentStyle}>
            {currentVideo && <VideoCard video={currentVideo} />}
            <Accordion
              steps={courseOutline}
              onStepChange={handleStepChange}
            />
          </div>
        )}
      </div>
    );
};

export default CoursePage;


