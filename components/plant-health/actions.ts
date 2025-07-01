"use server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function getRecentPlantHealthAnalyses({ user }: { user: any }) {
    const supabase = await createSupabaseServer();
    const { data: analyses, error } = await supabase
    .from('plant_health_analyses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

    return { analyses, error };
}
