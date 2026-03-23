import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments } from "../../store/slices/appSlice";
import { EmptyState } from "../../components/common/EmptyState";
import { GlassCard } from "../../components/common/GlassCard";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.app.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  if (!documents.length) {
    return (
      <EmptyState
        title="No saved files yet"
        description="Saved humanized drafts, paraphrases, and reports will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Saved Files</h1>
      {documents.map((doc) => (
        <GlassCard key={doc._id}>
          <h3 className="font-semibold">{doc.title}</h3>
          <p className="mt-2 text-sm text-zinc-500">{doc.type} • {doc.mode}</p>
          <p className="mt-3 text-sm text-zinc-300">{(doc.outputText || doc.inputText || "").slice(0, 180)}...</p>
        </GlassCard>
      ))}
    </div>
  );
};

export default HistoryPage;
