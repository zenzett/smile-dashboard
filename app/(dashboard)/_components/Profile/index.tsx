"use client";

import {FunctionComponent, useEffect} from "react";

import axiosInstance from "@/config/client/axios";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	useEffect(() => {
		axiosInstance.get("/api/profile");
	}, []);

	return null;
};

export default Profile;
