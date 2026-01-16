import { Request, Response } from "express";
import RequestModel from "../models/Request";
import { generateRequestId } from "../utils/generateRequestId";

export const createRequest = async (req: Request, res: Response) => {
  const requestId = generateRequestId();

  const newRequest = await RequestModel.create({
    ...req.body,
    requestId,
  });

  res.status(201).json({ requestId: newRequest.requestId });
};

