# Build Notes

- Asset reference audit: 83 references, 58 unique media/logo assets, 0 missing.
- Global TypeScript parser check was run with the system TypeScript compiler. It reported only expected missing-package/module declarations because `node_modules` is not included in this artifact; no syntax errors were reported in the modified files.
- `npm install` was attempted in the sandbox but exceeded the execution timeout before dependencies were installed, so a full `next build` could not be completed here.
- Run `npm install && npm run typecheck && npm run build` locally after extraction.
