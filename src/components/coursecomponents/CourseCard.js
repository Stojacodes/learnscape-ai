import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

const Card = styled.div`
  width: 250px; // Adjust the width as needed
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px; // Adjust the border-radius as needed
  overflow: hidden;
  margin: 1rem;
  background: var(--color-white);
`;

const CourseImage = styled.div`
  width: 100%;
  height: 150px; // Adjust the height as needed
  position: relative;
`;

const CourseInfo = styled.div`
  padding: 1rem;
  h3 {
    color: var(--text-color-primary-dark);
    margin-bottom: 0.5rem;
  }
  p {
    color: var(--text-color-primary-light);
    font-size: 0.875rem;
  }
`;

const CourseCard = ({ image, title, description }) => (
  <Card>
    <CourseImage>
      <Image src={image} alt={title} layout="fill" objectFit="cover" />
    </CourseImage>
    <CourseInfo>
      <h3>{title}</h3>
      <p>{description}</p>
    </CourseInfo>
  </Card>
);

export default CourseCard;
