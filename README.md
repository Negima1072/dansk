﻿# NicoNicoDansaScriptCustom
This is a script that works with Nico Nico Douga.  It helps to utilize the comment function.  
Created By @Negima1072 and @eneko0513 and @xpadev-net

## 推奨環境
- Chrome
- Brave
- Firefox

その他Chromium系であれば動作すると思われます


## 拡張機能の読み込み
### Chrome
[拡張機能](chrome://extensions/)を開き、右上のデベロッパーモードを有効にします  
ダウンロードしてきたzipファイルを解凍し、「パッケージ化されていない拡張機能を読み込む」から、中のdistフォルダーを選択します  

### Firefox
ダウンロードしてきたzipファイルを解凍し、distフォルダー内のmanifest.jsonを削除し、manifest.firefox.jsonをmanifest.jsonにリネームします  
[デバッガー](about:debugging#/runtime/this-firefox)を開き、「一時的なアドオンを読み込む」から、先程リネームしたmanifest.jsonを選択します  

## 変更点
### v1.0.0
#### 廃止
- 線画モード
今後設定で同等の機能を追加する予定です
- sageコマンド
ニコニコ側で廃止されたため
#### 変更
- 動的な画面サイズの変更に対応しました  
画面読み込み後に画面サイズを変更しても、表示が崩れなくなりました
- 複数コメントによるテンプレートを１つのレイヤーとして扱うように変更しました  
１レイヤーで一覧がうまることがなくなりました
- 時間移動の入力の制限を緩和しました  
使用できるフォーマット：xx:xx.xx / xx.xx / xx:xx / xx  
それぞれ前に+/-をつけると相対で時間移動します
#### 追加
- レイヤー名を変更できるようにしました  
レイヤー名をダブルクリックすると入力できるようになります
- 複数レイヤーをまとめて選択/編集/出力できるようにしました  
ctrl/cmd + クリックで複数レイヤーを選択できます
- 複数の背景を保持できるようにしました  
ついでに画像をURLから指定できるようになってます
#### 準備中
- CSS調整機能
- 設定機能
- 保存・読み込み機能
