'use client';
import styled from 'styled-components';
import Button from '@/components/globalComponents/Button';
import text from '@/styles/text';

export default function PageNotFoundModal({ locale }) {
  const message = locale === 'en' 
    ? "Uh oh. This page doesn't exist. Please navigate back to the homepage."
    : "This page hasn't been translated yet and will be available soon.";

  const buttonData = {
    link_text: "Return Home",
    link_url: {
      cached_url: "/"
    },
    theme: "primary",
    link_size: "medium"
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Notice</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button $buttonData={buttonData} />
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
} 

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 50;
  padding-top: 35vh;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 32rem;
  width: 90%;
  text-align: center;
`;

const Title = styled.div`
  ${text.h4};
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const Message = styled.p`
${text.bodyMd};
  color: #4a4a4a;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;