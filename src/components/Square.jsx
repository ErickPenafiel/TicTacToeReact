export const Square = ({ children, isSelected, updateBoard, index }) => {
    const classTurn = `square ${isSelected ? "is-selected" : ""} `;

    const handleClick = () => {
        updateBoard(index);
    };
    return (
        <div onClick={handleClick} className={classTurn}>
            {children}
        </div>
    );
};