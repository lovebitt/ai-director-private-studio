                <div class="gallery-item-preview" style="background-color: ${item.color};"></div>
            `;
            
            galleryItem.addEventListener('click', function() {
                showGalleryItemDetail(item);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // 显示图库项目详情
    function showGalleryItemDetail(item) {
        const detailMessage = `## 🖼️ 视觉参考详情\n\n`;
        detailMessage += `**标题**：${item.title}\n`;
        detailMessage += `**分类**：${getCategoryName(item.category)}\n`;
        detailMessage += `**标签**：${item.tags.join('、')}\n`;
        detailMessage += `**代表色**：${item.color}\n\n`;
        detailMessage += `**应用建议**：\n`;
        detailMessage += `- 适合${getCategoryApplication(item.category)}\n`;
        detailMessage += `- 可以与其他${item.category}参考结合使用\n`;
        detailMessage += `- 注意保持视觉风格的一致性\n\n`;
        detailMessage += `**专业提示**：\n`;
        detailMessage += `1. 分析该参考的色彩搭配原理\n`;
        detailMessage += `2. 学习其构图和布局技巧\n`;
        detailMessage += `3. 应用到您的创作中并适当调整`;
        
        addAgentMessage(detailMessage, [
            { id: 'save-reference', icon: 'fas fa-bookmark', text: '收藏参考' },
            { id: 'analyze-similar', icon: 'fas fa-search', text: '分析类似' },
            { id: 'apply-to-project', icon: 'fas fa-paint-brush', text: '应用到项目' }
        ]);
    }
    
    // 获取分类名称
    function getCategoryName(category) {
        const categories = {
            'color': '色彩',
            'composition': '构图',
            'lighting': '光影',
            'texture': '质感'
        };
        return categories[category] || '视觉参考';
    }
    
    // 获取分类应用
    function getCategoryApplication(category) {
        const applications = {
            'color': '色彩搭配、品牌设计、UI界面',
            'composition': '画面布局、视觉引导、信息架构',
            'lighting': '氛围营造、质感表现、情感表达',
            'texture': '细节处理、质感表现、视觉丰富度'
        };
        return applications[category] || '视觉创作';
    }
    
    // 初始加载
    loadGalleryCategory('all');
}

// 快速动作
function initQuickActions() {
    const newVisualProjectButton = document.getElementById('newVisualProject');
    const analyzeImageButton = document.getElementById('analyzeImage');
    const generatePaletteButton = document.getElementById('generatePalette');
    
    // 新建视觉项目
    if (newVisualProjectButton) {
        newVisualProjectButton.addEventListener('click', function() {
            const projectMessage = `## 🆕 新建视觉项目向导\n\n`;
            projectMessage += `欢迎使用视觉项目创建向导！我将引导您完成新视觉项目的创建。\n\n`;
            projectMessage += `**请回答以下问题**：\n\n`;
            projectMessage += `1. 项目名称和主题是什么？\n`;
            projectMessage += `2. 目标受众是谁？\n`;
            projectMessage += `3. 希望传达什么情感和氛围？\n`;
            projectMessage += `4. 参考的风格或作品有哪些？\n`;
            projectMessage += `5. 主要的视觉元素是什么？\n\n`;
            projectMessage += `请逐一回答，我将为您生成完整的视觉风格指南。`;
            
            addAgentMessage(projectMessage);
        });
    }
    
    // 分析图片
    if (analyzeImageButton) {
        analyzeImageButton.addEventListener('click', function() {
            const analysisMessage = `## 📷 图片分析功能\n\n`;
            analysisMessage += `图片分析功能已就绪！\n\n`;
            analysisMessage += `**支持的分析类型**：\n`;
            analysisMessage += `- 色彩分析：提取主色调和配色方案\n`;
            analysisMessage += `- 构图分析：分析画面布局和视觉焦点\n`;
            analysisMessage += `- 风格识别：识别视觉风格和美学特征\n`;
            analysisMessage += `- 质感评估：评估纹理和细节处理\n\n`;
            analysisMessage += `**使用方法**：\n`;
            analysisMessage += `1. 点击"上传图片"按钮选择图片\n`;
            analysisMessage += `2. 或直接将图片拖拽到聊天区域\n`;
            analysisMessage += `3. 我将自动进行分析并提供专业报告\n\n`;
            analysisMessage += `请上传您的图片开始分析！`;
            
            addAgentMessage(analysisMessage);
        });
    }
    
    // 生成调色板
    if (generatePaletteButton) {
        generatePaletteButton.addEventListener('click', function() {
            const paletteMessage = `## 🎨 智能调色板生成\n\n`;
            paletteMessage += `正在为您生成专业调色板...\n\n`;
            paletteMessage += `**生成方法**：\n`;
            paletteMessage += `- 基于色彩理论和心理学\n`;
            paletteMessage += `- 考虑视觉舒适度和美学效果\n`;
            paletteMessage += `- 确保色彩和谐和对比度适当\n\n`;
            paletteMessage += `**推荐调色板**：\n\n`;
            paletteMessage += `**方案一：现代简约**\n`;
            paletteMessage += `- 主色：#3A86FF（活力蓝）\n`;
            paletteMessage += `- 辅助色：#8338EC（时尚紫）\n`;
            paletteMessage += `- 强调色：#FF006E（热情粉）\n`;
            paletteMessage += `- 中性色：#FB5607（温暖橙）\n`;
            paletteMessage += `- 背景色：#FFBE0B（明亮黄）\n\n`;
            paletteMessage += `**方案二：自然和谐**\n`;
            paletteMessage += `- 主色：#2A9D8F（自然绿）\n`;
            paletteMessage += `- 辅助色：#E9C46A（温暖黄）\n`;
            paletteMessage += `- 强调色：#F4A261（活力橙）\n`;
            paletteMessage += `- 中性色：#E76F51（陶土红）\n`;
            paletteMessage += `- 背景色：#264653（深蓝绿）\n\n`;
            paletteMessage += `**应用建议**：\n`;
            paletteMessage += `1. 选择与项目主题匹配的方案\n`;
            paletteMessage += `2. 按照60-30-10原则分配色彩比例\n`;
            paletteMessage += `3. 测试不同设备上的显示效果\n`;
            paletteMessage += `4. 根据反馈进行微调优化`;
            
            addAgentMessage(paletteMessage, [
                { id: 'export-palette-json', icon: 'fas fa-code', text: '导出JSON' },
                { id: 'save-palette', icon: 'fas fa-save', text: '保存方案' },
                { id: 'test-colors', icon: 'fas fa-eye-dropper', text: '测试色彩' }
            ]);
        });
    }
}

// 工具函数：添加视觉智能体消息
function addAgentMessage(text, actions = []) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message agent';
    
    let actionsHtml = '';
    if (actions && actions.length > 0) {
        actionsHtml = `
            <div class="message-actions">
                ${actions.map(action => `
                    <button class="action-btn" data-action="${action.id}">
                        <i class="${action.icon}"></i> ${action.text}
                    </button>
                `).join('')}
            </div>
        `;
    }
    
    messageDiv.innerHTML = `
        <div class="message-avatar">🎨</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">视觉风格智能体</span>
                <span class="message-time">刚刚</span>
            </div>
            <div class="message-text">${formatMessageText(text)}</div>
            ${actionsHtml}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // 重新绑定动作按钮
    if (actions && actions.length > 0) {
        messageDiv.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const actionId = this.getAttribute('data-action');
                handleVisualAction(actionId);
            });
        });
    }
    
    // 滚动到底部
    scrollToBottom();
}

// 工具函数：格式化消息文本
function formatMessageText(text) {
    return text.replace(/\n/g, '<br>')
               .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
               .replace(/\*(.*?)\*/g, '<em>$1</em>')
               .replace(/## (.*?)\n/g, '<h4>$1</h4>')
               .replace(/### (.*?)\n/g, '<h5>$1</h5>');
}

// 工具函数：滚动到底部
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// 工具函数：转义HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 初始化完成
console.log('🎨 视觉风格智能体 - 所有功能已初始化');