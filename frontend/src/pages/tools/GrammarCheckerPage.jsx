import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { InputEditor } from "../../components/common/InputEditor";
import { GlassCard } from "../../components/common/GlassCard";
import { GradientButton } from "../../components/common/GradientButton";
import { toolService } from "../../services/toolService";

const GrammarCheckerPage = () => {
  const [text, setText] = useState("i am writing a statement that is very very important for my scholarship application.");
  const [result, setResult] = useState(null);

  const runCheck = async () => {
    const response = await toolService.grammar({ text });
    setResult(response);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Grammar Checker</h1>
        <p className="mt-2 text-sm text-zinc-400">Review grammar, clarity, and readability suggestions.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr,1fr]">
        <GlassCard>
          <InputEditor value={text} onChange={setText} placeholder="Paste text for grammar review" />
          <div className="mt-4 flex gap-3">
            <GradientButton onClick={runCheck}>
              <Sparkles className="mr-2 h-4 w-4" />
              Check grammar
            </GradientButton>
          </div>
        </GlassCard>
        <div className="space-y-4">
          <GlassCard>
            <h3 className="text-base font-semibold">Summary</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-zinc-500">Errors Found</p>
                <p className="mt-2 text-2xl font-semibold">{result?.stats?.errorsFound || 0}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-zinc-500">Applied</p>
                <p className="mt-2 text-2xl font-semibold">{result?.stats?.correctionsApplied || 0}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="text-base font-semibold">Suggestions</h3>
            <div className="mt-4 space-y-3">
              {(result?.suggestions || []).map((suggestion) => (
                <div key={suggestion.type} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">{suggestion.type}</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">
                    Replace <span className="text-rose-300">{suggestion.original}</span> with{" "}
                    <span className="text-emerald-300">{suggestion.suggested}</span>
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default GrammarCheckerPage;

