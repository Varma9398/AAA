import { createClient } from '@supabase/supabase-js';

// Fallback values for development - replace with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wpgwsrnzpndwaydrwust.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZ3dzcm56cG5kd2F5ZHJ3dXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MjE2ODEsImV4cCI6MjA3MzM5NzY4MX0.57fUdhNRG3EONZd4gBlCorbMKgai88zNqAhbu2r-zDE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);