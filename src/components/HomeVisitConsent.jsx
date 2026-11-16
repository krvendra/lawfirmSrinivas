import { useEffect, useState } from "react";
import { ArrowRight, Scale } from "lucide-react";

export default function HomeVisitConsent({ onDismiss, onCounted }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  async function continueWithConsent(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/preview-link/home/continue", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({ consent: "yes" }),
        credentials: "same-origin",
      });
      if (!response.ok)
        throw new Error(
          "We could not record your choice. Please try again or close this page without submitting."
        );
      const result = await response.json();
      onCounted(result.visitCount);
      onDismiss();
    } catch (requestError) {
      setError(
        requestError.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="home-consent-backdrop">
      <section
        className="home-consent-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-consent-title"
        aria-describedby="home-consent-description"
      >
        <div className="home-consent-mark" aria-hidden="true">
          <Scale size={23} strokeWidth={1.4} />
        </div>
        <p className="home-consent-eyebrow">Srinivas Kaja · Client Preview</p>
        <h2 id="home-consent-title">Before you explore</h2>
        <p className="home-consent-copy" id="home-consent-description">
         Content and images taken for  Demo Purpose only.
        </p>
        <form onSubmit={continueWithConsent}>
          {error && (
            <p className="home-consent-error" role="alert">
              {error}
            </p>
          )}
          <button
            autoFocus
            className="home-consent-accept"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Demo"}
            <ArrowRight size={16} />
          </button>
        </form>
      </section>
    </div>
  );
}
