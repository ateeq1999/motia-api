
import { createFacilityStep } from "../steps/facilities/create.step";
import { deleteFacilityStep } from "../steps/facilities/delete.step";
import { getFacilityStep } from "../steps/facilities/get.step";
import { listFacilitiesStep } from "../steps/facilities/list.step";
import { updateFacilityStep } from "../steps/facilities/update.step";

export const setupFacilityHandlers = (app: any) => {
  app.post("/facilities", createFacilityStep.handle());
  app.delete("/facilities/:id", deleteFacilityStep.handle());
  app.get("/facilities/:id", getFacilityStep.handle());
  app.get("/facilities", listFacilitiesStep.handle());
  app.put("/facilities/:id", updateFacilityStep.handle());
};
