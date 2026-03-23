import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, Sparkles } from "lucide-react";
import { Stepper } from "../../components/common/Stepper";
import { GlassCard } from "../../components/common/GlassCard";
import { GradientButton } from "../../components/common/GradientButton";
import { resumeSteps } from "../../constants/mockData";
import { appService } from "../../services/appService";
import { storage } from "../../utils/storage";

const emptyResume = {
  personalInfo: { name: "", email: "", phone: "", role: "" },
  education: [{ institution: "", degree: "", year: "" }],
  experience: [{ company: "", role: "", duration: "", highlights: "" }],
  skills: ["", "", ""],
  projects: [{ title: "", summary: "" }],
  certifications: [{ title: "", issuer: "" }],
  selectedTemplate: "midnight-pro"
};

const labels = ["name", "email", "phone", "role"];

const ResumeBuilderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stepParam = Number(searchParams.get("step") || 0);
  const [step, setStep] = useState(stepParam);
  const [resume, setResume] = useState(storage.get("writeease_resume_draft", emptyResume));
  const [enhancedSummary, setEnhancedSummary] = useState("");

  useEffect(() => {
    storage.set("writeease_resume_draft", resume);
  }, [resume]);

  const updateNested = (section, index, field, value) => {
    setResume((current) => {
      const updatedSection = [...current[section]];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      return { ...current, [section]: updatedSection };
    });
  };

  const enhance = async () => {
    const response = await appService.enhanceResume(resume);
    setEnhancedSummary(`${response.headline}\n\n${response.summary}`);
  };

  const save = async () => {
    const response = await appService.saveResume(resume);
    navigate(`/result-preview?type=resume&id=${response.resume._id}`);
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {labels.map((label) => (
            <input
              key={label}
              className="input-base"
              placeholder={label[0].toUpperCase() + label.slice(1)}
              value={resume.personalInfo[label]}
              onChange={(event) =>
                setResume({
                  ...resume,
                  personalInfo: { ...resume.personalInfo, [label]: event.target.value }
                })
              }
            />
          ))}
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="input-base"
            placeholder="Institution"
            value={resume.education[0].institution}
            onChange={(event) => updateNested("education", 0, "institution", event.target.value)}
          />
          <input
            className="input-base"
            placeholder="Degree"
            value={resume.education[0].degree}
            onChange={(event) => updateNested("education", 0, "degree", event.target.value)}
          />
          <input
            className="input-base"
            placeholder="Year"
            value={resume.education[0].year}
            onChange={(event) => updateNested("education", 0, "year", event.target.value)}
          />
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="grid gap-4">
          {["company", "role", "duration", "highlights"].map((field) => (
            <input
              key={field}
              className="input-base"
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={resume.experience[0][field]}
              onChange={(event) => updateNested("experience", 0, field, event.target.value)}
            />
          ))}
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="grid gap-4 md:grid-cols-3">
          {resume.skills.map((skill, index) => (
            <input
              key={index}
              className="input-base"
              placeholder={`Skill ${index + 1}`}
              value={skill}
              onChange={(event) =>
                setResume((current) => {
                  const skills = [...current.skills];
                  skills[index] = event.target.value;
                  return { ...current, skills };
                })
              }
            />
          ))}
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="input-base"
            placeholder="Project title"
            value={resume.projects[0].title}
            onChange={(event) => updateNested("projects", 0, "title", event.target.value)}
          />
          <input
            className="input-base"
            placeholder="Project summary"
            value={resume.projects[0].summary}
            onChange={(event) => updateNested("projects", 0, "summary", event.target.value)}
          />
        </div>
      );
    }

    if (step === 5) {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="input-base"
            placeholder="Certification"
            value={resume.certifications[0].title}
            onChange={(event) => updateNested("certifications", 0, "title", event.target.value)}
          />
          <input
            className="input-base"
            placeholder="Issuer"
            value={resume.certifications[0].issuer}
            onChange={(event) => updateNested("certifications", 0, "issuer", event.target.value)}
          />
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <GlassCard className="bg-white/3">
          <p className="text-sm text-zinc-400">Live AI summary</p>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-200">
            {enhancedSummary || "Tap enhance to generate a stronger resume summary."}
          </p>
        </GlassCard>
        <GradientButton onClick={enhance}>
          <Sparkles className="mr-2 h-4 w-4" />
          Enhance resume
        </GradientButton>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <p className="mt-2 text-sm text-zinc-400">Guided multi-step flow with mobile-friendly editing and live preview.</p>
      </div>
      <Stepper steps={resumeSteps} currentStep={step} />
      <div className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
        <GlassCard className="space-y-4">
          {renderStep()}
          <div className="flex flex-wrap gap-3 pt-2">
            <GradientButton variant="ghost" onClick={() => setStep(Math.max(step - 1, 0))}>
              Back
            </GradientButton>
            {step < resumeSteps.length - 1 ? (
              <GradientButton onClick={() => setStep(step + 1)}>Next step</GradientButton>
            ) : (
              <GradientButton onClick={save}>Save & Review</GradientButton>
            )}
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-2 text-cyan-300">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">Live Preview</span>
          </div>
          <div className="mt-5 space-y-4 text-sm text-zinc-300">
            <div>
              <h3 className="text-xl font-semibold text-white">{resume.personalInfo.name || "Your Name"}</h3>
              <p>{resume.personalInfo.role || "Target Role"}</p>
              <p className="text-zinc-500">{resume.personalInfo.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Skills</p>
              <p className="mt-2">{resume.skills.filter(Boolean).join(" • ") || "Add your skills"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Experience</p>
              <p className="mt-2">{resume.experience[0].role || "Role"} at {resume.experience[0].company || "Company"}</p>
              <p className="mt-1 text-zinc-500">{resume.experience[0].highlights}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;

