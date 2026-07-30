import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Health() {
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/ip")
      .then((r) => r.json())
      .then((d) => setTime(d.datetime))
      .catch(() => setTime("Failed"));
  }, []);

  return (
    <Layout>
      <section className="container py-24">
        <h1 className="text-4xl font-bold mb-6">
          Health Check
        </h1>

        <div className="rounded-2xl border border-border p-8">
          <p className="text-muted-foreground">
            API Status
          </p>

          <p className="mt-4 text-accent font-mono">
            {time}
          </p>
        </div>
      </section>
    </Layout>
  );
}