import { z } from 'zod';

// --- Advertisement ---
export const AdvertisementSchema = z.object({
  id: z.string(),
  partner_id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  contact: z.string().optional(),
  valid_until: z.string().datetime({ offset: true }).optional(), // timestamp with time zone
  is_active: z.boolean().optional().default(true),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateAdvertisementSchema = AdvertisementSchema.omit({ id: true, created_at: true });
export const UpdateAdvertisementSchema = AdvertisementSchema.partial();

export type Advertisement = z.infer<typeof AdvertisementSchema>;
export type CreateAdvertisement = z.infer<typeof CreateAdvertisementSchema>;
export type UpdateAdvertisement = z.infer<typeof UpdateAdvertisementSchema>;

// --- Announcement ---
export const AnnouncementSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  is_urgent: z.boolean().optional().default(false),
  valid_from: z.string().datetime({ offset: true }).optional(),
  valid_until: z.string().datetime({ offset: true }).optional(),
  created_by: z.string().optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateAnnouncementSchema = AnnouncementSchema.omit({ id: true, created_at: true });
export const UpdateAnnouncementSchema = AnnouncementSchema.partial();

export type Announcement = z.infer<typeof AnnouncementSchema>;
export type CreateAnnouncement = z.infer<typeof CreateAnnouncementSchema>;
export type UpdateAnnouncement = z.infer<typeof UpdateAnnouncementSchema>;

// --- Event ---
export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  image_url: z.string().optional(),
  description: z.string().optional(),
  location: z.string(),
  event_date: z.string().datetime({ offset: true }),
  tags: z.array(z.string()).optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
  created_by: z.string().optional(),
});

export const CreateEventSchema = EventSchema.omit({ id: true, created_at: true });
export const UpdateEventSchema = EventSchema.partial();

export type Event = z.infer<typeof EventSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>;
export type UpdateEvent = z.infer<typeof UpdateEventSchema>;

// --- Facility ---
export const FacilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string().optional(),
  manager_id: z.string().optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateFacilitySchema = FacilitySchema.omit({ id: true, created_at: true });
export const UpdateFacilitySchema = FacilitySchema.partial();

export type Facility = z.infer<typeof FacilitySchema>;
export type CreateFacility = z.infer<typeof CreateFacilitySchema>;
export type UpdateFacility = z.infer<typeof UpdateFacilitySchema>;

// --- Guard ---
export const GuardSchema = z.object({
  id: z.string(),
  user_id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  shift_info: z.string().optional(),
  location_assigned: z.string().optional(),
  is_active: z.boolean().optional().default(true),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateGuardSchema = GuardSchema.omit({ id: true, created_at: true });
export const UpdateGuardSchema = GuardSchema.partial();

export type Guard = z.infer<typeof GuardSchema>;
export type CreateGuard = z.infer<typeof CreateGuardSchema>;
export type UpdateGuard = z.infer<typeof UpdateGuardSchema>;

// --- Offer ---
export const OfferSchema = z.object({
  id: z.string(),
  title: z.string(),
  image_url: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  contact: z.string().optional(),
  valid_until: z.string().datetime({ offset: true }),
  tags: z.array(z.string()).optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateOfferSchema = OfferSchema.omit({ id: true, created_at: true });
export const UpdateOfferSchema = OfferSchema.partial();

export type Offer = z.infer<typeof OfferSchema>;
export type CreateOffer = z.infer<typeof CreateOfferSchema>;
export type UpdateOffer = z.infer<typeof UpdateOfferSchema>;

// --- Profile ---
export const ProfileSchema = z.object({
  id: z.string(),
  user_id: z.string().optional(),
  full_name: z.string().optional(),
  avatar_url: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(['super_admin', 'facility_manager', 'event_organizer', 'partner', 'user']).optional().default('user'),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateProfileSchema = ProfileSchema.omit({ id: true, created_at: true });
export const UpdateProfileSchema = ProfileSchema.partial();

export type Profile = z.infer<typeof ProfileSchema>;
export type CreateProfile = z.infer<typeof CreateProfileSchema>;
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;

// --- Property Category ---
export const PropertyCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const CreatePropertyCategorySchema = PropertyCategorySchema.omit({ id: true });
export const UpdatePropertyCategorySchema = PropertyCategorySchema.partial();

export type PropertyCategory = z.infer<typeof PropertyCategorySchema>;
export type CreatePropertyCategory = z.infer<typeof CreatePropertyCategorySchema>;
export type UpdatePropertyCategory = z.infer<typeof UpdatePropertyCategorySchema>;

// --- Property ---
export const PropertySchema = z.object({
  id: z.string(),
  name: z.string(),
  category_id: z.string().optional(),
  phone: z.string().optional(),
  location: z.string(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  tags: z.array(z.string()).optional(),
  delivery_available: z.boolean().optional().default(false),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreatePropertySchema = PropertySchema.omit({ id: true, created_at: true });
export const UpdatePropertySchema = PropertySchema.partial();

export type Property = z.infer<typeof PropertySchema>;
export type CreateProperty = z.infer<typeof CreatePropertySchema>;
export type UpdateProperty = z.infer<typeof UpdatePropertySchema>;

// --- Resident ---
export const ResidentSchema = z.object({
  id: z.string(),
  user_id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  unit: z.string().optional(),
  profile_image_url: z.string().optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
  property_id: z.string().optional(),
});

export const CreateResidentSchema = ResidentSchema.omit({ id: true, created_at: true });
export const UpdateResidentSchema = ResidentSchema.partial();

export type Resident = z.infer<typeof ResidentSchema>;
export type CreateResident = z.infer<typeof CreateResidentSchema>;
export type UpdateResident = z.infer<typeof UpdateResidentSchema>;

// --- Security Check Log ---
export const SecurityCheckLogSchema = z.object({
  id: z.string(),
  visitor_id: z.string().optional(),
  guard_id: z.string().optional(),
  check_time: z.string().datetime({ offset: true }).optional(),
  action: z.string().optional(),
  details: z.string().optional(),
});

export const CreateSecurityCheckLogSchema = SecurityCheckLogSchema.omit({ id: true });
export const UpdateSecurityCheckLogSchema = SecurityCheckLogSchema.partial();

export type SecurityCheckLog = z.infer<typeof SecurityCheckLogSchema>;
export type CreateSecurityCheckLog = z.infer<typeof CreateSecurityCheckLogSchema>;
export type UpdateSecurityCheckLog = z.infer<typeof UpdateSecurityCheckLogSchema>;

// --- Visit Log ---
export const VisitLogSchema = z.object({
  id: z.string(),
  visitor_id: z.string().optional(),
  resident_id: z.string().optional(),
  property_id: z.string().optional(),
  action: z.string(),
  details: z.string().optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateVisitLogSchema = VisitLogSchema.omit({ id: true, created_at: true });
export const UpdateVisitLogSchema = VisitLogSchema.partial();

export type VisitLog = z.infer<typeof VisitLogSchema>;
export type CreateVisitLog = z.infer<typeof CreateVisitLogSchema>;
export type UpdateVisitLog = z.infer<typeof UpdateVisitLogSchema>;

// --- Visitor ---
export const VisitorSchema = z.object({
  id: z.string(),
  resident_id: z.string().optional(),
  name: z.string(),
  phone: z.string().optional(),
  purpose: z.string().optional(),
  area: z.string().optional(),
  expected_arrival: z.string().datetime({ offset: true }).optional(),
  qr_data: z.string().optional(),
  issued_at: z.string().datetime({ offset: true }).optional(),
  is_checked_in: z.boolean().optional().default(false),
  check_in_time: z.string().datetime({ offset: true }).optional(),
  check_out_time: z.string().datetime({ offset: true }).optional(),
  status: z.string().optional().default('issued'),
  notes: z.string().optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateVisitorSchema = VisitorSchema.omit({ id: true, created_at: true });
export const UpdateVisitorSchema = VisitorSchema.partial();

export type Visitor = z.infer<typeof VisitorSchema>;
export type CreateVisitor = z.infer<typeof CreateVisitorSchema>;
export type UpdateVisitor = z.infer<typeof UpdateVisitorSchema>;

// --- Voucher ---
export const VoucherSchema = z.object({
  id: z.string(),
  code: z.string(),
  resident_id: z.string().optional(),
  facility_id: z.string().optional(),
  status: z.enum(['active', 'redeemed', 'expired']).optional().default('active'),
  expires_at: z.string().datetime({ offset: true }).optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateVoucherSchema = VoucherSchema.omit({ id: true, created_at: true });
export const UpdateVoucherSchema = VoucherSchema.partial();

export type Voucher = z.infer<typeof VoucherSchema>;
export type CreateVoucher = z.infer<typeof CreateVoucherSchema>;
export type UpdateVoucher = z.infer<typeof UpdateVoucherSchema>;
