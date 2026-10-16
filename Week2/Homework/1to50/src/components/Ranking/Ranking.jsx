import { useState } from "react";
import { clearRecords, getRecords } from "../../utils/storage";
import { Wrapper, TitleRow, ClearButton, EmptyText, Table } from './Ranking.styles';

const Ranking = () => {
    const [records, setRecords] = useState(getRecords);
    const sortedRecords = [...records].sort((a, b) => b.level - a.level || a.time - b.time);

    const handleClear = () => {
        clearRecords();
        setRecords([]);
    }

    let view;
    if (sortedRecords.length === 0) {
        view = <EmptyText>아직 기록이 없어요. 게임을 플레이해보세요!🏃‍➡️</EmptyText>
    }
    else {
        view = (
            <Table>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>레벨</th>
                        <th>플레이 시간</th>
                        <th>기록 시각</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRecords.map(({level, time, playedAt}, index) => (
                        <tr key={playedAt}>
                            <td>{index+1}</td>
                            <td>Level {level}</td>
                            <td>{time.toFixed(2)}초</td>
                            <td>{new Date(playedAt).toLocaleString('ko-KR')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    return (
        <Wrapper>
            <TitleRow>
                <h2>🏆 랭킹</h2>
                <ClearButton onClick={handleClear}>초기화</ClearButton>
            </TitleRow>
            {view}
        </Wrapper>
    );
}

export default Ranking;