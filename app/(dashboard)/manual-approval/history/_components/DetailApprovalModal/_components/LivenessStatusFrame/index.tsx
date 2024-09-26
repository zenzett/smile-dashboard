import React, {FunctionComponent, useMemo} from "react";

import Badge from "@/components/atoms/Badge";

interface LivenessStatusFrameProps {
	livenessScore?: string;
	frStatus?: string;
}

const LivenessStatusFrame: FunctionComponent<LivenessStatusFrameProps> = ({
	livenessScore,
	frStatus,
}) => {
	const getLivenessBadge = useMemo(() => {
		if (livenessScore && parseInt(livenessScore) > 79) {
			return "success";
		} else {
			return "pending";
		}
	}, [livenessScore]);

	const getLivenessText = useMemo(() => {
		if (livenessScore !== "-") {
			return livenessScore?.toString() + "%";
		} else {
			return livenessScore;
		}
	}, [livenessScore]);

	const getStatusBadge = useMemo(() => {
		switch (frStatus) {
			case "true":
				return "success";
			case "false":
				return "error";
		}
	}, [frStatus]);

	return (
		<div className="flex items-center h-[50px] rounded p-3 border border-[#EAEBEB] text-base font-bold text-[#666666] gap-2">
			<div className="w-1/2 flex items-center gap-2">
				<span className="w-[121px]">Liveness Score</span>:
				{livenessScore ? (
					<Badge
						size="xxs"
						className="truncate"
						status={getLivenessBadge}
						text={getLivenessText}
					/>
				) : (
					<span className="text-center">-</span>
				)}
			</div>
			<div className="w-1/2 flex items-center gap-2">
				<span className="w-[121px]">FR Status</span>:
				{frStatus ? (
					<Badge
						size="xs"
						status={getStatusBadge}
						text={frStatus.toString().toUpperCase()}
					/>
				) : (
					<span className="text-center">-</span>
				)}
			</div>
		</div>
	);
};

export default LivenessStatusFrame;
