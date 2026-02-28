import { motion } from "framer-motion";
import { useState } from "react";
import NewsCard from "@/components/NewsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockClaims = [
  {
    id: 1,
    claim: "Global renewable energy investment surpassed $500 billion in 2025, marking a historic milestone in the clean energy transition.",
    status: "verified" as const,
    totalVotes: 342,
    trueVotes: 298,
    falseVotes: 44,
    credibility: 87,
    timestamp: "Feb 27, 2026",
  },
  {
    id: 2,
    claim: "A new study claims that quantum computers can now break RSA-2048 encryption in under 10 minutes.",
    status: "disputed" as const,
    totalVotes: 189,
    trueVotes: 67,
    falseVotes: 122,
    credibility: 35,
    timestamp: "Feb 26, 2026",
  },
  {
    id: 3,
    claim: "The Ethereum Foundation announced a new Layer 3 scaling solution that reduces gas fees by 99.5%.",
    status: "verified" as const,
    totalVotes: 456,
    trueVotes: 412,
    falseVotes: 44,
    credibility: 90,
    timestamp: "Feb 25, 2026",
  },
  {
    id: 4,
    claim: "NASA confirms discovery of microbial life in the subsurface ocean of Europa after analyzing data from the Europa Clipper mission.",
    status: "pending" as const,
    totalVotes: 78,
    trueVotes: 45,
    falseVotes: 33,
    credibility: 58,
    timestamp: "Feb 24, 2026",
  },
  {
    id: 5,
    claim: "Central banks in 40+ countries are planning to launch CBDCs by end of 2026, potentially replacing physical cash.",
    status: "disputed" as const,
    totalVotes: 234,
    trueVotes: 89,
    falseVotes: 145,
    credibility: 38,
    timestamp: "Feb 23, 2026",
  },
];

const ClaimFeed = () => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? mockClaims : mockClaims.filter((c) => c.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen pt-24 pb-16 px-4 md:pl-24 md:pr-8"
    >
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Claim Feed</h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
            Browse the decentralized ledger of verified and disputed claims.
          </p>
        </div>

        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="bg-card border border-border rounded-xl p-1">
            <TabsTrigger value="all" className="rounded-lg text-sm data-[state=active]:bg-primary/15 data-[state=active]:text-primary font-medium">
              All
            </TabsTrigger>
            <TabsTrigger value="verified" className="rounded-lg text-sm data-[state=active]:bg-success/15 data-[state=active]:text-success font-medium">
              Verified
            </TabsTrigger>
            <TabsTrigger value="disputed" className="rounded-lg text-sm data-[state=active]:bg-warning/15 data-[state=active]:text-warning font-medium">
              Disputed
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg text-sm data-[state=active]:bg-muted data-[state=active]:text-foreground font-medium">
              Pending
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="gradient-divider" />

        <div className="space-y-6">
          {filtered.map((claim, i) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <NewsCard {...claim} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No claims found for this filter.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ClaimFeed;
