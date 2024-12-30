import { convertText } from "@/libraries/convert";
import { Storage } from "@/libraries/localStorage";
import type { TConvertFormat } from "@/types/types";

/**
 * localStorage移行用
 * 値を読み取って該当cookieを削除
 * @param name
 */
const getCookie = (name: string): null | string => {
  let value = null;
  for (const v of Array.from(document.cookie.split("; "))) {
    if (name === v.split("=")[0]) {
      value = v.split("=")[1]?.replace(/\{break}/g, "\n");
    }
  }
  document.cookie = `${name}=; max-age=0`;
  return value;
};

const tgTextType = (t: string | null): TConvertFormat | undefined => {
  if (!t) return undefined;
  if (t in ["domo", "dansk", "tokome"]) {
    return t as TConvertFormat;
  }
  return undefined;
};

export const Root = () => {
  const [mode, setMode] = useState<"conv" | "help">("conv");
  const [beforeText, setBeforeText] = useState("");
  const [afterText, setAfterText] = useState("");
  const [beforeType, setBeforeType] = useState<TConvertFormat>("domo");
  const [afterType, setAfterType] = useState<TConvertFormat>("dansk");
  const toggleMode = () => {
    if (mode === "conv") {
      setMode("help");
    } else {
      setMode("conv");
    }
  };
  const save = () => {
    Storage.set("ppConvertBefore", beforeText);
    Storage.set("ppConvertBeforeType", beforeType);
    Storage.set("ppConvertAfter", afterText);
    Storage.set("ppConvertAfterType", afterType);
  };
  const handleCopyClick = useCallback(() => {
    navigator.clipboard
      .writeText(afterText)
      .then(() => {
        alert("コピーしました。");
      })
      .catch(() => {
        alert("コピーに失敗しました");
      });
  }, [afterText]);
  const handleClearClick = () => {
    setBeforeText("");
    setAfterText("");
    save();
  };
  const handleReplaceClick = useCallback(() => {
    setAfterText(convertText(beforeType, afterType, beforeText));
    save();
  }, [beforeText, beforeType, afterType]);
  const handleRepairClick = useCallback(() => {
    setBeforeText(convertText(afterType, beforeType, afterText));
    save();
  }, [afterText, beforeType, afterType]);
  useEffect(() => {
    setBeforeText(
      getCookie("dnsk_pp_before") || Storage.get("ppConvertBefore") || "",
    );
    setAfterText(
      getCookie("dnsk_pp_after") || Storage.get("ppConvertAfter") || "",
    );
    setBeforeType(
      tgTextType(getCookie("dnsk_pp_before_type")) ||
        tgTextType(Storage.get("ppConvertBeforeType")) ||
        "domo",
    );
    setAfterType(
      tgTextType(getCookie("dnsk_pp_after_type")) ||
        tgTextType(Storage.get("ppConvertAfterType")) ||
        "dansk",
    );
    save();
  }, []);
  return (
    <>
      <header>
        <h1>{mode === "conv" ? "変換ウィンドウ" : "ヘルプ"}</h1>
        <button type="button" onClick={toggleMode}>
          {mode === "conv" ? "ヘルプ" : "戻る"}
        </button>
      </header>
      <main className={mode}>
        {mode === "conv" && (
          <>
            <div>
              <label htmlFor="before_select">置換前</label>
              <select
                id="before_select"
                value={beforeType}
                onChange={(e) =>
                  setBeforeType(e.target.value as TConvertFormat)
                }
              >
                <option value="domo">どーもさん式TXT</option>
                <option value="dansk">だんスク式TXT</option>
                <option value="tokome">ニコ動投コメJSON</option>
              </select>
              <input
                className="button"
                type="button"
                value="クリア"
                onClick={handleClearClick}
              />
            </div>
            <textarea
              wrap="off"
              placeholder="ここに置換したいテキストを入力"
              spellCheck={false}
              value={beforeText}
              onChange={(e) => setBeforeText(e.target.value)}
            />
            <div className="button">
              <input type="button" value="↓置換" onClick={handleReplaceClick} />
              <input type="button" value="↑復元" onClick={handleRepairClick} />
            </div>
            <div>
              <label htmlFor="after_select">置換後</label>
              <select
                id="after_select"
                value={afterType}
                onChange={(e) => setAfterType(e.target.value as TConvertFormat)}
              >
                <option value="dansk">だんスク式TXT</option>
                <option value="domo">どーもさん式TXT</option>
                <option value="tokome">ニコ動投コメJSON</option>
              </select>
              <input
                className="button"
                type="button"
                value="コピー"
                onClick={handleCopyClick}
              />
            </div>
            <textarea
              wrap="off"
              placeholder="変換後のテキストが表示されます。"
              spellCheck={false}
              value={afterText}
              onChange={(e) => setAfterText(e.target.value)}
            />
          </>
        )}
        {mode === "help" && (
          <>
            <div>
              <h4>どーもさんツール式TXT</h4>
              <textarea
                value={
                  "big shita gothic #010101\n" +
                  "s\n\n\ns\n\n\ns\nテスト\n" +
                  "\ns\n\n\ns\n\n\ns"
                }
                wrap="off"
                readOnly
              />
            </div>
            <div>
              <h4>だんスク式TXT</h4>
              <textarea
                value={
                  "[big shita gothic #010101]" +
                  "s<br><br><br>s<br><br><br>s<br>テスト<br>" +
                  "<br>s<br><br><br>s<br><br><br>s"
                }
                wrap="off"
                readOnly
              />
            </div>
            <div>
              <h4>ニコ動投コメJSON</h4>
              <textarea
                value={
                  "[\n  {\n" +
                  '    "time": "00:00.00",\n' +
                  '    "command": "big shita gothic #010101",\n' +
                  '    "comment": "s\\n\\n\\ns\\n\\n\\ns\\nテスト\\n\\ns\\n\\n\\ns\\n\\n\\ns"\n' +
                  "  }\n]"
                }
                wrap="off"
                readOnly
              />
            </div>
          </>
        )}
      </main>
    </>
  );
};
