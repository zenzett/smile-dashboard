import windowNavigate from "./windowNavigate";

describe("windowNavigate", () => {
	it("should set the window location.href to the given URL", () => {
		const mockHrefSetter = jest.fn();
		delete (global as any).window.location;
		(global as any).window.location = {href: ""};
		Object.defineProperty((global as any).window.location, "href", {
			set: mockHrefSetter,
		});

		const url = "https://example.com";
		windowNavigate(url);

		expect(mockHrefSetter).toHaveBeenCalledWith(url);
	});
});
