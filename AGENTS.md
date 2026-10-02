# Googleカレンダークローン（React Native）

AI コーディングエージェント（Claude Code・Codex など）向けの共通の指示書です。
Claude Code 固有の補足は `.claude/CLAUDE.md` に書きます。

## プロジェクト概要

Googleカレンダーのようなカレンダーアプリのクローンです。
Expo（React Native）+ Expo Router で作っています。モバイルファーストで、パフォーマンスとクロスプラットフォーム（iOS / Android / Web）の互換性を優先します。

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
- Jest + React Native Testing Library（ユニットテスト）
- Maestro（E2Eテスト）（予定）

## Expo の API は記憶で書かない

Expo は SDK ごとに破壊的変更があり、覚えている API は名前の変更・移動・削除が起きている可能性が高いです。Expo / EAS / React Native の API を使うコードを書く前に、必ず以下を行います。

1. `package.json` の `expo` パッケージのメジャーバージョンを確認する（現在は 57）
2. 対応するバージョンのドキュメントを確認する: `https://docs.expo.dev/versions/v<major>.0.0/`
3. それ以外は https://docs.expo.dev/llms.txt （Expo ドキュメントの索引。LLM がよく誤解する点の訂正も載っている）から該当ページをたどる。記憶で答えない

## フォルダ構成

- `src/app/` — 画面のルーティング（Expo Router。ファイル = 画面、`_layout.tsx` = ナビゲーター）
- `src/features/` — 機能ごとのコード（例: calendar, events, settings）
- `src/components/` — 複数機能で共通して使うUIパーツ
- `src/hooks/` — 共通フック
- `src/constants/` — テーマ・定数
- `docs/` — アーキテクチャ・データモデル・機能実装状況などのドキュメント
- `.claude/rules/` — 開発ルールの詳細（下記「開発ルールの詳細」参照）

## 開発規約

- 画面以外のコード（コンポーネント・フック・ユーティリティ）は `src/app/` に置かない
- 画面遷移は `expo-router` の `Link` / `router`、パラメータは `useLocalSearchParams` を使う（[Expo Router のドキュメント](https://docs.expo.dev/router/introduction.md)）
- コンポーネントは `src/features/` の適切なフォルダに置く
- テストはコンポーネントと同じフォルダに置く（Co-location）
- パッケージ追加は `npx expo install <package>` を使う（npm install は使わない。SDK に合ったバージョンが選ばれる）
- 依存を追加する前に、Expo 推奨のモジュールで代替できないか確認する（[Expo の API 一覧](https://docs.expo.dev/versions/latest/index.md)）
- コミットは Conventional Commits 形式で書く
- タスク完了前に `npm run lint` と `npm run type-check` を通す

## ネイティブ

- `ios/` `android/` は Continuous Native Generation で生成されるため、手動で作成・編集しない。ネイティブの設定は `app.json` と config plugin で行う
- Expo Go に入っているのは同梱のネイティブモジュールだけ。ネイティブコードを含むライブラリを追加したら development build で確認する（`npx expo run:ios|android`、または `npx eas-cli@latest build --profile development`）

## やらないこと

- サーバー / データベースの設計・構築（予定データは端末内で完結させる）
- Google カレンダー API との実連携
- ストアへの公開・本番環境へのデプロイ
- `ios/` `android/` ディレクトリの手動作成・編集
- ファイルの自動整理・自動削除
- 意思決定の自動化

## よく使うコマンド

```bash
npm start              # 開発サーバー起動（npx expo start）
npm run ios            # iOS シミュレーターで起動
npm run android        # Android エミュレーターで起動
npm run web            # Web で起動
npm run lint           # Lint（expo lint + prettier --check .）
npm run lint:fix       # Lint の自動修正 + Prettier のフォーマット
npm run type-check     # 型チェック（tsc --noEmit）
npm test               # ユニットテスト（Jest）
npx expo install <pkg> # パッケージ追加
npx expo install --fix # SDK と互換性のないパッケージのバージョンを修正
npx expo-doctor        # 依存関係・設定の診断
```

## ドキュメント参照

タスク実行前に以下を必ず参照すること：

- `docs/architecture.md` — システム構成・設計方針
- `docs/data-model.md` — データ構造・スキーマ（予定・カレンダー等）
- `docs/feature-status.md` — 実装済み・未実装の機能一覧

## 開発ルールの詳細

以下のファイルに詳細なルールがあります。該当する作業の前に読むこと。

- `.claude/rules/mobile.md` — コンポーネント・UI・日付・ディレクトリ・命名のルール
- `.claude/rules/testing-unit.md` — ユニットテスト（Jest）のルール
- `.claude/rules/testing-e2e.md` — E2E テスト（Maestro）のルール（未記入）
- `.claude/rules/git.md` — ブランチ命名・コミットメッセージ・PR のルール
