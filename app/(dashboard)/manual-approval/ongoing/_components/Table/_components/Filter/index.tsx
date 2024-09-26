import {FunctionComponent, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";

import FormIcon from "@/components/atoms/FormIcon";
import Input from "@/components/atoms/Input";
import Dropdown from "@/components/molecules/Dropdown";
import {FilterAction} from "@/types/FilterAction";
import {ManualOngoingApprovalCollectionParams} from "@/types/ManualOngoingApprovalCollectionParams";

import FloatingFilter from "./_components/FloatingFilter";

interface FilterProps {
	params: ManualOngoingApprovalCollectionParams;
	onSubmit: (
		newParams: ManualOngoingApprovalCollectionParams,
		action: FilterAction,
	) => void;
}

type InputSearch = {
	searchBy: string;
	search: string;
};

const Filter: FunctionComponent<FilterProps> = ({params, onSubmit}) => {
	const [isShowFloatingFilter, setIsShowFloatingFilter] =
		useState<boolean>(false);

	const searchByValue = useMemo(() => {
		if (Object.keys(params).includes("nama")) {
			return "nama";
		}
		if (Object.keys(params).includes("nik")) {
			return "nik";
		}
		return "";
	}, [params]);

	const searchValue = useMemo(() => {
		if (params?.nama) {
			return params.nama;
		}
		if (params?.nik) {
			return params.nik;
		}
		return "";
	}, [params?.nama, params?.nik]);

	const {control, handleSubmit, setValue, watch} = useForm<InputSearch>({
		defaultValues: {searchBy: searchByValue, search: searchValue},
	});

	const watchFields = watch();

	const onSubmitSearch = (formData: InputSearch, action: FilterAction) => {
		let newParams: ManualOngoingApprovalCollectionParams = {
			...params,
		};

		delete newParams?.nama;
		delete newParams?.nik;

		switch (formData.searchBy) {
			case "nama":
				newParams = {
					...newParams,
					nama: formData.search,
				};
				break;
			case "nik":
				newParams = {
					...newParams,
					nik: formData.search,
				};
				break;
			default:
				break;
		}

		onSubmit(newParams, action);
	};

	const onResetSearch = () => {
		const updatedParamsWithoutSearch: ManualOngoingApprovalCollectionParams = {
			...params,
		};

		if (watchFields.searchBy === "nama") {
			updatedParamsWithoutSearch["nama"] = "";
		}
		if (watchFields.searchBy === "nik") {
			updatedParamsWithoutSearch["nik"] = "";
		}

		setValue("search", "", {shouldDirty: false, shouldValidate: false});

		onSubmit(updatedParamsWithoutSearch, "Search");
	};

	const dropdownLabel = useMemo(() => {
		switch (watchFields.searchBy) {
			case "nama":
				return "Nama";
			case "nik":
				return "NIK";
			default:
				return "";
		}
	}, [watchFields.searchBy]);

	const dropdownMenuList = [
		{
			label: "Nama",
			onClick: () => {
				setValue("searchBy", "nama", {shouldValidate: true});
			},
		},
		{
			label: "NIK",
			onClick: () => {
				setValue("searchBy", "nik", {shouldValidate: true});
			},
		},
	];

	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-2">
				<Dropdown
					id="dropdown-search"
					data-testid="dropdown-search"
					placeholder="Nama/NIK"
					label={dropdownLabel}
					menus={dropdownMenuList}
					className="w-[11.25rem]"
				/>
				<form
					onSubmit={handleSubmit((formData) =>
						onSubmitSearch(formData, "Search"),
					)}
				>
					<Controller
						control={control}
						name="search"
						render={({field}) => (
							<FormIcon iconPosition="right">
								<Input
									className="w-[25.875rem] pl-10"
									placeholder="Cari Data"
									{...field}
									disabled={!watchFields.searchBy}
								/>
								<i className="fa-solid fa-search icon pointer-events-none left-3"></i>
								{watchFields.search ? (
									<button
										className="icon"
										id="btn-clear-search"
										data-testid="btn-clear-search"
										type="button"
										onClick={onResetSearch}
									>
										<i className="fa-solid fa-circle-xmark text-light-40"></i>
									</button>
								) : (
									false
								)}
							</FormIcon>
						)}
					/>
				</form>
			</div>

			<FloatingFilter
				params={params}
				onParamsChange={onSubmit}
				isShow={isShowFloatingFilter}
				handleOpen={() => setIsShowFloatingFilter(true)}
				handleClose={() => setIsShowFloatingFilter(false)}
			/>
		</div>
	);
};

export default Filter;
