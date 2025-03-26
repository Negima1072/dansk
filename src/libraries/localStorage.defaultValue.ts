import type { TLocalStorageDefaultValues } from "@/types/types";

export const defaultValue: TLocalStorageDefaultValues = {
  options_autoSave_span: {
    defaultValue: "5",
    description: "自動保存の間隔(分) / 0で無効 / 再起動後反映",
    dangerous: false,
    type: "number",
    cat: "Editor",
  },
  options_autoSave_max: {
    defaultValue: "10",
    description: "自動保存の最大数",
    dangerous: false,
    type: "number",
    cat: "Editor",
  },
  options_commandOrder: {
    defaultValue:
      "layerName|ca|patissier|size|position|color|font|ender|full|_live|original",
    description: "コマンドの並び替え",
    dangerous: false,
    type: "string",
    cat: "Output",
  },
  options_useCA: {
    defaultValue: "true",
    description: "CAコマンドを追加",
    dangerous: false,
    type: "boolean",
    cat: "Output",
  },
  options_usePat: {
    defaultValue: "true",
    description: "patissierコマンドを追加",
    dangerous: false,
    type: "boolean",
    cat: "Output",
  },
  options_useOriginal: {
    defaultValue: "false",
    description: "独自コマンドを追加",
    dangerous: false,
    type: "boolean",
    cat: "Output",
  },
  options_useOriginal_text: {
    defaultValue: "",
    description: "追加する独自コマンドを入力",
    dangerous: false,
    type: "string",
    required: "options_useOriginal",
    cat: "Output",
  },
  options_exportLayerName: {
    defaultValue: "false",
    description: "レイヤー名をコマンドに追加",
    dangerous: false,
    type: "boolean",
    cat: "Output",
  },
  options_timespan_owner: {
    defaultValue: "1000",
    description: "投稿者コメントで投下時の間隔(ms)",
    dangerous: true,
    type: "number",
    cat: "Post",
  },
  options_timespan_main: {
    defaultValue: "6000",
    description: "視聴者コメントで投下時の間隔(ms)",
    dangerous: true,
    type: "number",
    cat: "Post",
  },
  options_useMs: {
    defaultValue: "true",
    description: "tmコマンドをミリ秒として解釈",
    dangerous: false,
    type: "boolean",
    cat: "Post",
  },
  options_lineMode: {
    defaultValue: "false",
    description: "#000000を#010101に置換",
    dangerous: false,
    type: "boolean",
    cat: "Output",
  },
  options_exportHiddenLayer: {
    defaultValue: "false",
    description: "非表示のレイヤーを出力",
    dangerous: false,
    type: "boolean",
    cat: "Output",
  },
  options_showSelectedLayerOnTop: {
    defaultValue: "false",
    description: "選択中のレイヤーを一番上に表示",
    dangerous: false,
    type: "boolean",
    cat: "Editor",
  },
  options_addDatetimeToFilename: {
    defaultValue: "false",
    description: "現在時刻をファイル名に追加",
    dangerous: false,
    type: "boolean",
    cat: "Editor",
  },
  options_disable184: {
    defaultValue: "false",
    description: "184コマンドを無効化",
    dangerous: false,
    type: "boolean",
    cat: "Other",
  },
  options_enableColorCode: {
    defaultValue: "false",
    description: "非プレ垢のカラーコードを有効化",
    dangerous: false,
    type: "boolean",
    cat: "Other",
  },
  options_disableSpaceOptimization: {
    defaultValue: "false",
    description: "スペースの最適化を無効化",
    dangerous: false,
    type: "boolean",
    cat: "Output",
  },
  options_showLiveColumn: {
    defaultValue: "false",
    description: "_live切り替えボタンを表示",
    dangerous: false,
    type: "boolean",
    cat: "Editor",
  },
  options_saveBackgroundImage: {
    defaultValue: "false",
    description: "セーブデータに背景画像を含める",
    dangerous: false,
    type: "boolean",
    cat: "Editor",
  },
  options_memoFontSize: {
    defaultValue: "13",
    description: "メモのフォントサイズ",
    dangerous: false,
    type: "number",
    cat: "Editor",
  },
  display_trace: {
    defaultValue: "true",
  },
  display_memo: {
    defaultValue: "true",
  },
  display_time: {
    defaultValue: "true",
  },
  display_main: {
    defaultValue: "true",
  },
  display_box: {
    defaultValue: "true",
  },
  autoSave: {
    defaultValue: "[]",
  },
  memo: {
    defaultValue: "",
  },
  ppConvertBefore: {
    defaultValue: "",
  },
  ppConvertBeforeType: {
    defaultValue: "",
  },
  ppConvertAfter: {
    defaultValue: "",
  },
  ppConvertAfterType: {
    defaultValue: "",
  },
};
