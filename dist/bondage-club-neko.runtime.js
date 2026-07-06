// ==UserScript==
// @name         Bondage Club Neko Chat Enhancer
// @namespace    https://penyo.ru/
// @version      2.10.12
// @description  Bondage Club 猫娘插件 FUSAM/CDN 跳板；从 CDN 加载完整正式版核心
// @author       Penyo (Modified)
// @match        *://www.bondageprojects.com/club_game*
// @match        *://www.bondageprojects.elementfx.com/*
// @match        *://bondageprojects.elementfx.com/*
// @match        *://www.bondageprojects.elementfx.com/R*/BondageClub/*
// @match        *://bondageprojects.elementfx.com/R*/BondageClub/*
// @match        *://www.bondage-europe.com/*
// @match        *://bondage-europe.com/*
// @match        *://www.bondage-europe.com/R*/BondageClub/*
// @match        *://bondage-europe.com/R*/BondageClub/*
// @match        *://www.bondage-asia.com/*
// @match        *://bondage-asia.com/*
// @match        *://www.bondage-asia.com/club/R*/*
// @match        *://bondage-asia.com/club/R*/*
// @include      /^https:\/\/(www\.)?bondage(projects\.elementfx|-(europe|asia))\.com\/.*/
// @downloadURL  https://github.com/QAQMOON/meow-/raw/main/bondage-club-neko.user.js
// @updateURL    https://github.com/QAQMOON/meow-/raw/main/bondage-club-neko.user.js
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      cdn.jsdelivr.net
// @connect      raw.githubusercontent.com
// @run-at       document-start
// @license      WTFPL
// ==/UserScript==

(function () {
  "use strict";

  const VERSION = "2.10.12";
  const SOURCES = [
    `https://cdn.jsdelivr.net/gh/QAQMOON/meow-@main/dist/bondage-club-neko.runtime.full.js?v=${VERSION}`,
    `https://fastly.jsdelivr.net/gh/QAQMOON/meow-@main/dist/bondage-club-neko.runtime.full.js?v=${VERSION}`,
    `https://gcore.jsdelivr.net/gh/QAQMOON/meow-@main/dist/bondage-club-neko.runtime.full.js?v=${VERSION}`,
  ];

  function fetchText(url) {
    if (typeof GM_xmlhttpRequest === "function") {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          timeout: 15000,
          onload: (response) => {
            if (response.status >= 200 && response.status < 300) resolve(response.responseText);
            else reject(new Error(`HTTP ${response.status}`));
          },
          onerror: () => reject(new Error("network error")),
          ontimeout: () => reject(new Error("timeout")),
        });
      });
    }
    return fetch(url, { cache: "no-cache" }).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    });
  }

  async function loadFullRuntime() {
    const errors = [];
    for (const url of SOURCES) {
      try {
        const code = await fetchText(url);
        if (!code.includes("BCNekoEnhancer")) {
          throw new Error("runtime signature missing");
        }
        (0, eval)(`${code}\n//# sourceURL=${url}`);
        console.log(`[BC 猫娘增强 loader] CDN runtime loaded: ${url}`);
        return;
      } catch (error) {
        errors.push(`${url}: ${error?.message || error}`);
        console.warn("[BC 猫娘增强 loader] runtime source failed:", url, error);
      }
    }
    throw new Error(`BC 猫娘增强完整核心加载失败: ${errors.join(" | ")}`);
  }

  loadFullRuntime().catch((error) => {
    console.error("[BC 猫娘增强 loader] failed to load full runtime", error);
  });
})();
