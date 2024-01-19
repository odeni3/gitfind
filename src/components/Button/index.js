import "./styles.css"

const Button = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            <h2>Search</h2>
        </button>
    );
}

export { Button };
