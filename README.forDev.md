## 開発者向けドキュメント

### ディレクトリ構造

<pre>
.
├── public 静的なファイルの保管 ビルド時にdistにコピーされる
├── .output ビルド成果物の出力先
├── src ソースコード保管フォルダ
|   ├── __tests__ vitestのテストファイル
│   ├── types 型定義ファイル用
│   ├── components 各コンポーネントを格納 CSSを含むものはフォルダに入れてまとめる
│   |   ├── footers プレイヤー外下に表示されるブロック
│   |   ├── headers プレイヤー外上に表示されるブロック
│   |   ├── layer 動画上に表示されるレイヤー
│   |   ├── main プレイヤー下に表示されるブロック
│   |   ├── options 設定機能
│   |   ├── memo メモ機能
|   |   └── popup ポップアップ(相互変換)用
|   ├── entrypoints WXTで利用するエントリーポイント
|   ├── hooks Reactのフック
│   └── libraries 便利ツールとか
</pre>

### TS の書き方

#### Null/Undefined の取り扱い

TypeGuard(src/libraries/typeGuard.ts)を使うか、if で確認をする
!で握りつぶすと lint に怒られるので注意

#### 型キャスト

`<type>hoge`とすると JSX と混同するため型をキャストするときは`hoge as type`でキャスト

#### 拡張子

React(JSX)を含むものは tsx に、それ以外は ts にする

#### データ

データを保管する場合は ts ファイルで変数に型付きで定義して、export する
JSON は型定義ができないので使用しない

### リリースの仕方

1. main ブランチに PullRequest を出しマージする
2. main ブランチ宛にバージョン名の変更,README.md の変更を push する。
3. main->Release で PullRequest を出しマージする
4. Release ブランチで main->Release のマージコミット宛にバージョン名(vx.x.x)のタグを push する
5. Action が実行される（自動）
6. Discord の配布チャンネルでリリースノートを貼り付ける
7. Twitter で告知を行う
