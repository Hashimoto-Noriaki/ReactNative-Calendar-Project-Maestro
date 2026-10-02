---
description: PRの説明文を自動生成する。git diffを読んでGoogleカレンダークローン向けのフォーマットで出力する。変更内容をPRとしてまとめたいときに使う。
---

## 指示

`git diff master...HEAD`（と `git log master..HEAD`）を読んで、以下の形式で PR 説明文を生成してください。

- 変更ファイルのパスから、どのドメインの変更かを判断する（`AGENTS.md` のフォルダ構成を参照）
  - `src/features/{domain}/`（例: calendar / events / settings）
  - `src/app/`（画面・ルーティング）、`src/components/` / `src/hooks/` / `src/constants/`（共通）
  - `src/` 以外（`AGENTS.md`・`.claude/`・`.github/`・`docs/`・設定ファイルなど）は「開発環境・ドキュメント」として扱う
- PR のタイトルも `.claude/rules/git.md` の Conventional Commits 形式で提案する
- 書いていない変更・確認していないことを書かない。推測で補った箇所は明記する
- 末尾に `🤖 Generated with [Claude Code](https://claude.com/claude-code)` を付ける

## 概要

（何を変更したか・なぜ変更したか。1〜3 文）

## 変更したドメイン

（例: src/features/events / src/features/calendar / src/components）

## 実装内容

（変更の詳細。ドメインごとに箇条書き）

## 確認手順

（レビュアーが動作確認すべき手順。画面の変更は、iOS / Android / Web のどれで確認するか、ライト / ダークモードの両方を確認するかも書く。日付計算の変更は、月末・うるう年・終日予定・繰り返し予定などの確認すべきケースを書く）

## 影響範囲

（変更によって影響を受ける画面・機能。保存データの形式を変えた場合は、既存データへの影響も書く）
