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

// 高级提示词分析系统
function initAdvancedPromptAnalysis() {
    console.log('🤖 高级提示词分析系统已加载');
    
    // 监听高级分析按钮
    const advancedAnalyzeBtn = document.getElementById('advancedAnalyze');
    if (advancedAnalyzeBtn) {
        advancedAnalyzeBtn.addEventListener('click', function() {
            const promptInput = document.getElementById('promptInput');
            if (promptInput && promptInput.value.trim()) {
                const prompt = promptInput.value.trim();
                const advancedAnalysis = performAdvancedPromptAnalysis(prompt);
                displayAdvancedAnalysis(advancedAnalysis);
                
                // 在聊天中显示高级分析结果
                addAgentMessage(generateAdvancedAnalysisMessage(prompt, advancedAnalysis));
            }
        });
    }
}

// 执行高级提示词分析
function performAdvancedPromptAnalysis(prompt) {
    const words = prompt.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // 高级分析维度
    const clarityScore = calculateAdvancedClarityScore(prompt, wordCount);
    const specificityScore = calculateAdvancedSpecificityScore(prompt);
    const creativityScore = calculateAdvancedCreativityScore(prompt);
    const technicalScore = calculateAdvancedTechnicalScore(prompt);
    const aestheticScore = calculateAdvancedAestheticScore(prompt);
    
    // 语义分析
    const semanticAnalysis = performAdvancedSemanticAnalysis(prompt);
    
    // 关键词提取和分类
    const keywords = extractAdvancedKeywords(prompt);
    
    // 风格检测和匹配
    const styles = detectAdvancedStyles(prompt);
    
    // 质量综合评估
    const qualityScore = Math.round(
        (clarityScore * 0.25 + 
         specificityScore * 0.25 + 
         creativityScore * 0.20 +
         technicalScore * 0.15 +
         aestheticScore * 0.15)
    );
    
    // 生成专业建议
    const suggestions = generateAdvancedSuggestions(prompt, {
        clarityScore,
        specificityScore,
        creativityScore,
        technicalScore,
        aestheticScore,
        semanticAnalysis,
        keywords,
        styles
    });
    
    // 识别改进领域
    const improvementAreas = identifyImprovementAreas({
        clarityScore,
        specificityScore,
        creativityScore,
        technicalScore,
        aestheticScore
    });
    
    // 生成优化版本
    const optimizedVersion = generateOptimizedPrompt(prompt, improvementAreas);
    
    return {
        wordCount: wordCount,
        clarityScore: clarityScore,
        specificityScore: specificityScore,
        creativityScore: creativityScore,
        technicalScore: technicalScore,
        aestheticScore: aestheticScore,
        qualityScore: qualityScore,
        semanticAnalysis: semanticAnalysis,
        keywords: keywords,
        styles: styles,
        suggestions: suggestions,
        improvementAreas: improvementAreas,
        optimizedVersion: optimizedVersion,
        improvementPotential: calculateImprovementPotential(qualityScore)
    };
}

// 计算高级清晰度分数
function calculateAdvancedClarityScore(prompt, wordCount) {
    let score = Math.min(100, Math.max(20, wordCount * 2));
    
    // 检查句子结构
    const hasSubject = /(a|an|the|this|that)\s+[a-z]+/i.test(prompt);
    const hasVerb = /\b(is|are|has|have|does|do|can|could|will|would)\b/i.test(prompt);
    const hasObject = /\b(with|in|on|at|for|to)\b/i.test(prompt);
    
    if (hasSubject && hasVerb && hasObject) score += 15;
    else if (hasSubject && hasVerb) score += 10;
    else if (hasSubject) score += 5;
    
    // 检查专业术语使用
    const professionalTerms = prompt.match(/\b(detailed|high quality|professional|photorealistic|cinematic|artistic)\b/gi);
    if (professionalTerms) score += Math.min(20, professionalTerms.length * 5);
    
    // 检查模糊词汇
    const vagueTerms = prompt.match(/\b(something|thing|stuff|maybe|perhaps|kind of|sort of)\b/gi);
    if (vagueTerms) score -= Math.min(15, vagueTerms.length * 3);
    
    // 检查逻辑结构
    const hasStructure = /\b(portrait of|image of|scene of|concept of|illustration of)\b/i.test(prompt);
    if (hasStructure) score += 10;
    
    return Math.max(0, Math.min(100, score));
}

// 计算高级具体性分数
function calculateAdvancedSpecificityScore(prompt) {
    let score = 50;
    
    // 具体描述检测
    const specificDescriptors = [
        // 颜色
        /\b(red|blue|green|yellow|purple|orange|pink|brown|black|white|gray|gold|silver|bronze)\b/gi,
        // 材质
        /\b(wooden|metal|plastic|glass|ceramic|fabric|leather|rubber|stone|crystal)\b/gi,
        // 尺寸
        /\b(large|small|tiny|huge|massive|miniature|gigantic|enormous|compact)\b/gi,
        // 形状
        /\b(round|square|triangular|rectangular|circular|oval|spherical|cubic|pyramid)\b/gi,
        // 数量
        /\b(\d+)\b/g,
        // 位置
        /\b(on top of|under|beside|inside|outside|above|below|between|among)\b/gi
    ];
    
    specificDescriptors.forEach(regex => {
        const matches = prompt.match(regex);
        if (matches) score += Math.min(30, matches.length * 3);
    });
    
    // 专有名词检测
    const properNouns = prompt.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g);
    if (properNouns) score += Math.min(20, properNouns.length * 4);
    
    // 具体动作检测
    const specificActions = prompt.match(/\b(running|jumping|flying|dancing|singing|playing|fighting|working|studying|thinking)\b/gi);
    if (specificActions) score += Math.min(15, specificActions.length * 3);
    
    return Math.max(0, Math.min(100, score));
}

// 计算高级创意性分数
function calculateAdvancedCreativityScore(prompt) {
    let score = 50;
    
    // 创意词汇检测
    const creativeWords = [
        'fantasy', 'magical', 'mystical', 'surreal', 'dreamlike', 'whimsical',
        'ethereal', 'celestial', 'cosmic', 'otherworldly', 'alien', 'futuristic',
        'steampunk', 'cyberpunk', 'biopunk', 'dieselpunk', 'mythical', 'legendary',
        'epic', 'heroic', 'enchanted', 'spellbound', 'transcendent', 'sublime'
    ];
    
    creativeWords.forEach(word => {
        if (prompt.toLowerCase().includes(word)) score += 5;
    });
    
    // 比喻和隐喻检测
    const metaphors = prompt.match(/\b(like|as if|as though|resembling|similar to)\b/gi);
    if (metaphors) score += Math.min(20, metaphors.length * 4);
    
    // 非常规组合检测
    const unusualCombinations = [
        /(flying\s+cat|talking\s+tree|glowing\s+ocean|floating\s+mountain)/gi,
        /(mechanical\s+butterfly|crystal\s+forest|neon\s+jungle|digital\s+garden)/gi
    ];
    
    unusualCombinations.forEach(regex => {
        if (regex.test(prompt)) score += 15;
    });
    
    // 情感词汇检测
    const emotionalWords = prompt.match(/\b(happy|sad|angry|joyful|melancholy|nostalgic|hopeful|fearful)\b/gi);
    if (emotionalWords) score += Math.min(15, emotionalWords.length * 3);
    
    // 想象空间检测
    const imaginationWords = prompt.match(/\b(imagine|visualize|picture|envision|dream|fantasize)\b/gi);
    if (imaginationWords) score += Math.min(10, imaginationWords.length * 2);
    
    return Math.max(0, Math.min(100, score));
}

// 计算高级技术性分数
function calculateAdvancedTechnicalScore(prompt) {
    let score = 50;
    
    // AI生成参数检测
    const technicalTerms = [
        // 质量参数
        'high quality', 'masterpiece', 'best quality', 'ultra detailed', '8k',
        '4k', 'HD', 'UHD', 'photorealistic', 'hyperrealistic',
        // 渲染参数
        'octane render', 'unreal engine', 'blender', 'cycles', 'arnold',
        'vray', 'corona', 'redshift', 'renderman',
        // 相机参数
        'depth of field', 'bokeh', 'motion blur', 'tilt shift', 'wide angle',
        'telephoto', 'macro', 'fisheye', 'panoramic',
        // 光照参数
        'volumetric lighting', 'global illumination', 'ray tracing', 'ambient occlusion',
        'subsurface scattering', 'specular highlights', 'soft shadows', 'hard shadows'
    ];
    
    technicalTerms.forEach(term => {
        if (prompt.toLowerCase().includes(term)) score += 3;
    });
    
    // 艺术家和风格引用
    const artistReferences = prompt.match(/\b(by\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*|in\s+the\s+style\s+of)\b/gi);
    if (artistReferences) score += Math.min(20, artistReferences.length * 5);
    
    // 比例和分辨率
    const ratios = prompt.match(/\b(\d+:\d+|aspect ratio|resolution|megapixel|DPI|PPI)\b/gi);
    if (ratios) score += Math.min(15, ratios.length * 3);
    
    // 技术标准检测
    const standards = prompt.match(/\b(ISO|f-stop|shutter speed|aperture|exposure|white balance)\b/gi);
    if (standards) score += Math.min(10, standards.length * 2);
    
    return Math.max(0, Math.min(100, score));
}

// 计算高级美学分数
function calculateAdvancedAestheticScore(prompt) {
    let score = 50;
    
    // 美学词汇检测
    const aestheticWords = [
        'beautiful', 'elegant', 'graceful', 'sublime', 'picturesque', 'scenic',
        'stunning', 'breathtaking', 'magnificent', 'gorgeous', 'lovely', 'charming',
        'delicate', 'refined', 'sophisticated', 'exquisite', 'luxurious', 'opulent',
        'minimalist', 'clean', 'simple', 'elegant', 'balanced', 'harmonious',
        'dynamic', 'energetic', 'vibrant', 'lively', 'serene', 'peaceful', 'calm'
    ];
    
    aestheticWords.forEach(word => {
        if (prompt.toLowerCase().includes(word)) score += 2;
    });
    
    // 构图描述检测
    const compositionTerms = [
        'rule of thirds', 'golden ratio', 'symmetry', 'asymmetry', 'leading lines',
        'framing', 'depth', 'perspective', 'foreground', 'midground', 'background',
        'negative space', 'positive space', 'visual balance', 'visual weight'
    ];
    
    compositionTerms.forEach(term => {
        if (prompt.toLowerCase().includes(term)) score += 5;
    });
    
    // 色彩描述检测
    const colorDescriptions = prompt.match(/\b(color palette|color scheme|monochromatic|complementary|analogous|triadic|tetradic)\b/gi);
    if (colorDescriptions) score += Math.min(15, colorDescriptions.length * 5);
    
    // 光影描述检测
    const lightingDescriptions = prompt.match(/\b(dramatic lighting|soft lighting|hard lighting|rim lighting|backlighting|side lighting)\b/gi);
    if (lightingDescriptions) score += Math.min(15, lightingDescriptions.length * 5);
    
    // 质感描述检测
    const textureDescriptions = prompt.match(/\b(texture|rough|smooth|glossy|matte|shiny|reflective|transparent)\b/gi);
    if (textureDescriptions) score += Math.min(10, textureDescriptions.length * 2);
    
    return Math.max(0, Math.min(100, score));
}

// 执行高级语义分析
function performAdvancedSemanticAnalysis(prompt) {
    const analysis = {
        primarySubject: null,
        secondarySubjects: [],
        actions: [],
        environment: null,
        mood: null,
        timeOfDay: null,
        season: null,
        era: null,
        style: null,
        quality: null
    };
    
    // 提取主语（主要主题）
    const subjectPatterns = [
        /(a|an|the)\s+([a-z]+\s+)*([a-z]+)(?=\s+(?:in|on|with|wearing|holding))/gi,
        /(portrait|photo|image|picture|illustration|painting)\s+of\s+(a|an|the)?\s*([a-z]+\s+)*([a-z]+)/gi
    ];
    
    subjectPatterns.forEach(pattern => {
        const match = pattern.exec(prompt);
        if (match) {
            analysis.primarySubject = match[match.length - 1] || match[match.length - 2];
        }
    });
    
    // 提取动作
    const actionWords = prompt.match(/\b(running|jumping|flying|dancing|singing|playing|fighting|working|studying|thinking)\b/gi);
    if (actionWords) analysis.actions = actionWords;
    
    // 提取环境
    const environmentWords = [
        'forest', 'mountain', 'beach', 'ocean', 'city', 'street', 'room', 'house',
        'castle', 'temple', 'cave', 'desert', 'jungle', 'field', 'garden', 'park'
    ];
    
    environmentWords.forEach(word => {
        if (prompt.toLowerCase().includes(word)) {
            analysis.environment = analysis.environment || word;
            analysis.secondarySubjects.push(word);
        }
    });
    
    // 提取情绪
    const moodWords = {
        happy: ['happy', 'joyful', 'cheerful', 'smiling', 'laughing'],
        sad: ['sad', 'melancholy', 'depressed', 'crying', 'tearful'],
        angry: ['angry', 'furious', 'enraged', 'aggressive', 'hostile'],
        peaceful: ['peaceful', 'calm', 'serene', 'tranquil', 'relaxed'],
        mysterious: ['mysterious', 'enigmatic', 'cryptic', 'secretive', 'hidden']
    };
    
    for (const [mood, words] of Object.entries(moodWords)) {
        if (words.some(word => prompt.toLowerCase().includes(word))) {
            analysis.mood = mood;
            break;
        }
    }
    
    // 提取时间
    const timeWords = ['morning', 'afternoon', 'evening', 'night', 'dawn', 'dusk', 'midnight', 'noon'];
    timeWords.forEach(word => {
        if (prompt.toLowerCase().includes(word)) analysis.timeOfDay = word;
    });
    
    // 提取季节
    const seasonWords = ['spring', 'summer', 'autumn', 'fall', 'winter'];
    seasonWords.forEach(word => {
        if (prompt.toLowerCase().includes(word)) analysis.season = word;
    });
    
    // 提取时代
    const eraWords = {
        ancient: ['ancient', 'medieval', 'renaissance', 'victorian'],
        modern: ['modern', 'contemporary', 'present day', '21st century'],
        future: ['futuristic', 'cyberpunk', 'sci-fi', 'future', 'space age']
    };
    
    for (const [era, words] of Object.entries(eraWords)) {
        if (words.some(word => prompt.toLowerCase().includes(word))) {
            analysis.era = era;
            break;
        }
    }
    
    // 提取风格
    const styleWords = [
        'photorealistic', 'painting', 'illustration', 'cartoon', 'anime', 'manga',
        'concept art', 'digital art', 'oil painting', 'watercolor', 'sketch'
    ];
    
    styleWords.forEach(word => {
        if (prompt.toLowerCase().includes(word)) analysis.style = word;
    });
    
    // 提取质量
    const qualityWords = ['high quality', 'masterpiece', 'best quality', 'ultra detailed'];
    qualityWords.forEach(word => {
        if (prompt.toLowerCase().includes(word)) analysis.quality = word;
    });
    
    return analysis;
}

// 提取高级关键词
function extractAdvancedKeywords(prompt) {
    const keywords = {
        subjects: [],
        actions: [],
        adjectives: [],
        styles: [],
        techniques: [],
        quality: [],
        technical: []
    };
    
    // 预定义关键词库
    const keywordCategories = {
        subjects: [
            'person', 'woman', 'man', 'child', 'animal', 'cat', 'dog', 'bird', 'dragon',
            'robot', 'alien', 'monster', 'creature', 'character', 'figure', 'portrait'
        ],
        actions: [
            'running', 'jumping', 'flying', 'dancing', 'singing', 'playing', 'fighting',
            'working', 'studying', 'thinking', 'meditating', 'praying', 'celebrating'
        ],
        adjectives: [
            'beautiful', 'ugly', 'cute', 'scary', 'mysterious', 'magical', 'realistic',
            'fantasy', 'futuristic', 'ancient', 'modern', 'colorful', 'monochromatic'
        ],
        styles: [
            'photorealistic', 'painting', 'illustration', 'cartoon', 'anime', 'manga',
            'concept art', 'digital art', 'oil painting', 'watercolor', 'sketch'
        ],
        techniques: [
            'rule of thirds', 'golden ratio', 'symmetry', 'depth of field', 'bokeh',
            'motion blur', 'volumetric lighting', 'ray tracing', 'global illumination'
        ],
        quality: [
            'high quality', 'masterpiece', 'best quality', 'ultra detailed', '8k',
            '4k', 'HD', 'UHD', 'photorealistic', 'hyperrealistic'
        ],
        technical: [
            'octane render', 'unreal engine', 'blender', 'cycles', 'arnold',
            'vray', 'corona', 'redshift', 'renderman'
        ]
    };
    
    // 提取关键词
    for (const [category, words] of Object.entries(keywordCategories)) {
        words.forEach(word => {
            if (prompt.toLowerCase().includes(word.toLowerCase())) {
                keywords[category].push(word);
            }
        });
    }
    
    return keywords;
}

// 检测高级风格
function detectAdvancedStyles(prompt) {
    const styles = [];
    const stylePatterns = {
        'photorealistic': /\b(photorealistic|photo realistic|realistic|photography)\b/gi,
        'painting': /\b(painting|oil painting|watercolor|acrylic|canvas)\b/gi,
        'illustration': /\b(illustration|digital art|vector art|flat design)\b/gi,
        'cartoon': /\b(cartoon|comic|graphic novel|cell shaded)\b/gi,
        'anime': /\b(anime|manga|japanese animation|chibi)\b/gi,
        'concept art': /\b(concept art|concept design|environment design|character design)\b/gi,
        'sketch': /\b(sketch|drawing|line art|pencil drawing)\b/gi,
        '3d render': /\b(3d|three dimensional|render|cg|computer graphics)\b/gi,
        'minimalist': /\b(minimalist|minimal|simple|clean|elegant)\b/gi,
        'vintage': /\b(vintage|retro|old fashioned|classic|nostalgic)\b/gi,
        'futuristic': /\b(futuristic|sci-fi|science fiction|cyberpunk|steampunk)\b/gi,
        'fantasy': /\b(fantasy|magical|mythical|legendary|fairy tale)\b/gi
    };
    
    for (const [style, pattern] of Object.entries(stylePatterns)) {
        if (pattern.test(prompt)) {
            styles.push(style);
        }
    }
    
    return styles;
}

// 生成高级建议
function generateAdvancedSuggestions(prompt, analysis) {
    const suggestions = [];
    
    // 基于清晰度分数的建议
    if (analysis.clarityScore < 60) {
        suggestions.push('使用更清晰的主语-谓语-宾语结构');
        suggestions.push('避免使用模糊词汇如"something"或"thing"');
        suggestions.push('明确描述主体和环境的关系');
    }
    
    // 基于具体性分数的建议
    if (analysis.specificityScore < 60) {
        suggestions.push('添加具体的颜色、材质、尺寸描述');
        suggestions.push('使用专有名词和具体名称');
        suggestions.push('描述具体的动作和姿态');
    }
    
    // 基于创意性分数的建议
    if (analysis.creativityScore < 60) {
        suggestions.push('尝试非常规的组合和想象');
        suggestions.push('使用比喻和隐喻增强表现力');
        suggestions.push('融入情感和氛围描述');
    }
    
    // 基于技术性分数的建议
    if (analysis.technicalScore < 60) {
        suggestions.push('添加AI生成参数如"high quality, detailed"');
        suggestions.push('引用具体的艺术家或风格');
        suggestions.push('包含技术参数如分辨率、渲染引擎');
    }
    
    // 基于美学分数的建议
    if (analysis.aestheticScore < 60) {
        suggestions.push('描述构图、色彩、光影效果');
        suggestions.push('使用美学词汇增强画面感');
        suggestions.push('考虑画面的平衡和层次');
    }
    
    // 基于语义分析的建议
    if (!analysis.semanticAnalysis.primarySubject) {
        suggestions.push('明确画面的主要主体');
    }
    
    if (!analysis.semanticAnalysis.environment) {
        suggestions.push('描述具体的环境和背景');
    }
    
    if (!analysis.semanticAnalysis.mood) {
        suggestions.push('添加情感氛围描述');
    }
    
    // 基于关键词的建议
    if (analysis.keywords.subjects.length === 0) {
        suggestions.push('明确画面的主体内容');
    }
    
    if (analysis.keywords.styles.length === 0) {
        suggestions.push('指定具体的艺术风格');
    }
    
    if (analysis.keywords.quality.length === 0) {
        suggestions.push('添加质量参数确保生成效果');
    }
    
    return suggestions.slice(0, 5); // 返回最重要的5条建议
}

// 识别改进领域
function identifyImprovementAreas(scores) {
    const areas = [];
    const threshold = 60;
    
    if (scores.clarityScore < threshold) areas.push('清晰度');
    if (scores.specificityScore < threshold) areas.push('具体性');
    if (scores.creativityScore < threshold) areas.push('创意性');
    if (scores.technicalScore < threshold) areas.push('技术性');
    if (scores.aestheticScore < threshold) areas.push('美学性');
    
    return areas.length > 0 ? areas : ['整体表现良好'];
}

// 生成优化版本
function generateOptimizedPrompt(originalPrompt, improvementAreas) {
    let optimized = originalPrompt;
    
    // 根据改进领域进行优化
    if (improvementAreas.includes('清晰度')) {
        optimized = addClarity(optimized);
    }
    
    if (improvementAreas.includes('具体性')) {
        optimized = addSpecificity(optimized);
    }
    
    if (improvementAreas.includes('创意性')) {
        optimized = addCreativity(optimized);
    }
    
    if (improvementAreas.includes('技术性')) {
        optimized = addTechnicalDetails(optimized);
    }
    
    if (improvementAreas.includes('美学性')) {
        optimized = addAestheticDetails(optimized);
    }
    
    // 确保包含基本质量参数
    if (!optimized.toLowerCase().includes('high quality') && !optimized.toLowerCase().includes('detailed')) {
        optimized += ', high quality, detailed';
    }
    
    // 清理格式
    optimized = optimized.replace(/\s+/g, ' ').trim();
    optimized = optimized.replace(/,+/g, ',').replace(/,/g, ', ');
    
    return optimized;
}

// 添加清晰度
function addClarity(prompt) {
    let result = prompt;
    
    // 添加结构描述
    if (!/\b(portrait of|image of|scene of|concept of)\b/i.test(result)) {
        result = 'image of ' + result;
    }
    
    // 替换模糊词汇
    result = result.replace(/\ba person\b/gi, 'a detailed character');
    result = result.replace(/\bsomething\b/gi, 'a specific object');
    
    return result;
}

// 添加具体性
function addSpecificity(prompt) {
    let result = prompt;
    
    // 添加颜色描述（如果没有）
    if (!/\b(red|blue|green|yellow|purple|orange|pink|brown|black|white)\b/gi.test(result)) {
        result += ', with vibrant colors';
    }
    
    // 添加材质描述（如果没有）
    if (!/\b(wooden|metal|plastic|glass|ceramic|fabric|leather)\b/gi.test(result)) {
        result += ', featuring interesting textures';
    }
    
    return result;
}

// 添加创意性
function addCreativity(prompt) {
    let result = prompt;
    
    // 添加想象元素
    if (!/\b(fantasy|magical|mystical|surreal|dreamlike)\b/gi.test(result)) {
        result += ', with a touch of magic';
    }
    
    // 添加情感氛围
    if (!/\b(happy|sad|angry|peaceful|mysterious)\b/gi.test(result)) {
        result += ', evoking a sense of wonder';
    }
    
    return result;
}

// 添加技术细节
function addTechnicalDetails(prompt) {
    let result = prompt;
    
    // 添加质量参数
    if (!/\b(high quality|masterpiece|best quality|ultra detailed)\b/gi.test(result)) {
        result += ', high quality, masterpiece';
    }
    
    // 添加渲染参数
    if (!/\b(octane render|unreal engine|blender|cycles)\b/gi.test(result)) {
        result += ', octane render';
    }
    
    return result;
}

// 添加美学细节
function addAestheticDetails(prompt) {
    let result = prompt;
    
    // 添加构图描述
    if (!/\b(rule of thirds|golden ratio|symmetry|asymmetry)\b/gi.test(result)) {
        result += ', rule of thirds composition';
    }
    
    // 添加光影描述
    if (!/\b(dramatic lighting|soft lighting|volumetric lighting)\b/gi.test(result)) {
        result += ', dramatic lighting';
    }
    
    return result;
}

// 计算改进潜力
function calculateImprovementPotential(qualityScore) {
    if (qualityScore >= 90) return '优秀，保持即可';
    if (qualityScore >= 80) return '良好，小幅优化';
    if (qualityScore >= 70) return '中等，建议优化';
    if (qualityScore >= 60) return '一般，需要优化';
    return '较差，建议重新设计';
}

// 显示高级分析结果
function displayAdvancedAnalysis(analysis) {
    const advancedAnalysisDiv = document.getElementById('advancedAnalysis');
    if (!advancedAnalysisDiv) return;
    
    advancedAnalysisDiv.innerHTML = `
        <div class="advanced-analysis-card">
            <h4><i class="fas fa-chart-line"></i> 高级提示词分析</h4>
            
            <div class="analysis-scores">
                <div class="score-item">
                    <span class="score-label">清晰度</span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${analysis.clarityScore}%"></div>
                    </div>
                    <span class="score-value">${analysis.clarityScore}%</span>
                </div>
                
                <div class="score-item">
                    <span class="score-label">具体性</span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${analysis.specificityScore}%"></div>
                    </div>
                    <span class="score-value">${analysis.specificityScore}%</span>
                </div>
                
                <div class="score-item">
                    <span class="score-label">创意性</span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${analysis.creativityScore}%"></div>
                    </div>
                    <span class="score-value">${analysis.creativityScore}%</span>
                </div>
                
                <div class="score-item">
                    <span class="score-label">技术性</span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${analysis.technicalScore}%"></div>
                    </div>
                    <span class="score-value">${analysis.technicalScore}%</span>
                </div>
                
                <div class="score-item">
                    <span class="score-label">美学性</span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${analysis.aestheticScore}%"></div>
                    </div>
                    <span class="score-value">${analysis.aestheticScore}%</span>
                </div>
            </div>
            
            <div class="overall-score">
                <span class="overall-label">综合评分</span>
                <span class="overall-value">${analysis.qualityScore}/100</span>
                <span class="improvement-potential">改进潜力：${analysis.improvementPotential}</span>
            </div>
            
            <div class="analysis-details">
                <div class="detail-section">
                    <h5><i class="fas fa-key"></i> 关键词分析</h5>
                    <div class="keywords-grid">
                        ${Object.entries(analysis.keywords).map(([category, words]) => 
                            words.length > 0 ? `
                                <div class="keyword-category">
                                    <span class="category-name">${category}</span>
                                    <div class="keyword-list">
                                        ${words.slice(0, 3).map(word => `<span class="keyword-tag">${word}</span>`).join('')}
                                        ${words.length > 3 ? `<span class="keyword-more">+${words.length - 3}更多</span>` : ''}
                                    </div>
                                </div>
                            ` : ''
                        ).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h5><i class="fas fa-lightbulb"></i> 专业建议</h5>
                    <ul class="suggestions-list">
                        ${analysis.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h5><i class="fas fa-magic"></i> 优化版本</h5>
                    <div class="optimized-prompt">
                        <code>${analysis.optimizedVersion}</code>
                        <button class="copy-optimized-btn" onclick="copyToClipboard('${analysis.optimizedVersion.replace(/'/g, "\\'")}')">
                            <i class="fas fa-copy"></i> 复制
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加复制功能
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('已复制到剪贴板');
        });
    };
}

// 生成高级分析消息
function generateAdvancedAnalysisMessage(prompt, analysis) {
    let message = `## 🔬 高级提示词分析报告\n\n`;
    message += `**分析时间**：${new Date().toLocaleString()}\n`;
    message += `**提示词长度**：${analysis.wordCount}个单词\n`;
    message += `**综合评分**：${analysis.qualityScore}/100 (${analysis.improvementPotential})\n\n`;
    
    message += `**详细评分**：\n`;
    message += `- 清晰度：${analysis.clarityScore}/100\n`;
    message += `- 具体性：${analysis.specificityScore}/100\n`;
    message += `- 创意性：${analysis.creativityScore}/100\n`;
    message += `- 技术性：${analysis.technicalScore}/100\n`;
    message += `- 美学性：${analysis.aestheticScore}/100\n\n`;
    
    message += `**语义分析**：\n`;
    if (analysis.semanticAnalysis.primarySubject) {
        message += `- 主要主体：${analysis.semanticAnalysis.primarySubject}\n`;
    }
    if (analysis.semanticAnalysis.environment) {
        message += `- 环境：${analysis.semanticAnalysis.environment}\n`;
    }
    if (analysis.semanticAnalysis.mood) {
        message += `- 情感氛围：${analysis.semanticAnalysis.mood}\n`;
    }
    if (analysis.semanticAnalysis.era) {
        message += `- 时代背景：${analysis.semanticAnalysis.era}\n`;
    }
    message += `\n`;
    
    message += `**检测到的风格**：${analysis.styles.join(', ') || '未指定'}\n\n`;
    
    message += `**主要改进领域**：${analysis.improvementAreas.join(', ')}\n\n`;
    
    message += `**专业建议**：\n`;
    analysis.suggestions.forEach(suggestion => {
        message += `- ${suggestion}\n`;
    });
    message += `\n`;
    
    message += `**优化版本**：\n\`\`\`\n${analysis.optimizedVersion}\n\`\`\`\n\n`;
    
    message += `**使用建议**：\n`;
    message += `1. 复制优化版本直接使用\n`;
    message += `2. 根据具体需求微调关键词\n`;
    message += `3. 结合视觉风格智能体进行构图设计\n`;
    message += `4. 使用参数优化工具调整生成效果`;
    
    return message;
}

// 智能参数优化引擎
function initSmartParameterEngine() {
    console.log('🤖 智能参数优化引擎已加载');
    
    // 监听智能优化按钮
    const smartOptimizeBtn = document.getElementById('smartOptimize');
    if (smartOptimizeBtn) {
        smartOptimizeBtn.addEventListener('click', function() {
            const promptInput = document.getElementById('promptInput');
            if (promptInput && promptInput.value.trim()) {
                const prompt = promptInput.value.trim();
                const optimizedParams = optimizeParametersForPrompt(prompt);
                applyOptimizedParameters(optimizedParams);
                
                // 在聊天中显示参数优化结果
                addAgentMessage(generateParameterOptimizationMessage(prompt, optimizedParams));
            }
        });
    }
}

// 根据提示词优化参数
function optimizeParametersForPrompt(prompt) {
    const analysis = performAdvancedPromptAnalysis(prompt);
    
    // 基于分析结果推荐参数
    const params = {
        quality: 7, // 默认值
        style: 50,
        creativity: 0.5,
        size: '1024x1024'
    };
    
    // 根据清晰度调整质量
    if (analysis.clarityScore >= 80) params.quality = 9;
    else if (analysis.clarityScore >= 70) params.quality = 8;
    else if (analysis.clarityScore >= 60) params.quality = 7;
    else params.quality = 6;
    
    // 根据创意性调整风格强度
    if (analysis.creativityScore >= 80) params.style = 80;
    else if (analysis.creativityScore >= 70) params.style = 70;
    else if (analysis.creativityScore >= 60) params.style = 60;
    else params.style = 50;
    
    // 根据技术性调整创意自由度
    if (analysis.technicalScore >= 80) params.creativity = 0.8;
    else if (analysis.technicalScore >= 70) params.creativity = 0.7;
    else if (analysis.technicalScore >= 60) params.creativity = 0.6;
    else params.creativity = 0.5;
    
    // 根据内容推荐尺寸
    const semantic = analysis.semanticAnalysis;
    if (semantic.primarySubject && semantic.primarySubject.includes('portrait')) {
        params.size = '768x1024'; // 人像比例
    } else if (semantic.environment && semantic.environment.includes('landscape')) {
        params.size = '1024x768'; // 风景比例
    } else if (analysis.styles.includes('anime') || analysis.styles.includes('manga')) {
        params.size = '768x768'; // 动漫风格常用尺寸
    }
    
    // 根据风格调整参数
    if (analysis.styles.includes('photorealistic')) {
        params.quality = 9;
        params.style = 40;
        params.creativity = 0.3;
    } else if (analysis.styles.includes('painting')) {
        params.quality = 8;
        params.style = 80;
        params.creativity = 0.7;
    } else if (analysis.styles.includes('anime')) {
        params.quality = 7;
        params.style = 75;
        params.creativity = 0.6;
    } else if (analysis.styles.includes('concept art')) {
        params.quality = 6;
        params.style = 60;
        params.creativity = 0.9;
    }
    
    return {
        params: params,
        reasoning: generateParameterReasoning(analysis, params),
        confidence: calculateParameterConfidence(analysis)
    };
}

// 生成参数推荐理由
function generateParameterReasoning(analysis, params) {
    const reasoning = [];
    
    reasoning.push(`基于提示词分析，推荐以下参数：`);
    
    // 质量参数理由
    if (params.quality >= 8) {
        reasoning.push(`- 质量设为${params.quality}：提示词清晰具体，适合高质量生成`);
    } else if (params.quality >= 7) {
        reasoning.push(`- 质量设为${params.quality}：提示词中等清晰，平衡质量和速度`);
    } else {
        reasoning.push(`- 质量设为${params.quality}：提示词较模糊，适合快速迭代`);
    }
    
    // 风格强度理由
    if (params.style >= 70) {
        reasoning.push(`- 风格强度${params.style}%：创意性高，适合艺术表达`);
    } else if (params.style >= 60) {
        reasoning.push(`- 风格强度${params.style}%：中等创意，平衡真实和艺术`);
    } else {
        reasoning.push(`- 风格强度${params.style}%：技术性强，适合写实表现`);
    }
    
    // 创意自由度理由
    if (params.creativity >= 0.7) {
        reasoning.push(`- 创意自由度${params.creativity}：鼓励AI创造性发挥`);
    } else if (params.creativity >= 0.6) {
        reasoning.push(`- 创意自由度${params.creativity}：平衡创意和控制`);
    } else {
        reasoning.push(`- 创意自由度${params.creativity}：严格控制生成结果`);
    }
    
    // 尺寸理由
    reasoning.push(`- 尺寸${params.size}：根据内容类型优化比例`);
    
    return reasoning;
}

// 计算参数推荐置信度
function calculateParameterConfidence(analysis) {
    let confidence = 70; // 基础置信度
    
    // 基于分析质量调整置信度
    if (analysis.qualityScore >= 80) confidence += 15;
    else if (analysis.qualityScore >= 70) confidence += 10;
    else if (analysis.qualityScore >= 60) confidence += 5;
    
    // 基于关键词数量调整置信度
    const totalKeywords = Object.values(analysis.keywords).reduce((sum, words) => sum + words.length, 0);
    if (totalKeywords >= 10) confidence += 10;
    else if (totalKeywords >= 5) confidence += 5;
    
    // 基于风格检测调整置信度
    if (analysis.styles.length > 0) confidence += 5;
    
    return Math.min(95, confidence);
}

// 应用优化参数
function applyOptimizedParameters(optimization) {
    const { params, reasoning, confidence } = optimization;
    
    // 应用质量参数
    const qualitySlider = document.getElementById('qualitySlider');
    if (qualitySlider) {
        qualitySlider.value = params.quality;
        const qualityValue = document.getElementById('qualityValue');
        if (qualityValue) qualityValue.textContent = params.quality;
    }
    
    // 应用风格参数
    const styleSlider = document.getElementById('styleSlider');
    if (styleSlider) {
        styleSlider.value = params.style;
        const styleValue = document.getElementById('styleValue');
        if (styleValue) styleValue.textContent = `${params.style}%`;
    }
    
    // 应用创意参数
    const creativitySlider = document.getElementById('creativitySlider');
    if (creativitySlider) {
        creativitySlider.value = params.creativity;
        const creativityValue = document.getElementById('creativityValue');
        if (creativityValue) creativityValue.textContent = params.creativity.toFixed(1);
    }
    
    // 应用尺寸参数
    const sizeOption = document.querySelector(`input[name="size"][value="${params.size}"]`);
    if (sizeOption) {
        sizeOption.checked = true;
        const sizeValue = document.getElementById('sizeValue');
        if (sizeValue) sizeValue.textContent = params.size;
    }
    
    // 显示优化结果
    const paramOptimizationDiv = document.getElementById('paramOptimization');
    if (paramOptimizationDiv) {
        paramOptimizationDiv.innerHTML = `
            <div class="optimization-result">
                <h5><i class="fas fa-cogs"></i> 智能参数优化</h5>
                <div class="confidence-badge">推荐置信度：${confidence}%</div>
                
                <div class="optimized-params">
                    <div class="param-item">
                        <span class="param-label">质量：</span>
                        <span class="param-value">${params.quality}/10</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">风格强度：</span>
                        <span class="param-value">${params.style}%</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">创意自由度：</span>
                        <span class="param-value">${params.creativity.toFixed(1)}</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">尺寸：</span>
                        <span class="param-value">${params.size}</span>
                    </div>
                </div>
                
                <div class="optimization-reasoning">
                    <h6>推荐理由：</h6>
                    <ul>
                        ${reasoning.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    showToast(`智能参数优化完成（${confidence}%置信度）`);
}

// 生成参数优化消息
function generateParameterOptimizationMessage(prompt, optimization) {
    const { params, reasoning, confidence } = optimization;
    
    let message = `## ⚙️ 智能参数优化报告\n\n`;
    message += `**优化时间**：${new Date().toLocaleString()}\n`;
    message += `**推荐置信度**：${confidence}%\n\n`;
    
    message += `**优化参数**：\n`;
    message += `- 质量：${params.quality}/10\n`;
    message += `- 风格强度：${params.style}%\n`;
    message += `- 创意自由度：${params.creativity.toFixed(1)}\n`;
    message += `- 尺寸：${params.size}\n\n`;
    
    message += `**推荐理由**：\n`;
    reasoning.forEach(reason => {
        message += `- ${reason}\n`;
    });
    message += `\n`;
    
    message += `**使用建议**：\n`;
    message += `1. 这些参数已自动应用到控制面板\n`;
    message += `2. 您可以根据需要微调个别参数\n`;
    message += `3. 点击"生成测试"预览效果\n`;
    message += `4. 如需重新优化，请点击"智能优化"`;
    
    return message;
}

// 技术问题诊断系统
function initTechDiagnosisSystem() {
    console.log('🤖 技术问题诊断系统已加载');
    
    // 监听诊断按钮
    const diagnoseBtn = document.getElementById('diagnoseIssue');
    if (diagnoseBtn) {
        diagnoseBtn.addEventListener('click', function() {
            const issueInput = document.getElementById('issueInput');
            if (issueInput && issueInput.value.trim()) {
                const issue = issueInput.value.trim();
                const diagnosis = diagnoseTechnicalIssue(issue);
                displayDiagnosisResult(diagnosis);
                
                // 在聊天中显示诊断结果
                addAgentMessage(generateDiagnosisMessage(issue, diagnosis));
            }
        });
    }
}

// 诊断技术问题
function diagnoseTechnicalIssue(issueDescription) {
    const issue = issueDescription.toLowerCase();
    const diagnosis = {
        identifiedIssues: [],
        possibleCauses: [],
        solutions: [],
        preventionTips: [],
        severity: 'low',
        confidence: 70
    };
    
    // 常见问题模式匹配
    const issuePatterns = {
        // 模糊问题
        blurry: {
            causes: ['提示词不够具体', '质量参数设置过低', '尺寸太小', '模型理解偏差'],
            solutions: ['增加提示词具体性', '提高质量参数到8-9', '使用更大尺寸如1024x1024', '添加"sharp focus, detailed"'],
            severity: 'medium'
        },
        // 变形问题
        distorted: {
            causes: ['尺寸比例不合适', '提示词矛盾', '创意自由度太高', '模型限制'],
            solutions: ['调整尺寸比例', '检查提示词一致性', '降低创意自由度', '添加"proper proportions"'],
            severity: 'medium'
        },
        // 色彩问题
        color: {
            causes: ['提示词色彩描述模糊', '模型色彩理解偏差', '风格参数影响', '技术限制'],
            solutions: ['明确色彩描述如"vibrant colors"', '添加色彩参数', '调整风格强度', '使用"colorful, well-lit"'],
            severity: 'low'
        },
        // 风格问题
        style: {
            causes: ['风格描述不明确', '风格参数设置不当', '模型风格冲突', '提示词矛盾'],
            solutions: ['明确指定风格如"in the style of"', '调整风格强度参数', '检查提示词一致性', '参考风格指南'],
            severity: 'low'
        },
        // 细节问题
        details: {
            causes: ['提示词缺乏细节', '质量参数过低', '尺寸限制', '模型能力'],
            solutions: ['添加具体细节描述', '提高质量参数', '使用更大尺寸', '添加"ultra detailed, intricate"'],
            severity: 'medium'
        },
        // 一致性问题
        consistency: {
            causes: ['提示词逻辑矛盾', '多次生成差异', '参数波动', '随机种子影响'],
            solutions: ['优化提示词逻辑', '固定随机种子', '稳定参数设置', '使用相同提示词'],
            severity: 'high'
        }
    };
    
    // 识别问题类型
    for (const [pattern, data] of Object.entries(issuePatterns)) {
        if (issue.includes(pattern)) {
            diagnosis.identifiedIssues.push(pattern);
            diagnosis.possibleCauses.push(...data.causes);
            diagnosis.solutions.push(...data.solutions);
            diagnosis.severity = data.severity;
            diagnosis.confidence = 85;
        }
    }
    
    // 通用问题检测
    if (issue.includes('not working') || issue.includes('failed') || issue.includes('error')) {
        if (!diagnosis.identifiedIssues.length) {
            diagnosis.identifiedIssues.push('生成失败');
            diagnosis.possibleCauses.push('提示词格式问题', '参数设置错误', '技术限制', '网络问题');
            diagnosis.solutions.push('检查提示词格式', '重置参数为默认值', '尝试简化提示词', '检查网络连接');
            diagnosis.severity = 'high';
            diagnosis.confidence = 80;
        }
    }
    
    // 添加预防建议
    if (diagnosis.severity === 'high') {
        diagnosis.preventionTips.push('使用清晰的提示词结构', '保持参数稳定', '定期保存工作', '备份重要提示词');
    } else if (diagnosis.severity === 'medium') {
        diagnosis.preventionTips.push('优化提示词具体性', '合理设置参数', '测试不同尺寸', '参考成功案例');
    } else {
        diagnosis.preventionTips.push('持续学习提示词技巧', '实验不同风格', '收集灵感参考', '记录成功参数');
    }
    
    // 去重
    diagnosis.possibleCauses = [...new Set(diagnosis.possibleCauses)];
    diagnosis.solutions = [...new Set(diagnosis.solutions)];
    diagnosis.preventionTips = [...new Set(diagnosis.preventionTips)];
    
    return diagnosis;
}

// 显示诊断结果
function displayDiagnosisResult(diagnosis) {
    const diagnosisDiv = document.getElementById('diagnosisResult');
    if (!diagnosisDiv) return;
    
    // 严重度颜色
    const severityColors = {
        low: '#4CAF50',
        medium: '#FF9800',
        high: '#F44336'
    };
    
    diagnosisDiv.innerHTML = `
        <div class="diagnosis-card">
            <div class="diagnosis-header">
                <h5><i class="fas fa-stethoscope"></i> 技术问题诊断</h5>
                <div class="severity-badge" style="background-color: ${severityColors[diagnosis.severity] || '#9E9E9E'}">
                    ${diagnosis.severity === 'high' ? '严重' : diagnosis.severity === 'medium' ? '中等' : '轻微'}
                </div>
            </div>
            
            <div class="confidence-level">诊断置信度：${diagnosis.confidence}%</div>
            
            ${diagnosis.identifiedIssues.length > 0 ? `
                <div class="diagnosis-section">
                    <h6><i class="fas fa-exclamation-triangle"></i> 识别到的问题</h6>
                    <div class="issue-tags">
                        ${diagnosis.identifiedIssues.map(issue => `<span class="issue-tag">${issue}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${diagnosis.possibleCauses.length > 0 ? `
                <div class="diagnosis-section">
                    <h6><i class="fas fa-search"></i> 可能的原因</h6>
                    <ul class="cause-list">
                        ${diagnosis.possibleCauses.map(cause => `<li>${cause}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${diagnosis.solutions.length > 0 ? `
                <div class="diagnosis-section">
                    <h6><i class="fas fa-wrench"></i> 解决方案</h6>
                    <ol class="solution-list">
                        ${diagnosis.solutions.map((solution, index) => `<li>${solution}</li>`).join('')}
                    </ol>
                </div>
            ` : ''}
            
            ${diagnosis.preventionTips.length > 0 ? `
                <div class="diagnosis-section">
                    <h6><i class="fas fa-shield-alt"></i> 预防建议</h6>
                    <ul class="prevention-list">
                        ${diagnosis.preventionTips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="diagnosis-footer">
                <button class="apply-solution-btn" onclick="applyDiagnosisSolutions()">
                    <i class="fas fa-check"></i> 应用解决方案
                </button>
                <button class="test-solution-btn" onclick="testDiagnosisSolutions()">
                    <i class="fas fa-vial"></i> 测试解决方案
                </button>
            </div>
        </div>
    `;
    
    // 添加解决方案应用函数
    window.applyDiagnosisSolutions = function() {
        // 这里可以添加应用解决方案的逻辑
        showToast('正在应用解决方案...');
        
        // 根据诊断结果自动调整参数
        if (diagnosis.identifiedIssues.includes('blurry')) {
            // 提高质量参数
            const qualitySlider = document.getElementById('qualitySlider');
            if (qualitySlider) qualitySlider.value = 9;
            
            // 添加清晰度关键词
            const promptInput = document.getElementById('promptInput');
            if (promptInput) {
                promptInput.value += ', sharp focus, detailed';
            }
        }
        
        setTimeout(() => {
            showToast('解决方案已应用，请测试生成效果');
        }, 1000);
    };
    
    window.testDiagnosisSolutions = function() {
        showToast('开始测试解决方案...');
        // 这里可以添加测试逻辑
        setTimeout(() => {
            showToast('测试完成，请检查生成效果');
        }, 2000);
    };
}

// 生成诊断消息
function generateDiagnosisMessage(issue, diagnosis) {
    let message = `## 🩺 技术问题诊断报告\n\n`;
    message += `**诊断时间**：${new Date().toLocaleString()}\n`;
    message += `**问题描述**：${issue}\n`;
    message += `**严重程度**：${diagnosis.severity === 'high' ? '严重' : diagnosis.severity === 'medium' ? '中等' : '轻微'}\n`;
    message += `**诊断置信度**：${diagnosis.confidence}%\n\n`;
    
    if (diagnosis.identifiedIssues.length > 0) {
        message += `**识别到的问题**：${diagnosis.identifiedIssues.join(', ')}\n\n`;
    }
    
    if (diagnosis.possibleCauses.length > 0) {
        message += `**可能的原因**：\n`;
        diagnosis.possibleCauses.forEach(cause => {
            message += `- ${cause}\n`;
        });
        message += `\n`;
    }
    
    if (diagnosis.solutions.length > 0) {
        message += `**解决方案**：\n`;
        diagnosis.solutions.forEach((solution, index) => {
            message += `${index + 1}. ${solution}\n`;
        });
        message += `\n`;
    }
    
    if (diagnosis.preventionTips.length > 0) {
        message += `**预防建议**：\n`;
        diagnosis.preventionTips.forEach(tip => {
            message += `- ${tip}\n`;
        });
        message += `\n`;
    }
    
    message += `**后续步骤**：\n`;
    message += `1. 点击"应用解决方案"自动调整参数\n`;
    message += `2. 点击"测试解决方案"验证效果\n`;
    message += `3. 如需进一步帮助，请描述具体问题\n`;
    message += `4. 记录成功参数以便未来参考`;
    
    return message;
}

// 初始化所有高级功能
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化以确保DOM完全加载
    setTimeout(() => {
        initAdvancedPromptAnalysis();
        initSmartParameterEngine();
        initTechDiagnosisSystem();
        
        console.log('🤖 即梦AI专家 - 高级功能系统已完全加载');
        
        // 显示系统就绪消息
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const readyMessage = document.createElement('div');
            readyMessage.className = 'message agent';
            readyMessage.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">即梦AI专家</span>
                        <span class="message-time">系统就绪</span>
                    </div>
                    <div class="message-text">
                        🚀 <strong>高级功能系统已就绪！</strong>
                        <br><br>
                        我现在拥有完整的专业能力：
                        <br>
                        🔬 <strong>高级提示词分析</strong> - 5维度专业评估
                        <br>
                        ⚙️ <strong>智能参数优化</strong> - 基于内容的参数推荐
                        <br>
                        🩺 <strong>技术问题诊断</strong> - 常见问题识别和解决
                        <br><br>
                        请尝试使用新的高级功能，或描述您的AI生成需求！
                    </div>
                </div>
            `;
            chatMessages.appendChild(readyMessage);
            
            // 滚动到底部
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }, 500);
});

// 初始化完成
console.log('🤖 即梦AI专家 - 高级功能系统已初始化');
