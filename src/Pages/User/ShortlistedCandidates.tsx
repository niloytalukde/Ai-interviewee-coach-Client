import { useShortlistedStore } from "@/zustand/ShortlistedCandidates/ShortlistedCandidates.stroe";
import { useEffect } from "react";


const ShortlistedCandidates = () => {
  //  use selectors (IMPORTANT)
  const getShortlistedCandidates = useShortlistedStore(
    (state) => state.getShortlistedCandidates
  );
  const candidates = useShortlistedStore(
    (state) => state.candidates
  );
  const loading = useShortlistedStore(
    (state) => state.loading
  );
  const error = useShortlistedStore(
    (state) => state.error
  );

  //  API CALL
  useEffect(() => {
    console.log(" ShortlistedCandidates mounted");
    getShortlistedCandidates();
  }, [getShortlistedCandidates]);

  //DEBUG
  console.log(" Candidates from store:", candidates);

  if (loading) {
    return <p>Loading shortlisted candidates...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  console.log(candidates?.results);

  return (
    <div>
      <h2>Shortlisted Candidates</h2>

      {candidates?.length === 0 && (
        <p>No shortlisted candidates found</p>
      )}

      {candidates?.results?.map((candidate, index) => (
        <div
          key={candidate.email || index}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
          <p><strong>Score:</strong> {candidate.score}</p>

          <ul>
            {candidate?.reasons?.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShortlistedCandidates;
