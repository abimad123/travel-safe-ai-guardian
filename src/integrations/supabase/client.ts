
import { createClient } from '@supabase/supabase-js';

// Since we're using the Edge Function, we don't need the actual client in the frontend
// Just create a minimal client that can be used to call the Edge Functions
export const supabase = createClient(
  'https://mtprpxmgjincpujogfaw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cHJweG1namlucHVqb2dmYXciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcxMjgzNTIyNiwic3ViIjoiYW5vbiJ9.GBrVRiR1DPY0L0gIGcSuHCwQn_B9cxLNyHV1L8Hb02o'
);
