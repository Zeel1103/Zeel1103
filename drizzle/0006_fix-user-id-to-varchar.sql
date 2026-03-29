-- Custom SQL migration file, put your code below! --import { sql } from "drizzle-orm";

export const up = async (db) => {
  // Drop existing foreign keys
  await db.execute(sql`ALTER TABLE sessions DROP CONSTRAINT IF EXISTS sessions_user_id_users_id_fk`);
  await db.execute(sql`ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_user_id_users_id_fk`);

  // Change types
  await db.execute(sql`ALTER TABLE users ALTER COLUMN id TYPE varchar(255)`);
  await db.execute(sql`ALTER TABLE sessions ALTER COLUMN user_id TYPE varchar(255)`);
  await db.execute(sql`ALTER TABLE appointments ALTER COLUMN user_id TYPE varchar(255)`);

  // Re-add FKs
  await db.execute(sql`
    ALTER TABLE sessions
    ADD CONSTRAINT sessions_user_id_users_id_fk
    FOREIGN KEY (user_id) REFERENCES users(id)
  `);

  await db.execute(sql`
    ALTER TABLE appointments
    ADD CONSTRAINT appointments_user_id_users_id_fk
    FOREIGN KEY (user_id) REFERENCES users(id)
  `);
};

export const down = async (db) => {
  // Reverse if needed (go back to integer)
  await db.execute(sql`ALTER TABLE sessions DROP CONSTRAINT IF EXISTS sessions_user_id_users_id_fk`);
  await db.execute(sql`ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_user_id_users_id_fk`);

  await db.execute(sql`ALTER TABLE users ALTER COLUMN id TYPE integer USING id::integer`);
  await db.execute(sql`ALTER TABLE sessions ALTER COLUMN user_id TYPE integer USING user_id::integer`);
  await db.execute(sql`ALTER TABLE appointments ALTER COLUMN user_id TYPE integer USING user_id::integer`);
};
