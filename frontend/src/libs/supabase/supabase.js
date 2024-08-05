// supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yokzoborixhbburgezxf.supabase.co";
const supabaseKey = "..TttPyZaW5GSCQMS0Hc-4tWRIi0Gq2aOaUGmqx03k4h8";

export const supabase = createClient(supabaseUrl, supabaseKey);
