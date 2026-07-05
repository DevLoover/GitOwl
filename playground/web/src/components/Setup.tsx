const WORKFLOW = `# .github/workflows/gitowl-review.yml
name: GitOwl Review
on:
  pull_request:
    types: [opened, synchronize, reopened]
permissions:
  contents: read
  pull-requests: write
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install gitowl
      - if: \${{ secrets.AI_API_KEY != '' }}
        env:
          AI_API_KEY: \${{ secrets.AI_API_KEY }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: gitowl review-pr "\${{ github.repository }}" "\${{ github.event.pull_request.number }}" --post`;

export function Setup() {
  return (
    <section className="setup">
      <h2>Use it on your own repo</h2>
      <p>Get automated AI review comments on every pull request — 3 steps:</p>
      <ol className="setup-steps">
        <li>
          <strong>Copy the workflow</strong> below into your repo at{" "}
          <code>.github/workflows/gitowl-review.yml</code>.
        </li>
        <li>
          <strong>Add a secret</strong> <code>AI_API_KEY</code> (your OpenRouter or OpenAI key)
          under <em>Settings → Secrets and variables → Actions</em>.
        </li>
        <li>
          <strong>Open a pull request</strong> — GitOwl reviews the diff and comments automatically.
        </li>
      </ol>
      <pre className="setup-code">{WORKFLOW}</pre>
      <p className="setup-note">
        Defaults to OpenRouter + <code>openai/gpt-4o-mini</code>. Want static analysis too? Use{" "}
        <code>pip install "gitowl[semgrep]"</code>.
      </p>
    </section>
  );
}
