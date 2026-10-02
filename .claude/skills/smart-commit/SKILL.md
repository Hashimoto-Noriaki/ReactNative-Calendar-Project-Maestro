---
description: 変更を論理的な単位に分割してコミットメッセージを生成する。.claude/rules/git.mdとAGENTS.mdを参照して生成する。コミットメッセージを作りたいときに使う。
---

## 指示

以下の手順でコミットメッセージを生成してください。

1. `.claude/rules/git.md` のConventional Commits形式を参照する
2. `AGENTS.md` のフォルダ構成を参照して変更のドメインを判断する
3. 変更を論理的な単位に分割する
4. それぞれに対してコミットメッセージを生成する

形式: `<type>(<scope>): <description>`

scope は `.claude/rules/git.md` のドメインに合わせる:

- calendar: カレンダー表示（月 / 週 / 日 / スケジュール）
- events: 予定の作成・編集・削除・詳細、終日・繰り返し予定
- settings: 設定
- navigation: 画面遷移・ルーティング（`src/app/`）
- ui: 共通UIパーツ（`src/components/`・テーマ）
- deps: 依存パッケージ
- ci: CI（`.github/`）
- claude: AI エージェント向けの設定（`.claude/`・`AGENTS.md`）
