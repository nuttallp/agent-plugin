# Clypmint Editing

Directory edition for existing Clypmint projects. It connects to `https://clypmint.com/mcp/claude-editing` with OAuth and includes three local, reviewed skills. It makes deterministic changes to source footage, captions, text and framing. Export renders the saved project. No synthetic media generation, narrator generation, file extraction from Claude, social posting or local execution is included.

## Setup

Install this directory in a compatible Claude plugin host, or add the endpoint as a custom connector where permitted. Sign in to your existing Clypmint account. Prepare your project in Clypmint Studio first. Custom connection alone does not install packaged skills. Availability in this public repository does not mean Anthropic has approved or published a directory listing.

## Three examples

- Show my latest video. Correct the caption spelling “Clip Mint” to “Clyp Mint”; keep the recorded speech and timing.
- Show the transcript of my selected video. Remove the final unfinished sentence after I choose its exact word range, then preview it.
- Make my selected output square using contain so the whole picture stays visible. Preview it, give me the download when ready, then restore the previous version.

## Data and limits

The declared MCP server receives selected project IDs and edit arguments, and returns account-owned project content. It does not receive Claude history or host-uploaded files. Project data follows the normal Clypmint retention policy. Disconnect the connector to end access; delete project data in Clypmint under the privacy policy. Existing account rights and usage limits apply. No payment or purchase tool is provided.

Support: parker@clypmint.com. Privacy: https://clypmint.com/legal/privacy. Terms: https://clypmint.com/legal/terms.
