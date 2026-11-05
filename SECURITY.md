# Security policy

## Report a vulnerability privately

Use [GitHub private vulnerability reporting](https://github.com/nuttallp/agent-plugin/security/advisories/new).

Include the affected version or commit, impact, and a minimal reproduction. Do not include live credentials, private customer data, or exploit details in a public issue. Reports are reviewed by the repository owner; there is no guaranteed response time or bounty.

## Supported changes

Security fixes target the default branch. Older commits and unreleased experiments are not a supported deployment. Review dependency alerts and the latest Actions run before adopting code from this repository.

## Credentials and diagnostics

Keep credentials in an approved secret store or local environment files. Never commit private keys, browser sessions, signed upload URLs, production data, or access tokens. Public client identifiers are not server credentials. If a real credential enters Git history, revoke or rotate it at its issuer immediately; deleting the current file does not revoke it.

Share only the commit, workflow/run URL, error code, timestamp, and a sanitized reproduction when diagnosing failures. Redact authorization headers, cookies, connection strings, personal data, and signed URL query parameters. A green repository check does not prove that a deployed service is healthy or free of vulnerabilities.
