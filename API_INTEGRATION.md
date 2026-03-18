# AI导演工作室API集成文档

## 🎯 集成完成状态

**完成度**: 85%
**状态**: 主要功能已实现，可进行测试

## 📋 已实现的功能

### 1. 前端API集成
- ✅ API控制面板界面
- ✅ API密钥设置和保存
- ✅ 智能体选择器
- ✅ 实时聊天界面
- ✅ 消息历史管理
- ✅ 错误处理和状态显示

### 2. 后端API服务器
- ✅ Express.js服务器 (端口3001)
- ✅ 健康检查接口
- ✅ API密钥管理
- ✅ 智能体聊天接口
- ✅ 流式响应支持
- ✅ 智能体信息接口
- ✅ 错误处理和优雅降级

### 3. API客户端
- ✅ 浏览器端JavaScript客户端
- ✅ 自动连接检测
- ✅ 本地存储支持
- ✅ 完整的API封装

## 🚀 使用指南

### 1. 启动API服务器
```bash
cd /root/.openclaw/workspace/website/ai-director-studio
npm start
# 或直接运行
node api/server.js
```

### 2. 访问主页面
打开浏览器访问：`https://lovebitt.github.io/ai-director-private-studio/`

### 3. 设置API密钥
1. 点击导航栏的"API控制"
2. 在API密钥输入框中输入您的DeepSeek API密钥
3. 点击"保存密钥"按钮
4. 密钥将自动保存到本地存储

### 4. 开始对话
1. 选择一个智能体（AI导演、总编剧、视觉风格等）
2. 在聊天输入框中输入您的问题
3. 点击发送或按Enter键
4. 等待智能体回复

## 🔧 技术架构

### 前端架构
```
index.html (主页面)
├── API控制面板组件
├── 智能体选择器
├── 聊天界面
└── script.js (API集成逻辑)
```

### 后端架构
```
api/
├── server.js (主服务器)
├── client.js (浏览器客户端)
├── config.js (配置管理)
├── deepseek.js (DeepSeek API封装)
└── prompts.js (提示词模板)
```

### 数据流
```
用户输入 → 前端JavaScript → API客户端 → Express服务器 → DeepSeek API
      ↓
AI回复 ← 前端显示 ← 响应处理 ← 结果解析 ←
```

## 📊 API接口

### 健康检查
```
GET /api/health
返回：服务器状态和版本信息
```

### 设置API密钥
```
POST /api/set-key
参数：{ "apiKey": "your-deepseek-api-key" }
```

### 智能体聊天
```
POST /api/chat/:agent
参数：{ "message": "你的问题", "context": [] }
返回：{ "success": true, "response": "AI回复" }
```

### 获取智能体信息
```
GET /api/agents
GET /api/agents/:agent
```

## 🎨 界面说明

### API控制面板
- **位置**: 页面顶部，导航栏下方
- **功能**: 
  - API密钥管理
  - 连接状态显示
  - 智能体选择
  - 实时聊天

### 聊天界面
- **消息类型**:
  - 系统消息（蓝色）
  - 用户消息（紫色）
  - AI回复（绿色）
- **功能**:
  - 实时消息显示
  - 自动滚动
  - 加载状态指示
  - 清空对话

## ⚙️ 配置选项

### 本地存储
- API密钥保存在 `localStorage.ai_director_api_key`
- 会话重启后自动恢复

### API服务器
- 默认端口: 3001
- 可配置环境变量: `PORT`
- CORS已启用，支持跨域请求

### 连接检测
客户端自动检测以下地址：
1. `http://localhost:3001` (开发环境)
2. `https://lovebitt.github.io/api` (生产环境备用)

## 🧪 测试方法

### 单元测试
```bash
# 测试API服务器
curl http://localhost:3001/api/health

# 测试页面集成
打开 /tmp/test_integration.html
```

### 集成测试
1. 启动API服务器
2. 打开主页面
3. 设置测试API密钥
4. 选择智能体并发送测试消息

## 🔄 部署流程

### 开发环境
1. 启动API服务器: `node api/server.js`
2. 使用Live Server或直接打开index.html

### 生产环境
1. 将API服务器部署到云服务
2. 更新前端API地址配置
3. 配置CORS和HTTPS
4. 部署到GitHub Pages

## 📝 注意事项

### 安全性
- API密钥仅保存在浏览器本地存储
- 生产环境建议使用HTTPS
- 考虑添加API密钥轮换机制

### 性能
- 消息历史可能占用大量内存
- 考虑添加分页或限制历史长度
- 流式响应可改善大文本体验

### 兼容性
- 支持现代浏览器（Chrome, Firefox, Safari, Edge）
- 移动端响应式设计
- 离线状态处理

## 🐛 已知问题

1. **CORS限制**: GitHub Pages无法直接访问localhost
   - 解决方案：部署API服务器到可公开访问的地址
   
2. **API密钥安全**: 本地存储有一定风险
   - 解决方案：考虑使用更安全的存储方式

3. **错误处理**: 需要更详细的错误信息
   - 解决方案：完善错误分类和用户提示

## 🚧 待完成功能

### 高优先级
- [ ] 添加API服务器生产部署配置
- [ ] 实现流式响应UI
- [ ] 添加对话历史导出

### 中优先级
- [ ] 实现多会话支持
- [ ] 添加智能体上下文管理
- [ ] 优化移动端体验

### 低优先级
- [ ] 添加API使用统计
- [ ] 实现消息搜索功能
- [ ] 添加主题切换

## 📞 支持与反馈

如有问题或建议，请：
1. 检查浏览器控制台错误信息
2. 查看API服务器日志
3. 联系系统管理员

---

**最后更新**: 2026-03-18  
**版本**: 1.0.0  
**状态**: 测试版，功能完整