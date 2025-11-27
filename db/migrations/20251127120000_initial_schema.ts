import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Enable UUID extension if not enabled
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // 1. Property Categories
    await knex.schema.createTable("property_categories", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.text("name").notNullable().unique();
        table.text("description");
    });

    // 2. Properties
    await knex.schema.createTable("properties", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.text("name").notNullable();
        table.uuid("category_id").references("id").inTable("property_categories");
        table.text("phone");
        table.text("location").notNullable();
        table.text("description");
        table.text("image_url");
        table.specificType("tags", "text[]").defaultTo("{}");
        table.boolean("delivery_available").defaultTo(false);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 3. Facilities
    await knex.schema.createTable("facilities", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")); // db.sql used uuid_generate_v4(), keeping consistency or gen_random_uuid()
        table.text("name").notNullable();
        table.text("location");
        table.uuid("manager_id"); // References auth.users
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 4. Residents
    await knex.schema.createTable("residents", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("user_id").unique(); // References auth.users
        table.text("name").notNullable();
        table.text("email").notNullable();
        table.text("phone");
        table.text("unit");
        table.text("profile_image_url");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.uuid("property_id").references("id").inTable("properties");
    });

    // 5. Visitors
    await knex.schema.createTable("visitors", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("resident_id").references("id").inTable("residents");
        table.text("name").notNullable();
        table.text("phone");
        table.text("purpose");
        table.text("area");
        table.timestamp("expected_arrival");
        table.text("qr_data");
        table.timestamp("issued_at").defaultTo(knex.fn.now());
        table.boolean("is_checked_in").defaultTo(false);
        table.timestamp("check_in_time");
        table.timestamp("check_out_time");
        table.text("status").defaultTo("issued");
        table.text("notes");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 6. Guards
    await knex.schema.createTable("guards", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("user_id").unique(); // References auth.users
        table.text("name").notNullable();
        table.text("email").notNullable();
        table.text("phone");
        table.text("shift_info");
        table.text("location_assigned");
        table.boolean("is_active").defaultTo(true);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 7. Advertisements
    await knex.schema.createTable("advertisements", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.text("partner_id");
        table.text("title").notNullable();
        table.text("description");
        table.text("image_url");
        table.text("contact");
        table.timestamp("valid_until");
        table.boolean("is_active").defaultTo(true);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 8. Announcements
    await knex.schema.createTable("announcements", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.text("title").notNullable();
        table.text("content").notNullable();
        table.boolean("is_urgent").defaultTo(false);
        table.timestamp("valid_from").defaultTo(knex.fn.now());
        table.timestamp("valid_until");
        table.text("created_by");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 9. Events
    await knex.schema.createTable("events", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.text("name").notNullable();
        table.text("image_url");
        table.text("description");
        table.text("location").notNullable();
        table.timestamp("event_date").notNullable();
        table.specificType("tags", "text[]").defaultTo("{}");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.uuid("created_by"); // References auth.users
    });

    // 10. Offers
    await knex.schema.createTable("offers", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.text("title").notNullable();
        table.text("image_url");
        table.text("description");
        table.text("location");
        table.text("contact");
        table.timestamp("valid_until").notNullable();
        table.specificType("tags", "text[]").defaultTo("{}");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 11. Profiles
    await knex.schema.createTable("profiles", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("user_id"); // References auth.users
        table.text("full_name");
        table.text("avatar_url");
        table.text("phone");
        table.text("role").defaultTo("user"); // Check constraint handled in logic or raw SQL if needed
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 12. Security Check Logs
    await knex.schema.createTable("security_check_logs", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("visitor_id").references("id").inTable("visitors");
        table.uuid("guard_id").references("id").inTable("guards");
        table.timestamp("check_time").defaultTo(knex.fn.now());
        table.text("action");
        table.text("details");
    });

    // 13. Visit Logs
    await knex.schema.createTable("visit_logs", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("visitor_id").references("id").inTable("visitors");
        table.uuid("resident_id").references("id").inTable("residents");
        table.uuid("property_id").references("id").inTable("properties");
        table.text("action").notNullable();
        table.text("details");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    // 14. Vouchers
    await knex.schema.createTable("vouchers", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.text("code").notNullable().unique();
        table.uuid("resident_id"); // References auth.users in db.sql, but residents table exists. db.sql says REFERENCES auth.users(id) for resident_id.
        // Wait, db.sql says: CONSTRAINT vouchers_resident_id_fkey FOREIGN KEY (resident_id) REFERENCES auth.users(id)
        // But logically it should be residents table? Or maybe residents are users.
        // I will follow db.sql and make it a UUID without FK to public.residents if it points to auth.users.
        table.uuid("facility_id").references("id").inTable("facilities");
        table.text("status").defaultTo("active");
        table.timestamp("expires_at");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("vouchers");
    await knex.schema.dropTableIfExists("visit_logs");
    await knex.schema.dropTableIfExists("security_check_logs");
    await knex.schema.dropTableIfExists("profiles");
    await knex.schema.dropTableIfExists("offers");
    await knex.schema.dropTableIfExists("events");
    await knex.schema.dropTableIfExists("announcements");
    await knex.schema.dropTableIfExists("advertisements");
    await knex.schema.dropTableIfExists("guards");
    await knex.schema.dropTableIfExists("visitors");
    await knex.schema.dropTableIfExists("residents");
    await knex.schema.dropTableIfExists("facilities");
    await knex.schema.dropTableIfExists("properties");
    await knex.schema.dropTableIfExists("property_categories");
}
