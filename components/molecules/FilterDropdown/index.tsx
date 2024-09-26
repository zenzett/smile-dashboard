import {HTMLAttributes, useState} from "react";

import Checkbox from "@/components/atoms/Checkbox";
import Dropdown from "@/components/atoms/Dropdown";
import ButtonFilter from "@/components/atoms/Filter";
import Input from "@/components/atoms/Input";

type Props = HTMLAttributes<HTMLDivElement> & {
	onClickDropdown: () => void;
	isShowDropdown: boolean;
};

const DropdownFilter = (props: Props) => {
	const {onClickDropdown, isShowDropdown} = props;

	const [partner, setPartner] = useState<Record<string, string>>({});

	return (
		<div className="relative inline-block text-left">
			<ButtonFilter
				onClick={onClickDropdown}
				data-testid="dropdown-filter-btn-trigger"
			/>
			<Dropdown isOpen={isShowDropdown}>
				<div className="flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<span
							className="font-bold text-xl text-dark-40"
							data-testid="filter-title"
						>
							Filter
						</span>
						<span className="font-semibold text-base text-primary-80 cursor-pointer">
							Terapkan
						</span>
					</div>
					<hr className="w-full border border-[#EAEBEB]" />
					<div className="flex flex-col gap-2.5">
						<span className="font-semibold text-base text-dark-40">
							Tanggal
						</span>
						<div className="flex justify-between">
							<div className="w-[9.75rem] flex flex-col gap-2">
								<span className="font-medium text-xs text-dark-40">Dari</span>
								<Input placeholder="Pilih" />
							</div>
							<div className="w-[9.75rem] flex flex-col gap-2">
								<span className="font-medium text-xs text-dark-40">Hingga</span>
								<Input placeholder="Pilih" />
							</div>
						</div>
					</div>
					<div className="flex flex-col py-2 gap-2">
						<span className="font-semibold text-base text-dark-40">
							Partner
						</span>
						<div className="flex flex-col gap-2">
							<div className="flex flex-row">
								<div className="flex flex-row w-[10.25rem] gap-2 items-center">
									<Checkbox
										label="End User"
										value="end-user"
										onClick={() => {
											if (Object.keys(partner).includes("end-user")) {
												setPartner((state) => {
													const newState = state;
													delete newState["end-user"];
													return newState;
												});
											}
										}}
										data-testid="end-user-checkbox"
									/>
								</div>
								<div className="flex flex-row w-[10.25rem] gap-2 items-center">
									<span>Checkbox</span>
									<span className="text-sm font-semibold text-dark-40">
										Seller PGD
									</span>
								</div>
							</div>
							<div className="flex flex-row">
								<div className="flex flex-row w-[10.25rem] gap-2 items-center">
									<span>Checkbox</span>
									<span className="text-sm font-semibold text-dark-40">
										Seller BRI
									</span>
								</div>
								<div className="flex flex-row w-[10.25rem] gap-2 items-center">
									<span>Checkbox</span>
									<span className="text-sm font-semibold text-dark-40">
										Seller PNM
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Dropdown>
		</div>
	);
};

DropdownFilter.displayName = "DropdownFilter";

export default DropdownFilter;
