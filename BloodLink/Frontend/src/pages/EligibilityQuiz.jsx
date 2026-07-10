import { useState } from "react";

export default function EligibilityQuiz() {
  const [answers, setAnswers] = useState({ age: "", feeling: "", recentDonation: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Minimal eligibility logic:
    // - must be 18 or older
    // - must be feeling well
    // - must not have donated in the last 3 months
    const ageOk = answers.age === "yes";
    const feelingOk = answers.feeling === "yes";
    const recentOk = answers.recentDonation === "no";

    if (ageOk && feelingOk && recentOk) {
      setResult({ eligible: true, message: "You are likely eligible to donate. Please contact a center to confirm." });
    } else {
      setResult({ eligible: false, message: "You may not be eligible based on your answers. Please consult a professional or the donation center for confirmation." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Donor Eligibility Quiz</h1>
      <p className="mb-4">This short quiz gives a quick, non-official check of basic eligibility.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Are you 18 years or older?</label>
          <div>
            <label className="mr-4"><input type="radio" name="age" value="yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="age" value="no" onChange={handleChange} /> No</label>
          </div>
        </div>

        <div>
          <label className="font-semibold">Are you feeling well today (no fever/illness)?</label>
          <div>
            <label className="mr-4"><input type="radio" name="feeling" value="yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="feeling" value="no" onChange={handleChange} /> No</label>
          </div>
        </div>

        <div>
          <label className="font-semibold">Have you donated blood in the last 3 months?</label>
          <div>
            <label className="mr-4"><input type="radio" name="recentDonation" value="yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="recentDonation" value="no" onChange={handleChange} /> No</label>
          </div>
        </div>

        <div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Check Eligibility</button>
        </div>
      </form>

      {result && (
        <div className={`mt-6 p-4 rounded ${result.eligible ? "bg-green-100" : "bg-red-100"}`}>
          <strong>{result.eligible ? "Likely Eligible" : "Possibly Ineligible"}</strong>
          <p className="mt-2">{result.message}</p>
        </div>
      )}
    </div>
  );
}
