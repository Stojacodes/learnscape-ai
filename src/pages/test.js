import VideoCard from '../components/coursecomponents/VideoCard';

const TestPage = () => {
  // Mock video data
  const mockVideo = {
    id: 'aK0aSbw6anxpzOwu', // Example YouTube video ID
    title: 'Understanding Animal Behavior',
    description: 'In this step, you will learn the importance of understanding wildlife behavior...',
  };

  return (
    <div>
      <VideoCard video={mockVideo} />
    </div>
  );
};

export default TestPage;