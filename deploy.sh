#!/bin/bash
# AI导演工作室私人部署脚本

set -e

echo "🎬 AI导演工作室私人部署脚本"
echo "=============================="

# 检查Git
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装，请先安装Git：https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git已安装"

# 检查当前目录
if [ ! -f "index.html" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

echo "✅ 项目目录正确"

# 显示部署说明
echo ""
echo "📋 部署说明："
echo "1. 请先在GitHub创建私有仓库：ai-director-studio-private"
echo "2. 将仓库设为Private（重要！）"
echo "3. 不要初始化README、.gitignore或license"
echo ""

read -p "请输入您的GitHub用户名: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ 用户名不能为空"
    exit 1
fi

echo ""
echo "🔗 您的仓库地址将是："
echo "   https://github.com/$GITHUB_USERNAME/ai-director-studio-private"
echo "   https://$GITHUB_USERNAME.github.io/ai-director-studio-private/"
echo ""

read -p "是否继续部署？(y/n): " CONFIRM

if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo "部署已取消"
    exit 0
fi

echo ""
echo "🚀 开始部署..."

# 初始化Git仓库
if [ ! -d ".git" ]; then
    echo "1. 初始化Git仓库..."
    git init
else
    echo "1. Git仓库已初始化"
fi

# 添加文件
echo "2. 添加文件到Git..."
git add .

# 提交更改
echo "3. 提交更改..."
git commit -m "初始化私人AI导演工作室 - $(date '+%Y-%m-%d %H:%M:%S')" || {
    echo "⚠️ 提交失败，可能是没有更改或已提交"
}

# 设置远程仓库
echo "4. 设置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USERNAME/ai-director-studio-private.git"

# 推送代码
echo "5. 推送代码到GitHub..."
git branch -M main
if git push -u origin main; then
    echo "✅ 代码推送成功！"
else
    echo ""
    echo "❌ 推送失败，可能的原因："
    echo "   - 仓库不存在：请先在GitHub创建仓库"
    echo "   - 权限不足：请检查GitHub访问权限"
    echo "   - 网络问题：请检查网络连接"
    echo ""
    echo "📝 手动推送命令："
    echo "   git push -u origin main"
    exit 1
fi

echo ""
echo "🎉 部署完成！"
echo ""
echo "📋 下一步操作："
echo "1. 登录GitHub，进入仓库设置：Settings → Pages"
echo "2. 配置部署："
echo "   - Source: Deploy from a branch"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo "3. 点击 Save，等待部署完成（约1-2分钟）"
echo ""
echo "🌐 访问地址："
echo "   https://$GITHUB_USERNAME.github.io/ai-director-studio-private/"
echo ""
echo "🔒 安全提示："
echo "   - 确保仓库设置为Private"
echo "   - 只有登录GitHub后才能访问"
echo "   - 定期检查仓库访问日志"
echo ""
echo "🔄 更新网站："
echo "   修改文件后运行："
echo "   git add . && git commit -m '更新说明' && git push"
echo ""
echo "📞 如有问题，请通过QQ联系AI导演系统"
echo ""
echo "🎬 祝您创作愉快！"