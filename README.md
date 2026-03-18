# 🎬 AI导演工作室网站

基于导演思维OS 4.3的AI增强创作平台网站。

## 🌐 在线访问

网站地址: [https://your-username.github.io/ai-director-studio/](https://your-username.github.io/ai-director-studio/)

## 🚀 功能特性

### 1. 系统展示
- **AI导演系统介绍**: 展示导演思维OS 4.3架构
- **多智能体协作**: 实时显示智能体状态和任务
- **即梦AI集成**: 展示AI创作工具和技术栈

### 2. 作品展示
- **漫剧作品**: 《梦境侦探》等AI生成漫剧
- **插画系列**: 城市漫游者等视觉作品
- **视频创作**: AI增强视频制作展示

### 3. 创作工具
- **在线剧本编辑器**: 实时编辑和预览
- **图片生成工具**: 基于提示词的AI图片生成
- **分镜预览**: 可视化分镜设计工具

### 4. 用户界面
- **响应式设计**: 支持PC、平板、手机
- **现代UI/UX**: 基于导演思维的设计语言
- **实时交互**: 智能体状态监控和交互

## 🏗️ 技术架构

### 前端技术栈
- **HTML5**: 语义化标签，现代Web标准
- **CSS3**: Flexbox/Grid布局，CSS变量，动画
- **JavaScript**: ES6+，模块化设计，交互逻辑
- **字体图标**: Font Awesome 6.4.0
- **谷歌字体**: Inter + Noto Sans SC

### 设计系统
- **色彩系统**: 基于品牌色的配色方案
- **间距系统**: 8px基准的间距比例
- **组件库**: 按钮、卡片、导航等可复用组件
- **响应式断点**: 移动优先的响应式设计

### 集成功能
- **OpenClaw API**: AI导演系统后端集成
- **GitHub Pages**: 静态网站托管
- **实时AI对话**: DeepSeek API集成，支持与5个智能体实时对话
- **API控制面板**: 完整的API密钥管理和聊天界面
- **GitHub Actions**: 自动化部署

## 📁 项目结构

```
ai-director-studio/
├── index.html          # 主页面
├── styles.css          # 主样式文件
├── script.js           # 交互脚本
├── README.md           # 项目文档
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions部署配置
```

## 🚀 本地开发

### 环境要求
- 现代浏览器（Chrome 90+，Firefox 88+，Safari 14+）
- 代码编辑器（VS Code推荐）
- Git版本控制

### 开发步骤
1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/ai-director-studio.git
   cd ai-director-studio
   ```

2. **本地预览**
   - 直接打开 `index.html` 文件
   - 或使用本地服务器：
     ```bash
     python3 -m http.server 8000
     ```
     然后访问 http://localhost:8000

3. **代码编辑**
   - `index.html`: 页面结构和内容
   - `styles.css`: 样式和布局
   - `script.js`: 交互和功能

## 🤖 API集成使用

### API服务器启动
```bash
# 进入项目目录
cd /path/to/ai-director-studio

# 安装依赖（如果需要）
npm install

# 启动API服务器
npm start
# 或直接运行
node api/server.js
```

### API功能说明
1. **API控制面板**: 导航栏点击"API控制"
2. **密钥设置**: 输入DeepSeek API密钥并保存
3. **智能体选择**: 点击选择要对话的智能体
4. **实时对话**: 输入消息并发送，获取AI回复
5. **连接测试**: 使用测试按钮验证API服务器状态

### API接口文档
详细API接口说明请查看 [API_INTEGRATION.md](API_INTEGRATION.md)

## 🌍 部署到GitHub Pages

### 自动部署（推荐）
项目已配置GitHub Actions工作流，推送代码到main分支时会自动部署。

### 手动部署
1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/ai-director-studio.git
   git push -u origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库设置 → Pages
   - 选择部署源：GitHub Actions
   - 保存设置

3. **访问网站**
   - 部署完成后访问：`https://your-username.github.io/ai-director-studio/`

## 🔧 自定义配置

### 修改品牌信息
1. **网站标题**: 编辑 `index.html` 中的 `<title>` 标签
2. **品牌颜色**: 修改 `styles.css` 中的CSS变量
3. **内容更新**: 编辑各部分的HTML内容

### 添加新功能
1. **新页面**: 创建新的HTML文件并链接
2. **新组件**: 在CSS中添加样式，在JS中添加交互
3. **API集成**: 在 `script.js` 中添加API调用

### 性能优化
1. **图片优化**: 使用WebP格式，添加懒加载
2. **代码分割**: 按需加载JS模块
3. **缓存策略**: 配置适当的HTTP缓存头

## 📱 响应式设计

### 断点设置
- **移动端**: < 768px
- **平板**: 768px - 1024px
- **桌面端**: > 1024px

### 适配特性
- **导航栏**: 移动端汉堡菜单，桌面端水平导航
- **网格布局**: 自适应列数调整
- **字体大小**: 根据视口大小调整
- **图片尺寸**: 响应式图片加载

## 🔗 系统集成

### OpenClaw API集成
```javascript
// API端点示例
const openclawAPI = {
  // 创作相关
  createStory: '/api/create-story',
  generateImage: '/api/generate-image',
  
  // 系统状态
  getSystemStatus: '/api/system-status',
  getAgentStatus: '/api/agent-status',
  
  // 用户相关
  getUserWorks: '/api/user/works',
  saveProject: '/api/project/save'
};
```

### 多智能体系统
- **状态监控**: 实时显示智能体运行状态
- **任务分配**: 可视化任务创建和分配
- **成果展示**: 智能体创作成果集成展示

## 🎨 设计规范

### 色彩系统
- **主色**: #6366f1 (靛蓝)
- **辅助色**: #8b5cf6 (紫色)
- **强调色**: #ec4899 (粉色)
- **中性色**: 从#f9fafb到#111827的灰度

### 排版系统
- **主字体**: Inter (英文字体)
- **中文字体**: Noto Sans SC
- **字重**: 300, 400, 500, 600, 700
- **行高**: 1.6 (正文), 1.2 (标题)

### 间距系统
基于8px的倍数：
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)

## 📊 性能指标

### 加载性能
- **首次内容绘制**: < 1.5s
- **最大内容绘制**: < 2.5s
- **首次输入延迟**: < 100ms

### 资源优化
- **CSS大小**: < 50KB (压缩后)
- **JS大小**: < 100KB (压缩后)
- **图片优化**: WebP格式，懒加载

### 可访问性
- **WCAG 2.1 AA**: 符合无障碍标准
- **键盘导航**: 完整的键盘支持
- **屏幕阅读器**: ARIA标签和语义化HTML

## 🔒 安全考虑

### 前端安全
- **CSP策略**: 内容安全策略头
- **XSS防护**: 输入验证和输出编码
- **HTTPS**: 强制使用安全连接

### 数据安全
- **API安全**: JWT认证和授权
- **用户数据**: 客户端加密存储
- **隐私保护**: GDPR合规性

## 📈 分析和监控

### 用户分析
- **Google Analytics**: 用户行为跟踪
- **热力图**: 用户交互热点分析
- **转化跟踪**: 创作工具使用率

### 性能监控
- **Core Web Vitals**: 核心网页指标
- **错误监控**: JavaScript错误捕获
- **可用性监控**: 正常运行时间监测

## 🤝 贡献指南

### 开发流程
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

### 代码规范
- **HTML**: 语义化标签，W3C验证
- **CSS**: BEM命名规范，CSS变量
- **JS**: ES6+语法，JSDoc注释

### 提交信息
使用约定式提交：
- `feat:` 新功能
- `fix:` 错误修复
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 代码重构

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🎬 关于AI导演

AI导演是基于导演思维OS 4.3的AI增强创作系统，整合了多智能体协作、即梦AI工具和导演创作方法论。

**导演理念**: "技术服务于创意，让每个人都能成为自己作品的导演。"

---

**版本**: 1.0.0  
**最后更新**: 2026-03-16  
**状态**: 🟢 运行中  
**下一步**: 集成OpenClaw API，添加用户系统