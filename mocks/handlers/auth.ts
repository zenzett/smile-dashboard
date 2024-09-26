import {rest} from "msw";

export const loginSuccess = rest.post("/api/login", (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json({
			responseCode: "0200",
			responseDescription: "success",
			data: {
				accessToken:
					"eyJhbGciOiJQQkVTMi1IUzI1NitBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwicDJjIjo0MDk2LCJwMnMiOiJOVGswWkRVeVpqUXRPV1kyTWkwME0yTmtMVGs0TldZdE1tRTNaRGhqT1RobVpXWm0ifQ.brBuCkMwvYdoIbKfTo0bZi9XYEIbfv5AttKKBxW3dt5gjH3Xh5qzkw.wzzlZvJbvYM-sYLo9geV0Q.Wj3O6p-rPSSNMmMrOGN0p6_nccnXczVYfxv7D5AaSY5sSJJ1JKQEKefQPoFAuchx_XPhe8xaPZV8hI_rxox88NE8GYjgZveMbHOYz0beYbW_pxyQLemr69oP3nPxDzWcbjfbTg7y_iuJp4gWp2XRGA4IwkTuGyOebO9J4v-hhogncyHRsyAZALFD_yYgW9Bq8JH1RCly2MfbcWNhLwl0dpIm485EAaZ4tSFufBsXlMDVonCTYxrEMfVzED97z57XyUIS4_A8jBnf-QADzCzl2wy7zRes_qJ7cEASCE_DMNuK6PEMcW7fn9VcYm83xKTByBbIrCM2yekSq8XO4Yx7Su-Ek7rdnFkzArNgJLNoxXmQSoP5eY7OK6DC4Ly1v8YLUNEs6nAHLLBtZY84XwHgYr1qoks4qZswcCVqfgnZ1l0gdz0BSrRyD_WwjlPNwo9LnYy13R3charJPjiU-ZSlMh8ImaGzBJ2a83be6GR54QwsqTbbifvsR3wjjqE_sexTU0Ux8vDcAcPtdfVEoAUzcGdA7e2WzYMRUskc7k-DYgtWYVJO0W3vvbnAKn21nOtPHThTGceVEy_KWSkQiUFSXUgk1O4mUzn8RjFHXwQyz3sESdsdtF5JalE5tmNM5399Gc3eNDfX31isLXoGS824gtwJjBbJk4M_aoVqWTHyX1ors7Cx_9ZnjtA4MNzCE2Slkq1djGo7gRUjb7oTZ_8NpX7jks3c-HNNjM4HIkg4pLy41BU5fd4jkCqQo3ayMyn0__AXtkQGmRungLPCYE917uUxZfZsBWlNCeIspeMmMhERtymj5mFJUvotx9Ef6m-g.3k_Fn7rp-RdvJUcQf0JE6Q",
				refreshToken:
					"FU8jwKTforGtuA6o7A33Avc17e4w0BqzTpY86ilng0xGRFSURy0J3NYIYenT09_g-sEko377X6G3hxvuLiG1Wg8FnKSGXb6KfOuB_hg7XSqZ1MKVfEuAu8AMxHL9USg5",
			},
		}),
	);
});
