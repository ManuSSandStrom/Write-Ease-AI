import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplates } from "../../store/slices/appSlice";
import { templateCategories } from "../../constants/mockData";
import { SearchBar } from "../../components/common/SearchBar";
import { TemplateCard } from "../../components/common/TemplateCard";

const TemplatesPage = () => {
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.app.templates);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchTemplates({ category, search }));
  }, [dispatch, category, search]);

  const filteredTemplates = useMemo(() => templates, [templates]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Research Template Library</h1>
        <p className="mt-2 text-sm text-zinc-400">Search, preview, and save ready-made writing structures.</p>
      </div>
      <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search templates" />
      <div className="flex gap-2 overflow-x-auto pb-2">
        {templateCategories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`chip whitespace-nowrap ${category === item ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : ""}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template._id || template.title} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;

