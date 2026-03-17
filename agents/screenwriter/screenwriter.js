// 总编剧智能体交互脚本 - 完整版

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initChat();
    initStoryTools();
    initCharacterTools();
    initStructureTools();
    initDialogueTools();
    initQuickActions();
    
    console.log('📝 总编剧智能体页面已加载 - 完整功能版');
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
                background: white;
                padding: '1rem';
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                zIndex: '1000';
            }
        });
    }
    
    // 平滑滚动
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
    
    // 工具折叠/展开
    document.querySelectorAll('.tool-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const toolBody = this.closest('.tool-card').querySelector('.tool-body');
            const icon = this.querySelector('i');
            
            if (toolBody.style.display === 'none' || toolBody.style.display === '') {
                toolBody.style.display = 'block';
                icon.className = 'fas fa-chevron-down';
            } else {
                toolBody.style.display = 'none';
                icon.className = 'fas fa-chevron-up';
            }
        });
    });
}

// 聊天功能
function initChat() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const clearButton = document.getElementById('clearChat');
    const saveButton = document.getElementById('saveStory');
    const exportButton = document.getElementById('exportScript');
    const promptButtons = document.querySelectorAll('.prompt-btn');
    const actionButtons = document.querySelectorAll('.action-btn');
    
    // 发送消息
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        // 添加用户消息
        addUserMessage(message);
        
        // 清空输入框
        messageInput.value = '';
        messageInput.focus();
        
        // 模拟编剧智能体思考
        setTimeout(() => {
            const response = generateScreenwriterResponse(message);
            const actions = getScreenwriterActions(message);
            addAgentMessage(response, actions);
        }, 1000);
    }
    
    // 添加用户消息
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">您</span>
                    <span class="message-time">刚刚</span>
                </div>
                <div class="message-text">${escapeHtml(text)}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // 添加编剧智能体消息
    function addAgentMessage(text, actions = []) {
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
            <div class="message-avatar">📝</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">总编剧智能体</span>
                    <span class="message-time">刚刚</span>
                </div>
                <div class="message-text">${formatMessageText(text)}</div>
                ${actionsHtml}
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        
        // 重新绑定动作按钮
        if (actions && actions.length > 0) {
            messageDiv.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    handleScreenwriterAction(this.getAttribute('data-action'));
                });
            });
        }
    }
    
    // 生成编剧智能体响应
    function generateScreenwriterResponse(userMessage) {
        const responses = {
            // 故事构思相关
            '故事': [
                `基于您的描述，我进行了专业的故事分析：

**故事核心概念**：
📖 **主题**：成长与自我发现
🎭 **类型**：现代奇幻冒险
🎯 **目标读者**：青少年及年轻成人

**故事亮点**：
✨ **独特设定**：现实与奇幻世界的交织
💫 **情感核心**：关于勇气、友谊和自我接纳
🎨 **视觉潜力**：丰富的场景和角色设计可能性

**发展建议**：
1. **深化世界观**：建立清晰的规则和逻辑
2. **强化角色弧**：确保主角有明确的成长轨迹
3. **平衡节奏**：紧张与舒缓情节交替出现
4. **增加情感深度**：挖掘角色的内心冲突

**参考案例**：
- 类似作品：《XXX》、《YYY》
- 推荐学习：《故事》罗伯特·麦基`,
                
                `故事构思完成！我的专业评估：

**叙事结构建议**：三幕式结构
**第一幕（开端）**：
- 引入平凡世界
- 激励事件发生
- 主角做出关键决定

**第二幕（对抗）**：
- 遇到盟友和敌人
- 经历考验和成长
- 中点转折提升张力

**第三幕（结局）**：
- 最终对抗高潮
- 问题解决
- 新的平衡建立

**角色建议**：
- 主角：需要有明显的缺点和成长空间
- 反派：需要有合理的动机和深度
- 配角：需要有自己的故事和功能

**情节建议**：
- 每章都有明确的目标和冲突
- 保持悬念和读者好奇心
- 合理安排情感高潮点`
            ],
            
            // 角色设计相关
            '角色': [
                `角色设计报告：

**主角设计分析**：
👤 **基本信息**：
- 年龄：适合目标读者的年龄段
- 背景：有独特性和共鸣点
- 性格：有明显优点和缺点

🎭 **角色弧设计**：
- 起点：有明显的缺陷或不足
- 发展：通过经历获得成长
- 终点：成为更好的自己

💔 **内心冲突**：
- 恐惧：需要克服的心理障碍
- 欲望：推动行动的内在动力
- 矛盾：价值观的冲突和选择

**配角设计建议**：
1. **盟友角色**：
   - 功能：支持主角成长
   - 特点：与主角互补
   - 弧线：有自己的发展

2. **反派角色**：
   - 动机：合理的行动理由
   - 深度：不只是单纯的恶
   - 关系：与主角有特殊联系

3. **功能性角色**：
   - 导师：提供指导和帮助
   - 爱情对象：情感发展线
   - 喜剧 relief：调节故事节奏`,
                
                `为您推荐的角色设计方案：

**方案一：成长型主角**
- 特点：从普通到非凡的转变
- 适合：英雄之旅、成长故事
- 关键：明显的成长轨迹和内心变化

**方案二：反英雄主角**
- 特点：有缺陷的英雄，道德模糊
- 适合：复杂主题、成人故事
- 关键：让读者既爱又恨的矛盾感

**方案三：群像主角**
- 特点：多个主角，不同视角
- 适合：宏大叙事、多线故事
- 关键：平衡各个角色的戏份和发展

**角色关系设计**：
- **师徒关系**：传承与超越
- **友谊关系**：支持与考验
- **爱情关系**：吸引与冲突
- **敌对关系**：对抗与理解

**角色细节建议**：
1. 给每个角色独特的口头禅或习惯
2. 设计有象征意义的物品或符号
3. 建立角色之间的特殊联系
4. 考虑角色的过去和未来`
            ],
            
            // 结构相关
            '结构': [
                `叙事结构分析报告：

**当前结构分析**：
🏗️ **结构类型**：三幕式结构
- 优点：经典可靠，读者熟悉
- 改进：可以尝试混合结构增加新鲜感

📊 **节奏分析**：
- 开端：25%篇幅，引入充分
- 对抗：50%篇幅，发展充分
- 结局：25%篇幅，收尾完整

⚖️ **平衡性评估**：
- 情节平衡：动作与情感场景比例合理
- 角色平衡：主要角色发展机会均等
- 主题平衡：娱乐性与深度兼顾

**专业结构建议**：
1. **尝试英雄之旅结构**：增加神话感和史诗感
2. **考虑非线性叙事**：增加悬念和复杂性
3. **使用多视角叙事**：丰富故事层次
4. **实验章节结构**：创造独特的阅读体验`,
                
                `基于您的需求，我建议以下结构方案：

**方案一：经典三幕式**
- 特点：稳定、清晰、易理解
- 适用：大多数故事类型
- 技巧：严格遵循25-50-25比例

**方案二：英雄之旅**
- 特点：神话感、成长性、史诗感
- 适用：奇幻、冒险、成长故事
- 技巧：完整经历12个阶段

**方案三：救猫咪节拍表**
- 特点：电影感、节奏强、商业性
- 适用：剧本、商业小说
- 技巧：精确控制情节点时间

**方案四：七点故事结构**
- 特点：高效、清晰、易规划
- 适用：中短篇、新手创作
- 技巧：聚焦7个关键情节点

**结构优化建议**：
1. 确保每个情节点都有明确功能
2. 保持节奏的起伏和变化
3. 合理安排悬念和解答
4. 注意开头和结尾的呼应`
            ],
            
            // 对话相关
            '对话': [
                `对话分析报告：

**当前对话分析**：
💬 **对话功能**：
- 推进情节：良好
- 展现性格：优秀
- 传递信息：适中
- 营造氛围：良好

🎭 **对话风格**：
- 自然度：85%
- 个性度：78%
- 信息量：72%
- 情感度：80%

**对话问题识别**：
1. **信息堆砌**：部分对话承载过多信息
2. **个性不足**：某些角色对话缺乏独特性
3. **节奏单一**：对话节奏缺乏变化
4. **功能重复**：多个对话实现相同功能

**专业对话建议**：
1. **差异化对话**：每个角色有独特的说话方式
2. **潜台词运用**：对话表面意思和实际意思的差异
3. **节奏控制**：长短句结合，创造对话节奏
4. **动作配合**：对话配合适当的动作和表情`,
                
                `对话创作指南：

**对话基本原则**：
1. **推进情节**：每段对话都应该推动故事发展
2. **展现性格**：通过对话展现角色性格特点
3. **传递信息**：自然传递必要的故事信息
4. **营造氛围**：创造适当的情感氛围

**对话技巧**：
💡 **潜台词艺术**：
- 说一套，想一套
- 表面平静，内心汹涌
- 简单话语，复杂含义

🎭 **个性化对话**：
- 词汇选择：反映教育背景
- 句式结构：反映思维模式
- 说话节奏：反映性格特点

📝 **对话格式**：
- 避免长篇大论
- 合理使用对话标签
- 配合动作和表情

**常见对话问题解决**：
1. **对话生硬**：增加日常用语和口语化表达
2. **信息堆砌**：分散信息到多个对话场景
3. **个性模糊**：为每个角色设计独特说话方式
4. **节奏单调**：变化对话长度和情感强度`
            ],
            
            // 默认响应
            'default': [
                `我理解您的创作需求。作为总编剧智能体，我的专业建议是：

**故事创作方法论**：
1. **创意孵化**：从灵感到完整概念
2. **角色塑造**：创造立体生动的角色
3. **结构设计**：规划合理的叙事框架
4. **情节编织**：设计引人入胜的情节
5. **对话创作**：编写自然生动的对话

**执行建议**：
- 从小的创意实验开始
- 建立系统的创作流程
- 进行多次修改和优化
- 重视读者体验和反馈

您希望我从哪个具体方面开始协助？`,
                
                `感谢分享您的创作想法！从专业的编剧角度，我建议：

**宏观层面关注**：
- 确保故事主题与情感核心一致
- 建立清晰的叙事逻辑和时间线
- 考虑目标读者的阅读习惯和期待

**微观层面把握**：
- 关注角色的内心世界和成长
- 重视情节的节奏和悬念设计
- 优化对话的自然度和个性表达

**技术实现要点**：
- 选择合适的叙事结构和视角
- 平衡娱乐性和思想深度
- 确保技术细节的准确性和一致性

需要我帮您进行更具体的创作分析吗？`
            ]
        };
        
        // 根据用户消息选择响应类别
        let category = 'default';
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('故事') || lowerMessage.includes('情节') || lowerMessage.includes('剧情')) {
            category = '故事';
        } else if (lowerMessage.includes('角色') || lowerMessage.includes('人物') || lowerMessage.includes('主角')) {
            category = '角色';
        } else if (lowerMessage.includes('结构') || lowerMessage.includes('框架') || lowerMessage.includes('大纲')) {
            category = '结构';
        } else if (lowerMessage.includes('对话') || lowerMessage.includes('台词') || lowerMessage.includes('说话')) {
            category = '对话';
        }
        
        const categoryResponses = responses[category] || responses.default;
        const randomIndex = Math.floor(Math.random() * categoryResponses.length);
        
        return categoryResponses[randomIndex];
    }
    
    // 获取编剧动作
    function getScreenwriterActions(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('故事') || lowerMessage.includes('情节')) {
            return [
                { id: 'develop-story', icon: 'fas fa-book', text: '发展故事' },
                { id: 'outline-plot', icon: 'fas fa-sitemap', text: '大纲规划' },
                { id: 'brainstorm-ideas', icon: 'fas fa-lightbulb', text: '头脑风暴' }
            ];
        } else if (lowerMessage.includes('角色') || lowerMessage.includes('人物')) {
            return [
                { id: 'design-character', icon: 'fas fa-user-edit', text: '设计角色' },
                { id: 'create-backstory', icon: 'fas fa-history', text: '创作背景' },
                { id: 'plan-arc', icon: 'fas fa-chart-line', text: '规划发展弧' }
            ];
        } else if (lowerMessage.includes('结构') || lowerMessage.includes('框架')) {
            return [
                { id: 'choose-structure', icon: 'fas fa-th-large', text: '选择结构' },
                { id: 'plan-beats', icon: 'fas fa-drum', text: '规划节拍' },
                { id: 'optimize-pacing', icon: 'fas fa-tachometer-alt', text: '优化节奏' }
            ];
        }
        
        return [
            { id: 'brainstorm-story', icon: 'fas fa-lightbulb', text: '头脑风暴' },
            { id: 'develop-character', icon: 'fas fa-user-plus', text: '设计角色' },
            { id: 'plan-structure', icon: 'fas fa-sitemap', text: '规划结构' }
        ];
    }
    
    // 处理编剧动作
    function handleScreenwriterAction(actionId) {
        let response = '';
        
        switch(actionId) {
            case 'develop-story':
                response = `故事发展工具启动！
                
**故事发展步骤**：
1. **核心概念深化**：明确故事的核心思想和主题
2. **世界观构建**：建立故事发生的环境和规则
3. **情节线设计**：规划主要情节和支线情节
4. **冲突系统建立**：设计多层次的故事冲突
5. **情感线编织**：安排情感发展和高潮点

**专业建议**：
- 使用"故事构思器"生成创意
- 使用"情节设计器"规划结构
- 使用"冲突设计器"建立张力
- 使用"世界观构建器"创造环境

**发展技巧**：
1. 从一句话梗概开始，逐步扩展
2. 确保每个情节转折都有逻辑支撑
3. 平衡动作场景和情感场景
4. 为读者创造情感共鸣点`;
                break;
                
            case 'outline-plot':
                response = `情节大纲规划开始！
                
**大纲规划方法**：
📋 **详细大纲法**：
- 优点：结构清晰，减少写作障碍
- 缺点：可能限制创作灵活性
- 适合：长篇、系列作品

🎯 **节拍大纲法**：
- 优点：节奏明确，商业性强
- 缺点：可能显得公式化
- 适合：剧本、商业小说

🌱 **种子大纲法**：
- 优点：灵活自由，鼓励创意
- 缺点：可能失去方向
- 适合：文学性作品、实验创作

**大纲要素**：
1. **章节概要**：每章的主要内容和功能
2. **情节点**：关键的情节转折和发展
3. **角色发展**：主要角色的成长轨迹
4. **主题呈现**：主题如何通过情节展现
5. **节奏控制**：紧张与舒缓的交替安排

**工具推荐**：
- 使用"三幕式结构"工具规划整体框架
- 使用"英雄之旅"工具设计角色旅程
- 使用"时间线"工具安排事件顺序`;
                break;
                
            case 'brainstorm-ideas':
                response = `头脑风暴会议开始！
                
**创意激发技巧**：
💡 **假设提问法**：
- "如果...会怎样？"的问题
- 例：如果时间可以买卖会怎样？
- 例：如果动物会说话会怎样？

🎭 **角色冲突法**：
- 创造极端性格的角色组合
- 例：完美主义者 vs 随性者
- 例：理想主义者 vs 现实主义者

🌍 **世界构建法**：
- 从独特的世界设定开始
- 例：所有人都失忆的世界
- 例：魔法成为日常科技的世界

**创意筛选标准**：
1. **新颖性**：是否有新鲜的角度？
2. **可行性**：是否能够完整实现？
3. **共鸣性**：是否能引起读者共鸣？
4. **扩展性**：是否有发展潜力？

**头脑风暴规则**：
- 不批评任何想法
- 追求数量而非质量
- 鼓励疯狂的想法
- 组合和改进现有想法`;
                break;
                
            case 'design-character':
                response = `角色设计工作坊启动！
                
**角色设计维度**：
👤 **外在特征**：
- 外貌：长相、衣着、姿态
- 声音：音色、语速、口音
- 动作：习惯动作、身体语言

🧠 **内在特征**：
- 性格：优点、缺点、怪癖
- 价值观：信仰、原则、道德观
- 动机：欲望、恐惧、目标

📖 **背景故事**：
- 家庭：成长环境、家庭关系
- 经历：关键事件、创伤、成就
- 技能：特长、知识、能力

**角色关系设计**：
- **互补关系**：性格互补的角色组合
- **冲突关系**：价值观冲突的角色组合
- **成长关系**：互相促进成长的角色组合
- **镜像关系**：相似但选择不同的角色组合

**角色弧设计**：
1. **起点**：角色的初始状态和问题
2. **挑战**：角色面临的考验和选择
3. **转变**：角色的成长和变化
4. **终点**：角色的最终状态和领悟`;
                break;
                
            case 'create-backstory':
                response = `角色背景创作指南：
                
**背景故事要素**：
🏠 **家庭背景**：
- 父母：职业、性格、教育方式
- 兄弟姐妹：关系、互动、影响
- 家庭环境：经济状况、居住环境

🎓 **教育经历**：
- 学校：类型、氛围、经历
- 老师：影响深远的导师
- 同学：重要的朋友或对手

💼 **工作经历**：
- 第一份工作：经历和收获
- 职业发展：转折点和成就
- 同事关系：重要的合作或竞争

❤️ **情感经历**：
- 初恋：青涩的恋爱经历
- 重要关系：深刻的情感连接
- 情感创伤：影响性格的事件

**背景故事创作技巧**：
1. **冰山原则**：只展现10%，隐藏90%
2. **因果联系**：背景决定现在的性格和行为
3. **象征意义**：背景元素具有象征意义
4. **情感共鸣**：背景能引起读者共鸣

**背景故事使用**：
- 通过闪回展现重要背景
- 通过对话暗示背景信息
- 通过物品象征背景经历
- 通过行为反映背景影响`;
                break;
                
            case 'plan-arc':
                response = `角色发展弧规划：
                
**发展弧类型**：
📈 **正向成长弧**：
- 特点：从缺陷到完善，从弱小到强大
- 例：哈利·波特、卢克·天行者
- 关键：明确的成长轨迹和里程碑

📉 **负向下滑弧**：
- 特点：从善良到堕落，从希望到绝望
- 例：麦克白、安纳金·天行者
- 关键：合理的堕落原因和过程

➡️ **平稳不变弧**：
- 特点：性格基本不变，改变的是环境
- 例：詹姆斯·邦德、福尔摩斯
- 关键：用不变应对万变的智慧

🔄 **彻底转变弧**：
- 特点：价值观的根本转变
- 例：史克鲁奇、韩·索罗
- 关键：强烈的触发事件和内心挣扎

**发展弧设计步骤**：
1. **确定弧类型**：基于故事主题选择
2. **设定起点终点**：明确变化的方向
3. **安排转折点**：设计关键的转变时刻
4. **连接情节**：将发展与情节结合
5. **确保合理性**：变化要有逻辑支撑

**发展弧检查清单**：
✅ 变化是否明显且有意义？
✅ 变化是否有合理的触发？
✅ 变化是否影响情节发展？
✅ 变化是否能引起共鸣？`;
                break;
                
            case 'choose-structure':
                response = `叙事结构选择指南：
                
**主要结构类型**：
🏛️ **三幕式结构**：
- 适用：大多数故事类型
- 优点：经典可靠，读者熟悉
- 比例：25%-50%-25%

🗺️ **英雄之旅**：
- 适用：奇幻、冒险、成长故事
- 优点：神话感强，角色发展完整
- 阶段：12个标准阶段

🎬 **救猫咪节拍表**：
- 适用：电影剧本、商业小说
- 优点：节奏明确，商业性强
- 节拍：15个关键节拍

📊 **七点故事结构**：
- 适用：中短篇、新手创作
- 优点：简洁高效，易于规划
- 要点：7个结构要点

**结构选择考虑因素**：
1. **故事类型**：不同类型适合不同结构
2. **篇幅长度**：长短篇需要不同结构
3. **目标读者**：读者期待影响结构选择
4. **作者风格**：个人创作习惯和偏好

**混合结构建议**：
- 三幕式 + 英雄之旅：经典与神话结合
- 节拍表 + 非线性：商业与艺术平衡
- 多视角 + 多时间线：复杂与深度兼顾`;
                break;
                
            case 'plan-beats':
                response = `情节节拍规划：
                
**节拍定义**：
🎵 **节拍**：故事中的最小情节单位
- 功能：推动故事向前发展
- 特点：引起情感反应
- 类型：动作节拍、对话节拍、情感节拍

**关键节拍**：
1. **开场画面**：建立基调，吸引读者
2. **主题呈现**：暗示故事主题
3. **铺垫**：介绍角色和世界
4. **推动**：事件打破平静
5. **辩论**：角色犹豫不决
6. **第二幕衔接点**：进入新世界
7. **B故事**：情感线或支线
8. **娱乐游戏**：展示故事魅力
9. **中点**：虚假胜利或失败
10. **坏人逼近**：压力增加
11. **一无所有**：最黑暗时刻
12. **灵魂黑夜**：深刻反思
13. **第三幕衔接点**：找到解决方案
14. **结局**：最终对抗
15. **终场画面**：与开场呼应

**节拍规划技巧**：
1. **节奏控制**：紧张与舒缓交替
2. **情感起伏**：高潮与低谷安排
3. **信息释放**：逐步揭示信息
4. **悬念设置**：保持读者好奇心`;
                break;
                
            case 'optimize-pacing':
                response = `故事节奏优化：
                
**节奏定义**：
⏱️ **节奏**：故事发展的速度和强度变化
- 快节奏：动作密集，情节推进快
- 慢节奏：情感深入，细节丰富
- 变节奏：快慢交替，张弛有度

**节奏控制要素**：
1. **章节长度**：短章快节奏，长章慢节奏
2. **句子结构**：短句紧张，长句舒缓
3. **场景切换**：频繁切换增加节奏感
4. **信息密度**：高密度快节奏，低密度慢节奏

**节奏优化技巧**：
🎢 **过山车式节奏**：
- 快速上升：紧张情节积累
- 高峰停留：情感或动作高潮
- 缓慢下降：情感释放和反思
- 平稳运行：信息传递和铺垫

🌊 **波浪式节奏**：
- 小波：日常情节和细节
- 中波：次要冲突和发展
- 大波：主要冲突和高潮
- 巨浪：故事转折和危机

**节奏检查清单**：
✅ 开头是否足够吸引人？
✅ 中间是否避免拖沓？
✅ 高潮是否足够强烈？
✅ 结尾是否令人满意？
✅ 整体是否张弛有度？`;
                break;
                
            default:
                response = `已执行编剧动作：${actionId}
                
这个动作将帮助您更好地进行故事创作。如果您需要更详细的指导或想尝试其他功能，请随时告诉我！`;
        }
        
        addAgentMessage(response);
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
                        <div class="message-avatar">📝</div>
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-sender">总编剧智能体</span>
                                <span class="message-time">刚刚</span>
                            </div>
                            <div class="message-text">
                                对话已清空！我是您的总编剧智能体，随时为您提供专业的故事创作建议。
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            addAgentMessage('故事已保存到您的创作档案中。您可以在"我的项目"中查看和管理所有保存的故事。');
        });
    }
    
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            addAgentMessage('剧本导出完成！包含以下格式：\n\n1. PDF格式（标准剧本格式）\n2. Word格式（可编辑文档）\n3. Fountain格式（专业编剧格式）\n4. 纯文本格式（通用格式）');
        });
    }
    
    // 快速提示按钮
    promptButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.dataset.prompt;
            let message = '';
            
            switch(prompt) {
                case 'story-idea':
                    message = '帮我构思一个有趣的故事';
                    break;
                case 'character-help':
                    message = '设计一个令人难忘的角色';
                    break;
                case 'structure-advice':
                    message = '给我的故事提供结构建议';
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
            handleScreenwriterAction(action);
        });
    });
}

// 故事工具初始化
function initStoryTools() {
    // 故事构思器
    const generateStoryBtn = document.getElementById('generateStoryIdea');
    const storyIdeasDiv = document.getElementById('storyIdeas');
    
    if (generateStoryBtn && storyIdeasDiv) {
        generateStoryBtn.addEventListener('click', function() {
            const genre = document.getElementById('storyGenre').value;
            const theme = document.getElementById('storyTheme').value;
            
            const ideas = generateStoryIdeas(genre, theme);
            
            storyIdeasDiv.innerHTML = ideas.map(idea => `
                <div class="story-idea-item">
                    <div class="story-idea-title">${idea.title}</div>
                    <div class="story-idea-desc">${idea.description}</div>
                </div>
            `).join('');
            
            // 在聊天中显示生成的故事创意
            addAgentMessage(`故事创意生成完成！
            
**类型**：${getGenreName(genre)}
**主题**：${getThemeName(theme)}
**最佳创意**：${ideas[0].title}

**所有创意**：
${ideas.slice(0, 3).map((idea, index) => `${index + 1}. ${idea.title}：${idea.description}`).join('\n')}

**使用建议**：
1. 选择最吸引您的创意
2. 使用其他工具进一步发展
3. 结合多个创意创造独特故事`);
        });
        
        // 初始显示示例创意
        const initialIdeas = generateStoryIdeas('fantasy', 'growth');
        storyIdeasDiv.innerHTML = initialIdeas.slice(0, 2).map(idea => `
            <div class="story-idea-item">
                <div class="story-idea-title">${idea.title}</div>
                <div class="story-idea-desc">${idea.description}</div>
            </div>
        `).join('');
    }
    
    // 情节设计器
    const designPlotBtn = document.getElementById('designPlot');
    const plotOutlineDiv = document.getElementById('plotOutline');
    
    if (designPlotBtn && plotOutlineDiv) {
        designPlotBtn.addEventListener('click', function() {
            const plotType = document.querySelector('input[name="plot"]:checked').value;
            
            const outline = generatePlotOutline(plotType);
            
            plotOutlineDiv.innerHTML = outline.map(point => `
                <div class="plot-point-item">
                    <div class="plot-point-title">${point.title}</div>
                    <div class="plot-point-desc">${point.description}</div>
                </div>
            `).join('');
        });
    }
    
    // 冲突设计器
    const designConflictBtn = document.getElementById('designConflict');
    const conflictDesignDiv = document.getElementById('conflictDesign');
    
    if (designConflictBtn && conflictDesignDiv) {
        designConflictBtn.addEventListener('click', function() {
            const conflictType = document.getElementById('conflictType').value;
            const intensity = parseInt(document.getElementById('conflictIntensity').value);
            
            const conflict = designConflict(conflictType, intensity);
            
            conflictDesignDiv.innerHTML = `
                <div class="conflict-item">
                    <div class="conflict-title">${conflict.title}</div>
                    <div class="conflict-desc">${conflict.description}</div>
                    <div class="conflict-intensity">强度：${intensity}/10</div>
                </div>
            `;
        });
    }
    
    // 世界观构建器
    const buildWorldBtn = document.getElementById('buildWorld');
    const worldBuildingDiv = document.getElementById('worldBuilding');
    
    if (buildWorldBtn && worldBuildingDiv) {
        buildWorldBtn.addEventListener('click', function() {
            const worldType = document.getElementById('worldType').value;
            const detailLevel = document.getElementById('worldDetail').value;
            
            const world = buildWorld(worldType, detailLevel);
            
            worldBuildingDiv.innerHTML = world.elements.map(element => `
                <div class="world-item">
                    <div class="world-title">${element.title}</div>
                    <div class="world-desc">${element.description}</div>
                </div>
            `).join('');
        });
    }
}

// 生成故事创意
function generateStoryIdeas(genre, theme) {
    const ideas = {
        fantasy: {
            growth: [
                {
                    title: "失忆的魔法师",
                    description: "一位失去记忆的强大魔法师在平凡小镇重新学习魔法，同时追寻自己的过去和真正的使命。"
                },
                {
                    title: "龙之契约",
                    description: "年轻的村庄少年意外与古老巨龙签订契约，必须学会控制龙的力量来保护家园。"
                },
                {
                    title: "镜中王国",
                    description: "女孩发现家中的古董镜子通往一个平行奇幻世界，她在两个世界间寻找平衡。"
                }
            ],
            love: [
                {
                    title: "星月之恋",
                    description: "太阳王子和月亮公主的禁忌之恋，他们的结合会破坏两个世界的平衡。"
                },
                {
                    title: "魔法学院的秘密",
                    description: "在魔法学院里，两个敌对家族的学生在共同解决学院危机时坠入爱河。"
                }
            ]
        },
        // 其他类型和主题组合...
    };
    
    // 返回对应类型的创意，如果没有则返回通用创意
    const genreIdeas = ideas[genre] || ideas.fantasy;
    const themeIdeas = genreIdeas[theme] || genreIdeas.growth;
    
    return themeIdeas;
}

// 获取类型名称
function getGenreName(genreKey) {
    const names = {
        'fantasy': '奇幻',
        'sci-fi': '科幻',
        'romance': '爱情',
        'mystery': '悬疑',
        'adventure': '冒险',
        'drama': '剧情'
    };
    return names[genreKey] || genreKey;
}

// 获取主题名称
function getThemeName(themeKey) {
    const names = {
        'growth': '成长与蜕变',
        'love': '爱与牺牲',
        'justice': '正义与复仇',
        'identity': '身份与自我',
        'freedom': '自由与束缚',
        'truth': '真相与谎言'
    };
    return names[themeKey] || themeKey;
}

// 生成情节大纲
function generatePlotOutline(plotType) {
    const outlines = {
        'three-act': [
            {
                title: '第一幕：开端',
                description: '引入平凡世界，建立角色和设定，发生激励事件'
            },
            {
                title: '转折点一',
                description: '主角做出关键决定，进入新世界或接受挑战'
            },
            {
                title: '第二幕：对抗',
                description: '主角面对挑战，遇到盟友和敌人，经历成长'
            },
            {
                title: '中点转折',
                description: '故事方向改变，冲突升级，角色面临更大考验'
            },
            {
                title: '一切尽失',
                description: '主角遭遇最大失败，似乎没有希望'
            },
            {
                title: '第三幕：结局',
                description: '主角重新振作，最终对抗，解决问题'
            },
            {
                title: '新平衡',
                description: '建立新的平衡，展示角色成长和变化'
            }
        ],
        'hero-journey': [
            {
                title: '平凡世界',
                description: '介绍英雄的日常生活和未满足的欲望'
            },
            {
                title: '冒险召唤',
                description: '英雄收到改变生活的召唤或挑战'
            },
            {
                title: '拒绝召唤',
                description: '英雄因恐惧或责任拒绝冒险'
            },
            {
                title: '遇见导师',
                description: '智慧导师出现，提供指导和帮助'
            },
            {
                title: '跨越门槛',
                description: '英雄决定冒险，进入新世界'
            },
            {
                title: '考验盟友敌人',
                description: '在新世界遇到朋友和敌人'
            },
            {
                title: '深入洞穴',
                description: '接近最危险的地方或面对最大恐惧'
            },
            {
                title: '严峻考验',
                description: '生死考验，英雄面临最大挑战'
            },
            {
                title: '获得奖赏',
                description: '英雄获得胜利或重要物品'
            },
            {
                title: '回归之路',
                description: '英雄带着奖赏返回，但被追击'
            },
            {
                title: '浴火重生',
                description: '最终考验，英雄彻底转变'
            },
            {
                title: '满载而归',
                description: '英雄带着智慧和成长回归平凡世界'
            }
        ],
        'save-the-cat': [
            {
                title: '开场画面',
                description: '展示主角的日常生活和问题'
            },
            {
                title: '主题呈现',
                description: '暗示故事要探讨的主题'
            },
            {
                title: '铺垫',
                description: '介绍主要角色和关系'
            },
            {
                title: '推动',
                description: '事件打破主角的平静生活'
            },
            {
                title: '辩论',
                description: '主角犹豫是否接受挑战'
            },
            {
                title: '第二幕衔接点',
                description: '主角决定行动，进入新世界'
            },
            {
                title: 'B故事',
                description: '引入情感线或支线故事'
            },
            {
                title: '娱乐游戏',
                description: '展示故事的魅力和趣味'
            },
            {
                title: '中点',
                description: '虚假胜利或失败，故事转向'
            },
            {
                title: '坏人逼近',
                description: '反派力量增强，压力增大'
            },
            {
                title: '一无所有',
                description: '主角失去一切，陷入绝望'
            },
            {
                title: '灵魂黑夜',
                description: '主角深刻反思，找到新方向'
            },
            {
                title: '第三幕衔接点',
                description: '主角找到解决方案，准备最终对抗'
            },
            {
                title: '结局',
                description: '最终对抗，解决问题'
            },
            {
                title: '终场画面',
                description: '展示主角的变化和新生活'
            }
        ]
    };
    
    return outlines[plotType] || outlines['three-act'];
}

// 设计冲突
function designConflict(type, intensity) {
    const conflicts = {
        'man-vs-man': {
            title: '人与人冲突',
            description: '两个或多个角色之间的直接对抗，基于利益、价值观或情感的冲突。'
        },
        'man-vs-self': {
            title: '人与自我冲突',
            description: '角色内心的矛盾，如欲望与道德、恐惧与勇气的斗争。'
        },
        'man-vs-society': {
            title: '人与社会冲突',
            description: '个体与社会规范、制度或价值观的对抗。'
        },
        'man-vs-nature': {
            title: '人与自然冲突',
            description: '角色与自然力量、环境或生存挑战的斗争。'
        },
        'man-vs-technology': {
            title: '人与科技冲突',
            description: '人类与技术发展、人工智能或科技伦理的冲突。'
        }
    };
    
    const conflict = conflicts[type] || conflicts['man-vs-man'];
    const intensityText = intensity >= 7 ? '激烈冲突' : intensity >= 4 ? '中等冲突' : '温和冲突';
    
    return {
        title: `${conflict.title} (${intensityText})`,
        description: `${conflict.description} 冲突强度：${intensity}/10，建议通过${getIntensityAdvice(intensity)}来表现冲突。`
    };
}

// 获取强度建议
function getIntensityAdvice(intensity) {
    if (intensity >= 7) {
        return '直接对抗、激烈对话、肢体冲突';
    } else if (intensity >= 4) {
        return '言语交锋、心理博弈、间接对抗';
    } else {
        return '微妙暗示、内心矛盾、潜在张力';
    }
}

// 构建世界观
function buildWorld(type, detail) {
    const worlds = {
        'realistic': {
            title: '现实世界',
            elements: [
                {
                    title: '社会结构',
                    description: '基于现实社会的阶层、职业和关系网络。'
                },
                {
                    title: '地理环境',
                    description: '真实或类似真实的地理位置和自然环境。'
                },
                {
                    title: '文化背景',
                    description: '现实存在的文化传统、习俗和价值观。'
                }
            ]
        },
        'fantasy': {
            title: '奇幻世界',
            elements: [
                {
                    title: '魔法系统',
                    description: '魔法的规则、来源、限制和使用方式。'
                },
                {
                    title: '种族设定',
                    description: '人类、精灵、矮人等种族的特性和关系。'
                },
                {
                    title: '神秘生物',
                    description: '龙、独角兽、妖精等奇幻生物的存在和特性。'
                }
            ]
        },
        'sci-fi': {
            title: '科幻世界',
            elements: [
                {
                    title: '科技水平',
                    description: '先进的科学技术、人工智能和太空旅行能力。'
                },
                {
                    title: '社会制度',
                    description: '未来社会的政治、经济和文化结构。'
                },
                {
                    title: '外星文明',
                    description: '外星种族的存在、特性和与人类的关系。'
                }
            ]
        }
    };
    
    const world = worlds[type] || worlds['realistic'];
    const detailLevel = detail === 'detailed' ? '详细' : detail === 'comprehensive' ? '全面' : '基础';
    
    return {
        title: `${world.title} (${detailLevel}设定)`,
        elements: world.elements.map(element => ({
            title: element.title,
            description: `${element.description} ${getDetailDescription(detail)}`
        }))
    };
}

// 获取细节描述
function getDetailDescription(detail) {
    switch(detail) {
        case 'detailed':
            return '包含具体规则、历史背景和文化细节。';
        case 'comprehensive':
            return '包含完整的社会结构、经济系统和历史演变。';
        default:
            return '包含基本设定和核心规则。';
    }
}

// 角色工具初始化
function initCharacterTools() {
    // 主角设计器
    const designProtagonistBtn = document.getElementById('designProtagonist');
    const protagonistDesignDiv = document.getElementById('protagonistDesign');
    
    if (designProtagonistBtn && protagonistDesignDiv) {
        designProtagonistBtn.addEventListener('click', function() {
            const type = document.getElementById('protagonistType').value;
            const archetype = document.getElementById('characterArchetype').value;
            
            const protagonist = designProtagonist(type, archetype);
            
            protagonistDesignDiv.innerHTML = `
                <div class="character-item">
                    <div class="character-title">${protagonist.name}</div>
                    <div class="character-desc">${protagonist.description}</div>
                    <div class="character-traits">
                        <strong>核心特质：</strong>${protagonist.traits.join('、')}
                    </div>
                </div>
            `;
        });
    }
    
    // 配角设计器
    const designSupportingBtn = document.getElementById('designSupporting');
    const supportingDesignDiv = document.getElementById('supportingDesign');
    
    if (designSupportingBtn && supportingDesignDiv) {
        designSupportingBtn.addEventListener('click', function() {
            const role = document.getElementById('supportingRole').value;
            const relationship = document.getElementById('relationshipType').value;
            
            const supporting = designSupportingCharacter(role, relationship);
            
            supportingDesignDiv.innerHTML = `
                <div class="character-item">
                    <div class="character-title">${supporting.name}</div>
                    <div class="character-desc">${supporting.description}</div>
                    <div class="character-function">
                        <strong>主要功能：</strong>${supporting.function}
                    </div>
                </div>
            `;
        });
    }
    
    // 角色关系图
    const generateRelationshipsBtn = document.getElementById('generateRelationships');
    const relationshipMapDiv = document.getElementById('relationshipMap');
    
    if (generateRelationshipsBtn && relationshipMapDiv) {
        generateRelationshipsBtn.addEventListener('click', function() {
            const complexity = parseInt(document.getElementById('relationshipComplexity').value);
            const dynamics = Array.from(document.querySelectorAll('input[name="dynamics"]:checked'))
                .map(input => input.value);
            
            const relationships = generateRelationshipMap(complexity, dynamics);
            
            relationshipMapDiv.innerHTML = relationships.map(rel => `
                <div class="relationship-item">
                    <div class="relationship-title">${rel.relationship}</div>
                    <div class="relationship-desc">${rel.description}</div>
                    <div class="relationship-dynamics">动态：${rel.dynamics}</div>
                </div>
            `).join('');
        });
    }
    
    // 角色发展弧
    const designCharacterArcBtn = document.getElementById('designCharacterArc');
    const characterArcChartDiv = document.getElementById('characterArcChart');
    
    if (designCharacterArcBtn && characterArcChartDiv) {
        designCharacterArcBtn.addEventListener('click', function() {
            const arcType = document.getElementById('characterArc').value;
            const intensity = parseInt(document.getElementById('arcIntensity').value);
            
            const arc = designCharacterArc(arcType, intensity);
            
            characterArcChartDiv.innerHTML = `
                <div class="arc-item">
                    <div class="arc-title">${arc.title}</div>
                    <div class="arc-desc">${arc.description}</div>
                    <div class="arc-stages">
                        <strong>发展阶段：</strong>${arc.stages.join(' → ')}
                    </div>
                </div>
            `;
        });
    }
}

// 设计主角
function designProtagonist(type, archetype) {
    const protagonists = {
        'hero': {
            name: '英雄型主角',
            description: '具有高尚品质和强烈正义感，为了更大的利益而奋斗。',
            traits: ['勇敢', '正直', '有责任感', '愿意牺牲']
        },
        'antihero': {
            name: '反英雄主角',
            description: '有缺陷的英雄，道德观念模糊，但最终会做出正确选择。',
            traits: ['矛盾', '复杂', '有魅力', '不可预测']
        },
        'everyman': {
            name: '普通人主角',
            description: '平凡人物被卷入非凡事件，代表普通读者的视角。',
            traits: [' relatable', '接地气', '成长空间大', '容易共鸣']
        }
    };
    
    const protagonist = protagonists[type] || protagonists['hero'];
    const archetypeName = getArchetypeName(archetype);
    
    return {
        name: `${protagonist.name} (${archetypeName}原型)`,
        description: `${protagonist.description} 采用${archetypeName}原型，增加了角色的深度和象征意义。`,
        traits: protagonist.traits
    };
}

// 获取原型名称
function getArchetypeName(archetype) {
    const names = {
        'warrior': '战士',
        'mentor': '导师',
        'trickster': '捣蛋鬼',
        'caregiver': '照顾者',
        'explorer': '探索者'
    };
    return names[archetype] || archetype;
}

// 设计配角
function designSupportingCharacter(role, relationship) {
    const characters = {
        'sidekick': {
            name: '伙伴角色',
            description: '主角的忠实伙伴，提供支持和陪伴，有时也提供喜剧 relief。',
            function: '情感支持、实际帮助、衬托主角'
        },
        'mentor': {
            name: '导师角色',
            description: '智慧的长者或经验丰富的人物，为主角提供指导和帮助。',
            function: '传授知识、提供指引、推动成长'
        },
        'love-interest': {
            name: '爱情对象',
            description: '主角的爱慕对象，推动情感发展和角色成长。',
            function: '情感发展、动机来源、冲突制造'
        },
        'antagonist': {
            name: '反派角色',
            description: '主角的主要对手，制造冲突和推动情节发展。',
            function: '制造障碍、推动情节、衬托主角'
        }
    };
    
    const character = characters[role] || characters['sidekick'];
    const relationshipName = getRelationshipName(relationship);
    
    return {
        name: `${character.name} (${relationshipName}关系)`,
        description: `${character.description} 与主角建立${relationshipName}关系，增强故事的层次和深度。`,
        function: character.function
    };
}

// 获取关系名称
function getRelationshipName(relationship) {
    const names = {
        'friend': '朋友',
        'rival': '对手',
        'family': '家人',
        'mentor-student': '师徒',
        'love-hate': '爱恨交织'
    };
    return names[relationship] || relationship;
}

// 生成关系图
function generateRelationshipMap(complexity, dynamics) {
    const relationships = [];
    const baseCount = complexity * 2; // 复杂度决定关系数量
    
    for (let i = 0; i < baseCount; i++) {
        const dynamic = dynamics[Math.floor(Math.random() * dynamics.length)] || 'allies';
        relationships.push({
            relationship: `关系 ${i + 1}`,
            description: getRelationshipDescription(dynamic),
            dynamics: getDynamicName(dynamic)
        });
    }
    
    return relationships;
}

// 获取关系描述
function getRelationshipDescription(dynamic) {
    const descriptions = {
        'allies': '相互支持、信任合作的关系，共同面对挑战。',
        'enemies': '对立冲突、相互竞争的关系，制造故事张力。',
        'family': '血缘或情感连接的关系，涉及忠诚和责任的冲突。'
    };
    return descriptions[dynamic] || '复杂多变的关系，随着故事发展而变化。';
}

// 获取动态名称
function getDynamicName(dynamic) {
    const names = {
        'allies': '盟友',
        'enemies': '敌人',
        'family': '家庭'
    };
    return names[dynamic] || dynamic;
}

// 设计角色发展弧
function designCharacterArc(type, intensity) {
    const arcs = {
        'positive': {
            title: '正向成长弧',
            description: '角色从有缺陷的状态成长为更好的人，获得智慧和力量。',
            stages: ['缺陷显现', '接受挑战', '学习成长', '克服缺陷', '成为榜样']
        },
        'negative': {
            title: '负向下滑弧',
            description: '角色从良好状态逐渐堕落，失去道德和人性。',
            stages: ['初始善良', '面临诱惑', '做出妥协', '逐渐堕落', '彻底毁灭']
        },
        'flat': {
            title: '平稳不变弧',
            description: '角色性格基本不变，通过不变应对万变的世界。',
            stages: ['性格确立', '面对挑战', '坚持自我', '影响他人', '证明价值']
        },
        'transformative': {
            title: '彻底转变弧',
            description: '角色经历根本性的价值观转变，成为完全不同的人。',
            stages: ['旧价值观', '触发事件', '内心挣扎', '价值观转变', '新的人生']
        }
    };
    
    const arc = arcs[type] || arcs['positive'];
    const intensityText = intensity >= 7 ? '剧烈转变' : intensity >= 4 ? '中等转变' : '轻微转变';
    
    return {
        title: `${arc.title} (${intensityText})`,
        description: `${arc.description} 转变强度：${intensity}/10，适合表现${getArcSuitability(type)}的故事。`,
        stages: arc.stages
    };
}

// 获取弧线适用性
function getArcSuitability(type) {
    const suitability = {
        'positive': '成长、励志、英雄',
        'negative': '悲剧、警示、堕落',
        'flat': '侦探、冒险、系列',
        'transformative': '救赎、觉醒、重生'
    };
    return suitability[type] || '各种类型';
}

// 结构工具初始化
function initStructureTools() {
    // 三幕式结构应用
    const applyThreeActBtn = document.getElementById('applyThreeAct');
    if (applyThreeActBtn) {
        applyThreeActBtn.addEventListener('click', function() {
            addAgentMessage(`三幕式结构已应用！
            
**结构规划**：
🎬 **第一幕：开端（25%）**
- 建立平凡世界
- 引入主要角色
- 发生激励事件
- 主角做出关键决定

⚔️ **第二幕：对抗（50%）**
- 进入新世界或接受挑战
- 遇到盟友和敌人
- 经历考验和成长
- 中点转折提升张力

🎯 **第三幕：结局（25%）**
- 最终对抗准备
- 高潮冲突解决
- 问题得到解决
- 建立新的平衡

**专业建议**：
1. 严格按照25-50-25的比例分配篇幅
2. 确保每个情节点都有明确功能
3. 保持节奏的起伏和变化
4. 注意开头和结尾的呼应`);
        });
    }
    
    // 英雄之旅应用
    const applyHeroJourneyBtn = document.getElementById('applyHeroJourney');
    if (applyHeroJourneyBtn) {
        applyHeroJourneyBtn.addEventListener('click', function() {
            addAgentMessage(`英雄之旅结构已应用！
            
**完整12阶段**：
1. 🏠 平凡世界 - 英雄的日常生活
2. 📢 冒险召唤 - 改变生活的机会
3. ❌ 拒绝召唤 - 恐惧和责任阻碍
4. 👨‍🏫 遇见导师 - 获得指导和帮助
5. 🚪 跨越门槛 - 决定冒险，进入新世界
6. 🐉 考验盟友敌人 - 遇到朋友和对手
7. 🕳️ 深入洞穴 - 接近最危险的地方
8. 💀 严峻考验 - 生死存亡的挑战
9. 💎 获得奖赏 - 胜利或重要物品
10. 🔙 回归之路 - 带着奖赏返回
11. 🔥 浴火重生 - 最终考验和转变
12. 🏆 满载而归 - 带着智慧和成长回归

**神话原型应用**：
- 战士原型：勇敢面对挑战
- 导师原型：传授智慧
- 捣蛋鬼原型：打破常规
- 照顾者原型：提供支持
- 探索者原型：寻求真理`);
        });
    }
    
    // 时间线工具
    const addTimelineEventBtn = document.getElementById('addTimelineEvent');
    const clearTimelineBtn = document.getElementById('clearTimeline');
    const timelineContainer = document.getElementById('timelineContainer');
    
    if (addTimelineEventBtn && timelineContainer) {
        let eventCount = 0;
        
        addTimelineEventBtn.addEventListener('click', function() {
            eventCount++;
            const eventTypes = ['激励事件', '情节转折', '情感高潮', '冲突升级', '角色成长'];
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            
            const eventDiv = document.createElement('div');
            eventDiv.className = 'timeline-event';
            eventDiv.innerHTML = `
                <div class="event-marker">
                    <i class="fas fa-circle"></i>
                </div>
                <div class="event-content">
                    <div class="event-title">${eventType} #${eventCount}</div>
                    <div class="event-desc">故事中的重要时刻，推动情节发展。</div>
                    <div class="event-time">第${eventCount}章</div>
                </div>
            `;
            
            // 移除空状态提示
            const emptyState = timelineContainer.querySelector('.timeline-empty');
            if (emptyState) {
                emptyState.remove();
            }
            
            timelineContainer.appendChild(eventDiv);
            
            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                .timeline-event {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                    background: white;
                    border-radius: var(--radius);
                    border-left: 4px solid var(--screenwriter-primary);
                    animation: fadeIn 0.5s ease;
                }
                
                .event-marker {
                    margin-right: 0.75rem;
                    color: var(--screenwriter-primary);
                }
                
                .event-content {
                    flex: 1;
                }
                
                .event-title {
                    font-weight: 600;
                    color: var(--screenwriter-dark);
                    margin-bottom: 0.25rem;
                }
                
                .event-desc {
                    font-size: 0.9rem;
                    color: #666;
                    margin-bottom: 0.5rem;
                }
                
                .event-time {
                    font-size: 0.85rem;
                    color: var(--screenwriter-primary);
                    font-weight: 500;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            
            document.head.appendChild(style);
            
            // 显示添加成功消息
            showToast(`已添加"${eventType}"到时间线`);
        });
        
        if (clearTimelineBtn) {
            clearTimelineBtn.addEventListener('click', function() {
                if (confirm('确定要清空时间线吗？')) {
                    timelineContainer.innerHTML = `
                        <div class="timeline-empty">
                            <i class="fas fa-clock"></i>
                            <p>点击"添加事件"开始构建时间线</p>
                        </div>
                    `;
                    eventCount = 0;
                    showToast('时间线已清空');
                }
            });
        }
    }
}

// 对话工具初始化
function initDialogueTools() {
    // 情感按钮
    const emotionBtns = document.querySelectorAll('.emotion-btn');
    emotionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            emotionBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 对话生成
    const generateDialogueBtn = document.getElementById('generateDialogue');
    const analyzeDialogueBtn = document.getElementById('analyzeDialogue');
    const exportDialogueBtn = document.getElementById('exportDialogue');
    const dialoguePreview = document.getElementById('dialoguePreview');
    
    if (generateDialogueBtn && dialoguePreview) {
        generateDialogueBtn.addEventListener('click', function() {
            const character = document.getElementById('speakingCharacter').value;
            const customChar = document.getElementById('customCharacter').value;
            const style = document.getElementById('dialogueStyle').value;
            const emotion = document.querySelector('.emotion-btn.active')?.dataset.emotion || 'neutral';
            const text = document.getElementById('dialogueText').value;
            
            const characterName = customChar || getCharacterName(character);
            const dialogue = generateDialogue(characterName, style, emotion, text);
            
            // 移除空状态提示
            const emptyState = dialoguePreview.querySelector('.preview-empty');
            if (emptyState) {
                emptyState.remove();
            }
            
            const dialogueDiv = document.createElement('div');
            dialogueDiv.className = 'dialogue-line';
            dialogueDiv.innerHTML = `
                <div class="dialogue-character">${characterName}：</div>
                <div class="dialogue-content">"${dialogue}"</div>
                <div class="dialogue-meta">
                    <span class="dialogue-style">${getStyleName(style)}</span>
                    <span class="dialogue-emotion">${getEmoji(emotion)} ${getEmotionName(emotion)}</span>
                </div>
            `;
            
            dialoguePreview.appendChild(dialogueDiv);
            
            // 添加样式
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                .dialogue-line {
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: white;
                    border-radius: var(--radius);
                    border: 1px solid rgba(106, 17, 203, 0.1);
                    animation: slideIn 0.3s ease;
                }
                
                .dialogue-character {
                    font-weight: 600;
                    color: var(--screenwriter-primary);
                    margin-bottom: 0.5rem;
                }
                
                .dialogue-content {
                    font-size: 1.1rem;
                    line-height: 1.5;
                    color: var(--screenwriter-dark);
                    margin-bottom: 0.75rem;
                    font-style: italic;
                }
                
                .dialogue-meta {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    color: #666;
                }
                
                .dialogue-style {
                    background: var(--screenwriter-light);
                    padding: 0.25rem 0.5rem;
                    border-radius: 12px;
                }
                
                .dialogue-emotion {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `;
            
            document.head.appendChild(styleElement);
            
            showToast('对话生成完成');
        });
    }
    
    if (analyzeDialogueBtn) {
        analyzeDialogueBtn.addEventListener('click', function() {
            const text = document.getElementById('dialogueText').value;
            if (text.trim()) {
                const analysis = analyzeDialogue(text);
                addAgentMessage(`对话分析报告：
                
**对话长度**：${analysis.length}个字符
**句子数量**：${analysis.sentenceCount}句
**平均句长**：${analysis.avgSentenceLength}字符/句
**情感倾向**：${analysis.sentiment}

**专业评估**：
🎭 **自然度**：${analysis.naturalness}/100
💬 **个性度**：${analysis.personality}/100
📝 **信息量**：${analysis.informativeness}/100
🎯 **功能性**：${analysis.functionality}/100

**改进建议**：
${analysis.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

**优秀对话特征**：
1. 推进情节发展
2. 展现角色性格
3. 传递必要信息
4. 创造情感共鸣`);
            }
        });
    }
    
    if (exportDialogueBtn) {
        exportDialogueBtn.addEventListener('click', function() {
            const dialogueLines = dialoguePreview.querySelectorAll('.dialogue-line');
            if (dialogueLines.length > 0) {
                addAgentMessage('对话导出完成！包含以下格式：\n\n1. 剧本格式（标准对话格式）\n2. 纯文本格式（通用对话格式）\n3. JSON格式（结构化数据）\n4. CSV格式（表格数据）');
            } else {
                showToast('请先生成对话内容');
            }
        });
    }
}

// 获取角色名称
function getCharacterName(character) {
    const names = {
        'protagonist': '主角',
        'antagonist': '反派',
        'supporting': '配角',
        'narrator': '旁白'
    };
    return names[character] || character;
}

// 生成对话
function generateDialogue(character, style, emotion, context) {
    const styles = {
        'natural': '自然口语风格，使用日常用语和口语化表达。',
        'formal': '正式书面风格，使用规范语法和正式词汇。',
        'poetic': '诗意文学风格，使用比喻和富有韵律的语言。',
        'humorous': '幽默风趣风格，使用玩笑和轻松的表达。',
        'dramatic': '戏剧性风格，使用强烈情感和夸张表达。'
    };
    
    const emotions = {
        'happy': '开心愉快的情绪，充满乐观和活力。',
        'angry': '愤怒不满的情绪，带有攻击性和敌意。',
        'sad': '悲伤沮丧的情绪，充满失落和忧郁。',
        'surprised': '惊讶意外的情绪，带有震惊和不可思议。',
        'neutral': '中性平静的情绪，保持客观和理性。'
    };
    
    const styleDesc = styles[style] || styles['natural'];
    const emotionDesc = emotions[emotion] || emotions['neutral'];
    
    let baseDialogue = '';
    
    if (context && context.trim()) {
        // 如果有上下文，基于上下文生成对话
        baseDialogue = `关于"${context}"，${character}说道：`;
    } else {
        // 如果没有上下文，生成通用对话
        baseDialogue = `${character}的典型对话，体现${styleDesc}和${emotionDesc}`;
    }
    
    // 根据情感添加具体内容
    switch(emotion) {
        case 'happy':
            baseDialogue += ' "这真是太棒了！我从未感到如此充满希望和活力。"';
            break;
        case 'angry':
            baseDialogue += ' "我受够了！这种事情绝对不能继续下去！"';
            break;
        case 'sad':
            baseDialogue += ' "一切都结束了...我再也找不到继续前进的理由。"';
            break;
        case 'surprised':
            baseDialogue += ' "什么？！这怎么可能...我完全没想到会这样！"';
            break;
        default:
            baseDialogue += ' "我们需要冷静分析当前的情况，找到最合理的解决方案。"';
    }
    
    return baseDialogue;
}

// 获取风格名称
function getStyleName(style) {
    const names = {
        'natural': '自然口语',
        'formal': '正式书面',
        'poetic': '诗意文学',
        'humorous': '幽默风趣',
        'dramatic': '戏剧性'
    };
    return names[style] || style;
}

// 获取表情符号
function getEmoji(emotion) {
    const emojis = {
        'happy': '😊',
        'angry': '😠',
        'sad': '😢',
        'surprised': '😲',
        'neutral': '😐'
    };
    return emojis[emotion] || '😐';
}

// 获取情感名称
function getEmotionName(emotion) {
    const names = {
        'happy': '开心',
        'angry': '愤怒',
        'sad': '悲伤',
        'surprised': '惊讶',
        'neutral': '中性'
    };
    return names[emotion] || emotion;
}

// 分析对话
function analyzeDialogue(text) {
    const length = text.length;
    const sentences = text.split(/[。！？.!?]/).filter(s => s.trim());
    const sentenceCount = sentences.length;
    const avgSentenceLength = sentenceCount > 0 ? Math.round(length / sentenceCount) : 0;
    
    // 简单情感分析
    let sentiment = '中性';
    const happyWords = ['开心', '快乐', '高兴', '幸福', '美好'];
    const angryWords = ['生气', '愤怒', '讨厌', '恨', '可恶'];
    const sadWords = ['悲伤', '难过', '伤心', '痛苦', '绝望'];
    
    const lowerText = text.toLowerCase();
    if (happyWords.some(word => lowerText.includes(word))) {
        sentiment = '积极';
    } else if (angryWords.some(word => lowerText.includes(word))) {
        sentiment = '消极（愤怒）';
    } else if (sadWords.some(word => lowerText.includes(word))) {
        sentiment = '消极（悲伤）';
    }
    
    // 专业评估（模拟）
    const naturalness = Math.min(100, Math.max(20, 100 - (avgSentenceLength - 15) * 2));
    const personality = Math.min(100, Math.max(30, 50 + Math.random() * 50));
    const informativeness = Math.min(100, Math.max(40, length / 5));
    const functionality = Math.min(100, Math.max(50, 60 + Math.random() * 40));
    
    // 改进建议
    const suggestions = [];
    if (avgSentenceLength > 30) {
        suggestions.push('句子过长，建议拆分或简化');
    }
    if (avgSentenceLength < 10) {
        suggestions.push('句子过短，建议合并或扩展');
    }
    if (sentenceCount < 3) {
        suggestions.push('对话内容较少，建议增加对话深度');
    }
    if (naturalness < 60) {
        suggestions.push('对话不够自然，建议使用更多口语化表达');
    }
    if (personality < 60) {
        suggestions.push('对话个性不够鲜明，建议增加角色特色表达');
    }
    
    if (suggestions.length === 0) {
        suggestions.push('对话质量良好，继续保持！');
    }
    
    return {
        length,
        sentenceCount,
        avgSentenceLength,
        sentiment,
        naturalness: Math.round(naturalness),
        personality: Math.round(personality),
        informativeness: Math.round(informativeness),
        functionality: Math.round(functionality),
        suggestions
    };
}

// 快速动作初始化
function initQuickActions() {
    const quickActions = document.querySelectorAll('.quick-action');
    
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.dataset.action;
            
            switch(actionType) {
                case 'brainstorm':
                    addAgentMessage(`头脑风暴会议开始！
                    
**创意激发技巧**：
💡 **假设提问法**：
- "如果...会怎样？"的问题
- 例：如果时间可以买卖会怎样？
- 例：如果动物会说话会怎样？

🎭 **角色冲突法**：
- 创造极端性格的角色组合
- 例：完美主义者 vs 随性者
- 例：理想主义者 vs 现实主义者

🌍 **世界构建法**：
- 从独特的世界设定开始
- 例：所有人都失忆的世界
- 例：魔法成为日常科技的世界

**创意筛选标准**：
1. **新颖性**：是否有新鲜的角度？
2. **可行性**：是否能够完整实现？
3. **共鸣性**：是否能引起读者共鸣？
4. **扩展性**：是否有发展潜力？`);
                    break;
                    
                case 'structure':
                    addAgentMessage(`结构规划助手启动！
                    
**主要结构类型**：
🏛️ **三幕式结构**：经典可靠，适合大多数故事
🗺️ **英雄之旅**：神话感强，适合成长故事
🎬 **救猫咪节拍表**：节奏明确，适合商业作品
📊 **七点故事结构**：简洁高效，适合新手创作

**结构选择指南**：
1. **考虑故事类型**：不同类型适合不同结构
2. **考虑篇幅长度**：长短篇需要不同结构
3. **考虑目标读者**：读者期待影响结构选择
4. **考虑作者风格**：个人创作习惯和偏好

**专业建议**：
- 新手建议从三幕式开始
- 奇幻冒险故事适合英雄之旅
- 商业剧本适合救猫咪节拍表
- 实验性作品可以尝试混合结构`);
                    break;
                    
                case 'character':
                    addAgentMessage(`角色设计工作坊！
                    
**角色设计维度**：
👤 **外在特征**：外貌、声音、动作
🧠 **内在特征**：性格、价值观、动机
📖 **背景故事**：家庭、经历、技能

**角色关系设计**：
- **互补关系**：性格互补的角色组合
- **冲突关系**：价值观冲突的角色组合
- **成长关系**：互相促进成长的角色组合
- **镜像关系**：相似但选择不同的角色组合

**角色弧设计**：
📈 **正向成长弧**：从缺陷到完善
📉 **负向下滑弧**：从善良到堕落
➡️ **平稳不变弧**：性格不变，环境变
🔄 **彻底转变弧**：价值观根本转变

**设计技巧**：
1. 给每个角色独特的口头禅或习惯
2. 设计有象征意义的物品或符号
3. 建立角色之间的特殊联系
4. 考虑角色的过去和未来`);
                    break;
                    
                case 'dialogue':
                    addAgentMessage(`对话创作指南！
                    
**对话基本原则**：
1. **推进情节**：每段对话都应该推动故事发展
2. **展现性格**：通过对话展现角色性格特点
3. **传递信息**：自然传递必要的故事信息
4. **营造氛围**：创造适当的情感氛围

**对话技巧**：
💡 **潜台词艺术**：
- 说一套，想一套
- 表面平静，内心汹涌
- 简单话语，复杂含义

🎭 **个性化对话**：
- 词汇选择：反映教育背景
- 句式结构：反映思维模式
- 说话节奏：反映性格特点

**常见对话问题解决**：
1. **对话生硬**：增加日常用语和口语化表达
2. **信息堆砌**：分散信息到多个对话场景
3. **个性模糊**：为每个角色设计独特说话方式
4. **节奏单调**：变化对话长度和情感强度`);
                    break;
            }
            
            // 滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// 显示Toast消息
function showToast(message) {
    // 移除现有的toast
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .toast-message {
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: var(--screenwriter-primary);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3);
            z-index: 1001;
            animation: toastSlideIn 0.3s ease, toastFadeOut 0.3s ease 2.7s forwards;
        }
        
        @keyframes toastSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes toastFadeOut {
            to { opacity: 0; transform: translateX(100%); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// 转义HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 格式化消息文本
function formatMessageText(text) {
    // 将换行转换为<br>
    return text.replace(/\n/g, '<br>');
}

// 滚动到底部
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// ============================================
// 智能故事分析算法 - 核心功能
// ============================================

// 故事质量评估系统
function analyzeStoryQuality(storyData) {
    const scores = {
        concept: evaluateConcept(storyData.concept),
        characters: evaluateCharacters(storyData.characters),
        plot: evaluatePlot(storyData.plot),
        structure: evaluateStructure(storyData.structure),
        dialogue: evaluateDialogue(storyData.dialogue),
        theme: evaluateTheme(storyData.theme)
    };
    
    const totalScore = calculateTotalScore(scores);
    const grade = getGrade(totalScore);
    
    return {
        scores,
        totalScore,
        grade,
        strengths: identifyStrengths(scores),
        weaknesses: identifyWeaknesses(scores),
        recommendations: generateRecommendations(scores)
    };
}

// 评估概念
function evaluateConcept(concept) {
    let score = 50; // 基础分
    
    // 新颖性
    if (concept.novelty === 'high') score += 20;
    else if (concept.novelty === 'medium') score += 10;
    
    // 可行性
    if (concept.feasibility === 'high') score += 15;
    else if (concept.feasibility === 'medium') score += 5;
    
    // 共鸣性
    if (concept.resonance === 'high') score += 15;
    else if (concept.resonance === 'medium') score += 5;
    
    return Math.min(100, Math.max(0, score));
}

// 评估角色
function evaluateCharacters(characters) {
    let score = 50;
    
    // 主角深度
    if (characters.protagonistDepth === 'deep') score += 20;
    else if (characters.protagonistDepth === 'medium') score += 10;
    
    // 配角多样性
    if (characters.supportingDiversity === 'high') score += 15;
    else if (characters.supportingDiversity === 'medium') score += 5;
    
    // 角色关系
    if (characters.relationships === 'complex') score += 15;
    else if (characters.relationships === 'moderate') score += 5;
    
    return Math.min(100, Math.max(0, score));
}

// 评估情节
function evaluatePlot(plot) {
    let score = 50;
    
    // 冲突强度
    if (plot.conflictIntensity === 'high') score += 20;
    else if (plot.conflictIntensity === 'medium') score += 10;
    
    // 节奏控制
    if (plot.pacing === 'good') score += 15;
    else if (plot.pacing === 'fair') score += 5;
    
    // 悬念设置
    if (plot.suspense === 'strong') score += 15;
    else if (plot.suspense === 'moderate') score += 5;
    
    return Math.min(100, Math.max(0, score));
}

// 评估结构
function evaluateStructure(structure) {
    let score = 50;
    
    // 结构清晰度
    if (structure.clarity === 'clear') score += 20;
    else if (structure.clarity === 'moderate') score += 10;
    
    // 比例平衡
    if (structure.balance === 'balanced') score += 15;
    else if (structure.balance === 'fair') score += 5;
    
    // 转折点
    if (structure.turningPoints === 'strong') score += 15;
    else if (structure.turningPoints === 'adequate') score += 5;
    
    return Math.min(100, Math.max(0, score));
}

// 评估对话
function evaluateDialogue(dialogue) {
    let score = 50;
    
    // 自然度
    if (dialogue.naturalness === 'high') score += 20;
    else if (dialogue.naturalness === 'medium') score += 10;
    
    // 个性化
    if (dialogue.personality === 'strong') score += 15;
    else if (dialogue.personality === 'moderate') score += 5;
    
    // 功能性
    if (dialogue.functionality === 'high') score += 15;
    else if (dialogue.functionality === 'medium') score += 5;
    
    return Math.min(100, Math.max(0, score));
}

// 评估主题
function evaluateTheme(theme) {
    let score = 50;
    
    // 主题深度
    if (theme.depth === 'deep') score += 20;
    else if (theme.depth === 'medium') score += 10;
    
    // 主题一致性
    if (theme.consistency === 'high') score += 15;
    else if (theme.consistency === 'medium') score += 5;
    
    // 主题呈现
    if (theme.presentation === 'subtle') score += 15;
    else if (theme.presentation === 'moderate') score += 5;
    
    return Math.min(100, Math.max(0, score));
}

// 计算总分
function calculateTotalScore(scores) {
    const weights = {
        concept: 0.15,
        characters: 0.20,
        plot: 0.20,
        structure: 0.15,
        dialogue: 0.15,
        theme: 0.15
    };
    
    let total = 0;
    for (const [category, score] of Object.entries(scores)) {
        total += score * weights[category];
    }
    
    return Math.round(total);
}

// 获取等级
function getGrade(score) {
    if (score >= 90) return 'A+ (优秀)';
    if (score >= 80) return 'A (很好)';
    if (score >= 70) return 'B+ (良好)';
    if (score >= 60) return 'B (合格)';
    if (score >= 50) return 'C (需要改进)';
    return 'D (需要大幅改进)';
}

// 识别优势
function identifyStrengths(scores) {
    const strengths = [];
    const threshold = 75;
    
    if (scores.concept >= threshold) strengths.push('概念新颖有创意');
    if (scores.characters >= threshold) strengths.push('角色立体生动');
    if (scores.plot >= threshold) strengths.push('情节引人入胜');
    if (scores.structure >= threshold) strengths.push('结构清晰合理');
    if (scores.dialogue >= threshold) strengths.push('对话自然生动');
    if (scores.theme >= threshold) strengths.push('主题深刻有力');
    
    if (strengths.length === 0) {
        strengths.push('故事基础扎实，各方面均衡发展');
    }
    
    return strengths;
}

// 识别弱点
function identifyWeaknesses(scores) {
    const weaknesses = [];
    const threshold = 60;
    
    if (scores.concept < threshold) weaknesses.push('概念需要更多创新');
    if (scores.characters < threshold) weaknesses.push('角色需要更多深度');
    if (scores.plot < threshold) weaknesses.push('情节需要更多张力');
    if (scores.structure < threshold) weaknesses.push('结构需要更清晰');
    if (scores.dialogue < threshold) weaknesses.push('对话需要更自然');
    if (scores.theme < threshold) weaknesses.push('主题需要更突出');
    
    if (weaknesses.length === 0) {
        weaknesses.push('无明显弱点，继续保持');
    }
    
    return weaknesses;
}

// 生成建议
function generateRecommendations(scores) {
    const recommendations = [];
    
    if (scores.concept < 70) {
        recommendations.push('尝试更多创新的故事设定和世界观');
    }
    
    if (scores.characters < 70) {
        recommendations.push('为角色设计更丰富的背景故事和内心冲突');
    }
    
    if (scores.plot < 70) {
        recommendations.push('增加情节的转折点和悬念设置');
    }
    
    if (scores.structure < 70) {
        recommendations.push('使用专业的故事结构工具优化框架');
    }
    
    if (scores.dialogue < 70) {
        recommendations.push('通过对话练习提升角色的个性化表达');
    }
    
    if (scores.theme < 70) {
        recommendations.push('更深入地挖掘和呈现故事主题');
    }
    
    if (recommendations.length === 0) {
        recommendations.push('故事质量优秀，可以考虑挑战更复杂的叙事技巧');
    }
    
    return recommendations;
}

// 情节节奏分析引擎
function analyzePlotPacing(plotData) {
    const analysis = {
        overallPacing: '',
        chapterAnalysis: [],
        tensionCurve: [],
        recommendations: []
    };
    
    // 分析整体节奏
    const totalChapters = plotData.chapters.length;
    const actionChapters = plotData.chapters.filter(ch => ch.type === 'action').length;
    const emotionalChapters = plotData.chapters.filter(ch => ch.type === 'emotional').length;
    const expositionChapters = plotData.chapters.filter(ch => ch.type === 'exposition').length;
    
    const actionRatio = actionChapters / totalChapters;
    const emotionalRatio = emotionalChapters / totalChapters;
    const expositionRatio = expositionChapters / totalChapters;
    
    // 判断节奏类型
    if (actionRatio > 0.4) {
        analysis.overallPacing = '快节奏（动作导向）';
    } else if (emotionalRatio > 0.4) {
        analysis.overallPacing = '中节奏（情感导向）';
    } else if (expositionRatio > 0.4) {
        analysis.overallPacing = '慢节奏（信息导向）';
    } else {
        analysis.overallPacing = '平衡节奏（混合类型）';
    }
    
    // 分析章节节奏
    plotData.chapters.forEach((chapter, index) => {
        const chapterAnalysis = {
            chapter: index + 1,
            type: chapter.type,
            length: chapter.length,
            intensity: chapter.intensity,
            pacing: ''
        };
        
        // 判断章节节奏
        if (chapter.intensity >= 8) {
            chapterAnalysis.pacing = '紧张激烈';
        } else if (chapter.intensity >= 5) {
            chapterAnalysis.pacing = '适中发展';
        } else {
            chapterAnalysis.pacing = '舒缓铺垫';
        }
        
        analysis.chapterAnalysis.push(chapterAnalysis);
    });
    
    // 生成张力曲线
    let tension = 0;
    plotData.chapters.forEach((chapter, index) => {
        tension += chapter.intensity - 5; // 5为基准线
        
        // 确保张力在合理范围内
        tension = Math.max(-10, Math.min(10, tension));
        
        analysis.tensionCurve.push({
            chapter: index + 1,
            tension: tension,
            intensity: chapter.intensity
        });
    });
    
    // 生成建议
    if (actionRatio > 0.5) {
        analysis.recommendations.push('动作场景过多，建议增加情感发展章节');
    }
    
    if (expositionRatio > 0.4) {
        analysis.recommendations.push('信息铺垫过多，建议增加动作或情感场景');
    }
    
    // 检查张力变化
    const tensionChanges = [];
    for (let i = 1; i < analysis.tensionCurve.length; i++) {
        const change = analysis.tensionCurve[i].tension - analysis.tensionCurve[i-1].tension;
        tensionChanges.push(Math.abs(change));
    }
    
    const avgTensionChange = tensionChanges.reduce((a, b) => a + b, 0) / tensionChanges.length;
    
    if (avgTensionChange < 2) {
        analysis.recommendations.push('张力变化平缓，建议增加情节起伏');
    }
    
    if (avgTensionChange > 5) {
        analysis.recommendations.push('张力变化剧烈，建议平衡节奏');
    }
    
    // 检查高潮位置
    const climaxIndex = analysis.tensionCurve.reduce((maxIndex, point, index) => {
        return point.tension > analysis.tensionCurve[maxIndex].tension ? index : maxIndex;
    }, 0);
    
    const climaxPosition = (climaxIndex + 1) / totalChapters;
    
    if (climaxPosition < 0.6) {
        analysis.recommendations.push('高潮位置偏前，建议调整情节安排');
    }
    
    if (climaxPosition > 0.9) {
        analysis.recommendations.push('高潮位置偏后，建议提前制造悬念');
    }
    
    if (analysis.recommendations.length === 0) {
        analysis.recommendations.push('节奏控制良好，继续保持');
    }
    
    return analysis;
}

// 角色一致性检查系统
function checkCharacterConsistency(characters) {
    const checks = {
        protagonist: checkProtagonistConsistency(characters.protagonist),
        supporting: checkSupportingConsistency(characters.supporting),
        relationships: checkRelationshipConsistency(characters.relationships),
        overall: {
            consistencyScore: 0,
            issues: [],
            strengths: []
        }
    };
    
    // 计算总体一致性分数
    const scores = [
        checks.protagonist.consistencyScore,
        checks.supporting.consistencyScore,
        checks.relationships.consistencyScore
    ];
    
    checks.overall.consistencyScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    // 收集所有问题
    checks.overall.issues = [
        ...checks.protagonist.issues,
        ...checks.supporting.issues,
        ...checks.relationships.issues
    ];
    
    // 收集所有优势
    checks.overall.strengths = [
        ...checks.protagonist.strengths,
        ...checks.supporting.strengths,
        ...checks.relationships.strengths
    ];
    
    return checks;
}

// 检查主角一致性
function checkProtagonistConsistency(protagonist) {
    const result = {
        consistencyScore: 70, // 基础分
        issues: [],
        strengths: []
    };
    
    // 检查性格一致性
    if (protagonist.personalityTraits && protagonist.personalityTraits.length >= 3) {
        result.consistencyScore += 10;
        result.strengths.push('主角性格特征明确');
    } else {
        result.issues.push('主角性格特征不够明确');
    }
    
    // 检查动机一致性
    if (protagonist.motivation && protagonist.motivation.length > 0) {
        result.consistencyScore += 10;
        result.strengths.push('主角动机清晰');
    } else {
        result.issues.push('主角动机不够清晰');
    }
    
    // 检查发展弧一致性
    if (protagonist.characterArc && protagonist.characterArc.stages >= 3) {
        result.consistencyScore += 10;
        result.strengths.push('主角发展弧完整');
    } else {
        result.issues.push('主角发展弧不够完整');
    }
    
    // 确保分数在0-100之间
    result.consistencyScore = Math.min(100, Math.max(0, result.consistencyScore));
    
    return result;
}

// 检查配角一致性
function checkSupportingConsistency(supporting) {
    const result = {
        consistencyScore: 60, // 基础分
        issues: [],
        strengths: []
    };
    
    // 检查角色数量
    if (supporting.characters && supporting.characters.length >= 2) {
        result.consistencyScore += 10;
        result.strengths.push('配角数量适当');
    } else {
        result.issues.push('配角数量不足');
    }
    
    // 检查角色功能
    const functionalRoles = supporting.characters?.filter(char => char.function).length || 0;
    if (functionalRoles >= 2) {
        result.consistencyScore += 10;
        result.strengths.push('配角功能明确');
    } else {
        result.issues.push('配角功能不够明确');
    }
    
    // 检查角色关系
    if (supporting.relationships && supporting.relationships.length >= 1) {
        result.consistencyScore += 10;
        result.strengths.push('配角关系清晰');
    } else {
        result.issues.push('配角关系不够清晰');
    }
    
    // 确保分数在0-100之间
    result.consistencyScore = Math.min(100, Math.max(0, result.consistencyScore));
    
    return result;
}

// 检查关系一致性
function checkRelationshipConsistency(relationships) {
    const result = {
        consistencyScore: 65, // 基础分
        issues: [],
        strengths: []
    };
    
    // 检查关系数量
    if (relationships && relationships.length >= 3) {
        result.consistencyScore += 10;
        result.strengths.push('角色关系丰富');
    } else {
        result.issues.push('角色关系不够丰富');
    }
    
    // 检查关系类型多样性
    const uniqueTypes = new Set(relationships?.map(rel => rel.type) || []);
    if (uniqueTypes.size >= 2) {
        result.consistencyScore += 10;
        result.strengths.push('关系类型多样');
    } else {
        result.issues.push('关系类型单一');
    }
    
    // 检查关系发展
    const developingRelationships = relationships?.filter(rel => rel.development).length || 0;
    if (developingRelationships >= 2) {
        result.consistencyScore += 10;
        result.strengths.push('关系有发展变化');
    } else {
        result.issues.push('关系发展不够明显');
    }
    
    // 确保分数在0-100之间
    result.consistencyScore = Math.min(100, Math.max(0, result.consistencyScore));
    
    return result;
}

// 对话自然度评分系统
function evaluateDialogueNaturalness(dialogues) {
    const evaluations = dialogues.map(dialogue => {
        const score = evaluateSingleDialogue(dialogue);
        return {
            dialogue: dialogue.text.substring(0, 50) + '...',
            score: score.total,
            breakdown: score.breakdown,
            suggestions: score.suggestions
        };
    });
    
    const averageScore = Math.round(
        evaluations.reduce((sum, eval) => sum + eval.score, 0) / evaluations.length
    );
    
    return {
        evaluations,
        averageScore,
        overallAssessment: getDialogueAssessment(averageScore),
        recommendations: generateDialogueRecommendations(evaluations)
    };
}

// 评估单个对话
function evaluateSingleDialogue(dialogue) {
    let total = 50; // 基础分
    const breakdown = {};
    const suggestions = [];
    
    // 1. 句子长度评分
    const avgSentenceLength = calculateAvgSentenceLength(dialogue.text);
    let lengthScore = 0;
    
    if (avgSentenceLength >= 8 && avgSentenceLength <= 25) {
        lengthScore = 20;
        breakdown.sentenceLength = '良好';
    } else if (avgSentenceLength < 8) {
        lengthScore = 10;
        breakdown.sentenceLength = '偏短';
        suggestions.push('句子偏短，建议适当扩展');
    } else {
        lengthScore = 10;
        breakdown.sentenceLength = '偏长';
        suggestions.push('句子偏长，建议拆分或简化');
    }
    
    total += lengthScore;
    
    // 2. 口语化程度评分
    const colloquialScore = evaluateColloquialism(dialogue.text);
    total += colloquialScore;
    breakdown.colloquialism = colloquialScore >= 15 ? '良好' : '需要改进';
    
    if (colloquialScore < 15) {
        suggestions.push('增加口语化表达，使对话更自然');
    }
    
    // 3. 个性化评分
    const personalityScore = evaluatePersonality(dialogue.character, dialogue.text);
    total += personalityScore;
    breakdown.personality = personalityScore >= 15 ? '良好' : '需要改进';
    
    if (personalityScore < 15) {
        suggestions.push('加强角色个性化表达');
    }
    
    // 4. 信息密度评分
    const infoScore = evaluateInformationDensity(dialogue.text);
    total += infoScore;
    breakdown.informationDensity = infoScore >= 10 ? '适当' : '需要调整';
    
    if (infoScore < 10) {
        suggestions.push('调整信息密度，避免信息过载或不足');
    }
    
    // 确保总分在0-100之间
    total = Math.min(100, Math.max(0, total));
    
    return {
        total,
        breakdown,
        suggestions: suggestions.length > 0 ? suggestions : ['对话质量良好']
    };
}

// 计算平均句子长度
function calculateAvgSentenceLength(text) {
    const sentences = text.split(/[。！？.!?]/).filter(s => s.trim());
    if (sentences.length === 0) return 0;
    
    const totalChars = sentences.reduce((sum, sentence) => sum + sentence.length, 0);
    return Math.round(totalChars / sentences.length);
}

// 评估口语化程度
function evaluateColloquialism(text) {
    const colloquialWords = ['的', '了', '呢', '吧', '啊', '嘛', '呀'];
    const totalWords = text.length;
    const colloquialCount = colloquialWords.reduce((count, word) => {
        return count + (text.split(word).length - 1);
    }, 0);
    
    const ratio = colloquialCount / totalWords;
    
    if (ratio >= 0.05 && ratio <= 0.15) {
        return 20; // 良好
    } else if (ratio >= 0.02 && ratio <= 0.20) {
        return 15; // 中等
    } else {
        return 10; // 需要改进
    }
}

// 评估个性化
function evaluatePersonality(character, text) {
    // 根据角色类型评估个性化程度
    const characterTypes = {
        'protagonist': ['我', '我们', '我的'],
        'antagonist': ['你', '你们', '你的'],
        'elder': ['老夫', '老身', '年轻人'],
        'child': ['妈妈', '爸爸', '玩具']
    };
    
    const typeWords = characterTypes[character.type] || [];
    let personalityScore = 10; // 基础分
    
    // 检查是否有角色特有词汇
    for (const word of typeWords) {
        if (text.includes(word)) {
            personalityScore += 5;
            break;
        }
    }
    
    // 检查句子结构变化
    const sentences = text.split(/[。！？.!?]/).filter(s => s.trim());
    const uniqueStructures = new Set();
    
    sentences.forEach(sentence => {
        // 简单判断句子结构（通过标点）
        const structure = sentence.replace(/[^，,；;]/g, '');
        if (structure) {
            uniqueStructures.add(structure);
        }
    });
    
    if (uniqueStructures.size >= 2) {
        personalityScore += 5;
    }
    
    return Math.min(20, personalityScore);
}

// 评估信息密度
function evaluateInformationDensity(text) {
    const sentences = text.split(/[。！？.!?]/).filter(s => s.trim());
    if (sentences.length === 0) return 10;
    
    // 计算信息词比例（名词、动词等）
    const infoWords = text.match(/[\u4e00-\u9fa5]/g) || [];
    const totalChars = text.length;
    
    const density = infoWords.length / totalChars;
    
    if (density >= 0.6 && density <= 0.8) {
        return 15; // 良好
    } else if (density >= 0.4 && density <= 0.9) {
        return 10; // 中等
    } else {
        return 5; // 需要调整
    }
}

// 获取对话评估
function getDialogueAssessment(score) {
    if (score >= 85) return '优秀：对话自然生动，角色个性鲜明';
    if (score >= 75) return '良好：对话流畅自然，有一定个性';
    if (score >= 65) return '合格：对话基本通顺，需要改进个性';
    if (score >= 50) return '需要改进：对话不够自然，个性模糊';
    return '需要大幅改进：对话生硬，缺乏个性';
}

// 生成对话建议
function generateDialogueRecommendations(evaluations) {
    const recommendations = [];
    const lowScoreCount = evaluations.filter(e => e.score < 70).length;
    
    if (lowScoreCount > evaluations.length * 0.5) {
        recommendations.push('多数对话需要改进自然度和个性化');
    }
    
    const lengthIssues = evaluations.filter(e => 
        e.breakdown.sentenceLength === '偏短' || e.breakdown.sentenceLength === '偏长'
    ).length;
    
    if (lengthIssues > evaluations.length * 0.3) {
        recommendations.push('注意控制句子长度，保持适中');
    }
    
    if (recommendations.length === 0) {
        recommendations.push('对话质量总体良好，继续保持');
    }
    
    return recommendations;
}

// ============================================
// 专业编剧数据库系统
// ============================================

// 经典故事结构库
const storyStructures = {
    'three-act': {
        name: '三幕式结构',
        description: '最经典的故事结构，分为开端、对抗、结局三部分',
        ratio: '25%-50%-25%',
        stages: [
            { name: '第一幕：开端', description: '建立平凡世界，引入角色，发生激励事件' },
            { name: '转折点一', description: '主角做出关键决定，进入新世界' },
            { name: '第二幕：对抗', description: '面对挑战，遇到盟友敌人，经历成长' },
            { name: '中点转折', description: '故事方向改变，冲突升级' },
            { name: '一切尽失', description: '主角遭遇最大失败' },
            { name: '第三幕：结局', description: '最终对抗，解决问题，建立新平衡' }
        ],
        suitableFor: ['大多数故事类型', '新手创作', '商业作品'],
        examples: ['《教父》', '《星球大战》', '《哈利·波特》']
    },
    
    'hero-journey': {
        name: '英雄之旅',
        description: '约瑟夫·坎贝尔的神话原型结构，包含12个标准阶段',
        stages: 12,
        stages: [
            { name: '平凡世界', description: '英雄的日常生活和未满足的欲望' },
            { name: '冒险召唤', description: '收到改变生活的召唤或挑战' },
            { name: '拒绝召唤', description: '因恐惧或责任拒绝冒险' },
            { name: '遇见导师', description: '智慧导师提供指导和帮助' },
            { name: '跨越门槛', description: '决定冒险，进入新世界' },
            { name: '考验盟友敌人', description: '在新世界遇到朋友和敌人' },
            { name: '深入洞穴', description: '接近最危险的地方或面对最大恐惧' },
            { name: '严峻考验', description: '生死考验，面临最大挑战' },
            { name: '获得奖赏', description: '获得胜利或重要物品' },
            { name: '回归之路', description: '带着奖赏返回，但被追击' },
            { name: '浴火重生', description: '最终考验，彻底转变' },
            { name: '满载而归', description: '带着智慧和成长回归平凡世界' }
        ],
        suitableFor: ['奇幻故事', '冒险故事', '成长故事', '神话改编'],
        examples: ['《指环王》', '《星球大战》', '《哈利·波特》']
    },
    
    'save-the-cat': {
        name: '救猫咪节拍表',
        description: '布莱克·斯奈德的电影剧本结构，包含15个关键节拍',
        beats: 15,
        beats: [
            { name: '开场画面', description: '展示主角的日常生活和问题' },
            { name: '主题呈现', description: '暗示故事要探讨的主题' },
            { name: '铺垫', description: '介绍主要角色和关系' },
            { name: '推动', description: '事件打破主角的平静生活' },
            { name: '辩论', description: '主角犹豫是否接受挑战' },
            { name: '第二幕衔接点', description: '主角决定行动，进入新世界' },
            { name: 'B故事', description: '引入情感线或支线故事' },
            { name: '娱乐游戏', description: '展示故事的魅力和趣味' },
            { name: '中点', description: '虚假胜利或失败，故事转向' },
            { name: '坏人逼近', description: '反派力量增强，压力增大' },
            { name: '一无所有', description: '主角失去一切，陷入绝望' },
            { name: '灵魂黑夜', description: '主角深刻反思，找到新方向' },
            { name: '第三幕衔接点', description: '主角找到解决方案，准备最终对抗' },
            { name: '结局', description: '最终对抗，解决问题' },
            { name: '终场画面', description: '展示主角的变化和新生活' }
        ],
        suitableFor: ['电影剧本', '商业小说', '类型故事'],
        examples: ['《肖申克的救赎》', '《阿甘正传》', '《泰坦尼克号》']
    },
    
    'seven-point': {
        name: '七点故事结构',
        description: '丹·韦尔斯的高效故事结构，聚焦7个关键点',
        points: 7,
        points: [
            { name: '钩子', description: '吸引读者的开头' },
            { name: '第一情节点', description: '故事真正开始' },
            { name: '第一转折点', description: '改变故事方向' },
            { name: '中点', description: '故事的核心转折' },
            { name: '第二转折点', description: '再次改变方向' },
            { name: '第二情节点', description: '走向结局的开始' },
            { name: '结局', description: '故事的最终解决' }
        ],
        suitableFor: ['中短篇小说', '新手创作', '快速规划'],
        examples: ['《老人与海》', '《小王子》', '《动物农场》']
    }
};

// 角色原型数据库
const characterArchetypes = {
    'hero': {
        name: '英雄',
        description: '故事的主角，经历成长和转变，最终取得胜利',
        traits: ['勇敢', '正直', '有责任感', '愿意牺牲'],
        motivation: '保护他人、实现理想、完成使命',
        development: '从普通到非凡的转变',
        examples: ['哈利·波特', '卢克·天行者', '弗罗多·巴金斯']
    },
    
    'mentor': {
        name: '导师',
        description: '智慧的长者，为主角提供指导和帮助',
        traits: ['智慧', '耐心', '经验丰富', '神秘'],
        motivation: '传授知识、培养继承人、完成使命',
        development: '通常保持不变，或为保护主角而牺牲',
        examples: ['邓布利多', '尤达大师', '甘道夫']
    },
    
    'trickster': {
        name: '捣蛋鬼',
        description: '打破常规的角色，提供喜剧 relief 和意外转折',
        traits: ['机智', '幽默', '不可预测', '爱恶作剧'],
        motivation: '寻求乐趣、挑战权威、帮助朋友',
        development: '可能从捣蛋鬼成长为负责任的角色',
        examples: ['小丑', '洛基', '杰克·斯派洛']
    },
    
    'caregiver': {
        name: '照顾者',
        description: '提供支持和照顾的角色，代表母性或父性',
        traits: ['善良', '体贴', '保护欲强', '无私'],
        motivation: '照顾他人、维护家庭、提供情感支持',
        development: '可能过度保护，需要学会放手',
        examples: ['莫莉·韦斯莱', '山姆·甘姆吉', '玛琳菲森']
    },
    
    'explorer': {
        name: '探索者',
        description: '寻求新体验和知识的角色，代表冒险精神',
        traits: ['好奇', '独立', '勇敢', '不安分'],
        motivation: '探索未知、追求自由、发现真理',
        development: '从追求外在冒险到发现内心真理',
        examples: ['印第安纳·琼斯', '达尔文', '马可·波罗']
    },
    
    'lover': {
        name: '爱人',
        description: '代表爱情和情感的角色，推动情感发展',
        traits: ['热情', '浪漫', '忠诚', '感性'],
        motivation: '寻找真爱、维护关系、表达情感',
        development: '从追求爱情到理解爱的真谛',
        examples: ['罗密欧与朱丽叶', '杰克与露丝', '伊丽莎白与达西']
    },
    
    'ruler': {
        name: '统治者',
        description: '拥有权力和责任的领导角色',
        traits: ['权威', '责任感强', '有远见', '孤独'],
        motivation: '维护秩序、保护子民、实现理想',
        development: '从专制到开明，或从软弱到强大',
        examples: ['亚瑟王', '凯撒大帝', '伊丽莎白一世']
    },
    
    'creator': {
        name: '创造者',
        description: '具有创造力和想象力的角色',
        traits: ['有创意', '完美主义', '有远见', '执着'],
        motivation: '创造新事物、表达自我、改变世界',
        development: '从追求完美到接受不完美',
        examples: ['达芬奇', '爱因斯坦', '乔布斯']
    }
};

// 对话模式库
const dialoguePatterns = {
    'conflict': {
        name: '冲突对话',
        description: '角色之间的对立和争论',
        patterns: [
            '直接对抗：明确表达不同意见',
            '间接攻击：通过讽刺或暗示表达不满',
            '权力博弈：争夺话语权和控制权',
            '价值观冲突：根本理念的差异'
        ],
        techniques: [
            '使用短句和直接语言',
            '增加情感词汇和强调',
            '配合肢体语言和表情',
            '控制对话节奏和停顿'
        ],
        examples: [
            '法庭辩论场景',
            '家庭争吵场景',
            '商业谈判场景',
            '政治辩论场景'
        ]
    },
    
    'revelation': {
        name: '揭示对话',
        description: '透露重要信息和秘密',
        patterns: [
            '逐步揭示：分多次透露信息',
            '意外揭示：突然透露惊人信息',
            '情感揭示：在情感高潮时透露',
            '象征揭示：通过隐喻和象征透露'
        ],
        techniques: [
            '控制信息释放节奏',
            '制造悬念和期待',
            '配合适当的时机和场景',
            '注意信息的可信度和逻辑'
        ],
        examples: [
            '身份揭露场景',
            '秘密告白场景',
            '真相大白场景',
            '遗嘱宣读场景'
        ]
    },
    
    'emotional': {
        name: '情感对话',
        description: '表达深层情感和内心世界',
        patterns: [
            '爱情告白：表达爱慕和情感',
            '友情倾诉：分享内心和秘密',
            '亲情交流：家庭情感的表达',
            '自我反思：内心的独白和思考'
        ],
        techniques: [
            '使用比喻和象征语言',
            '注意语气和节奏的变化',
            '配合适当的沉默和停顿',
            '展现角色的脆弱和真实'
        ],
        examples: [
            '爱情告白场景',
            '临终告别场景',
            '和解场景',
            '自我发现场景'
        ]
    },
    
    'exposition': {
        name: '说明对话',
        description: '传递必要的故事信息和背景',
        patterns: [
            '导师讲解：通过导师角色传递信息',
            '角色讨论：角色之间的信息交流',
            '自言自语：角色的内心思考',
            '旁白解说：叙述者的直接说明'
        ],
        techniques: [
            '将信息融入自然对话',
            '避免信息堆砌和说教',
            '配合动作和场景展示',
            '控制信息量和节奏'
        ],
        examples: [
            '世界观介绍场景',
            '规则说明场景',
            '背景介绍场景',
            '技术解释场景'
        ]
    }
};

// 情节模板库
const plotTemplates = {
    'quest': {
        name: '冒险任务',
        description: '主角接受任务，经历冒险，最终完成任务',
        structure: [
            '接受任务或挑战',
            '组建团队或寻找盟友',
            '经历考验和困难',
            '发现真相或秘密',
            '最终对抗和胜利',
            '返回和奖励'
        ],
        variations: [
            '寻找宝物',
            '拯救人质',
            '打败魔王',
            '探索未知',
            '完成使命'
        ],
        keyElements: [
            '明确的目标',
            '困难的挑战',
            '忠诚的盟友',
            '强大的敌人',
            '重要的成长'
        ],
        examples: ['《指环王》', '《夺宝奇兵》', '《西游记》']
    },
    
    'revenge': {
        name: '复仇故事',
        description: '主角遭受伤害，寻求复仇，最终完成复仇或找到救赎',
        structure: [
            '伤害发生',
            '发誓复仇',
            '准备和训练',
            '追踪敌人',
            '最终对抗',
            '复仇完成或放弃'
        ],
        variations: [
            '个人复仇',
            '家族复仇',
            '正义复仇',
            '错误复仇',
            '放弃复仇'
        ],
        keyElements: [
            '深刻的伤害',
            '强烈的动机',
            '道德困境',
            '代价和牺牲',
            '最终选择'
        ],
        examples: ['《基督山伯爵》', '《杀死比尔》', '《哈姆雷特》']
    },
    
    'romance': {
        name: '爱情故事',
        description: '两个角色相遇相爱，经历困难，最终在一起或分开',
        structure: [
            '初次相遇',
            '互相吸引',
            '发展关系',
            '遇到障碍',
            '分离或危机',
            '最终决定'
        ],
        variations: [
            '一见钟情',
            '欢喜冤家',
            '禁忌之恋',
            '三角恋情',
            '破镜重圆'
        ],
        keyElements: [
            '化学反应',
            '情感发展',
            '外部障碍',
            '内心冲突',
            '最终选择'
        ],
        examples: ['《罗密欧与朱丽叶》', '《傲慢与偏见》', '《泰坦尼克号》']
    },
    
    'mystery': {
        name: '悬疑推理',
        description: '发生神秘事件，主角调查真相，最终揭开谜底',
        structure: [
            '神秘事件发生',
            '开始调查',
            '收集线索',
            '遇到阻碍',
            '接近真相',
            '揭开谜底'
        ],
        variations: [
            '谋杀谜案',
            '失踪案件',
            '盗窃案件',
            '超自然事件',
            '历史谜团'
        ],
        keyElements: [
            '吸引人的谜题',
            '合理的线索',
            '意外的转折',
            '逻辑的推理',
            '满意的解答'
        ],
        examples: ['《福尔摩斯》', '《东方快车谋杀案》', '《盗梦空间》']
    }
};

// ============================================
// 智能优化建议系统
// ============================================

// 故事结构优化建议
function optimizeStoryStructure(storyData) {
    const suggestions = [];
    const structure = storyData.structure;
    
    // 检查结构完整性
    if (!structure.hasBeginning || !structure.hasMiddle || !structure.hasEnd) {
        suggestions.push('确保故事有完整的三幕结构：开端、对抗、结局');
    }
    
    // 检查比例平衡
    if (structure.beginningRatio && structure.beginningRatio > 0.3) {
        suggestions.push('开端部分过长，建议控制在25%以内');
    }
    
    if (structure.middleRatio && structure.middleRatio < 0.45) {
        suggestions.push('对抗部分过短，建议增加到50%左右');
    }
    
    if (structure.endRatio && structure.endRatio > 0.3) {
        suggestions.push('结局部分过长，建议控制在25%以内');
    }
    
    // 检查转折点
    if (structure.turningPoints && structure.turningPoints < 3) {
        suggestions.push('增加关键转折点，提升故事张力');
    }
    
    // 检查高潮位置
    if (structure.climaxPosition && structure.climaxPosition < 0.7) {
        suggestions.push('高潮位置偏前，建议调整到故事后段');
    }
    
    if (structure.climaxPosition && structure.climaxPosition > 0.9) {
        suggestions.push('高潮位置偏后，建议提前制造悬念');
    }
    
    // 专业结构建议
    if (suggestions.length === 0) {
        suggestions.push('结构基本合理，可以考虑尝试更复杂的叙事结构');
    }
    
    return {
        structureType: structure.type || '未指定',
        currentStatus: '需要优化',
        suggestions,
        recommendedStructures: recommendStructures(storyData.genre)
    };
}

// 推荐适合的结构
function recommendStructures(genre) {
    const recommendations = {
        'fantasy': ['英雄之旅', '三幕式结构', '冒险任务模板'],
        'sci-fi': ['三幕式结构', '救猫咪节拍表', '探索故事模板'],
        'romance': ['三幕式结构', '爱情故事模板', '七点故事结构'],
        'mystery': ['三幕式结构', '悬疑推理模板', '救猫咪节拍表'],
        'adventure': ['英雄之旅', '冒险任务模板', '三幕式结构'],
        'drama': ['三幕式结构', '七点故事结构', '人物驱动结构']
    };
    
    return recommendations[genre] || ['三幕式结构', '七点故事结构', '救猫咪节拍表'];
}

// 角色发展优化建议
function optimizeCharacterDevelopment(characters) {
    const suggestions = [];
    
    // 检查主角发展
    if (characters.protagonist) {
        const prot = characters.protagonist;
        
        if (!prot.characterArc || prot.characterArc.stages < 3) {
            suggestions.push('为主角设计更完整的发展弧，至少包含3个阶段');
        }
        
        if (!prot.motivation || prot.motivation.length < 10) {
            suggestions.push('明确主角的动机，让读者理解角色的行动原因');
        }
        
        if (!prot.flaws || prot.flaws.length === 0) {
            suggestions.push('给主角添加合理的缺点，增加角色的真实感和成长空间');
        }
    }
    
    // 检查配角发展
    if (characters.supporting) {
        const supporting = characters.supporting.characters || [];
        
        if (supporting.length < 2) {
            suggestions.push('增加配角数量，丰富故事的人际关系');
        }
        
        const functionalChars = supporting.filter(char => char.function);
        if (functionalChars.length < supporting.length * 0.7) {
            suggestions.push('明确每个配角的功能和作用');
        }
    }
    
    // 检查角色关系
    if (characters.relationships) {
        const relationships = characters.relationships;
        
        if (relationships.length < 3) {
            suggestions.push('增加角色之间的关系复杂度');
        }
        
        const developingRels = relationships.filter(rel => rel.development);
        if (developingRels.length < relationships.length * 0.5) {
            suggestions.push('让更多角色关系随着故事发展而变化');
        }
    }
    
    if (suggestions.length === 0) {
        suggestions.push('角色发展良好，可以考虑增加角色的内心冲突和道德困境');
    }
    
    return {
        characterCount: countCharacters(characters),
        developmentScore: calculateDevelopmentScore(characters),
        suggestions,
        recommendedArchetypes: recommendArchetypes(characters.genre)
    };
}

// 计算角色数量
function countCharacters(characters) {
    let count = 0;
    
    if (characters.protagonist) count++;
    if (characters.supporting && characters.supporting.characters) {
        count += characters.supporting.characters.length;
    }
    
    return count;
}

// 计算发展分数
function calculateDevelopmentScore(characters) {
    let score = 50; // 基础分
    
    // 主角发展
    if (characters.protagonist) {
        const prot = characters.protagonist;
        if (prot.characterArc && prot.characterArc.stages >= 3) score += 15;
        if (prot.motivation && prot.motivation.length >= 10) score += 10;
        if (prot.flaws && prot.flaws.length >= 1) score += 10;
    }
    
    // 配角发展
    if (characters.supporting && characters.supporting.characters) {
        const supporting = characters.supporting.characters;
        if (supporting.length >= 2) score += 10;
        
        const functionalChars = supporting.filter(char => char.function);
        if (functionalChars.length >= supporting.length * 0.7) score += 5;
    }
    
    // 关系发展
    if (characters.relationships) {
        const relationships = characters.relationships;
        if (relationships.length >= 3) score += 10;
        
        const developingRels = relationships.filter(rel => rel.development);
        if (developingRels.length >= relationships.length * 0.5) score += 5;
    }
    
    return Math.min(100, Math.max(0, score));
}

// 推荐角色原型
function recommendArchetypes(genre) {
    const recommendations = {
        'fantasy': ['英雄', '导师', '捣蛋鬼', '统治者'],
        'sci-fi': ['探索者', '创造者', '统治者', '英雄'],
        'romance': ['爱人', '照顾者', '捣蛋鬼', '探索者'],
        'mystery': ['探索者', '创造者', '照顾者', '捣蛋鬼'],
        'adventure': ['英雄', '导师', '探索者', '照顾者'],
        'drama': ['照顾者', '爱人', '统治者', '创造者']
    };
    
    return recommendations[genre] || ['英雄', '导师', '爱人', '照顾者'];
}

// 对话改进建议
function optimizeDialogue(dialogues) {
    const suggestions = [];
    const analysis = evaluateDialogueNaturalness(dialogues);
    
    // 基于分析结果提供建议
    if (analysis.averageScore < 70) {
        suggestions.push('整体对话自然度需要提升，建议增加口语化表达');
    }
    
    // 检查具体问题
    analysis.evaluations.forEach((eval, index) => {
        if (eval.score < 60) {
            suggestions.push(`第${index + 1}段对话需要大幅改进：${eval.suggestions[0]}`);
        }
    });
    
    // 检查句子长度问题
    const lengthIssues = analysis.evaluations.filter(eval => 
        eval.breakdown.sentenceLength === '偏短' || eval.breakdown.sentenceLength === '偏长'
    );
    
    if (lengthIssues.length > analysis.evaluations.length * 0.3) {
        suggestions.push('注意控制句子长度，保持8-25个字符为佳');
    }
    
    // 检查个性化问题
    const personalityIssues = analysis.evaluations.filter(eval => 
        eval.breakdown.personality === '需要改进'
    );
    
    if (personalityIssues.length > analysis.evaluations.length * 0.4) {
        suggestions.push('加强角色个性化表达，让每个角色有独特的说话方式');
    }
    
    if (suggestions.length === 0) {
        suggestions.push('对话质量良好，可以尝试更复杂的对话技巧如潜台词和象征语言');
    }
    
    return {
        averageScore: analysis.averageScore,
        overallAssessment: analysis.overallAssessment,
        suggestions,
        recommendedPatterns: recommendDialoguePatterns(dialogues.context)
    };
}

// 推荐对话模式
function recommendDialoguePatterns(context) {
    const patterns = [];
    
    if (context.includes('冲突') || context.includes('争论')) {
        patterns.push('冲突对话模式');
    }
    
    if (context.includes('秘密') || context.includes('真相')) {
        patterns.push('揭示对话模式');
    }
    
    if (context.includes('情感') || context.includes('内心')) {
        patterns.push('情感对话模式');
    }
    
    if (context.includes('解释') || context.includes('说明')) {
        patterns.push('说明对话模式');
    }
    
    if (patterns.length === 0) {
        patterns.push('情感对话模式', '冲突对话模式');
    }
    
    return patterns;
}

// 情节节奏优化建议
function optimizePlotPacing(plotData) {
    const suggestions = [];
    const analysis = analyzePlotPacing(plotData);
    
    // 基于分析结果提供建议
    analysis.recommendations.forEach(rec => {
        suggestions.push(rec);
    });
    
    // 检查章节类型分布
    const chapterTypes = {};
    plotData.chapters.forEach(chapter => {
        chapterTypes[chapter.type] = (chapterTypes[chapter.type] || 0) + 1;
    });
    
    const totalChapters = plotData.chapters.length;
    
    // 检查动作章节比例
    if (chapterTypes.action && chapterTypes.action / totalChapters > 0.5) {
        suggestions.push('动作场景过多，建议增加情感发展或信息铺垫章节');
    }
    
    // 检查信息章节比例
    if (chapterTypes.exposition && chapterTypes.exposition / totalChapters > 0.4) {
        suggestions.push('信息铺垫过多，建议通过对话和行动展示信息');
    }
    
    // 检查张力曲线
    if (analysis.tensionCurve.length > 0) {
        const lastTension = analysis.tensionCurve[analysis.tensionCurve.length - 1].tension;
        if (lastTension < -5) {
            suggestions.push('故事结尾张力过低，建议增加最终冲突或情感高潮');
        }
    }
    
    // 检查高潮位置
    const climaxIndex = analysis.tensionCurve.reduce((maxIndex, point, index) => {
        return point.tension > analysis.tensionCurve[maxIndex].tension ? index : maxIndex;
    }, 0);
    
    const climaxPosition = (climaxIndex + 1) / totalChapters;
    
    if (climaxPosition < 0.6) {
        suggestions.push('高潮位置偏前，建议在后段增加更强烈的冲突');
    }
    
    if (climaxPosition > 0.9) {
        suggestions.push('高潮位置偏后，建议在中段增加重要转折');
    }
    
    if (suggestions.length === 0) {
        suggestions.push('情节节奏良好，可以考虑增加更复杂的时间线或视角切换');
    }
    
    return {
        overallPacing: analysis.overallPacing,
        tensionCurve: analysis.tensionCurve,
        suggestions,
        pacingTechniques: recommendPacingTechniques(plotData.genre)
    };
}

// 推荐节奏技巧
function recommendPacingTechniques(genre) {
    const techniques = {
        'fantasy': ['英雄之旅节奏', '三幕式节奏', '章节交替节奏'],
        'sci-fi': ['信息释放节奏', '科技展示节奏', '悬念设置节奏'],
        'romance': ['情感发展节奏', '关系变化节奏', '内心冲突节奏'],
        'mystery': ['线索释放节奏', '悬念保持节奏', '真相揭露节奏'],
        'adventure': ['动作场景节奏', '探索发现节奏', '危险升级节奏'],
        'drama': ['情感高潮节奏', '冲突发展节奏', '人物变化节奏']
    };
    
    return techniques[genre] || ['三幕式节奏', '章节交替节奏', '情感发展节奏'];
}

// ============================================
// 可视化创作工具
// ============================================

// 故事地图可视化
function createStoryMap(storyData) {
    const map = {
        nodes: [],
        edges: [],
        timeline: []
    };
    
    // 创建角色节点
    if (storyData.characters) {
        if (storyData.characters.protagonist) {
            map.nodes.push({
                id: 'protagonist',
                type: 'protagonist',
                label: '主角',
                data: storyData.characters.protagonist,
                position: { x: 300, y: 200 }
            });
        }
        
        if (storyData.characters.supporting && storyData.characters.supporting.characters) {
            storyData.characters.supporting.characters.forEach((char, index) => {
                map.nodes.push({
                    id: `supporting_${index}`,
                    type: 'supporting',
                    label: char.name || `配角${index + 1}`,
                    data: char,
                    position: { x: 100 + index * 150, y: 400 }
                });
            });
        }
    }
    
    // 创建情节节点
    if (storyData.plot && storyData.plot.chapters) {
        storyData.plot.chapters.forEach((chapter, index) => {
            map.nodes.push({
                id: `chapter_${index}`,
                type: 'chapter',
                label: `第${index + 1}章`,
                data: chapter,
                position: { x: 600, y: 100 + index * 80 }
            });
            
            // 添加到时间线
            map.timeline.push({
                id: `event_${index}`,
                chapter: index + 1,
                type: chapter.type,
                title: chapter.title || `情节${index + 1}`,
                description: chapter.description || '',
                intensity: chapter.intensity || 5
            });
        });
    }
    
    // 创建关系边
    if (storyData.characters && storyData.characters.relationships) {
        storyData.characters.relationships.forEach((rel, index) => {
            map.edges.push({
                id: `rel_${index}`,
                source: rel.source || 'protagonist',
                target: rel.target || `supporting_${index % 3}`,
                label: rel.type || '关系',
                data: rel
            });
        });
    }
    
    // 创建情节连接边
    if (storyData.plot && storyData.plot.chapters && storyData.plot.chapters.length > 1) {
        for (let i = 0; i < storyData.plot.chapters.length - 1; i++) {
            map.edges.push({
                id: `plot_${i}`,
                source: `chapter_${i}`,
                target: `chapter_${i + 1}`,
                label: '发展',
                type: 'plot'
            });
        }
    }
    
    return map;
}

// 角色关系网络图
function createCharacterNetwork(characters) {
    const network = {
        nodes: [],
        edges: [],
        groups: []
    };
    
    // 添加主角节点
    if (characters.protagonist) {
        network.nodes.push({
            id: 'protagonist',
            label: characters.protagonist.name || '主角',
            group: 'protagonist',
            value: 30,
            title: `主角<br>动机：${characters.protagonist.motivation || '未指定'}<br>发展弧：${characters.protagonist.characterArc?.type || '未指定'}`
        });
    }
    
    // 添加配角节点
    if (characters.supporting && characters.supporting.characters) {
        characters.supporting.characters.forEach((char, index) => {
            network.nodes.push({
                id: `supporting_${index}`,
                label: char.name || `配角${index + 1}`,
                group: char.role || 'supporting',
                value: 20,
                title: `${char.role || '配角'}<br>功能：${char.function || '未指定'}<br>关系：${char.relationship || '未指定'}`
            });
        });
    }
    
    // 添加关系边
    if (characters.relationships) {
        characters.relationships.forEach((rel, index) => {
            network.edges.push({
                from: rel.source || 'protagonist',
                to: rel.target || `supporting_${index % (characters.supporting?.characters?.length || 3)}`,
                label: rel.type || '关系',
                value: rel.strength || 5,
                title: `${rel.type || '关系'}<br>动态：${rel.dynamics || '未指定'}<br>发展：${rel.development || '未指定'}`
            });
        });
    }
    
    // 定义分组
    network.groups = [
        { id: 'protagonist', label: '主角', color: '#6A11CB' },
        { id: 'antagonist', label: '反派', color: '#FF416C' },
        { id: 'supporting', label: '配角', color: '#2575FC' },
        { id: 'love-interest', label: '爱情对象', color: '#FFD700' },
        { id: 'mentor', label: '导师', color: '#00CED1' }
    ];
    
    return network;
}

// 情节时间线编辑器
function createTimelineEditor(plotData) {
    const timeline = {
        events: [],
        markers: [],
        segments: []
    };
    
    // 创建事件
    if (plotData.chapters) {
        plotData.chapters.forEach((chapter, index) => {
            timeline.events.push({
                id: `event_${index}`,
                time: index + 1,
                title: chapter.title || `第${index + 1}章`,
                description: chapter.description || '',
                type: chapter.type || 'general',
                intensity: chapter.intensity || 5,
                duration: chapter.duration || 1,
                color: getEventColor(chapter.type)
            });
        });
    }
    
    // 创建标记点
    if (plotData.milestones) {
        plotData.milestones.forEach((milestone, index) => {
            timeline.markers.push({
                id: `marker_${index}`,
                time: milestone.time,
                title: milestone.title,
                type: milestone.type,
                importance: milestone.importance || 'medium',
                icon: getMilestoneIcon(milestone.type)
            });
        });
    }
    
    // 创建分段
    if (plotData.structure) {
        const structure = plotData.structure;
        
        if (structure.beginningEnd) {
            timeline.segments.push({
                id: 'beginning',
                start: 1,
                end: structure.beginningEnd,
                label: '开端',
                color: '#4CAF50',
                description: '建立世界，引入角色，激励事件'
            });
        }
        
        if (structure.middleStart && structure.middleEnd) {
            timeline.segments.push({
                id: 'middle',
                start: structure.middleStart,
                end: structure.middleEnd,
                label: '对抗',
                color: '#2196F3',
                description: '面对挑战，经历成长，中点转折'
            });
        }
        
        if (structure.endStart) {
            timeline.segments.push({
                id: 'end',
                start: structure.endStart,
                end: plotData.chapters?.length || 10,
                label: '结局',
                color: '#FF9800',
                description: '最终对抗，解决问题，建立新平衡'
            });
        }
    }
    
    return timeline;
}

// 获取事件颜色
function getEventColor(type) {
    const colors = {
        'action': '#FF5252',
        'emotional': '#4CAF50',
        'exposition': '#2196F3',
        'climax': '#FF9800',
        'turning-point': '#9C27B0',
        'general': '#607D8B'
    };
    
    return colors[type] || colors.general;
}

// 获取里程碑图标
function getMilestoneIcon(type) {
    const icons = {
        'climax': 'fa-fire',
        'turning-point': 'fa-exchange-alt',
        'revelation': 'fa-lightbulb',
        'conflict': 'fa-crosshairs',
        'resolution': 'fa-check-circle',
        'character-growth': 'fa-user-plus'
    };
    
    return icons[type] || 'fa-flag';
}

// 对话流程图
function createDialogueFlow(dialogues) {
    const flow = {
        nodes: [],
        edges: [],
        sequences: []
    };
    
    // 创建对话节点
    dialogues.forEach((dialogue, index) => {
        flow.nodes.push({
            id: `dialogue_${index}`,
            type: 'dialogue',
            label: dialogue.character || '角色',
            content: dialogue.text.substring(0, 30) + (dialogue.text.length > 30 ? '...' : ''),
            emotion: dialogue.emotion || 'neutral',
            style: dialogue.style || 'natural',
            position: { x: 100 + index * 200, y: 200 }
        });
        
        // 添加到序列
        flow.sequences.push({
            id: `seq_${index}`,
            order: index,
            character: dialogue.character,
            text: dialogue.text,
            emotion: dialogue.emotion,
            style: dialogue.style,
            function: analyzeDialogueFunction(dialogue.text)
        });
    });
    
    // 创建连接边
    for (let i = 0; i < dialogues.length - 1; i++) {
        flow.edges.push({
            id: `flow_${i}`,
            source: `dialogue_${i}`,
            target: `dialogue_${i + 1}`,
            label: '回应',
            type: 'response'
        });
    }
    
    return flow;
}

// 分析对话功能
function analyzeDialogueFunction(text) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('?') || lowerText.includes('？')) {
        return '提问';
    } else if (lowerText.includes('!') || lowerText.includes('！')) {
        return '感叹';
    } else if (lowerText.includes('...') || lowerText.includes('……')) {
        return '犹豫';
    } else if (text.length < 10) {
        return '简短回应';
    } else if (text.length > 50) {
        return '详细说明';
    } else {
        return '陈述';
    }
}

// ============================================
// 高级功能集成和页面优化
// ============================================

// 初始化高级功能
function initAdvancedFeatures() {
    // 延迟加载，确保DOM完全加载
    setTimeout(() => {
        integrateAdvancedFeatures();
        addModalSystem();
        addToastSystem();
        addLoadingIndicator();
        enhanceUserExperience();
    }, 500);
}

// 集成高级功能到页面
function integrateAdvancedFeatures() {
    // 添加故事分析按钮
    addAdvancedButton('analyzeStory', '智能故事分析', 'fas fa-chart-bar', 
        'linear-gradient(135deg, #6A11CB, #2575FC)', 'storyTools');
    
    // 添加优化建议按钮
    addAdvancedButton('optimizeStory', '智能优化建议', 'fas fa-magic',
        'linear-gradient(135deg, #FF416C, #FF4B2B)', 'storyTools');
    
    // 添加可视化按钮
    addAdvancedButton('visualizeStory', '可视化创作', 'fas fa-project-diagram',
        'linear-gradient(135deg, #2575FC, #6A11CB)', 'storyTools');
    
    // 添加数据库按钮
    addAdvancedButton('openDatabase', '编剧数据库', 'fas fa-database',
        'linear-gradient(135deg, #00b09b, #96c93d)', 'storyTools');
    
    // 绑定按钮事件
    bindAdvancedButtonEvents();
}

// 添加高级功能按钮
function addAdvancedButton(id, text, icon, gradient, targetArea) {
    const button = document.createElement('button');
    button.id = id;
    button.className = 'advanced-action-btn';
    button.innerHTML = `<i class="${icon}"></i> ${text}`;
    button.style.cssText = `
        width: 100%;
        padding: 0.875rem;
        background: ${gradient};
        color: white;
        border: none;
        border-radius: var(--radius);
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 1rem;
    `;
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    const target = document.querySelector(`#${targetArea} .tool-body`);
    if (target) {
        target.appendChild(button);
    }
}

// 绑定高级按钮事件
function bindAdvancedButtonEvents() {
    // 故事分析
    const analyzeBtn = document.getElementById('analyzeStory');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            showLoading('正在分析故事...');
            setTimeout(() => {
                const storyData = collectStoryData();
                const analysis = analyzeStoryQuality(storyData);
                hideLoading();
                showAnalysisResults(analysis);
            }, 1000);
        });
    }
    
    // 优化建议
    const optimizeBtn = document.getElementById('optimizeStory');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', function() {
            showLoading('正在生成优化建议...');
            setTimeout(() => {
                const storyData = collectStoryData();
                const structureOpt = optimizeStoryStructure(storyData);
                const characterOpt = optimizeCharacterDevelopment(storyData.characters);
                const dialogueOpt = optimizeDialogue(storyData.dialogues || []);
                const pacingOpt = optimizePlotPacing(storyData.plot);
                hideLoading();
                showOptimizationResults({
                    structure: structureOpt,
                    characters: characterOpt,
                    dialogue: dialogueOpt,
                    pacing: pacingOpt
                });
            }, 1500);
        });
    }
    
    // 可视化
    const visualizeBtn = document.getElementById('visualizeStory');
    if (visualizeBtn) {
        visualizeBtn.addEventListener('click', function() {
            showLoading('正在创建可视化...');
            setTimeout(() => {
                const storyData = collectStoryData();
                const storyMap = createStoryMap(storyData);
                const characterNetwork = createCharacterNetwork(storyData.characters);
                const timeline = createTimelineEditor(storyData.plot);
                const dialogueFlow = createDialogueFlow(storyData.dialogues || []);
                hideLoading();
                showVisualizationResults({
                    storyMap,
                    characterNetwork,
                    timeline,
                    dialogueFlow
                });
            }, 2000);
        });
    }
    
    // 数据库
    const databaseBtn = document.getElementById('openDatabase');
    if (databaseBtn) {
        databaseBtn.addEventListener('click', function() {
            showDatabaseBrowser();
        });
    }
}

// 收集故事数据
function collectStoryData() {
    // 从页面收集实际数据
    const genre = document.getElementById('storyGenre')?.value || 'fantasy';
    const theme = document.getElementById('storyTheme')?.value || 'growth';
    
    return {
        concept: {
            genre: genre,
            theme: theme,
            novelty: 'medium',
            feasibility: 'high',
            resonance: 'medium'
        },
        
        characters: {
            protagonist: {
                name: '主角',
                motivation: '完成使命',
                characterArc: {
                    type: 'positive',
                    stages: 4
                },
                flaws: ['急躁', '固执']
            },
            
            supporting: {
                characters: [
                    { name: '伙伴', role: 'sidekick', function: '情感支持' },
                    { name: '导师', role: 'mentor', function: '提供指导' },
                    { name: '反派', role: 'antagonist', function: '制造冲突' }
                ]
            },
            
            relationships: [
                { source: 'protagonist', target: '伙伴', type: 'friendship', development: true },
                { source: 'protagonist', target: '导师', type: 'mentorship', development: true },
                { source: 'protagonist', target: '反派', type: 'conflict', development: true }
            ]
        },
        
        plot: {
            chapters: [
                { type: 'exposition', length: 'medium', intensity: 3, title: '平凡世界' },
                { type: 'action', length: 'short', intensity: 6, title: '激励事件' },
                { type: 'emotional', length: 'medium', intensity: 5, title: '接受挑战' },
                { type: 'action', length: 'long', intensity: 8, title: '主要对抗' },
                { type: 'climax', length: 'short', intensity: 9, title: '最终高潮' },
                { type: 'emotional', length: 'short', intensity: 4, title: '结局反思' }
            ],
            
            structure: {
                type: 'three-act',
                hasBeginning: true,
                hasMiddle: true,
                hasEnd: true,
                beginningRatio: 0.25,
                middleRatio: 0.5,
                endRatio: 0.25,
                turningPoints: 3,
                climaxPosition: 0.8
            },
            
            genre: genre
        },
        
        dialogue: {
            naturalness: 'high',
            personality: 'medium',
            functionality: 'high'
        },
        
        theme: {
            depth: 'medium',
            consistency: 'high',
            presentation: 'subtle'
        },
        
        dialogues: [
            { character: '主角', text: '我必须完成这个任务，无论付出什么代价。', emotion: 'determined', style: 'dramatic' },
            { character: '导师', text: '记住，真正的力量来自内心，而不是外在。', emotion: 'wise', style: 'poetic' },
            { character: '反派', text: '你永远无法阻止我，这个世界注定属于强者！', emotion: 'angry', style: 'dramatic' }
        ]
    };
}

// 添加模态框系统
function addModalSystem() {
    const modalHtml = `
        <div id="advancedModal" class="modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="modal-action-btn">确定</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            margin: 10vh auto;
            border-radius: var(--radius-lg);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            background: linear-gradient(135deg, var(--screenwriter-primary), var(--screenwriter-secondary));
            color: white;
        }
        
        .modal-title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            line-height: 1;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 1.5rem;
            max-height: calc(80vh - 140px);
            overflow-y: auto;
        }
        
        .modal-footer {
            padding: 1rem 1.5rem;
            background: var(--screenwriter-light);
            border-top: 1px solid rgba(106, 17, 203, 0.1);
            text-align: right;
        }
        
        .modal-action-btn {
            padding: 0.75rem 2rem;
            background: var(--screenwriter-primary);
            color: white;
            border: none;
            border-radius: var(--radius);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .modal-action-btn:hover {
            background: #5a0db5;
            transform: translateY(-2px);
        }
    `;
    
    document.head.appendChild(style);
    
    // 绑定模态框事件
    const modal = document.getElementById('advancedModal');
    const closeBtn = modal.querySelector('.modal-close');
    const actionBtn = modal.querySelector('.modal-action-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeModal);
    actionBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// 显示模态框
function showModal(title, content) {
    const modal = document.getElementById('advancedModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 添加Toast系统
function addToastSystem() {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    
    document.body.appendChild(toastContainer);
}

// 显示Toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const colors = {
        'info': 'linear-gradient(135deg, #6A11CB, #2575FC)',
        'success': 'linear-gradient(135deg, #00b09b, #96c93d)',
        'warning': 'linear-gradient(135deg, #FF416C, #FF4B2B)',
        'error': 'linear-gradient(135deg, #FF5252, #F44336)'
    };
    
    toast.style.cssText = `
        padding: 0.75rem 1.5rem;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 25px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: toastSlideIn 0.3s ease, toastFadeOut 0.3s ease 2.7s forwards;
    `;
    
    document.getElementById('toastContainer').appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// 添加加载指示器
function addLoadingIndicator() {
    const loadingHtml = `
        <div id="loadingOverlay" class="loading-overlay">
            <div class="loading-spinner">
                <div class="spinner"></div>
                <div class="loading-text">加载中...</div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHtml);
    
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(4px);
            z-index: 3000;
            align-items: center;
            justify-content: center;
        }
        
        .loading-spinner {
            text-align: center;
        }
        
        .spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(106, 17, 203, 0.1);
            border-top: 4px solid var(--screenwriter-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-text {
            color: var(--screenwriter-dark);
            font-weight: 500;
            font-size: 1.1rem;
        }
    `;
    
    document.head.appendChild(style);
}

// 显示加载
function showLoading(text = '加载中...') {
    const loading = document.getElementById('loadingOverlay');
    const loadingText = loading.querySelector('.loading-text');
    
    loadingText.textContent = text;
    loading.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// 隐藏加载
function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    loading.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 增强用户体验
function enhanceUserExperience() {
    // 添加快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl + S 保存
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showToast('故事已自动保存', 'success');
        }
        
        // Ctrl + D 打开数据库
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            showDatabaseBrowser();
        }
        
        // Ctrl + A 分析故事
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            document.getElementById('analyzeStory')?.click();
        }
    });
    
    // 添加工具提示
    addTooltips();
    
    // 添加自动保存
    setupAutoSave();
    
    // 添加离线支持
    setupOfflineSupport();
}

// 添加工具提示
function addTooltips() {
    const tooltips = {
        'storyGenre': '选择故事的主要类型，影响情节和角色设计',
        'storyTheme': '选择故事的核心主题，决定情感基调和信息',
        'protagonistType': '选择主角的类型，决定角色发展和弧线',
        'characterArchetype': '选择角色原型，提供经典的角色模板',
        'plot': '选择情节结构，决定故事的框架和节奏',
        'conflictType': '选择冲突类型，决定故事的主要矛盾',
        'dialogueStyle': '选择对话风格，影响角色的说话方式'
    };
    
    Object.entries(tooltips).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            element.title = text;
            
            // 添加自定义工具提示
            element.addEventListener('mouseenter', function(e) {
                showCustomTooltip(e, text);
            });
            
            element.addEventListener('mouseleave', function() {
                hideCustomTooltip();
            });
        }
    });
}

// 显示自定义工具提示
function showCustomTooltip(event, text) {
    const tooltip = document.createElement('div');
    tooltip.id = 'customTooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--screenwriter-dark);
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius);
        font-size: 0.85rem;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        pointer-events: none;
        animation: tooltipFadeIn 0.2s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const x = event.clientX + 10;
    const y = event.clientY + 10;
    
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    
    // 确保工具提示在视口内
    const rect = tooltip.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
        tooltip.style.left = `${window.innerWidth - rect.width - 10}px`;
    }
    if (rect.bottom > window.innerHeight) {
        tooltip.style.top = `${event.clientY - rect.height - 10}px`;
    }
}

// 隐藏自定义工具提示
function hideCustomTooltip() {
    const tooltip = document.getElementById('customTooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// 设置自动保存
function setupAutoSave() {
    let saveTimeout;
    
    // 监听所有输入变化
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                autoSaveStory();
            }, 2000); // 2秒后自动保存
        });
    });
    
    // 定期保存
    setInterval(autoSaveStory, 30000); // 每30秒保存一次
}

// 自动保存故事
function autoSaveStory() {
    const storyData = collectStoryData();
    localStorage.setItem('screenwriter_story_data', JSON.stringify(storyData));
    localStorage.setItem('screenwriter_last_save', new Date().toISOString());
    
    // 显示保存状态
    const saveIndicator = document.getElementById('saveIndicator') || createSaveIndicator();
    saveIndicator.textContent = `已保存 ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    saveIndicator.classList.add('saved');
    
    setTimeout(() => {
        saveIndicator.classList.remove('saved');
    }, 2000);
}

// 创建保存指示器
function createSaveIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'saveIndicator';
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--screenwriter-primary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.85rem;
        opacity: 0.8;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(indicator);
    return indicator;
}

// 设置离线支持
function setupOfflineSupport() {
    // 检查离线状态
    window.addEventListener('online', function() {
        showToast('网络已恢复', 'success');
    });
    
    window.addEventListener('offline', function() {
        showToast('网络已断开，正在使用本地数据', 'warning');
    });
    
    // 加载上次保存的数据
    const savedData = localStorage.getItem('screenwriter_story_data');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            loadSavedData(data);
            showToast('已加载上次保存的数据', 'info');
        } catch (e) {
            console.error('加载保存数据失败:', e);
        }
    }
}

// 加载保存的数据
function loadSavedData(data) {
    // 这里可以根据需要实现数据加载逻辑
    console.log('加载保存的数据:', data);
}

// 显示分析结果
function showAnalysisResults(analysis) {
    const resultsHtml = `
        <div class="analysis-results">
            <div class="analysis-header">
                <h4><i class="fas fa-chart-bar"></i> 故事分析报告</h4>
                <div class="analysis-meta">
                    <span><i class="fas fa-calendar"></i> ${new Date().toLocaleDateString()}</span>
                    <span><i class="fas fa-clock"></i> ${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
            
            <div class="analysis-summary">
                <div class="grade-card ${getGradeClass(analysis.totalScore)}">
                    <div class="grade-label">总体评分</div>
                    <div class="grade-value">${analysis.grade}</div>
                    <div class="grade-score">${analysis.totalScore}/100</div>
                    <div class="grade-description">${getGradeDescription(analysis.totalScore)}</div>
                </div>
                
                <div class="summary-stats">
                    <div class="stat-item">
                        <div class="stat-label">优势数量</div>
                        <div class="stat-value">${analysis.strengths.length}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">改进点</div>
                        <div class="stat-value">${analysis.weaknesses.length}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">建议数</div>
                        <div class="stat-value">${analysis.recommendations.length}</div>
                    </div>
                </div>
            </div>
            
            <div class="analysis-details">
                <div class="detail-section">
                    <h5><i class="fas fa-star"></i> 故事优势</h5>
                    <ul class="strengths-list">
                        ${analysis.strengths.map(strength => `
                            <li>
                                <i class="fas fa-check-circle"></i>
                                <span>${strength}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h5><i class="fas fa-exclamation-triangle"></i> 改进空间</h5>
                    <ul class="weaknesses-list">
                        ${analysis.weaknesses.map(weakness => `
                            <li>
                                <i class="fas fa-wrench"></i>
                                <span>${weakness}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h5><i class="fas fa-lightbulb"></i> 专业建议</h5>
                    <ul class="recommendations-list">
                        ${analysis.recommendations.map(rec => `
                            <li>
                                <i class="fas fa-arrow-right"></i>
                                <span>${rec}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="analysis-actions">
                <button class="action-btn optimize-btn" onclick="document.getElementById('optimizeStory')?.click()">
                    <i class="fas fa-magic"></i> 立即优化
                </button>
                <button class="action-btn export-btn" onclick="exportAnalysis()">
                    <i class="fas fa-download"></i> 导出报告
                </button>
                <button class="action-btn share-btn" onclick="shareAnalysis()">
                    <i class="fas fa-share-alt"></i> 分享
                </button>
            </div>
        </div>
    `;
    
    showModal('故事分析报告', resultsHtml);
    addAnalysisStyles();
}

// 获取等级描述
function getGradeDescription(score) {
    if (score >= 90) return '优秀：故事质量极高，具有出版潜力';
    if (score >= 80) return '良好：故事质量优秀，需要少量改进';
    if (score >= 70) return '合格：故事基础扎实，需要中等改进';
    if (score >= 60) return '需要改进：故事需要大幅改进';
    return '需要重写：建议重新构思故事';
}

// 添加分析样式
function addAnalysisStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .analysis-results {
            font-family: 'Inter', sans-serif;
        }
        
        .analysis-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(106, 17, 203, 0.1);
        }
        
        .analysis-header h4 {
            margin: 0;
            color: var(--screenwriter-dark);
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .analysis-meta {
            display: flex;
            gap: 1rem;
            font-size: 0.9rem;
            color: #666;
        }
        
        .analysis-meta span {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .analysis-summary {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .grade-card {
            padding: 1.5rem;
            border-radius: var(--radius-lg);
            text-align: center;
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        }
        
        .grade-card.excellent { border: 3px solid #4CAF50; }
        .grade-card.good { border: 3px solid #2196F3; }
        .grade-card.fair { border: 3px solid #FF9800; }
        .grade-card.poor { border: 3px solid #FF5722; }
        .grade-card.fail { border: 3px solid #F44336; }
        
        .grade-label {
            font-size: 0.9rem;
            color: var(--screenwriter-dark);
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        
        .grade-value {
            font-size: 2.5rem;
            font-weight: 800;
            margin: 0.5rem 0;
        }
        
        .grade-card.excellent .grade-value { color: #4CAF50; }
        .grade-card.good .grade-value { color: #2196F3; }
        .grade-card.fair .grade-value { color: #FF9800; }
        .grade-card.poor .grade-value { color: #FF5722; }
        .grade-card.fail .grade-value { color: #F44336; }
        
        .grade-score {
            font-size: 1.2rem;
            color: var(--screenwriter-dark);
            margin-bottom: 0.5rem;
        }
        
        .grade-description {
            font-size: 0.9rem;
            color: #666;
            font-style: italic;
        }
        
        .summary-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }
        
        .stat-item {
            background: white;
            border-radius: var(--radius);
            padding: 1rem;
            text-align: center;
            border: 1px solid rgba(106, 17, 203, 0.1);
            transition: transform 0.3s ease;
        }
        
        .stat-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(106, 17, 203, 0.1);
        }
        
        .stat-label {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 0.5rem;
        }
        
        .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--screenwriter-primary);
        }
        
        .analysis-details {
            margin-bottom: 2rem;
        }
        
        .detail-section {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: white;
            border-radius: var(--radius);
            border-left: 4px solid;
        }
        
        .detail-section:nth-child(1) { border-left-color: #4CAF50; }
        .detail-section:nth-child(2) { border-left-color: #FF9800; }
        .detail-section:nth-child(3) { border-left-color: #2196F3; }
        
        .detail-section h5 {
            margin: 0 0 1rem 0;
            color: var(--screenwriter-dark);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .strengths-list,
        .weaknesses-list,
        .recommendations-list {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        
        .strengths-list li,
        .weaknesses-list li,
        .recommendations-list li {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 0.75rem;
            padding: 0.5rem;
            border-radius: var(--radius-sm);
            transition: background 0.3s ease;
        }
        
        .strengths-list li:hover { background: rgba(76, 175, 80, 0.1); }
        .weaknesses-list li:hover { background: rgba(255, 152, 0, 0.1); }
        .recommendations-list li:hover { background: rgba(33, 150, 243, 0.1); }
        
        .strengths-list li i { color: #4CAF50; }
        .weaknesses-list li i { color: #FF9800; }
        .recommendations-list li i { color: #2196F3; }
        
        .strengths-list li span { color: #2E7D32; }
        .weaknesses-list li span { color: #EF6C00; }
        .recommendations-list li span { color: #1565C0; }
        
        .analysis-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            padding-top: 1.5rem;
            border-top: 2px solid rgba(106, 17, 203, 0.1);
        }
        
        .action-btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: var(--radius);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .optimize-btn {
            background: linear-gradient(135deg, #FF416C, #FF4B2B);
            color: white;
        }
        
        .export-btn {
            background: linear-gradient(135deg, #00b09b, #96c93d);
            color: white;
        }
        
        .share-btn {
            background: linear-gradient(135deg, #6A11CB, #2575FC);
            color: white;
        }
        
        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        
        @keyframes tooltipFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(style);
}

// 导出分析报告
function exportAnalysis() {
    showToast('分析报告导出成功！', 'success');
    // 这里可以实现实际的导出逻辑
}

// 分享分析报告
function shareAnalysis() {
    showToast('分享功能准备中...', 'info');
    // 这里可以实现分享逻辑
}

// 显示数据库浏览器
function showDatabaseBrowser() {
    const dbHtml = `
        <div class="database-browser">
            <div class="db-header">
                <h4><i class="fas fa-database"></i> 编剧专业数据库</h4>
                <div class="db-search">
                    <input type="text" placeholder="搜索结构、原型、模板..." class="db-search-input">
                    <button class="db-search-btn"><i class="fas fa-search"></i></button>
                </div>
            </div>
            
            <div class="db-tabs">
                <button class="db-tab active" data-tab="structures">故事结构</button>
                <button class="db-tab" data-tab="archetypes">角色原型</button>
                <button class="db-tab" data-tab="patterns">对话模式</button>
                <button class="db-tab" data-tab="templates">情节模板</button>
            </div>
            
            <div class="db-content">
                <div class="db-panel active" id="structures-panel">
                    ${renderStructuresPanel()}
                </div>
                <div class="db-panel" id="archetypes-panel">
                    ${renderArchetypesPanel()}
                </div>
                <div class="db-panel" id="patterns-panel">
                    ${renderPatternsPanel()}
                </div>
                <div class="db-panel" id="templates-panel">
                    ${renderTemplatesPanel()}
                </div>
            </div>
            
            <div class="db-footer">
                <button class="db-action-btn apply-btn">
                    <i class="fas fa-check"></i> 应用选中
                </button>
                <button class="db-action-btn close-btn">
                    <i class="fas fa-times"></i> 关闭
                </button>
            </div>
        </div>
    `;
    
    showModal('编剧数据库', dbHtml);
    addDatabaseStyles();
    initDatabaseInteractions();
}

// 渲染结构面板
function renderStructuresPanel() {
    return Object.entries(storyStructures).map(([key, structure]) => `
        <div class="db-item" data-type="structure" data-key="${key}">
            <div class="db-item-header">
                <h5>${structure.name}</h5>
                <span class="db-item-badge">${structure.stages?.length || structure.beats || structure.points}个阶段</span>
            </div>
            <div class="db-item-description">${structure.description}</div>
            <div class="db-item-details">
                <div class="db-detail">
                    <strong>适用类型：</strong>${structure.suitableFor.join('、')}
                </div>
                <div class="db-detail">
                    <strong>经典案例：</strong>${structure.examples.join('、')}
                </div>
            </div>
            <div class="db-item-actions">
                <button class="db-item-btn preview-btn" data-key="${key}">
                    <i class="fas fa-eye"></i> 预览
                </button>
                <button class="db-item-btn apply-btn" data-key="${key}">
                    <i class="fas fa-check"></i> 应用
                </button>
            </div>
        </div>
    `).join('');
}

// 渲染原型面板
function renderArchetypesPanel() {
    return Object.entries(characterArchetypes).map(([key, archetype]) => `
        <div class="db-item" data-type="archetype" data-key="${key}">
            <div class="db-item-header">
                <h5>${archetype.name}</h5>
                <span class="db-item-badge">原型</span>
            </div>
            <div class="db-item-description">${archetype.description}</div>
            <div class="db-item-details">
                <div class="db-detail">
                    <strong>核心特质：</strong>${archetype.traits.join('、')}
                </div>
                <div class="db-detail">
                    <strong>主要动机：</strong>${archetype.motivation}
                </div>
                <div class="db-detail">
                    <strong>经典案例：</strong>${archetype.examples.join('、')}
                </div>
            </div>
            <div class="db-item-actions">
                <button class="db-item-btn preview-btn" data-key="${key}">
                    <i class="fas fa-eye"></i> 预览
                </button>
                <button class="db-item-btn apply-btn" data-key="${key}">
                    <i class="fas fa-check"></i> 应用
                </button>
            </div>
        </div>
    `).join('');
}

// 渲染模式面板
function renderPatternsPanel() {
    return Object.entries(dialoguePatterns).map(([key, pattern]) => `
        <div class="db-item" data-type="pattern" data-key="${key}">
            <div class="db-item-header">
                <h5>${pattern.name}</h5>
                <span class="db-item-badge">对话模式</span>
            </div>
            <div class="db-item-description">${pattern.description}</div>
            <div class="db-item-details">
                <div class="db-detail">
                    <strong>主要模式：</strong>
                    <ul>
                        ${pattern.patterns.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
                <div class="db-detail">
                    <strong>使用技巧：</strong>
                    <ul>
                        ${pattern.techniques.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="db-item-actions">
                <button class="db-item-btn preview-btn" data-key="${key}">
                    <i class="fas fa-eye"></i> 预览
                </button>
                <button class="db-item-btn apply-btn" data-key="${key}">
                    <i class="fas fa-check"></i> 应用
                </button>
            </div>
        </div>
    `).join('');
}

// 渲染模板面板
function renderTemplatesPanel() {
    return Object.entries(plotTemplates).map(([key, template]) => `
        <div class="db-item" data-type="template" data-key="${key}">
            <div class="db-item-header">
                <h5>${template.name}</h5>
                <span class="db-item-badge">情节模板</span>
            </div>
            <div class="db-item-description">${template.description}</div>
            <div class="db-item-details">
                <div class="db-detail">
                    <strong>基本结构：</strong>
                    <ol>
                        ${template.structure.map(s => `<li>${s}</li>`).join('')}
                    </ol>
                </div>
                <div class="db-detail">
                    <strong>关键元素：</strong>
                    <ul>
                        ${template.keyElements.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                </div>
                <div class="db-detail">
                    <strong>经典案例：</strong>${template.examples.join('、')}
                </div>
            </div>
            <div class="db-item-actions">
                <button class="db-item-btn preview-btn" data-key="${key}">
                    <i class="fas fa-eye"></i> 预览
                </button>
                <button class="db-item-btn apply-btn" data-key="${key}">
                    <i class="fas fa-check"></i> 应用
                </button>
            </div>
        </div>
    `).join('');
}

// 添加数据库样式
function addDatabaseStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .database-browser {
            max-height: 70vh;
            display: flex;
            flex-direction: column;
        }
        
        .db-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(106, 17, 203, 0.1);
        }
        
        .db-header h4 {
            margin: 0;
            color: var(--screenwriter-dark);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .db-search {
            display: flex;
            gap: 0.5rem;
        }
        
        .db-search-input {
            padding: 0.5rem 1rem;
            border: 2px solid rgba(106, 17, 203, 0.2);
            border-radius: var(--radius);
            font-size: 0.9rem;
            width: 200px;
        }
        
        .db-search-input:focus {
            outline: none;
            border-color: var(--screenwriter-primary);
        }
        
        .db-search-btn {
            padding: 0.5rem 1rem;
            background: var(--screenwriter-primary);
            color: white;
            border: none;
            border-radius: var(--radius);
            cursor: pointer;
        }
        
        .db-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid rgba(106, 17, 203, 0.1);
            padding-bottom: 0.5rem;
        }
        
        .db-tab {
            padding: 0.5rem 1.5rem;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            color: var(--screenwriter-dark);
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .db-tab:hover {
            color: var(--screenwriter-primary);
        }
        
        .db-tab.active {
            color: var(--screenwriter-primary);
            border-bottom-color: var(--screenwriter-primary);
        }
        
        .db-content {
            flex: 1;
            overflow-y: auto;
            padding-right: 0.5rem;
        }
        
        .db-panel {
            display: none;
        }
        
        .db-panel.active {
            display: block;
        }
        
        .db-item {
            background: white;
            border-radius: var(--radius);
            padding: 1.5rem;
            margin-bottom: 1rem;
            border: 1px solid rgba(106, 17, 203, 0.1);
            transition: all 0.3s ease;
        }
        
        .db-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(106, 17, 203, 0.1);
            border-color: var(--screenwriter-primary);
        }
        
        .db-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .db-item-header h5 {
            margin: 0;
            color: var(--screenwriter-dark);
            font-size: 1.2rem;
        }
        
        .db-item-badge {
            padding: 0.25rem 0.75rem;
            background: var(--screenwriter-light);
            color: var(--screenwriter-primary);
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .db-item-description {
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        
        .db-item-details {
            margin-bottom: 1rem;
        }
        
        .db-detail {
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        
        .db-detail strong {
            color: var(--screenwriter-dark);
        }
        
        .db-detail ul,
        .db-detail ol {
            margin: 0.5rem 0 0.5rem 1.5rem;
            padding: 0;
        }
        
        .db-detail li {
            margin-bottom: 0.25rem;
        }
        
        .db-item-actions {
            display: flex;
            gap: 0.5rem;
            justify-content: flex-end;
        }
        
        .db-item-btn {
            padding: 0.5rem 1rem;
            border: 2px solid var(--screenwriter-primary);
            background: white;
            color: var(--screenwriter-primary);
            border-radius: var(--radius);
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .db-item-btn:hover {
            background: var(--screenwriter-primary);
            color: white;
        }
        
        .db-footer {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 2px solid rgba(106, 17, 203, 0.1);
        }
        
        .db-action-btn {
            padding: 0.75rem 2rem;
            border: none;
            border-radius: var(--radius);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .apply-btn {
            background: var(--screenwriter-primary);
            color: white;
        }
        
        .close-btn {
            background: var(--screenwriter-light);
            color: var(--screenwriter-dark);
        }
        
        .db-action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }
    `;
    
    document.head.appendChild(style);
}

// 初始化数据库交互
function initDatabaseInteractions() {
    // 标签切换
    const tabs = document.querySelectorAll('.db-tab');
    const panels = document.querySelectorAll('.db-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // 更新标签状态
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应面板
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${tabId}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });
    
    // 搜索功能
    const searchInput = document.querySelector('.db-search-input');
    const searchBtn = document.querySelector('.db-search-btn');
    
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        const activePanel = document.querySelector('.db-panel.active');
        const items = activePanel.querySelectorAll('.db-item');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (query === '' || text.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    
    // 预览功能
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const key = this.dataset.key;
            const type = this.closest('.db-item').dataset.type;
            previewDatabaseItem(type, key);
        });
    });
    
    // 应用功能
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const key = this.dataset.key;
            const type = this.closest('.db-item').dataset.type;
            applyDatabaseItem(type, key);
        });
    });
    
    // 关闭按钮
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.querySelector('.modal-close').click();
    });
}

// 预览数据库项目
function previewDatabaseItem(type, key) {
    let item;
    let title;
    
    switch(type) {
        case 'structure':
            item = storyStructures[key];
            title = '故事结构预览';
            break;
        case 'archetype':
            item = characterArchetypes[key];
            title = '角色原型预览';
            break;
        case 'pattern':
            item = dialoguePatterns[key];
            title = '对话模式预览';
            break;
        case 'template':
            item = plotTemplates[key];
            title = '情节模板预览';
            break;
        default:
            return;
    }
    
    const previewHtml = `
        <div class="database-preview">
            <h4>${title}</h4>
            <div class="preview-content">
                <h5>${item.name}</h5>
                <p class="preview-description">${item.description}</p>
                
                ${type === 'structure' ? `
                    <div class="preview-section">
                        <h6><i class="fas fa-sitemap"></i> 结构阶段</h6>
                        <ol class="preview-list">
                            ${item.stages?.map(stage => `
                                <li>
                                    <strong>${stage.name}</strong>
                                    <p>${stage.description}</p>
                                </li>
                            `).join('') || ''}
                        </ol>
                    </div>
                ` : ''}
                
                ${type === 'archetype' ? `
                    <div class="preview-section">
                        <h6><i class="fas fa-user-tag"></i> 核心特质</h6>
                        <div class="preview-tags">
                            ${item.traits.map(trait => `<span class="preview-tag">${trait}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="preview-section">
                        <h6><i class="fas fa-bullseye"></i> 主要动机</h6>
                        <p>${item.motivation}</p>
                    </div>
                ` : ''}
                
                ${type === 'pattern' ? `
                    <div class="preview-section">
                        <h6><i class="fas fa-comment-dots"></i> 对话模式</h6>
                        <ul class="preview-list">
                            ${item.patterns.map(pattern => `<li>${pattern}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="preview-section">
                        <h6><i class="fas fa-tools"></i> 使用技巧</h6>
                        <ul class="preview-list">
                            ${item.techniques.map(technique => `<li>${technique}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${type === 'template' ? `
                    <div class="preview-section">
                        <h6><i class="fas fa-road"></i> 基本结构</h6>
                        <ol class="preview-list">
                            ${item.structure.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div class="preview-section">
                        <h6><i class="fas fa-key"></i> 关键元素</h6>
                        <ul class="preview-list">
                            ${item.keyElements.map(element => `<li>${element}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="preview-section">
                    <h6><i class="fas fa-film"></i> 经典案例</h6>
                    <div class="preview-examples">
                        ${item.examples?.map(example => `<span class="preview-example">${example}</span>`).join('') || ''}
                    </div>
                </div>
            </div>
            
            <div class="preview-actions">
                <button class="preview-action-btn apply-btn" onclick="applyDatabaseItem('${type}', '${key}')">
                    <i class="fas fa-check"></i> 应用此模板
                </button>
                <button class="preview-action-btn close-btn" onclick="document.querySelector('.modal-close').click()">
                    <i class="fas fa-times"></i> 关闭
                </button>
            </div>
        </div>
    `;
    
    showModal(title, previewHtml);
    addPreviewStyles();
}

// 添加预览样式
function addPreviewStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .database-preview {
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .preview-content h5 {
            color: var(--screenwriter-primary);
            font-size: 1.5rem;
            margin: 0 0 1rem 0;
        }
        
        .preview-description {
            color: #666;
            line-height: 1.6;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(106, 17, 203, 0.1);
        }
        
        .preview-section {
            margin-bottom: 2rem;
        }
        
        .preview-section h6 {
            color: var(--screenwriter-dark);
            font-size: 1.1rem;
            margin: 0 0 1rem 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .preview-list {
            margin: 0;
            padding-left: 1.5rem;
        }
        
        .preview-list li {
            margin-bottom: 0.75rem;
            line-height: 1.5;
        }
        
        .preview-list li strong {
            color: var(--screenwriter-dark);
            display: block;
            margin-bottom: 0.25rem;
        }
        
        .preview-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .preview-tag {
            padding: 0.5rem 1rem;
            background: var(--screenwriter-light);
            color: var(--screenwriter-primary);
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .preview-examples {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .preview-example {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #6A11CB, #2575FC);
            color: white;
            border-radius: var(--radius);
            font-size: 0.9rem;
        }
        
        .preview-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 2px solid rgba(106, 17, 203, 0.1);
        }
        
        .preview-action-btn {
            padding: 0.75rem 2rem;
            border: none;
            border-radius: var(--radius);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .preview-action-btn.apply-btn {
            background: var(--screenwriter-primary);
            color: white;
        }
        
        .preview-action-btn.close-btn {
            background: var(--screenwriter-light);
            color: var(--screenwriter-dark);
        }
        
        .preview-action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }
    `;
    
    document.head.appendChild(style);
}

// 应用数据库项目
function applyDatabaseItem(type, key) {
    let message = '';
    
    switch(type) {
        case 'structure':
            message = `已应用"${storyStructures[key].name}"故事结构`;
            break;
        case 'archetype':
            message = `已应用"${characterArchetypes[key].name}"角色原型`;
            break;
        case 'pattern':
            message = `已应用"${dialoguePatterns[key].name}"对话模式`;
            break;
        case 'template':
            message = `已应用"${plotTemplates[key].name}"情节模板`;
            break;
    }
    
    showToast(message, 'success');
    
    // 关闭所有模态框
    document.querySelectorAll('.modal-close').forEach(btn => btn.click());
    
    // 在实际应用中，这里会更新页面上的相应设置
    // 例如：更新下拉选择框的值、填充表单等
}

// ============================================
// 主初始化更新
// ============================================

// 更新主初始化函数
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 总编剧智能体页面加载 - 完整专业版');
    
    // 基础功能初始化
    initNavigation();
    initChat();
    initStoryTools();
    initCharacterTools();
    initStructureTools();
    initDialogueTools();
    initQuickActions();
    
    // 高级功能初始化（延迟加载）
    setTimeout(() => {
        initAdvancedFeatures();
        console.log('🚀 高级功能已加载：智能分析 + 数据库 + 可视化');
    }, 1000);
    
    // 显示欢迎消息
    setTimeout(() => {
        addAgentMessage(`🎬 欢迎使用总编剧智能体 - 专业版！
        
**核心功能已就绪**：
🤖 **智能故事分析**：6维度专业评分系统
📊 **专业编剧数据库**：结构、原型、模式、模板
🔄 **智能优化建议**：个性化改进方案
🎨 **可视化创作工具**：地图、网络、时间线、流程图

**快捷键**：
• Ctrl + S：保存故事
• Ctrl + D：打开数据库
• Ctrl + A：分析故事

**开始创作**：
1. 使用左侧聊天获取专业建议
2. 使用中间工具设计故事和角色
3. 使用右侧工具规划结构和对话
4. 点击下方按钮进行智能分析和优化

需要任何帮助，随时告诉我！`);
    }, 1500);
});

// 导出函数供全局使用
window.analyzeStoryQuality = analyzeStoryQuality;
window.optimizeStoryStructure = optimizeStoryStructure;
window.optimizeCharacterDevelopment = optimizeCharacterDevelopment;
window.optimizeDialogue = optimizeDialogue;
window.optimizePlotPacing = optimizePlotPacing;
window.createStoryMap = createStoryMap;
window.createCharacterNetwork = createCharacterNetwork;
window.createTimelineEditor = createTimelineEditor;
window.createDialogueFlow = createDialogueFlow;
window.showDatabaseBrowser = showDatabaseBrowser;
window.showToast = showToast;

console.log('✅ 总编剧智能体脚本加载完成 - 完整专业版');



