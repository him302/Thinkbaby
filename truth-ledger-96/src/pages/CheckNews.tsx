import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Search, FileCheck, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import TruthMatrix from "@/components/TruthMatrix";
import VoteButtons from "@/components/VoteButtons";

interface AnalysisResult {
  extractedClaim: string;
  aiRiskScore: number;
  onChainTrue: number;
  onChainFalse: number;
  explanation: string;
  isRegistered: boolean;
}

const CheckNews = () => {
  const [newsText, setNewsText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [registering, setRegistering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleAnalyze = async () => {
    if (!newsText.trim()) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 2500));
    const isRegistered = Math.random() > 0.4;
    setResult({
      extractedClaim: newsText.slice(0, 120) + (newsText.length > 120 ? "..." : ""),
      aiRiskScore: Math.floor(Math.random() * 80) + 10,
      onChainTrue: isRegistered ? Math.floor(Math.random() * 200) + 50 : 0,
      onChainFalse: isRegistered ? Math.floor(Math.random() * 80) + 10 : 0,
      explanation:
        "Based on cross-referencing multiple data sources, linguistic pattern analysis, and known misinformation markers, the AI has assessed the veracity probability of this claim.",
      isRegistered,
    });
    setAnalyzing(false);
  };

  const handleRegister = async () => {
    setRegistering(true);
    await new Promise((r) => setTimeout(r, 2500));
    setResult((prev) => (prev ? { ...prev, isRegistered: true, onChainTrue: 1, onChainFalse: 0 } : prev));
    setRegistering(false);
  };

  const getStatusConfig = () => {
    if (!result) return null;
    const score = result.aiRiskScore;
    if (score >= 70) return { label: "High Risk", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", borderColor: "border-destructive/30" };
    if (score >= 40) return { label: "Under Review", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", borderColor: "border-warning/30" };
    return { label: "Low Risk", icon: CheckCircle, color: "text-success", bg: "bg-success/10", borderColor: "border-success/30" };
  };

  const statusConfig = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen pt-24 pb-16 px-4 md:pl-24 md:pr-8"
    >
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Check News</h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
            Paste a news article or claim to analyze its truthfulness with AI and blockchain consensus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            <div className={`glass-card p-8 transition-all duration-500 ${analyzing ? "scan-animation" : ""} ${isFocused ? "glow-input" : ""}`}>
              <Textarea
                placeholder="Paste news text or a claim here to verify..."
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="min-h-[200px] bg-secondary/50 border-border text-base resize-none focus:border-primary/50 rounded-xl transition-all duration-300"
              />
              <div className="mt-4">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzing || !newsText.trim()}
                    className="w-full gap-2 shimmer-button rounded-xl h-12 text-sm font-semibold tracking-wide"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Analyzing on-chain data...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Submit Claim
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Actions */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-card p-8"
                >
                  {result.isRegistered ? (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Cast Your Vote
                      </h3>
                      <VoteButtons
                        onVoteTrue={() => {}}
                        onVoteFalse={() => {}}
                        trueVotes={result.onChainTrue}
                        falseVotes={result.onChainFalse}
                      />
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        This claim hasn't been registered on-chain yet.
                      </p>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleRegister}
                          disabled={registering}
                          className="shimmer-button gap-2 rounded-xl h-12"
                        >
                          {registering ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Mining on Sepolia...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              Register Claim on Sepolia Testnet
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Results */}
          <AnimatePresence>
            {result ? (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Extracted Claim */}
                <div className="glass-card p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FileCheck className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Extracted Claim
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed mb-4">{result.extractedClaim}</p>
                  {statusConfig && (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.color} ${statusConfig.bg} border ${statusConfig.borderColor}`}>
                      <statusConfig.icon className="w-3 h-3" />
                      {statusConfig.label}
                    </div>
                  )}
                </div>

                {/* Truth Matrix */}
                <TruthMatrix
                  aiRiskScore={result.aiRiskScore}
                  onChainTrue={result.onChainTrue}
                  onChainFalse={result.onChainFalse}
                  explanation={result.explanation}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-8 flex flex-col items-center justify-center min-h-[300px] text-center"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'hsl(239 84% 67% / 0.1)' }}>
                  <Search className="w-8 h-8 text-primary/40" />
                </div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Analysis Yet</h3>
                <p className="text-sm text-muted-foreground/70 max-w-xs">
                  Paste a news article or claim on the left and click Submit to analyze.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckNews;
