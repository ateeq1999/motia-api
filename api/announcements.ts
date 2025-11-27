
import { createAnnouncementStep } from "../steps/announcements/create.step";
import { deleteAnnouncementStep } from "../steps/announcements/delete.step";
import { getAnnouncementStep } from "../steps/announcements/get.step";
import { listAnnouncementsStep } from "../steps/announcements/list.step";
import { updateAnnouncementStep } from "../steps/announcements/update.step";

export const setupAnnouncementHandlers = (app: any) => {
  app.post("/announcements", createAnnouncementStep.handle());
  app.delete("/announcements/:id", deleteAnnouncementStep.handle());
  app.get("/announcements/:id", getAnnouncementStep.handle());
  app.get("/announcements", listAnnouncementsStep.handle());
  app.put("/announcements/:id", updateAnnouncementStep.handle());
};
