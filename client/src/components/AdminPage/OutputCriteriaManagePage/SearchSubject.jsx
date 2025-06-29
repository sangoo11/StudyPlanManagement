import React, { useState, useEffect } from 'react';

function SearchSubject() {
  const [subjects, setSubjects] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/v1/api/subject/get-all-subject')
      .then((res) => res.json())
      .then((data) => setSubjects(data.metadata || []));
  }, []);

  const handleSearch = () => {
    const q = query.toLowerCase();
    const filtered = subjects.filter(
      (subj) =>
        subj.subjectCode.toLowerCase().includes(q) ||
        subj.subjectName.toLowerCase().includes(q)
    );
    setResults(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by code or name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((subj) => (
          <li key={subj.id}>
            <strong>{subj.subjectCode}</strong> - {subj.subjectName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchSubject;