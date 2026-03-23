import { useState } from "react";
import { InputEditor } from "../../components/common/InputEditor";
import { GlassCard } from "../../components/common/GlassCard";
import { GradientButton } from "../../components/common/GradientButton";
import { toolService } from "../../services/toolService";

const PlagiarismCheckerPage = () => {
  const [text, setText] = useState("This sample abstract discusses research methodology, findings, and literature-backed reasoning.");
  const [result, setResult] = useState(null);

  const runScan = async () => {
    const response = await toolService.plagiarism({ text });
    setResult(response);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Plagiarism Checker</h1>
        <p className="mt-2 text-sm text-zinc-400">Scan originality, view similarity score, and inspect source matches.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr,1fr]">
        <GlassCard>
          <InputEditor value={text} onChange={setText} placeholder="Paste your content or upload later" />
          <div className="mt-4">
            <GradientButton onClick={runScan}>Scan content</GradientButton>
          </div>
        </GlassCard>
        <div className="space-y-4">
          <GlassCard>
            <h3 className="text-base font-semibold">Similarity Summary</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-zinc-500">Similarity</p>
                <p className="mt-2 text-2xl font-semibold">{result?.summary?.similarity || 0}%</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-zinc-500">Originality</p>
                <p className="mt-2 text-2xl font-semibold">{result?.summary?.originality || 0}%</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="text-base font-semibold">Matched Sources</h3>
            <div className="mt-4 space-y-3">
              {(result?.sources || []).map((source) => (
                <div key={source.url} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium">{source.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{source.url}</p>
                  <p className="mt-2 text-sm text-cyan-300">{source.match} match</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismCheckerPage;

