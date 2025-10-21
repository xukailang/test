# 项目结构说明

game_1/
├── index.html          # 游戏主页面（包含HTML结构）
├── style.css           # 游戏样式文件（所有CSS样式）
├── game.js             # 游戏逻辑文件（所有JavaScript代码）
├── README.md           # 项目说明文档
├── start.bat           # Windows快速启动脚本（直接打开HTML）
├── start-server.bat    # Windows服务器启动脚本（使用Python HTTP服务器）
└── PROJECT.md          # 本文件（项目结构说明）

## 快速开始

### 最简单的方式
双击 `start.bat` 文件，游戏将在浏览器中打开

### 使用本地服务器
双击 `start-server.bat` 文件（需要安装Python）

### 手动打开
直接双击 `index.html` 文件

## 核心文件说明

### index.html
- 游戏的HTML结构
- 包含角色信息面板、战斗区域、背包和商店
- 引用了style.css和game.js

### style.css
- 完整的游戏界面样式
- 响应式设计，支持不同屏幕尺寸
- 包含动画效果（浮动、渐变等）
- 不同品质装备的颜色区分

### game.js
- 完整的游戏逻辑实现
- 包含以下核心系统：
  * 角色系统（等级、属性、装备）
  * 怪物系统（8种不同怪物）
  * 战斗系统（回合制战斗）
  * 装备系统（4个品质等级）
  * 商店系统
  * 经验和升级系统

## 游戏功能列表

✅ 打怪升级
✅ 装备收集（4个品质：普通、稀有、史诗、传说）
✅ 装备系统（武器、防具、头盔）
✅ 商店购买
✅ 角色成长
✅ 战斗日志
✅ 血条显示
✅ 经验条显示
✅ 治疗功能
✅ 逃跑机制
✅ 掉落系统
✅ 怪物难度随等级调整
✅ 死亡惩罚（损失50%金币）

## 部署选项

### 1. 本地运行
- 直接打开index.html
- 或使用start.bat

### 2. 本地服务器
- Python: `python -m http.server 8000`
- Node.js: `npx http-server`
- VS Code: Live Server插件

### 3. 在线部署
- GitHub Pages（免费）
- Netlify（免费）
- Vercel（免费）
- 任何静态网站托管服务

## 技术特点

- 纯前端实现，无需后端
- 不依赖任何框架或库
- 响应式设计
- 现代CSS3特性（Grid、渐变、动画）
- ES6+ JavaScript
- 面向对象编程
- 模块化代码结构

## 浏览器要求

支持HTML5和ES6的现代浏览器：
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 开发建议

如果要修改游戏：

1. **修改界面** → 编辑 `style.css`
2. **修改布局** → 编辑 `index.html`
3. **修改逻辑** → 编辑 `game.js`

### 常见修改示例

**增加怪物**：
在game.js的monsterTemplates数组中添加新对象

**增加装备**：
在game.js的itemTemplates数组中添加新对象

**调整难度**：
修改game.js中的角色初始属性和升级增长值

**修改UI颜色**：
在style.css中修改颜色变量

## 注意事项

- 游戏进度不会保存（刷新页面会重置）
- 如需保存功能，可添加localStorage
- 建议在现代浏览器中运行以获得最佳体验
