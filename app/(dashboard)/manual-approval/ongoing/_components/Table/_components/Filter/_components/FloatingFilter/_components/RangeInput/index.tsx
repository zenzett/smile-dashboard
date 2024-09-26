import "./style.css";

import React from "react";

const RangeInput: React.FC<{
	min?: number;
	max?: number;
	step?: number;
	value: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({min = 0, max = 100, step = 1, value, onChange}) => {
	const thumbStyle: React.CSSProperties = {
		left: `calc(${((value - min) * 94) / (max - min)}% + (16px - ${
			((value - min) * 94) / (max - min)
		} * 0.15px))`,
	};

	const trackStyle: React.CSSProperties = {
		background: `linear-gradient(to right, #A6D6FF ${
			((value - min) * 94) / (max - min)
		}%, #EAEBEB ${((value - min) * 94) / (max - min)}%)`,
	};

	return (
		<div className="container">
			<div className="custom-range-container">
				<input
					type="range"
					className="range-input"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={onChange}
					style={trackStyle}
				/>
				<div className="custom-thumb" style={thumbStyle}>
					{value}%
				</div>
				<div className="custom-track" style={trackStyle}></div>
			</div>
			<div className="custom-label-container">
				<span className="custom-label">{min}%</span>
				<span className="custom-label">{max}%</span>
			</div>
		</div>
	);
};

export default RangeInput;
