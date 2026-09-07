CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`email` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`timezone` text DEFAULT '' NOT NULL,
	`availability` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`course` text NOT NULL,
	`dimension` text,
	`scores` text,
	`utm` text DEFAULT '{}' NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` integer NOT NULL,
	`email_status` text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_leads_email_created` ON `leads` (`email`,`created_at`);