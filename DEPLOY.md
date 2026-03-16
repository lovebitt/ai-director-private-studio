# 🔒 私人AI导演工作室部署指南

## 🎯 部署目标
为Nmyh NIUMA部署一个完全私人的AI导演工作室网站，仅限您一人访问。

## 📋 部署前准备

### 1. GitHub账户
- 如果您还没有GitHub账户，请先注册：https://github.com/signup
- 记住您的用户名（例如：nmyh-niuma）

### 2. 本地环境
- Git已安装（https://git-scm.com/downloads）
- 代码编辑器（VS Code推荐）

## 🚀 部署步骤

### 步骤1：创建GitHub仓库
1. 登录GitHub
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `ai-director-studio-private`
   - **Description**: 私人AI导演工作室 - 仅限Nmyh NIUMA访问
   - **Visibility**: **Private**（重要！选择私有仓库）
   - 不要初始化README、.gitignore或license
4. 点击 "Create repository"

### 步骤2：上传代码到GitHub
在本地终端执行以下命令：

```bash
# 进入项目目录
cd /root/.openclaw/workspace/website/ai-director-studio

# 初始化Git仓库
git init
git add .
git commit -m "初始化私人AI导演工作室"

# 连接到GitHub仓库
git remote add origin https://github.com/您的用户名/ai-director-studio-private.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤3：启用GitHub Pages
1. 进入仓库设置：Settings → Pages
2. 配置部署：
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)
3. 点击 "Save"
4. 等待部署完成（约1-2分钟）

### 步骤4：获取访问链接
部署完成后，您将获得一个私有链接：
```
https://您的用户名.github.io/ai-director-studio-private/
```

**注意**: 由于是私有仓库，只有您登录GitHub后才能访问此链接。

## 🔐 访问控制配置

### 方案A：GitHub私有仓库（推荐）
- **优点**: 完全免费，自动HTTPS，GitHub身份验证
- **配置**: 仓库设为Private，只有您能访问
- **访问**: 需要登录GitHub账户

### 方案B：密码保护（如果需要）
如果需要额外的密码保护，可以在网站中添加：

1. 创建 `auth.html` 页面
2. 添加简单的密码验证
3. 重定向到主页面

## 📁 项目文件说明

### 核心文件
- `index.html` - 主页面，已定制为私人系统
- `styles.css` - 样式文件，包含私人系统样式
- `script.js` - 交互脚本，包含创作工具
- `README.md` - 项目文档
- `DEPLOY.md` - 本部署指南

### 定制内容
网站已定制为：
- ✅ 显示"私人系统 · 专属服务"标识
- ✅ 欢迎信息："欢迎回来，Nmyh NIUMA"
- ✅ 系统状态显示专属用户信息
- ✅ 所有页面内容调整为私人服务模式
- ✅ 页脚显示"仅为您一人服务"

## 🔧 后续维护

### 更新网站内容
```bash
# 修改文件后
git add .
git commit -m "更新内容"
git push origin main
# GitHub Pages会自动重新部署
```

### 添加新功能
1. 在本地修改代码
2. 测试通过后推送到GitHub
3. 自动部署更新

### 备份数据
- 定期导出您的创作作品
- 备份项目代码到本地
- 考虑使用GitHub的备份功能

## 🛡️ 安全建议

### 1. 仓库安全
- 保持仓库为Private
- 不要分享访问令牌
- 定期检查仓库访问日志

### 2. 数据安全
- 敏感数据不要硬编码在代码中
- 使用环境变量存储配置
- 定期清理不需要的文件

### 3. 访问安全
- 使用强密码保护GitHub账户
- 启用双因素认证
- 定期检查登录活动

## 🌐 自定义域名（可选）

如果您想使用自己的域名：

### 步骤1：购买域名
- 从域名注册商购买（如Namecheap、GoDaddy等）

### 步骤2：配置DNS
添加CNAME记录：
```
类型: CNAME
名称: www
值: 您的用户名.github.io
```

### 步骤3：GitHub配置
1. 仓库Settings → Pages → Custom domain
2. 输入您的域名
3. 启用HTTPS

## 📞 技术支持

### 常见问题
1. **部署失败**: 检查GitHub Actions日志
2. **无法访问**: 确认仓库是Private，且您已登录
3. **样式问题**: 清除浏览器缓存

### 联系支持
如有问题，可以通过QQ联系AI导演系统。

## 🎬 系统特色

### 私人专属功能
- 🔒 完全私有的创作环境
- 👤 个性化欢迎和界面
- 📊 专属数据统计和分析
- 🛡️ 增强的隐私和安全保护

### 创作工具
- ✍️ 在线剧本编辑器
- 🎨 AI图片生成工具
- 📝 实时预览和编辑
- 💾 自动保存和版本控制

### 智能体系统
- 🤖 多智能体状态监控
- 🔄 实时任务分配和跟踪
- 📈 创作进度可视化
- 🎯 个性化创作建议

---

**部署状态**: 🟡 等待执行  
**预计时间**: 10-15分钟  
**难度级别**: 初级  
**所需资源**: GitHub账户 + 基本Git知识  
**安全级别**: 🔒🔒🔒🔒 (私有仓库 + GitHub认证)