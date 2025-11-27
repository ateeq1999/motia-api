
import { createGuardStep } from "../steps/guards/create.step";
import { deleteGuardStep } from "../steps/guards/delete.step";
import { getGuardStep } from "../steps/guards/get.step";
import { listGuardsStep } from "../steps/guards/list.step";
import { updateGuardStep } from "../steps/guards/update.step";

export const setupGuardHandlers = (app: any) => {
  app.post("/guards", createGuardStep.handle());
  app.delete("/guards/:id", deleteGuardStep.handle());
  app.get("/guards/:id", getGuardStep.handle());
  app.get("/guards", listGuardsStep.handle());
  app.put("/guards/:id", updateGuardStep.handle());
};
