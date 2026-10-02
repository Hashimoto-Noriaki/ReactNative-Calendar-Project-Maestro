@../AGENTS.md

# Claude Code 固有の補足

プロジェクトの指示は上記の `AGENTS.md`（リポジトリ直下）にまとめています。ここには Claude Code 固有のことだけを書きます。

## ルール

- `.claude/rules/` のルールは Claude Code が自動で読み込む（`paths` を指定したルールは該当ファイルを扱うときだけ）

## スキル（`.claude/skills/`）

- `/test` — Lint・型チェック・Jest をまとめて実行し、結果を報告する
- `/smart-commit` — 変更を論理的な単位に分割してコミットメッセージを生成する
- `/pr-description` — PR の説明文を生成する
- `/create-issue` — GitHub Issue の本文を生成する

## サブエージェント（`.claude/agents/`）

- `code-reviewer` — コードレビュー（読み取り専用）
- `security-review` — セキュリティレビュー（読み取り専用）

## 設定（`.claude/settings.json`）

- ファイルの編集後に Prettier が自動で走る（PostToolUse フック）
- Bash の実行前に `.claude/hooks/guard.sh` が危険なコマンドをブロックする
- パッケージ追加・`git push`・`app.json` / `package.json` の編集は確認が必要。`.env` の読み書き、`ios/` `android/` の編集、force push などは禁止
