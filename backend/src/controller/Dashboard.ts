import { Request, Response } from "express";
import { getDashboardInfos } from "../services/DashboardService";

export async function index(req: Request, res: Response) {
    res.json(await getDashboardInfos());
};
