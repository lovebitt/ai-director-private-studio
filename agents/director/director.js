                exportButton.innerHTML = originalText;
                exportButton.disabled = false;
                showToast('导出选项已生成！');
            }, 1500);
        });
    }
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
            background: var(--primary);
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

// 工具函数：添加AI导演消息（简化版，用于工具函数内部）
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
        <div class="message-avatar">🎬</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">AI导演</span>
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
                handleToolAction(actionId);
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

// 工具函数：处理工具动作
function handleToolAction(actionId) {
    const actions = {
        'create-gantt-chart': {
            message: "请创建项目甘特图",
            response: "正在生成专业甘特图...\n\n甘特图已创建完成，清晰展示了：\n\n1. **时间线**：各阶段的时间安排\n2. **依赖关系**：任务之间的先后顺序\n3. **进度状态**：当前完成情况\n4. **关键路径**：影响项目总工期的任务链\n\n甘特图已保存，可以随时查看和调整。"
        },
        'assign-smart-tasks': {
            message: "请分配智能体具体任务",
            response: "正在分配具体任务...\n\n基于各智能体的专长，已分配：\n\n🎨 **视觉风格智能体**：\n- 任务1：概念视觉设计（3天）\n- 任务2：色彩方案制定（2天）\n- 任务3：风格指南创建（2天）\n\n🤖 **即梦AI专家**：\n- 任务1：技术方案设计（4天）\n- 任务2：参数优化测试（3天