import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Load counts for all entities
  const { count: ideaCount } = await supabase
    .from("ideas")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: targetingCount } = await supabase
    .from("targetings")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: goodreadCount } = await supabase
    .from("goodreads")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const stats = [
    { name: "Ideas", count: ideaCount || 0, href: "/ideas" },
    { name: "Targetings", count: targetingCount || 0, href: "/targetings" },
    { name: "Goodreads", count: goodreadCount || 0, href: "/goodreads" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Willkommen zurück!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="block p-6 bg-card rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </div>
            <div className="text-3xl font-bold mt-2">{stat.count}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
