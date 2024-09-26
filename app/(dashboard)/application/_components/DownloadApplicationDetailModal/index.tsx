"use client";

import React, {FunctionComponent, useCallback, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import Label from "@/components/atoms/Label";
import Radio from "@/components/atoms/Radio";
import Modal from "@/components/molecules/Modal";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
	format: yup
		.mixed()
		.oneOf(["pdf", "xls"], "Format file tidak valid.")
		.required("Format file harus diisi."),
});

type DownloadApplicationDetailProps = {
	onError: (error: unknown) => void;
	handleClose: () => void;
	onSuccess?: () => void;
	selectedApplication?: string;
	selectedName?: string;
	isShow: boolean;
};

const DownloadApplicationDetail: FunctionComponent<
	DownloadApplicationDetailProps
> = ({
	selectedApplication,
	selectedName,
	handleClose,
	onSuccess,
	onError,
	isShow,
}) => {
	const {
		formState: {isValid},
		handleSubmit,
		resetField,
		setValue,
		control,
	} = useForm({
		defaultValues: {
			format: "",
		},
		resolver: yupResolver(schema),
		mode: "all",
		shouldUnregister: true,
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const downloadDetail = useCallback(
		async (data: yup.InferType<typeof schema>) => {
			try {
				setIsLoading(true);

				const url = `${process.env.NEXT_PUBLIC_API_BFF_URL}/api/v1/simpedes-umi/detail/${data.format}/${selectedApplication}`;

				window.open(url);

				// const fileExtension = data.format === "xls" ? "xlsx" : data.format;

				// const fileName = selectedName
				// 	? `${selectedName}.${fileExtension}`
				// 	: `application detail.${fileExtension}`;

				// const url = `${process.env.NEXT_PUBLIC_API_BFF_URL}/api/v1/simpedes-umi/detail/${data.format}/${selectedApplication}`;

				// const fileResponse = await axios.get(url, {responseType: "blob"});

				// const blob = new Blob([fileResponse.data], {
				// 	type: "application/octet-stream",
				// });

				// const link = document.createElement("a");
				// link.href = window.URL.createObjectURL(blob);
				// link.download = fileName;
				// link.style.display = "none";
				// document.body.appendChild(link);
				// link.click();
				// document.body.removeChild(link);
				// window.URL.revokeObjectURL(link.href);

				handleClose();
				setIsLoading(false);
				if (onSuccess) {
					onSuccess();
				}
			} catch (error) {
				setIsLoading(false);
				onError("Maaf, terjadi error ketika download file.");
			}
		},
		[handleClose, onError, onSuccess, selectedApplication, selectedName],
	);

	const submitForm = async (data: yup.InferType<typeof schema>) => {
		await downloadDetail(data);
		resetField("format");
	};

	const closeHandler = useCallback(() => {
		resetField("format");
		handleClose();
	}, [handleClose, resetField]);

	return (
		<Modal
			id="modal-download-form"
			data-testid="modal-download-form"
			isShow={isShow}
			className="w-[482px]"
			containerClassName="z-20"
			onClickBackground={closeHandler}
		>
			<form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
				<Modal.Header
					id="modal-download-header"
					data-testid="modal-download-header"
					dismissable
					handleClose={closeHandler}
				>
					Download Data Pengajuan
				</Modal.Header>
				<Modal.Body id="modal-download-body" data-testid="modal-download-body">
					<Controller
						control={control}
						name="format"
						render={({field: {value, name, ...attrs}}) => (
							<FormGroup>
								<Label
									htmlFor="format-file"
									aria-label="Format File Label"
									data-testid="label-formatfile"
								>
									Format File
								</Label>
								<div id="format-file" className="flex mt-2">
									<Radio
										id="radio-pdf"
										data-testid="radio-pdf"
										label=".pdf"
										name="format-option"
										className="w-full"
										value="pdf"
										checked={value === "pdf"}
										onClick={(e) => {
											setValue("format", e.currentTarget.value, {
												shouldValidate: true,
											});
										}}
										disabled={isLoading}
										{...attrs}
									/>
									<Radio
										id="radio-xls"
										data-testid="radio-xls"
										label=".xls"
										name="format-option"
										className="w-full"
										value="xls"
										checked={value === "xls"}
										onClick={(e) => {
											setValue("format", e.currentTarget.value, {
												shouldValidate: true,
											});
										}}
										disabled={isLoading}
										{...attrs}
									/>
								</div>
							</FormGroup>
						)}
					/>
				</Modal.Body>
				<Modal.Footer
					id="modal-download-footer"
					data-testid="modal-download-footer"
				>
					<Button
						id="submit-modal-download-btn"
						data-testid="submit-modal-download-btn"
						className="w-full"
						isLoading={isLoading}
						disabled={!isValid || isLoading}
					>
						Download
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default DownloadApplicationDetail;
