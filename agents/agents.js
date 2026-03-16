// 智能体创作助手交互脚本

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initQuickAsk();
    initCollaboration();
    initAgentStatus();
    initSmoothScroll();
    
    console.log('👥 智能体创作助手已加载');
});

// 导航功能
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '1rem';
                navMenu.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                navMenu.style.zIndex = '1000';
            }
        });
    }
    
    // 平滑滚动到智能体
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // 更新活动链接
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // 移动端关闭菜单
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            }
        });
    });
}

// 快速提问功能
function initQuickAsk() {
    const quickAskButtons = document.querySelectorAll('.quick-ask');
    const modal = document.getElementById('quickAskModal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const sendButton = document.getElementById('sendQuickQuestion');
    const selectedAvatar = document.getElementById('selectedAvatar');
    const selectedAgentName = document.getElementById('selectedAgentName');
    const quickQuestionInput = document.getElementById('quickQuestion');
    
    let currentAgent = 'director';
    
    // 打开快速提问模态框
    quickAskButtons.forEach(button => {
        button.addEventListener('click', function() {
            const agent = this.getAttribute('data-agent');
            currentAgent = agent;
            
            // 更新选中的智能体信息
            const agentCard = document.getElementById(agent);
            if (agentCard) {
                const avatar = agentCard.querySelector('.agent-avatar').textContent;
                const name = agentCard.querySelector('.agent-info h3').textContent;
                
                selectedAvatar.textContent = avatar;
                selectedAgentName.textContent = name;
            }
            
            // 显示模态框
            modal.classList.add('show');
            quickQuestionInput.focus();
        });
    });
    
    // 关闭模态框
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.remove('show');
            quickQuestionInput.value = '';
        });
    });
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            quickQuestionInput.value = '';
        }
    });
    
    // 发送问题
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            const question = quickQuestionInput.value.trim();
            
            if (!question) {
                alert('请输入您的问题');
                return;
            }
            
            // 显示发送状态
            const originalText = sendButton.innerHTML;
            sendButton.innerHTML = '<span class="loading"></span> 发送中...';
            sendButton.disabled = true;
            
            // 模拟发送到智能体
            setTimeout(() => {
                // 在实际应用中，这里会调用OpenClaw API
                console.log(`发送到 ${currentAgent}: ${question}`);
                
                // 显示成功消息
                alert(`问题已发送给${selectedAgentName.textContent}，智能体正在思考中...`);
                
                // 重置界面
                sendButton.innerHTML = originalText;
                sendButton.disabled = false;
                modal.classList.remove('show');
                quickQuestionInput.value = '';
                
                // 跳转到对应智能体页面
                window.location.href = `${currentAgent}/?question=${encodeURIComponent(question)}`;
                
            }, 1500);
        });
    }
    
    // 按Enter发送
    quickQuestionInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
}

// 协作模式功能
function initCollaboration() {
    const collabButtons = document.querySelectorAll('[data-collab]');
    
    collabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const collabType = this.getAttribute('data-collab');
            
            // 显示协作启动提示
            let message = '';
            let agents = [];
            
            switch(collabType) {
                case 'director-visual':
                    message = '启动AI导演与视觉风格智能体的协作';
                    agents = ['🎬 AI导演', '🎨 视觉风格智能体'];
                    break;
                case 'narrative-storyboard':
                    message = '启动总编剧与分镜智能体的协作';
                    agents = ['🎭 总编剧智能体', '🎞️ 分镜智能体'];
                    break;
                case 'dreamai-visual':
                    message = '启动即梦AI专家与视觉风格智能体的协作';
                    agents = ['🤖 即梦AI专家', '🎨 视觉风格智能体'];
                    break;
                case 'all':
                    message = '启动全体智能体协作会议';
                    agents = ['🎬 AI导演', '🎨 视觉风格', '🤖 即梦AI专家', '🎭 总编剧', '🎞️ 分镜导演'];
                    break;
            }
            
            // 显示协作启动界面
            const modal = document.createElement('div');
            modal.className = 'modal show';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>🤝 启动协作模式</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="collaboration-info">
                            <div class="collab-icon-large">${collabType === 'all' ? '👥' : '🤝'}</div>
                            <h4>${message}</h4>
                            <p>以下智能体将共同为您提供创作建议：</p>
                            <div class="collab-agents">
                                ${agents.map(agent => `<span class="collab-agent-tag">${agent}</span>`).join('')}
                            </div>
                            <div class="collab-options">
                                <button class="btn btn-primary" id="startCollab">
                                    <i class="fas fa-play"></i> 开始协作会话
                                </button>
                                <button class="btn btn-secondary modal-close">
                                    <i class="fas fa-times"></i> 取消
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                .collaboration-info {
                    text-align: center;
                    padding: 1rem;
                }
                .collab-icon-large {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                .collab-agents {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                    margin: 1.5rem 0;
                }
                .collab-agent-tag {
                    background: var(--bg-light);
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius);
                    font-size: 0.875rem;
                }
                .collab-options {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: center;
                    margin-top: 2rem;
                }
            `;
            document.head.appendChild(style);
            
            // 关闭按钮
            modal.querySelector('.modal-close').addEventListener('click', function() {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
            
            // 开始协作按钮
            modal.querySelector('#startCollab').addEventListener('click', function() {
                alert(`协作模式已启动！${agents.join('、')}将共同为您服务。\n\n在实际部署中，这里会打开协作对话界面。`);
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
            
            // 点击背景关闭
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }
            });
        });
    });
}

// 智能体状态模拟
function initAgentStatus() {
    const agentStatuses = document.querySelectorAll('.agent-status');
    
    // 模拟状态变化
    setInterval(() => {
        agentStatuses.forEach(status => {
            // 只有25%的概率改变状态
            if (Math.random() < 0.25) {
                const isActive = status.classList.contains('active');
                const dot = status.querySelector('.status-dot');
                
                if (dot) {
                    // 切换状态
                    status.classList.toggle('active');
                    
                    // 更新文本
                    const textSpan = status.querySelector('span:last-child');
                    if (textSpan) {
                        textSpan.textContent = isActive ? '忙碌中' : '在线';
                    }
                    
                    // 添加动画效果
                    dot.style.animation = 'pulse 1s';
                    setTimeout(() => {
                        dot.style.animation = '';
                    }, 1000);
                }
            }
        });
    }, 10000); // 每10秒检查一次
}

// 平滑滚动初始化
function initSmoothScroll() {
    // 添加脉冲动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // 窗口调整大小时更新导航
    window.addEventListener('resize', function() {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.background = 'transparent';
            navMenu.style.padding = '0';
            navMenu.style.boxShadow = 'none';
        } else {
            navMenu.style.display = 'none';
        }
    });
}

// 工具函数：获取智能体信息
function getAgentInfo(agentId) {
    const agents = {
        director: {
            name: 'AI导演',
            avatar: '🎬',
            color: '#1e40af',
            description: '总指挥，负责整体创作规划和项目协调',
            expertise: ['创作规划', '项目协调', '质量控制']
        },
        visual: {
            name: '视觉风格智能体',
            avatar: '🎨',
            color: '#7c3aed',
            description: '视觉研究员，专注于美学指导和风格分析',
            expertise: ['色彩分析', '构图指导', '风格参考']
        },
        dreamai: {
            name: '即梦AI专家',
            avatar: '🤖',
            color: '#0d9488',
            description: '技术专家，擅长AI工具使用和参数优化',
            expertise: ['提示词优化', '参数调整', '效果控制']
        },
        narrative: {
            name: '总编剧智能体',
            avatar: '🎭',
            color: '#d97706',
            description: '故事架构师，专注于叙事结构和角色塑造',
            expertise: ['故事结构', '角色塑造', '情节设计']
        },
        storyboard: {
            name: '分镜智能体',
            avatar: '🎞️',
            color: '#e11d48',
            description: '视觉叙事导演，擅长镜头语言和节奏控制',
            expertise: ['镜头语言', '视觉叙事', '节奏控制']
        }
    };
    
    return agents[agentId] || agents.director;
}

// 工具函数：模拟智能体响应
function simulateAgentResponse(agentId, question) {
    const responses = {
        director: [
            "从整体创作角度来看，这个想法很有潜力。我建议先制定一个详细的项目计划，明确每个阶段的目标和时间节点。",
            "考虑到项目的复杂性，我建议采用分阶段实施的策略。第一阶段专注于核心概念的验证，第二阶段再扩展细节。",
            "这个创作方向符合当前的趋势，但需要注意保持独特性。我建议深入研究目标受众的偏好，进行差异化设计。"
        ],
        visual: [
            "从视觉风格的角度分析，这个设计在色彩搭配上可以更加大胆一些。建议尝试增加对比色来提升视觉冲击力。",
            "构图方面，当前的布局比较平衡，但可以尝试使用黄金分割比例来增强画面的动态感。",
            "参考类似的成功案例，我发现这种风格在灯光处理上通常采用三点布光法，你可以尝试一下。"
        ],
        dreamai: [
            "对于这个生成任务，我建议优化提示词为：'cinematic shot, dramatic lighting, detailed textures, 8k resolution'。",
            "参数设置方面，建议将CFG scale调整到7.5，采样步数增加到30，这样能获得更精细的结果。",
            "基于类似项目的经验，使用ControlNet的深度图控制可以显著改善生成结果的空间感。"
        ]
    };
    
    const agentResponses = responses[agentId] || responses.director;
    const randomIndex = Math.floor(Math.random() * agentResponses.length);
    return agentResponses[randomIndex];
}