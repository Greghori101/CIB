import "./style.css"
export default function Loading({ width, height, color,weight }) {
    return (
        <>
            <span
                style={{
                    width: width,
                    height: height,
                    border: weight +" solid " + color,
                    borderBottomColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    boxSizing: "border-box",
                    animation: " rotation 1s linear infinite",
                    marginRight:"5px",
                }}
            ></span>
        </>
    );
}
Loading.defaultProps = {
    weight: "5px",
};

