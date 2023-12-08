import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';

const HeaderContainer = styled.header`

  background-color: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoAndTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
`;

const Title = styled.h1`
  color: black;
  font-size: 24px;
  margin: 0;
  font-weight: 500;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LoginLink = styled.span`
  color: var(--text-color-interactive-light);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
`;

const JoinButton = styled.button`
  background-color: var(--color-primary);
  color: var(--text-color-primary-dark);
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

const Header = () => (
  <HeaderContainer>
    <LogoAndTitleContainer>
      <Logo>
        <Image src="/images/school.svg" alt="LearnscapeAi Logo" width={50} height={50} />
      </Logo>
      <Title>LearnscapeAi</Title>
    </LogoAndTitleContainer>
    <Nav>
      <Link href="/login" passHref>
        <LoginLink>Log In</LoginLink>
      </Link>
      <JoinButton>Join for Free</JoinButton>
    </Nav>
  </HeaderContainer>
);

export default Header;
