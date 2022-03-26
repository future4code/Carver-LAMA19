import express, { application } from "express";
import BandController from "../controller/BandController";

export const bandRouter = express.Router()

const bandController = new BandController()

bandRouter.post("/create", bandController.insertBand);
bandRouter.get("/find", bandController.getBand);

