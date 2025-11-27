
import { createAdvertisementStep } from "../steps/advertisements/create.step";
import { deleteAdvertisementStep } from "../steps/advertisements/delete.step";
import { getAdvertisementStep } from "../steps/advertisements/get.step";
import { listAdvertisementsStep } from "../steps/advertisements/list.step";
import { updateAdvertisementStep } from "../steps/advertisements/update.step";

export const setupAdvertisementHandlers = (app: any) => {
  app.post("/advertisements", createAdvertisementStep.handle());
  app.delete("/advertisements/:id", deleteAdvertisementStep.handle());
  app.get("/advertisements/:id", getAdvertisementStep.handle());
  app.get("/advertisements", listAdvertisementsStep.handle());
  app.put("/advertisements/:id", updateAdvertisementStep.handle());
};
