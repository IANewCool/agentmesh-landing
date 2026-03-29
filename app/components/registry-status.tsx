"use client";

import { useEffect, useState } from "react";

const REGISTRY_URL = "https://mesh.newcool.io";

interface HealthData {
  status: string;
}

interface FerrumHealth {
  agent: string;
  did: string;
  reputation: number;
  skill: string;
  status: string;
}

export function RegistryStatus() {
  const [registry, setRegistry] = useState<HealthData | null>(null);
  const [ferrum, setFerrum] = useState<FerrumHealth | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const [regRes, ferRes] = await Promise.all([
          fetch(`${REGISTRY_URL}/v1/health`),
          fetch(`${REGISTRY_URL}/ferrum/health`),
        ]);
        setRegistry(await regRes.json());
        setFerrum(await ferRes.json());
        setError(false);
      } catch {
        setError(true);
      }
    }
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-400">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Registry unreachable
      </div>
    );
  }

  if (!registry) {
    return (
      <div className="text-gray-500 animate-pulse">
        Checking registry status...
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-gray-800 bg-[#111118] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Registry</span>
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {registry.status}
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-600 font-mono">{REGISTRY_URL}</p>
      </div>

      {ferrum && (
        <div className="rounded-lg border border-gray-800 bg-[#111118] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Ferrum Agent</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {ferrum.status}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {ferrum.skill} &middot; rep: {ferrum.reputation}
          </p>
          <p className="mt-1 text-xs text-gray-600 font-mono truncate">
            {ferrum.did}
          </p>
        </div>
      )}
    </div>
  );
}
