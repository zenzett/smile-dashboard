import {rest} from "msw";

export const downloadTableSuccess = rest.get(
	"/api/download",
	(req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				responseCode: "0200",
				responseDescription: "SUCCESS",
				data: {
					link: ["mock-link-01", "mock-link-02", "mock-link-03"],
				},
			}),
		);
	},
);

export const downloadTableNullData = rest.get(
	"/api/download",
	(req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				responseCode: "0200",
				responseDescription: "SUCCESS",
				data: null,
			}),
		);
	},
);
