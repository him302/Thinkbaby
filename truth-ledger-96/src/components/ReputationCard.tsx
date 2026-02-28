import { Star } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { truncateAddress, getReputationTier } from "@/utils/helpers";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ReputationCard = () => {
  const { address, reputation } = useWallet();
  const tier = getReputationTier(reputation);
  const [animatedRep, setAnimatedRep] = useState(0);

  useEffect(() => {
    let start = 0;
    const steps = 40;
    const increment = reputation / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= reputation) {
        setAnimatedRep(reputation);
        clearInterval(timer);
      } else {
        setAnimatedRep(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [reputation]);

  const glowClass =
    tier === "gold"
      ? "glow-border-gold"
      : tier === "silver"
      ? "glow-border-silver"
      : "glow-border-bronze";

  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  const tierColor =
    tier === "gold"
      ? "text-yellow-400"
      : tier === "silver"
      ? "text-foreground"
      : "text-orange-400";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card p-8 ${glowClass}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Trust Level
        </h3>
        <span className={`text-xs font-bold ${tierColor} px-2 py-1 rounded-md bg-secondary`}>{tierLabel}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'hsl(239 84% 67% / 0.1)', border: '1px solid hsl(239 84% 67% / 0.3)' }}>
          <Star className="w-7 h-7 text-primary fill-primary/30" />
        </div>
        <div>
          <p className="font-mono text-3xl font-bold tabular-nums">{animatedRep}</p>
          <p className="text-sm text-muted-foreground">Reputation Points</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground font-mono">
          {truncateAddress(address || "")}
        </p>
      </div>
    </motion.div>
  );
};

export default ReputationCard;
