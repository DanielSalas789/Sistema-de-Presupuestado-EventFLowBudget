// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// 🔑 Pega tus datos desde Supabase
const supabaseUrl = 'https://gjkxkllbzfsjxjbekajn.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdqa3hrbGxiemZzanhqYmVrYWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxOTU2ODIsImV4cCI6MjA3Nzc3MTY4Mn0.i-_Zn7ZLdAlE0EFosrXgBVUOqIlf08U5T4b4B3wFXh4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
