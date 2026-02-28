import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import VoteButtons from "./VoteButtons";

interface NewsCardProps {
  id: number;
  claim: string;
  status: "verified" | "disputed" | "pending";
  totalVotes: number;
  trueVotes: number;
  falseVotes: number;
  credibility: number;
  timestamp: string;
}

const NewsCard = ({
  claim,
  status,
  totalVotes,
  trueVotes,
  falseVotes,
  credibility,
  timestamp,
}: NewsCardProps) => {
  const statusConfig = {
    verified: { label: "Verified", className: "bg-success/15 text-success border-success/30 badge-pulse-green" },
    disputed: { label: "Under Dispute", className: "bg-warning/15 text-warning border-warning/30 badge-pulse-amber" },
    pending: { label: "Pending", className: "bg-muted text-muted-foreground border-border" },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-hover p-8"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <h3 className="text-base font-medium leading-relaxed flex-1">{claim}</h3>
        <Badge variant="outline" className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}>
          {config.label}
        </Badge>
      </div>

      <div className="flex items-center gap-6 mb-5 text-sm text-muted-foreground">
        <span>Votes: <span className="text-foreground font-semibold">{totalVotes}</span></span>
        <span>Credibility: <span className="text-foreground font-semibold">{credibility}%</span></span>
        <span className="text-xs">{timestamp}</span>
      </div>

      <div className="flex items-center justify-between">
        <VoteButtons
          onVoteTrue={() => {}}
          onVoteFalse={() => {}}
          trueVotes={trueVotes}
          falseVotes={falseVotes}
        />

        <div className="flex items-center gap-3">
          <div className="h-2 w-32 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${credibility}%` }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{
                background: credibility > 60
                  ? 'hsl(160 84% 39%)'
                  : credibility > 40
                  ? 'hsl(38 92% 50%)'
                  : 'hsl(0 84% 60%)',
              }}
            />
          </div>
          <span className="text-xs font-semibold text-muted-foreground">{credibility}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
