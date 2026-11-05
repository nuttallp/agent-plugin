# Contributing

Open a pull request against the default branch with a clear description of the behavior changed and the checks you ran. Use an action-focused title that explains the change to a reader who has no prior context. Preserve Git history; do not rewrite published commits for presentation.

Use the setup and validation commands in [README.md](README.md). Keep credentials and real customer data out of fixtures, screenshots, logs, and commits. Repository security checks use synthetic or local files and must not call production services.

Changes to workflows, dependency manifests, permissions, and release code need particular care. Pin GitHub Actions to reviewed commit hashes, keep verification tokens read-only, and do not expose deployment secrets to pull-request code. Release and deployment changes require their own validation.

Report security problems through [SECURITY.md](SECURITY.md), not a public issue.
