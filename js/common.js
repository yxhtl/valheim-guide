/* ===== Valheim Guide - Common JS ===== */
/* Dark mode / Language / Global Search / Burger / Back-to-top */
(function () {
  "use strict";

  /* ---------- SVG icons ---------- */
  var ICON_SEARCH = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  var ICON_SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var ICON_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  /* ---------- i18n dictionary (UI framework) ---------- */
  var I18N = {
    "nav.getting-started": { zh: "新手入门", en: "Beginner" },
    "nav.resources": { zh: "资源采集", en: "Resources" },
    "nav.building": { zh: "建造指南", en: "Building" },
    "nav.dungeons": { zh: "地牢战斗", en: "Dungeons" },
    "nav.farming": { zh: "农场种植", en: "Farming" },
    "nav.explore": { zh: "生物群落", en: "Biomes" },
    "nav.items": { zh: "物品图鉴", en: "Items" },
    "nav.cta.start": { zh: "开始攻略", en: "Start Guide" },
    "nav.cta.home": { zh: "返回首页", en: "Home" },
    "brand": { zh: "英灵神殿生存指南", en: "Valheim Survival Guide" },
    "search.placeholder": { zh: "搜索攻略、物品、Boss…", en: "Search guides, items, bosses…" },
    "search.empty": { zh: "没有找到相关内容", en: "No results found" },
    "search.hint": { zh: "输入关键词搜索全站攻略", en: "Type to search the whole site" },
    "foot.nav": { zh: "攻略导航", en: "Guides" },
    "foot.combat": { zh: "战斗与农场", en: "Combat & Farm" },
    "foot.about": { zh: "关于", en: "About" },
    "foot.aboutus": { zh: "关于本站", en: "About" },
    "foot.feedback": { zh: "投稿反馈", en: "Feedback" },
    "foot.changelog": { zh: "更新日志", en: "Changelog" },
    "foot.branddesc": { zh: "《Valheim》中文玩家攻略站，原创整理，持续更新。", en: "A player-made Valheim guide site, original content, updated regularly." },
    "foot.copy": { zh: "© 2026 英灵神殿生存指南 · Valheim 中文攻略站 · 仅供学习交流", en: "© 2026 Valheim Survival Guide · Fan-made · For learning only" },
    "totype.all": { zh: "全部", en: "All" }
  };

  /* ---------- Search index ---------- */
  /* Each entry has zh + en fields; search matches both languages, display follows UI lang */
  var SEARCH_INDEX = [
    { page: "首页", pageEn: "Home", url: "index.html",
      title: "英灵神殿生存指南", titleEn: "Valheim Survival Guide",
      tags: "Valheim 英灵神殿 攻略 首页 首战Boss", tagsEn: "Valheim guide home first boss" },
    { page: "新手入门", pageEn: "Beginner", url: "getting-started.html",
      title: "落海前7天生存时间线", titleEn: "7-Day Survival Timeline",
      tags: "新手 入门 七天 采集 建家 猎鹿 Eikthyr 燧石 石斧 工作台 篝火", tagsEn: "beginner guide 7-day gather base deer Eikthyr flint stone-axe workbench campfire" },
    { page: "资源采集", pageEn: "Resources", url: "resources.html",
      title: "材料出处速查表", titleEn: "Material Source Quick Reference",
      tags: "资源 采集 木材 石头 燧石 铜矿 锡矿 铁矿 银矿 黑金属 焰芯 蜂蜜 龙蛋", tagsEn: "resources gather wood stone flint copper tin iron silver blackmetal surtling-core honey dragon-egg" },
    { page: "建造指南", pageEn: "Building", url: "building.html",
      title: "从茅草棚到维京长屋", titleEn: "From Thatched Hut to Viking Longhouse",
      tags: "建造 建材 计算器 承重 分区 工坊 木墙 石墙 圆木墙 篝火 壁炉", tagsEn: "building material calculator structural zoning workshop wood-wall stone-wall log-wall campfire hearth" },
    { page: "地牢战斗", pageEn: "Dungeons", url: "dungeons.html",
      title: "Boss战与敌人图鉴", titleEn: "Boss Fights & Enemy Codex",
      tags: "Boss Eikthyr The Elder Bonemass Moder Yagluth 地牢 埋葬室 巨魔洞穴 沉没地穴 敌人 掉落", tagsEn: "boss Eikthyr Elder Bonemass Moder Yagluth dungeon burial-chamber troll-cave sunken-crypt enemy drops" },
    { page: "农场种植", pageEn: "Farming", url: "farming.html",
      title: "作物种植与收益指南", titleEn: "Crop Planting & Profit Guide",
      tags: "农场 种植 胡萝卜 芜菁 洋葱 大麦 亚麻 计算器 驯服 风车 纺车", tagsEn: "farm plant carrot turnip onion barley flax calculator tame windmill spinning-wheel" },
    { page: "生物群落", pageEn: "Biomes", url: "explore.html",
      title: "六大生物群落探索指南", titleEn: "6 Biome Exploration Guide",
      tags: "生物群落 青草地 黑森林 沼泽 雪山 平原 海洋 探索 航海 解锁", tagsEn: "biome meadows black-forest swamp mountain plains ocean explore sailing unlock" },
    { page: "物品图鉴", pageEn: "Items", url: "items.html",
      title: "全物品图鉴", titleEn: "Item Codex",
      tags: "物品 图鉴 材料 食物 工具 武器 防具 蜜酒 木材 铜矿 铁矿 银矿 黑金属 龙肉派 香肠 蜂蜜", tagsEn: "item codex material food tool weapon armor mead wood copper iron silver blackmetal dragon-pie sausage honey" },
    /* extra searchable anchors */
    { page: "地牢战斗", pageEn: "Dungeons", url: "dungeons.html",
      title: "Eikthyr（赤鹿）", titleEn: "Eikthyr (Stag)",
      tags: "Boss1 Eikthyr 赤鹿 闪电 硬鹿角 青草地", tagsEn: "boss1 Eikthyr stag lightning hard-antler meadows" },
    { page: "地牢战斗", pageEn: "Dungeons", url: "dungeons.html",
      title: "The Elder（古树长老）", titleEn: "The Elder (Ancient Tree)",
      tags: "Boss2 The Elder 古树 根须 古树钥匙 黑森林", tagsEn: "boss2 Elder ancient-tree roots swamp-key black-forest" },
    { page: "地牢战斗", pageEn: "Dungeons", url: "dungeons.html",
      title: "Bonemass（骨团）", titleEn: "Bonemass (Bone Mass)",
      tags: "Boss3 Bonemass 骨团 毒雾 抗毒 沼泽 wishbone", tagsEn: "boss3 Bonemass bone poison resist swamp wishbone" },
    { page: "地牢战斗", pageEn: "Dungeons", url: "dungeons.html",
      title: "Moder（冰龙）", titleEn: "Moder (Ice Dragon)",
      tags: "Boss4 Moder 冰龙 龙蛋 龙水晶 雪山 抗寒", tagsEn: "boss4 Moder ice-dragon dragon-egg dragon-tear mountain frost-resist" },
    { page: "地牢战斗", pageEn: "Dungeons", url: "dungeons.html",
      title: "Yagluth（亚格鲁斯）", titleEn: "Yagluth (Ancient One)",
      tags: "Boss5 Yagluth 陨石 激光 平原 丑地精图腾", tagsEn: "boss5 Yagluth meteor laser plains fuling-totem" }
  ];

  var lang = localStorage.getItem("vh-lang") || "zh";
  var dark = localStorage.getItem("vh-dark") === "1";

  /* ---------- Apply language ---------- */
  function applyLang(l) {
    lang = l;
    localStorage.setItem("vh-lang", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";

    /* 1) UI framework elements via data-i18n dictionary */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (I18N[key] && I18N[key][l]) {
        if (el.hasAttribute("data-i18n-ph")) el.setAttribute("placeholder", I18N[key][l]);
        else el.textContent = I18N[key][l];
      }
    });

    /* 2) Page content elements via data-en attribute */
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (l === "en") {
        if (!el.hasAttribute("data-zh")) el.setAttribute("data-zh", el.innerHTML);
        el.innerHTML = el.getAttribute("data-en");
      } else {
        if (el.hasAttribute("data-zh")) el.innerHTML = el.getAttribute("data-zh");
      }
    });

    var langBtn = document.querySelector(".lang-btn");
    if (langBtn) langBtn.textContent = l === "zh" ? "English" : "中文";

    /* 3) Update aria-labels for accessibility */
    var ariaMap = {
      ".search-btn": { zh: "搜索", en: "Search" },
      ".dark-btn": { zh: "暗色模式", en: "Toggle dark mode" },
      ".lang-btn": { zh: "语言", en: "Switch language" },
      "#burger": { zh: "菜单", en: "Menu" },
      "#toTop": { zh: "返回顶部", en: "Back to top" },
      ".search-close": { zh: "关闭", en: "Close" }
    };
    Object.keys(ariaMap).forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) el.setAttribute("aria-label", ariaMap[sel][l]);
    });

    /* 4) Re-render search results if overlay is open */
    var ov = document.getElementById("searchOverlay");
    if (ov && ov.classList.contains("show")) {
      var inp = ov.querySelector("input");
      renderSearch(inp ? inp.value : "");
    }
  }

  /* ---------- Apply dark ---------- */
  function applyDark(d) {
    dark = d;
    localStorage.setItem("vh-dark", d ? "1" : "0");
    document.body.classList.toggle("dark", d);
    var db = document.querySelector(".dark-btn");
    if (db) db.innerHTML = d ? ICON_SUN : ICON_MOON;
  }

  /* ---------- Search ---------- */
  function openSearch() {
    var ov = document.getElementById("searchOverlay");
    if (!ov) return;
    ov.classList.add("show");
    var inp = ov.querySelector("input");
    if (inp) { inp.value = ""; inp.focus(); renderSearch(""); }
  }
  function closeSearch() {
    var ov = document.getElementById("searchOverlay");
    if (ov) ov.classList.remove("show");
  }
  function renderSearch(q) {
    var box = document.querySelector("#searchOverlay .search-results");
    if (!box) return;
    q = (q || "").trim().toLowerCase();
    if (!q) {
      box.innerHTML = '<div class="sr-empty" data-i18n="search.hint">' + t("search.hint") + "</div>";
      applyLang(lang);
      return;
    }
    var hits = [];
    SEARCH_INDEX.forEach(function (e) {
      /* search against BOTH zh and en fields so users can search in either language */
      var hay = (e.page + " " + e.title + " " + e.tags + " " +
                 (e.pageEn || "") + " " + (e.titleEn || "") + " " + (e.tagsEn || "")
      ).toLowerCase();
      if (hay.indexOf(q) !== -1) hits.push(e);
    });
    if (!hits.length) {
      box.innerHTML = '<div class="sr-empty">' + t("search.empty") + "</div>";
      return;
    }
    var isEn = lang === "en";
    box.innerHTML = hits.map(function (e) {
      var pg = isEn ? (e.pageEn || e.page) : e.page;
      var ti = isEn ? (e.titleEn || e.title) : e.title;
      var tg = isEn ? (e.tagsEn || e.tags) : e.tags;
      var snip = tg.split(" ").slice(0, 6).join(" · ");
      return '<a class="sr-item" href="' + e.url + '">' +
        '<div class="sr-page">' + pg + "</div>" +
        '<div class="sr-title">' + ti + "</div>" +
        '<div class="sr-snippet">' + snip + "</div></a>";
    }).join("");
  }
  function t(key) { return I18N[key] ? (I18N[key][lang] || I18N[key].zh) : key; }

  /* ---------- Init ---------- */
  function init() {
    applyDark(dark);
    applyLang(lang);

    /* set search button icon */
    var sb = document.querySelector(".search-btn");
    if (sb) sb.innerHTML = ICON_SEARCH;

    /* set search overlay icon */
    var sico = document.querySelector(".s-ico");
    if (sico) sico.innerHTML = ICON_SEARCH;

    /* burger */
    var burger = document.getElementById("burger");
    var navLinks = document.getElementById("navLinks");
    if (burger && navLinks) {
      burger.addEventListener("click", function () { navLinks.classList.toggle("open"); });
    }

    /* dark toggle */
    var db = document.querySelector(".dark-btn");
    if (db) db.addEventListener("click", function () { applyDark(!dark); });

    /* lang toggle */
    var lb = document.querySelector(".lang-btn");
    if (lb) lb.addEventListener("click", function () { applyLang(lang === "zh" ? "en" : "zh"); });

    /* back to top */
    var toTop = document.getElementById("toTop");
    if (toTop) {
      window.addEventListener("scroll", function () { toTop.classList.toggle("show", window.scrollY > 400); });
      toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }

    /* search */
    var ov = document.getElementById("searchOverlay");
    if (sb) sb.addEventListener("click", openSearch);
    if (ov) {
      var close = ov.querySelector(".search-close");
      if (close) close.addEventListener("click", closeSearch);
      ov.addEventListener("click", function (e) { if (e.target === ov) closeSearch(); });
      var inp = ov.querySelector("input");
      if (inp) {
        inp.setAttribute("data-i18n", "search.placeholder");
        inp.setAttribute("data-i18n-ph", "1");
        inp.addEventListener("input", function () { renderSearch(inp.value); });
      }
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeSearch();
        if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openSearch(); }
      });
    }
    applyLang(lang);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
