import { useState } from "react";
import { questions } from "../assets/questions";

function Quiz() {

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (qid: string, option: string) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert("Please enter your name and phone number");
      return;
    }

    try {
      await fetch(`${API_URL}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          answers,
        }),
      });

      console.log("Answers:", answers);
      alert("Submitted! We will guide you shortly.");

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="container mt-4">
        <div className="card bg-danger text-white p-4 text-center shadow">
          <h1>Confused About Studying Abroad?</h1>
          <h4>Find Your Best Country & Course in 60 Seconds</h4>
        </div>
      </div>

      {/* Quiz Form */}
      <div className="container mt-4">
        <div className="card p-4 shadow">

          {questions.map((q, index) => (
            <div key={q.id} className="mb-4">
              <h5 className="mb-3">
                {index + 1}. {q.question}
              </h5>

              {q.options.map((option, i) => (
                <div className="form-check mb-1" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={q.id}
                    id={`${q.id}-${i}`}
                    onChange={() => handleChange(q.id, option)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${q.id}-${i}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}

          {/* Lead Capture */}
          <hr />
          <h5 className="mb-3">📞 Get Your Free Guidance</h5>

          <input
            className="form-control mb-2"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            className="btn btn-success w-100"
            onClick={handleSubmit}
          >
            Get My Best Option →
          </button>
        </div>
      </div>
    </>
  );
}

export default Quiz;