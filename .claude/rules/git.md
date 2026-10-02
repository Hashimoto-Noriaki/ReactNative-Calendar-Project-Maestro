# Git 運用ルール

## ブランチ命名規則

- 機能追加: `feature/#{issue番号}-{内容}`
- バグ修正: `fix/#{issue番号}-{内容}`
- 設定・雑務: `chore/{内容}`
- ドキュメント: `docs/{内容}`
- リリース: `release/{バージョン}`

## コミットメッセージ（Conventional Commits）

形式: `<type>(<scope>): <description>`

type の選択肢:

- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- refactor: リファクタリング
- test: テスト追加・修正
- chore: 設定変更

scope の例（Googleカレンダークローン向け）:

- calendar, events, settings, navigation, ui, deps

## PR のルール

- タイトルは Conventional Commits 形式に合わせる
- `npm run lint` と `npx tsc --noEmit` が通ってからマージする
