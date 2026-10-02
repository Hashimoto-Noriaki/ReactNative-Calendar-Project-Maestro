# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Storybook

Storybook は2種類あり、ストーリーファイルは共通です。

|              | 起動コマンド                 | 設定            | 用途                                                         |
| ------------ | ---------------------------- | --------------- | ------------------------------------------------------------ |
| Web 版       | `npm run storybook:web`      | `.storybook/`   | ブラウザ（`http://localhost:6006`）で手軽に確認する          |
| on-device 版 | `npm run storybook:ios` など | `.rnstorybook/` | 実機・シミュレーターで、ネイティブ専用の UI も含めて確認する |

Web 版は `react-native-web` で描画するため、`@expo/ui` や `expo-glass-effect` などネイティブ専用の UI は正しく表示されません。

### Web 版

```bash
npm run storybook:web
```

- ターミナルに「Storybook ready!」と出たら、ブラウザで <http://localhost:6006> を開きます。
- Storybook を見ている間は、このターミナルを開いたままにします。止めるとページを読み込めなくなります。
- `http://localhost:8081` は Expo の開発サーバー（アプリ本体）のアドレスで、Storybook ではありません。
- ストーリーファイルを追加・変更すると、自動で反映されます（`storybook-generate` は不要です）。
- 起動時に「A new version is available!」と出ても、アップデートしないでください。10.6 以降は `react-native-safe-area-context` を `5.8.0` に固定していて Expo SDK 57（`~5.7.0`）と衝突するため、Storybook 関連は 10.5.1 に固定しています。

### on-device 版

アプリが起動すると、最初に Storybook の画面が開きます。

```bash
npm run storybook:ios       # iOS シミュレーターで起動
npm run storybook:android   # Android エミュレーターで起動
npm run storybook           # 開発サーバーだけ起動（QR コードで実機から開く）
```

- ストーリーは `src/` 配下に `*.stories.tsx` として置きます（例：`src/components/themed-text.stories.tsx`）。
- ストーリーファイルを追加・削除したら、起動前に一覧ファイル（`.rnstorybook/storybook.requires.ts`）を作り直します。

  ```bash
  npm run storybook-generate
  ```

- 通常のアプリに戻すときは、サーバーを止めて `npm start` で起動し直します。
- Expo Go でネイティブモジュールのエラーが出る場合は、先に開発ビルドを作ってから起動します。

  ```bash
  npx expo run:ios   # または npx expo run:android
  ```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
