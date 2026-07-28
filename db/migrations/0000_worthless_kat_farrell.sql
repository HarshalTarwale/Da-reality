CREATE TABLE "properties" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"developer" text NOT NULL,
	"area" text,
	"latitude" double precision,
	"longitude" double precision,
	"construction_percent" integer DEFAULT 0 NOT NULL,
	"construction_date" timestamp with time zone,
	"price_from" bigint,
	"price_to" bigint,
	"units_count" integer DEFAULT 0 NOT NULL,
	"unit_breakdown" jsonb,
	"source_image_url" text,
	"display_image" text DEFAULT '/placeholders/project-generic.svg' NOT NULL,
	"source_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "properties_source_id_unique" UNIQUE("source_id")
);
--> statement-breakpoint
CREATE INDEX "properties_developer_idx" ON "properties" USING btree ("developer");--> statement-breakpoint
CREATE INDEX "properties_area_idx" ON "properties" USING btree ("area");--> statement-breakpoint
CREATE INDEX "properties_price_from_idx" ON "properties" USING btree ("price_from");--> statement-breakpoint
CREATE INDEX "properties_created_at_idx" ON "properties" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "properties_slug_idx" ON "properties" USING btree ("slug");