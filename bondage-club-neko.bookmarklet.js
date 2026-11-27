(async function () {
  "use strict";

  if (!/^(?:www\.)?(?:bondageprojects\.com|bondageprojects\.elementfx\.com|bondage-?europe\.com|bondage-asia\.com)$/i.test(location.hostname)) {
    alert("请先打开 Bondage Club 游戏页面，再点击猫娘书签。");
    return;
  }
  if (window.BCNekoEnhancer || window.BCNekoBookmarkletLoading) return;
  window.BCNekoBookmarkletLoading = true;

  const mirrors = ["cdn", "fastly", "gcore"];
  const errors = [];
  let code = "";
  let source = "";

  try {
    for (const mirror of mirrors) {
      const url = `https://${mirror}.jsdelivr.net/gh/QAQMOON/meow-@main/dist/bondage-club-neko.runtime.full.js`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(url, { cache: "no-cache", signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        if (!text.includes("BCNekoEnhancer")) throw new Error("runtime signature missing");
        code = text;
        source = url;
        break;
      } catch (error) {
        errors.push(`${mirror}: ${error.message}`);
      } finally {
        clearTimeout(timeout);
      }
    }

    if (!code) throw new Error(errors.join("\n"));
    if (window.BCNekoEnhancer) return;
    new Function(`${code}\n//# sourceURL=${source}`)();
    if (!window.BCNekoEnhancer) throw new Error("runtime did not initialize");
    console.info("[BC 猫娘书签] 正式版已启动喵~");
  } catch (error) {
    console.error("[BC 猫娘书签] 启动失败", error);
    alert(`猫娘插件启动失败，请刷新游戏后重试。\n${error.message}`);
  } finally {
    delete window.BCNekoBookmarkletLoading;
  }
})();
