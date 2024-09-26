import {rest} from "msw";

export const createUserSuccess = rest.post("/api/user", (req, res, ctx) => {
	return res(
		ctx.status(201),
		ctx.json({
			responseCode: "0200",
			responseDescription: "SUCCESS",
			data: {
				counter: 0,
				createdAt: "2023-09-29T07:58:14Z",
				deviceId: "QpRmsC8XItOZYqQQH26eD",
				email: "johndoe3@work.bri.co.id",
				id: 25,
				name: "John Doe3",
				phoneNumber: "081234567890",
				updatedAt: "2023-09-29T07:58:14Z",
				userTypeId: "VIEWER",
				username: "90123423",
			},
		}),
	);
});

export const createUserErrorUsernameAlreadyRegistered = rest.post(
	"/api/user",
	(req, res, ctx) => {
		return res(
			ctx.status(400),
			ctx.json({
				responseCode: "0400",
				responseDescription: "USERNAME_ALREADY_REGISTERED",
				data: null,
			}),
		);
	},
);

export const createUserErrorEmailAlreadyRegistered = rest.post(
	"/api/user",
	(req, res, ctx) => {
		return res(
			ctx.status(400),
			ctx.json({
				responseCode: "0400",
				responseDescription: "EMAIL_ALREADY_REGISTERED",
				data: null,
			}),
		);
	},
);

export const createUserGeneralError = rest.post(
	"/api/user",
	(req, res, ctx) => {
		return res(
			ctx.status(500),
			ctx.json({
				responseCode: "0500",
				responseDescription: "INTERNAL_SERVER_ERROR",
				data: null,
			}),
		);
	},
);

export const updateUserSuccess = rest.patch(
	"/api/user/:id",
	(req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				responseCode: "0200",
				responseDescription: "SUCCESS",
				data: {
					id: 44,
					name: "Destalia ",
					email: "destalia@work.bri.co.id",
					phoneNumber: "089618722872",
					username: "90147851",
					userTypeID: "VIEWER",
					counter: 0,
					deviceID: "fv4315Y3_gyeat2hKq7uE",
					createdAt: "2023-10-02T21:18:23Z",
					updatedAt: "2023-10-03T12:42:02Z",
				},
			}),
		);
	},
);

export const deleteUserSuccess = rest.delete(
	"/api/user/:id",
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
