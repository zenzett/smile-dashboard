import type {Config} from "jest";
import {defaults} from "jest-config";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

const config: Config = {
	moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
		"^@/components/(.*)$": "<rootDir>/components/$1",
		"^@/hooks/(.*)$": "<rootDir>/hooks/$1",
		"^@/types/(.*)$": "<rootDir>/types/$1",
		"^@/config/(.*)$": "<rootDir>/config/$1",
		"^@/app/(.*)$": "<rootDir>/app/$1",
		"^@/mocks/(.*)$": "<rootDir>/mocks/$1",
		"^@/utils/(.*)$": "<rootDir>/utils/$1",
	},
	collectCoverage: true,
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
	transformIgnorePatterns: [
		"/node_modules/",
		"^.+\\.module\\.(css|sass|scss)$",
	],
};

export default createJestConfig(config);
