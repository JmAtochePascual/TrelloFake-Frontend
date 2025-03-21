import { TProfile } from "@/types/authType";
import { TProject } from "@/types/projectType";

export const isManager = (managerID: TProject["manager"], userID: TProfile["_id"]) => managerID === userID;