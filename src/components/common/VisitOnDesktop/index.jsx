import styled from "styled-components";

const VisitOnDesktop = () => (
  <VisitDesktopWrapper>
    Use this app on a dekstop device or a larger window.
  </VisitDesktopWrapper>
);

export default VisitOnDesktop;

const VisitDesktopWrapper = styled.div`
  align-items: center;
  display: flex;
  font-weight: bold;
  height: 100vh;
  justify-content: center;
  margin: 0 15vw;
  text-align: center;
  width: 70vw;
`;
