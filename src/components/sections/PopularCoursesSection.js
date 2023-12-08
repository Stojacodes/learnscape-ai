// src/components/sections/PopularCoursesSection.js
import React from 'react';
import styled from '@emotion/styled';

// Ensure this container takes up all the height it can
const SectionContainer = styled.section`
  background-color: var(--color-white);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  box-sizing: border-box; // Include padding in the height calculation
  min-height: calc(100vh - 50px - 252.236px); // Adjusted for the header and hero section heights
`;

const SectionTitle = styled.h2`
  color: var(--text-color-primary-light); // Uses the primary dark text color variable
  margin: 0 0 2rem 0; // Adds margin to the bottom
  font-size: 1.5rem; // Sets a font-size, adjust as needed
  font-weight: 500;
`;

const PopularCoursesSection = () => (
  <SectionContainer>
    <SectionTitle>Popular Courses</SectionTitle>
    {/* Placeholders for course cards */}
  </SectionContainer>
);

export default PopularCoursesSection;


