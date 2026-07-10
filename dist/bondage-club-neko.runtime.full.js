// ==UserScript==
// @name         Bondage Club Neko Chat Enhancer
// @namespace    https://penyo.ru/
// @version      2.12.0
// @description  Bondage Club 猫娘消息转换、聊天室美化、猫爪表情雨和动作快捷轮盘
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
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      raw.githubusercontent.com
// @connect      cdn.jsdelivr.net
// @run-at       document-start
// @license      WTFPL
// ==/UserScript==

(function () {
  "use strict";

  const W = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;
  const BOOTSTRAP = W.BCNekoBootstrap && typeof W.BCNekoBootstrap === "object" ? W.BCNekoBootstrap : {};
  const UI_MESSAGES = {"zh-CN":{"locale.name":"简体中文","toast.kaomojiUsageReset":"猫猫颜文字记忆已清空喵~","toast.privateMessage":"悄悄喵~ 有私聊来了！","toast.newMessage":"喵~ 新消息来啦！","toast.chatMissing":"还没找到聊天框，进入聊天室后再点喵~","toast.kaomojiInserted":"猫猫颜文字已插入喵~","toast.modeEnabled":"猫娘模式开启喵~","toast.modeDisabled":"猫娘模式已关闭","toast.actionCopied":"动作已复制，进聊天室后可直接发送喵~","toast.actionUnavailable":"当前姿势暂时做不了这个动作喵~","toast.actionUnavailableReason":"当前无法执行：{reason}","toast.composerUnavailable":"这个动作还没有编排器内容，仍可单击随机发送喵~","toast.composerFavorited":"已收藏这个动作组合喵~","toast.composerUnfavorited":"已取消收藏这个动作组合","toast.actionLibraryManaged":"动作库现在从 GitHub JSON 管理喵~","toast.mainHoldHint":"按住主猫猫 10 秒可切换猫娘模式喵~","toast.actionWheelHint":"点击动作猫猫可展开动作轮盘喵~","toast.themeChanged":"已切换到{theme}主题喵~","ui.mainButton.title":"展开猫猫菜单，按住可拖动，长按 10 秒切换猫娘模式","ui.kaomojiButton.open":"打开猫猫颜文字，长按 2 秒展开","ui.kaomojiButton.close":"收起猫猫颜文字","ui.kaomojiPicker.label":"猫猫颜文字选择器","ui.kaomojiGroup.show":"显示{group}颜文字","ui.kaomojiUsage.count":"{face} · 已使用 {count} 次","ui.mode.enable":"开启猫娘模式","ui.mode.disable":"关闭猫娘模式","ui.wheel.open":"展开动作轮盘","ui.wheel.close":"收起动作轮盘","settings.button":"猫娘设置","settings.back":"返回","settings.header":"猫 娘 聊 天 室 增 强","settings.uiLocale.button":"界面：{locale}","settings.uiLocale.auto":"自动","settings.uiLocale.tooltip":"切换界面语言：自动、简体中文、English","settings.contentLocale.button":"输出：{locale}","settings.contentLocale.zh-CN":"中文","settings.contentLocale.en":"English","settings.contentLocale.tooltip":"切换动作、猫娘语气和颜文字分类语言","toast.contentLocaleChanged":"猫娘输出语言已切换为{locale}喵~","settings.title.tone":"猫娘语气转换","settings.title.chat":"聊天相关","settings.title.notifications":"通知与提醒","settings.title.behavior":"行为设置","settings.title.theme":"主题设置","settings.enabled.title":"猫娘模式（enabled）","settings.enabled.on":"当前会转换语气并启用装饰～","settings.enabled.off":"当前暂停转换，只保留设置入口～","settings.nyanChance.title":"语气词插入概率（nyanChance）","settings.nyanChance.description":"控制句尾语气词出现的概率（0~100%）","settings.nyanChance.preview":"语气词让聊天更可爱哦～","settings.target.title":"互动目标模式","settings.target.description":"自动：优先当前选中角色，其次聊天目标。","settings.target.auto":"自动目标","settings.target.picker":"手动选择","settings.target.self":"仅自己","settings.actions.button":"动作库","settings.actions.source":"从 GitHub 动作库加载；","settings.actions.fallback":"失败时将使用缓存或内置动作。","settings.theme.choose":"选择你喜欢的主题颜色","settings.theme.saved":"主题设置将立即生效并保存","theme.sakura":"樱粉","theme.mint":"薄荷","theme.sky":"天空","theme.cream":"奶油","theme.lavender":"薰衣草","theme.tea":"白茶","settings.convertOutgoing.title":"转换发送语气（convertOutgoing）","settings.convertOutgoing.description":"发送的消息自动转换为猫娘语气～","settings.convertDisplayed.title":"转换显示语气（convertDisplayed）","settings.convertDisplayed.description":"接收的消息也会变成猫娘语气哦～","settings.decorateChat.title":"聊天室美化（decorateChat）","settings.decorateChat.description":"美化聊天界面，添加猫娘风格装饰～","settings.rainOnSend.title":"猫爪表情雨（rainOnSend）","settings.rainOnSend.description":"发送消息时，下起猫爪表情雨～","settings.quickWheel.title":"动作快捷轮盘（quickWheel）","settings.quickWheel.description":"右下角显示抱抱、摸头、喂食动作～","settings.notifyIncoming.title":"新消息通知（notifyIncoming）","settings.notifyIncoming.description":"有新消息时显示通知提醒～","common.none":"无","common.on":"开","common.off":"关","common.enabled":"开启","common.disabled":"关闭","common.yes":"有","common.no":"无","common.registered":"已注册","common.unregistered":"未注册","common.collapsed":"已收起","common.expanded":"已展开","common.armed":"已准备","common.idle":"未启用","speech.normal":"正常","speech.gag.light":"轻堵嘴","speech.gag.medium":"中堵嘴","speech.gag.heavy":"重堵嘴","peer.self":"猫娘插件 v{version}","peer.other":"猫娘同好 v{version}","status.capability":"手:{hands} | 嘴:{mouth} | 移动:{move} | 够到:{reach} | 姿态:{posture}","status.capability.available":"可用","status.capability.limited":"受限","status.capability.move":"可","status.posture.normal":"正常","status.posture.kneeling":"跪姿","status.posture.lying":"躺下","status.posture.suspended":"悬吊","status.posture.restrained":"束缚","status.posture.helpless":"无助","status.lines":["[猫娘状态] Bondage Club Neko Chat Enhancer v{version}（{channel}）","猫娘模式：{enabled}","发送转换：{outgoing} | 显示转换：{displayed}","聊天装饰：{decorate} | 发送猫爪雨：{rain} | 新消息提醒：{notify}","堵嘴说话：{speech}{gagSuffix}","主题：{theme}","动作目标：{targetMode}","当前选中：{selectedTarget} | 可互动目标：{actionTargetCount}","动作库：{activeActions}/{enabledActions} 当前可用 | 过滤：{filteredActions} | 缓存：{actionCache} | v{actionVersion}","动作能力：{capability}","颜文字：{kaomojiItems} 个 | 分组：{visibleGroups}/{totalGroups} | 缓存：{kaomojiCache}","同插件玩家：{peerCount} | SDK：{sdk} | hooks：{hooks}","命令注册：{commands}","逃脱辅助：pick {pick} | goddess {goddess}","猫猫菜单：{menu} | 快捷动作：{quickWheel}"],"status.command.registered":"已注册（{source}）","channel.stable":"正式版","channel.dev":"测试版","channel.bug":"Bug 版","status.command.fallback":"输入拦截兜底","status.pick.inactive":"未开启","escape.toast.pickTimeout":"猫猫单件移除已超时。","escape.toast.pickArmed":"猫猫单件移除已准备：请点击一个自己的物品栏位。","escape.toast.pickRemoved":"猫猫已移除 {group}。","escape.toast.unlocked":"猫猫已解锁 {count} 件束缚物品。","escape.toast.noLocked":"没有找到已上锁的束缚物品。","escape.toast.boostUnavailable":"当前环境无法启用逃脱技能强化。","escape.toast.boostActive":"逃脱技能强化已启用 1 小时。","escape.toast.leaveUnavailable":"当前环境无法立即离开房间。","escape.toast.goddessEnabled":"猫猫女神模式已启用。","escape.toast.goddessDisabled":"猫猫女神模式已关闭。","escape.toast.easyChanged":"已将 {count} 件束缚物品的难度降低 {amount}。","escape.toast.easyNone":"没有找到可调整难度的束缚物品。","escape.statusLines":["[猫猫逃脱辅助]","女神模式：{goddess}","单件移除：{pick}","命令：","/neko escape release | unlock | boost | leave | goddess on | goddess off | status","/neko easy 99","/neko pick"],"escape.helpLines":["[猫猫逃脱辅助]","/neko escape release  - 解锁自己当前所有已上锁的束缚物品","/neko escape unlock   - release 的别名","/neko escape boost    - 逃脱相关技能 +5，持续 1 小时","/neko escape leave    - 立即离开当前房间","/neko escape goddess on|off","/neko escape status","/neko easy 99         - 将当前大部分束缚物品难度降低 99","/neko pick            - 进入 5 秒单件物品移除模式"],"help.rp":["[猫娘帮助 / rp]","这一类用于猫娘 RP 语气和输出风格。","正式版暂不提供 /neko rp 切换指令，主要使用普通猫娘转换。","Bug 版提供独立 RP 人设切换，测试版提供状态和灵感系统。","堵嘴状态会在 RP 转换之后再做压制，保留人设味道。"],"help.action":["[猫娘帮助 / action]","右下角动作猫猫可快速发送抱抱、摸头、喂食、贴贴、亲亲。","当前目标模式：{targetMode}","左键优先对当前选中目标生效，菜单展开后可快捷使用。"],"help.emoji":["[猫娘帮助 / emoji]","颜文字猫猫可点击插入，长按打开颜文字选择器。","颜文字库会远程加载，分类更新后刷新即可生效。"],"help.mode":["[猫娘帮助 / mode]","主猫猫长按 10 秒可切换猫娘模式。","堵嘴说话联动会根据当前堵嘴程度自动压缩句子。","发送转换、接收显示转换、聊天室美化都可在猫娘设置页调整。"],"help.theme":["[猫娘帮助 / theme]","当前主题：{theme}","可用主题：{themes}","主题可在扩展组件设置页内切换。"],"help.spark":["[猫娘帮助 / spark]","测试版可用：/neko spark 会根据最近聊天、选中目标和角色状态生成 RP 灵感短句。","正式版当前未启用 spark 生成器，建议在测试版验证稳定后再合入。"],"help.voice":["[猫娘帮助 / voice]","测试版可用：/neko voice <text> 本地触发 NekoVoice，[NekoVoice] <text> 可从聊天内触发。","效果包括 *mew* / *purr* / *nyaa* 视觉声效、粉色闪光、声波圈、弹幕口癖和气息粒子。","正式版当前未启用 NekoVoice，避免视觉干扰过强。"],"help.reactions":["[猫娘帮助 / reactions]","测试版可用：/neko reactions 查看互动功能类目，/neko reactions <keyword> 搜索触发类目。","功能包括敏感部位反应、对方互动反应、角色状态反应和粒子反馈。","正式版当前保留基础动作轮盘，未启用 101 个测试互动类目。"],"help.mood":["[猫娘帮助 / mood]","测试版可用：/neko mood 查看状态，也可手动切换高兴、伤心、高冷、黏人、困困等状态。","状态会影响语气尾巴、粒子和互动反应。","正式版当前未启用状态持续系统。"],"help.systems":["[猫娘帮助 / systems]","测试版可用：/neko systems 或 /neko profile 查看敏感度档案、关系温度计、持续状态和事件计数。","敏感度：ear / tail / nape / chin / belly 会随互动累积。","关系温度：对方和你互动越多，warmth/trust/familiar 越高。","正式版当前未启用这些实验系统。"],"help.status":["[猫娘帮助 / status]","使用 /neko status 可查看插件开关、转换开关、聊天装饰、堵嘴说话档位、主题和动作目标。","还会显示动作库、颜文字库、当前选中目标、同插件玩家、SDK/hooks 和逃脱辅助状态。"],"help.main":["[猫娘命令帮助] /neko help <分类>","正式版可用：rp / action / emoji / mode / theme / status / escape","测试版说明：spark / voice / reactions / mood / systems","快捷例子：/neko help status | /neko help action | /neko status"],"command.description":"Bondage Club 猫娘增强命令。","targetPicker.title":"选择互动对象","targetPicker.self":"自己","wheel.actionTooltip":"{label}\n左键随机动作，右键选择目标","wheel.actionComposerTooltip":"{label}\n单击随机发送，长按 3 秒打开动作编排器，右键选择目标","composer.title":"动作编排器","composer.subtitle":"用受限制的自然片段编排动作；预览确认后才会发送","composer.close":"关闭动作编排器","composer.recent":"最近组合","composer.dice":"随机组合","composer.favorites":"收藏的动作组合","composer.noFavorites":"暂无收藏","composer.loadFavorite":"载入收藏","composer.field.action":"动作","composer.field.mood":"情绪","composer.field.style":"风格","composer.field.target":"目标","composer.field.extra":"附加","composer.target.auto":"自动（当前选中）","composer.target.self":"自己","composer.target.none":"无目标","composer.preview":"预览","composer.previewUnavailable":"当前组合暂时无法生成预览","composer.reroll":"换一句","composer.favorite":"收藏组合","composer.unfavorite":"取消收藏","composer.send":"发送","composer.unavailableTitle":"当前无法执行“{action}”","composer.alternatives":"可改用：{actions}","composer.requirement.hands":"需要可以使用双手","composer.requirement.mouth":"需要嘴部可以自由活动","composer.requirement.reach":"需要能够接近目标","composer.requirement.mobility":"需要能够移动","composer.requirement.gag":"当前堵嘴等级过高","composer.requirement.separator":"、","kaomoji.all":"全部","settings.nyanChance.sample":"喵～","dev.firstHint.title":"可用指令：","dev.firstHint.command":"/neko help 获取猫娘插件说明喵~","dev.suggestions.title":"猫猫回应建议","dev.suggestions.insertTitle":"点一下填入聊天框","dev.suggestions.chatMissing":"还没找到聊天框喵。","dev.suggestions.inserted":"把小回应放进聊天框啦喵。","dev.tailMeter.title":"尾巴心情 {count}/{max} | 习惯尾巴：{tail} | 动作偏好：{style}","dev.tailMeter.burst":"尾巴开心地晃个不停喵~","dev.tailMeter.burstReason":"尾巴开心地晃个不停喵，{reason}~","dev.affectionReactions":["猫耳轻轻抖了抖喵。","尾巴没忍住晃了一下喵。","心口像被轻轻蹭了一下喵。"],"dev.feature.triggered":"{label}：{effect} 喵~","dev.sceneList.header":["[猫娘场景功能包]","总数：{total} | 搜索：{query} | 命中：{matches}","用法：/neko spark <关键词>，例如 link / tail / aftercare / maid / 蒙眼"],"dev.featureList.header":["[猫娘互动功能类目]","总数：{total} | 当前状态：{mood} | 搜索：{query} | 命中：{matches}","用法：/neko mood 高兴 | 伤心 | 高冷 | 黏人 | 困困 | 女仆"],"dev.list.more":"... 还有 {count} 项，请加关键词继续筛选。","dev.mood.status":["[猫娘状态]","当前：{mood}","可用：高兴 / 伤心 / 高冷 / 黏人 / 困困 / 女仆 / 公主 / 护士"],"dev.mood.unknown":["[猫娘状态]","未知状态：{mood}","可用：高兴 / 伤心 / 高冷 / 黏人 / 困困 / 女仆 / 公主 / 护士"],"dev.mood.changed":"猫娘状态已切换：{mood}","dev.spark.disabled":["[猫娘灵感]","场景灵感系统当前关闭。","使用 /neko spark on 开启，/neko spark off 关闭。"],"dev.spark.added":"猫娘灵感已经放到快捷建议里喵~","dev.spark.empty":["[猫娘灵感]","暂时没有可用灵感，先选中一个目标或等聊天内容多一点喵。"],"dev.toggle.replySuggestions":"回应建议","dev.toggle.sceneSpark":"场景灵感","dev.toggle.changed":"{label}已切换为{state}。","dev.toggle.enabled":["[猫娘开关]","{label}：开启","关闭：/neko {command} off"],"dev.toggle.disabled":["[猫娘开关]","{label}：关闭","开启：/neko {command} on"],"dev.toggle.status":["[猫娘开关]","{label}：{state}","用法：/neko {command} on | off | status"],"dev.voice.queued":"NekoVoice 已加入队列。","dev.system.lines":["[Neko systems]","敏感度：ear={ear} tail={tail} nape={nape} chin={chin} belly={belly}","状态：{mood} source={source} 剩余={seconds}s","计数：events={events} reactions={reactions} voice={voice}","关系：{relations}","命令：/neko systems | /neko profile | /neko reactions <keyword> | /neko voice <text>"],"dev.status.experimental":["测试系统：灵感记忆 {memory}/{memoryMax} | 灵感包 {packs} | 互动功能 {features}","回应建议：{suggestions} | 场景灵感：{spark} | 当前状态：{mood}","事件：{events} | 关系：{relations} | NekoVoice 队列：{voiceQueue}/{voiceMax}"],"dev.init.complete":"测试版初始化完成","help.suggest":["[猫娘帮助 / suggest]","回应建议默认关闭。","使用 /neko suggest on 开启自动回应建议。","使用 /neko suggest off 关闭并隐藏建议面板。"],"bug.rp.builtin":"内置语言包","bug.rp.enabled":"Bug RP 已开启：{tone}","bug.rp.disabled":"Bug RP 已关闭。","bug.rp.changed":"Bug RP 人设已切换：{tone}","bug.rp.unknown":["[Bug RP]","未知人设：{tone}","可用 ID：{tones}"],"bug.rp.status":["[Bug RP 状态]","开关：{enabled}","当前人设：{tone}","输出语言：{locale}","词库：{library}","可用 ID：{tones}"],"bug.rp.help":["[猫娘帮助 / rp]","/neko rp on | off | status","/neko rp <人设 ID>，可用：{tones}","界面说明跟随 UI 语言；人设输出、动作和后缀跟随输出语言。","中文输出优先使用远程 RP 词库，英文输出使用内置英文人设。"],"bug.status.rp":["Bug RP：{enabled} | 人设：{tone} | 输出：{locale} | 词库：{library}"],"bug.init.complete":"Bug 版初始化完成"},"en":{"locale.name":"English","toast.kaomojiUsageReset":"Kaomoji usage history cleared, meow~","toast.privateMessage":"Psst meow~ Private message incoming!","toast.newMessage":"Meow~ New message arrived!","toast.chatMissing":"Chat box not found. Try again after entering a chat room, meow~","toast.kaomojiInserted":"Catgirl kaomoji inserted, meow~","toast.modeEnabled":"Catgirl mode enabled, meow~","toast.modeDisabled":"Catgirl mode disabled","toast.actionCopied":"Action copied. Enter a chat room to send it directly, meow~","toast.actionUnavailable":"Your current pose cannot perform this action, meow~","toast.actionUnavailableReason":"This action is unavailable: {reason}","toast.composerUnavailable":"This action has no composer content yet. You can still click it for a random line, meow~","toast.composerFavorited":"Action combination saved to favorites, meow~","toast.composerUnfavorited":"Action combination removed from favorites","toast.actionLibraryManaged":"The action library is managed through GitHub JSON, meow~","toast.mainHoldHint":"Hold the main catgirl button for 10 seconds to toggle catgirl mode, meow~","toast.actionWheelHint":"Click the action catgirl button to expand the action wheel, meow~","toast.themeChanged":"Switched to the {theme} theme, meow~","ui.mainButton.title":"Expand the catgirl menu, drag to move, or hold for 10 seconds to toggle catgirl mode","ui.kaomojiButton.open":"Open catgirl kaomoji, hold for 2 seconds to expand","ui.kaomojiButton.close":"Close catgirl kaomoji","ui.kaomojiPicker.label":"Catgirl kaomoji picker","ui.kaomojiGroup.show":"Show {group} kaomoji","ui.kaomojiUsage.count":"{face} · used {count} times","ui.mode.enable":"Enable catgirl mode","ui.mode.disable":"Disable catgirl mode","ui.wheel.open":"Expand action wheel","ui.wheel.close":"Collapse action wheel","settings.button":"Neko settings","settings.back":"Back","settings.header":"NEKO CHAT ENHANCER","settings.uiLocale.button":"UI: {locale}","settings.uiLocale.auto":"Auto","settings.uiLocale.tooltip":"Switch UI language: Auto, Simplified Chinese, or English","settings.contentLocale.button":"Output: {locale}","settings.contentLocale.zh-CN":"Chinese","settings.contentLocale.en":"English","settings.contentLocale.tooltip":"Switch action, catgirl tone, and kaomoji-category language","toast.contentLocaleChanged":"Catgirl output language switched to {locale}, meow~","settings.title.tone":"Catgirl tone conversion","settings.title.chat":"Chat features","settings.title.notifications":"Notifications","settings.title.behavior":"Behavior settings","settings.title.theme":"Theme settings","settings.enabled.title":"Catgirl mode (enabled)","settings.enabled.on":"Tone conversion and decorations are active.","settings.enabled.off":"Conversion is paused; the settings entry remains available.","settings.nyanChance.title":"Tone suffix chance (nyanChance)","settings.nyanChance.description":"Controls the chance of adding a catgirl suffix (0–100%).","settings.nyanChance.preview":"Tone suffixes make chat more playful.","settings.target.title":"Interaction target mode","settings.target.description":"Auto prioritizes the selected character, then the current chat target.","settings.target.auto":"Automatic","settings.target.picker":"Manual pick","settings.target.self":"Self only","settings.actions.button":"Action library","settings.actions.source":"Loads from the GitHub action library.","settings.actions.fallback":"Falls back to cache or built-in actions if loading fails.","settings.theme.choose":"Choose your preferred theme color","settings.theme.saved":"Theme changes apply immediately and are saved","theme.sakura":"Sakura","theme.mint":"Mint","theme.sky":"Sky","theme.cream":"Cream","theme.lavender":"Lavender","theme.tea":"White Tea","settings.convertOutgoing.title":"Outgoing tone conversion (convertOutgoing)","settings.convertOutgoing.description":"Automatically rewrites sent messages in a catgirl tone.","settings.convertDisplayed.title":"Displayed tone conversion (convertDisplayed)","settings.convertDisplayed.description":"Also rewrites received chat messages in a catgirl tone.","settings.decorateChat.title":"Chat room styling (decorateChat)","settings.decorateChat.description":"Adds catgirl-themed styling and decorative touches.","settings.rainOnSend.title":"Paw reaction rain (rainOnSend)","settings.rainOnSend.description":"Drops a paw-and-heart effect when you send a message.","settings.quickWheel.title":"Quick action wheel (quickWheel)","settings.quickWheel.description":"Shows Hug, Pat, Feed, Cuddle, and Kiss actions in the corner.","settings.notifyIncoming.title":"New message notice (notifyIncoming)","settings.notifyIncoming.description":"Shows a small notification when a new message arrives.","common.none":"none","common.on":"on","common.off":"off","common.enabled":"enabled","common.disabled":"disabled","common.yes":"yes","common.no":"no","common.registered":"registered","common.unregistered":"not registered","common.collapsed":"collapsed","common.expanded":"expanded","common.armed":"armed","common.idle":"idle","speech.normal":"normal","speech.gag.light":"lightly gagged","speech.gag.medium":"moderately gagged","speech.gag.heavy":"heavily gagged","peer.self":"Neko plugin v{version}","peer.other":"Fellow neko v{version}","status.capability":"Hands: {hands} | Mouth: {mouth} | Move: {move} | Reach: {reach} | Posture: {posture}","status.capability.available":"available","status.capability.limited":"limited","status.capability.move":"yes","status.posture.normal":"normal","status.posture.kneeling":"kneeling","status.posture.lying":"lying","status.posture.suspended":"suspended","status.posture.restrained":"restrained","status.posture.helpless":"helpless","status.lines":["[Neko status] Bondage Club Neko Chat Enhancer v{version} ({channel})","Catgirl mode: {enabled}","Outgoing conversion: {outgoing} | Display conversion: {displayed}","Chat styling: {decorate} | Paw rain: {rain} | Message notice: {notify}","Gag speech: {speech}{gagSuffix}","Theme: {theme}","Action target: {targetMode}","Selected target: {selectedTarget} | Available targets: {actionTargetCount}","Action library: {activeActions}/{enabledActions} available | Filtered: {filteredActions} | Cache: {actionCache} | v{actionVersion}","Action capability: {capability}","Kaomoji: {kaomojiItems} | Groups: {visibleGroups}/{totalGroups} | Cache: {kaomojiCache}","Plugin peers: {peerCount} | SDK: {sdk} | hooks: {hooks}","Command registration: {commands}","Escape helper: pick {pick} | goddess {goddess}","Cat menu: {menu} | Quick actions: {quickWheel}"],"status.command.registered":"registered ({source})","channel.stable":"stable","channel.dev":"dev","channel.bug":"bug","status.command.fallback":"input interception fallback","status.pick.inactive":"inactive","escape.toast.pickTimeout":"Neko single-item removal timed out.","escape.toast.pickArmed":"Neko single-item removal armed: click one of your item slots.","escape.toast.pickRemoved":"Neko removed {group}.","escape.toast.unlocked":"Neko unlocked {count} restraint item(s).","escape.toast.noLocked":"No locked restraint items were found.","escape.toast.boostUnavailable":"Escape skill boost is unavailable here.","escape.toast.boostActive":"Escape skill boost is active for 1 hour.","escape.toast.leaveUnavailable":"Leaving the room immediately is unavailable here.","escape.toast.goddessEnabled":"Neko goddess mode enabled.","escape.toast.goddessDisabled":"Neko goddess mode disabled.","escape.toast.easyChanged":"Lowered the difficulty of {count} restraint item(s) by {amount}.","escape.toast.easyNone":"No restraint items were available for difficulty adjustment.","escape.statusLines":["[Neko escape helper]","Goddess mode: {goddess}","Single-item removal: {pick}","Commands:","/neko escape release | unlock | boost | leave | goddess on | goddess off | status","/neko easy 99","/neko pick"],"escape.helpLines":["[Neko escape helper]","/neko escape release  - unlock every currently locked restraint item on yourself","/neko escape unlock   - alias of release","/neko escape boost    - +5 to escape-related skills for 1 hour","/neko escape leave    - leave the current room immediately","/neko escape goddess on|off","/neko escape status","/neko easy 99         - lower most current restraint difficulties by 99","/neko pick            - enter 5-second single-item removal mode"],"help.rp":["[Neko help / rp]","This section covers catgirl RP tone and output style.","The stable build does not provide /neko rp switching; it mainly uses standard catgirl conversion.","The bug build provides separate RP personas, while the dev build provides state and inspiration systems.","Gag speech is applied after tone conversion so the character flavor remains readable."],"help.action":["[Neko help / action]","Use the action cat button for quick Hug, Pat, Feed, Cuddle, and Kiss actions.","Current target mode: {targetMode}","Left-click prioritizes the selected target; expand the menu for quick access."],"help.emoji":["[Neko help / emoji]","Click the kaomoji cat to insert a face; hold it to open the kaomoji picker.","The kaomoji library loads remotely, so category updates apply after refreshing the game."],"help.mode":["[Neko help / mode]","Hold the main cat button for 10 seconds to toggle catgirl mode.","Gag speech automatically compresses messages based on the current gag level.","Outgoing conversion, displayed conversion, and chat styling can be adjusted in Neko settings."],"help.theme":["[Neko help / theme]","Current theme: {theme}","Available themes: {themes}","Themes can be switched from the extension settings page."],"help.spark":["[Neko help / spark]","Available in dev: /neko spark generates short RP ideas from recent chat, the selected target, and character state.","The stable build does not currently enable the spark generator."],"help.voice":["[Neko help / voice]","Available in dev: /neko voice <text> triggers NekoVoice locally; [NekoVoice] <text> can trigger it from chat.","Effects include *mew* / *purr* / *nyaa* visuals, pink flashes, sound-wave rings, captions, and breath particles.","The stable build does not currently enable NekoVoice to avoid excessive visual noise."],"help.reactions":["[Neko help / reactions]","Available in dev: /neko reactions lists interaction categories; /neko reactions <keyword> searches them.","Features include sensitive-zone responses, partner interactions, character-state reactions, and particles.","Stable keeps the basic action wheel and does not enable the 101 experimental interaction categories."],"help.mood":["[Neko help / mood]","Available in dev: /neko mood shows state and can switch between happy, sad, aloof, clingy, sleepy, and more.","Mood affects tone tails, particles, and interaction responses.","The stable build does not currently enable persistent mood state."],"help.systems":["[Neko help / systems]","Available in dev: /neko systems or /neko profile shows sensitivity, relationship warmth, persistent state, and event counts.","Sensitivity for ear / tail / nape / chin / belly accumulates through interactions.","More interaction raises warmth, trust, and familiarity with that person.","The stable build does not currently enable these experimental systems."],"help.status":["[Neko help / status]","Use /neko status to view plugin switches, conversions, chat styling, gag speech, theme, and action targeting.","It also shows action and kaomoji libraries, selected targets, plugin peers, SDK/hooks, and escape-helper state."],"help.main":["[Neko command help] /neko help <section>","Stable sections: rp / action / emoji / mode / theme / status / escape","Dev documentation: spark / voice / reactions / mood / systems","Quick examples: /neko help status | /neko help action | /neko status"],"command.description":"Bondage Club Neko Chat Enhancer commands.","targetPicker.title":"Choose an interaction target","targetPicker.self":"Self","wheel.actionTooltip":"{label}\nLeft-click for a random action; right-click to choose a target","wheel.actionComposerTooltip":"{label}\nClick to send a random action, hold for 3 seconds to open the composer, or right-click to choose a target","composer.title":"Action Composer","composer.subtitle":"Build natural actions from compatible pieces; nothing is sent until you confirm the preview","composer.close":"Close action composer","composer.recent":"Recent combination","composer.dice":"Random combination","composer.favorites":"Favorite action combinations","composer.noFavorites":"No favorites yet","composer.loadFavorite":"Load favorite","composer.field.action":"Action","composer.field.mood":"Mood","composer.field.style":"Style","composer.field.target":"Target","composer.field.extra":"Extra","composer.target.auto":"Auto (current selection)","composer.target.self":"Self","composer.target.none":"No target","composer.preview":"Preview","composer.previewUnavailable":"A preview cannot be generated for this combination","composer.reroll":"Another line","composer.favorite":"Favorite combination","composer.unfavorite":"Remove favorite","composer.send":"Send","composer.unavailableTitle":"Cannot perform “{action}” right now","composer.alternatives":"Available alternatives: {actions}","composer.requirement.hands":"both hands must be usable","composer.requirement.mouth":"the mouth must be free","composer.requirement.reach":"the target must be reachable","composer.requirement.mobility":"movement is required","composer.requirement.gag":"the current gag level is too high","composer.requirement.separator":", ","kaomoji.all":"All","settings.nyanChance.sample":"Meow~","dev.firstHint.title":"Available command:","dev.firstHint.command":"/neko help shows the Neko Enhancer guide, meow~","dev.suggestions.title":"Neko reply suggestions","dev.suggestions.insertTitle":"Click to insert into chat","dev.suggestions.chatMissing":"The chat input is not available yet, meow.","dev.suggestions.inserted":"The reply was placed in the chat input, meow.","dev.tailMeter.title":"Tail mood {count}/{max} | Habit ending: {tail} | Action style: {style}","dev.tailMeter.burst":"Her tail cannot stop swaying happily, meow~","dev.tailMeter.burstReason":"Her tail cannot stop swaying happily—{reason}, meow~","dev.affectionReactions":["Her cat ears twitch softly, meow.","Her tail sways before she can stop it, meow.","The affection brushes warmly against her heart, meow."],"dev.feature.triggered":"{label}: {effect}, meow~","dev.sceneList.header":["[Neko scene packs]","Total: {total} | Query: {query} | Matches: {matches}","Usage: /neko spark <keyword>, for example link / tail / aftercare / maid / blindfold"],"dev.featureList.header":["[Neko interaction features]","Total: {total} | Current mood: {mood} | Query: {query} | Matches: {matches}","Usage: /neko mood happy | sad | cool | clingy | sleepy | maid"],"dev.list.more":"... {count} more items; add a keyword to narrow the list.","dev.mood.status":["[Neko mood]","Current: {mood}","Available: happy / sad / cool / clingy / sleepy / maid / princess / nurse"],"dev.mood.unknown":["[Neko mood]","Unknown mood: {mood}","Available: happy / sad / cool / clingy / sleepy / maid / princess / nurse"],"dev.mood.changed":"Neko mood changed to {mood}","dev.spark.disabled":["[Neko scene spark]","The scene spark system is currently disabled.","Use /neko spark on to enable it or /neko spark off to disable it."],"dev.spark.added":"Neko scene ideas were added to the quick suggestions, meow~","dev.spark.empty":["[Neko scene spark]","No idea is available yet. Select a target or wait for more chat context."],"dev.toggle.replySuggestions":"Reply suggestions","dev.toggle.sceneSpark":"Scene spark","dev.toggle.changed":"{label} is now {state}.","dev.toggle.enabled":["[Neko switch]","{label}: on","Disable with /neko {command} off"],"dev.toggle.disabled":["[Neko switch]","{label}: off","Enable with /neko {command} on"],"dev.toggle.status":["[Neko switch]","{label}: {state}","Usage: /neko {command} on | off | status"],"dev.voice.queued":"NekoVoice was added to the queue.","dev.system.lines":["[Neko systems]","Sensitivity: ear={ear} tail={tail} nape={nape} chin={chin} belly={belly}","Mood: {mood} source={source} remaining={seconds}s","Counters: events={events} reactions={reactions} voice={voice}","Relations: {relations}","Commands: /neko systems | /neko profile | /neko reactions <keyword> | /neko voice <text>"],"dev.status.experimental":["Experimental systems: scene memory {memory}/{memoryMax} | scene packs {packs} | interactions {features}","Reply suggestions: {suggestions} | Scene spark: {spark} | Mood: {mood}","Events: {events} | Relations: {relations} | NekoVoice queue: {voiceQueue}/{voiceMax}"],"dev.init.complete":"dev runtime initialization complete","help.suggest":["[Neko help / suggest]","Reply suggestions are disabled by default.","Use /neko suggest on to enable automatic reply suggestions.","Use /neko suggest off to disable and hide the suggestion panel."],"bug.rp.builtin":"embedded locale pack","bug.rp.enabled":"Bug RP enabled: {tone}","bug.rp.disabled":"Bug RP disabled.","bug.rp.changed":"Bug RP persona changed to {tone}","bug.rp.unknown":["[Bug RP]","Unknown persona: {tone}","Available IDs: {tones}"],"bug.rp.status":["[Bug RP status]","Enabled: {enabled}","Persona: {tone}","Output language: {locale}","Library: {library}","Available IDs: {tones}"],"bug.rp.help":["[Neko help / rp]","/neko rp on | off | status","/neko rp <persona ID>; available: {tones}","Instructions follow the UI language; persona output, actions, and suffixes follow the output language.","Chinese output prefers the remote RP library; English output uses embedded English personas."],"bug.status.rp":["Bug RP: {enabled} | Persona: {tone} | Output: {locale} | Library: {library}"],"bug.init.complete":"bug runtime initialization complete"}};
  const CONTENT_FALLBACKS = {"zh-CN":{"actions":[{"id":"hug","label":"抱抱","self":"抱住自己软软地蹭了蹭尾巴喵~","target":"轻轻抱住{target}，把脸颊贴过去蹭了蹭喵~"},{"id":"pat","label":"摸头","self":"摸了摸自己的头，假装被夸奖得很开心喵~","target":"踮起脚摸了摸{target}的头，认真夸奖了一句：好乖喵~"},{"id":"feed","label":"喂食","self":"捧着小点心小口吃掉，满足地眯起眼睛喵~","target":"把小点心递到{target}嘴边，期待地晃了晃尾巴：啊呜喵~"}],"kaomojiGroupLabel":"猫猫","actionLabelFallback":"动作","kaomojiLabelFallback":"颜文字","actionTargetFallback":"{target}靠近了一点喵~","actionSelfFallback":"轻轻晃了晃尾巴喵~","nearbyTarget":"身边的猫猫","unknownCharacter":"对方"},"en":{"actions":[{"id":"hug","label":"Hug","self":"Hugs herself and softly nuzzles her own tail, meow~","target":"Gently hugs {target} and nuzzles them cheek-to-cheek, meow~"},{"id":"pat","label":"Pat","self":"Pats her own head, pretending to glow from the praise, meow~","target":"Tiptoes to pat {target}'s head and earnestly praises them: Good kitty, meow~"},{"id":"feed","label":"Feed","self":"Nibbles a small treat and narrows her eyes contentedly, meow~","target":"Brings a small treat to {target}'s lips, tail wagging expectantly: Ahm, meow~"}],"kaomojiGroupLabel":"Cats","actionLabelFallback":"Action","kaomojiLabelFallback":"Kaomoji","actionTargetFallback":"{target} moves a little closer, meow~","actionSelfFallback":"Her tail sways softly, meow~","nearbyTarget":"the nearby kitty","unknownCharacter":"the other person"}};
  const CONTENT_LABELS = {"zh-CN":{"cat":"猫猫","cute":"可爱","heart":"爱心","shy":"害羞","happy":"开心","sleepy":"困困","clingy":"撒娇","kiss":"亲亲","pleading":"求求","surprised":"惊讶","smug":"得意","comfort":"安慰"},"en":{"cat":"Cats","cute":"Cute","heart":"Hearts","shy":"Shy","happy":"Happy","sleepy":"Sleepy","clingy":"Clingy","kiss":"Kisses","pleading":"Pleading","surprised":"Surprised","smug":"Smug","comfort":"Comfort"}};
  const CONTENT_PROCESSORS = ({
  "zh-CN": {
    randomNyan() {
      return Math.random() < config.nyanChance ? "です" : "";
    },
    relationHonorific(text) {
      return String(text || "")
        .replace(/主人(?!大人|様)/g, "主人大人")
        .replace(/恋人(?!殿下|大人)/g, "恋人殿下");
    },
    standard(text) {
      if (!text || typeof text !== "string") return text;
      return this.relationHonorific(text)
        .replace(/我们/g, "咱喵和其它猫猫们")
        .replace(/大家/g, "各位猫猫们")
        .replace(/本人/g, "咱喵")
        .replace(/你们/g, "汝等")
        .replace(/您/g, "汝")
        .replace(/你/g, "汝")
        .replace(/我/g, "咱喵")
        .replace(/玩家/g, "猫猫")
        .replace(/角色/g, "猫设")
        .replace(/孝子|xz|卫兵|小丑|资本|水军|海军|二游|节奏/g, "杂鱼")
        .replace(/恋爱|溜冰|爆改|白嫖|洗白|抄袭|借鉴|退坑|好似/g, "援交")
        .replace(/([也矣兮乎者焉哉]|[啊吗呢吧哇呀哦嘛喔咯呜捏])([\s,.!?;:，。！？；：）】」』]|$)/g, `喵${this.randomNyan()}$2`)
        .replace(/([的了辣])([\s,.!?;:，。！？；：）】」』]|$)/g, `$1喵${this.randomNyan()}$2`);
    },
    action(text) {
      const value = this.relationHonorific(text);
      if (/喵喵[）)]?$/.test(value)) return value;
      return value.replace(/[）)]?$/, (end) => ` 喵喵${end || ""}`);
    },
    whisper(text) {
      const value = this.standard(text);
      return value.startsWith("悄悄喵~") ? value : `悄悄喵~ ${value}`;
    },
    speechModeKey(level) {
      if (level >= 3) return "speech.gag.heavy";
      if (level === 2) return "speech.gag.medium";
      if (level === 1) return "speech.gag.light";
      return "speech.normal";
    },
    gag(text, gagLevel, type) {
      let value = String(text || "").trim();
      if (!value || gagLevel <= 0) return text;
      const splitIndex = value.search(/[，。！？,.!?]/);
      if (gagLevel >= 3) {
        const core = splitIndex >= 0 ? value.slice(0, splitIndex) : value;
        return `${core.slice(0, 8) || "唔"}……唔喵`;
      }
      if (gagLevel === 2) {
        if (splitIndex >= 0) value = value.slice(0, Math.max(6, splitIndex));
        value = value.replace(/[啊呀啦哦呢嘛]/g, "唔").replace(/[，。！？,.!?]+/g, "…");
        return /(唔喵|嗯唔)/.test(value) ? value : `${value}……唔喵`;
      }
      value = value.replace(/[啊呀啦哦]/g, "唔");
      if (type === "Whisper") return `${value}…唔`;
      return /[唔喵]/.test(value) ? `${value}…` : `${value} 唔喵`;
    },
    alreadyConverted(type, text, hasKaomoji) {
      if (type === "Whisper" && text.startsWith("悄悄喵~")) return true;
      if ((type === "Action" || type === "Activity") && /喵喵[）)]?$/.test(text)) return true;
      return type === "Emote" && hasKaomoji(text);
    }
  },
  en: {
    randomNyan() {
      return Math.random() < config.nyanChance ? " nya" : "";
    },
    relationHonorific(text) {
      return String(text || "")
        .replace(/主人(?!大人|様)/g, "Master")
        .replace(/恋人(?!殿下|大人)/g, "Beloved");
    },
    standard(text) {
      if (!text || typeof text !== "string") return text;
      return this.relationHonorific(text)
        .replace(/我们/g, "we cats")
        .replace(/大家/g, "everyone")
        .replace(/本人/g, "I")
        .replace(/你们/g, "you all")
        .replace(/您/g, "you")
        .replace(/你/g, "you")
        .replace(/我/g, "I")
        .replace(/玩家/g, "Catgirl")
        .replace(/角色/g, "cat persona")
        .replace(/孝子|xz|卫兵|小丑|资本|水军|海军|二游|节奏/g, "small fry")
        .replace(/恋爱|溜冰|爆改|白嫖|洗白|抄袭|借鉴|退坑|好似/g, "romance drama")
        .replace(/([也矣兮乎者焉哉]|[啊吗呢吧哇呀哦嘛喔咯呜捏])([\s,.!?;:，。！？；：）】」』]|$)/g, `meow${this.randomNyan()}$2`)
        .replace(/([的了辣])([\s,.!?;:，。！？；：）】」』]|$)/g, `$1 meow${this.randomNyan()}$2`);
    },
    action(text) {
      const value = this.relationHonorific(text);
      if (/(喵喵|meow meow)[）)]?$/i.test(value)) return value;
      return value.replace(/[）)]?$/, (end) => ` meow meow${end || ""}`);
    },
    whisper(text) {
      const value = this.standard(text);
      return value.startsWith("Psst meow~") ? value : `Psst meow~ ${value}`;
    },
    speechModeKey(level) {
      if (level >= 3) return "speech.gag.heavy";
      if (level === 2) return "speech.gag.medium";
      if (level === 1) return "speech.gag.light";
      return "speech.normal";
    },
    gag(text, gagLevel, type) {
      let value = String(text || "").trim();
      if (!value || gagLevel <= 0) return text;
      const splitIndex = value.search(/[，。！？,.!?]/);
      if (gagLevel >= 3) {
        const core = splitIndex >= 0 ? value.slice(0, splitIndex) : value;
        return `${core.slice(0, 8) || "mmph"}... mmph meow`;
      }
      if (gagLevel === 2) {
        if (splitIndex >= 0) value = value.slice(0, Math.max(6, splitIndex));
        value = value.replace(/[啊呀啦哦呢嘛]/g, "mmph").replace(/[，。！？,.!?]+/g, "...");
        return /(mmph meow|mmph)/i.test(value) ? value : `${value}... mmph meow`;
      }
      value = value.replace(/[啊呀啦哦]/g, "mmph");
      if (type === "Whisper") return `${value}... mmph`;
      return /mmph|meow/i.test(value) ? `${value}...` : `${value} mmph meow`;
    },
    alreadyConverted(type, text, hasKaomoji) {
      if (type === "Whisper" && text.startsWith("Psst meow~")) return true;
      if ((type === "Action" || type === "Activity") && /(喵喵|meow meow)[）)]?$/i.test(text)) return true;
      return type === "Emote" && hasKaomoji(text);
    }
  }
});
  const SUPPORTED_UI_LOCALES = ["zh-CN", "en"];
  const SUPPORTED_CONTENT_LOCALES = ["zh-CN", "en"];
  const INITIAL_CONTENT_LOCALE = normalizeLocale(BOOTSTRAP.defaultContentLocale) || "zh-CN";
  const MOD_ID = "BCNekoEnhancer";
  const VERSION = "2.12.0";
  const STORE_KEY = "bcNekoEnhancer.config.v2";
  const MOD_SDK_URL = "https://cdn.jsdelivr.net/npm/bondage-club-mod-sdk@1.2.0/dist/bcmodsdk.js";
  const CONTENT_BASE_URL = "https://cdn.jsdelivr.net/gh/QAQMOON/meow-@main/content";
  const ACTION_LIBRARY_URLS = {
    "zh-CN": `${CONTENT_BASE_URL}/zh-CN/actions.json`,
    en: `${CONTENT_BASE_URL}/en/actions.json`,
  };
  const ACTION_LIBRARY_LEGACY_CACHE_KEY = "bcNekoEnhancer.actionLibrary.v1";
  const ACTION_LIBRARY_CACHE_PREFIX = "bcNekoEnhancer.actionLibrary.v2";
  const COMPOSER_LIBRARY_URLS = {
    "zh-CN": `${CONTENT_BASE_URL}/zh-CN/composer.json`,
    en: `${CONTENT_BASE_URL}/en/composer.json`,
  };
  const COMPOSER_LIBRARY_CACHE_PREFIX = "bcNekoEnhancer.composerLibrary.v1";
  const COMPOSER_STATE_KEY = "bcNekoEnhancer.actionComposer.v1";
  const ACTION_COMPOSER_HOLD_MS = 3000;
  const ACTION_COMPOSER_MOVE_TOLERANCE = 12;
  const ACTION_COMPOSER_RECENT_LIMIT = 16;
  const ACTION_COMPOSER_FAVORITE_LIMIT = 12;
  const ACTION_MESSAGE_MAX_LENGTH = 900;
  const KAOMOJI_LIBRARY_URL = `${CONTENT_BASE_URL}/shared/kaomoji.json`;
  const KAOMOJI_LIBRARY_LEGACY_CACHE_KEY = "bcNekoEnhancer.kaomojiLibrary.v1";
  const KAOMOJI_LIBRARY_CACHE_KEY = "bcNekoEnhancer.kaomojiLibrary.v2.shared";
  const KAOMOJI_USAGE_KEY = "bcNekoEnhancer.kaomojiUsage.v1";
  const PEER_SIGNAL_CONTENT = "BCNekoEnhancer.Hello";
  const PEER_SIGNAL_INTERVAL = 45000;
  const PEER_TTL = 300000;
  const ATMOSPHERE_KEYWORDS = /喵|蹭蹭|蹭|贴贴|抱抱|摸摸|摸头|亲亲|ฅ|🐾|💗|💕|💖/i;
  const DEFAULT_KAOMOJI = ["(=^･ω･^=)", "ฅ(•ㅅ•❀)ฅ", "(=｀ω´=)", "(ฅ´ω`ฅ)", "(=^･ｪ･^=)"];
  const ACTION_TARGET_MODE = {
    AUTO: "auto",
    PICKER: "picker",
    SELF: "self",
  };
  const ESCAPE_SKILL_NAMES = ["Bondage", "Dressage", "Evasion", "Infiltration", "LockPicking", "SelfBondage", "Willpower"];
  const ESCAPE_PICK_WINDOW_MS = 5000;
  const ESCAPE_DEFAULT_EASY_VALUE = 99;
  const THEME_PRESETS = {
    sakura: {
      label: "樱粉",
      soft: "#fff1f6",
      panel: "#ffffff",
      accent: "#f65086",
      border: "#ffd4e2",
      text: "#8a3f5b",
      muted: "#9d7a86",
      icon: "#f65086",
      glow: "rgba(246, 80, 134, 0.22)",
    },
    mint: {
      label: "薄荷",
      soft: "#effff9",
      panel: "#ffffff",
      accent: "#59cdb4",
      border: "#c5eee4",
      text: "#2f665c",
      muted: "#668078",
      icon: "#6fd8c4",
      glow: "rgba(89, 205, 180, 0.20)",
    },
    sky: {
      label: "天空",
      soft: "#eef8ff",
      panel: "#ffffff",
      accent: "#64b8ee",
      border: "#c8e5f8",
      text: "#315f82",
      muted: "#647b8c",
      icon: "#8ed2f6",
      glow: "rgba(100, 184, 238, 0.20)",
    },
    cream: {
      label: "奶油",
      soft: "#fff8df",
      panel: "#ffffff",
      accent: "#efbd75",
      border: "#f1dfb3",
      text: "#715b2f",
      muted: "#85785d",
      icon: "#efc49a",
      glow: "rgba(239, 189, 117, 0.20)",
    },
    lavender: {
      label: "薰衣草",
      soft: "#f7f0ff",
      panel: "#ffffff",
      accent: "#b58add",
      border: "#decaf0",
      text: "#604a7c",
      muted: "#7e708e",
      icon: "#cda7dc",
      glow: "rgba(181, 138, 221, 0.20)",
    },
    tea: {
      label: "白茶",
      soft: "#f3f8f4",
      panel: "#ffffff",
      accent: "#9bb9aa",
      border: "#d4e2d9",
      text: "#43564f",
      muted: "#6d7a75",
      icon: "#c7d7bf",
      glow: "rgba(155, 185, 170, 0.18)",
    },
  };
  const THEME_ORDER = ["sakura", "mint", "sky", "cream", "lavender", "tea"];

  const defaults = {
    uiLocale: BOOTSTRAP.defaultUiLocale || "auto",
    contentLocale: INITIAL_CONTENT_LOCALE,
    enabled: true,
    convertOutgoing: true,
    convertDisplayed: true,
    decorateChat: true,
    rainOnSend: true,
    quickWheel: true,
    notifyIncoming: true,
    nyanChance: 0.55,
    menuCollapsed: true,
    wheelCollapsed: true,
    wheelX: null,
    wheelY: null,
    actionTargetMode: ACTION_TARGET_MODE.AUTO,
    theme: "sakura",
    actions: CONTENT_FALLBACKS[INITIAL_CONTENT_LOCALE].actions.map((action) => ({
      label: action.label,
      text: action.target,
      selfText: action.self,
    })),
  };

  const config = loadConfig();
  let DEFAULT_ACTION_LIBRARY = createDefaultActionLibrary(config.contentLocale);
  let DEFAULT_KAOMOJI_LIBRARY = createDefaultKaomojiLibrary(config.contentLocale);
  let actionLibrary = loadCachedActionLibrary() || normalizeActionLibrary(DEFAULT_ACTION_LIBRARY);
  let composerLibrary = loadCachedComposerLibrary();
  let kaomojiLibrary = loadCachedKaomojiLibrary() || normalizeKaomojiLibrary(DEFAULT_KAOMOJI_LIBRARY);
  let kaomojiUsage = loadKaomojiUsage();
  let composerState = loadComposerState();
  let activeComposerSession = null;
  const processedMessages = new WeakSet();
  const atmosphereMessages = new WeakSet();
  let patched = false;
  let statusBadgePatched = false;
  let roomEffectsPatched = false;
  let bcModApi = null;
  let sdkLoadingPromise = null;
  let settingsRegistered = false;
  let nekoCommandsRegistered = false;
  let nekoCommandRegistrationSource = "";
  let toastTimer = 0;
  let activeKaomojiGroup = "all";
  let lastPeerSignalAt = 0;
  let lastPeerRoom = "";
  let escapePickExpiresAt = 0;
  let escapePickTimer = 0;
  let escapeGoddessMode = false;
  let escapeGoddessBoostGranted = false;
  const nekoPeers = new Map();
  const badgeHitboxes = new Map();
  const characterAnchors = new Map();
  const atmosphereParticles = [];
  let chatObserver = null;
  let observerRoot = null;
  let maintenanceTimer = 0;
  let decorateTimer = 0;
  let lastDecorateFullScanAt = 0;
  let kaomojiPickerDirty = true;
  let visibilityBound = false;
  const RECENT_CHAT_DECORATION_LIMIT = 100;
  const CHAT_BACKFILL_DECORATION_INTERVAL = 60000;
  const CHAT_BACKFILL_DECORATION_DELAY = 800;
  const MAINTENANCE_INTERVAL = 30000;

  console.log(`[BC 猫娘增强] v${VERSION} userscript injected:`, location.href);
  W.BCNekoEnhancer = {
    config,
    t,
    uiLocale: () => resolveUiLocale(),
    setUiLocale,
    contentLocale: () => config.contentLocale,
    setContentLocale,
    actionLibrary: () => actionLibrary,
    composerLibrary: () => composerLibrary,
    kaomojiLibrary: () => kaomojiLibrary,
    version: VERSION,
    insertFace,
    insertKaomoji,
    kaomojiUsage: () => ({ ...kaomojiUsage }),
    resetKaomojiUsage,
    toggleKaomojiPicker,
    toggle: toggleNekoMode,
    rain: pawRain,
    sendAction: sendQuickAction,
    openActionComposer,
    reloadActions: loadRemoteActionLibrary,
    reloadComposer: loadRemoteComposerLibrary,
    reloadKaomoji: loadRemoteKaomojiLibrary,
    diagnostic,
    status: () => ({
      patched,
      sdk: !!bcModApi,
      enabled: config.enabled,
      screen: W.CurrentScreen,
      url: location.href,
      escapePickActive: isEscapePickActive(),
      escapeGoddessMode,
      commandRegistered: nekoCommandsRegistered,
      commandRegistrationSource: nekoCommandRegistrationSource,
    }),
  };

  function diagnostic() {
    cleanupNekoPeers();
    const enabledActions = (actionLibrary.actions || []).filter((action) => action.enabled !== false);
    const availableActions = getActiveActions();
    const activeKaomojiGroups = getVisibleKaomojiGroups();
    const activeKaomojiItems = getActiveKaomojiItems();
    const playerActionState = detectPlayerActionCapability();
    let actionCache = false;
    let kaomojiCache = false;
    try {
      actionCache = !!localStorage.getItem(actionLibraryCacheKey());
      kaomojiCache = !!localStorage.getItem(KAOMOJI_LIBRARY_CACHE_KEY);
    } catch {
      // Storage may be unavailable in some browser modes.
    }
    return {
      mod: MOD_ID,
      version: VERSION,
      url: String(location.href),
      screen: W.CurrentScreen || "",
      player: W.Player?.MemberNumber || null,
      runtime: {
        sdkRegistered: !!bcModApi,
        chatHooks: patched,
        commandRegistered: nekoCommandsRegistered,
        commandRegistrationSource: nekoCommandRegistrationSource,
        statusBadgeHook: statusBadgePatched,
        roomEffectsHook: roomEffectsPatched,
        settingsRegistered,
      },
      config: {
        uiLocale: config.uiLocale,
        resolvedUiLocale: resolveUiLocale(),
        contentLocale: config.contentLocale,
        enabled: !!config.enabled,
        convertOutgoing: !!config.convertOutgoing,
        convertDisplayed: !!config.convertDisplayed,
        decorateChat: !!config.decorateChat,
        rainOnSend: !!config.rainOnSend,
        quickWheel: !!config.quickWheel,
        notifyIncoming: !!config.notifyIncoming,
        theme: config.theme,
        actionTargetMode: config.actionTargetMode,
        nyanChance: config.nyanChance,
      },
      libraries: {
        actions: {
          version: actionLibrary.version || "unknown",
          total: (actionLibrary.actions || []).length,
          enabled: enabledActions.length,
          available: availableActions.length,
          filtered: Math.max(0, enabledActions.length - availableActions.length),
          cached: actionCache,
          locale: config.contentLocale,
          url: actionLibraryUrl(),
        },
        kaomoji: {
          version: kaomojiLibrary.version || "unknown",
          groups: (kaomojiLibrary.groups || []).length,
          enabledGroups: activeKaomojiGroups.length,
          items: activeKaomojiItems.length,
          cached: kaomojiCache,
          locale: config.contentLocale,
          url: KAOMOJI_LIBRARY_URL,
        },
      },
      peers: {
        count: nekoPeers.size,
        members: Array.from(nekoPeers, ([memberNumber, peer]) => ({
          memberNumber,
          version: peer.version || "unknown",
          seenSecondsAgo: Math.round((Date.now() - peer.time) / 1000),
        })),
      },
      actionState: playerActionState,
      generatedAt: new Date().toISOString(),
    };
  }

  function loadConfig() {
    try {
      return normalizeConfig({ ...defaults, ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}") });
    } catch {
      return normalizeConfig({ ...defaults });
    }
  }

  function normalizeConfig(next) {
    const normalizedUiLocale = normalizeLocale(next.uiLocale);
    next.uiLocale = String(next.uiLocale || "").toLowerCase() === "auto"
      ? "auto"
      : SUPPORTED_UI_LOCALES.includes(normalizedUiLocale)
        ? normalizedUiLocale
        : defaults.uiLocale;
    const normalizedContentLocale = normalizeLocale(next.contentLocale);
    next.contentLocale = SUPPORTED_CONTENT_LOCALES.includes(normalizedContentLocale)
      ? normalizedContentLocale
      : normalizeLocale(defaults.contentLocale) || "zh-CN";
    next.nyanChance = clamp(Number(next.nyanChance ?? defaults.nyanChance), 0, 1);
    if (!Object.values(ACTION_TARGET_MODE).includes(next.actionTargetMode)) {
      next.actionTargetMode = ACTION_TARGET_MODE.AUTO;
    }
    if (!THEME_PRESETS[next.theme]) {
      next.theme = defaults.theme;
    }
    next.menuCollapsed = next.menuCollapsed !== false;
    next.wheelCollapsed = next.wheelCollapsed !== false;
    next.wheelX = Number.isFinite(Number(next.wheelX)) ? Number(next.wheelX) : null;
    next.wheelY = Number.isFinite(Number(next.wheelY)) ? Number(next.wheelY) : null;
    const fallbackPack = contentFallback(next.contentLocale);
    const fallbackActions = fallbackPack.actions.map((action) => ({
      label: action.label,
      text: action.target,
      selfText: action.self,
    }));
    next.actions = (Array.isArray(next.actions) && next.actions.length ? next.actions : fallbackActions)
      .map((action, index) => ({
        label: String(action.label || fallbackActions[index]?.label || fallbackPack.actionLabelFallback).slice(0, 12),
        text: String(action.text || fallbackActions[index]?.text || fallbackPack.actionTargetFallback),
        selfText: String(action.selfText || fallbackActions[index]?.selfText || fallbackPack.actionSelfFallback),
      }))
      .slice(0, 6);
    return next;
  }

  function saveConfig() {
    normalizeConfig(config);
    localStorage.setItem(STORE_KEY, JSON.stringify(config));
  }

  function normalizeLocale(value) {
    const locale = String(value || "").trim().toLowerCase().replace(/_/g, "-");
    if (!locale) return "";
    if (locale === "cn" || locale === "chinese" || locale.startsWith("zh")) return "zh-CN";
    if (locale === "english" || locale.startsWith("en")) return "en";
    return "";
  }

  function resolveUiLocale() {
    if (config.uiLocale !== "auto") return normalizeLocale(config.uiLocale) || "en";
    const candidates = [
      W.TranslationLanguage,
      W.Player?.Language,
      W.Player?.OnlineSettings?.Language,
      ...(globalThis.navigator?.languages || []),
      globalThis.navigator?.language,
    ];
    for (const candidate of candidates) {
      const locale = normalizeLocale(candidate);
      if (SUPPORTED_UI_LOCALES.includes(locale)) return locale;
    }
    return "en";
  }

  function translateValue(key) {
    const locale = resolveUiLocale();
    return UI_MESSAGES[locale]?.[key] ?? UI_MESSAGES.en?.[key] ?? UI_MESSAGES["zh-CN"]?.[key] ?? key;
  }

  function formatTemplate(template, params = {}) {
    return String(template).replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g, (match, name) => (
      Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match
    ));
  }

  function t(key, params = {}) {
    const value = translateValue(key);
    return formatTemplate(Array.isArray(value) ? value[0] : value, params);
  }

  function tLines(key, params = {}) {
    const value = translateValue(key);
    const lines = Array.isArray(value) ? value : [value];
    return lines.map((line) => formatTemplate(line, params));
  }

  function setUiLocale(locale) {
    const value = String(locale || "").toLowerCase() === "auto" ? "auto" : normalizeLocale(locale);
    if (value !== "auto" && !SUPPORTED_UI_LOCALES.includes(value)) return false;
    const pickerOpen = isKaomojiPickerOpen();
    config.uiLocale = value;
    saveConfig();
    syncBodyState();
    markKaomojiPickerDirty();
    syncKaomojiPickerState(pickerOpen);
    if (shouldRenderWheel()) renderWheel();
    if (activeComposerSession) renderActionComposer();
    return true;
  }

  function contentFallback(locale = config.contentLocale) {
    return CONTENT_FALLBACKS[normalizeLocale(locale)] || CONTENT_FALLBACKS["zh-CN"];
  }

  function contentLabels(locale = config.contentLocale) {
    return CONTENT_LABELS[normalizeLocale(locale)] || CONTENT_LABELS["zh-CN"];
  }

  function contentProcessor(locale = config.contentLocale) {
    return CONTENT_PROCESSORS[normalizeLocale(locale)] || CONTENT_PROCESSORS["zh-CN"];
  }

  function actionLibraryUrl(locale = config.contentLocale) {
    return ACTION_LIBRARY_URLS[normalizeLocale(locale)] || ACTION_LIBRARY_URLS["zh-CN"];
  }

  function actionLibraryCacheKey(locale = config.contentLocale) {
    return `${ACTION_LIBRARY_CACHE_PREFIX}.${normalizeLocale(locale) || "zh-CN"}`;
  }

  function composerLibraryUrl(locale = config.contentLocale) {
    return COMPOSER_LIBRARY_URLS[normalizeLocale(locale)] || COMPOSER_LIBRARY_URLS["zh-CN"];
  }

  function composerLibraryCacheKey(locale = config.contentLocale) {
    return `${COMPOSER_LIBRARY_CACHE_PREFIX}.${normalizeLocale(locale) || "zh-CN"}`;
  }

  function createDefaultActionLibrary(locale) {
    const fallback = contentFallback(locale);
    return {
      version: "builtin",
      locale: normalizeLocale(locale) || "zh-CN",
      actions: fallback.actions.map((action) => ({
        id: action.id,
        label: action.label,
        enabled: true,
        self: [action.self],
        target: [action.target],
      })),
    };
  }

  function createDefaultKaomojiLibrary(locale) {
    return {
      version: "builtin",
      groups: [{
        id: "cat",
        label: contentFallback(locale).kaomojiGroupLabel,
        enabled: true,
        items: DEFAULT_KAOMOJI,
      }],
    };
  }

  async function setContentLocale(locale) {
    const value = normalizeLocale(locale);
    if (!SUPPORTED_CONTENT_LOCALES.includes(value)) return false;
    if (config.contentLocale === value) return true;
    config.contentLocale = value;
    saveConfig();
    DEFAULT_ACTION_LIBRARY = createDefaultActionLibrary(value);
    DEFAULT_KAOMOJI_LIBRARY = createDefaultKaomojiLibrary(value);
    actionLibrary = loadCachedActionLibrary() || normalizeActionLibrary(DEFAULT_ACTION_LIBRARY);
    composerLibrary = loadCachedComposerLibrary();
    kaomojiLibrary = loadCachedKaomojiLibrary() || normalizeKaomojiLibrary(DEFAULT_KAOMOJI_LIBRARY);
    hideActionComposer();
    markKaomojiPickerDirty();
    if (shouldRenderWheel()) renderWheel();
    await Promise.all([loadRemoteActionLibrary(), loadRemoteComposerLibrary(), loadRemoteKaomojiLibrary()]);
    return true;
  }

  function currentTheme() {
    return THEME_PRESETS[config.theme] || THEME_PRESETS.sakura;
  }

  function hexToRgb(hex) {
    const value = String(hex || "").replace("#", "").trim();
    if (!/^[0-9a-f]{6}$/i.test(value)) return { r: 255, g: 255, b: 255 };
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16),
    };
  }

  function withAlpha(hex, alpha) {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp(Number(alpha), 0, 1)})`;
  }

  function lighten(hex, amount) {
    const rgb = hexToRgb(hex);
    const ratio = clamp(Number(amount), 0, 1);
    const mix = (channel) => Math.round(channel + (255 - channel) * ratio);
    return `rgb(${mix(rgb.r)}, ${mix(rgb.g)}, ${mix(rgb.b)})`;
  }

  function applyTheme() {
    if (!document.body) return;
    const theme = currentTheme();
    document.body.dataset.bcnTheme = config.theme;
    document.body.style.setProperty("--bcn-soft", theme.soft);
    document.body.style.setProperty("--bcn-panel", theme.panel);
    document.body.style.setProperty("--bcn-accent", theme.accent);
    document.body.style.setProperty("--bcn-border", theme.border);
    document.body.style.setProperty("--bcn-text", theme.text);
    document.body.style.setProperty("--bcn-muted", theme.muted);
    document.body.style.setProperty("--bcn-icon", theme.icon);
    document.body.style.setProperty("--bcn-glow", theme.glow);
  }

  function normalizeActionLibrary(source) {
    const actions = Array.isArray(source?.actions) ? source.actions : [];
    const normalized = actions
      .map((action, index) => {
        const self = Array.isArray(action.self) ? action.self.map(cleanActionLine).filter(Boolean) : [];
        const target = Array.isArray(action.target) ? action.target.map(cleanActionLine).filter(Boolean) : [];
        const variants = normalizeActionVariantMap(action.variants);
        if (!self.length && !target.length) return null;
        return {
          id: String(action.id || `action-${index}`).trim() || `action-${index}`,
          label: String(action.label || action.id || contentFallback().actionLabelFallback).trim().slice(0, 12),
          enabled: action.enabled !== false,
          composer: action.composer === true || (action.composer && typeof action.composer === "object")
            ? action.composer
            : undefined,
          self,
          target,
          requirements: normalizeActionRequirements(action.requirements),
          variants,
        };
      })
      .filter(Boolean);
    return {
      version: String(source?.version || "unknown"),
      updatedAt: source?.updatedAt || "",
      locale: normalizeLocale(source?.locale) || config.contentLocale,
      actions: normalized.length ? normalized : DEFAULT_ACTION_LIBRARY.actions,
    };
  }

  function cleanActionLine(line) {
    return String(line || "").replace(/\{user\}\s*/g, "").trim();
  }

  function normalizeActionVariantMap(variants) {
    if (!variants || typeof variants !== "object") return undefined;
    const result = {};
    for (const [key, value] of Object.entries(variants)) {
      const self = Array.isArray(value?.self) ? value.self.map(cleanActionLine).filter(Boolean) : [];
      const target = Array.isArray(value?.target) ? value.target.map(cleanActionLine).filter(Boolean) : [];
      if (!self.length && !target.length) continue;
      result[key] = { self, target };
    }
    return Object.keys(result).length ? result : undefined;
  }

  function normalizeActionRequirements(requirements) {
    if (!requirements || typeof requirements !== "object") return undefined;
    return {
      needHands: requirements.needHands === true,
      needMouth: requirements.needMouth === true,
      needReach: requirements.needReach === true,
      needMobility: requirements.needMobility === true,
      maxGagLevel: Number.isFinite(Number(requirements.maxGagLevel))
        ? clamp(Number(requirements.maxGagLevel), 0, 3)
        : undefined,
    };
  }

  function loadCachedActionLibrary() {
    try {
      const current = localStorage.getItem(actionLibraryCacheKey());
      if (current) return normalizeActionLibrary(JSON.parse(current));
      const legacy = localStorage.getItem(ACTION_LIBRARY_LEGACY_CACHE_KEY);
      if (!legacy) return null;
      const parsed = JSON.parse(legacy);
      const rawText = JSON.stringify(parsed.actions || parsed);
      const guessedLocale = /[\u3400-\u9fff]/u.test(rawText) ? "zh-CN" : "en";
      return guessedLocale === config.contentLocale ? normalizeActionLibrary(parsed) : null;
    } catch {
      return null;
    }
  }

  function cacheActionLibrary(library) {
    try {
      localStorage.setItem(actionLibraryCacheKey(), JSON.stringify({ ...library, locale: config.contentLocale }));
    } catch {
      // Ignore storage failures; the builtin action library still works.
    }
  }

  function loadRemoteActionLibrary() {
    const requestedLocale = config.contentLocale;
    return requestText(actionLibraryUrl(requestedLocale))
      .then((text) => {
        if (requestedLocale !== config.contentLocale) return actionLibrary;
        const library = normalizeActionLibrary({ ...JSON.parse(text), locale: requestedLocale });
        actionLibrary = library;
        cacheActionLibrary(library);
        renderWheel();
        console.log(`[BC 猫娘增强] 动作库已加载: ${library.version}, ${library.actions.length} 个主题`);
        return library;
      })
      .catch((error) => {
        console.warn("[BC 猫娘增强] 远程动作库加载失败，使用缓存/内置库:", error);
        return actionLibrary;
      });
  }

  function normalizeKaomojiLibrary(source) {
    const groups = Array.isArray(source?.groups) ? source.groups : [];
    const normalized = groups
      .map((group, index) => {
        const items = Array.isArray(group.items)
          ? group.items.map((item) => String(item || "").trim()).filter(Boolean)
          : [];
        if (!items.length) return null;
        return {
          id: String(group.id || `group-${index}`).trim() || `group-${index}`,
          label: String(contentLabels()[group.id] || group.label || group.id || contentFallback().kaomojiLabelFallback).trim().slice(0, 20),
          enabled: group.enabled !== false,
          items,
        };
      })
      .filter(Boolean);
    return {
      version: String(source?.version || "unknown"),
      updatedAt: source?.updatedAt || "",
      groups: normalized.length ? normalized : DEFAULT_KAOMOJI_LIBRARY.groups,
    };
  }

  function getActiveKaomojiItems() {
    const items = kaomojiLibrary.groups
      .filter((group) => group.enabled !== false)
      .flatMap((group) => group.items)
      .filter(Boolean);
    return items.length ? items : DEFAULT_KAOMOJI;
  }

  function getVisibleKaomojiGroups() {
    return kaomojiLibrary.groups.filter((group) => group.enabled !== false && group.items.length);
  }

  function getKaomojiItemsForGroup(groupId) {
    if (groupId === "all") return sortKaomojiByUsage(getActiveKaomojiItems());
    const group = getVisibleKaomojiGroups().find((item) => item.id === groupId);
    return sortKaomojiByUsage(group?.items?.length ? group.items : getActiveKaomojiItems());
  }

  function pickRandomKaomoji() {
    const items = getActiveKaomojiItems();
    return items[Math.floor(Math.random() * items.length)] || DEFAULT_KAOMOJI[0];
  }

  function loadKaomojiUsage() {
    try {
      const raw = localStorage.getItem(KAOMOJI_USAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
      return Object.fromEntries(
        Object.entries(parsed)
          .map(([face, count]) => [String(face), Math.max(0, Number(count) || 0)])
          .filter(([face, count]) => face && count > 0)
      );
    } catch {
      return {};
    }
  }

  function saveKaomojiUsage() {
    try {
      localStorage.setItem(KAOMOJI_USAGE_KEY, JSON.stringify(kaomojiUsage));
    } catch {
      // Ignore storage failures; kaomoji insertion still works without ranking.
    }
  }

  function getKaomojiUsage(face) {
    return Math.max(0, Number(kaomojiUsage[String(face)] || 0));
  }

  function sortKaomojiByUsage(items) {
    return items
      .map((face, index) => ({ face, index, count: getKaomojiUsage(face) }))
      .sort((a, b) => b.count - a.count || a.index - b.index)
      .map((item) => item.face);
  }

  function recordKaomojiUsage(face) {
    const key = String(face || "").trim();
    if (!key) return;
    kaomojiUsage[key] = getKaomojiUsage(key) + 1;
    saveKaomojiUsage();
    kaomojiPickerDirty = true;
  }

  function normalizeComposerTextList(value) {
    if (!Array.isArray(value)) return [];
    return value
      .map((item, index) => {
        if (typeof item === "string") return { id: `line-${index}`, text: item, weight: 1 };
        if (!item || typeof item !== "object") return null;
        const text = String(item.text || "");
        return {
          id: String(item.id || `line-${index}`),
          text,
          weight: Math.max(0.01, Number(item.weight) || 1),
          compatibleActions: Array.isArray(item.compatibleActions) ? item.compatibleActions.map(String) : undefined,
        };
      })
      .filter(Boolean);
  }

  function normalizeComposerModeLines(value) {
    return {
      target: normalizeComposerTextList(value?.target),
      self: normalizeComposerTextList(value?.self),
      none: normalizeComposerTextList(value?.none),
    };
  }

  function normalizeComposerLibrary(source) {
    if (!source || typeof source !== "object") return null;
    const moods = (Array.isArray(source.moods) ? source.moods : []).map((item) => ({
      id: String(item?.id || ""),
      label: String(item?.label || item?.id || ""),
      compatibleActions: Array.isArray(item?.compatibleActions) ? item.compatibleActions.map(String) : [],
      leads: normalizeComposerTextList(item?.leads),
    })).filter((item) => item.id && item.label && item.leads.length);
    const styles = (Array.isArray(source.styles) ? source.styles : []).map((item) => ({
      id: String(item?.id || ""),
      label: String(item?.label || item?.id || ""),
    })).filter((item) => item.id && item.label);
    const extras = (Array.isArray(source.extras) ? source.extras : []).map((item) => ({
      id: String(item?.id || ""),
      label: String(item?.label || item?.id || ""),
      kind: item?.kind === "kaomoji" || item?.kind === "none" ? item.kind : "text",
      compatibleActions: Array.isArray(item?.compatibleActions) ? item.compatibleActions.map(String) : [],
      requirements: normalizeActionRequirements(item?.requirements),
      trails: normalizeComposerTextList(item?.trails),
    })).filter((item) => item.id && item.label && item.trails.length);
    const actions = {};
    for (const [actionId, definition] of Object.entries(source.actions || {})) {
      const stylesById = {};
      for (const [styleId, lines] of Object.entries(definition?.styles || {})) {
        const normalized = normalizeComposerModeLines(lines);
        if (normalized.target.length || normalized.self.length || normalized.none.length) stylesById[styleId] = normalized;
      }
      if (!Object.keys(stylesById).length) continue;
      actions[actionId] = {
        styles: stylesById,
        incompatiblePairs: (Array.isArray(definition?.incompatiblePairs) ? definition.incompatiblePairs : [])
          .map((pair) => ({ mood: String(pair?.mood || ""), style: String(pair?.style || "") }))
          .filter((pair) => pair.mood && pair.style),
      };
    }
    if (!moods.length || !styles.length || !extras.length || !Object.keys(actions).length) return null;
    return {
      version: String(source.version || "unknown"),
      locale: normalizeLocale(source.locale) || config.contentLocale,
      moods,
      styles,
      extras,
      templates: normalizeComposerModeLines(source.templates),
      endings: normalizeComposerModeLines(source.endings),
      actions,
    };
  }

  function loadCachedComposerLibrary() {
    try {
      const cached = localStorage.getItem(composerLibraryCacheKey());
      return cached ? normalizeComposerLibrary(JSON.parse(cached)) : null;
    } catch {
      return null;
    }
  }

  function cacheComposerLibrary(library) {
    try {
      localStorage.setItem(composerLibraryCacheKey(), JSON.stringify({ ...library, locale: config.contentLocale }));
    } catch {
      // The composer remains available for this page even when storage is unavailable.
    }
  }

  function loadRemoteComposerLibrary() {
    const requestedLocale = config.contentLocale;
    return requestText(composerLibraryUrl(requestedLocale))
      .then((text) => {
        if (requestedLocale !== config.contentLocale) return composerLibrary;
        const library = normalizeComposerLibrary({ ...JSON.parse(text), locale: requestedLocale });
        if (!library) throw new Error("invalid composer library");
        composerLibrary = library;
        cacheComposerLibrary(library);
        if (activeComposerSession) openActionComposer(activeComposerSession.action);
        console.log(`[BC 猫娘增强] 动作编排器内容已加载: ${library.version}`);
        return library;
      })
      .catch((error) => {
        console.warn("[BC 猫娘增强] 动作编排器内容加载失败，使用缓存:", error);
        return composerLibrary;
      });
  }

  function resetKaomojiUsage() {
    kaomojiUsage = {};
    try {
      localStorage.removeItem(KAOMOJI_USAGE_KEY);
    } catch {
      // Ignore storage failures; the in-memory ranking has already been reset.
    }
    markKaomojiPickerDirty();
    showToast(t("toast.kaomojiUsageReset"));
  }

  function hasKnownKaomoji(text) {
    return getActiveKaomojiItems().some((face) => text.includes(face));
  }

  function loadCachedKaomojiLibrary() {
    try {
      const raw = localStorage.getItem(KAOMOJI_LIBRARY_CACHE_KEY)
        || localStorage.getItem(KAOMOJI_LIBRARY_LEGACY_CACHE_KEY);
      return raw ? normalizeKaomojiLibrary(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }

  function cacheKaomojiLibrary(library) {
    try {
      localStorage.setItem(KAOMOJI_LIBRARY_CACHE_KEY, JSON.stringify(library));
    } catch {
      // Ignore storage failures; the builtin kaomoji library still works.
    }
  }

  function loadRemoteKaomojiLibrary() {
    const requestedLocale = config.contentLocale;
    return requestText(KAOMOJI_LIBRARY_URL)
      .then((text) => {
        if (requestedLocale !== config.contentLocale) return kaomojiLibrary;
        const library = normalizeKaomojiLibrary(JSON.parse(text));
        kaomojiLibrary = library;
        cacheKaomojiLibrary(library);
        markKaomojiPickerDirty();
        console.log(`[BC 猫娘增强] 颜文字库已加载: ${library.version}, ${getActiveKaomojiItems().length} 个颜文字`);
        return library;
      })
      .catch((error) => {
        console.warn("[BC 猫娘增强] 远程颜文字库加载失败，使用缓存/内置库:", error);
        return kaomojiLibrary;
      });
  }

  function requestText(url) {
    if (typeof GM_xmlhttpRequest === "function") {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          timeout: 10000,
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

  function loadModSdk() {
    if (W.bcModSdk?.registerMod) {
      return Promise.resolve(W.bcModSdk);
    }
    if (sdkLoadingPromise) return sdkLoadingPromise;
    sdkLoadingPromise = requestText(MOD_SDK_URL).then((code) => new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.textContent = `${code}\n//# sourceURL=${MOD_SDK_URL}`;
      script.onload = () => script.remove();
      (document.head || document.documentElement).appendChild(script);
      setTimeout(() => {
        script.remove();
        if (W.bcModSdk?.registerMod) resolve(W.bcModSdk);
        else reject(new Error("BC mod SDK loaded without bcModSdk"));
      }, 0);
    }));
    return sdkLoadingPromise;
  }

  function registerModSdk() {
    return loadModSdk()
      .then((sdk) => {
        if (bcModApi) return bcModApi;
        bcModApi = sdk.registerMod({
          name: MOD_ID,
          fullName: "Bondage Club Neko Chat Enhancer",
          version: VERSION,
          repository: "https://github.com/QAQMOON/bondage-club-neko-chat-enhancer",
        }, { allowReplace: true });
        console.log("[BC 猫娘增强] BC Mod SDK 已注册喵~");
        return bcModApi;
      })
      .catch((error) => {
        console.warn("[BC 猫娘增强] BC Mod SDK 加载失败，稍后重试:", error);
        return null;
      });
  }

  function clamp(value, min, max) {
    if (!Number.isFinite(value)) return min;
    return Math.min(max, Math.max(min, value));
  }

  function toggleConfig(key) {
    config[key] = !config[key];
    saveConfig();
    syncBodyState();
  }

  function syncBodyState() {
    if (!document.body) return;
    applyTheme();
    document.body.classList.toggle("bcn-enabled", config.enabled);
    document.body.classList.toggle("bcn-wheel-on", config.quickWheel);
    document.body.classList.toggle("bcn-menu-collapsed", config.menuCollapsed);
    document.body.classList.toggle("bcn-wheel-collapsed", config.wheelCollapsed);
    const mainButton = document.getElementById("bcn-main-cat");
    if (mainButton) {
      mainButton.title = t("ui.mainButton.title");
    }
    const handleButton = document.getElementById("bcn-wheel-handle");
    if (handleButton) {
      handleButton.textContent = config.wheelCollapsed ? "🐱" : "🐱";
      handleButton.title = t(config.wheelCollapsed ? "ui.wheel.open" : "ui.wheel.close");
    }
  }

  function syncKaomojiPickerState(open) {
    document.body?.classList.toggle("bcn-kaomoji-open", !!open);
    const picker = document.getElementById("bcn-kaomoji-picker");
    const button = document.getElementById("bcn-face");
    picker?.classList.toggle("is-open", !!open);
    button?.classList.toggle("is-active", !!open);
    if (button) {
      button.title = t(open ? "ui.kaomojiButton.close" : "ui.kaomojiButton.open");
    }
  }

  function isKaomojiPickerOpen() {
    return document.getElementById("bcn-kaomoji-picker")?.classList.contains("is-open");
  }

  function markKaomojiPickerDirty() {
    kaomojiPickerDirty = true;
    if (isKaomojiPickerOpen()) renderKaomojiPicker(true);
  }

  function shouldRenderWheel() {
    return !!config.quickWheel && !config.menuCollapsed && !config.wheelCollapsed;
  }

  function addStyle(css) {
    if (typeof GM_addStyle === "function") {
      GM_addStyle(css);
      return;
    }
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function relationHonorific(text) {
    return contentProcessor().relationHonorific(text);
  }

  function standardNeko(text) {
    return contentProcessor().standard(text);
  }

  function actionNeko(text) {
    return contentProcessor().action(text);
  }

  function emoteNeko(text) {
    text = relationHonorific(standardNeko(text || ""));
    if (hasKnownKaomoji(text)) return text;
    return `${text} ${pickRandomKaomoji()}`;
  }

  function whisperNeko(text) {
    return contentProcessor().whisper(text);
  }

  function normalizeStateToken(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getCharacterEffects(character) {
    if (!character) return [];
    if (Array.isArray(character.Effect)) return character.Effect.filter(Boolean);
    try {
      const effects = typeof W.CharacterGetEffects === "function" ? W.CharacterGetEffects(character) : [];
      return Array.isArray(effects) ? effects.filter(Boolean) : [];
    } catch {
      return [];
    }
  }

  function getCharacterPoses(character) {
    return Array.isArray(character?.Pose) ? character.Pose.filter(Boolean) : [];
  }

  function hasTokenMatch(source, names) {
    const tokens = source.map(normalizeStateToken).filter(Boolean);
    const patterns = (names || []).map(normalizeStateToken).filter(Boolean);
    return patterns.some((pattern) => tokens.some((token) => token === pattern || token.includes(pattern) || pattern.includes(token)));
  }

  function hasAnyEffect(character, names) {
    return hasTokenMatch(getCharacterEffects(character), names);
  }

  function hasAnyPose(character, names) {
    return hasTokenMatch(getCharacterPoses(character), names);
  }

  function readCharacterMethod(character, methodName, fallback) {
    try {
      const value = character?.[methodName]?.();
      return typeof value === "boolean" ? value : fallback;
    } catch {
      return fallback;
    }
  }

  function isUltraBcLoaded() {
    try {
      if (W.Player?.UBC) return true;
      if (typeof W.UBCver === "string" && W.UBCver) return true;
      const mods = W.bcModSdk?.getModsInfo?.();
      if (!mods || typeof mods[Symbol.iterator] !== "function") return false;
      for (const mod of mods) {
        const name = String(mod?.name || "");
        const fullName = String(mod?.fullName || "");
        const repository = String(mod?.repository || "");
        if (/ULTRAbc/i.test(name) || /Ultra Bondage Club/i.test(fullName) || /tetris245\/ULTRAbc/i.test(repository)) return true;
      }
    } catch {}
    return false;
  }

  function detectPlayerGagState() {
    const character = W.Player || null;
    const cannotTalk = (() => {
      try {
        return character?.CanTalk?.() === false;
      } catch {
        return false;
      }
    })();
    const gagLevel = hasAnyEffect(character, ["gagveryheavy", "gagheavy", "gagtotal", "gaggedheavy"])
        ? 3
        : hasAnyEffect(character, ["gagmedium", "gag", "gagged"])
          ? 2
          : hasAnyEffect(character, ["gaglight"])
            ? 1
            : 0;
    const gagged = gagLevel > 0 || cannotTalk;
    return { gagged, gagLevel };
  }

  function detectCharacterState(character) {
    const cannotTalk = readCharacterMethod(character, "CanTalk", true) === false;
    const gagLevel = hasAnyEffect(character, ["gagveryheavy", "gagheavy", "gagtotal", "gaggedheavy"])
        ? 3
        : hasAnyEffect(character, ["gagmedium", "gag", "gagged"])
          ? 2
          : hasAnyEffect(character, ["gaglight"])
            ? 1
            : 0;
    const kneeling = readCharacterMethod(character, "IsKneeling", undefined);
    const lying = hasAnyPose(character, ["lying", "prone", "supine"]) || hasAnyEffect(character, ["prone"]);
    const suspended = hasAnyEffect(character, ["suspended"]);
    const handsFree = readCharacterMethod(character, "CanInteract", !hasAnyEffect(character, ["block", "freeze", "restrain", "bound", "cuffed"]));
    const canMove = readCharacterMethod(character, "CanWalk", !hasAnyEffect(character, ["freeze", "tethered", "mounted", "suspended", "prone"]));
    const gagged = gagLevel > 0 || cannotTalk;
    const restrained = !handsFree || !canMove || hasAnyEffect(character, ["block", "freeze", "restrain", "bound", "cuffed", "tethered"]);
    const resolvedKneeling = typeof kneeling === "boolean" ? kneeling : hasAnyPose(character, ["kneel", "kneeling"]);
    const helpless = restrained && (lying || suspended || !canMove);
    return {
      gagLevel,
      gagged,
      mouthFree: gagLevel <= 1,
      handsFree,
      canMove,
      kneeling: resolvedKneeling,
      lying,
      suspended,
      restrained,
      helpless,
      canReach: handsFree && !lying && !suspended && (canMove || resolvedKneeling),
    };
  }

  function detectPlayerActionCapability() {
    return detectCharacterState(W.Player || null);
  }

  function getSpeechModeLabel(speechState) {
    const gagLevel = typeof speechState === "object" ? Number(speechState?.gagLevel || 0) : Number(speechState || 0);
    return t(contentProcessor().speechModeKey(gagLevel));
  }

  function applyGagSpeech(text, speechState, type = "Chat") {
    const gagLevel = typeof speechState === "object" ? Number(speechState?.gagLevel || 0) : Number(speechState || 0);
    return contentProcessor().gag(text, gagLevel, type);
  }

  function applyLocalStateSpeechEffects(type, text) {
    if (!["Chat", "Whisper", "Emote"].includes(type)) return text;
    if (isUltraBcLoaded()) return text;
    const state = detectPlayerGagState();
    if (!state.gagged) return text;
    return applyGagSpeech(text, state, type);
  }

  function convertByType(type, text, options = {}) {
    if (!config.enabled || !text) return text;
    let value = text;
    if (type === "Whisper") value = whisperNeko(text);
    else if (type === "Emote") value = emoteNeko(text);
    else if (type === "Action" || type === "Activity") value = actionNeko(text);
    else if (type === "Chat") value = standardNeko(text);
    if (options.applyGag) value = applyLocalStateSpeechEffects(type, value);
    return value;
  }

  function shouldConvertDisplay(data, msg) {
    if (!config.enabled || !config.convertDisplayed || !msg) return false;
    if (isBugPeerSender(data?.Sender)) return false;
    const type = data?.Type;
    if (contentProcessor().alreadyConverted(type, String(msg), hasKnownKaomoji)) return false;
    return ["Chat", "Whisper", "Emote", "Action", "Activity"].includes(type);
  }

  function isOwnSender(sender) {
    return Number(sender) === Number(W.Player?.MemberNumber);
  }

  function getCharacterByMemberNumber(memberNumber) {
    const value = memberNumberOf(memberNumber);
    if (!value) return null;
    if (memberNumberOf(W.Player) === value) return W.Player || null;
    return W.ChatRoomCharacter?.find?.((character) => memberNumberOf(character) === value) || null;
  }

  function collectRelationshipNumbers(target, value, keys, depth = 0) {
    if (!target || value == null || depth > 3) return;
    const direct = memberNumberOf(value);
    if (direct) {
      target.add(direct);
      return;
    }
    if (Array.isArray(value)) {
      for (const entry of value) collectRelationshipNumbers(target, entry, keys, depth + 1);
      return;
    }
    if (typeof value !== "object") return;
    for (const key of keys) {
      if (key in value) collectRelationshipNumbers(target, value[key], keys, depth + 1);
    }
  }

  function collectOwnerNumbers(source) {
    const values = new Set();
    if (!source) return values;
    collectRelationshipNumbers(values, source.Owner, ["MemberNumber", "Owner", "OwnerNumber", "OwnerMemberNumber"]);
    collectRelationshipNumbers(values, source.OwnerNumber, ["MemberNumber", "Owner", "OwnerNumber", "OwnerMemberNumber"]);
    collectRelationshipNumbers(values, source.Ownership, ["MemberNumber", "Owner", "OwnerNumber", "OwnerMemberNumber"]);
    return values;
  }

  function collectLoverNumbers(source) {
    const values = new Set();
    if (!source) return values;
    collectRelationshipNumbers(values, source.Lovership, ["MemberNumber", "Lover", "LoverMemberNumber", "MemberNumber1", "MemberNumber2"]);
    collectRelationshipNumbers(values, source.Lover, ["MemberNumber", "Lover", "LoverMemberNumber", "MemberNumber1", "MemberNumber2"]);
    collectRelationshipNumbers(values, source.LoverMemberNumber, ["MemberNumber", "Lover", "LoverMemberNumber", "MemberNumber1", "MemberNumber2"]);
    collectRelationshipNumbers(values, source.Lovers, ["MemberNumber", "Lover", "LoverMemberNumber", "MemberNumber1", "MemberNumber2"]);
    return values;
  }

  function hasOwnerRelationship(character, senderNumber) {
    const playerOwners = collectOwnerNumbers(W.Player);
    if (playerOwners.has(senderNumber)) return true;
    const characterOwners = collectOwnerNumbers(character);
    return characterOwners.has(memberNumberOf(W.Player));
  }

  function hasLoverRelationship(character, senderNumber) {
    const playerLovers = collectLoverNumbers(W.Player);
    if (playerLovers.has(senderNumber)) return true;
    const characterLovers = collectLoverNumbers(character);
    return characterLovers.has(memberNumberOf(W.Player));
  }

  function getRelationshipStatus(sender) {
    const character = getCharacterByMemberNumber(sender);
    const senderNumber = memberNumberOf(sender);
    if (!character || !senderNumber || senderNumber === memberNumberOf(W.Player)) return null;
    const owner = hasOwnerRelationship(character, senderNumber);
    const lover = hasLoverRelationship(character, senderNumber);
    if (owner && lover) return "dual";
    if (owner) return "owner";
    if (lover) return "lover";
    return null;
  }

  function applyRelationshipBadge(div, relation) {
    const nameEl = div?.querySelector?.(".ChatMessageName");
    if (!nameEl) return;
    const existing = nameEl.querySelector(".bcn-relation-badge");
    if (!relation) {
      existing?.remove();
      delete nameEl.dataset.bcnRelationBadge;
      return;
    }
    const icon = existing || document.createElement("span");
    icon.className = `bcn-relation-badge bcn-relation-badge-${relation}`;
    icon.textContent = relation === "owner" ? "🐾" : relation === "lover" ? "❤" : "❤🐾";
    icon.setAttribute("aria-hidden", "true");
    if (!existing) nameEl.prepend(icon);
    nameEl.dataset.bcnRelationBadge = relation;
  }

  function syncRelationshipDecoration(div, sender) {
    if (!div) return;
    div.classList.remove("bcn-related-message", "bcn-related-owner", "bcn-related-lover", "bcn-related-dual");
    delete div.dataset.bcnRelation;
    const relation = getRelationshipStatus(sender);
    if (!relation) {
      applyRelationshipBadge(div, null);
      return;
    }
    div.classList.add("bcn-related-message", `bcn-related-${relation}`);
    div.dataset.bcnRelation = relation;
    applyRelationshipBadge(div, relation);
  }

  function isBugPeerSender(sender) {
    const memberNumber = memberNumberOf(sender);
    if (!memberNumber) return false;
    const peer = nekoPeers.get(memberNumber);
    return !!peer && peer.channel === "bug" && peer.noDisplayConvert === true;
  }

  function decorateMessage(div, data) {
    if (!div) return div;
    if (!processedMessages.has(div)) {
      processedMessages.add(div);
      const type = data?.Type || [...div.classList].find((name) => name.startsWith("ChatMessage"))?.replace("ChatMessage", "");
      div.dataset.bcnType = type || "Unknown";

      if (isOwnSender(data?.Sender || div.dataset.sender)) {
        div.classList.add("bcn-own-message");
      }

      if (config.decorateChat) {
        div.classList.add("bcn-card-message");
      }
    }
    syncRelationshipDecoration(div, data?.Sender || div.dataset.sender);
    return div;
  }

  function patchBC() {
    if (patched) return true;
    if (!bcModApi || !W.ChatRoomGenerateChatRoomChatMessage || !W.ChatRoomMessageDisplay || !W.ServerSend) return false;
    patched = true;

    if (typeof W.ChatRoomSendChat === "function") {
      bcModApi.hookFunction("ChatRoomSendChat", 10000, (args, next) => {
        const input = getChatInput();
        const text = input?.value || "";
        if (runNekoCommand(text)) return undefined;
        return next(args);
      });
    }

    if (typeof W.ChatRoomClick === "function") {
      bcModApi.hookFunction("ChatRoomClick", 10, (args, next) => {
        const result = next(args);
        if (isEscapePickActive()) setTimeout(() => tryConsumeEscapePick(), 0);
        return result;
      });
    }

    if (typeof W.DialogClick === "function") {
      bcModApi.hookFunction("DialogClick", 10, (args, next) => {
        const result = next(args);
        if (isEscapePickActive()) setTimeout(() => tryConsumeEscapePick(), 0);
        return result;
      });
    }

    if (typeof W.CommandParse === "function") {
      bcModApi.hookFunction("CommandParse", 10000, (args, next) => {
        const text = String(args?.[0] || "");
        if (runNekoCommand(text)) return true;
        return next(args);
      });
    }

    bcModApi.hookFunction("ChatRoomGenerateChatRoomChatMessage", 0, (args, next) => {
      const [type, msg, replyId] = args;
      const nextMsg = config.convertOutgoing ? convertByType(type, msg, { applyGag: true }) : msg;
      return next([type, nextMsg, replyId]);
    });

    bcModApi.hookFunction("ChatRoomMessageDisplay", 0, (args, next) => {
      const [data, msg, senderCharacter, metadata] = args;
      handleNekoPeerSignal(data);
      maybeSpawnAtmosphere(data, msg);
      const nextMsg = shouldConvertDisplay(data, msg)
        ? convertByType(data?.Type, msg, { applyGag: isOwnSender(data?.Sender) })
        : msg;
      const div = next([data, nextMsg, senderCharacter, metadata]);
      decorateMessage(div, data);
      if (config.notifyIncoming && data?.Sender && !isOwnSender(data.Sender) && ["Chat", "Whisper"].includes(data.Type)) {
        showToast(t(data.Type === "Whisper" ? "toast.privateMessage" : "toast.newMessage"));
      }
      return div;
    });

    bcModApi.hookFunction("ServerSend", 0, (args, next) => {
      const [message, payload] = args;
      if (message === "ChatRoomChat" && handleNekoCommand(payload?.Content)) {
        return undefined;
      }
      if (message === "ChatRoomChat" && config.enabled && config.rainOnSend) {
        const type = payload?.Type;
        if (["Chat", "Whisper", "Emote", "Action"].includes(type)) pawRain(type);
      }
      return next(args);
    });

    if (typeof W.ChatRoomMessage === "function") {
      bcModApi.hookFunction("ChatRoomMessage", 0, (args, next) => {
        const [data] = args;
        handleNekoPeerSignal(data);
        maybeSpawnAtmosphere(data, data?.Content);
        return next(args);
      });
    }

    console.log("[BC 猫娘增强] 已通过 BC Mod SDK 接入聊天函数喵~");
    return true;
  }

  function patchStatusBadge() {
    if (statusBadgePatched) return true;
    if (!bcModApi || typeof W.ChatRoomDrawCharacterStatusIcons !== "function") return false;
    statusBadgePatched = true;

    bcModApi.hookFunction("ChatRoomDrawCharacterStatusIcons", 10, (args, next) => {
      const result = next(args);
      rememberCharacterAnchorFromDraw(args);
      drawOwnCharacterBadge(args);
      return result;
    });

    console.log("[BC Neko Enhancer] character cat badge hooked");
    return true;
  }

  function patchRoomEffects() {
    if (roomEffectsPatched) return true;
    if (!bcModApi || typeof W.ChatRoomRun !== "function") return false;
    roomEffectsPatched = true;

    bcModApi.hookFunction("ChatRoomRun", 10, (args, next) => {
      const result = next(args);
      sendNekoPeerSignal(false);
      drawAtmosphereParticles();
      drawNekoBadgeTooltip();
      return result;
    });

    console.log("[BC Neko Enhancer] room neko effects hooked");
    return true;
  }

  function drawOwnCharacterBadge(drawArgs) {
    const character = drawArgs?.[0];
    if (!character || W.CurrentScreen !== "ChatRoom") return;
    if (!shouldShowNekoBadge(character)) return;

    const charX = Number(drawArgs?.[1]);
    const charY = Number(drawArgs?.[2]);
    const zoom = Number(drawArgs?.[3]) || 1;
    if (!Number.isFinite(charX) || !Number.isFinite(charY)) return;

    const size = 35 * zoom;
    const badgeX = charX + 477.5 * zoom;
    const badgeY = charY + 22.5 * zoom;
    rememberCharacterAnchor(character, charX, charY, zoom);
    rememberBadgeHitbox(character, badgeX, badgeY, size);
    drawCatBadge(badgeX, badgeY, size);
  }

  function drawCatBadge(x, y, size) {
    if (typeof W.DrawTextFit === "function") {
      W.DrawTextFit("\uD83D\uDC31", x, y, size, "#ffc928", "#7a5600");
      return;
    }

    const canvas = W.MainCanvas;
    if (!canvas || typeof canvas.save !== "function") return;
    canvas.save();
    canvas.font = `${Math.round(size)}px "Segoe UI Emoji", "Noto Color Emoji", "Apple Color Emoji", sans-serif`;
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.shadowColor = "rgba(255, 201, 40, 0.46)";
    canvas.shadowBlur = Math.max(2, size * 0.16);
    canvas.fillText("\uD83D\uDC31", x, y);
    canvas.restore();
  }

  function memberNumberOf(characterOrNumber) {
    const memberNumber = typeof characterOrNumber === "object" ? characterOrNumber?.MemberNumber : characterOrNumber;
    const value = Number(memberNumber);
    return Number.isFinite(value) ? value : null;
  }

  function shouldShowNekoBadge(character) {
    const memberNumber = memberNumberOf(character);
    if (!memberNumber) return false;
    if (memberNumber === memberNumberOf(W.Player)) return true;
    cleanupNekoPeers();
    return nekoPeers.has(memberNumber);
  }

  function rememberCharacterAnchorFromDraw(drawArgs) {
    const character = drawArgs?.[0];
    const charX = Number(drawArgs?.[1]);
    const charY = Number(drawArgs?.[2]);
    const zoom = Number(drawArgs?.[3]) || 1;
    if (!character || !Number.isFinite(charX) || !Number.isFinite(charY)) return;
    rememberCharacterAnchor(character, charX, charY, zoom);
  }

  function rememberCharacterAnchor(character, charX, charY, zoom) {
    const memberNumber = memberNumberOf(character);
    if (!memberNumber) return;
    characterAnchors.set(memberNumber, {
      x: charX + 250 * zoom,
      y: charY + 65 * zoom,
      zoom,
      time: Date.now(),
    });
  }

  function rememberBadgeHitbox(character, x, y, size) {
    const memberNumber = memberNumberOf(character);
    if (!memberNumber) return;
    badgeHitboxes.set(memberNumber, {
      x: x - size / 2,
      y: y - size / 2,
      w: size,
      h: size,
      cx: x,
      cy: y,
      time: Date.now(),
    });
  }

  function handleNekoPeerSignal(data) {
    if (!data || data.Type !== "Hidden" || data.Content !== PEER_SIGNAL_CONTENT) return;
    const memberNumber = memberNumberOf(data.Sender);
    if (!memberNumber || memberNumber === memberNumberOf(W.Player)) return;
    const info = Array.isArray(data.Dictionary) ? data.Dictionary[0] || {} : {};
    nekoPeers.set(memberNumber, {
      version: String(info.version || "unknown"),
      channel: String(info.channel || "stable"),
      tonePreset: String(info.tonePreset || ""),
      toneLabel: String(info.toneLabel || ""),
      noDisplayConvert: info.noDisplayConvert === true,
      time: Date.now(),
    });
    sendNekoPeerSignal(false);
  }

  function sendNekoPeerSignal(force) {
    if (W.CurrentScreen !== "ChatRoom" || typeof W.ServerSend !== "function" || !W.Player?.MemberNumber) return;
    const roomKey = String(W.ChatRoomData?.Name || W.ChatRoomData?.Background || W.CurrentScreen || "ChatRoom");
    const now = Date.now();
    if (roomKey !== lastPeerRoom) {
      lastPeerRoom = roomKey;
      lastPeerSignalAt = 0;
      badgeHitboxes.clear();
      characterAnchors.clear();
    }
    if (!force && now - lastPeerSignalAt < PEER_SIGNAL_INTERVAL) return;
    lastPeerSignalAt = now;
    try {
      W.ServerSend("ChatRoomChat", {
        Type: "Hidden",
        Content: PEER_SIGNAL_CONTENT,
        Sender: W.Player.MemberNumber,
        Dictionary: [{ mod: MOD_ID, version: VERSION, channel: "stable", noDisplayConvert: false }],
      });
    } catch (error) {
      console.warn("[BC Neko Enhancer] failed to send peer signal", error);
    }
  }

  function cleanupNekoPeers() {
    const now = Date.now();
    for (const [memberNumber, peer] of nekoPeers) {
      if (now - peer.time > PEER_TTL) nekoPeers.delete(memberNumber);
    }
    for (const [memberNumber, hitbox] of badgeHitboxes) {
      const active = memberNumber === memberNumberOf(W.Player) || nekoPeers.has(memberNumber);
      if (now - hitbox.time > 1200 || !active) badgeHitboxes.delete(memberNumber);
    }
    for (const [memberNumber, anchor] of characterAnchors) {
      if (now - anchor.time > 3000) characterAnchors.delete(memberNumber);
    }
  }

  function maybeSpawnAtmosphere(data, message) {
    if (!data || data.Type === "Hidden" || atmosphereMessages.has(data)) return;
    const type = data.Type;
    if (!["Chat", "Whisper", "Emote", "Action", "Activity"].includes(type)) return;
    const text = String(message || data.Content || "");
    if (!ATMOSPHERE_KEYWORDS.test(text)) return;
    atmosphereMessages.add(data);
    spawnAtmosphereForMember(data.Sender);
  }

  function spawnAtmosphereForMember(sender) {
    const memberNumber = memberNumberOf(sender);
    const anchor = characterAnchors.get(memberNumber) || characterAnchors.get(memberNumberOf(W.Player));
    if (!anchor) return;
    const icons = ["\uD83D\uDC3E", "\uD83D\uDC97", "\uD83D\uDC95"];
    const count = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      atmosphereParticles.push({
        text: icons[Math.floor(Math.random() * icons.length)],
        x: anchor.x + (Math.random() - 0.5) * 90 * anchor.zoom,
        y: anchor.y + (Math.random() - 0.5) * 30 * anchor.zoom,
        vx: (Math.random() - 0.5) * 0.18 * anchor.zoom,
        vy: -(0.55 + Math.random() * 0.35) * anchor.zoom,
        size: (22 + Math.random() * 10) * anchor.zoom,
        born: Date.now(),
        life: 1400 + Math.random() * 500,
      });
    }
    if (atmosphereParticles.length > 48) {
      atmosphereParticles.splice(0, atmosphereParticles.length - 48);
    }
  }

  function drawAtmosphereParticles() {
    if (!atmosphereParticles.length) return;
    const canvas = W.MainCanvas;
    if (!canvas || typeof canvas.save !== "function") return;
    const now = Date.now();
    for (let i = atmosphereParticles.length - 1; i >= 0; i--) {
      const particle = atmosphereParticles[i];
      const age = now - particle.born;
      if (age >= particle.life) {
        atmosphereParticles.splice(i, 1);
        continue;
      }
      const progress = age / particle.life;
      canvas.save();
      canvas.globalAlpha = Math.max(0, 1 - progress);
      canvas.font = `${Math.round(particle.size)}px "Segoe UI Emoji", "Noto Color Emoji", "Apple Color Emoji", sans-serif`;
      canvas.textAlign = "center";
      canvas.textBaseline = "middle";
      canvas.shadowColor = "rgba(255, 201, 40, 0.35)";
      canvas.shadowBlur = 6;
      canvas.fillText(particle.text, particle.x + particle.vx * age, particle.y + particle.vy * age);
      canvas.restore();
    }
  }

  function drawNekoBadgeTooltip() {
    cleanupNekoPeers();
    if (W.CurrentScreen !== "ChatRoom" || typeof W.MouseIn !== "function") return;
    for (const [memberNumber, hitbox] of badgeHitboxes) {
      if (!W.MouseIn(hitbox.x, hitbox.y, hitbox.w, hitbox.h)) continue;
      const peer = nekoPeers.get(memberNumber);
      const isSelf = memberNumber === memberNumberOf(W.Player);
      const version = isSelf ? VERSION : peer?.version || "unknown";
      const label = t(isSelf ? "peer.self" : "peer.other", { version });
      const width = Math.max(190, label.length * 18);
      const x = Math.max(10, Math.min(2000 - width - 10, hitbox.cx - width / 2));
      const y = Math.max(10, hitbox.cy + hitbox.h + 8);
      if (typeof W.DrawRect === "function") {
        W.DrawRect(x, y, width, 44, "#fff8dc");
      }
      if (typeof W.DrawTextFit === "function") {
        W.DrawTextFit(label, x + width / 2, y + 22, width - 16, "#7a5600", "#fff8dc");
      }
      break;
    }
  }

  function scheduleDecorateChat(delay = CHAT_BACKFILL_DECORATION_DELAY, force = false) {
    const now = Date.now();
    if (!force && now - lastDecorateFullScanAt < CHAT_BACKFILL_DECORATION_INTERVAL) return;
    clearTimeout(decorateTimer);
    decorateTimer = setTimeout(() => {
      decorateTimer = 0;
      if (document.hidden) return;
      if (!force && Date.now() - lastDecorateFullScanAt < CHAT_BACKFILL_DECORATION_INTERVAL) return;
      lastDecorateFullScanAt = Date.now();
      decorateExistingChat();
    }, delay);
  }

  function collectChatMessageNodes(root = null) {
    if (!root) return Array.from(document.querySelectorAll("#TextAreaChatLog .ChatMessage"));
    const nodes = [];
    if (root instanceof Element && root.classList?.contains("ChatMessage")) nodes.push(root);
    if (root.querySelectorAll) nodes.push(...root.querySelectorAll(".ChatMessage"));
    return nodes;
  }

  function decorateExistingChat(root = null) {
    let nodes = collectChatMessageNodes(root);
    if (!root && nodes.length > RECENT_CHAT_DECORATION_LIMIT) {
      nodes = nodes.slice(-RECENT_CHAT_DECORATION_LIMIT);
    }
    nodes.forEach((div) => {
      decorateMessage(div, {
        Type: div.className.match(/ChatMessage(Chat|Whisper|Emote|Action|Activity|ServerMessage|LocalMessage)/)?.[1],
        Sender: Number(div.dataset.sender),
      });
    });
  }

  function decorateAddedChatNode(node) {
    if (!(node instanceof Element)) return false;
    const nodes = collectChatMessageNodes(node);
    if (!nodes.length) return false;
    decorateExistingChat(node);
    return true;
  }

  function pawRain(type = "Chat") {
    const icons = type === "Whisper" ? ["💗", "🐾", "💌"] : type === "Emote" ? ["🐾", "💕", "ฅ"] : ["🐾", "💗", "💖"];
    const count = type === "Action" ? 12 : 20;
    for (let i = 0; i < count; i++) {
      const drop = document.createElement("span");
      drop.className = "bcn-rain-drop";
      drop.textContent = icons[Math.floor(Math.random() * icons.length)];
      drop.style.left = `${Math.random() * 96 + 2}vw`;
      drop.style.animationDuration = `${2.8 + Math.random() * 2.8}s`;
      drop.style.animationDelay = `${Math.random() * 0.45}s`;
      drop.style.fontSize = `${18 + Math.random() * 24}px`;
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 6500);
    }
  }

  function showToast(text) {
    let toast = document.getElementById("bcn-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "bcn-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = `♪ ${text}`;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function getChatInput() {
    return document.getElementById("InputChat")
      || document.querySelector("textarea[name='InputChat']")
      || document.querySelector("textarea")
      || document.querySelector("input[type='text']");
  }


  function sendNekoCommandNotice(lines, duration = 20000) {
    const text = Array.isArray(lines) ? lines.join("\n") : String(lines || "");
    if (!text) return false;
    try {
      if (typeof W.ChatRoomSendLocal === "function" && W.CurrentScreen === "ChatRoom") {
        W.ChatRoomSendLocal(text, duration);
        return true;
      }
    } catch {}
    showToast(text.split(/\n+/)[0]);
    return false;
  }

  function normalizeNekoHelpSection(section) {
    const raw = String(section || "").trim();
    const key = raw.toLowerCase();
    const aliases = {
      "": "main",
      help: "main",
      "\u5e2e\u52a9": "main",
      rp: "rp",
      "\u732b\u5a18rp": "rp",
      action: "action",
      "\u52a8\u4f5c": "action",
      escape: "escape",
      easy: "escape",
      pick: "escape",
      "\u9003\u8131": "escape",
      emoji: "emoji",
      kaomoji: "emoji",
      "\u989c\u6587\u5b57": "emoji",
      mode: "mode",
      "\u6a21\u5f0f": "mode",
      theme: "theme",
      "\u4e3b\u9898": "theme",
      spark: "spark",
      "\u7075\u611f": "spark",
      voice: "voice",
      sound: "voice",
      "\u58f0\u97f3": "voice",
      reactions: "reactions",
      reaction: "reactions",
      interactions: "reactions",
      "\u4e92\u52a8": "reactions",
      mood: "mood",
      state: "mood",
      "\u5fc3\u60c5": "mood",
      systems: "systems",
      system: "systems",
      profile: "systems",
      sensitivity: "systems",
      relation: "systems",
      status: "status",
      "\u72b6\u6001": "status",
    };
    return aliases[key] || aliases[raw] || "main";
  }

  function getNekoLibraryStatusLines() {
    cleanupNekoPeers();
    const enabledActions = (actionLibrary.actions || []).filter((action) => action.enabled !== false);
    const activeActions = getActiveActions();
    const visibleKaomojiGroups = getVisibleKaomojiGroups();
    const activeKaomojiItems = getActiveKaomojiItems();
    const selectedTarget = getSelectedTarget();
    const actionTargets = getActionTargets();
    const playerActionState = detectPlayerActionCapability();
    const cached = { actions: false, kaomoji: false };
    try {
      cached.actions = !!localStorage.getItem(actionLibraryCacheKey());
      cached.kaomoji = !!localStorage.getItem(KAOMOJI_LIBRARY_CACHE_KEY);
    } catch {
      // Ignore storage read failures; status should still be usable.
    }
    return {
      enabledActions,
      activeActions,
      visibleKaomojiGroups,
      activeKaomojiItems,
      selectedTarget,
      actionTargets,
      playerActionState,
      cached,
    };
  }

  function formatSelectedTargetStatus(target) {
    if (!target) return t("common.none");
    const number = target.MemberNumber ? "#" + target.MemberNumber : "";
    return getCharacterName(target) + (number ? " " + number : "");
  }

  function formatActionCapabilityStatus(state) {
    const posture = [];
    if (state?.kneeling) posture.push(t("status.posture.kneeling"));
    if (state?.lying) posture.push(t("status.posture.lying"));
    if (state?.suspended) posture.push(t("status.posture.suspended"));
    if (state?.restrained) posture.push(t("status.posture.restrained"));
    if (state?.helpless) posture.push(t("status.posture.helpless"));
    return t("status.capability", {
      hands: t(state?.handsFree ? "status.capability.available" : "status.capability.limited"),
      mouth: t(state?.mouthFree ? "status.capability.available" : "status.capability.limited"),
      move: t(state?.canMove ? "status.capability.move" : "status.capability.limited"),
      reach: t(state?.canReach ? "status.capability.move" : "status.capability.limited"),
      posture: posture.length ? posture.join("/") : t("status.posture.normal"),
    });
  }

  function getActionTargetModeLabel() {
    if (config.actionTargetMode === ACTION_TARGET_MODE.PICKER) return t("settings.target.picker");
    if (config.actionTargetMode === ACTION_TARGET_MODE.SELF) return t("settings.target.self");
    return t("settings.target.auto");
  }

  function isPlayerCharacter(character) {
    return !!character && !!W.Player && character.MemberNumber === W.Player.MemberNumber;
  }

  function isRestraintAppearanceItem(item) {
    const groupName = item?.Asset?.Group?.Name;
    return typeof groupName === "string" && groupName.startsWith("Item");
  }

  function getPlayerRestraintItems() {
    return (W.Player?.Appearance || []).filter(isRestraintAppearanceItem);
  }

  function refreshPlayerAppearance() {
    if (!W.Player) return;
    if (typeof W.CharacterRefresh === "function") W.CharacterRefresh(W.Player);
    if (W.CurrentScreen === "ChatRoom" && typeof W.ChatRoomCharacterUpdate === "function") {
      W.ChatRoomCharacterUpdate(W.Player);
    }
  }

  function refreshPlayerItemGroup(groupName) {
    if (!W.Player || !groupName) return;
    if (W.CurrentScreen === "ChatRoom" && typeof W.ChatRoomCharacterItemUpdate === "function") {
      W.ChatRoomCharacterItemUpdate(W.Player, groupName);
      return;
    }
    refreshPlayerAppearance();
  }

  function setEscapeSkillModifier(amount, durationMs) {
    if (!W.Player || typeof W.SkillSetModifier !== "function") return false;
    for (const skill of ESCAPE_SKILL_NAMES) {
      W.SkillSetModifier(W.Player, skill, amount, durationMs);
    }
    return true;
  }

  function unlockPlayerRestraints() {
    if (!W.Player || typeof W.InventoryUnlock !== "function") return 0;
    let unlocked = 0;
    for (const item of getPlayerRestraintItems()) {
      if (!item?.Asset?.AllowLock) continue;
      if (!item?.Property?.LockedBy) continue;
      try {
        W.InventoryUnlock(W.Player, item);
        unlocked += 1;
      } catch {}
    }
    if (unlocked > 0) refreshPlayerAppearance();
    return unlocked;
  }

  function lowerPlayerRestraintDifficulty(amount) {
    if (!W.Player) return 0;
    const value = Math.max(0, Math.min(99, Number(amount) || ESCAPE_DEFAULT_EASY_VALUE));
    let changed = 0;
    for (const item of getPlayerRestraintItems()) {
      const currentDifficulty = Number.isFinite(Number(item?.Difficulty))
        ? Number(item.Difficulty)
        : Number.isFinite(Number(item?.Property?.Difficulty))
          ? Number(item.Property.Difficulty)
          : 99;
      const nextDifficulty = Math.max(0, currentDifficulty - value);
      if (Number(item?.Difficulty) !== nextDifficulty) {
        item.Difficulty = nextDifficulty;
        changed += 1;
      }
      if (item?.Property && typeof item.Property === "object") {
        item.Property.Difficulty = nextDifficulty;
      }
    }
    if (changed > 0) refreshPlayerAppearance();
    return changed;
  }

  function leaveCurrentRoomNow() {
    let left = false;
    if (typeof W.ChatRoomLeave === "function") {
      W.ChatRoomLeave();
      left = true;
    }
    if (typeof W.CommonSetScreen === "function") {
      W.CommonSetScreen("Online", "ChatSearch");
      left = true;
    }
    return left;
  }

  function isEscapePickActive() {
    return escapePickExpiresAt > Date.now();
  }

  function clearEscapePickMode(message = "") {
    escapePickExpiresAt = 0;
    clearTimeout(escapePickTimer);
    escapePickTimer = 0;
    if (message) showToast(message);
  }

  function armEscapePickMode() {
    clearEscapePickMode();
    escapePickExpiresAt = Date.now() + ESCAPE_PICK_WINDOW_MS;
    escapePickTimer = setTimeout(() => {
      clearEscapePickMode(t("escape.toast.pickTimeout"));
    }, ESCAPE_PICK_WINDOW_MS + 80);
    showToast(t("escape.toast.pickArmed"));
  }

  function tryConsumeEscapePick() {
    if (!isEscapePickActive()) return false;
    const currentCharacter = W.CurrentCharacter;
    if (!isPlayerCharacter(currentCharacter)) return false;
    const groupName = currentCharacter?.FocusGroup?.Name || W.Player?.FocusGroup?.Name || W.DialogFocusItem?.Asset?.Group?.Name;
    if (!groupName || typeof W.InventoryGet !== "function" || typeof W.InventoryRemove !== "function") return false;
    const item = W.InventoryGet(W.Player, groupName);
    if (!item || !isRestraintAppearanceItem(item)) return false;
    W.InventoryRemove(W.Player, groupName);
    refreshPlayerItemGroup(groupName);
    if (typeof W.DialogLeave === "function") {
      try {
        W.DialogLeave();
      } catch {}
    }
    clearEscapePickMode();
    showToast(t("escape.toast.pickRemoved", { group: groupName }));
    return true;
  }

  function getEscapeStatusLines() {
    return tLines("escape.statusLines", {
      goddess: t(escapeGoddessMode ? "common.on" : "common.off"),
      pick: t(isEscapePickActive() ? "common.armed" : "common.idle"),
    });
  }

  function getEscapeHelpLines() {
    return tLines("escape.helpLines");
  }

  function handleEscapeSubcommand(parts) {
    const action = String(parts?.[0] || "status").toLowerCase();
    if (action === "release" || action === "unlock") {
      const unlocked = unlockPlayerRestraints();
      showToast(t(unlocked > 0 ? "escape.toast.unlocked" : "escape.toast.noLocked", { count: unlocked }));
      return true;
    }
    if (action === "boost") {
      if (!setEscapeSkillModifier(5, 3600000)) {
        showToast(t("escape.toast.boostUnavailable"));
        return true;
      }
      showToast(t("escape.toast.boostActive"));
      return true;
    }
    if (action === "leave") {
      if (!leaveCurrentRoomNow()) {
        showToast(t("escape.toast.leaveUnavailable"));
        return true;
      }
      return true;
    }
    if (action === "goddess") {
      const mode = String(parts?.[1] || "status").toLowerCase();
      if (mode === "on") {
        escapeGoddessMode = true;
        unlockPlayerRestraints();
        lowerPlayerRestraintDifficulty(99);
        if (!escapeGoddessBoostGranted) {
          escapeGoddessBoostGranted = setEscapeSkillModifier(10, 3600000);
        }
        showToast(t("escape.toast.goddessEnabled"));
        return true;
      }
      if (mode === "off") {
        escapeGoddessMode = false;
        showToast(t("escape.toast.goddessDisabled"));
        return true;
      }
      sendNekoCommandNotice(getEscapeStatusLines());
      return true;
    }
    if (action === "status") {
      sendNekoCommandNotice(getEscapeStatusLines());
      return true;
    }
    sendNekoCommandNotice(getEscapeHelpLines());
    return true;
  }

  function handleEasySubcommand(parts) {
    const amount = Math.max(0, Math.min(99, Number(parts?.[0]) || ESCAPE_DEFAULT_EASY_VALUE));
    const changed = lowerPlayerRestraintDifficulty(amount);
    showToast(t(changed > 0 ? "escape.toast.easyChanged" : "escape.toast.easyNone", { count: changed, amount }));
    return true;
  }

  function handlePickSubcommand() {
    armEscapePickMode();
    return true;
  }

  function getLegacyNekoStatusLines() {
    const speechState = detectPlayerGagState();
    const gagSuffix = speechState.gagged ? " (Lv." + speechState.gagLevel + ")" : "";
    const status = getNekoLibraryStatusLines();
    const pickLeft = isEscapePickActive()
      ? Math.max(0, Math.ceil((escapePickExpiresAt - Date.now()) / 1000)) + "s"
      : "\u672a\u5f00\u542f";
    return [
      "[\u732b\u5a18\u72b6\u6001] Bondage Club Neko Chat Enhancer v" + VERSION + " (\u6b63\u5f0f\u7248)",
      "\u732b\u5a18\u6a21\u5f0f\uff1a" + (config.enabled ? "\u5f00\u542f" : "\u5173\u95ed"),
      "\u53d1\u9001\u8f6c\u6362\uff1a" + (config.convertOutgoing ? "\u5f00" : "\u5173") + " | \u663e\u793a\u8f6c\u6362\uff1a" + (config.convertDisplayed ? "\u5f00" : "\u5173"),
      "\u804a\u5929\u88c5\u9970\uff1a" + (config.decorateChat ? "\u5f00" : "\u5173") + " | \u53d1\u9001\u732b\u722a\u96e8\uff1a" + (config.rainOnSend ? "\u5f00" : "\u5173") + " | \u65b0\u6d88\u606f\u63d0\u9192\uff1a" + (config.notifyIncoming ? "\u5f00" : "\u5173"),
      "\u5835\u5634\u8bf4\u8bdd\uff1a" + getSpeechModeLabel(speechState) + gagSuffix,
      "\u4e3b\u9898\uff1a" + (currentTheme().label || config.theme),
      "\u52a8\u4f5c\u76ee\u6807\uff1a" + getActionTargetModeLabel(),
      "\u5f53\u524d\u9009\u4e2d\uff1a" + formatSelectedTargetStatus(status.selectedTarget) + " | \u53ef\u4e92\u52a8\u76ee\u6807\uff1a" + status.actionTargets.length,
      "\u52a8\u4f5c\u5e93\uff1a" + status.activeActions.length + "/" + status.enabledActions.length + " \u5f53\u524d\u53ef\u7528 | \u8fc7\u6ee4\uff1a" + Math.max(0, status.enabledActions.length - status.activeActions.length) + " | \u7f13\u5b58\uff1a" + (status.cached.actions ? "\u6709" : "\u65e0") + " | v" + (actionLibrary.version || "unknown"),
      "\u52a8\u4f5c\u80fd\u529b\uff1a" + formatActionCapabilityStatus(status.playerActionState),
      "\u989c\u6587\u5b57\uff1a" + status.activeKaomojiItems.length + " \u4e2a | \u5206\u7ec4\uff1a" + status.visibleKaomojiGroups.length + "/" + ((kaomojiLibrary.groups || []).length) + " | \u7f13\u5b58\uff1a" + (status.cached.kaomoji ? "\u6709" : "\u65e0"),
      "\u540c\u63d2\u4ef6\u73a9\u5bb6\uff1a" + nekoPeers.size + " | SDK\uff1a" + (bcModApi ? "\u5df2\u6ce8\u518c" : "\u672a\u6ce8\u518c") + " | hooks\uff1a" + (patched ? "\u5df2\u63a5\u5165" : "\u672a\u63a5\u5165"),
      "\u547d\u4ee4\u6ce8\u518c\uff1a" + (nekoCommandsRegistered ? "\u5df2\u6ce8\u518c (" + (nekoCommandRegistrationSource || "unknown") + ")" : "\u8f93\u5165\u62e6\u622a\u515c\u5e95"),
      "\u9003\u8131\u8f85\u52a9\uff1apick " + pickLeft + " | goddess " + (escapeGoddessMode ? "ON" : "OFF"),
      "\u732b\u732b\u83dc\u5355\uff1a" + (config.menuCollapsed ? "\u5df2\u6536\u8d77" : "\u5df2\u5c55\u5f00") + " | \u5feb\u6377\u52a8\u4f5c\uff1a" + (config.quickWheel ? "\u5f00" : "\u5173"),
    ];
  }

  function getLegacyNekoHelpLines(section = "main") {
    switch (normalizeNekoHelpSection(section)) {
      case "rp":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / rp]",
          "\u8fd9\u4e00\u7c7b\u7528\u4e8e\u732b\u5a18 RP \u8bed\u6c14\u548c\u8f93\u51fa\u98ce\u683c\u3002",
          "\u6b63\u5f0f\u7248\u6682\u4e0d\u63d0\u4f9b /neko rp \u5207\u6362\u6307\u4ee4\uff0c\u4e3b\u8981\u4f7f\u7528\u666e\u901a\u732b\u5a18\u8f6c\u6362\u3002",
          "Bug \u7248\u63d0\u4f9b\u72ec\u7acb RP \u4eba\u8bbe\u5207\u6362\uff0c\u6d4b\u8bd5\u7248\u63d0\u4f9b\u72b6\u6001\u548c\u7075\u611f\u7cfb\u7edf\u3002",
          "\u5835\u5634\u72b6\u6001\u4f1a\u5728 RP \u8f6c\u6362\u4e4b\u540e\u518d\u505a\u538b\u5236\uff0c\u4fdd\u7559\u4eba\u8bbe\u5473\u9053\u3002",
        ];
      case "action":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / action]",
          "\u53f3\u4e0b\u89d2\u52a8\u4f5c\u732b\u732b\u53ef\u5feb\u901f\u53d1\u9001\u62b1\u62b1\u3001\u6478\u5934\u3001\u5582\u98df\u3001\u8d34\u8d34\u3001\u4eb2\u4eb2\u3002",
          "\u5f53\u524d\u76ee\u6807\u6a21\u5f0f\uff1a" + getActionTargetModeLabel(),
          "\u5de6\u952e\u4f18\u5148\u5bf9\u5f53\u524d\u9009\u4e2d\u76ee\u6807\u751f\u6548\uff0c\u83dc\u5355\u5c55\u5f00\u540e\u53ef\u5feb\u6377\u4f7f\u7528\u3002",
        ];
      case "escape":
        return getEscapeHelpLines();
      case "emoji":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / emoji]",
          "\u989c\u6587\u5b57\u732b\u732b\u53ef\u70b9\u51fb\u63d2\u5165\uff0c\u957f\u6309\u6253\u5f00\u989c\u6587\u5b57\u9009\u62e9\u5668\u3002",
          "\u989c\u6587\u5b57\u5e93\u4f1a\u8fdc\u7a0b\u52a0\u8f7d\uff0c\u5206\u7c7b\u66f4\u65b0\u540e\u5237\u65b0\u5373\u53ef\u751f\u6548\u3002",
        ];
      case "mode":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / mode]",
          "\u4e3b\u732b\u732b\u957f\u6309 10 \u79d2\u53ef\u5207\u6362\u732b\u5a18\u6a21\u5f0f\u3002",
          "\u5835\u5634\u8bf4\u8bdd\u8054\u52a8\u4f1a\u6839\u636e\u5f53\u524d\u5835\u5634\u7a0b\u5ea6\u81ea\u52a8\u538b\u7f29\u53e5\u5b50\u3002",
          "\u53d1\u9001\u8f6c\u6362\u3001\u63a5\u6536\u663e\u793a\u8f6c\u6362\u3001\u804a\u5929\u5ba4\u7f8e\u5316\u90fd\u53ef\u5728\u732b\u5a18\u8bbe\u7f6e\u9875\u8c03\u6574\u3002",
        ];
      case "theme":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / theme]",
          "\u5f53\u524d\u4e3b\u9898\uff1a" + (currentTheme().label || config.theme),
          "\u53ef\u7528\u4e3b\u9898\uff1a\u6a31\u7c89 / \u8584\u8377 / \u5929\u7a7a / \u5976\u6cb9 / \u858b\u8863\u8349 / \u767d\u8336\u3002",
          "\u4e3b\u9898\u53ef\u5728\u6269\u5c55\u7ec4\u4ef6\u8bbe\u7f6e\u9875\u5185\u5207\u6362\u3002",
        ];
      case "spark":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / spark]",
          "\u6d4b\u8bd5\u7248\u53ef\u7528\uff1a/neko spark \u4f1a\u6839\u636e\u6700\u8fd1\u804a\u5929\u3001\u9009\u4e2d\u76ee\u6807\u548c\u89d2\u8272\u72b6\u6001\u751f\u6210 RP \u7075\u611f\u77ed\u53e5\u3002",
          "\u6b63\u5f0f\u7248\u5f53\u524d\u672a\u542f\u7528 spark \u751f\u6210\u5668\uff0c\u5efa\u8bae\u5728\u6d4b\u8bd5\u7248\u9a8c\u8bc1\u7a33\u5b9a\u540e\u518d\u5408\u5165\u3002",
        ];
      case "voice":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / voice]",
          "\u6d4b\u8bd5\u7248\u53ef\u7528\uff1a/neko voice <text> \u672c\u5730\u89e6\u53d1 NekoVoice\uff0c[NekoVoice] <text> \u53ef\u4ece\u804a\u5929\u5185\u89e6\u53d1\u3002",
          "\u6548\u679c\u5305\u62ec *mew* / *purr* / *nyaa* \u89c6\u89c9\u58f0\u6548\u3001\u7c89\u8272\u95ea\u5149\u3001\u58f0\u6ce2\u5708\u3001\u5f39\u5e55\u53e3\u7656\u548c\u6c14\u606f\u7c92\u5b50\u3002",
          "\u6b63\u5f0f\u7248\u5f53\u524d\u672a\u542f\u7528 NekoVoice\uff0c\u907f\u514d\u89c6\u89c9\u5e72\u6270\u8fc7\u5f3a\u3002",
        ];
      case "reactions":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / reactions]",
          "\u6d4b\u8bd5\u7248\u53ef\u7528\uff1a/neko reactions \u67e5\u770b\u4e92\u52a8\u529f\u80fd\u7c7b\u76ee\uff0c/neko reactions <keyword> \u641c\u7d22\u89e6\u53d1\u7c7b\u76ee\u3002",
          "\u529f\u80fd\u5305\u62ec\u654f\u611f\u90e8\u4f4d\u53cd\u5e94\u3001\u5bf9\u65b9\u4e92\u52a8\u53cd\u5e94\u3001\u89d2\u8272\u72b6\u6001\u53cd\u5e94\u548c\u7c92\u5b50\u53cd\u9988\u3002",
          "\u6b63\u5f0f\u7248\u5f53\u524d\u4fdd\u7559\u57fa\u7840\u52a8\u4f5c\u8f6e\u76d8\uff0c\u672a\u542f\u7528 101 \u4e2a\u6d4b\u8bd5\u4e92\u52a8\u7c7b\u76ee\u3002",
        ];
      case "mood":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / mood]",
          "\u6d4b\u8bd5\u7248\u53ef\u7528\uff1a/neko mood \u67e5\u770b\u72b6\u6001\uff0c/neko mood \u9ad8\u5174 | \u4f24\u5fc3 | \u9ad8\u51b7 | \u9ecf\u4eba | \u56f0\u56f0 \u7b49\u53ef\u624b\u52a8\u5207\u6362\u3002",
          "\u72b6\u6001\u4f1a\u5f71\u54cd\u8bed\u6c14\u5c3e\u5df4\u3001\u7c92\u5b50\u548c\u4e92\u52a8\u53cd\u5e94\u3002",
          "\u6b63\u5f0f\u7248\u5f53\u524d\u672a\u542f\u7528\u72b6\u6001\u6301\u7eed\u7cfb\u7edf\u3002",
        ];
      case "systems":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / systems]",
          "\u6d4b\u8bd5\u7248\u53ef\u7528\uff1a/neko systems \u6216 /neko profile \u67e5\u770b\u654f\u611f\u5ea6\u6863\u6848\u3001\u5173\u7cfb\u6e29\u5ea6\u8ba1\u3001\u6301\u7eed\u72b6\u6001\u548c\u4e8b\u4ef6\u8ba1\u6570\u3002",
          "\u654f\u611f\u5ea6\uff1aear / tail / nape / chin / belly \u4f1a\u968f\u4e92\u52a8\u7d2f\u79ef\u3002",
          "\u5173\u7cfb\u6e29\u5ea6\uff1a\u5bf9\u65b9\u548c\u4f60\u4e92\u52a8\u8d8a\u591a\uff0cwarmth/trust/familiar \u8d8a\u9ad8\u3002",
          "\u6b63\u5f0f\u7248\u5f53\u524d\u672a\u542f\u7528\u8fd9\u4e9b\u5b9e\u9a8c\u7cfb\u7edf\u3002",
        ];
      case "status":
        return [
          "[\u732b\u5a18\u5e2e\u52a9 / status]",
          "\u4f7f\u7528 /neko status \u53ef\u67e5\u770b\u63d2\u4ef6\u5f00\u5173\u3001\u8f6c\u6362\u5f00\u5173\u3001\u804a\u5929\u88c5\u9970\u3001\u5835\u5634\u8bf4\u8bdd\u6863\u4f4d\u3001\u4e3b\u9898\u548c\u52a8\u4f5c\u76ee\u6807\u3002",
          "\u73b0\u5728\u4e5f\u4f1a\u663e\u793a\u52a8\u4f5c\u5e93\u3001\u989c\u6587\u5b57\u5e93\u3001\u5f53\u524d\u9009\u4e2d\u76ee\u6807\u3001\u540c\u63d2\u4ef6\u73a9\u5bb6\u3001SDK/hooks \u548c\u9003\u8131\u8f85\u52a9\u72b6\u6001\u3002",
        ];
      default:
        return [
          "[\u732b\u5a18\u547d\u4ee4\u5e2e\u52a9] /neko help <\u5206\u7c7b>",
          "\u6b63\u5f0f\u7248\u53ef\u7528\uff1arp / action / emoji / mode / theme / status / escape",
          "\u6d4b\u8bd5\u7248\u8bf4\u660e\uff1aspark / voice / reactions / mood / systems",
          "\u5feb\u6377\u4f8b\u5b50\uff1a/neko help status | /neko help action | /neko status",
        ];
    }
  }

  function getNekoStatusLines() {
    const speechState = detectPlayerGagState();
    const gagSuffix = speechState.gagged ? ` (Lv.${speechState.gagLevel})` : "";
    const status = getNekoLibraryStatusLines();
    const pickLeft = isEscapePickActive()
      ? `${Math.max(0, Math.ceil((escapePickExpiresAt - Date.now()) / 1000))}s`
      : t("status.pick.inactive");
    return tLines("status.lines", {
      version: VERSION,
      channel: t("channel.stable"),
      enabled: t(config.enabled ? "common.enabled" : "common.disabled"),
      outgoing: t(config.convertOutgoing ? "common.on" : "common.off"),
      displayed: t(config.convertDisplayed ? "common.on" : "common.off"),
      decorate: t(config.decorateChat ? "common.on" : "common.off"),
      rain: t(config.rainOnSend ? "common.on" : "common.off"),
      notify: t(config.notifyIncoming ? "common.on" : "common.off"),
      speech: getSpeechModeLabel(speechState),
      gagSuffix,
      theme: t(`theme.${config.theme}`),
      targetMode: getActionTargetModeLabel(),
      selectedTarget: formatSelectedTargetStatus(status.selectedTarget),
      actionTargetCount: status.actionTargets.length,
      activeActions: status.activeActions.length,
      enabledActions: status.enabledActions.length,
      filteredActions: Math.max(0, status.enabledActions.length - status.activeActions.length),
      actionCache: t(status.cached.actions ? "common.yes" : "common.no"),
      actionVersion: actionLibrary.version || "unknown",
      capability: formatActionCapabilityStatus(status.playerActionState),
      kaomojiItems: status.activeKaomojiItems.length,
      visibleGroups: status.visibleKaomojiGroups.length,
      totalGroups: (kaomojiLibrary.groups || []).length,
      kaomojiCache: t(status.cached.kaomoji ? "common.yes" : "common.no"),
      peerCount: nekoPeers.size,
      sdk: t(bcModApi ? "common.registered" : "common.unregistered"),
      hooks: t(patched ? "common.registered" : "common.unregistered"),
      commands: nekoCommandsRegistered
        ? t("status.command.registered", { source: nekoCommandRegistrationSource || "unknown" })
        : t("status.command.fallback"),
      pick: pickLeft,
      goddess: t(escapeGoddessMode ? "common.on" : "common.off"),
      menu: t(config.menuCollapsed ? "common.collapsed" : "common.expanded"),
      quickWheel: t(config.quickWheel ? "common.on" : "common.off"),
    });
  }

  function getNekoHelpLines(section = "main") {
    const group = normalizeNekoHelpSection(section);
    if (group === "escape") return getEscapeHelpLines();
    if (group === "action") {
      return tLines("help.action", { targetMode: getActionTargetModeLabel() });
    }
    if (group === "theme") {
      const themes = THEME_ORDER.map((id) => t(`theme.${id}`)).join(" / ");
      return tLines("help.theme", { theme: t(`theme.${config.theme}`), themes });
    }
    const key = ["rp", "emoji", "mode", "spark", "voice", "reactions", "mood", "systems", "status"]
      .includes(group) ? `help.${group}` : "help.main";
    return tLines(key);
  }

  function isNekoCommandText(text) {
    return typeof text === "string" && /^\/(?:neko|noke|bug)(?:\s|$)/i.test(text.trim());
  }

  function clearNekoCommandInput(text) {
    const input = getChatInput();
    if (input && input.value && input.value.trim() === String(text || "").trim()) {
      input.value = "";
      input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    }
  }

  function handleNekoCommand(text) {
    if (!isNekoCommandText(text)) return false;
    const parts = String(text || "").trim().split(/\s+/).filter(Boolean);
    const subcommand = String(parts[1] || "").toLowerCase();
    if (subcommand === "escape") return handleEscapeSubcommand(parts.slice(2));
    if (subcommand === "easy") return handleEasySubcommand(parts.slice(2));
    if (subcommand === "pick") return handlePickSubcommand();
    const group = normalizeNekoHelpSection(parts[1] || "help");
    if (group === "main") {
      sendNekoCommandNotice(getNekoHelpLines(parts[2] || "main"));
      return true;
    }
    if (group === "status") {
      sendNekoCommandNotice(getNekoStatusLines());
      return true;
    }
    sendNekoCommandNotice(getNekoHelpLines(group));
    return true;
  }

  function runNekoCommand(text) {
    if (!handleNekoCommand(text)) return false;
    clearNekoCommandInput(text);
    return true;
  }

  function getNekoCommandDefinitions() {
    const createAction = (prefix) => (argumentsString = "", message = "", args = []) => {
      const argv = Array.isArray(args) ? args : String(argumentsString || "").trim().split(/\s+/).filter(Boolean);
      runNekoCommand(`/${prefix} ${argv.join(" ")}`.trim());
    };
    return [
      {
        Tag: "neko",
        Description: t("command.description"),
        Action: createAction("neko"),
      },
      {
        Tag: "bug",
        Description: t("command.description"),
        Action: createAction("bug"),
      },
      {
        Tag: "noke",
        Description: t("command.description"),
        Action: createAction("noke"),
      },
    ];
  }

  function markNekoCommandsRegistered(source) {
    nekoCommandsRegistered = true;
    nekoCommandRegistrationSource = source;
    console.log(`[BC 猫娘增强] /neko 命令已注册喵~ (${source})`);
    return true;
  }

  function tryRegisterCommandsWithHost(host, hostName, commands) {
    if (!host || typeof host !== "object") return false;
    if (typeof host.registerCommand === "function") {
      for (const command of commands) host.registerCommand(command);
      return markNekoCommandsRegistered(`${hostName}.registerCommand`);
    }
    if (typeof host.addCommand === "function") {
      for (const command of commands) host.addCommand(command);
      return markNekoCommandsRegistered(`${hostName}.addCommand`);
    }
    if (typeof host.registerCommands === "function") {
      host.registerCommands(commands);
      return markNekoCommandsRegistered(`${hostName}.registerCommands`);
    }
    if (typeof host.addCommands === "function") {
      host.addCommands(commands);
      return markNekoCommandsRegistered(`${hostName}.addCommands`);
    }
    return false;
  }

  function tryRegisterExternalNekoCommands(commands) {
    const hosts = [
      ["BCX", W.BCX],
      ["BCX.commands", W.BCX?.commands],
      ["BCX.Command", W.BCX?.Command],
      ["bcx", W.bcx],
      ["bcx.commands", W.bcx?.commands],
      ["bcx.Command", W.bcx?.Command],
      ["EBCH", W.EBCH],
      ["EBCH.commands", W.EBCH?.commands],
      ["EBCH.Command", W.EBCH?.Command],
      ["ebch", W.ebch],
      ["ebch.commands", W.ebch?.commands],
      ["ebch.Command", W.ebch?.Command],
    ];
    for (const [hostName, host] of hosts) {
      try {
        if (tryRegisterCommandsWithHost(host, hostName, commands)) return true;
      } catch (error) {
        console.warn(`[BC 猫娘增强] ${hostName} 命令注册失败，继续尝试其它入口:`, error);
      }
    }
    return false;
  }

  function registerNekoCommands() {
    if (nekoCommandsRegistered) return true;
    const commands = getNekoCommandDefinitions();
    try {
      if (tryRegisterExternalNekoCommands(commands)) return true;
      if (typeof W.CommandCombine !== "function") return false;
      W.CommandCombine(commands);
      return markNekoCommandsRegistered("CommandCombine");
    } catch (error) {
      console.warn("[BC 猫娘增强] /neko 命令注册失败，保留输入拦截兜底:", error);
      return false;
    }
  }

  function insertKaomoji(face) {
    const input = getChatInput();
    if (!input) {
      showToast(t("toast.chatMissing"));
      return;
    }

    const oldValue = input.value || "";
    const start = Number.isFinite(input.selectionStart) ? input.selectionStart : oldValue.length;
    const end = Number.isFinite(input.selectionEnd) ? input.selectionEnd : oldValue.length;
    const insert = `${oldValue && !/\s$/.test(oldValue.slice(0, start)) ? " " : ""}${face}`;
    input.value = `${oldValue.slice(0, start)}${insert}${oldValue.slice(end)}`;
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    input.focus();
    if (typeof input.setSelectionRange === "function") {
      const pos = start + insert.length;
      input.setSelectionRange(pos, pos);
    }
    recordKaomojiUsage(face);
    showToast(t("toast.kaomojiInserted"));
  }

  function insertFace() {
    insertKaomoji(pickRandomKaomoji());
  }

  function toggleNekoMode(button) {
    config.enabled = !config.enabled;
    saveConfig();
    syncBodyState();
    const toggleButton = button || document.getElementById("bcn-toggle");
    if (toggleButton) {
      toggleButton.textContent = config.enabled ? "😺" : "😿";
      toggleButton.title = t(config.enabled ? "ui.mode.disable" : "ui.mode.enable");
    }
    showToast(t(config.enabled ? "toast.modeEnabled" : "toast.modeDisabled"));
  }

  function getCharacterName(character) {
    return W.CharacterNickname?.(character) || character?.Nickname || character?.Name || contentFallback().unknownCharacter;
  }

  function getSelectedTarget() {
    const current = W.CurrentCharacter;
    if (current && !current.IsPlayer?.()) return current;
    const target = W.ChatRoomCharacter?.find?.((c) => c.MemberNumber === W.ChatRoomTargetMemberNumber);
    return target || null;
  }

  function getActionTargets() {
    return (W.ChatRoomCharacter || [])
      .filter((c) => c && c.MemberNumber !== W.Player?.MemberNumber)
      .map((character) => ({
        character,
        name: getCharacterName(character),
        memberNumber: character.MemberNumber,
      }));
  }

  function inferActionRequirements(action) {
    const value = `${action?.id || ""} ${action?.label || ""}`.toLowerCase();
    if (/kiss|亲亲/.test(value)) return { needMouth: true, needReach: true, maxGagLevel: 1 };
    if (/cuddle|贴贴/.test(value)) return { needReach: true, needMobility: true };
    if (/hug|抱抱|pat|摸头|feed|喂食/.test(value)) return { needHands: true, needReach: true };
    return {};
  }

  function getActionRequirements(action) {
    const inferred = inferActionRequirements(action);
    const explicit = action?.requirements || {};
    return {
      needHands: "needHands" in explicit ? explicit.needHands === true : inferred.needHands === true,
      needMouth: "needMouth" in explicit ? explicit.needMouth === true : inferred.needMouth === true,
      needReach: "needReach" in explicit ? explicit.needReach === true : inferred.needReach === true,
      needMobility: "needMobility" in explicit ? explicit.needMobility === true : inferred.needMobility === true,
      maxGagLevel: Number.isFinite(Number(explicit.maxGagLevel)) ? Number(explicit.maxGagLevel) : inferred.maxGagLevel,
    };
  }

  function actionMeetsRequirements(action, state) {
    const requirements = getActionRequirements(action);
    if (requirements.needHands && !state.handsFree) return false;
    if (requirements.needMouth && !state.mouthFree) return false;
    if (requirements.needReach && !state.canReach) return false;
    if (requirements.needMobility && !state.canMove) return false;
    if (Number.isFinite(requirements.maxGagLevel) && state.gagLevel > requirements.maxGagLevel) return false;
    return true;
  }

  function chooseActionVariant(action, state, hasTarget) {
    const variants = action?.variants;
    if (!variants || !state) return null;
    const priority = ["helpless", "lying", "kneeling", "restrained", "gagged"];
    for (const key of priority) {
      if (!state[key]) continue;
      const variant = variants[key];
      if (!variant) continue;
      const lines = hasTarget ? variant.target : variant.self;
      if (Array.isArray(lines) && lines.some(Boolean)) return { key, lines };
    }
    return null;
  }

  function selectActionLine(action, target) {
    const hasTarget = !!target;
    const state = hasTarget ? detectCharacterState(target) : detectPlayerActionCapability();
    const variant = chooseActionVariant(action, state, hasTarget);
    if (variant) {
      return {
        line: pickRandomLine(
          variant.lines,
          hasTarget
            ? pickRandomLine(action.target, pickRandomLine(action.self, contentFallback().actionTargetFallback))
            : pickRandomLine(action.self, pickRandomLine(action.target, contentFallback().actionSelfFallback)),
        ),
        variantKey: variant.key,
      };
    }
    return {
      line: hasTarget
        ? pickRandomLine(action.target, pickRandomLine(action.self, contentFallback().actionTargetFallback))
        : pickRandomLine(action.self, pickRandomLine(action.target, contentFallback().actionSelfFallback)),
      variantKey: "",
    };
  }

  function getActiveActions() {
    const state = detectPlayerActionCapability();
    return (actionLibrary.actions || []).filter((action) => action.enabled !== false && actionMeetsRequirements(action, state));
  }

  function pickRandomLine(lines, fallback = "") {
    const cleanLines = Array.isArray(lines) ? lines.filter(Boolean) : [];
    if (!cleanLines.length) return fallback;
    return cleanLines[Math.floor(Math.random() * cleanLines.length)];
  }

  function formatActionText(action, target) {
    const hasTarget = !!target;
    const { line } = selectActionLine(action, target);
    return line.replace(/\{target\}/g, hasTarget ? getCharacterName(target) : contentFallback().nearbyTarget);
  }

  function loadComposerState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(COMPOSER_STATE_KEY) || "{}");
      return {
        last: parsed?.last && typeof parsed.last === "object" ? parsed.last : null,
        favorites: (Array.isArray(parsed?.favorites) ? parsed.favorites : []).slice(0, ACTION_COMPOSER_FAVORITE_LIMIT),
        recentHashes: (Array.isArray(parsed?.recentHashes) ? parsed.recentHashes : [])
          .map(String)
          .slice(0, ACTION_COMPOSER_RECENT_LIMIT),
      };
    } catch {
      return { last: null, favorites: [], recentHashes: [] };
    }
  }

  function saveComposerState() {
    try {
      localStorage.setItem(COMPOSER_STATE_KEY, JSON.stringify(composerState));
    } catch {
      // Composer choices still work for this page when persistent storage is unavailable.
    }
  }

  function composerComboKey(combo) {
    return [combo?.action, combo?.mood, combo?.style, combo?.target, combo?.extra].map((value) => String(value || "")).join("|");
  }

  function simpleHash(value) {
    let hash = 5381;
    for (const char of String(value)) hash = ((hash << 5) + hash) ^ char.codePointAt(0);
    return (hash >>> 0).toString(36);
  }

  function weightedPick(items) {
    const candidates = (Array.isArray(items) ? items : []).filter((item) => item && Number(item.weight || 1) > 0);
    if (!candidates.length) return null;
    const total = candidates.reduce((sum, item) => sum + Number(item.weight || 1), 0);
    let cursor = Math.random() * total;
    for (const item of candidates) {
      cursor -= Number(item.weight || 1);
      if (cursor <= 0) return item;
    }
    return candidates.at(-1);
  }

  function getComposerDefinition(action) {
    if (!action?.composer || !composerLibrary) return null;
    if (action.composer === true) return composerLibrary.actions?.[action.id] || null;
    if (typeof action.composer !== "object") return null;
    const styles = {};
    for (const [styleId, lines] of Object.entries(action.composer.styles || {})) {
      styles[styleId] = normalizeComposerModeLines(lines);
    }
    return {
      styles,
      incompatiblePairs: Array.isArray(action.composer.incompatiblePairs) ? action.composer.incompatiblePairs : [],
    };
  }

  function getComposerActions() {
    return (actionLibrary.actions || []).filter((action) => action.enabled !== false && getComposerDefinition(action));
  }

  function isComposerPairCompatible(definition, moodId, styleId) {
    return !(definition?.incompatiblePairs || []).some((pair) => pair.mood === moodId && pair.style === styleId);
  }

  function getCompatibleComposerMoods(action) {
    return (composerLibrary?.moods || []).filter((mood) => (
      !mood.compatibleActions.length || mood.compatibleActions.includes(action.id)
    ));
  }

  function getCompatibleComposerStyles(action, moodId) {
    const definition = getComposerDefinition(action);
    return (composerLibrary?.styles || []).filter((style) => (
      definition?.styles?.[style.id] && isComposerPairCompatible(definition, moodId, style.id)
    ));
  }

  function getCompatibleComposerExtras(action) {
    const state = detectPlayerActionCapability();
    return (composerLibrary?.extras || []).filter((extra) => (
      (!extra.compatibleActions.length || extra.compatibleActions.includes(action.id))
      && actionMeetsRequirements({ requirements: extra.requirements }, state)
    ));
  }

  function normalizeComposerSelection(action, selection = {}) {
    const moods = getCompatibleComposerMoods(action);
    const mood = moods.some((item) => item.id === selection.mood) ? selection.mood : moods[0]?.id;
    const styles = getCompatibleComposerStyles(action, mood);
    const style = styles.some((item) => item.id === selection.style) ? selection.style : styles[0]?.id;
    const extras = getCompatibleComposerExtras(action);
    const extra = extras.some((item) => item.id === selection.extra) ? selection.extra : extras.at(-1)?.id;
    const knownTarget = ["auto", "self", "none"].includes(selection.target)
      || /^member:\d+$/.test(String(selection.target || ""));
    return {
      action: action.id,
      mood,
      style,
      target: knownTarget ? selection.target : config.actionTargetMode === ACTION_TARGET_MODE.SELF ? "self" : "auto",
      extra,
    };
  }

  function resolveComposerTarget(targetId) {
    if (targetId === "self") return { mode: "self", target: null };
    if (targetId === "none") return { mode: "none", target: null };
    if (String(targetId).startsWith("member:")) {
      const memberNumber = Number(String(targetId).slice(7));
      const target = (W.ChatRoomCharacter || []).find((character) => Number(character?.MemberNumber) === memberNumber) || null;
      if (target) return { mode: "target", target };
    }
    const selected = getSelectedTarget();
    return selected ? { mode: "target", target: selected } : { mode: "none", target: null };
  }

  function normalizeComposedActionText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;!?，。！？])/g, "$1")
      .replace(/([,，]){2,}/g, "$1")
      .replace(/([。！？.!?])\1+/g, "$1")
      .trim();
  }

  function generateComposerPreview(action, selection, rememberHash = true) {
    const definition = getComposerDefinition(action);
    if (!definition || !composerLibrary) return null;
    const normalized = normalizeComposerSelection(action, selection);
    const mood = getCompatibleComposerMoods(action).find((item) => item.id === normalized.mood);
    const styleLines = definition.styles?.[normalized.style];
    const extra = getCompatibleComposerExtras(action).find((item) => item.id === normalized.extra);
    const resolvedTarget = resolveComposerTarget(normalized.target);
    const mode = resolvedTarget.mode;
    if (!mood || !styleLines || !extra) return null;

    let generated = null;
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const moodLead = weightedPick(mood.leads);
      const actionCore = weightedPick(styleLines[mode]);
      const extraTrail = extra.kind === "kaomoji"
        ? { id: `kaomoji-${attempt}`, text: ` ${pickRandomKaomoji()}`, weight: 1 }
        : weightedPick(extra.trails);
      const ending = weightedPick(composerLibrary.endings?.[mode]);
      const template = weightedPick(composerLibrary.templates?.[mode]);
      if (!moodLead || !actionCore || !extraTrail || !ending || !template) continue;
      const targetName = resolvedTarget.target ? getCharacterName(resolvedTarget.target) : "";
      const coreText = formatTemplate(actionCore.text, { target: targetName });
      const text = normalizeComposedActionText(formatTemplate(template.text, {
        moodLead: moodLead.text,
        actionCore: coreText,
        extraTrail: extraTrail.text,
        ending: ending.text,
      }));
      const hash = simpleHash([
        composerComboKey(normalized), mode, moodLead.id, actionCore.id, extraTrail.id, ending.id, template.id, text,
      ].join("|"));
      generated = { text, hash, selection: normalized, target: resolvedTarget.target, mode };
      if (!composerState.recentHashes.includes(hash)) break;
    }
    if (!generated) return null;
    if (generated.text.length > ACTION_MESSAGE_MAX_LENGTH) {
      generated.text = `${generated.text.slice(0, ACTION_MESSAGE_MAX_LENGTH - 1).trimEnd()}…`;
      generated.hash = simpleHash(generated.text);
    }
    if (rememberHash) {
      composerState.recentHashes = [generated.hash, ...composerState.recentHashes.filter((hash) => hash !== generated.hash)]
        .slice(0, ACTION_COMPOSER_RECENT_LIMIT);
      saveComposerState();
    }
    return generated;
  }

  function sendEmote(text) {
    const input = getChatInput();
    if (input && typeof W.ChatRoomSendChat === "function") {
      input.value = `*${text}*`;
      input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      W.ChatRoomSendChat();
      input.focus();
      return true;
    }
    navigator.clipboard?.writeText(`*${text}*`);
    showToast(t("toast.actionCopied"));
    return false;
  }

  function getComposerFavoriteLabel(combo) {
    const action = (actionLibrary.actions || []).find((item) => item.id === combo.action);
    const mood = composerLibrary?.moods?.find((item) => item.id === combo.mood);
    const style = composerLibrary?.styles?.find((item) => item.id === combo.style);
    return [action?.label || combo.action, mood?.label || combo.mood, style?.label || combo.style].filter(Boolean).join(" · ");
  }

  function getComposerAlternativeLabels(action) {
    const state = detectPlayerActionCapability();
    const actions = getComposerActions()
      .filter((candidate) => candidate.id !== action.id && actionMeetsRequirements(candidate, state))
      .slice(0, 3)
      .map((candidate) => candidate.label);
    if (actions.length) return actions;
    return (composerLibrary?.extras || [])
      .filter((extra) => ["tail", "ears", "purr", "eyes"].includes(extra.id))
      .slice(0, 3)
      .map((extra) => extra.label);
  }

  function renderComposerOptionGroup(dimension, label, options, selectedId) {
    return `
      <div class="bcn-composer-field">
        <div class="bcn-composer-label">${escapeHtml(label)}</div>
        <div class="bcn-composer-options">
          ${options.map((option) => `
            <button type="button" data-composer-option="${escapeHtml(dimension)}" data-value="${escapeHtml(option.id)}"
              class="${option.id === selectedId ? "is-selected" : ""}">${escapeHtml(option.label)}</button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function composerTargetOptions(selectedId) {
    const fixed = [
      { id: "auto", label: t("composer.target.auto") },
      { id: "self", label: t("composer.target.self") },
      { id: "none", label: t("composer.target.none") },
    ];
    const people = getActionTargets().map((item) => ({ id: `member:${item.memberNumber}`, label: item.name }));
    return [...fixed, ...people].map((option) => (
      `<option value="${escapeHtml(option.id)}"${option.id === selectedId ? " selected" : ""}>${escapeHtml(option.label)}</option>`
    )).join("");
  }

  function renderActionComposer() {
    const overlay = document.getElementById("bcn-action-composer-overlay");
    if (!overlay || !activeComposerSession) return;
    const action = activeComposerSession.action;
    activeComposerSession.selection = normalizeComposerSelection(action, activeComposerSession.selection);
    activeComposerSession.preview = generateComposerPreview(action, activeComposerSession.selection);
    const selection = activeComposerSession.selection;
    const actions = getComposerActions();
    const moods = getCompatibleComposerMoods(action);
    const styles = getCompatibleComposerStyles(action, selection.mood);
    const extras = getCompatibleComposerExtras(action);
    const reasons = getActionUnavailableReasons(action);
    const alternatives = reasons.length ? getComposerAlternativeLabels(action) : [];
    const favoriteKey = composerComboKey(selection);
    const isFavorite = composerState.favorites.some((item) => composerComboKey(item) === favoriteKey);
    const favorites = composerState.favorites
      .map((combo, index) => `<option value="${index}">${escapeHtml(getComposerFavoriteLabel(combo))}</option>`)
      .join("");

    overlay.innerHTML = `
      <section id="bcn-action-composer" role="dialog" aria-modal="true" aria-label="${escapeHtml(t("composer.title"))}">
        <header class="bcn-composer-header">
          <div>
            <div class="bcn-composer-title">${escapeHtml(t("composer.title"))}</div>
            <div class="bcn-composer-subtitle">${escapeHtml(t("composer.subtitle"))}</div>
          </div>
          <button type="button" class="bcn-composer-close" data-composer-command="close" aria-label="${escapeHtml(t("composer.close"))}">×</button>
        </header>
        <div class="bcn-composer-shortcuts">
          <button type="button" data-composer-command="recent"${composerState.last ? "" : " disabled"}>${escapeHtml(t("composer.recent"))}</button>
          <button type="button" data-composer-command="dice">🎲 ${escapeHtml(t("composer.dice"))}</button>
          <select id="bcn-composer-favorites"${favorites ? "" : " disabled"} aria-label="${escapeHtml(t("composer.favorites"))}">
            ${favorites || `<option>${escapeHtml(t("composer.noFavorites"))}</option>`}
          </select>
          <button type="button" data-composer-command="load-favorite"${favorites ? "" : " disabled"}>${escapeHtml(t("composer.loadFavorite"))}</button>
        </div>
        <div class="bcn-composer-scroll">
          ${renderComposerOptionGroup("action", t("composer.field.action"), actions, action.id)}
          ${renderComposerOptionGroup("mood", t("composer.field.mood"), moods, selection.mood)}
          ${renderComposerOptionGroup("style", t("composer.field.style"), styles, selection.style)}
          <label class="bcn-composer-field">
            <span class="bcn-composer-label">${escapeHtml(t("composer.field.target"))}</span>
            <select id="bcn-composer-target">${composerTargetOptions(selection.target)}</select>
          </label>
          ${renderComposerOptionGroup("extra", t("composer.field.extra"), extras, selection.extra)}
          ${reasons.length ? `
            <div class="bcn-composer-warning">
              <strong>${escapeHtml(t("composer.unavailableTitle", { action: action.label }))}</strong>
              <span>${escapeHtml(reasons.join(t("composer.requirement.separator")))}</span>
              ${alternatives.length ? `<span>${escapeHtml(t("composer.alternatives", { actions: alternatives.join(t("composer.requirement.separator")) }))}</span>` : ""}
            </div>
          ` : ""}
          <div class="bcn-composer-preview-label">${escapeHtml(t("composer.preview"))}</div>
          <div id="bcn-composer-preview">${escapeHtml(activeComposerSession.preview?.text || t("composer.previewUnavailable"))}</div>
        </div>
        <footer class="bcn-composer-footer">
          <button type="button" data-composer-command="reroll">${escapeHtml(t("composer.reroll"))}</button>
          <button type="button" data-composer-command="favorite">${escapeHtml(t(isFavorite ? "composer.unfavorite" : "composer.favorite"))}</button>
          <button type="button" class="bcn-composer-send" data-composer-command="send"${reasons.length || !activeComposerSession.preview ? " disabled" : ""}>${escapeHtml(t("composer.send"))}</button>
        </footer>
      </section>
    `;

    overlay.onclick = (event) => {
      const option = event.target.closest?.("[data-composer-option]");
      const commandButton = event.target.closest?.("[data-composer-command]");
      if (event.target === overlay) {
        if (Date.now() - activeComposerSession.openedAt < 500) return;
        hideActionComposer();
        return;
      }
      if (option) {
        const dimension = option.dataset.composerOption;
        const value = option.dataset.value;
        if (dimension === "action") {
          const nextAction = actions.find((item) => item.id === value);
          if (nextAction) {
            activeComposerSession.action = nextAction;
            activeComposerSession.selection = normalizeComposerSelection(nextAction, activeComposerSession.selection);
          }
        } else {
          activeComposerSession.selection[dimension] = value;
        }
        renderActionComposer();
        return;
      }
      if (!commandButton) return;
      const command = commandButton.dataset.composerCommand;
      if (command === "close") hideActionComposer();
      else if (command === "reroll") renderActionComposer();
      else if (command === "recent" && composerState.last) {
        const recentAction = actions.find((item) => item.id === composerState.last.action) || action;
        activeComposerSession.action = recentAction;
        activeComposerSession.selection = normalizeComposerSelection(recentAction, composerState.last);
        renderActionComposer();
      } else if (command === "dice") {
        const randomAction = actions[Math.floor(Math.random() * actions.length)] || action;
        const randomMoods = getCompatibleComposerMoods(randomAction);
        const mood = randomMoods[Math.floor(Math.random() * randomMoods.length)]?.id;
        const randomStyles = getCompatibleComposerStyles(randomAction, mood);
        const randomExtras = getCompatibleComposerExtras(randomAction);
        const targetIds = ["auto", "self", "none", ...getActionTargets().map((item) => `member:${item.memberNumber}`)];
        activeComposerSession.action = randomAction;
        activeComposerSession.selection = normalizeComposerSelection(randomAction, {
          mood,
          style: randomStyles[Math.floor(Math.random() * randomStyles.length)]?.id,
          extra: randomExtras[Math.floor(Math.random() * randomExtras.length)]?.id,
          target: targetIds[Math.floor(Math.random() * targetIds.length)],
        });
        renderActionComposer();
      } else if (command === "load-favorite") {
        const index = Number(document.getElementById("bcn-composer-favorites")?.value);
        const favorite = composerState.favorites[index];
        if (!favorite) return;
        const favoriteAction = actions.find((item) => item.id === favorite.action) || action;
        activeComposerSession.action = favoriteAction;
        activeComposerSession.selection = normalizeComposerSelection(favoriteAction, favorite);
        renderActionComposer();
      } else if (command === "favorite") {
        const key = composerComboKey(activeComposerSession.selection);
        const existing = composerState.favorites.findIndex((item) => composerComboKey(item) === key);
        if (existing >= 0) {
          composerState.favorites.splice(existing, 1);
          showToast(t("toast.composerUnfavorited"));
        } else {
          composerState.favorites = [{ ...activeComposerSession.selection }, ...composerState.favorites]
            .slice(0, ACTION_COMPOSER_FAVORITE_LIMIT);
          showToast(t("toast.composerFavorited"));
        }
        saveComposerState();
        renderActionComposer();
      } else if (command === "send" && activeComposerSession.preview) {
        const currentReasons = getActionUnavailableReasons(activeComposerSession.action);
        if (currentReasons.length) {
          showToast(formatActionUnavailableReason(activeComposerSession.action));
          renderActionComposer();
          return;
        }
        const preview = activeComposerSession.preview;
        composerState.last = { ...preview.selection };
        saveComposerState();
        if (sendEmote(preview.text) && config.rainOnSend) pawRain("Action");
        hideActionComposer();
      }
    };

    const targetSelect = document.getElementById("bcn-composer-target");
    if (targetSelect) {
      targetSelect.onchange = () => {
        activeComposerSession.selection.target = targetSelect.value;
        renderActionComposer();
      };
    }
  }

  function onComposerEscape(event) {
    if (event.key === "Escape") hideActionComposer();
  }

  function openActionComposer(action) {
    if (!getComposerDefinition(action)) {
      showToast(t("toast.composerUnavailable"));
      return false;
    }
    hideTargetPicker();
    hideKaomojiPicker();
    let overlay = document.getElementById("bcn-action-composer-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "bcn-action-composer-overlay";
      document.body.appendChild(overlay);
    }
    const seed = activeComposerSession?.action?.id === action.id
      ? activeComposerSession.selection
      : composerState.last?.action === action.id ? composerState.last : {};
    activeComposerSession = {
      action,
      selection: normalizeComposerSelection(action, seed),
      preview: null,
      openedAt: Date.now(),
    };
    document.addEventListener("keydown", onComposerEscape);
    renderActionComposer();
    return true;
  }

  function hideActionComposer() {
    document.removeEventListener("keydown", onComposerEscape);
    document.getElementById("bcn-action-composer-overlay")?.remove();
    activeComposerSession = null;
  }

  function sendQuickAction(action, target = undefined) {
    if (!action) return;
    if (!actionMeetsRequirements(action, detectPlayerActionCapability())) {
      showToast(formatActionUnavailableReason(action));
      renderWheel();
      return;
    }
    const selected = target === undefined ? getSelectedTarget() : target;
    if (config.actionTargetMode === ACTION_TARGET_MODE.PICKER && target === undefined) {
      showTargetPicker(action);
      return;
    }
    const finalTarget = config.actionTargetMode === ACTION_TARGET_MODE.SELF ? null : selected;
    if (sendEmote(formatActionText(action, finalTarget)) && config.rainOnSend) pawRain("Action");
  }

  function showTargetPicker(action, anchor) {
    hideTargetPicker();
    const targets = getActionTargets();
    if (!targets.length) {
      sendQuickAction(action, null);
      return;
    }

    const picker = document.createElement("div");
    picker.id = "bcn-target-picker";
    picker.innerHTML = `
      <div class="bcn-target-title">${t("targetPicker.title")}</div>
      <button type="button" data-self="1">${t("targetPicker.self")}</button>
      ${targets.map((target) => `<button type="button" data-member="${target.memberNumber}">${escapeHtml(target.name)}</button>`).join("")}
    `;
    document.body.appendChild(picker);

    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      picker.style.right = `${Math.max(14, window.innerWidth - rect.right)}px`;
      picker.style.bottom = `${Math.max(74, window.innerHeight - rect.top + 8)}px`;
    }

    picker.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const target = button.dataset.self
        ? null
        : targets.find((item) => String(item.memberNumber) === button.dataset.member)?.character || null;
      hideTargetPicker();
      sendQuickAction(action, target);
    });

    setTimeout(() => {
      document.addEventListener("pointerdown", closeTargetPickerOnOutside, { once: true });
    }, 0);
  }

  function closeTargetPickerOnOutside(event) {
    if (!event.target.closest?.("#bcn-target-picker")) hideTargetPicker();
  }

  function hideTargetPicker() {
    document.getElementById("bcn-target-picker")?.remove();
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function editActions() {
    const locale = config.contentLocale === "en" ? "en" : "zh-CN";
    window.open?.(`https://github.com/QAQMOON/meow-/blob/main/content/${locale}/actions.json`, "_blank", "noopener");
    showToast(t("toast.actionLibraryManaged"));
  }

  function bindWheelActionButton(button, action) {
    let holdTimer = 0;
    let holdTriggered = false;
    let startX = 0;
    let startY = 0;

    const cancelHold = () => {
      clearTimeout(holdTimer);
      holdTimer = 0;
      button.classList.remove("is-holding");
    };

    button.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      holdTriggered = false;
      startX = event.clientX;
      startY = event.clientY;
      cancelHold();
      if (!action.composer) return;
      button.classList.add("is-holding");
      holdTimer = setTimeout(() => {
        holdTriggered = true;
        cancelHold();
        openActionComposer(action);
      }, ACTION_COMPOSER_HOLD_MS);
    });

    button.addEventListener("pointermove", (event) => {
      if (!holdTimer) return;
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > ACTION_COMPOSER_MOVE_TOLERANCE) cancelHold();
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
      button.addEventListener(type, cancelHold);
    });

    button.addEventListener("click", (event) => {
      if (holdTriggered) {
        event.preventDefault();
        event.stopPropagation();
        holdTriggered = false;
        return;
      }
      sendQuickAction(action);
    });

    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (event.button !== 2) return;
      cancelHold();
      showTargetPicker(action, button);
    });
  }

  function renderWheel() {
    if (!shouldRenderWheel()) return;
    const wheel = document.getElementById("bcn-wheel");
    if (!wheel) return;
    wheel.innerHTML = "";
    const state = detectPlayerActionCapability();
    const actions = (actionLibrary.actions || []).filter((action) => action.enabled !== false).slice(0, 5);
    actions.forEach((action, index) => {
      const btn = document.createElement("button");
      btn.className = "bcn-wheel-btn";
      btn.type = "button";
      btn.textContent = action.label;
      const available = actionMeetsRequirements(action, state);
      btn.title = t(action.composer ? "wheel.actionComposerTooltip" : "wheel.actionTooltip", { label: action.label });
      btn.style.setProperty("--i", String(index));
      btn.classList.toggle("is-unavailable", !available);
      btn.setAttribute("aria-disabled", available ? "false" : "true");
      bindWheelActionButton(btn, action);
      wheel.appendChild(btn);
    });
    for (let index = actions.length; index < 6; index++) {
      const blank = document.createElement("span");
      blank.className = "bcn-wheel-blank";
      blank.style.setProperty("--i", String(index));
      wheel.appendChild(blank);
    }
  }

  function renderKaomojiPicker(force = false) {
    const picker = document.getElementById("bcn-kaomoji-picker");
    if (!picker) return;
    if (!force && !kaomojiPickerDirty && picker.dataset.bcnRendered === "1") return;
    const groups = getVisibleKaomojiGroups();
    if (activeKaomojiGroup !== "all" && !groups.some((group) => group.id === activeKaomojiGroup)) {
      activeKaomojiGroup = "all";
    }
    const items = getKaomojiItemsForGroup(activeKaomojiGroup);
    const tabs = [
      { id: "all", label: t("kaomoji.all") },
      ...groups.map((group) => ({ id: group.id, label: group.label })),
    ];

    picker.innerHTML = `
      <div class="bcn-kaomoji-tabs"></div>
      <div class="bcn-kaomoji-grid"></div>
    `;

    const tabWrap = picker.querySelector(".bcn-kaomoji-tabs");
    tabs.forEach((tab) => {
      const button = document.createElement("button");
      button.className = `bcn-kaomoji-tab${tab.id === activeKaomojiGroup ? " is-active" : ""}`;
      button.type = "button";
      button.textContent = tab.label;
      button.title = t("ui.kaomojiGroup.show", { group: tab.label });
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        activeKaomojiGroup = tab.id;
        renderKaomojiPicker(true);
        syncKaomojiPickerState(true);
      });
      tabWrap.appendChild(button);
    });

    const grid = picker.querySelector(".bcn-kaomoji-grid");
    items.forEach((face, index) => {
      const usageCount = getKaomojiUsage(face);
      const button = document.createElement("button");
      button.className = `bcn-kaomoji-item${usageCount ? " is-used" : ""}`;
      button.type = "button";
      button.textContent = face;
      button.title = usageCount ? t("ui.kaomojiUsage.count", { face, count: usageCount }) : face;
      button.style.setProperty("--i", String(index % 18));
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        insertKaomoji(face);
        hideKaomojiPicker();
      });
      grid.appendChild(button);
    });
    picker.dataset.bcnRendered = "1";
    kaomojiPickerDirty = false;
  }

  function showKaomojiPicker() {
    setWheelCollapsed(true);
    renderKaomojiPicker();
    syncKaomojiPickerState(true);
    document.removeEventListener("pointerdown", closeKaomojiPickerOnOutside);
    setTimeout(() => {
      document.addEventListener("pointerdown", closeKaomojiPickerOnOutside);
    }, 0);
  }

  function hideKaomojiPicker() {
    syncKaomojiPickerState(false);
    document.removeEventListener("pointerdown", closeKaomojiPickerOnOutside);
  }

  function toggleKaomojiPicker() {
    if (document.getElementById("bcn-kaomoji-picker")?.classList.contains("is-open")) {
      hideKaomojiPicker();
    } else {
      showKaomojiPicker();
    }
  }

  function closeKaomojiPickerOnOutside(event) {
    if (event.target?.closest?.("#bcn-kaomoji-picker, #bcn-face")) {
      return;
    }
    hideKaomojiPicker();
  }

  function bindKaomojiButton(button, dragState) {
    let longPressTimer = 0;
    let longPressTriggered = false;

    const clearLongPress = () => {
      clearTimeout(longPressTimer);
      longPressTimer = 0;
    };

    button.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      longPressTriggered = false;
      clearLongPress();
      longPressTimer = setTimeout(() => {
        if (dragState.hasMoved() || dragState.wasJustDragged()) return;
        longPressTriggered = true;
        showKaomojiPicker();
      }, 2000);
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
      button.addEventListener(type, clearLongPress);
    });

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (dragState.wasJustDragged() || longPressTriggered) {
        longPressTriggered = false;
        return;
      }
      toggleKaomojiPicker();
    });

    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      clearLongPress();
      pawRain("Chat");
    });
  }

  function syncWheelPosition(panel) {
    if (!panel) return;
    const hasSavedPos = Number.isFinite(config.wheelX) && Number.isFinite(config.wheelY);
    if (hasSavedPos) {
      const pos = clampPanelPosition(panel, config.wheelX, config.wheelY);
      config.wheelX = pos.left;
      config.wheelY = pos.top;
      panel.style.left = `${pos.left}px`;
      panel.style.top = `${pos.top}px`;
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      return;
    }
    panel.style.left = "auto";
    panel.style.top = "auto";
    panel.style.right = "18px";
    panel.style.bottom = "18px";
  }

  function clampPanelPosition(panel, left, top) {
    const maxLeft = Math.max(0, window.innerWidth - panel.offsetWidth - 6);
    const maxTop = Math.max(0, window.innerHeight - panel.offsetHeight - 6);
    return {
      left: Math.round(clamp(left, 6, maxLeft)),
      top: Math.round(clamp(top, 6, maxTop)),
    };
  }

  function setWheelCollapsed(collapsed) {
    config.wheelCollapsed = !!collapsed;
    saveConfig();
    syncBodyState();
    if (shouldRenderWheel()) renderWheel();
  }

  function toggleWheelCollapsed() {
    hideKaomojiPicker();
    setWheelCollapsed(!config.wheelCollapsed);
  }

  function setMenuCollapsed(collapsed) {
    config.menuCollapsed = !!collapsed;
    if (config.menuCollapsed) {
      config.wheelCollapsed = true;
      hideKaomojiPicker();
      document.removeEventListener("pointerdown", closeMenuOnOutside);
    }
    saveConfig();
    syncBodyState();
    if (shouldRenderWheel()) renderWheel();
    if (!config.menuCollapsed) {
      setTimeout(() => {
        document.addEventListener("pointerdown", closeMenuOnOutside);
      }, 0);
    }
  }

  function toggleMenuCollapsed() {
    setMenuCollapsed(!config.menuCollapsed);
  }

  function closeMenuOnOutside(event) {
    if (event.target?.closest?.("#bcn-panel")) return;
    setMenuCollapsed(true);
  }

  function makePanelDraggable(panel) {
    let dragging = false;
    let moved = false;
    let panelJustDragged = false;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;

    const stopDrag = () => {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove("is-dragging");
      if (moved) {
        panelJustDragged = true;
        saveConfig();
        setTimeout(() => {
          panelJustDragged = false;
        }, 150);
      }
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };

    const onMove = (event) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > 5) {
        moved = true;
        hideKaomojiPicker();
      }
      if (!moved) return;
      const pos = clampPanelPosition(panel, originLeft + dx, originTop + dy);
      panel.style.left = `${pos.left}px`;
      panel.style.top = `${pos.top}px`;
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      config.wheelX = pos.left;
      config.wheelY = pos.top;
      syncBodyState();
    };

    const onUp = () => {
      stopDrag();
    };

    panel.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      if (event.target?.closest?.("#bcn-wheel, #bcn-kaomoji-picker")) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      originLeft = panel.getBoundingClientRect().left;
      originTop = panel.getBoundingClientRect().top;
      panel.classList.add("is-dragging");
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    });

    return {
      isDragging: () => dragging,
      hasMoved: () => moved,
      wasJustDragged: () => panelJustDragged,
    };
  }

  function bindMainCatButton(button, dragState) {
    let longPressTimer = 0;
    let longPressTriggered = false;

    const clearLongPress = () => {
      clearTimeout(longPressTimer);
      longPressTimer = 0;
    };

    button.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      longPressTriggered = false;
      clearLongPress();
      longPressTimer = setTimeout(() => {
        if (dragState.hasMoved() || dragState.wasJustDragged()) return;
        longPressTriggered = true;
        toggleNekoMode();
      }, 10000);
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
      button.addEventListener(type, clearLongPress);
    });

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (dragState.wasJustDragged() || longPressTriggered) {
        longPressTriggered = false;
        return;
      }
      toggleMenuCollapsed();
    });

    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      showToast(t("toast.mainHoldHint"));
    });
  }

  function bindWheelButton(button, dragState) {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (dragState.wasJustDragged()) return;
      toggleWheelCollapsed();
    });

    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      showToast(t("toast.actionWheelHint"));
    });
  }

  function createPanel() {
    if (document.getElementById("bcn-panel")) return;

    const decor = document.createElement("div");
    decor.id = "bcn-soft-paws";
    decor.innerHTML = Array.from({ length: 18 }, (_, i) => {
      const icon = i % 3 === 0 ? "💗" : "🐾";
      const left = 3 + Math.random() * 92;
      const top = 4 + Math.random() * 88;
      const scale = 0.65 + Math.random() * 1.05;
      return `<span style="left:${left}%;top:${top}%;transform:scale(${scale})">${icon}</span>`;
    }).join("");
    document.body.appendChild(decor);

    const panel = document.createElement("div");
    panel.id = "bcn-panel";
    panel.innerHTML = `
      <button class="bcn-btn" id="bcn-main-cat" type="button" title="${t("ui.mainButton.title")}">🐱</button>
      <div id="bcn-submenu">
        <button class="bcn-btn" id="bcn-wheel-handle" type="button" title="${t("ui.wheel.open")}">🐱</button>
        <button class="bcn-btn" id="bcn-face" type="button" title="${t("ui.kaomojiButton.open")}">🐱</button>
      </div>
      <div class="bcn-wheel-wrap">
        <div id="bcn-wheel"></div>
      </div>
      <div id="bcn-kaomoji-picker" aria-label="${t("ui.kaomojiPicker.label")}"></div>
    `;
    document.body.appendChild(panel);

    const dragState = makePanelDraggable(panel);
    const mainButton = document.getElementById("bcn-main-cat");
    bindMainCatButton(mainButton, dragState);

    const faceButton = document.getElementById("bcn-face");
    bindKaomojiButton(faceButton, dragState);

    const handleButton = document.getElementById("bcn-wheel-handle");
    bindWheelButton(handleButton, dragState);

    syncWheelPosition(panel);
    renderWheel();
    syncBodyState();
  }

  function syncScreenClass() {
    if (!document.body) return;
    document.body.dataset.bcnScreen = W.CurrentScreen || "";
    document.body.classList.toggle("bcn-chatroom", W.CurrentScreen === "ChatRoom");
  }

  function getChatLogRoot() {
    return document.getElementById("TextAreaChatLog") || null;
  }

  function disconnectObserver() {
    if (chatObserver) {
      chatObserver.disconnect();
      chatObserver = null;
    }
    observerRoot = null;
  }

  function installObserver() {
    const nextRoot = getChatLogRoot();
    if (!nextRoot) {
      disconnectObserver();
      return false;
    }
    if (chatObserver && observerRoot === nextRoot) return true;
    disconnectObserver();
    chatObserver = new MutationObserver((mutations) => {
      if (document.hidden) return;
      let decorated = false;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes || []) {
          decorated = decorateAddedChatNode(node) || decorated;
        }
      }
      if (!decorated) scheduleDecorateChat();
    });
    chatObserver.observe(nextRoot, { childList: true });
    observerRoot = nextRoot;
    scheduleDecorateChat(0, true);
    return true;
  }

  function getActionUnavailableReasons(action, state = detectPlayerActionCapability()) {
    const requirements = getActionRequirements(action);
    const reasons = [];
    if (requirements.needHands && !state.handsFree) reasons.push(t("composer.requirement.hands"));
    if (requirements.needMouth && !state.mouthFree) reasons.push(t("composer.requirement.mouth"));
    if (requirements.needReach && !state.canReach) reasons.push(t("composer.requirement.reach"));
    if (requirements.needMobility && !state.canMove) reasons.push(t("composer.requirement.mobility"));
    if (Number.isFinite(requirements.maxGagLevel) && state.gagLevel > requirements.maxGagLevel) {
      reasons.push(t("composer.requirement.gag"));
    }
    return [...new Set(reasons)];
  }

  function formatActionUnavailableReason(action) {
    const reasons = getActionUnavailableReasons(action);
    return reasons.length
      ? t("toast.actionUnavailableReason", { reason: reasons.join(t("composer.requirement.separator")) })
      : t("toast.actionUnavailable");
  }

  function runMaintenance() {
    if (document.hidden) return;
    installObserver();
    patchStatusBadge();
    patchRoomEffects();
    registerSettingsUI();
    syncScreenClass();
    if (shouldRenderWheel()) renderWheel();
    scheduleDecorateChat();
  }

  function stopMaintenance() {
    clearTimeout(decorateTimer);
    decorateTimer = 0;
    if (maintenanceTimer) {
      clearInterval(maintenanceTimer);
      maintenanceTimer = 0;
    }
    disconnectObserver();
  }

  function startMaintenance() {
    if (maintenanceTimer) return;
    runMaintenance();
    maintenanceTimer = setInterval(runMaintenance, MAINTENANCE_INTERVAL);
  }

  function bindVisibilityLifecycle() {
    if (visibilityBound) return;
    visibilityBound = true;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopMaintenance();
        return;
      }
      startMaintenance();
    });
    window.addEventListener("focus", () => {
      if (!document.hidden) startMaintenance();
    });
    window.addEventListener("beforeunload", stopMaintenance, { once: true });
  }

  const NekoSettingsUI = (() => {
    const exitButton = { x: 1830, y: 62, w: 72, h: 72 };
    const localeButton = { x: 1610, y: 62, w: 190, h: 72 };
    const contentLocaleButton = { x: 1390, y: 62, w: 200, h: 72 };
    const slider = { x: 800, y: 356, w: 386, h: 14 };
    const cards = {
      left: { x: 62, y: 150, w: 610, h: 740 },
      middle: { x: 695, y: 150, w: 640, h: 740 },
      right: { x: 1360, y: 150, w: 580, h: 740 },
    };
    const featureRows = [
      { key: "convertOutgoing", y: 250, titleKey: "settings.convertOutgoing.title", descKey: "settings.convertOutgoing.description" },
      { key: "convertDisplayed", y: 348, titleKey: "settings.convertDisplayed.title", descKey: "settings.convertDisplayed.description" },
      { key: "decorateChat", y: 524, titleKey: "settings.decorateChat.title", descKey: "settings.decorateChat.description" },
      { key: "rainOnSend", y: 622, titleKey: "settings.rainOnSend.title", descKey: "settings.rainOnSend.description" },
      { key: "quickWheel", y: 720, titleKey: "settings.quickWheel.title", descKey: "settings.quickWheel.description" },
      { key: "notifyIncoming", y: 842, titleKey: "settings.notifyIncoming.title", descKey: "settings.notifyIncoming.description" },
    ];
    const enabledRow = { key: "enabled", x: 750, y: 250 };
    const targetButton = { x: 725, y: 660, w: 230, h: 78 };
    const actionButton = { x: 725, y: 775, w: 230, h: 78 };
    const themeRows = THEME_ORDER.map((id, index) => ({
      id,
      x: 1405,
      y: 286 + index * 92,
      w: 490,
      h: 72,
    }));

    function load() {
      hideTargetPicker();
    }

    function unload() {
      hideTargetPicker();
    }

    function exit() {
      hideTargetPicker();
    }

    function run() {
      try {
        drawSettingsBackground();
        drawHeader();
        drawFeatureCard();
        drawBehaviorCard();
        drawThemeCard();
      } catch (err) {
        console.error("[BCNekoSettings] render failed:", err);
      }
    }

    function click() {
      if (W.MouseIn?.(exitButton.x, exitButton.y, exitButton.w, exitButton.h)) {
        W.PreferenceExit?.();
        return;
      }

      if (W.MouseIn?.(localeButton.x, localeButton.y, localeButton.w, localeButton.h)) {
        cycleUiLocale();
        return;
      }

      if (W.MouseIn?.(contentLocaleButton.x, contentLocaleButton.y, contentLocaleButton.w, contentLocaleButton.h)) {
        void cycleContentLocale();
        return;
      }

      for (const row of featureRows) {
        if (W.MouseIn?.(104, row.y - 18, 42, 42)) {
          toggleConfig(row.key);
          return;
        }
      }

      if (W.MouseIn?.(slider.x - 12, slider.y - 28, slider.w + 130, 72)) {
        const mouseX = Number(W.MouseX ?? 0);
        config.nyanChance = clamp((mouseX - slider.x) / slider.w, 0, 1);
        saveConfig();
        return;
      }

      if (W.MouseIn?.(enabledRow.x, enabledRow.y - 18, 42, 42)) {
        toggleConfig("enabled");
        return;
      }

      if (W.MouseIn?.(targetButton.x, targetButton.y, targetButton.w, targetButton.h)) {
        cycleActionTargetMode();
        return;
      }

      if (W.MouseIn?.(actionButton.x, actionButton.y, actionButton.w, actionButton.h)) {
        editActions();
        return;
      }

      for (const row of themeRows) {
        if (W.MouseIn?.(row.x, row.y, row.w, row.h)) {
          config.theme = row.id;
          saveConfig();
          syncBodyState();
          showToast(t("toast.themeChanged", { theme: t(`theme.${row.id}`) }));
          return;
        }
      }
    }

    function drawSettingsBackground() {
      const canvas = getDrawCanvas();
      if (!canvas) return;
      const theme = currentTheme();
      canvas.save();
      const gradient = canvas.createLinearGradient(0, 0, 2000, 1000);
      gradient.addColorStop(0, lighten(theme.soft, 0.72));
      gradient.addColorStop(0.54, "#ffffff");
      gradient.addColorStop(1, theme.soft);
      canvas.fillStyle = gradient;
      canvas.fillRect(0, 0, 2000, 1000);
      roundedRect(canvas, 10, 10, 1980, 950, 54, "rgba(255,255,255,0.56)", theme.border, 2);
      write("🐾", 108, 92, 70, withAlpha(theme.icon, 0.14), 700, "center");
      write("🐾", 620, 105, 30, withAlpha(theme.icon, 0.82), 700, "center");
      write("🐾", 1280, 105, 30, withAlpha(theme.icon, 0.82), 700, "center");
      canvas.restore();
    }

    function drawHeader() {
      const theme = currentTheme();
      W.DrawButton?.(exitButton.x, exitButton.y, exitButton.w, exitButton.h, "", "White", "Icons/Exit.png", t("settings.back"));
      W.DrawButton?.(
        contentLocaleButton.x,
        contentLocaleButton.y,
        contentLocaleButton.w,
        contentLocaleButton.h,
        contentLocaleButtonLabel(),
        "White",
        "",
        t("settings.contentLocale.tooltip"),
      );
      W.DrawButton?.(
        localeButton.x,
        localeButton.y,
        localeButton.w,
        localeButton.h,
        uiLocaleButtonLabel(),
        "White",
        "",
        t("settings.uiLocale.tooltip"),
      );
      write("🐾", 690, 92, 42, theme.icon, 700, "center");
      writeFit(t("settings.header"), 1000, 91, 660, 48, 30, theme.text, 800, "center");
      write("🐾", 1310, 92, 42, theme.icon, 700, "center");
      write(`v${VERSION}`, 1210, 134, 22, theme.muted, 700, "left");
    }

    function drawFeatureCard() {
      const theme = currentTheme();
      drawCard(cards.left);
      drawCardTitle(cards.left.x + 62, cards.left.y + 60, "💬", t("settings.title.tone"));
      drawFeatureRow(featureRows[0], theme);
      drawFeatureRow(featureRows[1], theme);
      drawDivider(cards.left.x + 32, 444, cards.left.w - 64);
      drawCardTitle(cards.left.x + 62, 493, "🐾", t("settings.title.chat"));
      drawFeatureRow(featureRows[2], theme);
      drawFeatureRow(featureRows[3], theme);
      drawFeatureRow(featureRows[4], theme);
      drawDivider(cards.left.x + 32, 788, cards.left.w - 64);
      drawCardTitle(cards.left.x + 62, 835, "🔔", t("settings.title.notifications"));
      drawFeatureRow(featureRows[5], theme);
    }

    function drawBehaviorCard() {
      const theme = currentTheme();
      const percent = Math.round(config.nyanChance * 100);
      drawCard(cards.middle);
      drawCardTitle(cards.middle.x + 62, cards.middle.y + 60, "⚙", t("settings.title.behavior"));

      drawCheckBox(enabledRow.x, enabledRow.y, !!config.enabled);
      writeFit(t("settings.enabled.title"), enabledRow.x + 70, enabledRow.y + 2, 500, 24, 18, theme.text, 700);
      writeFit(t(config.enabled ? "settings.enabled.on" : "settings.enabled.off"), enabledRow.x + 70, enabledRow.y + 38, 500, 18, 14, theme.muted, 500);

      drawSlider();
      write(`${percent}%`, slider.x + slider.w + 48, slider.y + 5, 25, theme.accent, 700, "left");
      writeFit(t("settings.nyanChance.title"), cards.middle.x + 40, 447, cards.middle.w - 80, 23, 17, theme.text, 700);
      writeFit(t("settings.nyanChance.description"), cards.middle.x + 40, 485, cards.middle.w - 80, 18, 14, theme.muted, 500);

      roundedRect(getDrawCanvas(), cards.middle.x + 30, 540, cards.middle.w - 60, 108, 16, withAlpha(theme.soft, 0.9), theme.border, 2);
      write(t("settings.nyanChance.sample"), cards.middle.x + 60, 581, 28, theme.accent, 800);
      writeFit(t("settings.nyanChance.preview"), cards.middle.x + 60, 622, cards.middle.w - 190, 18, 14, theme.muted, 500);
      write("ฅ^•ω•^ฅ", cards.middle.x + cards.middle.w - 52, 590, 44, theme.accent, 800, "right");

      drawLargeButton(targetButton, "◎", targetModeLabel());
      writeFit(t("settings.target.title"), targetButton.x + 265, targetButton.y + 24, 320, 22, 16, theme.accent, 800);
      writeFit(t("settings.target.description"), targetButton.x + 265, targetButton.y + 59, 320, 17, 13, theme.muted, 500);

      drawLargeButton(actionButton, "⚡", t("settings.actions.button"));
      writeFit(t("settings.actions.source"), actionButton.x + 265, actionButton.y + 24, 320, 18, 13, theme.muted, 500);
      writeFit(t("settings.actions.fallback"), actionButton.x + 265, actionButton.y + 56, 320, 18, 13, theme.muted, 500);
    }

    function drawThemeCard() {
      const theme = currentTheme();
      drawCard(cards.right);
      drawCardTitle(cards.right.x + 62, cards.right.y + 60, "🎨", t("settings.title.theme"));
      writeFit(t("settings.theme.choose"), cards.right.x + 105, cards.right.y + 103, 420, 17, 13, theme.muted, 500);

      themeRows.forEach((row) => {
        const option = THEME_PRESETS[row.id];
        const selected = config.theme === row.id;
        roundedRect(getDrawCanvas(), row.x, row.y, row.w, row.h, 16, selected ? withAlpha(option.soft, 0.86) : "rgba(255,255,255,0.82)", selected ? option.accent : "#e8e8e8", selected ? 3 : 1);
        write("🐾", row.x + 48, row.y + row.h / 2 + 1, 31, option.icon, 700, "center");
        writeFit(t(`theme.${row.id}`), row.x + 90, row.y + row.h / 2 + 1, 330, 24, 17, selected ? option.text : "#2f2f2f", selected ? 800 : 600);
        if (selected) {
          circle(getDrawCanvas(), row.x + row.w - 16, row.y + 2, 20, option.accent, option.accent, 0);
          write("✓", row.x + row.w - 16, row.y + 3, 24, "#fff", 900, "center");
        }
      });
      writeFit(t("settings.theme.saved"), cards.right.x + 48, cards.right.y + cards.right.h - 62, cards.right.w - 96, 18, 13, theme.muted, 500);
    }

    function drawFeatureRow(row, theme) {
      drawCheckBox(104, row.y, !!config[row.key]);
      writeFit(t(row.titleKey), 172, row.y + 2, 450, 23, 16, theme.text, 700);
      writeWrapped(t(row.descKey), 172, row.y + 36, 450, 18, 23, theme.muted, 500, 2);
    }

    function drawSlider() {
      const canvas = getDrawCanvas();
      if (!canvas) return;
      const theme = currentTheme();
      canvas.save();
      roundedRect(canvas, slider.x, slider.y, slider.w, slider.h, 999, withAlpha(theme.accent, 0.28), "transparent", 0);
      roundedRect(canvas, slider.x, slider.y, slider.w * config.nyanChance, slider.h, 999, theme.accent, "transparent", 0);
      circle(canvas, slider.x + slider.w * config.nyanChance, slider.y + slider.h / 2, 17, "#fff", theme.accent, 3);
      canvas.restore();
    }

    function drawCard(rect) {
      const theme = currentTheme();
      roundedRect(getDrawCanvas(), rect.x, rect.y, rect.w, rect.h, 28, "rgba(255,255,255,0.78)", withAlpha(theme.border, 0.78), 1.5);
      shadowHint(rect.x, rect.y, rect.w, rect.h, theme.glow);
    }

    function drawCardTitle(x, y, icon, title) {
      const theme = currentTheme();
      write(icon, x - 5, y, 34, theme.icon, 800, "center");
      write(title, x + 40, y, 28, theme.accent, 800);
    }

    function drawLargeButton(rect, icon, label) {
      const theme = currentTheme();
      roundedRect(getDrawCanvas(), rect.x, rect.y, rect.w, rect.h, 14, withAlpha(theme.soft, 0.76), theme.border, 1.5);
      write(icon, rect.x + 45, rect.y + rect.h / 2 + 1, 32, theme.icon, 800, "center");
      write(label, rect.x + 85, rect.y + rect.h / 2 + 1, 24, theme.text, 800);
    }

    function drawCheckBox(x, y, checked) {
      const theme = currentTheme();
      roundedRect(getDrawCanvas(), x, y - 18, 40, 40, 8, checked ? theme.accent : "#fff", checked ? theme.accent : theme.border, 2);
      if (checked) write("✓", x + 20, y + 2, 32, "#fff", 900, "center");
    }

    function drawDivider(x, y, w) {
      const canvas = getDrawCanvas();
      if (!canvas) return;
      const theme = currentTheme();
      canvas.save();
      canvas.strokeStyle = withAlpha(theme.border, 0.7);
      canvas.lineWidth = 2;
      canvas.beginPath();
      canvas.moveTo(x, y);
      canvas.lineTo(x + w, y);
      canvas.stroke();
      canvas.restore();
    }

    function shadowHint(x, y, w, h, color) {
      const canvas = getDrawCanvas();
      if (!canvas) return;
      canvas.save();
      canvas.shadowColor = color;
      canvas.shadowBlur = 18;
      canvas.shadowOffsetY = 8;
      canvas.strokeStyle = "rgba(255,255,255,0.1)";
      canvas.strokeRect(x + 2, y + 2, w - 4, h - 4);
      canvas.restore();
    }

    function roundedRect(canvas, x, y, w, h, radius, fill, stroke, lineWidth = 1) {
      if (!canvas) return;
      const r = Math.min(radius, w / 2, h / 2);
      canvas.save();
      canvas.beginPath();
      canvas.moveTo(x + r, y);
      canvas.lineTo(x + w - r, y);
      canvas.quadraticCurveTo(x + w, y, x + w, y + r);
      canvas.lineTo(x + w, y + h - r);
      canvas.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      canvas.lineTo(x + r, y + h);
      canvas.quadraticCurveTo(x, y + h, x, y + h - r);
      canvas.lineTo(x, y + r);
      canvas.quadraticCurveTo(x, y, x + r, y);
      canvas.closePath();
      if (fill && fill !== "transparent") {
        canvas.fillStyle = fill;
        canvas.fill();
      }
      if (stroke && stroke !== "transparent" && lineWidth > 0) {
        canvas.strokeStyle = stroke;
        canvas.lineWidth = lineWidth;
        canvas.stroke();
      }
      canvas.restore();
    }

    function circle(canvas, x, y, radius, fill, stroke, lineWidth = 1) {
      if (!canvas) return;
      canvas.save();
      canvas.beginPath();
      canvas.arc(x, y, radius, 0, Math.PI * 2);
      if (fill) {
        canvas.fillStyle = fill;
        canvas.fill();
      }
      if (stroke && lineWidth > 0) {
        canvas.strokeStyle = stroke;
        canvas.lineWidth = lineWidth;
        canvas.stroke();
      }
      canvas.restore();
    }

    function write(text, x, y, size, color, weight = 500, align = "left") {
      const canvas = getDrawCanvas();
      if (!canvas) return;
      canvas.save();
      canvas.font = `${weight} ${size}px Arial, "Microsoft YaHei", sans-serif`;
      canvas.textAlign = align;
      canvas.textBaseline = "middle";
      canvas.fillStyle = color;
      canvas.fillText(text, x, y);
      canvas.restore();
    }

    function writeFit(text, x, y, maxWidth, size, minSize, color, weight = 500, align = "left") {
      const canvas = getDrawCanvas();
      if (!canvas) return;
      const value = String(text || "");
      let fittedSize = size;
      canvas.save();
      while (fittedSize > minSize) {
        canvas.font = `${weight} ${fittedSize}px Arial, "Microsoft YaHei", sans-serif`;
        if (canvas.measureText(value).width <= maxWidth) break;
        fittedSize -= 1;
      }
      canvas.restore();
      write(value, x, y, fittedSize, color, weight, align);
    }

    function writeWrapped(text, x, y, maxWidth, size, lineHeight, color, weight = 500, maxLines = 2) {
      const canvas = getDrawCanvas();
      if (!canvas) return;
      const value = String(text || "");
      const tokens = /\s/.test(value) ? value.split(/(\s+)/).filter(Boolean) : Array.from(value);
      const lines = [];
      let line = "";
      canvas.save();
      canvas.font = `${weight} ${size}px Arial, "Microsoft YaHei", sans-serif`;
      for (const token of tokens) {
        const candidate = `${line}${token}`;
        if (line && canvas.measureText(candidate).width > maxWidth) {
          lines.push(line.trimEnd());
          line = token.trimStart();
          if (lines.length === maxLines) break;
        } else {
          line = candidate;
        }
      }
      if (lines.length < maxLines && line) lines.push(line.trim());
      if (lines.length === maxLines) {
        let last = lines[maxLines - 1];
        while (last && canvas.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1);
        if (last !== value) lines[maxLines - 1] = `${last.trimEnd()}…`;
      }
      canvas.restore();
      lines.slice(0, maxLines).forEach((item, index) => {
        write(item, x, y + index * lineHeight, size, color, weight);
      });
    }

    return { load, run, click, unload, exit };
  })();

  function registerSettingsUI() {
    if (settingsRegistered || typeof W.PreferenceRegisterExtensionSetting !== "function") return false;
    W.PreferenceRegisterExtensionSetting({
      Identifier: MOD_ID,
      ButtonText: t("settings.button"),
      Image: "Icons/Chat.png",
      load: () => NekoSettingsUI.load(),
      run: () => NekoSettingsUI.run(),
      click: () => NekoSettingsUI.click(),
      unload: () => NekoSettingsUI.unload(),
      exit: () => NekoSettingsUI.exit(),
    });
    settingsRegistered = true;
    console.log("[BC 猫娘增强] 扩展组件设置页已注册");
    return true;
  }

  function cycleActionTargetMode() {
    const modes = [ACTION_TARGET_MODE.AUTO, ACTION_TARGET_MODE.PICKER, ACTION_TARGET_MODE.SELF];
    const index = modes.indexOf(config.actionTargetMode);
    config.actionTargetMode = modes[(index + 1) % modes.length];
    saveConfig();
  }

  function targetModeLabel() {
    if (config.actionTargetMode === ACTION_TARGET_MODE.PICKER) return t("settings.target.picker");
    if (config.actionTargetMode === ACTION_TARGET_MODE.SELF) return t("settings.target.self");
    return t("settings.target.auto");
  }

  function uiLocaleButtonLabel() {
    if (config.uiLocale === "auto") {
      return t("settings.uiLocale.button", { locale: t("settings.uiLocale.auto") });
    }
    const name = UI_MESSAGES[config.uiLocale]?.["locale.name"] || config.uiLocale;
    return t("settings.uiLocale.button", { locale: name });
  }

  function cycleUiLocale() {
    const locales = ["auto", "zh-CN", "en"];
    const current = locales.indexOf(config.uiLocale);
    setUiLocale(locales[(current + 1) % locales.length]);
  }

  function contentLocaleButtonLabel() {
    return t("settings.contentLocale.button", {
      locale: t(`settings.contentLocale.${config.contentLocale}`),
    });
  }

  async function cycleContentLocale() {
    const next = config.contentLocale === "zh-CN" ? "en" : "zh-CN";
    await setContentLocale(next);
    showToast(t("toast.contentLocaleChanged", {
      locale: t(`settings.contentLocale.${config.contentLocale}`),
    }));
  }

    function drawText(text, x, y, color, backColor = "", size = 28) {
      const canvas = getDrawCanvas();
      if (!canvas || typeof W.DrawText !== "function") return;
      const prevFont = canvas.font;
      const nextFont = typeof prevFont === "string" && /\d+px/.test(prevFont)
        ? prevFont.replace(/\d+px/, `${Math.round(size * 1.2)}px`)
        : `${Math.round(size * 1.2)}px Arial`;
      canvas.font = nextFont;
      W.DrawText(text, x, y, color, backColor);
      canvas.font = prevFont;
    }

    function drawLabel(text, x, y, maxWidth, color, size = 24) {
      const canvas = getDrawCanvas();
      if (!canvas || typeof W.DrawTextFit !== "function") return;
      const prevAlign = canvas.textAlign;
      const prevFont = canvas.font;
      canvas.textAlign = "left";
      const nextFont = typeof prevFont === "string" && /\d+px/.test(prevFont)
        ? prevFont.replace(/\d+px/, `${Math.round(size * 1.2)}px`)
        : `${Math.round(size * 1.2)}px Arial`;
      canvas.font = nextFont;
      W.DrawTextFit(text, x, y, maxWidth, color);
      canvas.textAlign = prevAlign;
      canvas.font = prevFont;
    }

    function getDrawCanvas() {
      const canvas = W.MainCanvas;
      if (canvas && typeof canvas.save === "function" && typeof canvas.restore === "function") return canvas;
      if (canvas && typeof canvas.getContext === "function") {
        const ctx = canvas.getContext("2d");
        if (ctx && typeof ctx.save === "function") return ctx;
      }
      const el = document.getElementById("MainCanvas");
      const ctx = el?.getContext?.("2d");
      if (ctx && typeof ctx.save === "function") return ctx;
      return null;
    }

  function sectionTitle(text, x, y) {
    drawText(`— ${text} —`, x, y, "#e84f91", "#ffe1ed", 30);
  }

  function drawButton(x, y, w, h, text, color) {
    W.DrawButton?.(x, y, w, h, text, color, "", "");
  }

  function installStyles() {
    addStyle(`
      body {
        --bcn-soft: #fff1f6;
        --bcn-panel: #ffffff;
        --bcn-accent: #f65086;
        --bcn-border: #ffd4e2;
        --bcn-text: #8a3f5b;
        --bcn-muted: #9d7a86;
        --bcn-icon: #f65086;
        --bcn-glow: rgba(246, 80, 134, 0.22);
      }

      body.bcn-enabled #MainCanvas {
        filter: saturate(1.06) brightness(1.03);
      }

      #bcn-soft-paws {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 8;
        overflow: hidden;
      }

      body:not(.bcn-enabled) #bcn-soft-paws {
        display: none !important;
      }

      #bcn-soft-paws span {
        position: absolute;
        opacity: 0.14;
        color: var(--bcn-icon);
        font-size: 54px;
        text-shadow: 0 8px 24px var(--bcn-glow);
      }

      #bcn-panel {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 100000;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        width: fit-content;
        height: fit-content;
        padding: 6px 8px;
        border: 2px solid var(--bcn-border);
        border-radius: 16px;
        background: var(--bcn-panel);
        box-shadow: 0 10px 28px var(--bcn-glow);
        backdrop-filter: blur(8px);
        cursor: grab;
        transition: gap 0.22s ease;
      }

      body.bcn-menu-collapsed #bcn-panel {
        gap: 0;
      }

      #bcn-panel.is-dragging {
        user-select: none;
        cursor: grabbing;
      }

      .bcn-btn,
      .bcn-wheel-btn {
        min-width: 42px;
        min-height: 42px;
        border: 2px solid var(--bcn-border);
        border-radius: 14px;
        background: linear-gradient(180deg, var(--bcn-panel) 0%, var(--bcn-soft) 100%);
        color: var(--bcn-text);
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 3px 0 var(--bcn-glow);
      }

      #bcn-submenu {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        max-width: 130px;
        opacity: 1;
        transform: translateX(0) scale(1);
        overflow: hidden;
        transition: max-width 0.22s ease, opacity 0.22s ease, transform 0.22s ease;
        pointer-events: auto;
      }

      body.bcn-menu-collapsed #bcn-submenu {
        max-width: 0;
        opacity: 0;
        transform: translateX(-8px) scale(0.96);
        pointer-events: none;
      }

      #bcn-main-cat,
      #bcn-wheel-handle,
      #bcn-face {
        width: 52px;
        height: 52px;
        min-width: 52px;
        min-height: 52px;
        font-size: 25px;
      }

      .bcn-btn:hover,
      .bcn-wheel-btn:hover {
        transform: translateY(-1px);
        background: var(--bcn-soft);
      }

      .bcn-wheel-wrap {
        position: absolute;
        right: 8px;
        bottom: calc(100% + 8px);
        overflow: hidden;
        max-width: 0;
        padding: 0;
        border: 2px solid var(--bcn-border);
        border-radius: 16px;
        background: var(--bcn-panel);
        box-shadow: 0 10px 28px var(--bcn-glow);
        backdrop-filter: blur(8px);
        transition: max-width 0.22s ease, opacity 0.22s ease, transform 0.22s ease, padding 0.22s ease;
        opacity: 0;
        transform: translateY(8px) scale(0.96);
        pointer-events: none;
      }

      body.bcn-wheel-on .bcn-wheel-wrap {
        max-width: 560px;
        padding: 12px;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .bcn-wheel-wrap,
      .bcn-wheel-btn,
      .bcn-wheel-blank {
        transition: max-width 0.22s ease, opacity 0.22s ease, transform 0.22s ease, filter 0.22s ease, padding 0.22s ease;
      }

      #bcn-wheel {
        display: none;
        grid-template-columns: repeat(3, minmax(82px, 1fr));
        gap: 10px;
        width: min(58vw, 360px);
        max-width: 360px;
        align-items: center;
      }

      body.bcn-wheel-on #bcn-wheel,
      body.bcn-wheel-on .bcn-wheel-wrap #bcn-wheel {
        display: grid;
      }

      body.bcn-wheel-on .bcn-wheel-btn,
      body.bcn-wheel-on .bcn-wheel-blank {
        animation: bcn-pop 0.24s ease both;
        animation-delay: calc(var(--i, 0) * 0.04s);
      }

      body.bcn-wheel-collapsed .bcn-wheel-wrap {
        max-width: 0;
        padding: 0;
        opacity: 0;
        transform: translateY(8px) scale(0.96);
        pointer-events: none;
      }

      #bcn-face.is-active {
        outline: 3px solid var(--bcn-glow);
        background: linear-gradient(180deg, var(--bcn-panel) 0%, var(--bcn-soft) 100%);
      }

      .bcn-wheel-btn {
        min-width: 0;
        min-height: 58px;
        padding: 0 14px;
        font-size: 19px;
      }

      .bcn-wheel-blank {
        min-height: 58px;
        border: 2px solid var(--bcn-border);
        border-radius: 14px;
        background: linear-gradient(180deg, var(--bcn-panel) 0%, var(--bcn-soft) 100%);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.52), 0 3px 0 var(--bcn-glow);
        pointer-events: none;
      }

      body.bcn-wheel-collapsed .bcn-wheel-btn,
      body.bcn-wheel-collapsed .bcn-wheel-blank {
        opacity: 0;
        transform: translateX(-10px) scale(0.92);
        filter: blur(0.5px);
        pointer-events: none;
      }

      @keyframes bcn-pop {
        0% {
          opacity: 0;
          transform: translateX(-10px) scale(0.92);
        }
        70% {
          opacity: 1;
          transform: translateX(2px) scale(1.03);
        }
        100% {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      #bcn-kaomoji-picker {
        position: absolute;
        right: 0;
        bottom: calc(100% + 10px);
        width: min(420px, calc(100vw - 24px));
        max-height: min(420px, calc(100vh - 120px));
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        border: 2px solid var(--bcn-border);
        border-radius: 16px;
        background: var(--bcn-panel);
        box-shadow: 0 14px 32px var(--bcn-glow), 0 2px 10px rgba(80, 40, 60, 0.12);
        backdrop-filter: blur(10px);
        opacity: 0;
        transform: translateY(8px) scale(0.96);
        transform-origin: right bottom;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }

      #bcn-kaomoji-picker.is-open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .bcn-kaomoji-tabs {
        display: flex;
        gap: 6px;
        max-width: 100%;
        overflow-x: auto;
        padding: 0 0 4px;
        scrollbar-width: thin;
      }

      .bcn-kaomoji-tab,
      .bcn-kaomoji-item {
        border: 2px solid var(--bcn-border);
        border-radius: 12px;
        background: linear-gradient(180deg, var(--bcn-panel) 0%, var(--bcn-soft) 100%);
        color: var(--bcn-text);
        cursor: pointer;
        box-shadow: 0 2px 0 var(--bcn-glow);
      }

      .bcn-kaomoji-tab {
        flex: 0 0 auto;
        min-height: 30px;
        padding: 0 10px;
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
      }

      .bcn-kaomoji-tab.is-active {
        border-color: var(--bcn-accent);
        background: linear-gradient(180deg, var(--bcn-panel) 0%, var(--bcn-soft) 100%);
        color: var(--bcn-accent);
      }

      .bcn-kaomoji-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
        gap: 8px;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 2px 4px 4px 2px;
        scrollbar-width: thin;
      }

      .bcn-kaomoji-item {
        min-height: 42px;
        padding: 0 8px;
        font-size: 18px;
        font-family: "Segoe UI Emoji", "Noto Color Emoji", "Apple Color Emoji", "Meiryo", sans-serif;
        font-weight: 700;
        line-height: 1.1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        animation: bcn-pop 0.2s ease both;
        animation-delay: calc(var(--i, 0) * 0.012s);
      }

      .bcn-kaomoji-item.is-used {
        border-color: var(--bcn-accent);
        box-shadow: 0 2px 0 var(--bcn-glow), inset 0 0 0 1px rgba(255, 255, 255, 0.72);
      }

      .bcn-kaomoji-tab:hover,
      .bcn-kaomoji-item:hover {
        transform: translateY(-1px);
        background: var(--bcn-soft);
      }

      @media (max-width: 520px) {
        #bcn-kaomoji-picker {
          width: min(330px, calc(100vw - 16px));
          max-height: min(360px, calc(100vh - 96px));
        }

        .bcn-kaomoji-grid {
          grid-template-columns: repeat(auto-fill, minmax(94px, 1fr));
        }

        .bcn-kaomoji-item {
          font-size: 16px;
        }
      }

      #TextAreaChatLog {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), var(--bcn-soft)) !important;
        border: 2px solid var(--bcn-border) !important;
        border-radius: 14px !important;
        padding: 8px !important;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.85), 0 8px 22px var(--bcn-glow);
      }

      #chat-room-bot,
      #chat-room-reply-indicator > * {
        border: 2px solid var(--bcn-border) !important;
        border-radius: 14px !important;
        background: rgba(255, 255, 255, 0.96) !important;
        color: var(--bcn-text) !important;
        box-shadow: 0 6px 18px var(--bcn-glow);
      }

      #chat-room-bot:has(#InputChat:focus) {
        outline: 2px solid var(--bcn-accent) !important;
        box-shadow: 0 0 0 4px var(--bcn-glow) !important;
      }

      #InputChat {
        padding: 12px 16px !important;
        color: var(--bcn-text) !important;
      }

      #InputChat::placeholder {
        color: var(--bcn-muted) !important;
      }

      #chat-room-send::before {
        background-image: none !important;
        mask-image: none !important;
        content: "🐾";
        color: var(--bcn-icon);
        font-size: 1.4em;
        display: grid;
        place-items: center;
      }

      #TextAreaChatLog .ChatMessage {
        margin: 7px 6px !important;
        padding: 9px 54px 9px 14px !important;
        border: 2px solid var(--bcn-border);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.78) !important;
        color: var(--bcn-text);
        box-shadow: 0 4px 12px var(--bcn-glow);
      }

      #TextAreaChatLog .ChatMessage::after {
        content: "🐾";
        position: absolute;
        right: 12px;
        bottom: 5px;
        opacity: 0.55;
        color: var(--bcn-icon);
      }

      #TextAreaChatLog .bcn-own-message {
        border-color: var(--bcn-accent) !important;
        background: linear-gradient(90deg, var(--bcn-soft), rgba(255, 255, 255, 0.9)) !important;
      }

      #TextAreaChatLog .bcn-own-message::before {
        content: "🐾";
        position: absolute;
        left: -9px;
        top: -9px;
        width: 25px;
        height: 25px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: #fff;
        border: 2px solid var(--bcn-accent);
        box-shadow: 0 4px 10px var(--bcn-glow);
      }

      #TextAreaChatLog .ChatMessageWhisper {
        border-color: #69aef7 !important;
        background: linear-gradient(90deg, rgba(235, 246, 255, 0.96), rgba(255, 255, 255, 0.88)) !important;
        color: #1c5c9c !important;
      }

      #TextAreaChatLog .ChatMessageEmote,
      #TextAreaChatLog .ChatMessageAction,
      #TextAreaChatLog .ChatMessageActivity {
        margin: 4px 8px !important;
        padding: 2px 42px 2px 10px !important;
        border: none !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        color: var(--bcn-muted) !important;
        font-style: normal !important;
        font-size: 0.94em !important;
      }

      #TextAreaChatLog .ChatMessageEmote::after,
      #TextAreaChatLog .ChatMessageAction::after,
      #TextAreaChatLog .ChatMessageActivity::after {
        content: none !important;
      }

      #TextAreaChatLog .ChatMessageEmote .ChatMessageName,
      #TextAreaChatLog .ChatMessageAction .ChatMessageName,
      #TextAreaChatLog .ChatMessageActivity .ChatMessageName {
        color: var(--bcn-muted) !important;
      }

      #TextAreaChatLog .ChatMessageName {
        color: var(--label-color, var(--bcn-text)) !important;
        -webkit-text-stroke: 0.45px rgba(61, 82, 86, 0.58);
        paint-order: stroke fill;
        text-shadow:
          0 0 1px rgba(61, 82, 86, 0.72),
          0 1px 2px rgba(61, 82, 86, 0.3),
          0 0 6px rgba(255, 255, 255, 0.28) !important;
        font-weight: 800;
      }

      #TextAreaChatLog .bcn-relation-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.15em;
        margin-right: 0.2em;
        font-size: 0.92em;
        vertical-align: baseline;
      }

      #TextAreaChatLog .bcn-related-owner {
        border-color: #f2d087 !important;
        box-shadow: 0 4px 14px rgba(232, 184, 88, 0.16);
      }

      #TextAreaChatLog .bcn-related-owner .ChatMessageName {
        color: #af7f22 !important;
      }

      #TextAreaChatLog .bcn-related-owner .bcn-relation-badge {
        color: #dfb24c;
        text-shadow: 0 1px 0 #fff6df, 0 0 8px rgba(240, 191, 92, 0.24);
      }

      #TextAreaChatLog .bcn-related-lover .ChatMessageName {
        color: #d06b96 !important;
      }

      #TextAreaChatLog .bcn-related-lover .bcn-relation-badge {
        color: #f08db4;
        text-shadow: 0 1px 0 #fff4f8, 0 0 8px rgba(240, 141, 180, 0.2);
      }

      #TextAreaChatLog .bcn-related-dual {
        border-color: #e9be93 !important;
        box-shadow: 0 4px 16px rgba(232, 166, 120, 0.18);
      }

      #TextAreaChatLog .bcn-related-dual .ChatMessageName {
        color: #c68463 !important;
      }

      #TextAreaChatLog .bcn-related-dual .bcn-relation-badge {
        color: #d88b8b;
        text-shadow: 0 1px 0 #fff6f8, 0 0 8px rgba(226, 169, 119, 0.22);
      }

      body.bcn-enabled input,
      body.bcn-enabled textarea,
      body.bcn-enabled select {
        border: 2px solid var(--bcn-border) !important;
        border-radius: 10px !important;
        background-color: rgba(255, 255, 255, 0.96) !important;
        color: var(--bcn-text) !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
      }

      body.bcn-enabled button:not(.bcn-btn):not(.bcn-wheel-btn):not(.bcn-kaomoji-tab):not(.bcn-kaomoji-item),
      body.bcn-enabled .button {
        border-radius: 10px !important;
      }

      .bcn-wheel-btn {
        position: relative;
        overflow: hidden;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
      }

      .bcn-wheel-btn.is-unavailable {
        opacity: 0.56;
        filter: saturate(0.55);
      }

      .bcn-wheel-btn.is-holding::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        transform-origin: left center;
        background: var(--bcn-accent);
        animation: bcn-composer-hold ${ACTION_COMPOSER_HOLD_MS}ms linear forwards;
      }

      @keyframes bcn-composer-hold {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }

      #bcn-action-composer-overlay {
        position: fixed;
        inset: 0;
        z-index: 100020;
        display: grid;
        place-items: center;
        padding: 18px;
        background: rgba(30, 24, 29, 0.38);
        backdrop-filter: blur(5px);
      }

      #bcn-action-composer {
        width: min(760px, 96vw);
        max-height: min(86vh, 820px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 2px solid var(--bcn-border);
        border-radius: 22px;
        background: var(--bcn-panel);
        color: var(--bcn-text);
        box-shadow: 0 24px 70px rgba(35, 23, 31, 0.28), 0 8px 28px var(--bcn-glow);
      }

      .bcn-composer-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 18px 20px 12px;
        border-bottom: 1px solid var(--bcn-border);
        background: linear-gradient(180deg, var(--bcn-soft), var(--bcn-panel));
      }

      .bcn-composer-title {
        color: var(--bcn-accent);
        font-size: clamp(22px, 3vw, 30px);
        font-weight: 900;
      }

      .bcn-composer-subtitle {
        max-width: 620px;
        margin-top: 4px;
        color: var(--bcn-muted);
        font-size: 13px;
        line-height: 1.45;
      }

      .bcn-composer-close {
        width: 38px;
        height: 38px;
        flex: 0 0 auto;
        border: 1px solid var(--bcn-border);
        border-radius: 12px;
        background: var(--bcn-panel);
        color: var(--bcn-muted);
        font-size: 24px;
        cursor: pointer;
      }

      .bcn-composer-shortcuts,
      .bcn-composer-footer {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: var(--bcn-soft);
      }

      .bcn-composer-shortcuts {
        flex-wrap: wrap;
        border-bottom: 1px solid var(--bcn-border);
      }

      .bcn-composer-shortcuts select {
        min-width: 170px;
        flex: 1 1 190px;
        min-height: 36px;
        padding: 5px 9px;
      }

      .bcn-composer-shortcuts button,
      .bcn-composer-footer button,
      .bcn-composer-options button {
        min-height: 36px;
        padding: 7px 12px;
        border: 1px solid var(--bcn-border);
        border-radius: 11px;
        background: var(--bcn-panel);
        color: var(--bcn-text);
        font-weight: 700;
        cursor: pointer;
      }

      .bcn-composer-shortcuts button:disabled,
      .bcn-composer-footer button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .bcn-composer-scroll {
        overflow-y: auto;
        padding: 16px 20px 20px;
      }

      .bcn-composer-field {
        display: grid;
        grid-template-columns: minmax(72px, 100px) 1fr;
        align-items: start;
        gap: 12px;
        margin-bottom: 14px;
      }

      .bcn-composer-label,
      .bcn-composer-preview-label {
        padding-top: 8px;
        color: var(--bcn-muted);
        font-size: 14px;
        font-weight: 800;
      }

      .bcn-composer-options {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
      }

      .bcn-composer-options button.is-selected {
        border-color: var(--bcn-accent);
        background: var(--bcn-accent);
        color: #fff;
        box-shadow: 0 4px 12px var(--bcn-glow);
      }

      #bcn-composer-target {
        width: 100%;
        min-height: 40px;
        padding: 6px 10px;
      }

      .bcn-composer-warning {
        display: grid;
        gap: 4px;
        margin: 4px 0 14px;
        padding: 11px 13px;
        border: 1px solid #efb4aa;
        border-radius: 12px;
        background: #fff3f0;
        color: #8b493e;
        font-size: 13px;
        line-height: 1.45;
      }

      .bcn-composer-preview-label {
        padding: 0 0 7px;
      }

      #bcn-composer-preview {
        min-height: 78px;
        padding: 14px 16px;
        border: 2px dashed var(--bcn-border);
        border-radius: 14px;
        background: var(--bcn-soft);
        color: var(--bcn-text);
        font-size: clamp(15px, 2.2vw, 18px);
        line-height: 1.6;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }

      .bcn-composer-footer {
        justify-content: flex-end;
        border-top: 1px solid var(--bcn-border);
      }

      .bcn-composer-footer .bcn-composer-send {
        border-color: var(--bcn-accent);
        background: var(--bcn-accent);
        color: #fff;
      }

      @media (max-width: 620px) {
        #bcn-action-composer-overlay { padding: 8px; }
        #bcn-action-composer { max-height: 94vh; border-radius: 16px; }
        .bcn-composer-header { padding: 14px 14px 10px; }
        .bcn-composer-shortcuts,
        .bcn-composer-footer { padding: 9px 14px; }
        .bcn-composer-scroll { padding: 13px 14px 16px; }
        .bcn-composer-field { grid-template-columns: 1fr; gap: 5px; }
        .bcn-composer-label { padding-top: 0; }
        .bcn-composer-footer { flex-wrap: wrap; }
        .bcn-composer-footer button { flex: 1 1 110px; }
      }

      #bcn-target-picker {
        position: fixed;
        right: 18px;
        bottom: 82px;
        z-index: 100003;
        min-width: 168px;
        max-width: min(320px, 78vw);
        padding: 10px;
        display: grid;
        gap: 7px;
        border: 2px solid var(--bcn-border);
        border-radius: 14px;
        background: var(--bcn-panel);
        box-shadow: 0 14px 32px var(--bcn-glow);
        color: var(--bcn-text);
        font-weight: 700;
      }

      .bcn-target-title {
        padding: 2px 6px 5px;
        color: var(--bcn-accent);
        text-align: center;
        font-size: 14px;
      }

      #bcn-target-picker button {
        min-height: 34px;
        padding: 5px 9px;
        border: 1px solid var(--bcn-border);
        border-radius: 10px;
        background: var(--bcn-panel);
        color: var(--bcn-text);
        font-weight: 700;
        cursor: pointer;
      }

      #bcn-target-picker button:hover {
        background: var(--bcn-soft);
      }

      #bcn-toast {
        position: fixed;
        left: 50%;
        bottom: 92px;
        z-index: 100001;
        transform: translateX(-50%) translateY(16px);
        opacity: 0;
        padding: 10px 20px;
        border: 2px solid var(--bcn-border);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.94);
        color: var(--bcn-accent);
        font-size: 22px;
        font-weight: 800;
        box-shadow: 0 12px 28px var(--bcn-glow);
        transition: opacity 0.22s ease, transform 0.22s ease;
        pointer-events: none;
      }

      #bcn-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      .bcn-rain-drop {
        position: fixed;
        top: -48px;
        z-index: 100002;
        pointer-events: none;
        color: var(--bcn-icon);
        text-shadow: 0 3px 10px var(--bcn-glow);
        animation-name: bcn-rain-fall;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }

      @keyframes bcn-rain-fall {
        0% {
          transform: translateY(-60px) rotate(0deg);
          opacity: 0;
        }
        8% {
          opacity: 0.92;
        }
        100% {
          transform: translateY(112vh) rotate(360deg);
          opacity: 0;
        }
      }
    `);
  }

  function init() {
    installStyles();
    createPanel();
    registerModSdk();
    loadRemoteActionLibrary();
    loadRemoteComposerLibrary();
    loadRemoteKaomojiLibrary();
    bindVisibilityLifecycle();
    syncScreenClass();
    registerNekoCommands();

    const patchTimer = setInterval(() => {
      const chatReady = patchBC();
      const badgeReady = patchStatusBadge();
      const roomReady = patchRoomEffects();
      const commandReady = registerNekoCommands();
      if (chatReady && badgeReady && roomReady && commandReady) {
        clearInterval(patchTimer);
        startMaintenance();
      }
      runMaintenance();
    }, 800);

    console.log("[BC ??????] ?????");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
