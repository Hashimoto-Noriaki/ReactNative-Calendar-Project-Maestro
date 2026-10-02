# モバイル開発ルール（Expo / React Native）

## 言語・フレームワーク

- TypeScript strict mode
- React Native（Expo SDK 57）+ Expo Router
- Expo の API は SDK ごとに変わるため、実装前に SDK 57 のドキュメントを確認する（`AGENTS.md` 参照）
- パッケージ追加は `npx expo install <package>` を使う

## ルーティング

- 画面は `src/app/` に置く（ファイル = 画面、`_layout.tsx` = ナビゲーター）
- `src/app/` には画面以外のコード（コンポーネント・hooks・utils）を置かない
- 画面遷移は `expo-router` の `Link` / `router`、パラメータは `useLocalSearchParams` を使う

## コンポーネント

- 関数コンポーネントのみ
- スタイルは `StyleSheet.create` で定義する（JSX 内のインラインスタイルオブジェクトは避ける）
- 色・余白などは `src/constants/theme.ts` と `useTheme` から取得し、ハードコードしない
- ライト / ダークモード両方で表示を確認する
- プラットフォーム差分はファイル拡張子（`.web.tsx` / `.ios.tsx` / `.android.tsx`）か `Platform.select` で分ける

## UI・パフォーマンス

- 長いリスト（スケジュール表示・予定一覧）は `FlatList` / `SectionList` を使い、`ScrollView` + `map` にしない
- ノッチやホームバーは `react-native-safe-area-context` で回避する
- アニメーションは `react-native-reanimated`、スワイプ（月・週の切り替えなど）は `react-native-gesture-handler` を使う
- 画像は `expo-image` を使う

## 日付・予定データ

- 日時はタイムゾーンを意識して扱い、保存形式は ISO 8601 文字列に統一する
- 日付計算（週の開始日・月の日数・繰り返し予定の展開など）は UI から切り離し、テストしやすい純粋関数にする

## ディレクトリ

- ドメインごとに `src/features/{domain}/` に分ける（例: calendar, events, settings）
- コンポーネント・hooks・types・utils・テストを同じ feature フォルダに置く（Co-location）
- 複数 feature をまたぐものだけ `src/components/` / `src/hooks/` / `src/constants/` に置く

## ネイティブ

- `ios/` / `android/` は手動で作成・編集しない（設定は `app.json` と config plugin で行う）
- ネイティブコードを含むライブラリを追加した場合は Expo Go ではなく development build で確認する

## 命名

- ファイル名: kebab-case（例: `event-card.tsx`, `use-events.ts`）
- コンポーネント: PascalCase（例: `EventCard`, `MonthView`）
- hooks: `use` プレフィックス（例: `useEvents`, `useSelectedDate`）
- 型: PascalCase（例: `CalendarEvent`, `RecurrenceRule`）
