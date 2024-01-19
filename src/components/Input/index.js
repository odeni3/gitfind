import "./styles.css"

const Input = ({ value, onChange }) => {
    return (
        <input
            placeholder="github user"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    );
};

export { Input };
