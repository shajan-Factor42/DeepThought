# MCP Registry listing

`server.json` lists the Deep Thought connector in the official MCP Registry
(registry.modelcontextprotocol.io), which tools like VS Code and GitHub Copilot search.

Publishing: `.github/workflows/publish-mcp-registry.yml` runs when this file changes on `main`
(or by hand from the Actions tab). It signs in with GitHub's built-in OIDC, so no secrets are needed;
that's why the name is `io.github.shajan-Factor42/...`.

To release an update, change the listing and bump `version` (the registry rejects a version it already has).
