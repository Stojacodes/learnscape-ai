/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';

// Accordion container style
const accordionContainerStyle = css`
  width: 100%; // Adjust the width as necessary
  background: var(--color-background-dark); // Dark mode background
  color: var(--text-color-primary-dark); // Text color for dark mode
  padding-left: 16px; // Align content to the left
`;

// Accordion title style
const accordionTitleStyle = css`
  font-size: 24px; // Title size
  margin: 16px 0; // Spacing above and below the title
  color: var(--text-color-primary-dark); // White text in dark mode
  text-align: left; // Align title to the left
`;

// Horizontal line style
const horizontalLineStyle = css`
  border-bottom: 1px solid #FFFFFF; // Line color
  margin-bottom: 24px; // Space below the line
`;

/// Accordion item styles
const accordionItemStyle = (isActive) => css`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
margin-bottom: 24px;
background: ${isActive ? 'rgba(255, 255, 255, 0.10)' : 'transparent'};
`;

// Accordion button styles
const accordionButtonStyle = css`
  background: transparent;
  border: none;
  text-align: left;
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
  color: var(--text-color-primary-dark);
  width: calc(100% - 40px); // Adjust width to make space for the icon
`;


// Accordion content styles
const accordionContentStyle = (isActive) => css`
  padding: 0 15px 10px;
  line-height: 1.5;
  display: ${isActive ? 'block' : 'none'}; // Default to hide content
  font-size: 14px;
  text-align: left; // Align content to the left
  background: ${isActive ? 'rgba(255, 255, 255, 0.10)' : 'transparent'}; // Background color for active state
`;

// Icon styles
const tickIconStyle = (isClicked) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${isClicked ? '#7DFEB3' : 'grey'}; // The border color changes with the tick
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
  background: var(--color-background-dark); // Match the background color
  margin-right: 16px; // Decrease right margin to move the icon to the left

  // The tick itself
  &::after {
    content: '✓';
    color: ${isClicked ? '#7DFEB3' : 'grey'}; // The tick color changes when clicked
    display: block; // Always show the tick
  }
`;

const Accordion = ({ steps, onStepChange }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordionItem = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
      if (activeIndex !== index) onStepChange(index);
  };

  return (
      <div css={accordionContainerStyle}>
          <div css={accordionTitleStyle}>Course Steps</div>
          <div css={horizontalLineStyle} />
          {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                  <div key={index} css={accordionItemStyle(isActive)}>
                      <button
                          css={accordionButtonStyle}
                          onClick={() => toggleAccordionItem(index)}
                      >
                          {step.title} {/* Assuming step has a title property */}
                      </button>
                  </div>
              );
          })}
      </div>
  );
};

export default Accordion;