// supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yokzoborixhbburgezxf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlva3pvYm9yaXhoYmJ1cmdlenhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NjEzODkxMCwiZXhwIjoyMDExNzE0OTEwfQ.TttPyZaW5GSCQMS0Hc-4tWRIi0Gq2aOaUGmqx03k4h8";

export const supabase = createClient(supabaseUrl, supabaseKey);
