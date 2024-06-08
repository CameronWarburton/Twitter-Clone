import { SupabaseClient } from "@supabase/supabase-js";

export const supabaseServerClient = new SupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
);
