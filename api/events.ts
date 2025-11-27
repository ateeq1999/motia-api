
import { createEventStep } from "../steps/events/create.step";
import { deleteEventStep } from "../steps/events/delete.step";
import { getEventStep } from "../steps/events/get.step";
import { listEventsStep } from "../steps/events/list.step";
import { updateEventStep } from "../steps/events/update.step";

export const setupEventHandlers = (app: any) => {
  app.post("/events", createEventStep.handle());
  app.delete("/events/:id", deleteEventStep.handle());
  app.get("/events/:id", getEventStep.handle());
  app.get("/events", listEventsStep.handle());
  app.put("/events/:id", updateEventStep.handle());
};
