# Googleカレンダークローン（React Native）

## プロジェクト概要

Googleカレンダーのようなカレンダーアプリのクローンです。
Expo（React Native）+ Expo Router と `.claude/` ディレクトリ構成にしています。

## 機能

- カレンダー表示（月 / 週 / 日 / スケジュール）
- 予定の作成・編集・削除
- 予定の詳細閲覧（日時・場所・メモ・色分け）
- 終日予定・繰り返し予定
- 日付ナビゲーション（前後移動・「今日」へ戻る）

## 技術スタック

- Expo（SDK 57）/ React Native
- Expo Router（ファイルベースルーティング）
- TypeScript
- React Native Reanimated / Gesture Handler（スワイプ等のジェスチャー）
- npm
- Jest + React Native Testing Library（ユニットテスト）（予定）
- Maestro（E2Eテスト）（予定）

## フォルダ構成

- `src/app/` — 画面のルーティング（Expo Router。ファイル = 画面、`_layout.tsx` = ナビゲーター）
- `src/features/` — 機能ごとのコード（例: calendar, events, settings）
- `src/components/` — 複数機能で共通して使うUIパーツ
- `src/hooks/` — 共通フック
- `src/constants/` — テーマ・定数
- `docs/` — アーキテクチャ・データモデル・機能実装状況などのドキュメント
- `.claude/rules/` — 開発ルールの詳細

## やらないこと

- サーバー / データベースの設計・構築（予定データは端末内で完結させる）
- Google カレンダー API との実連携
- ストアへの公開・本番環境へのデプロイ
- `ios/` `android/` ディレクトリの手動作成・編集（設定は `app.json` と config plugin で行う）
- ファイルの自動整理・自動削除
- 意思決定の自動化

## 開発規約

- 画面以外のコード（コンポーネント・フック・ユーティリティ）は `src/app/` に置かない
- コンポーネントは `src/features/` の適切なフォルダに置く
- テストはコンポーネントと同じフォルダに置く（Co-location）
- パッケージ追加は `npx expo install <package>` を使う（npm install は使わない）
- Expo の API は変更が多いため、実装前に SDK 57 の公式ドキュメントを確認する（詳細は `AGENTS.md`）
- コミットは Conventional Commits 形式で書く
- 詳細は `.claude/rules/` の各ファイルを参照

## よく使うコマンド

- `npm start` — 開発サーバー起動（`npx expo start`）
- `npm run ios` — iOS シミュレーターで起動
- `npm run android` — Android エミュレーターで起動
- `npm run web` — Web で起動
- `npm run lint` — Lint実行（`npx expo lint`）
- `npx tsc --noEmit` — 型チェック
- `npx expo-doctor` — 依存関係・設定の診断

## ドキュメント参照

AIはタスク実行前に以下を必ず参照すること：

- `AGENTS.md` — Expo / React Native 開発時の注意点
- `docs/architecture.md` — システム構成・設計方針
- `docs/data-model.md` — データ構造・スキーマ（予定・カレンダー等）
- `docs/feature-status.md` — 実装済み・未実装の機能一覧
