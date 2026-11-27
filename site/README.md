# Santiago Puig · living CV ("The Core")

The brief is in `CLAUDE.md`. Open facts are in `TODO.md` (generated). Decisions are in `BUILD_LOG.md`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # regenerates TODO.md, then builds to dist/
```

For the demos, copy `.env.example` to `.dev.vars` (local) and set `ANTHROPIC_API_KEY` as a Worker secret in production. The API key is read on the server only.
