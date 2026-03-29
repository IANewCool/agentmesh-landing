"use client";

import { useEffect, useState } from "react";

const REGISTRY_URL = "https://mesh.newcool.io";

interface Candidate {
  agent_did: string;
  skill_id: string;
  reputation: number;
  cost_usd: number;
  latency_ms: number;
  endpoint: string;
}

interface SearchResult {
  candidates: Candidate[];
}

export function AgentCard() {
  const [agents, setAgents] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${REGISTRY_URL}/v1/skills/search?q=*`);
        const data: SearchResult = await res.json();
        setAgents(data.candidates || []);
      } catch {
        setAgents([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="text-gray-500 animate-pulse">Loading agents...</div>;
  }

  if (agents.length === 0) {
    return (
      <div className="rounded-lg border border-gray-800 bg-[#0d0d14] p-6 text-center text-gray-500">
        No agents currently registered. Be the first to deploy.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {agents.map((a, i) => (
        <div
          key={`${a.agent_did}-${i}`}
          className="rounded-lg border border-gray-800 bg-[#111118] p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <h3 className="font-semibold text-white">{a.skill_id}</h3>
              </div>
              <p className="mt-1 text-xs text-gray-600 font-mono truncate max-w-md">
                {a.agent_did}
              </p>
            </div>
            <div className="text-right text-sm">
              <div className="text-gray-400">
                rep: <span className="text-white">{a.reputation}</span>
              </div>
              <div className="text-gray-400">
                ${a.cost_usd}
                <span className="text-gray-600">/req</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
