        if (specificityScore) specificityScore.style.width = '0%';
        if (specificityValue) specificityValue.textContent = '0%';
        if (creativityScore) creativityScore.style.width = '0%';
        if (creativityValue) creativityValue.textContent = '0%';
        if (promptSuggestions) promptSuggestions.innerHTML = '';
    }
    
    // 优化提示词
    function optimizePrompt(prompt) {
        const words = prompt.trim().split(/\s+/).filter(word => word.length > 0);
        
        // 基础优化
        let optimized = prompt;
        
        // 1. 替换模糊词汇
        optimized = optimized.replace(/\ba person\b/gi, 'a detailed character');
        optimized = optimized.replace(/\bsomething\b/gi, 'a specific object');
        optimized = optimized.replace(/\bgood\b/gi, 'high quality');
        optimized = optimized.replace(/\bnice\b/gi, 'beautiful');
        
        // 2. 添加质量描述（如果没有）
        if (!optimized.toLowerCase().includes('high quality') && !optimized.toLowerCase().includes('detailed')) {
            optimized += ', high quality, detailed';
        }
        
        // 3. 添加风格描述（如果没有）
        if (!optimized.toLowerCase().includes('style') && !optimized.toLowerCase().includes('art')) {
            optimized += ', professional photography';
        }
        
        // 4. 清理多余空格和标点
        optimized = optimized.replace(/\s+/g, ' ').trim();
        optimized = optimized.replace(/,+/g, ',').replace(/,/g, ', ');
        
        return {
            original: prompt,
            prompt: optimized,
            improvements: [
                '替换模糊词汇为具体描述',
                '添加质量参数',
                '优化语法结构',
                '清理格式'
            ]
        };
    }
    
    // 显示提示词优化结果
    function displayPromptOptimization(optimized) {
        const analysis = analyzePrompt(optimized.prompt);
        displayPromptAnalysis(analysis);
        
        // 显示改进说明
        const promptSuggestions = document.getElementById('promptSuggestions');
        if (promptSuggestions) {
            const improvementsDiv = document.createElement('div');
            improvementsDiv.className = 'improvements-list';
            improvementsDiv.innerHTML = `
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #eee;">
                    <strong>优化改进：</strong>
                    <ul style="margin: 5px 0 0 20px; font-size: 0.9em;">
                        ${optimized.improvements.map(imp => `<li>${imp}</li>`).join('')}
                    </ul>
                </div>
            `;
            promptSuggestions.appendChild(improvementsDiv);
        }
    }
    
    // 插入提示词组件
    function insertPromptComponent(component) {
        if (!promptInput) return;
        
        const currentPrompt = promptInput.value;
        const cursorPos = promptInput.selectionStart;
        
        // 在光标位置插入组件
        const newPrompt = currentPrompt.substring(0, cursorPos) + 
                         component + 
                         currentPrompt.substring(cursorPos);
        
        promptInput.value = newPrompt;
        
        // 更新统计
        updatePromptStats(newPrompt);
        
        // 聚焦并移动光标
        promptInput.focus();
        promptInput.selectionStart = cursorPos + component.length;
        promptInput.selectionEnd = cursorPos + component.length;
    }
    
    // 生成提示词分析消息
    function generatePromptAnalysisMessage(prompt, analysis) {
        let message = `## 📝 提示词分析报告\n\n`;
        message += `**分析时间**：${new Date().toLocaleString()}\n`;
        message += `**提示词长度**：${analysis.wordCount}个单词\n`;
        message += `**总体评分**：${analysis.overallScore}/100\n\n`;
        
        message += `**详细评估**：\n`;
        message += `- 清晰度：${analysis.clarity}/100\n`;
        message += `- 具体性：${analysis.specificity}/100\n`;
        message += `- 创意性：${analysis.creativity}/100\n\n`;
        
        message += `**专业建议**：\n`;
        analysis.suggestions.forEach(suggestion => {
            message += `- ${suggestion}\n`;
        });
        
        message += `\n**优化方向**：\n`;
        message += `1. 使用更具体的名词和形容词\n`;
        message += `2. 按照"主体-环境-风格-质量"的结构组织\n`;
        message += `3. 添加具体的细节描述\n`;
        message += `4. 明确风格和质量要求`;
        
        return message;
    }
    
    // 生成提示词优化消息
    function generatePromptOptimizationMessage(original, optimized) {
        let message = `## ✨ 提示词优化完成\n\n`;
        message += `**优化时间**：${new Date().toLocaleString()}\n\n`;
        
        message += `**原提示词**：\n\`\`\`\n${original}\n\`\`\`\n\n`;
        message += `**优化后提示词**：\n\`\`\`\n${optimized.prompt}\n\`\`\`\n\n`;
        
        message += `**主要改进**：\n`;
        optimized.improvements.forEach(improvement => {
            message += `- ${improvement}\n`;
        });
        
        message += `\n**技术要点**：\n`;
        message += `1. 使用逗号分隔不同概念\n`;
        message += `2. 按照重要性顺序排列描述\n`;
        message += `3. 包含具体的风格和质量参数\n`;
        message += `4. 避免模糊和不确定的词汇`;
        
        return message;
    }
}

// 参数工具
function initParameterTools() {
    const qualitySlider = document.getElementById('qualitySlider');
    const styleSlider = document.getElementById('styleSlider');
    const creativitySlider = document.getElementById('creativitySlider');
    const sizeOptions = document.querySelectorAll('input[name="size"]');
    const presetCards = document.querySelectorAll('.preset-card');
    
    // 质量滑块
    if (qualitySlider) {
        const qualityValue = document.getElementById('qualityValue');
        qualitySlider.addEventListener('input', function() {
            if (qualityValue) {
                qualityValue.textContent = this.value;
            }
        });
        
        // 初始显示
        if (qualityValue) {
            qualityValue.textContent = qualitySlider.value;
        }
    }
    
    // 风格滑块
    if (styleSlider) {
        const styleValue = document.getElementById('styleValue');
        styleSlider.addEventListener('input', function() {
            if (styleValue) {
                styleValue.textContent = `${this.value}%`;
            }
        });
        
        // 初始显示
        if (styleValue) {
            styleValue.textContent = `${styleSlider.value}%`;
        }
    }
    
    // 创意滑块
    if (creativitySlider) {
        const creativityValue = document.getElementById('creativityValue');
        creativitySlider.addEventListener('input', function() {
            if (creativityValue) {
                creativityValue.textContent = parseFloat(this.value).toFixed(1);
            }
        });
        
        // 初始显示
        if (creativityValue) {
            creativityValue.textContent = parseFloat(creativitySlider.value).toFixed(1);
        }
    }
    
    // 尺寸选项
    sizeOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                const sizeValue = document.getElementById('sizeValue');
                if (sizeValue) {
                    if (this.value === 'custom') {
                        sizeValue.textContent = '自定义尺寸';
                    } else {
                        sizeValue.textContent = this.value;
                    }
                }
            }
        });
    });
    
    // 预设卡片
    presetCards.forEach(card => {
        card.addEventListener('click', function() {
            const preset = this.getAttribute('data-preset');
            applyParameterPreset(preset);
            
            // 添加到聊天
            const presetMessage = generatePresetMessage(preset);
            addAgentMessage(presetMessage);
        });
    });
    
    // 应用参数预设
    function applyParameterPreset(preset) {
        const presets = {
            'photo-realistic': {
                quality: 9,
                style: 40,
                creativity: 0.3,
                size: '1024x1024',
                description: '照片级写实效果，适合产品展示和肖像'
            },
            'artistic-painting': {
                quality: 8,
                style: 80,
                creativity: 0.7,
                size: '1024x1024',
                description: '艺术绘画风格，适合创意作品和艺术表达'
            },
            'anime-style': {
                quality: 7,
                style: 75,
                creativity: 0.6,
                size: '768x768',
                description: '动漫风格，适合角色设计和插画'
            },
            'concept-art': {
                quality: 6,
                style: 60,
                creativity: 0.9,
                size: '768x768',
                description: '概念艺术，适合创意探索和快速迭代'
            }
        };
        
        const presetData = presets[preset] || presets['photo-realistic'];
        
        // 应用参数
        if (qualitySlider) {
            qualitySlider.value = presetData.quality;
            const qualityValue = document.getElementById('qualityValue');
            if (qualityValue) qualityValue.textContent = presetData.quality;
        }
        
        if (styleSlider) {
            styleSlider.value = presetData.style;
            const styleValue = document.getElementById('styleValue');
            if (styleValue) styleValue.textContent = `${presetData.style}%`;
        }
        
        if (creativitySlider) {
            creativitySlider.value = presetData.creativity;
            const creativityValue = document.getElementById('creativityValue');
            if (creativityValue) creativityValue.textContent = presetData.creativity.toFixed(1);
        }
        
        // 应用尺寸
        const sizeOption = document.querySelector(`input[name="size"][value="${presetData.size}"]`);
        if (sizeOption) {
            sizeOption.checked = true;
            const sizeValue = document.getElementById('sizeValue');
            if (sizeValue) sizeValue.textContent = presetData.size;
        }
        
        // 显示应用成功
        showToast(`已应用"${getPresetName(preset)}"预设`);
    }
    
    // 获取预设名称
    function getPresetName(preset) {
        const names = {
            'photo-realistic': '照片级写实',
            'artistic-painting': '艺术绘画',
            'anime-style': '动漫风格',
            'concept-art': '概念艺术'
        };
        return names[preset] || '专业预设';
    }
    
    // 生成预设消息
    function generatePresetMessage(preset) {
        const presets = {
            'photo-realistic': {
                name: '照片级写实',
                params: '质量：9，风格强度：40%，创意自由度：0.3，尺寸：1024×1024',
                tips: '适合产品展示、肖像摄影、商业用途'
            },
            'artistic-painting': {
                name: '艺术绘画',
                params: '质量：8，风格强度：80%，创意自由度：0.7，尺寸：1024×1024',
                tips: '适合创意作品、艺术表达、风格化设计'
            },
            'anime-style': {
                name: '动漫风格',
                params: '质量：7，风格强度：75%，创意自由度：0.6，尺寸：768×768',
                tips: '适合角色设计、插画、动漫创作'
            },
            'concept-art': {
                name: '概念艺术',
                params: '质量：6，风格强度：60%，创意自由度：0.9，尺寸：768×768',
                tips: '适合创意探索、快速迭代、概念设计'
            }
        };
        
        const presetData = presets[preset] || presets['photo-realistic'];
        
        let message = `## ⚙️ 参数预设已应用\n\n`;
        message += `**预设名称**：${presetData.name}\n`;
        message += `**应用时间**：${new Date().toLocaleString()}\n\n`;
        
        message += `**参数设置**：\n`;
        message += `- ${presetData.params}\n\n`;
        
        message += `**专业建议**：\n`;
        message += `- ${presetData.tips}\n`;
        message += `- 配合相应的提示词风格使用\n`;
        message += `- 根据生成结果微调参数\n`;
        message += `- 保存成功的参数组合`;
        
        return message;
    }
}

// 生成工具
function initGenerationTools() {
    // 这里可以添加生成历史、批量处理等功能
    // 由于时间关系，先实现基础功能
    console.log('生成工具初始化完成');
}

// 快速动作
function initQuickActions() {
    // 这里可以添加快速生成、批量处理等动作
    // 由于时间关系，先实现基础功能
    console.log('快速动作初始化完成');
}

// 工具函数：添加AI专家消息
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
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">即梦AI专家</span>
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
                handleAIExpertAction(actionId);
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
               .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
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

// 工具函数：显示Toast提示
function showToast(message, duration = 3000) {
    // 移除现有的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--dreamai-primary);
            color: white;
            padding: 12px 20px;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease ${duration}ms forwards;
            max-width: 300px;
            font-size: 0.875rem;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    // 自动移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
        if (style.parentNode) {
            style.remove();
        }
    }, duration + 300);
}

// 初始化完成
console.log('🤖 即梦AI专家 - 核心功能已初始化');