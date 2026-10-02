# データモデル

予定・カレンダー・設定のデータ構造を定義する。型は実装時に `src/features/{domain}/types.ts` に置く。

## 共通ルール

- 日時は ISO 8601 文字列で保存する
  - 時刻付き: `2026-10-03T10:00:00+09:00`（タイムゾーンのオフセット付き）
  - 日付のみ（終日予定）: `2026-10-03`
- ID は端末内で生成する一意な文字列（UUID など）
- `createdAt` / `updatedAt` は時刻付き ISO 8601

## CalendarEvent（予定）

```ts
type CalendarEvent = {
  id: string;
  title: string;
  start: string; // 時刻付き ISO 8601。終日予定なら日付のみ
  end: string; // 同上
  allDay: boolean;
  location?: string;
  note?: string;
  color?: EventColor; // 未指定ならカレンダーの色を使う
  calendarId: string;
  recurrence?: RecurrenceRule;
  createdAt: string;
  updatedAt: string;
};
```

| フィールド      | 説明                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `start` / `end` | 時刻付き予定は `end` を含まない（`10:00`〜`11:00` は 11:00 ちょうどで終わる）                          |
| `allDay`        | `true` のとき `start` / `end` は日付のみ。`end` は**最終日を含む**（`2026-10-03`〜`2026-10-03` で1日） |
| `color`         | 予定ごとに色を変えたいときだけ指定する                                                                 |
| `recurrence`    | 繰り返し予定のときだけ指定する。`start` / `end` は初回の日時                                           |

## RecurrenceRule（繰り返しルール）

```ts
type RecurrenceRule = {
  freq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // 1 = 毎回、2 = 隔週・隔月など
  byWeekday?: Weekday[]; // weekly のとき対象の曜日
  until?: string; // この日まで（日付のみ、当日を含む）
  count?: number; // 回数で終了する場合
  exceptions?: string[]; // この回だけ削除した発生日（日付のみ）
};

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = 日曜
```

- `until` と `count` はどちらか一方のみ指定する。両方ないときは無期限
- `monthly` は初回と同じ日付で繰り返す（31日始まりで該当日がない月はスキップ）
- 表示時は、表示範囲の期間だけ発生日を展開する（純粋関数 `expandRecurrence` で実装予定）

### 繰り返し予定の編集・削除

Googleカレンダーと同じく、次の3種類の操作を想定する。

| 操作                   | データ上の処理                                                                 |
| ---------------------- | ------------------------------------------------------------------------------ |
| この予定のみ           | 元の予定の `exceptions` に発生日を追加し、変更する場合は単発の予定を新しく作る |
| これ以降のすべての予定 | 元の予定の `until` を前日に変更し、変更後の内容で新しい繰り返し予定を作る      |
| すべての予定           | 元の予定をそのまま更新・削除する                                               |

> **未決定:** 「この予定のみ」で作った単発の予定と元の繰り返し予定をひもづけるか（`recurringEventId` などのフィールドを持つか）。

## EventOccurrence（表示用の発生）

繰り返し予定を展開した表示用のデータ。保存はしない。

```ts
type EventOccurrence = {
  eventId: string; // 元の CalendarEvent の id
  start: string;
  end: string;
  allDay: boolean;
  isRecurring: boolean;
};
```

## Calendar（カレンダー）

```ts
type Calendar = {
  id: string;
  name: string; // 例: 「マイカレンダー」「仕事」
  color: EventColor;
  visible: boolean; // false のとき予定を非表示にする
};
```

初回起動時にデフォルトのカレンダーを1つ作成する。

## EventColor（色）

```ts
type EventColor =
  | 'tomato'
  | 'flamingo'
  | 'tangerine'
  | 'banana'
  | 'sage'
  | 'basil'
  | 'peacock'
  | 'blueberry'
  | 'lavender'
  | 'grape'
  | 'graphite';
```

色の名前だけを保存し、実際のカラーコードは `src/constants/theme.ts` でライト / ダークモードごとに定義する。

## Settings（設定）

```ts
type Settings = {
  weekStartsOn: Weekday; // 週の開始曜日（デフォルト: 0 = 日曜）
  defaultView: 'month' | 'week' | 'day' | 'schedule';
  defaultEventDurationMinutes: number; // 新規予定の長さ（デフォルト: 60）
};
```

## 保存形式

```ts
type PersistedState = {
  schemaVersion: number; // 構造を変えたら上げてマイグレーションする
  events: CalendarEvent[];
  calendars: Calendar[];
  settings: Settings;
};
```

> **未決定:** 保存先（AsyncStorage / expo-sqlite など）。[architecture.md](./architecture.md) を参照。
