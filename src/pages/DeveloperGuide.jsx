import React from "react";

export default function DeveloperGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 prose">
      <h1>📖 Blog API – Developer Guide</h1>

      <h2>📥 Endpoints</h2>

      <h3>1. Hent alle posts</h3>
      <pre>
        GET /api/blog
      </pre>
      <p><strong>Response:</strong></p>
      <pre>{`[
  {
    "id": 1,
    "title": "Første post",
    "author": "Admin",
    "content": "Hej verden!"
  }
]`}</pre>

      <h3>2. Opret nyt post</h3>
      <pre>
        POST /api/blog
      </pre>
      <p><strong>Body (JSON):</strong></p>
      <pre>{`{
  "title": "Ny post",
  "author": "Admin",
  "content": "Dette er indholdet"
}`}</pre>

      <h3>3. Opdater et post</h3>
      <pre>
        PUT /api/blog/:id
      </pre>
      <p><strong>Body (JSON):</strong></p>
      <pre>{`{
  "title": "Opdateret titel",
  "author": "Admin",
  "content": "Opdateret indhold"
}`}</pre>

      <h3>4. Slet et post</h3>
      <pre>
        DELETE /api/blog/:id
      </pre>
      <p>Returnerer en succes-status hvis posten blev slettet.</p>

      <h2>🛠 Eksempel på fetch</h2>
      <pre>{`// Hent alle posts
fetch("http://localhost:5224/api/blog", {
  method: "GET",
  credentials: "include"
})
  .then(res => res.json())
  .then(data => console.log(data));`}</pre>

      <h2>ℹ️ Noter</h2>
      <ul>
        <li>Alle responses er i JSON.</li>
        <li>Fejl returneres med statuskode 4xx eller 5xx.</li>
        <li>Login kræves for at oprette, opdatere eller slette posts.</li>
      </ul>
    </div>
  );
}
