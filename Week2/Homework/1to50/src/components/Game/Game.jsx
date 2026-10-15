import { useState } from "react";
import { range, shuffle } from "../../utils/mixNumbers";
import { Wrapper, NextNumberText, Grid, NumberButton } from "./Game.styles";

const SIZE = 3;
const half = SIZE * SIZE;
const total = SIZE * SIZE * 2;

const Game = ({ onStart, onFinish }) => {
    const [boardNumbers, setBoardNumbers] = useState(() => shuffle(range(1, half))); //판에 보이는 숫자들
    const [waitingNumbers, setWaitingNumbers] = useState(() => shuffle(range(half+1, total))); //대기 중인 숫자들
    const [nextNumber, setNextNumber] = useState(1); //다음에 눌러야 할 숫자

    const handleClick = (index) => {
        const num = boardNumbers[index];
        if (num !== nextNumber) return; // 순서가 아닌 숫자는 무시

        const [newNumber, ...restNumbers] = waitingNumbers;

        const newBoard = [...boardNumbers];
        newBoard[index] = newNumber ?? null;

        // 상태 업데이트
        setBoardNumbers(newBoard);
        setWaitingNumbers(restNumbers);
        setNextNumber(nextNumber + 1);

        if (num === 1) onStart();
        if (num === total) onFinish();
    }

    const isDone = nextNumber > total;

    return (
        <Wrapper>
            <NextNumberText>
                다음 숫자 <strong>{isDone ? '완료!' : nextNumber}</strong> ({isDone ? total : nextNumber} / {total})
            </NextNumberText>
            
            <Grid>
                {boardNumbers.map((num, index) => (
                    <NumberButton
                    key={index}
                    onClick={() => handleClick(index)}
                    disabled={num === null}
                >
                    {num}
                </NumberButton>
            ))}
            </Grid>
        </Wrapper>
    );
}

export default Game;