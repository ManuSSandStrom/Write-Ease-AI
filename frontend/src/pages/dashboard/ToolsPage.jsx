import { toolCards } from "../../constants/mockData";
import { ToolCard } from "../../components/common/ToolCard";

const ToolsPage = () => (
  <div>
    <h1 className="text-3xl font-bold">Tools</h1>
    <p className="mt-2 text-sm text-zinc-400">Choose the workflow you want to launch.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {toolCards.map((tool) => (
        <ToolCard key={tool.title} {...tool} />
      ))}
    </div>
  </div>
);

export default ToolsPage;
