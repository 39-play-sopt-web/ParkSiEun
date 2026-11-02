import styled from '@emotion/styled';

export interface RatingOption {
  label: string;
  min?: number;
  max?: number;
}

export const RATING_OPTIONS: RatingOption[] = [
  { label: '전체' },
  { label: '9점 이상', min: 9 },
  { label: '8 ~ 9점', min: 8, max: 9 },
  { label: '7 ~ 8점', min: 7, max: 8 },
  { label: '6 ~ 7점', min: 6, max: 7 },
  { label: '6점 미만', max: 6 },
];

interface RatingFilterProps {
  selected: RatingOption;
  onSelect: (option: RatingOption) => void;
}

const RatingFilter = ({ selected, onSelect }: RatingFilterProps) => {
  return (
    <ChipList>
      {RATING_OPTIONS.map((option) => (
        <Chip
          key={option.label}
          isActive={selected.label === option.label}
          onClick={() => onSelect(option)}
        >
          {option.label}
        </Chip>
      ))}
    </ChipList>
  );
};

export default RatingFilter;

const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Chip = styled.button<{ isActive: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.background : theme.colors.subtext};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.surface};
  transition: background-color 0.2s;
`;
