import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export default function Navbar() {
  const location = useLocation();
  const history = useHistory();

  const goToPage = (page = '') => {
    history.push(`/${page}`);
  };

  const handleLogout = () => {
    if (localStorage.getItem('토큰 이름')) {
      localStorage.clear();
      alert('로그아웃이 되었습니다.');
      goToPage();
    }
  };

  return (
    <>
      {location.pathname !== '/' && (
        <Container>
          <Logo onClick={() => goToPage('main')}>&gt; we-record</Logo>
          <div>
            <GoToMyPageBtn
              onClick={() => {
                goToPage('mypage');
              }}
            >
              마이 페이지
            </GoToMyPageBtn>
            <GoToBatchBtn
              onClick={() => {
                goToPage('batch');
              }}
            >
              기수 페이지
            </GoToBatchBtn>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </div>
        </Container>
      )}
    </>
  );
}

const logoAnimation = keyframes`
  from {
    width: 0px;    
  }
  to{
    width: 68px;
    background-color: ${({ theme }) => theme.colors.fontColor}
  }
`;

const Container = styled.nav`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  position: fixed;
  padding: 12px 24px;
  width: 100%;
  top: 0;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  z-index: 100;
`;

const Logo = styled.div`
  position: relative;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }

  &:before {
    display: block;
    position: absolute;
    width: 68px;
    height: 30px;
    top: 3px;
    content: '';
    opacity: 0.5;
    background-color: #dedede;
    animation-name: ${logoAnimation};
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.14, 1.04, 1, 0.98);
  }
`;

const GoToMyPageBtn = styled.button`
  margin-right: 24px;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(14)};
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #373737;
  }

  &:active {
    opacity: 0.5;
  }

  transition: background-color 0.3s, opacity 0.1s;
`;

const GoToBatchBtn = GoToMyPageBtn.withComponent('button');

const LogoutBtn = styled(GoToMyPageBtn.withComponent('button'))`
  margin-right: 0;
`;
