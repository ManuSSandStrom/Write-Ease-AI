import { useState } from "react";
import { Save, WandSparkles } from "lucide-react";
import { InputEditor } from "../../components/common/InputEditor";
import { OutputPreview } from "../../components/common/OutputPreview";
import { GradientButton } from "../../components/common/GradientButton";
import { GlassCard } from "../../components/common/GlassCard";
import { toolService } from "../../services/toolService";
import { appService } from "../../services/appService";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/uiSlice";

const defaultModes = {
  humanizer: ["Academic", "Natural", "Formal", "Concise", "Persuasive"],
  paraphraser: ["Standard", "Fluency", "Creative", "Academic", "Shorten"]
};

const titles = {
  humanizer: "AI Humanizer",
  paraphraser: "Paraphraser"
};

const ToolWorkspacePage = ({ type }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(
    "WriteEase AI helps students and professionals transform rough writing into clear, polished content."
  );
  const [mode, setMode] = useState(defaultModes[type][0]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runTool = async () => {
    setLoading(true);
    const service = type === "humanizer" ? toolService.humanize : toolService.paraphrase;
    const result = await service({ text, mode: mode.toLowerCase(), saveResult: false });
    setOutput(result.output);
    setLoading(false);
  };

  const saveResult = async () => {
    if (!output) return;
    await appService.saveDocument({
      title: `${titles[type]} Result`,
      type,
      inputText: text,
      outputText: output,
      mode: mode.toLowerCase(),
      metadata: {}
    });
    dispatch(showToast("Saved to your history"));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{titles[type]}</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Clean, distraction-free writing workflow with AI-assisted refinement.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {defaultModes[type].map((item) => (
          <button
            key={item}
            onClick={() => setMode(item)}
            className={`chip ${mode === item ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : ""}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr,1fr]">
        <GlassCard>
          <InputEditor
            value={text}
            onChange={setText}
            placeholder={`Paste your ${type} input here`}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <GradientButton onClick={runTool}>
              <WandSparkles className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : type === "humanizer" ? "Humanize" : "Rewrite"}
            </GradientButton>
            <GradientButton variant="ghost" onClick={() => setText("")}>
              Clear
            </GradientButton>
          </div>
        </GlassCard>
        <OutputPreview
          title="Output"
          content={output}
          onCopy={() => navigator.clipboard.writeText(output)}
          actions={
            <>
              <GradientButton variant="ghost" onClick={saveResult}>
                <Save className="mr-2 h-4 w-4" />
                Save result
              </GradientButton>
            </>
          }
        />
      </div>
    </div>
  );
};

export default ToolWorkspacePage;

