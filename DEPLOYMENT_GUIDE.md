# AI导演工作室 - GitHub Pages部署指南

## 🎯 部署目标
将AI导演工作室网站部署到GitHub Pages，实现全球访问。

## 📋 部署前检查

### 1. 文件完整性检查
运行测试脚本确保所有文件完整：
```bash
./test-api-integration.sh
```

### 2. Git状态检查
```bash
git status
```
确保只有需要部署的文件被修改。

### 3. 生产环境配置检查
- ✅ `api-client-prod.js` - 生产环境API客户端
- ✅ `.gitignore` - 排除开发文件
- ✅ `.github/workflows/deploy.yml` - GitHub Actions部署配置

## 🚀 部署步骤

### 步骤1：提交代码到GitHub
```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "部署AI导演工作室到GitHub Pages - 包含API集成"

# 推送到GitHub
git push origin main
```

### 步骤2：触发GitHub Actions部署
1. 访问GitHub仓库：`https://github.com/lovebitt/ai-director-private-studio`
2. 点击"Actions"标签
3. 查看"Deploy to GitHub Pages"工作流
4. 等待部署完成（约1-2分钟）

### 步骤3：访问部署的网站
部署完成后，访问：
```
https://lovebitt.github.io/ai-director-private-studio/
```

## 🔧 生产环境配置

### API服务器部署（可选但推荐）
GitHub Pages是静态托管，无法运行Node.js服务器。API功能需要：

#### 方案A：使用现有API服务器
1. 部署API服务器到云服务：
   - **Vercel**: 免费，自动部署
   - **Railway**: 免费额度，简单易用
   - **Render**: 免费计划，支持Node.js
   - **Heroku**: 需要信用卡，但有免费计划

2. 更新`api-client-prod.js`中的`baseUrl`：
```javascript
// 修改这一行
this.baseUrl = baseUrl || 'https://ai-director-api.yourdomain.com';
```

#### 方案B：使用模拟API（仅演示）
如果暂时不需要真实AI对话，可以：
1. 注释掉API相关代码
2. 使用静态回复演示功能
3. 添加"演示模式"提示

### 环境变量配置
生产环境需要：
1. **CORS配置**: 允许GitHub Pages域名访问
2. **HTTPS**: 确保API服务器使用HTTPS
3. **API密钥管理**: 用户自行提供DeepSeek API密钥

## 📁 部署文件清单

### 必须部署的文件
```
index.html              # 主页面
styles.css              # 样式文件
script.js               # 交互脚本
api-client-prod.js      # 生产环境API客户端
agents/                 # 智能体页面
  ├── director/
  ├── screenwriter/
  ├── visual/
  ├── dreamai/
  └── storyboard/
.github/workflows/deploy.yml  # 部署配置
```

### 排除的文件（通过.gitignore）
```
api/                    # 开发环境API服务器
node_modules/           # Node.js依赖
package.json            # Node.js配置
package-lock.json       # 依赖锁文件
test-api-integration.sh # 测试脚本
*.backup                # 备份文件
```

## 🎨 功能验证

部署后请验证以下功能：

### 基础功能
- [ ] 页面正常加载
- [ ] 导航菜单工作正常
- [ ] 响应式设计适配各种设备
- [ ] 所有智能体页面可访问

### API集成功能
- [ ] API控制面板显示正常
- [ ] API密钥输入框可用
- [ ] 智能体选择器工作正常
- [ ] 聊天界面显示正常

### 生产环境特定
- [ ] 无控制台错误
- [ ] 所有资源加载成功
- [ ] 移动端体验良好

## ⚠️ 常见问题解决

### 问题1：页面无法加载
**症状**: 访问GitHub Pages返回404
**解决**:
1. 检查仓库设置中的GitHub Pages配置
2. 确保部署工作流成功完成
3. 检查分支设置（应为main分支）

### 问题2：API功能无法使用
**症状**: API控制面板显示连接错误
**解决**:
1. 检查API服务器是否部署
2. 检查CORS配置
3. 查看浏览器控制台错误信息

### 问题3：样式或脚本错误
**症状**: 页面布局错乱或功能异常
**解决**:
1. 检查资源路径是否正确
2. 清除浏览器缓存
3. 检查控制台错误

### 问题4：部署工作流失败
**症状**: GitHub Actions显示红色错误
**解决**:
1. 查看工作流日志
2. 检查文件权限
3. 确保.gitignore正确配置

## 🔄 更新部署

### 常规更新
1. 修改代码
2. 提交更改
3. 推送到GitHub
4. 自动触发部署

### 重大更新
1. 在本地充分测试
2. 创建备份分支
3. 分阶段部署
4. 监控错误日志

## 📊 监控与维护

### 网站监控
- **Uptime监控**: 使用UptimeRobot等免费服务
- **错误监控**: 浏览器控制台错误收集
- **性能监控**: Google PageSpeed Insights

### 定期维护
1. **每周**: 检查网站可访问性
2. **每月**: 更新依赖和安全性
3. **每季度**: 功能回顾和优化

### 备份策略
1. **代码备份**: GitHub仓库本身就是备份
2. **配置备份**: 保存重要配置文件
3. **数据备份**: 如果有用户数据，定期备份

## 🆘 紧急恢复

### 网站宕机
1. 回滚到上一个稳定版本
2. 禁用有问题的新功能
3. 启用维护页面

### 数据丢失
1. 从GitHub恢复代码
2. 从备份恢复配置
3. 通知用户影响范围

## 📞 支持与联系

### 技术支持
- **GitHub Issues**: 报告问题和功能请求
- **文档**: 查看API_INTEGRATION.md和README.md
- **社区**: 相关技术社区寻求帮助

### 联系方式
- **项目维护者**: Nmyh NIUMA
- **GitHub**: lovebitt
- **更新频率**: 根据需求定期更新

---

**最后更新**: 2026-03-18  
**部署状态**: 准备就绪  
**预计部署时间**: 5-10分钟  

**🎉 祝您部署顺利！**