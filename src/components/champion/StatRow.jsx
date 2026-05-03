export const StatRow = ({ label, value }) => {
    const segments = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="mb-3 w-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-secondary small fw-bold" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                    {label.toUpperCase()}
                </span>
            </div>
            <div className="d-flex gap-1">
                {segments.map((seg) => (
                    <div
                        key={seg}
                        style={{
                            height: '8px',
                            flex: 1,
                            backgroundColor: seg <= value ? '#c4b000' : 'rgba(255,255,255,0.1)',
                            transform: 'skewX(-20deg)',
                            transition: 'background-color 0.5s ease',
                            border: '1px solid rgba(196, 176, 0, 0.05)'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};