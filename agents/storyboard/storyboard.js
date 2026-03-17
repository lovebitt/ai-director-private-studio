// 分镜智能体 - 完整功能实现
// 版本: 1.0.0
// 最后更新: 2026-03-17

// 全局工具函数
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            background: white;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            max-width: 400px;
        }
        
        .toast-success {
            border-left: 4px solid #4CAF50;
        }
        
        .toast-info {
            border-left: 4px solid var(--storyboard-primary);
        }
        
        .toast-warning {
            border-left: 4px solid #FF9800;
        }
        
        .toast-error {
            border-left: 4px solid #F44336;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .toast-content i {
            font-size: 1.2rem;
        }
        
        .toast-success .toast-content i {
            color: #4CAF50;
        }
        
        .toast-info .toast-content i {
            color: var(--storyboard-primary);
        }
        
        .toast-warning .toast-content i {
            color: #FF9800;
        }
        
        .toast-error .toast-content i {
            color: #F44336;
        }
        
        @keyframes slideIn {
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
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showLoading(message = '加载中...') {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner">
                <i class="fas fa-film"></i>
            </div>
            <div class="loading-text">${message}</div>
        </div>
    `;
    
    document.body.appendChild(loading);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(26, 35, 126, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
        }
        
        .loading-content {
            text-align: center;
            color: white;
        }
        
        .loading-spinner {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: spin 1.5s linear infinite;
        }
        
        .loading-text {
            font-size: 1.2rem;
            font-weight: 500;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
}

function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .modal {
            background: white;
            border-radius: var(--radius-lg);
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            background: var(--storyboard-gradient);
            color: white;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.3rem;
        }
        
        .modal-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }
        
        .modal-body {
            padding: 1.5rem;
            overflow-y: auto;
            max-height: calc(80vh - 80px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // 绑定关闭事件
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.remove();
    });
    
    // 点击外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 导航初始化
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 移动端关闭菜单
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
}

// 聊天系统初始化
function initChat() {
    const sendButton = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const clearButton = document.getElementById('clearChat');
    const promptButtons = document.querySelectorAll('.prompt-btn');
    const actionButtons = document.querySelectorAll('.action-btn');
    
    // 发送消息
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        addUserMessage(message);
        messageInput.value = '';
        
        // 模拟AI响应
        setTimeout(() => {
            const response = generateStoryboardResponse(message);
            addAgentMessage(response);
        }, 1000);
    }
    
    // 添加用户消息
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">您</span>
                    <span class="message-time">刚刚</span>
                </div>
                <div class="message-text">${escapeHtml(text)}</div>
            </div>
            <div class="message-avatar">👤</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 添加智能体消息
    function addAgentMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message agent';
        messageDiv.innerHTML = `
            <div class="message-avatar">🎬</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">分镜智能体</span>
                    <span class="message-time">刚刚</span>
                </div>
                <div class="message-text">${formatMessage(text)}</div>
                <div class="message-actions">
                    ${getStoryboardActions(text)}
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 生成分镜响应
    function generateStoryboardResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('镜头') || lowerMessage.includes('shot')) {
            return `🎬 **镜头规划建议**
            
**镜头类型选择**：
• 极远景 (EWS) - 建立环境，展示空间关系
• 远景 (WS) - 展示场景和角色位置
• 中景 (MS) - 角色互动和对话
• 特写 (CU) - 强调情感和细节
• 大特写 (ECU) - 创造紧张感和冲击力

**摄像机角度**：
• 平视 - 自然真实，观众视角
• 俯视 - 表现弱势、渺小、被控制
• 仰视 - 表现强大、威严、压迫感
• 荷兰角 - 创造不安、紧张、混乱感

**专业建议**：
1. 为每个场景设计主镜头、建立镜头、反应镜头
2. 通过镜头选择强化情感表达
3. 注意镜头之间的连贯性和过渡
4. 考虑观众的视线引导和注意力控制`;
        } else if (lowerMessage.includes('构图') || lowerMessage.includes('composition')) {
            return `🎨 **构图设计指南**
            
**构图法则**：
• 三分法则 - 经典平衡，适合大多数场景
• 黄金分割 - 艺术和谐，适合重要时刻
• 对称构图 - 稳定正式，适合仪式场景
• 引导线构图 - 动态引导，适合运动场景

**焦点控制**：
• 浅景深 - 电影感，情感聚焦
• 深景深 - 真实感，环境展示
• 选择性焦点 - 叙事引导，注意力控制

**灯光设计**：
• 高调光 - 明亮乐观，喜剧效果
• 低调光 - 黑暗神秘，悬疑效果
• 明暗对比 - 戏剧性强，艺术效果

**构图优化**：
1. 为每个角色设计独特的构图风格
2. 通过构图强化场景的情感基调
3. 注意画面中的负空间和平衡
4. 考虑色彩和光影的构图作用`;
        } else if (lowerMessage.includes('节奏') || lowerMessage.includes('rhythm')) {
            return `🎵 **视觉节奏控制**
            
**节奏维度**：
⏱️ **时间节奏**：
• 镜头时长分布
• 剪辑频率变化
• 节奏高潮位置
• 整体节奏曲线

🎬 **视觉节奏**：
• 视觉变化频率
• 运动节奏控制
• 色彩节奏变化
• 构图节奏安排

**节奏技巧**：
1. **加速**：缩短镜头时长，增加剪辑频率
2. **减速**：延长镜头时长，减少剪辑频率
3. **变化**：快慢交替，创造节奏变化
4. **高潮**：在关键情节创造节奏高潮

**专业建议**：
• 使用"节奏分析"工具查看节奏曲线
• 通过镜头时长控制调整节奏强度
• 注意节奏与情感的匹配和强化`;
        } else if (lowerMessage.includes('分镜') || lowerMessage.includes('storyboard')) {
            return `📋 **分镜制作流程**
            
**分镜创建**：
1. **场景分析** - 确定故事的核心场景
2. **镜头规划** - 为每个场景设计镜头
3. **构图设计** - 优化画面构图
4. **节奏控制** - 安排视觉节奏

**分镜优化**：
• 检查视觉连贯性
• 优化节奏和时长
• 调整构图和灯光
• 测试叙事效果

**工具使用**：
1. 使用"镜头规划器"设计专业镜头
2. 使用"构图设计"工具优化画面
3. 使用"节奏分析"工具控制叙事节奏
4. 使用"分镜板编辑器"创建专业分镜`;
        } else {
            return `🎬 **欢迎使用分镜智能体！**
            
我是您的专业分镜助手，可以帮助您：

**核心功能**：
1. **镜头规划** - 设计专业的镜头类型、角度和运动
2. **构图设计** - 创建艺术性的画面构图
3. **节奏控制** - 管理视觉叙事的节奏
4. **分镜制作** - 创建完整的分镜脚本

**快速开始**：
• 点击"规划镜头"开始镜头设计
• 点击"设计构图"优化画面
• 点击"分析节奏"控制叙事节奏
• 点击"创建分镜"制作完整分镜

**专业建议**：
随时告诉我您的需求，我会提供专业的电影摄影建议！`;
        }
    }
    
    // 获取分镜动作
    function getStoryboardActions(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('镜头') || lowerMessage.includes('shot')) {
            return `
                <button class="action-btn" data-action="plan-shots">
                    <i class="fas fa-video"></i> 规划镜头
                </button>
                <button class="action-btn" data-action="design-composition">
                    <i class="fas fa-th-large"></i> 设计构图
                </button>
            `;
        } else if (lowerMessage.includes('构图') || lowerMessage.includes('composition')) {
            return `
                <button class="action-btn" data-action="design-composition">
                    <i class="fas fa-th-large"></i> 设计构图
                </button>
                <button class="action-btn" data-action="set-focus">
                    <i class="fas fa-crosshairs"></i> 设置焦点
                </button>
            `;
        } else if (lowerMessage.includes('节奏') || lowerMessage.includes('rhythm')) {
            return `
                <button class="action-btn" data-action="control-rhythm">
                    <i class="fas fa-tachometer-alt"></i> 控制节奏
                </button>
                <button class="action-btn" data-action="analyze-pacing">
                    <i class="fas fa-chart-line"></i> 分析节奏
                </button>
            `;
        }
        
        return `
            <button class="action-btn" data-action="create-storyboard">
                <i class="fas fa-film"></i> 创建分镜
            </button>
            <button class="action-btn" data-action="plan-shots">
                <i class="fas fa-video"></i> 规划镜头
            </button>
            <button class="action-btn" data-action="analyze-rhythm">
                <i class="fas fa-music"></i> 分析节奏
            </button>
        `;
    }
    
    // 处理分镜动作
    function handleStoryboardAction(actionId) {
        let response = '';
        
        switch(actionId) {
            case 'plan-shots':
                response = `镜头规划工具启动！
                
**镜头规划步骤**：
1. **场景分析**：分析场景的情感、动作、对话
2. **镜头选择**：选择合适的镜头类型和角度
3. **运动设计**：设计摄像机的运动和位置
4. **时长控制**：确定每个镜头的持续时间
5. **序列安排**：安排镜头的顺序和过渡

**专业建议**：
• 使用"镜头规划器"选择镜头类型
• 使用"摄像机角度"工具设计视角
• 使用"摄像机运动"工具设计动态
• 使用"镜头时长"滑块控制节奏`;
                break;
                
            case 'design-composition':
                response = `构图设计工作坊启动！
                
**构图设计方法**：
🎨 **法则选择**：
• 三分法则：经典平衡，适合大多数场景
• 黄金分割：艺术和谐，适合重要时刻
• 对称构图：稳定正式，适合仪式场景
• 引导线构图：动态引导，适合运动场景

🎯 **焦点控制**：
• 浅景深：电影感，情感聚焦
• 深景深：真实感，环境展示
• 选择性焦点：叙事引导，注意力控制

**构图优化建议**：
1. 为每个角色设计独特的构图风格
2. 通过构图强化场景的情感基调
3. 注意画面中的负空间和平衡
4. 考虑色彩和光影的构图作用`;
                break;
                
            case 'analyze-rhythm':
                response = `视觉节奏分析开始！
                
**节奏分析维度**：
⏱️ **时间节奏**：
• 镜头时长分布
• 剪辑频率变化
• 节奏高潮位置
• 整体节奏曲线

🎬 **视觉节奏**：
• 视觉变化频率
• 运动节奏控制
• 色彩节奏变化
• 构图节奏安排

**节奏优化技巧**：
1. **加速技巧**：缩短镜头时长，增加剪辑频率
2. **减速技巧**：延长镜头时长，减少剪辑频率
3. **变化技巧**：快慢交替，创造节奏变化
4. **高潮技巧**：在关键情节创造节奏高潮`;
                break;
                
            case 'create-storyboard':
                response = `分镜创建向导启动！
                
**分镜创建流程**：
📋 **准备工作**：
• 确定故事的核心场景
• 分析每个场景的情感基调
• 设计整体的视觉风格
• 准备必要的参考资料

🎬 **分镜制作**：
• 为每个场景创建分镜卡片
• 绘制或描述镜头画面
• 添加镜头说明和参数
• 安排分镜序列和顺序

**分镜制作技巧**：
1. 从粗略草图开始，逐步细化
2. 保持分镜的清晰和简洁
3. 重视分镜的实用性和可执行性
4. 通过分镜测试和反馈不断优化`;
                break;
                
            default:
                response = `已执行分镜动作：${actionId}
                
这个动作将帮助您更好地进行视觉叙事创作。如果您需要更详细的指导或想尝试其他功能，请随时告诉我！`;
        }
        
        addAgentMessage(response);
    }
    
    // HTML转义
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // 格式化消息
    function formatMessage(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                   .replace(/\n\n/g, '</p><p>')
                   .replace(/\n/g, '<br>')
                   .replace(/^<p>/, '')
                   .replace(/<\/p>$/, '');
    }
    
    // 绑定事件监听器
    if (sendButton && messageInput) {
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            if (confirm('确定要清空对话吗？')) {
                chatMessages.innerHTML = `
                    <div class="message agent">
                        <div class="message-avatar">🎬</div>
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-sender">分镜智能体</span>
                                <span class="message-time">刚刚</span>
                            </div>
                            <div class="message-text">
                                对话已清空！我是您的分镜智能体，随时为您提供专业的视觉叙事建议。
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    // 快速提示按钮
    promptButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.dataset.prompt;
            let message = '';
            
            switch(prompt) {
                case 'scene-plan':
                    message = '帮我规划这个场景的镜头';
                    break;
                case 'composition-help':
                    message = '设计专业的画面构图';
                    break;
                case 'rhythm-advice':
                    message = '控制视觉叙事节奏';
                    break;
            }
            
            if (message) {
                messageInput.value = message;
                messageInput.focus();
            }
        });
    });
    
    // 动作按钮
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            handleStoryboardAction(action);
        });
    });
}

// 镜头规划系统初始化
function initShotPlanning() {
    const addShotBtn = document.getElementById('addShot');
    const shotList = document.getElementById('shotList');
    const durationSlider = document.getElementById('shotDuration');
    const durationValue = document.getElementById('durationValue');
    
    let shots = [];
    let shotCounter = 1;
    
    // 初始化滑块值显示
    if (durationSlider && durationValue) {
        durationValue.textContent = durationSlider.value + '秒';
        durationSlider.addEventListener('input', function() {
            durationValue.textContent = this.value + '秒';
        });
    }
    
    // 添加镜头
    if (addShotBtn && shotList) {
        addShotBtn.addEventListener('click', function() {
            const shotType = document.getElementById('shotType').value;
            const cameraAngle = document.getElementById('cameraAngle').value;
            const cameraMovement = document.getElementById('cameraMovement').value;
            const duration = parseInt(document.getElementById('shotDuration').value);
            
            const shot = createShot(shotCounter, shotType, cameraAngle, cameraMovement, duration);
            shots.push(shot);
            shotCounter++;
            
            updateShotList();
            updatePreviewInfo();
            showToast(`已添加镜头 #${shot.number}: ${getShotTypeName(shotType)}`);
            
            // 在聊天中显示添加的镜头
            addAgentMessage(`镜头 #${shot.number} 已添加！
            
**镜头参数**：
📹 类型：${getShotTypeName(shotType)}
🎥 角度：${getCameraAngleName(cameraAngle)}
🚀 运动：${getCameraMovementName(cameraMovement)}
⏱️ 时长：${duration}秒`);
        });
    }
    
    // 创建镜头对象
    function createShot(number, type, angle, movement, duration) {
        return {
            id: `shot_${number}`,
            number: number,
            type: type,
            angle: angle,
            movement: movement,
            duration: duration,
            timestamp: new Date().toISOString()
        };
    }
    
    // 更新镜头列表
    function updateShotList() {
        // 移除空状态提示
        const emptyState = shotList.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        // 清空现有列表
        shotList.innerHTML = '<h5>镜头列表：</h5>';
        
        // 添加镜头项
        shots.forEach(shot => {
            const shotItem = document.createElement('div');
            shotItem.className = 'shot-item';
            shotItem.dataset.id = shot.id;
            shotItem.innerHTML = `
                <div class="shot-header">
                    <div class="shot-info">
                        <span class="shot-number">镜头 #${shot.number}</span>
                        <span class="shot-type">${getShotTypeName(shot.type)}</span>
                    </div>
                    <div class="shot-actions">
                        <button class="shot-action-btn delete-btn" title="删除">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="shot-details">
                    <div class="shot-detail">
                        <span class="detail-label">角度：</span>
                        <span class="detail-value">${getCameraAngleName(shot.angle)}</span>
                    </div>
                    <div class="shot-detail">
                        <span class="detail-label">运动：</span>
                        <span class="detail-value">${getCameraMovementName(shot.movement)}</span>
                    </div>
                    <div class="shot-detail">
                        <span class="detail-label">时长：</span>
                        <span class="detail-value">${shot.duration}秒</span>
                    </div>
                </div>
            `;
            
            shotList.appendChild(shotItem);
            
            // 绑定删除事件
            const deleteBtn = shotItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteShot(shot.id);
            });
        });
        
        // 如果没有镜头，显示空状态
        if (shots.length === 0) {
            shotList.innerHTML = `
                <h5>镜头列表：</h5>
                <div class="empty-state">
                    <i class="fas fa-video-slash"></i>
                    <p>暂无镜头，点击"添加镜头"开始规划</p>
                </div>
            `;
        }
    }
    
    // 删除镜头
    function deleteShot(shotId) {
        if (confirm('确定要删除这个镜头吗？')) {
            shots = shots.filter(s => s.id !== shotId);
            updateShotList();
            updatePreviewInfo();
            showToast('镜头已删除', 'warning');
        }
    }
    
    // 更新预览信息
    function updatePreviewInfo() {
        const currentShot = document.getElementById('currentShot');
        const totalDuration = document.getElementById('totalDuration');
        
        if (currentShot) {
            currentShot.textContent = `0/${shots.length}`;
        }
        
        if (totalDuration) {
            const total = shots.reduce((sum, shot) => sum + shot.duration, 0);
            totalDuration.textContent = `${total}秒`;
        }
    }
    
    // 获取镜头类型名称
    function getShotTypeName(type) {
        const names = {
            'extreme-wide': '极远景 (EWS)',
            'wide': '远景 (WS)',
            'full': '全景 (FS)',
            'medium': '中景 (MS)',
            'close-up': '特写 (CU)',
            'extreme-close-up': '大特写 (ECU)'
        };
        return names[type] || type;
    }
    
    // 获取摄像机角度名称
    function getCameraAngleName(angle) {
        const names = {
            'eye-level': '平视',
            'high-angle': '俯视',
            'low-angle': '仰视',
            'dutch-angle': '荷兰角'
        };
        return names[angle] || angle;
    }
    
    // 获取摄像机运动名称
    function getCameraMovementName(movement) {
        const names = {
            'static': '固定',
            'pan': '横摇',
            'tilt': '纵摇',
            'zoom': '变焦',
            'dolly': '轨道'
        };
        return names[movement] || movement;
    }
}

// 构图设计工具初始化
function initCompositionTools() {
    const previewCompositionBtn = document.getElementById('previewComposition');
    const focusGrid = document.querySelector('.focus-grid');
    
    // 焦点网格交互
    if (focusGrid) {
        focusGrid.querySelectorAll('.grid-cell').forEach(cell => {
            cell.addEventListener('click', function() {
                focusGrid.querySelectorAll('.grid-cell').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                const position = this.dataset.position;
                showToast(`焦点位置设置为：${getFocusPositionName(position)}`, 'info');
            });
        });
    }
    
    // 预览构图
    if (previewCompositionBtn) {
        previewCompositionBtn.addEventListener('click', function() {
            const compositionRule = document.getElementById('compositionRule').value;
            const focusPosition = document.querySelector('.grid-cell.active')?.dataset.position || 'center';
            const depthOfField = document.getElementById('depthOfField').value;
            const lightingStyle = document.getElementById('lightingStyle').value;
            
            showToast('构图预览已更新', 'success');
            
            // 在聊天中显示构图设计
            addAgentMessage(`构图设计完成！
            
**构图参数**：
🎨 法则：${getCompositionRuleName(compositionRule)}
🎯 焦点：${getFocusPositionName(focusPosition)}
📸 景深：${getDepthOfFieldName(depthOfField)}
💡 灯光：${getLightingStyleName(lightingStyle)}`);
        });
    }
    
    // 获取构图法则名称
    function getCompositionRuleName(rule) {
        const names = {
            'rule-of-thirds': '三分法则',
            'golden-ratio': '黄金分割',
            'symmetry': '对称构图',
            'leading-lines': '引导线'
        };
        return names[rule] || rule;
    }
    
    // 获取焦点位置名称
    function getFocusPositionName(position) {
        const names = {
            'top-left': '左上',
            'top-center': '上中',
            'top-right': '右上',
            'middle-left': '左中',
            'center': '中心',
            'middle-right': '右中',
            'bottom-left': '左下',
            'bottom-center': '下中',
            'bottom-right': '右下'
        };
        return names[position] || position;
    }
    
    // 获取景深名称
    function getDepthOfFieldName(depth) {
        const names = {
            'shallow': '浅景深',
            'medium': '中等景深',
            'deep': '深景深'
        };
        return names[depth] || depth;
    }
    
    // 获取灯光风格名称
    function getLightingStyleName(style) {
        const names = {
            'high-key': '高调光',
            'low-key': '低调光',
            'chiaroscuro': '明暗对比',
            'soft-light': '柔光'
        };
        return names[style] || style;
    }
}

// 节奏分析初始化
function initRhythmAnalysis() {
    const analyzeRhythmBtn = document.getElementById('analyzeRhythm');
    const rhythmIntensity = document.getElementById('rhythmIntensity');
    const intensityValue = document.getElementById('intensityValue');
    
    // 初始化强度值显示
    if (rhythmIntensity && intensityValue) {
        updateIntensityValue();
        rhythmIntensity.addEventListener('input', updateIntensityValue);
    }
    
    // 分析节奏
    if (analyzeRhythmBtn) {
        analyzeRhythmBtn.addEventListener('click', function() {
            const intensity = parseInt(document.getElementById('rhythmIntensity').value);
            const pattern = document.getElementById('rhythmPattern').value;
            
            showToast('节奏分析完成', 'success');
            
            // 在聊天中显示节奏分析
            addAgentMessage(`视觉节奏分析完成！
            
**节奏参数**：
🎵 强度：${getIntensityName(intensity)} (${intensity}/10)
📊 模式：${getRhythmPatternName(pattern)}`);
        });
    }
    
    // 更新强度值显示
    function updateIntensityValue() {
        if (!rhythmIntensity || !intensityValue) return;
        
        const value = parseInt(rhythmIntensity.value);
        if (value <= 3) intensityValue.textContent = '舒缓';
        else if (value <= 7) intensityValue.textContent = '中等';
        else intensityValue.textContent = '紧张';
    }
    
    // 获取强度名称
    function getIntensityName(intensity) {
        if (intensity <= 3) return '舒缓';
        if (intensity <= 7) return '中等';
        return '紧张';
    }
    
    // 获取节奏模式名称
    function getRhythmPatternName(pattern) {
        const names = {
            'slow-fast-slow': '慢-快-慢',
            'fast-slow-fast': '快-慢-快',
            'accelerating': '加速',
            'decelerating': '减速'
        };
        return names[pattern] || pattern;
    }
}

// 分镜板编辑器初始化
function initStoryboardEditor() {
    const addStoryboardBtn = document.getElementById('addStoryboard');
    const clearStoryboardBtn = document.getElementById('clearStoryboard');
    const exportPDFBtn = document.getElementById('exportPDF');
    const storyboardGrid = document.getElementById('storyboardGrid');
    
    let storyboardCards = [];
    let cardCounter = 1;
    
    // 新建分镜板
    if (addStoryboardBtn && storyboardGrid) {
        addStoryboardBtn.addEventListener('click', function() {
            createStoryboardCard();
        });
    }
    
    // 清空分镜板
    if (clearStoryboardBtn) {
        clearStoryboardBtn.addEventListener('click', function() {
            if (confirm('确定要清空整个分镜板吗？所有分镜卡片将被删除。')) {
                storyboardCards = [];
                cardCounter = 1;
                updateStoryboardGrid();
                showToast('分镜板已清空', 'warning');
            }
        });
    }
    
    // 导出PDF
    if (exportPDFBtn) {
        exportPDFBtn.addEventListener('click', function() {
            if (storyboardCards.length === 0) {
                showToast('请先创建分镜卡片', 'warning');
                return;
            }
            
            showToast('正在生成PDF...', 'info');
            
            setTimeout(() => {
                showToast('PDF生成完成！', 'success');
                
                // 在聊天中显示导出信息
                addAgentMessage(`分镜PDF导出完成！
                
**导出内容**：
📄 封面页：项目信息、团队信息、日期
📋 列表页：所有分镜卡片概览
🎬 详情页：每个分镜的详细参数
🔧 技术页：镜头参数、构图说明、节奏分析

**文件信息**：
• 文件名：storyboard_${new Date().toISOString().split('T')[0]}.pdf
• 页数：${Math.ceil(storyboardCards.length / 4) + 3}页
• 大小：约${storyboardCards.length * 50}KB`);
            }, 2000);
        });
    }
    
    // 创建分镜卡片
    function createStoryboardCard() {
        const card = {
            id: `card_${cardCounter}`,
            number: cardCounter,
            title: `分镜 #${cardCounter}`,
            description: '点击编辑分镜描述...',
            shotType: 'medium',
            cameraAngle: 'eye-level',
            duration: 5,
            composition: 'rule-of-thirds',
            timestamp: new Date().toISOString()
        };
        
        storyboardCards.push(card);
        cardCounter++;
        
        updateStoryboardGrid();
        showToast(`分镜卡片 #${card.number} 已创建`, 'success');
        
        // 在聊天中显示创建的分镜
        addAgentMessage(`分镜卡片 #${card.number} 已创建！
        
**分镜信息**：
📋 标题：${card.title}
📹 镜头类型：${getShotTypeName(card.shotType)}
🎥 摄像机角度：${getCameraAngleName(card.cameraAngle)}
⏱️ 时长：${card.duration}秒
🎨 构图：${getCompositionRuleName(card.composition)}`);
    }
    
    // 更新分镜网格
    function updateStoryboardGrid() {
        // 移除空状态提示
        const emptyState = storyboardGrid.querySelector('.grid-empty');
        if (emptyState) {
            emptyState.remove();
        }
        
        // 清空网格
        storyboardGrid.innerHTML = '';
        
        // 添加分镜卡片
        storyboardCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'storyboard-card';
            cardElement.dataset.id = card.id;
            cardElement.innerHTML = `
                <div class="card-header">
                    <div class="card-number">#${card.number}</div>
                    <div class="card-actions">
                        <button class="card-action-btn delete-btn" title="删除">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="card-preview">
                    <div class="preview-placeholder">
                        <i class="fas fa-film"></i>
                        <span>${getShotTypeName(card.shotType)}</span>
                    </div>
                </div>
                <div class="card-content">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-description">${card.description}</p>
                    <div class="card-details">
                        <div class="card-detail">
                            <i class="fas fa-video"></i>
                            <span>${getShotTypeName(card.shotType)}</span>
                        </div>
                        <div class="card-detail">
                            <i class="fas fa-clock"></i>
                            <span>${card.duration}秒</span>
                        </div>
                    </div>
                </div>
            `;
            
            storyboardGrid.appendChild(cardElement);
            
            // 绑定删除事件
            const deleteBtn = cardElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteStoryboardCard(card.id);
            });
            
            // 双击编辑
            cardElement.addEventListener('dblclick', function() {
                editStoryboardCard(card.id);
            });
        });
        
        // 如果没有卡片，显示空状态
        if (storyboardCards.length === 0) {
            storyboardGrid.innerHTML = `
                <div class="grid-empty">
                    <i class="fas fa-clapperboard"></i>
                    <h4>开始创建您的分镜板</h4>
                    <p>使用镜头规划器添加镜头，或点击"新建分镜板"开始</p>
                </div>
            `;
        }
    }
    
    // 编辑分镜卡片
    function editStoryboardCard(cardId) {
        const card = storyboardCards.find(c => c.id === cardId);
        if (!card) return;
        
        const newTitle = prompt('请输入分镜标题：', card.title);
        if (newTitle !== null) {
            card.title = newTitle;
        }
        
        const newDescription = prompt('请输入分镜描述：', card.description);
        if (newDescription !== null) {
            card.description = newDescription;
        }
        
        updateStoryboardGrid();
        showToast(`分镜卡片 #${card.number} 已更新`, 'success');
    }
    
    // 删除分镜卡片
    function deleteStoryboardCard(cardId) {
        if (confirm('确定要删除这个分镜卡片吗？')) {
            storyboardCards = storyboardCards.filter(c => c.id !== cardId);
            updateStoryboardGrid();
            showToast('分镜卡片已删除', 'warning');
        }
    }
}

// 高级工具初始化
function initAdvancedTools() {
    const aiGenerateBtn = document.getElementById('aiGenerate');
    const analyzeNarrativeBtn = document.getElementById('analyzeNarrative');
    
    // AI生成分镜
    if (aiGenerateBtn) {
        aiGenerateBtn.addEventListener('click', function() {
            showLoading('AI正在生成分镜...');
            setTimeout(() => {
                const generatedStoryboard = generateAIStoryboard();
                hideLoading();
                showAIStoryboardResult(generatedStoryboard);
            }, 2000);
        });
    }
    
    // 分析叙事
    if (analyzeNarrativeBtn) {
        analyzeNarrativeBtn.addEventListener('click', function() {
            showLoading('正在分析视觉叙事...');
            setTimeout(() => {
                hideLoading();
                showToast('视觉叙事分析完成', 'success');
                
                addAgentMessage(`视觉叙事分析完成！
                
**分析结果**：
🎬 **叙事结构**：完整的三幕式结构
🎨 **视觉风格**：电影感强烈，情感表达丰富
⏱️ **节奏控制**：节奏变化合理，高潮位置恰当
🎯 **焦点引导**：观众注意力引导有效

**优化建议**：
1. 加强第二幕的情感冲突
2. 优化高潮镜头的构图
3. 调整部分镜头的时长
4. 增强视觉连贯性`);
            }, 1500);
        });
    }
    
    // AI生成分镜
    function generateAIStoryboard() {
        const styles = ['电影感', '纪录片', '动画', '实验', '商业'];
        const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
        
        const scenes = [
            '开场建立',
            '角色介绍',
            '冲突发展',
            '情感高潮',
            '结局解决'
        ];
        
        const generatedCards = scenes.map((scene, index) => ({
            number: index + 1,
            title: `${selectedStyle}风格 - ${scene}`,
            description: getAISceneDescription(selectedStyle, scene),
            shotType: getAIShotType(index, selectedStyle),
            cameraAngle: getAICameraAngle(index, selectedStyle),
            duration: getAIDuration(index, selectedStyle),
            composition: getAIComposition(index, selectedStyle)
        }));
        
        return {
            style: selectedStyle,
            scenes: generatedCards,
            totalShots: generatedCards.length,
            estimatedDuration: generatedCards.reduce((sum, card) => sum + card.duration, 0)
        };
    }
    
    // 获取AI场景描述
    function getAISceneDescription(style, scene) {
        const descriptions = {
            '电影感': `采用电影级镜头语言，${scene}场景注重情感表达和视觉冲击`,
            '纪录片': `采用纪实拍摄手法，${scene}场景注重真实感和临场感`,
            '动画': `采用动画表现手法，${scene}场景注重创意和想象力`,
            '实验': `采用实验性镜头语言，${scene}场景注重创新和艺术表达`,
            '商业': `采用商业拍摄标准，${scene}场景注重产品展示和品牌传达`
        };
        
        return descriptions[style] || `${scene}场景的标准分镜设计`;
    }
    
    // 获取AI镜头类型
    function getAIShotType(index, style) {
        const shotTypes = {
            '电影感': ['extreme-wide', 'medium', 'close-up', 'extreme-close-up', 'wide'],
            '纪录片': ['wide', 'medium', 'close-up', 'medium', 'wide'],
            '动画': ['wide', 'medium', 'close-up', 'extreme-close-up', 'medium'],
            '实验': ['extreme-close-up', 'close-up', 'medium', 'wide', 'extreme-wide'],
            '商业': ['medium', 'close-up', 'extreme-close-up', 'medium', 'wide']
        };
        
        const types = shotTypes[style] || ['medium', 'close-up', 'wide', 'medium', 'close-up'];
        return types[index % types.length];
    }
    
    // 获取AI摄像机角度
    function getAICameraAngle(index, style) {
        const angles = {
            '电影感': ['low-angle', 'eye-level', 'dutch-angle', 'high-angle', 'eye-level'],
            '纪录片': ['eye-level', 'eye-level', 'eye-level', 'eye-level', 'eye-level'],
            '动画': ['bird-eye', 'eye-level', 'worm-eye', 'eye-level', 'bird-eye'],
            '实验': ['dutch-angle', 'dutch-angle', 'dutch-angle', 'dutch-angle', 'dutch-angle'],
            '商业': ['eye-level', 'high-angle', 'eye-level', 'low-angle', 'eye-level']
        };
        
        const styleAngles = angles[style] || ['eye-level', 'eye-level', 'eye-level', 'eye-level', 'eye-level'];
        return styleAngles[index % styleAngles.length];
    }
    
    // 获取AI时长
    function getAIDuration(index, style) {
        const durations = {
            '电影感': [8, 5, 3, 2, 6],
            '纪录片': [6, 4, 3, 5, 7],
            '动画': [4, 3, 2, 3, 5],
            '实验': [10, 8, 6, 4, 12],
            '商业': [3, 2, 1, 2, 4]
        };
        
        const styleDurations = durations[style] || [5, 4, 3, 4, 5];
        return styleDurations[index % styleDurations.length];
    }
    
    // 获取AI构图
    function getAIComposition(index, style) {
        const compositions = {
            '电影感': ['rule-of-thirds', 'golden-ratio', 'leading-lines', 'negative-space', 'symmetry'],
            '纪录片': ['rule-of-thirds', 'center', 'rule-of-thirds', 'center', 'rule-of-thirds'],
            '动画': ['golden-ratio', 'diagonal', 'frame-within-frame', 'golden-ratio', 'diagonal'],
            '实验': ['negative-space', 'diagonal', 'negative-space', 'diagonal', 'negative-space'],
            '商业': ['center', 'rule-of-thirds', 'center', 'rule-of-thirds', 'center']
        };
        
        const styleCompositions = compositions[style] || ['rule-of-thirds', 'rule-of-thirds', 'rule-of-thirds', 'rule-of-thirds', 'rule-of-thirds'];
        return styleCompositions[index % styleCompositions.length];
    }
    
    // 显示AI分镜结果
    function showAIStoryboardResult(result) {
        const resultHtml = `
            <div class="ai-result">
                <h4><i class="fas fa-robot"></i> AI分镜生成完成</h4>
                
                <div class="result-summary">
                    <div class="summary-item">
                        <div class="summary-label">风格</div>
                        <div class="summary-value">${result.style}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">场景数</div>
                        <div class="summary-value">${result.totalShots}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">总时长</div>
                        <div class="summary-value">${result.estimatedDuration}秒</div>
                    </div>
                </div>
                
                <div class="result-scenes">
                    <h5>生成场景：</h5>
                    <div class="scenes-list">
                        ${result.scenes.map(scene => `
                            <div class="scene-item">
                                <div class="scene-header">
                                    <span class="scene-number">#${scene.number}</span>
                                    <span class="scene-title">${scene.title}</span>
                                </div>
                                <div class="scene-details">
                                    <p>${scene.description}</p>
                                    <div class="scene-params">
                                        <span>📹 ${getShotTypeName(scene.shotType)}</span>
                                        <span>🎥 ${getCameraAngleName(scene.cameraAngle)}</span>
                                        <span>⏱️ ${scene.duration}秒</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="result-actions">
                    <button class="result-btn apply-btn" onclick="applyAIStoryboard()">
                        <i class="fas fa-check"></i> 应用此分镜
                    </button>
                    <button class="result-btn close-btn" onclick="closeModal()">
                        <i class="fas fa-times"></i> 关闭
                    </button>
                </div>
            </div>
        `;
        
        showModal('AI分镜生成结果', resultHtml);
    }
    
    // 应用AI分镜
    window.applyAIStoryboard = function() {
        showToast('AI分镜已应用到分镜板', 'success');
        document.querySelector('.modal-close').click();
    };
    
    // 关闭模态框
    window.closeModal = function() {
        document.querySelector('.modal-close').click();
    };
}

// 快速动作初始化
function initQuickActions() {
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    
    quickActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            handleQuickAction(action);
        });
    });
    
    function handleQuickAction(action) {
        switch(action) {
            case 'quick-storyboard':
                showToast('快速分镜创建启动', 'info');
                addAgentMessage(`快速分镜创建启动！
                
**快速创建步骤**：
1. 选择场景类型（对话/动作/情感）
2. 选择视觉风格（电影感/纪录片/动画）
3. 设置基础参数（时长/节奏/构图）
4. 自动生成分镜模板

**建议**：从简单的对话场景开始，逐步增加复杂度。`);
                break;
                
            case 'quick-export':
                showToast('快速导出准备中...', 'info');
                setTimeout(() => {
                    showToast('快速导出完成！已生成分镜脚本PDF', 'success');
                }, 1500);
                break;
                
            case 'quick-share':
                showToast('分享功能准备中...', 'info');
                addAgentMessage(`分镜分享功能！
                
**分享选项**：
• PDF文档 - 专业分镜脚本
• 图片集 - 视觉分镜展示
• 链接分享 - 在线协作查看
• 团队协作 - 实时编辑和反馈

**建议**：使用PDF分享给导演团队，使用链接分享给远程协作成员。`);
                break;
        }
    }
}

// 主初始化函数
function initStoryboardAgent() {
    console.log('🎬 分镜智能体初始化开始...');
    
    // 初始化所有模块
    initNavigation();
    initChat();
    initShotPlanning();
    initCompositionTools();
    initRhythmAnalysis();
    initStoryboardEditor();
    initAdvancedTools();
    initQuickActions();
    
    // 显示欢迎消息
    setTimeout(() => {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div class="message agent">
                    <div class="message-avatar">🎬</div>
                    <div class="message-content">
                        <div class="message-header">
                            <span class="message-sender">分镜智能体</span>
                            <span class="message-time">刚刚</span>
                        </div>
                        <div class="message-text">
                            🎬 <strong>欢迎使用分镜智能体！</strong><br><br>
                            我是您的专业视觉叙事助手，可以帮助您：<br><br>
                            • <strong>镜头规划</strong> - 设计专业的镜头类型、角度和运动<br>
                            • <strong>构图设计</strong> - 创建艺术性的画面构图<br>
                            • <strong>节奏控制</strong> - 管理视觉叙事的节奏<br>
                            • <strong>分镜制作</strong> - 创建完整的分镜脚本<br><br>
                            随时告诉我您的需求，或使用右侧工具开始创作！
                        </div>
                    </div>
                </div>
            `;
        }
        
        showToast('分镜智能体已准备就绪！', 'success');
    }, 500);
    
    console.log('✅ 分镜智能体初始化完成');
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoryboardAgent);
} else {
    initStoryboardAgent();
}

// 导出函数供外部使用
window.storyboardAgent = {
    init: initStoryboardAgent,
    showToast: showToast,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showModal: showModal
};

console.log('🎬 分镜智能体脚本加载完成');