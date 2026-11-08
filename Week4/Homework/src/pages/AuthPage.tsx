import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { ROUTE_PATH } from "../router/path";
import { PART_OPTIONS } from "../constants/part";
import type { Part } from "../types/auth";
import { useIssueCode } from "../hooks/useAuth";

function AuthPage() {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const { mutate: issueCode, isPending } = useIssueCode();

  function handleIssueCode() {
    if (!selectedPart) return;
    
    issueCode(selectedPart, {
      onSuccess: () => navigate(ROUTE_PATH.POST_LIST),
    });
  }

  function handleGoToList() {
    navigate(ROUTE_PATH.POST_LIST);
  }

  return (
    <Container>
      <Card>
        <Title>회원 코드 발급</Title>
        <Description>파트를 선택하고 회원 코드를 발급받으세요.</Description>

        <PartGroup role="group" aria-label="파트 선택">
          {PART_OPTIONS.map((option) => (
            <PartButton
              key={option.value}
              type="button"
              aria-pressed={selectedPart === option.value}
              onClick={() => setSelectedPart(option.value)}
            >
              {option.label}
            </PartButton>
          ))}
        </PartGroup>

        <IssueButton type="button" onClick={handleIssueCode} disabled={isPending}>
          {isPending ? '발급 중...' : '코드 발급'}
        </IssueButton>

        <ListButton type="button" onClick={handleGoToList}>
          게시판 목록 보러가기
        </ListButton>
      </Card>
    </Container>
  );
}

export default AuthPage;

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
`;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  padding: 40px 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.subtext};
  text-align: center;
`;

const PartGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const PartButton = styled.button`
  flex: 1;
  padding: 12px 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  font-size: 0.9rem;
  transition:
    background-color 0.2s,
    color 0.2s;

  &[aria-pressed='true'] {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textOnPrimary};
  }
`;

const IssueButton = styled.button`
  padding: 14px 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

const ListButton = styled.button`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.subtext};
  text-decoration: underline;
`;