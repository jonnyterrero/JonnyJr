# Direct Answers
- Define the MVP for "building my home lab, ai agents, and github workflows best use cases" (what it must do in week 1).
- Pick and lock the stack 📄 Synthesis report saved to SYNTHESIS.md
🎉 Synthesis workflow completed successfully!
mation (research/synthesis, art, homework, project).
- Track work in PRs; each feature = branch + PR with a short checklist.
- Ship something end-to-end today (one workflow from input → PR).

# Next Actions
- Create issues: "MVP scope", "First user prompt flow", "Error handling & logging".
- Wire environment: set OPENAI_API_KEY and PPLX_API_KEY locally and in repo Secrets.
- Run locally: "npm run research" then "npm run synthesize"; review outputs.
- Trigger CI: run Personal Project Help with a concrete topic; review PR.
- Add guardrails: update prompts to enforce concise Direct Answers and Next Actions.
- Add test: minimal unit test for "scripts/*.ts" happy-path.

# Materials (if relevant)
- Node 20, npm, your API keys, GitHub PAT with repo write.

# Risks & Mitigations (optional)
- Vague prompts → Add input templates in docs/briefs; assert required fields.
- CI push failures → Ensure ACTIONS_PAT repo Secret with repo:write + SSO enabled.
- Noisy outputs → Tighten prompts; add post-process filters for sections.

# References (optional)
- Repo root: https://github.com/jonnyterrero/JonnyJr
- Actions (workflows): .github/workflows/
  - art-inspiration.yml, homework-help.yml, project-assistant.yml
- Scripts: scripts/research.ts, scripts/synthesize.ts
- Secrets setup: Settings → Secrets and variables → Actions