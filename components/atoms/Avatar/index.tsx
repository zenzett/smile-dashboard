import {FunctionComponent, HTMLAttributes, useMemo} from "react";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
	name: string;
};

const Avatar: FunctionComponent<AvatarProps> = ({
	name,
	className,
	...attrs
}) => {
	const initial = useMemo(() => {
		return name
			.split(" ")
			.slice(0, 2)
			.map((item) => item.substring(0, 1));
	}, [name]);

	return (
		<div
			className={"avatar".concat(className ? ` ${className}` : "")}
			{...attrs}
		>
			{initial}
		</div>
	);
};

export default Avatar;
