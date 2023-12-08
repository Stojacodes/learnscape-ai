import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import SearchBar from '../common/SearchBar'; // Adjust the import path as needed

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px; // Reduced the spacing between elements
  background-color: var(--color-background);
  padding: 40px 40px; // Adjust padding to control spacing from the top
  text-align: center;
  width: 100%;
  margin-bottom: 80px; // Increase the bottom margin to create more space
`;


const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; // Adjust this value based on your Figma design
`;

const Logo = styled.div`
  width: 80px;
  height: 100px;
`;

const Title = styled.h1`
  color: var(--text-color-primary-light);
  font-size: 48px;
  margin: 0;
  font-weight: 500;
`;

const Subtitle = styled.p`
  color: var(--text-color-primary-light);
  font-size: 24px;
  margin-bottom: 40px; // Add space below the subtitle to push down the search bar
`;

const HeroSection = () => (
  <HeroContainer>
    <TitleContainer>
      <Logo>
        <Image src="/images/school.svg" alt="LearnscapeAi Logo" width={80} height={100} />
      </Logo>
      <Title>LearnscapeAi</Title>
    </TitleContainer>
    <Subtitle>Generate a free course on anything in just one click...</Subtitle>
    <SearchBar />
  </HeroContainer>
);

export default HeroSection;


