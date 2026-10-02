---
paths:
  - "src/**/*.spec.{ts,tsx}"
---

# Unit Test Rules（Jest）

E2E（Maestro）のルールは `testing-e2e.md` を参照（未整備）。

## 環境

- プリセットは `jest-expo` を使う
- コンポーネント・hooks のテストは `@testing-library/react-native` を使う
- 導入時は `npx expo install jest-expo jest @types/jest @testing-library/react-native -- --save-dev` で入れる

## ファイル命名

- `*.spec.ts` / `*.spec.tsx`
- テストファイルはテスト対象と同じディレクトリに置く

## Jest の書き方

- `describe` / `it` の説明は**日本語**で書く
- `describe` でテスト対象を括り、`it` で振る舞いを記述する

```ts
describe('getMonthDays', () => {
  it('2026年2月は28日分を返す', () => { ... });

  describe('週の開始日が月曜日の場合', () => {
    it('前月末の日付で先頭を埋める', () => { ... });
  });
});
```

## 日付を扱うテスト

- 「今日」に依存する処理は `jest.useFakeTimers()` + `jest.setSystemTime()` で日時を固定する
- `afterEach(() => { jest.useRealTimers(); })` で元に戻す
- タイムゾーンで結果が変わらないよう、テストの日時は明示的に指定する
- 月末・うるう年・年またぎ・週またぎなどの境界値を必ずテストする

## モック

- 外部モジュール（ストレージ・Expo のネイティブモジュールなど）は `jest.mock()` でモックする
- `beforeEach(() => { jest.clearAllMocks(); })` で各テスト前にモックをリセットする

```ts
jest.mock('@/features/events/storage/event-storage', () => ({
  loadEvents: jest.fn(),
  saveEvents: jest.fn(),
}));
```

## コンポーネントのテスト

- `render` + `screen` で描画し、`getByText` / `getByRole` など利用者目線のクエリで要素を取得する
- 操作は `userEvent`（`@testing-library/react-native`）を使う
- `testID` はほかのクエリで取得できない場合のみ使う

## hooks のテスト

- `@testing-library/react-native` の `renderHook` + `act` を使う
- 非同期処理は `await act(async () => { ... })` で囲む

## カバレッジ方針

- カバレッジは **C1（分岐カバレッジ）まで** を目標とする
- C2（条件カバレッジ）以上は求めない
- UI コンポーネントより hooks / utils（特に日付計算・繰り返し予定の展開）のロジックを優先してテストする
