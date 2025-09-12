function Circle({ value }) {
    const ratio = Math.round((value / 10) * 100);
    let color = "#ff4b4b";
    if (ratio >= 70) color = "#00ff88";
    else if (ratio >= 40) color = "#ffcc00";

    return (
        <div className="circle"
            style={{ "--percentage": ratio, "--progress-color": color }}>
            <span>{ratio}%</span>
        </div>
    );
}

export default Circle;
