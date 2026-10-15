import { Wrapper, TabButton, Right, Timer } from './Header.styles';

const Header = ({ tab, onTabChange, time }) => {
    return (
        <Wrapper>
            <h1>🔢 숫자 클릭 게임 👆</h1>

            <div>
                <TabButton $active={tab === 'game'} onClick={() => onTabChange('game')}>
                    게임
                </TabButton>
                <TabButton $active={tab === 'ranking'} onClick={() => onTabChange('ranking')}>
                    랭킹
                </TabButton>
            </div>

            <Right>
                {tab === 'game' && (
                    <>
                        <select>
                            <option>Level 1 (3x3)</option>
                            <option>Level 2 (4x4)</option>
                            <option>Level 3 (5x5)</option>
                        </select>
                        <Timer>{time.toFixed(2)}초</Timer>
                    </>
                )}
            </Right>
        </Wrapper>
    );
};

export default Header;