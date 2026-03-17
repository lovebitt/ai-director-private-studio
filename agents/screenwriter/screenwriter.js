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
                    description: "太阳王子和月亮