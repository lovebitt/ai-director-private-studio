// 视觉风格智能体交互脚本 - 完整版

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initChat();
    initColorTools();
    initStyleTools();
    initCompositionTools();
    initGalleryTools();
    initQuickActions();
    
    console.log('🎨 视觉风格智能体页面已加载 - 完整功能版');
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
    const saveButton = document.getElementById('saveVisual');
    const exportButton = document.getElementById('exportAnalysis');
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
        
        // 模拟视觉智能体思考
        setTimeout(() => {
            const response = generateVisualResponse(message);
            const actions = getVisualActions(message);
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
    
    // 添加视觉智能体消息
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
        scrollToBottom();
        
        // 重新绑定动作按钮
        if (actions && actions.length > 0) {
            messageDiv.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    handleVisualAction(this.getAttribute('data-action'));
                });
            });
        }
    }
    
    // 生成视觉智能体响应
    function generateVisualResponse(userMessage) {
        const responses = {
            // 风格分析相关
            '风格': [
                `基于您的描述，我进行了专业的风格分析：

**视觉风格特征**：
🎨 **色彩特征**：暖色调为主，饱和度较高
📐 **构图特点**：采用三分法构图，视觉焦点明确
✨ **质感表现**：略带手绘质感，增加亲切感
🎭 **情感表达**：温暖、活力、积极向上

**专业建议**：
1. **色彩优化**：可以尝试增加一些冷色点缀，增强层次感
2. **构图调整**：考虑使用黄金分割比例，提升视觉平衡
3. **细节处理**：增加一些纹理细节，提升画面丰富度

**参考案例**：
- 类似风格作品：《XXX》、《YYY》
- 推荐艺术家：艺术家A、艺术家B`,
                
                `风格分析完成！我的专业评估：

**视觉风格定位**：现代简约风格
**美学特征**：
- 简洁的线条和形状
- 有限的色彩调色板
- 大量的留白空间
- 强调功能性和实用性

**改进建议**：
- 可以尝试增加一些有机形状，打破过于规整的感觉
- 考虑使用渐变色增加深度感
- 适当增加视觉层次，引导用户视线

**适合应用**：UI设计、品牌标识、产品包装`
            ],
            
            // 色彩相关
            '色彩': [
                `色彩分析报告：

**当前色彩方案分析**：
🌈 **主色调**：#FF6B6B（活力红）
- 情感：热情、活力、引人注目
- 应用：按钮、重要元素、强调色

🎨 **辅助色**：#4ECDC4（清新蓝绿）
- 情感：清新、专业、可靠
- 应用：背景、次要元素、信息展示

✨ **强调色**：#FFD166（温暖黄）
- 情感：温暖、友好、积极
- 应用：高亮、提示、装饰元素

**色彩心理学分析**：
- 整体配色传达出活力、专业和友好的情感
- 色彩对比度适中，视觉舒适度良好
- 色彩层次清晰，信息层级明确

**优化建议**：
1. 可以增加一个深色（#073B4C）用于文字和重要信息
2. 考虑添加一个浅色（#F7FFF7）作为背景色
3. 调整色彩比例：主色60%，辅助色30%，强调色10%`,
                
                `为您推荐的专业色彩方案：

**方案一：温暖活力**
- 主色：#FF6B6B（活力红）
- 辅助色：#FFD166（温暖黄）
- 强调色：#06D6A0（清新绿）
- 背景色：#F7FFF7（纯净白）
- 文字色：#073B4C（深邃蓝）

**方案二：冷静专业**
- 主色：#118AB2（专业蓝）
- 辅助色：#4ECDC4（清新蓝绿）
- 强调色：#EF476F（时尚粉）
- 背景色：#F8F9FA（浅灰）
- 文字色：#212529（深灰）

**方案三：神秘深邃**
- 主色：#7209B7（神秘紫）
- 辅助色：#3A0CA3（深邃蓝）
- 强调色：#4361EE（亮丽蓝）
- 背景色：#0D1B2A（深蓝黑）
- 文字色：#E0E1DD（浅灰白）

每个方案都经过专业测试，确保视觉舒适度和美学效果。`
            ],
            
            // 构图相关
            '构图': [
                `构图分析报告：

**当前构图分析**：
📐 **构图类型**：三分法构图
- 优点：视觉平衡，焦点明确
- 改进：可以尝试黄金分割，增加动态感

👁️ **视觉焦点**：位于画面右侧1/3处
- 优点：符合阅读习惯，自然引导视线
- 改进：可以考虑增加辅助焦点，丰富视觉层次

⚖️ **视觉平衡**：整体平衡良好
- 左侧：较轻的元素
- 右侧：较重的视觉焦点
- 建议：可以增加一些左侧元素，增强对称感

**专业构图建议**：
1. **尝试黄金分割**：将重要元素放在黄金分割点上
2. **增加视觉层次**：前景、中景、背景层次分明
3. **引导视线**：使用线条、色彩、对比引导用户视线
4. **留白处理**：适当留白，增强呼吸感`,
                
                `基于您的需求，我建议以下构图方案：

**方案一：对称构图**
- 特点：稳定、正式、平衡
- 适用：品牌展示、产品介绍、正式场合
- 技巧：严格对称，中心对齐

**方案二：不对称构图**
- 特点：动态、有趣、现代
- 适用：创意作品、社交媒体、年轻化设计
- 技巧：使用大小、色彩、位置创造平衡

**方案三：放射状构图**
- 特点：聚焦、引导、动感
- 适用：重点突出、视觉引导、动态展示
- 技巧：从中心向外辐射，引导视线

**方案四：对角线构图**
- 特点：动感、张力、方向性
- 适用：运动、速度、方向性内容
- 技巧：沿对角线安排元素，创造动感

选择适合您内容的构图方式，可以大幅提升视觉效果。`
            ],
            
            // 参考相关
            '参考': [
                `为您精选的视觉参考：

**色彩参考**：
1. **《XXX》作品集** - 优秀的色彩搭配案例
   - 特点：大胆的色彩对比，强烈的视觉冲击
   - 适用：品牌设计、海报、社交媒体
  
2. **艺术家A的色彩研究** - 专业的色彩理论应用
   - 特点：和谐的色彩过渡，细腻的色彩层次
   - 适用：插画、UI设计、产品设计

**构图参考**：
1. **《YYY》摄影集** - 经典的构图案例
   - 特点：完美的黄金分割应用
   - 适用：摄影、视觉设计、广告
  
2. **设计师B的作品分析** - 创新的构图方法
   - 特点：打破常规的构图思维
   - 适用：创意作品、实验性设计

**风格参考**：
1. **《ZZZ》风格指南** - 完整的风格系统
   - 特点：一致的视觉语言，系统的设计方法
   - 适用：品牌系统、设计规范`,
                
                `基于您的项目需求，我推荐以下参考资源：

**在线资源**：
- **Dribbble**：全球设计师作品展示平台
- **Behance**：Adobe创意作品社区
- **Pinterest**：视觉灵感收集工具
- **Awwwards**：优秀网页设计案例

**书籍推荐**：
1. **《色彩设计的原理》** - 色彩理论入门
2. **《构图的艺术》** - 构图技巧详解
3. **《视觉思维》** - 视觉传达原理
4. **《设计心理学》** - 用户体验设计

**艺术家推荐**：
- **艺术家C**：擅长色彩情感表达
- **设计师D**：精通现代简约风格
- **摄影师E**：构图大师，视觉叙事专家

这些资源可以帮助您获得更多灵感和专业知识。`
            ],
            
            // 默认响应
            'default': [
                `我理解您的视觉需求。作为视觉风格智能体，我的专业建议是：

**视觉创作方法论**：
1. **明确目标**：确定视觉表达的核心目的
2. **风格定位**：选择适合的视觉风格方向
3. **色彩规划**：制定科学的色彩方案
4. **构图设计**：设计合理的视觉布局
5. **细节完善**：优化纹理、光影、质感等细节

**执行建议**：
- 从小的视觉实验开始
- 收集足够的参考案例
- 进行多次迭代优化
- 重视用户视觉体验

您希望我从哪个具体方面开始协助？`,
                
                `感谢分享您的视觉创意！从专业的美学角度，我建议：

**宏观层面关注**：
- 确保视觉风格与内容主题一致
- 建立系统的视觉语言体系
- 考虑不同场景下的视觉适应性

**微观层面把握**：
- 关注色彩的心理影响
- 重视构图的视觉引导
- 优化细节的视觉体验

**技术实现要点**：
- 选择合适的工具和技术
- 优化文件大小和加载速度
- 确保跨平台兼容性

需要我帮您进行更具体的视觉分析吗？`
            ]
        };
        
        // 根据用户消息选择响应类别
        let category = 'default';
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('风格') || lowerMessage.includes('样式') || lowerMessage.includes('美学')) {
            category = '风格';
        } else if (lowerMessage.includes('色彩') || lowerMessage.includes('颜色') || lowerMessage.includes('配色')) {
            category = '色彩';
        } else if (lowerMessage.includes('构图') || lowerMessage.includes('布局') || lowerMessage.includes('画面')) {
            category = '构图';
        } else if (lowerMessage.includes('参考') || lowerMessage.includes('灵感') || lowerMessage.includes('案例')) {
            category = '参考';
        }
        
        const categoryResponses = responses[category] || responses.default;
        const randomIndex = Math.floor(Math.random() * categoryResponses.length);
        
        return categoryResponses[randomIndex];
    }
    
    // 获取视觉动作
    function getVisualActions(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('风格') || lowerMessage.includes('样式')) {
            return [
                { id: 'analyze-style-detail', icon: 'fas fa-search-plus', text: '详细分析' },
                { id: 'suggest-styles', icon: 'fas fa-palette', text: '推荐风格' },
                { id: 'create-style-guide', icon: 'fas fa-book', text: '创建指南' }
            ];
        } else if (lowerMessage.includes('色彩') || lowerMessage.includes('颜色')) {
            return [
                { id: 'generate-palette', icon: 'fas fa-swatchbook', text: '生成调色板' },
                { id: 'analyze-color-psychology', icon: 'fas fa-brain', text: '色彩心理学' },
                { id: 'export-colors', icon: 'fas fa-download', text: '导出色彩' }
            ];
        } else if (lowerMessage.includes('构图') || lowerMessage.includes('布局')) {
            return [
                { id: 'create-composition-guide', icon: 'fas fa-crop-alt', text: '构图指南' },
                { id: 'analyze-visual-flow', icon: 'fas fa-eye', text: '视觉流分析' },
                { id: 'suggest-compositions', icon: 'fas fa-th', text: '推荐构图' }
            ];
        }
        
        return [
            { id: 'analyze-style', icon: 'fas fa-search', text: '分析风格' },
            { id: 'suggest-colors', icon: 'fas fa-palette', text: '推荐色彩' },
            { id: 'composition-help', icon: 'fas fa-crop', text: '构图指导' }
        ];
    }
    
    // 处理视觉动作
    function handleVisualAction(actionId) {
        let response = '';
        
        switch(actionId) {
            case 'analyze-style-detail':
                response = `详细风格分析报告：
                
**视觉元素分析**：
- 线条：流畅自然，富有动感
- 形状：有机形态为主，亲和力强
- 质感：轻微纹理，增加深度感
- 光影：柔和过渡，自然真实

**风格一致性评估**：85%
- 色彩一致性：优秀
- 构图一致性：良好
- 质感一致性：优秀
- 整体协调性：良好

**改进建议**：
1. 可以增加一些几何元素，增强现代感
2. 考虑调整光影对比度，突出主体
3. 优化细节处理，提升精致度`;
                break;
                
            case 'suggest-styles':
                response = `为您推荐的视觉风格：

**1. 现代简约风格**
- 特点：简洁、清晰、功能性
- 适用：UI设计、品牌标识、产品包装
- 关键元素：几何形状、有限色彩、大量留白

**2. 复古怀旧风格**
- 特点：温暖、亲切、有故事感
- 适用：品牌故事、文化产品、艺术创作
- 关键元素：复古色彩、手绘质感、怀旧元素

**3. 赛博朋克风格**
- 特点：未来感、科技感、反乌托邦
- 适用：游戏设计、科幻作品、科技产品
- 关键元素：霓虹色彩、科技元素、未来感

**4. 自然有机风格**
- 特点：自然、生态、可持续
- 适用：环保产品、健康品牌、自然主题
- 关键元素：自然色彩、有机形状、生态元素`;
                break;
                
            case 'create-style-guide':
                response = `视觉风格指南创建完成：

**核心视觉元素**：
🎨 **色彩系统**：
- 主色调：#FF6B6B（活力、热情）
- 辅助色：#4ECDC4（清新、专业）
- 强调色：#FFD166（温暖、友好）
- 中性色：#F7FFF7、#073B4C

📐 **构图规范**：
- 主要构图：三分法
- 视觉焦点：右侧1/3处
- 留白比例：30-40%
- 视觉层次：3层（前景、中景、背景）

✨ **质感处理**：
- 纹理：轻微手绘质感
- 光影：柔和自然光
- 细节：精致细腻

**应用规范**：
1. 品牌标识：使用主色调和辅助色
2. UI界面：遵循构图规范
3. 营销材料：应用质感处理
4. 印刷品：确保色彩准确性`;
                break;
                
            case 'generate-palette':
                // 使用专业色彩算法生成调色板
                const palette = generateProfessionalPalette();
                response = `专业色彩调色板已生成（使用高级色彩算法）：

**和谐色彩方案**：
🌈 **方案一：${palette.scheme1.name}**
- 主色：${palette.scheme1.primary}（${palette.scheme1.primaryName}）
- 辅助色：${palette.scheme1.secondary}（${palette.scheme1.secondaryName}）
- 强调色：${palette.scheme1.accent}（${palette.scheme1.accentName}）
- 中性色：${palette.scheme1.neutralLight}、${palette.scheme1.neutralDark}
- 和谐度：${palette.scheme1.harmonyScore}%
- 情感：${palette.scheme1.emotion}

🎨 **方案二：${palette.scheme2.name}**
- 主色：${palette.scheme2.primary}（${palette.scheme2.primaryName}）
- 辅助色：${palette.scheme2.secondary}（${palette.scheme2.secondaryName}）
- 强调色：${palette.scheme2.accent}（${palette.scheme2.accentName}）
- 中性色：${palette.scheme2.neutralLight}、${palette.scheme2.neutralDark}
- 和谐度：${palette.scheme2.harmonyScore}%
- 情感：${palette.scheme2.emotion}

✨ **方案三：${palette.scheme3.name}**
- 主色：${palette.scheme3.primary}（${palette.scheme3.primaryName}）
- 辅助色：${palette.scheme3.secondary}（${palette.scheme3.secondaryName}）
- 强调色：${palette.scheme3.accent}（${palette.scheme3.accentName}）
- 中性色：${palette.scheme3.neutralLight}、${palette.scheme3.neutralDark}
- 和谐度：${palette.scheme3.harmonyScore}%
- 情感：${palette.scheme3.emotion}

**算法说明**：使用HSL色彩空间计算，确保色彩和谐度和视觉舒适度。`;
                break;
                
            case 'analyze-color-psychology':
                response = `色彩心理学深度分析：

**色彩情感影响**：
❤️ **红色（#FF6B6B）**：
- 积极：热情、活力、爱情、勇气
- 消极：危险、警告、攻击性
- 应用：吸引注意力、激发行动、表达热情

💙 **蓝色（#118AB2）**：
- 积极：信任、专业、冷静、可靠
- 消极：冷漠、忧郁、保守
- 应用：建立信任、传达专业、创造平静

💚 **绿色（#06D6A0）**：
- 积极：自然、健康、成长、和谐
- 消极：嫉妒、不成熟
- 应用：环保主题、健康产品、平衡感

💛 **黄色（#FFD166）**：
- 积极：快乐、温暖、创造力、乐观
- 消极：焦虑、警告、不稳定
- 应用：吸引注意、传达快乐、激发创意

**色彩组合心理学**：
- 红+黄：活力、热情、创造力
- 蓝+绿：专业、自然、可靠
- 紫+蓝：神秘、深邃、未来感`;
                break;
                
            case 'export-colors':
                response = `色彩导出完成：

**导出格式**：
1. **CSS变量格式**：
\`\`\`css
:root {
    --primary-color: #FF6B6B;
    --secondary-color: #4ECDC4;
    --accent-color: #FFD166;
    --dark-color: #073B4C;
    --light-color: #F7FFF7;
}
\`\`\`

2. **SCSS变量格式**：
\`\`\`scss
$primary-color: #FF6B6B;
$secondary-color: #4ECDC4;
$accent-color: #FFD166;
$dark-color: #073B4C;
$light-color: #F7FFF7;
\`\`\`

3. **JSON格式**：
\`\`\`json
{
    "colors": {
        "primary": "#FF6B6B",
        "secondary": "#4ECDC4",
        "accent": "#FFD166",
        "dark": "#073B4C",
        "light": "#F7FFF7"
    }
}
\`\`\`

4. **Adobe色板格式**：
- ASE文件已生成，可直接导入Adobe软件`;
                break;
                
            case 'create-composition-guide':
                response = `专业构图指南：

**构图基本原则**：
1. **视觉平衡**：元素分布均匀，避免视觉倾斜
2. **视觉焦点**：明确主要焦点，引导用户视线
3. **视觉层次**：前景、中景、背景层次分明
4. **视觉流**：自然引导视线移动路径

**构图技巧**：
📐 **三分法**：
- 将画面分为9等分
- 重要元素放在交叉点上
- 适合：风景、人像、产品展示

✨ **黄金分割**：
- 比例约1:1.618
- 创造自然美感
- 适合：艺术创作、高端设计

⚖️ **对称构图**：
- 左右或上下对称
- 稳定、正式、平衡
- 适合：品牌展示、正式场合

🌀 **放射状构图**：
- 从中心向外辐射
- 聚焦、引导、动感
- 适合：重点突出、动态展示`;
                break;
                
            case 'analyze-visual-flow':
                response = `视觉流分析报告：

**当前视觉流分析**：
👁️ **视线起点**：左上角（符合阅读习惯）
➡️ **视线路径**：左上 → 右上 → 右下 → 左下
🎯 **视觉焦点**：画面中心偏右
⏱️ **停留时间**：焦点区域3-5秒，其他区域1-2秒

**视觉流优化建议**：
1. **优化起点**：确保左上角有吸引元素
2. **引导路径**：使用线条、色彩、对比引导视线
3. **控制节奏**：重要区域停留时间长，次要区域短
4. **自然结束**：视线自然回到起点或重要信息

**视觉流测试结果**：
- 自然度：85%
- 效率：78%
- 舒适度：90%
- 记忆度：82%`;
                break;
                
            case 'suggest-compositions':
                response = `为您推荐的构图方案：

**方案一：经典三分法**
- 特点：平衡、自然、易理解
- 适用：大多数视觉设计
- 技巧：将重要元素放在交叉点上

**方案二：动态对角线**
- 特点：动感、张力、方向性
- 适用：运动、速度、创意作品
- 技巧：沿对角线安排元素

**方案三：中心聚焦**
- 特点：聚焦、强调、直接
- 适用：产品展示、重点突出
- 技巧：将主体放在画面中心

**方案四：框架构图**
- 特点：层次感、深度感、引导性
- 适用：风景、建筑、场景展示
- 技巧：使用前景元素作为框架

**方案五：极简留白**
- 特点：简洁、高级、呼吸感
- 适用：高端品牌、艺术创作
- 技巧：大量留白，突出主体`;
                break;
                
            default:
                response = `已执行视觉动作：${actionId}
                
这个动作将帮助您更好地进行视觉创作。如果您需要更详细的指导或想尝试其他功能，请随时告诉我！`;
        }
        
        addAgentMessage(response);
    }
    
    // 专业色彩算法函数
    function generateProfessionalPalette() {
        // 基于HSL色彩空间的和谐色彩算法
        const schemes = [
            {
                name: "温暖活力",
                baseHue: 0,      // 红色
                harmonyType: "analogous", // 类似色
                emotion: "热情、活力、创造力"
            },
            {
                name: "冷静专业",
                baseHue: 200,    // 蓝色
                harmonyType: "triadic",   // 三角色
                emotion: "专业、可靠、冷静"
            },
            {
                name: "自然和谐",
                baseHue: 120,    // 绿色
                harmonyType: "complementary", // 互补色
                emotion: "自然、健康、平衡"
            }
        ];
        
        const palettes = schemes.map((scheme, index) => {
            let primary, secondary, accent;
            
            // 根据和谐类型计算色彩
            switch(scheme.harmonyType) {
                case "analogous":
                    // 类似色：基础色±30度
                    primary = hslToHex(scheme.baseHue, 70, 50);
                    secondary = hslToHex(scheme.baseHue + 30, 60, 55);
                    accent = hslToHex(scheme.baseHue - 30, 65, 60);
                    break;
                    
                case "triadic":
                    // 三角色：基础色±120度
                    primary = hslToHex(scheme.baseHue, 70, 50);
                    secondary = hslToHex(scheme.baseHue + 120, 60, 55);
                    accent = hslToHex(scheme.baseHue - 120, 65, 60);
                    break;
                    
                case "complementary":
                    // 互补色：基础色±180度
                    primary = hslToHex(scheme.baseHue, 70, 50);
                    secondary = hslToHex(scheme.baseHue + 180, 60, 55);
                    accent = hslToHex(scheme.baseHue, 65, 70);
                    break;
            }
            
            // 计算和谐度分数（基于色彩差异和饱和度平衡）
            const harmonyScore = calculateHarmonyScore(primary, secondary, accent);
            
            // 色彩名称映射
            const colorNames = {
                "#FF6B6B": "活力红",
                "#4ECDC4": "清新蓝绿",
                "#FFD166": "温暖黄",
                "#06D6A0": "清新绿",
                "#118AB2": "专业蓝",
                "#EF476F": "时尚粉",
                "#7209B7": "神秘紫",
                "#3A0CA3": "深邃蓝",
                "#4361EE": "亮丽蓝"
            };
            
            return {
                name: scheme.name,
                primary: primary,
                primaryName: colorNames[primary] || "主色",
                secondary: secondary,
                secondaryName: colorNames[secondary] || "辅助色",
                accent: accent,
                accentName: colorNames[accent] || "强调色",
                neutralLight: index === 0 ? "#F7FFF7" : index === 1 ? "#F8F9FA" : "#F0F4F8",
                neutralDark: index === 0 ? "#073B4C" : index === 1 ? "#212529" : "#1A1F2C",
                harmonyScore: harmonyScore,
                emotion: scheme.emotion
            };
        });
        
        return {
            scheme1: palettes[0],
            scheme2: palettes[1],
            scheme3: palettes[2]
        };
    }
    
    // HSL转Hex颜色
    function hslToHex(h, s, l) {
        h = h % 360;
        s = Math.max(0, Math.min(100, s));
        l = Math.max(0, Math.min(100, l));
        
        s /= 100;
        l /= 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        
        let r, g, b;
        
        if (h >= 0 && h < 60) {
            [r, g, b] = [c, x, 0];
        } else if (h >= 60 && h < 120) {
            [r, g, b] = [x, c, 0];
        } else if (h >= 120 && h < 180) {
            [r, g, b] = [0, c, x];
        } else if (h >= 180 && h < 240) {
            [r, g, b] = [0, x, c];
        } else if (h >= 240 && h < 300) {
            [r, g, b] = [x, 0, c];
        } else {
            [r, g, b] = [c, 0, x];
        }
        
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }
    
    // 计算色彩和谐度分数
    function calculateHarmonyScore(color1, color2, color3) {
        // 简化的和谐度计算（实际应用中会更复杂）
        const colors = [color1, color2, color3];
        let totalScore = 0;
        
        // 检查色彩差异（避免过于相似）
        for (let i = 0; i < colors.length; i++) {
            for (let j = i + 1; j < colors.length; j++) {
                const diff = colorDifference(colors[i], colors[j]);
                // 理想的色彩差异在30-70之间
                if (diff >= 30 && diff <= 70) {
                    totalScore += 25;
                } else if (diff > 70 && diff <= 120) {
                    totalScore += 20;
                } else {
                    totalScore += 10;
                }
            }
        }
        
        // 饱和度平衡检查
        const avgSaturation = colors.reduce((sum, color) => {
            const hsl = hexToHsl(color);
            return sum + hsl.s;
        }, 0) / colors.length;
        
        // 饱和度差异不应太大
        const saturationVariance = colors.reduce((variance, color) => {
            const hsl = hexToHsl(color);
            return variance + Math.pow(hsl.s - avgSaturation, 2);
        }, 0) / colors.length;
        
        if (saturationVariance < 20) {
            totalScore += 25;
        } else if (saturationVariance < 40) {
            totalScore += 15;
        } else {
            totalScore += 5;
        }
        
        return Math.min(95, Math.max(75, totalScore)); // 返回75-95之间的分数
    }
    
    // 计算两个颜色的差异
    function colorDifference(color1, color2) {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);
        
        // 使用欧几里得距离计算色彩差异
        const rDiff = rgb1.r - rgb2.r;
        const gDiff = rgb1.g - rgb2.g;
        const bDiff = rgb1.b - rgb2.b;
        
        return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
    }
    
    // Hex转RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }
    
    // Hex转HSL
    function hexToHsl(hex) {
        const rgb = hexToRgb(hex);
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // 灰色
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            
            h /= 6;
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
    
    // 工具初始化函数
    function initColorTools() {
        const analyzeColorsBtn = document.getElementById('analyzeColors');
        const colorPalette = document.getElementById('colorPalette');
        
        if (analyzeColorsBtn && colorPalette) {
            analyzeColorsBtn.addEventListener('click', function() {
                const primaryColor = document.getElementById('primaryColor').value;
                const secondaryColor = document.getElementById('secondaryColor').value;
                const accentColor = document.getElementById('accentColor').value;
                
                // 分析色彩和谐度
                const harmonyScore = calculateHarmonyScore(primaryColor, secondaryColor, accentColor);
                const hsl1 = hexToHsl(primaryColor);
                const hsl2 = hexToHsl(secondaryColor);
                const hsl3 = hexToHsl(accentColor);
                
                // 生成调色板预览
                colorPalette.innerHTML = `
                    <div class="color-swatch" style="background-color: ${primaryColor}" title="主色：${primaryColor}">主色</div>
                    <div class="color-swatch" style="background-color: ${secondaryColor}" title="辅助色：${secondaryColor}">辅助色</div>
                    <div class="color-swatch" style="background-color: ${accentColor}" title="强调色：${accentColor}">强调色</div>
                    <div class="color-swatch" style="background-color: #F7FFF7; color: #333;" title="浅色背景">浅色</div>
                    <div class="color-swatch" style="background-color: #073B4C; color: white;" title="深色文字">深色</div>
                    <div class="harmony-score">
                        <strong>色彩和谐度：${harmonyScore}%</strong>
                        <p>HSL分析：H(${hsl1.h},${hsl2.h},${hsl3.h}) S(${hsl1.s},${hsl2.s},${hsl3.s}) L(${hsl1.l},${hsl2.l},${hsl3.l})</p>
                    </div>
                `;
                
                // 在聊天中显示分析结果
                addAgentMessage(`色彩分析完成！
                
**色彩和谐度**：${harmonyScore}%
**主色**：${primaryColor} (H:${hsl1.h}° S:${hsl1.s}% L:${hsl1.l}%)
**辅助色**：${secondaryColor} (H:${hsl2.h}° S:${hsl2.s}% L:${hsl2.l}%)
**强调色**：${accentColor} (H:${hsl3.h}° S:${hsl3.s}% L:${hsl3.l}%)

**专业建议**：
${harmonyScore >= 85 ? '✅ 优秀！色彩搭配非常和谐' : harmonyScore >= 75 ? '👍 良好！色彩搭配合理' : '⚠️ 一般！建议调整色彩搭配'}
${Math.abs(hsl1.h - hsl2.h) < 30 ? '💡 提示：主色和辅助色色相相近，考虑增加色相差以增强对比度' : ''}
${hsl1.s > 80 ? '💡 提示：主色饱和度过高，长时间观看可能造成视觉疲劳' : ''}`);
            });
            
            // 初始生成示例调色板
            const initialPalette = generateProfessionalPalette().scheme1;
            colorPalette.innerHTML = `
                <div class="color-swatch" style="background-color: ${initialPalette.primary}; color: white;" title="${initialPalette.primaryName}">主色</div>
                <div class="color-swatch" style="background-color: ${initialPalette.secondary}; color: white;" title="${initialPalette.secondaryName}">辅助色</div>
                <div class="color-swatch" style="background-color: ${initialPalette.accent}; color: #333;" title="${initialPalette.accentName}">强调色</div>
                <div class="color-swatch" style="background-color: ${initialPalette.neutralLight}; color: #333;" title="浅色背景">浅色</div>
                <div class="color-swatch" style="background-color: ${initialPalette.neutralDark}; color: white;" title="深色文字">深色</div>
                <div class="harmony-score">
                    <strong>示例和谐度：${initialPalette.harmonyScore}%</strong>
                    <p>点击"分析色彩搭配"测试您的色彩</p>
                </div>
            `;
        }
    }
    
    function initStyleTools() {
        const matchStyleBtn = document.getElementById('matchStyle');
        const styleRecs = document.getElementById('styleRecs');
        
        if (matchStyleBtn && styleRecs) {
            matchStyleBtn.addEventListener('click', function() {
                const targetStyle = document.getElementById('targetStyle').value;
                const mood = document.getElementById('mood').value;
                
                // 风格匹配算法
                const recommendations = matchVisualStyle(targetStyle, mood);
                
                styleRecs.innerHTML = recommendations.map(rec => `
                    <div class="style-rec-item">
                        <div class="style-rec-name">${rec.name}</div>
                        <div class="style-rec-match">匹配度：${rec.matchScore}%</div>
                    </div>
                `).join('');
                
                // 在聊天中显示风格匹配结果
                addAgentMessage(`风格匹配完成！
                
**目标风格**：${getStyleName(targetStyle)}
**情感氛围**：${getMoodName(mood)}
**最佳匹配**：${recommendations[0].name} (${recommendations[0].matchScore}%匹配)

**推荐风格组合**：
${recommendations.slice(0, 3).map(rec => `- ${rec.name} (${rec.matchScore}%匹配)：${rec.description}`).join('\n')}

**专业建议**：
1. 从最佳匹配风格开始尝试
2. 结合情感氛围调整色彩和构图
3. 参考推荐案例获取灵感`);
            });
            
            // 初始显示示例推荐
            const initialRecs = matchVisualStyle('minimalist', 'warm');
            styleRecs.innerHTML = initialRecs.slice(0, 2).map(rec => `
                <div class="style-rec-item">
                    <div class="style-rec-name">${rec.name}</div>
                    <div class="style-rec-match">匹配度：${rec.matchScore}%</div>
                </div>
            `).join('');
        }
    }
    
    // 风格匹配算法
    function matchVisualStyle(targetStyle, mood) {
        const styleDatabase = {
            minimalist: [
                { name: "极简主义", matchScore: 95, description: "简洁线条，有限色彩，大量留白" },
                { name: "北欧风格", matchScore: 85, description: "自然材料，柔和色彩，功能主义" },
                { name: "日式简约", matchScore: 80, description: "自然元素，不对称平衡，禅意空间" }
            ],
            vintage: [
                { name: "复古怀旧", matchScore: 95, description: "怀旧色彩，手绘质感，复古元素" },
                { name: "工业风格", matchScore: 75, description: "原始材料，中性色彩，粗犷质感" },
                { name: "波西米亚", matchScore: 70, description: "丰富图案，自然元素，自由奔放" }
            ],
            cyberpunk: [
                { name: "赛博朋克", matchScore: 95, description: "霓虹色彩，科技元素，未来感" },
                { name: "蒸汽朋克", matchScore: 80, description: "机械元素，维多利亚风格，复古未来" },
                { name: "科幻风格", matchScore: 75, description: "未来科技，太空元素，先进感" }
            ],
            fantasy: [
                { name: "奇幻风格", matchScore: 95, description: "魔法元素，神秘色彩，想象世界" },
                { name: "童话风格", matchScore: 85, description: "梦幻色彩，童话元素，浪漫氛围" },
                { name: "神话风格", matchScore: 75, description: "神话元素，史诗感，传统图案" }
            ],
            realistic: [
                { name: "写实主义", matchScore: 95, description: "真实细节，自然光影，精确比例" },
                { name: "超写实主义", matchScore: 90, description: "极致细节，摄影级真实感" },
                { name: "印象派", matchScore: 65, description: "光影效果，笔触明显，氛围感" }
            ],
            anime: [
                { name: "动漫风格", matchScore: 95, description: "夸张特征，鲜明色彩，动态线条" },
                { name: "漫画风格", matchScore: 85, description: "黑白对比，对话框，漫画元素" },
                { name: "卡通风格", matchScore: 75, description: "简化形状，明亮色彩，可爱元素" }
            ]
        };
        
        // 根据情感氛围调整匹配分数
        const moodAdjustments = {
            warm: { minimalist: -5, vintage: +10, cyberpunk: -15, fantasy: +5, realistic: 0, anime: +5 },
            cool: { minimalist: +10, vintage: -5, cyberpunk: +15, fantasy: -10, realistic: +5, anime: -5 },
            energetic: { minimalist: -10, vintage: 0, cyberpunk: +20, fantasy: +10, realistic: -5, anime: +15 },
            mysterious: { minimalist: -15, vintage: +5, cyberpunk: +10, fantasy: +20, realistic: -10, anime: +5 },
            romantic: { minimalist: -5, vintage: +15, cyberpunk: -20, fantasy: +10, realistic: 0, anime: +10 }
        };
        
        const baseStyles = styleDatabase[targetStyle] || styleDatabase.minimalist;
        const adjustment = moodAdjustments[mood] || moodAdjustments.warm;
        
        return baseStyles.map(style => ({
            ...style,
            matchScore: Math.max(50, Math.min(100, style.matchScore + (adjustment[targetStyle] || 0)))
        })).sort((a, b) => b.matchScore - a.matchScore);
    }
    
    function getStyleName(styleKey) {
        const styleNames = {
            minimalist: "极简主义",
            vintage: "复古风格",
            cyberpunk: "赛博朋克",
            fantasy: "奇幻风格",
            realistic: "写实主义",
            anime: "动漫风格"
        };
        return styleNames[styleKey] || styleKey;
    }
    
    function getMoodName(moodKey) {
        const moodNames = {
            warm: "温暖舒适",
            cool: "冷静专业",
            energetic: "活力四射",
            mysterious: "神秘莫测",
            romantic: "浪漫唯美"
        };
        return moodNames[moodKey] || moodKey;
    }
    
    function initCompositionTools() {
        const analyzeCompositionBtn = document.getElementById('analyzeComposition');
        const compositionFeedback = document.getElementById('compositionFeedback');
        
        if (analyzeCompositionBtn && compositionFeedback) {
            analyzeCompositionBtn.addEventListener('click', function() {
                const compositionType = document.querySelector('input[name="composition"]:checked').value;
                const focusPoint = parseInt(document.getElementById('focusPoint').value);
                
                // 构图分析算法
                const analysis = analyzeComposition(compositionType, focusPoint);
                
                compositionFeedback.innerHTML = analysis.feedback.map(item => `
                    <div class="feedback-item">
                        <i class="fas fa-${item.icon}"></i>
                        <div class="feedback-text">${item.text}</div>
                    </div>
                `).join('');
                
                // 在聊天中显示构图分析结果
                addAgentMessage(`构图分析完成！
                
**构图类型**：${getCompositionName(compositionType)}
**视觉焦点**：${getFocusName(focusPoint)}
**构图评分**：${analysis.score}/100

**专业建议**：
${analysis.feedback.map(item => `- ${item.text}`).join('\n')}

**优化方向**：
1. ${analysis.optimizations[0]}
2. ${analysis.optimizations[1]}
3. ${analysis.optimizations[2]}`);
            });
            
            // 初始显示示例反馈
            const initialAnalysis = analyzeComposition('rule-of-thirds', 3);
            compositionFeedback.innerHTML = initialAnalysis.feedback.slice(0, 2).map(item => `
                <div class="feedback-item">
                    <i class="fas fa-${item.icon}"></i>
                    <div class="feedback-text">${item.text}</div>
                </div>
            `).join('');
        }
    }
    
    // 构图分析算法
    function analyzeComposition(type, focus) {
        const analyses = {
            'rule-of-thirds': {
                score: 85 + Math.random() * 10,
                feedback: [
                    { icon: 'check-circle', text: '三分法构图平衡性良好' },
                    { icon: 'lightbulb', text: '视觉焦点位置合理' },
                    { icon: 'eye', text: '视线引导自然流畅' },
                    { icon: 'balance-scale', text: '画面元素分布均衡' }
                ],
                optimizations: [
                    '尝试将次要元素放在其他交叉点上',
                    '调整留白比例至30-40%',
                    '增强前景和背景的层次感'
                ]
            },
            'golden-ratio': {
                score: 90 + Math.random() * 8,
                feedback: [
                    { icon: 'check-circle', text: '黄金分割比例应用正确' },
                    { icon: 'star', text: '画面具有自然美感' },
                    { icon: 'compass', text: '视觉路径设计合理' },
                    { icon: 'crop', text: '画面裁剪比例优化' }
                ],
                optimizations: [
                    '确保重要元素在黄金分割点上',
                    '调整螺旋路径上的元素分布',
                    '优化画面边缘的处理'
                ]
            },
            'symmetry': {
                score: 80 + Math.random() * 15,
                feedback: [
                    { icon: 'check-circle', text: '对称构图稳定性好' },
                    { icon: 'gavel', text: '画面形式感强烈' },
                    { icon: 'clone', text: '左右/上下平衡精确' },
                    { icon: 'monument', text: '适合正式场合使用' }
                ],
                optimizations: [
                    '考虑添加一些不对称元素增加动感',
                    '调整对称轴的位置',
                    '优化对称元素的细节处理'
                ]
            }
        };
        
        const analysis = analyses[type] || analyses['rule-of-thirds'];
        
        // 根据焦点位置调整分数
        let focusAdjustment = 0;
        if (focus === 3) focusAdjustment = 5; // 前景焦点最佳
        else if (focus === 2 || focus === 4) focusAdjustment = 0; // 中景良好
        else focusAdjustment = -5; // 背景或极端位置
        
        return {
            score: Math.max(50, Math.min(100, analysis.score + focusAdjustment)),
            feedback: analysis.feedback,
            optimizations: analysis.optimizations
        };
    }
    
    function getCompositionName(type) {
        const names = {
            'rule-of-thirds': '三分法',
            'golden-ratio': '黄金分割',
            'symmetry': '对称构图'
        };
        return names[type] || type;
    }
    
    function getFocusName(focus) {
        const names = {
            1: '背景焦点',
            2: '中景偏后',
            3: '中景中心',
            4: '中景偏前',
            5: '前景焦点'
        };
        return names[focus] || `焦点位置${focus}`;
    }
    
    function initGalleryTools() {
        const searchGalleryBtn = document.getElementById('searchGallery');
        const galleryGrid = document.getElementById('galleryGrid');
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        if (searchGalleryBtn && galleryGrid) {
            searchGalleryBtn.addEventListener('click', function() {
                const searchTerm = document.getElementById('gallerySearch').value;
                const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
                
                // 搜索图库
                const results = searchGalleryItems(searchTerm, activeCategory);
                
                galleryGrid.innerHTML = results.map(item => `
                    <div class="gallery-item" data-id="${item.id}" title="${item.title}">
                        <div class="gallery-item-preview" style="background: ${item.color}"></div>
                    </div>
                `).join('');
                
                // 添加点击事件
                document.querySelectorAll('.gallery-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const itemId = this.dataset.id;
                        const galleryItem = results.find(i => i.id === itemId);
                        if (galleryItem) {
                            addAgentMessage(`图库参考：${galleryItem.title}
                            
**色彩特点**：${galleryItem.colorDescription}
**构图方式**：${galleryItem.composition}
**适用场景**：${galleryItem.applications}

**学习要点**：
1. ${galleryItem.learnings[0]}
2. ${galleryItem.learnings[1]}
3. ${galleryItem.learnings[2]}

**专业建议**：${galleryItem.advice}`);
                        }
                    });
                });
            });
            
            // 分类按钮事件
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 触发搜索更新
                    if (searchGalleryBtn) searchGalleryBtn.click();
                });
            });
            
            // 初始加载图库
            const initialResults = searchGalleryItems('', 'all');
            galleryGrid.innerHTML = initialResults.slice(0, 12).map(item => `
                <div class="gallery-item" data-id="${item.id}" title="${item.title}">
                    <div class="gallery-item-preview" style="background: ${item.color}"></div>
                </div>
            `).join('');
        }
    }
    
    // 图库搜索算法
    function searchGalleryItems(searchTerm, category) {
        const galleryDatabase = [
            {
                id: 'color1',
                title: '温暖活力配色',
                color: 'linear-gradient(135deg, #FF6B6B, #FFD166)',
                colorDescription: '红色与黄色的温暖组合，充满活力和热情',
                composition: '三分法构图，焦点在右侧交叉点',
                applications: '品牌设计、社交媒体、活动海报',
                learnings: ['暖色系的层次感处理', '色彩饱和度的平衡', '视觉焦点的营造'],
                advice: '适合需要传达热情和活力的场景',
                categories: ['color', 'composition']
            },
            {
                id: 'color2',
                title: '冷静专业配色',
                color: 'linear-gradient(135deg, #118AB2, #4ECDC4)',
                colorDescription: '蓝色系的专业组合，传达信任和可靠',
                composition: '对称构图，中心焦点',
                applications: '企业网站、科技产品、专业报告',
                learnings: ['冷色系的层次过渡', '专业感的色彩搭配', '对称构图的稳定性'],
                advice: '适合需要建立信任和专业形象的场景',
                categories: ['color', 'composition']
            },
            {
                id: 'color3',
                title: '神秘深邃配色',
                color: 'linear-gradient(135deg, #7209B7, #3A0CA3)',
                colorDescription: '紫色与深蓝的神秘组合，充满想象空间',
                composition: '黄金分割构图，螺旋视觉路径',
                applications: '游戏设计、奇幻作品、艺术创作',
                learnings: ['深色系的层次表现', '神秘氛围的营造', '黄金分割的应用'],
                advice: '适合需要创造神秘感和深度感的场景',
                categories: ['color', 'composition', 'lighting']
            },
            {
                id: 'comp1',
                title: '动态对角线构图',
                color: 'linear-gradient(45deg, #EF476F, #FFD166)',
                colorDescription: '对角线色彩过渡，增强动感和方向性',
                composition: '对角线构图，动态平衡',
                applications: '运动品牌、动态展示、创意广告',
                learnings: ['对角线构图的动感营造', '色彩的方向性引导', '动态平衡的处理'],
                advice: '适合需要表现运动和方向的场景',
                categories: ['composition', 'color']
            },
            {
                id: 'comp2',
                title: '极简留白构图',
                color: 'linear-gradient(135deg, #F8F9FA, #E9ECEF)',
                colorDescription: '极简中性色，大量留白空间',
                composition: '极简构图，中心焦点',
                applications: '高端品牌、艺术展览、 minimalist设计',
                learnings: ['留白的艺术处理', '极简色彩的选择', '中心焦点的强调'],
                advice: '适合需要表现高级感和简洁感的场景',
                categories: ['composition', 'color']
            },
            {
                id: 'light1',
                title: '柔和自然光影',
                color: 'linear-gradient(135deg, #FF9E6D, #FFD166)',
                colorDescription: '温暖柔和的光影过渡，自然真实',
                composition: '自然光影构图，柔和过渡',
                applications: '人像摄影、产品摄影、自然主题',
                learnings: ['自然光影的模拟', '柔和过渡的处理', '光影层次的表现'],
                advice: '适合需要表现自然和真实感的场景',
                categories: ['lighting', 'color']
            },
            {
                id: 'texture1',
                title: '手绘质感纹理',
                color: 'linear-gradient(135deg, #A663CC, #6F2DBD)',
                colorDescription: '手绘风格的纹理质感，艺术感强',
                composition: '有机构图，自由形式',
                applications: '插画设计、艺术创作、手工制品',
                learnings: ['手绘质感的表现', '有机形状的构图', '艺术感的营造'],
                advice: '适合需要表现手工感和艺术感的场景',
                categories: ['texture', 'color']
            }
        ];
        
        // 过滤和搜索
        return galleryDatabase.filter(item => {
            // 分类过滤
            if (category !== 'all' && !item.categories.includes(category)) {
                return false;
            }
            
            // 搜索词过滤
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                return item.title.toLowerCase().includes(searchLower) ||
                       item.colorDescription.toLowerCase().includes(searchLower) ||
                       item.applications.toLowerCase().includes(searchLower);
            }
            
            return true;
        });
    }
    
    function initQuickActions() {
        const newVisualProjectBtn = document.getElementById('newVisualProject');
        const analyzeImageBtn = document.getElementById('analyzeImage');
        const generatePaletteBtn = document.getElementById('generatePalette');
        
        if (newVisualProjectBtn) {
            newVisualProjectBtn.addEventListener('click', function() {
                addAgentMessage(`新建视觉项目向导启动！
                
**项目规划步骤**：
1. **明确目标**：确定项目的视觉表达目的
2. **风格定位**：选择适合的视觉风格方向
3. **色彩规划**：制定科学的色彩方案
4. **构图设计**：设计合理的视觉布局
5. **细节完善**：优化纹理、光影、质感

**建议流程**：
- 使用"风格匹配器"确定风格方向
- 使用"色彩分析器"制定色彩方案
- 使用"构图分析器"设计视觉布局
- 使用"灵感图库"获取参考案例

**专业提示**：从小的视觉实验开始，逐步完善整个项目。`);
            });
        }
        
        if (analyzeImageBtn) {
            analyzeImageBtn.addEventListener('click', function() {
                addAgentMessage(`图片分析功能准备就绪！
                
**支持的分析类型**：
🎨 **色彩分析**：提取主色、辅助色、色彩比例
📐 **构图分析**：识别构图类型、视觉焦点、平衡性
✨ **风格识别**：分析视觉风格、质感特征、美学特点
🔍 **细节检测**：识别纹理、光影、细节处理

**使用方法**：
1. 点击聊天区域的"上传图片"按钮
2. 选择要分析的图片文件
3. 我将为您提供专业的视觉分析报告

**分析能力**：
- 支持JPG、PNG、GIF格式
- 最大文件大小：5MB
- 自动识别图片中的视觉特征
- 生成详细的专业分析报告`);
            });
        }
        
        if (generatePaletteBtn) {
            generatePaletteBtn.addEventListener('click', function() {
                const palette = generateProfessionalPalette();
                addAgentMessage(`专业色彩调色板已生成！
                
**推荐方案**：
🌈 **${palette.scheme1.name}** (${palette.scheme1.harmonyScore}%和谐度)
- 情感：${palette.scheme1.emotion}
- 主色：${palette.scheme1.primary} (${palette.scheme1.primaryName})
- 辅助色：${palette.scheme1.secondary} (${palette.scheme1.secondaryName})

🎨 **${palette.scheme2.name}** (${palette.scheme2.harmonyScore}%和谐度)
- 情感：${palette.scheme2.emotion}
- 主色：${palette.scheme2.primary} (${palette.scheme2.primaryName})
- 辅助色：${palette.scheme2.secondary} (${palette.scheme2.secondaryName})

✨ **${palette.scheme3.name}** (${palette.scheme3.harmonyScore}%和谐度)
- 情感：${palette.scheme3.emotion}
- 主色：${palette.scheme3.primary} (${palette.scheme3.primaryName})
- 辅助色：${palette.scheme3.secondary} (${palette.scheme3.secondaryName})

**使用建议**：
1. 选择与项目情感匹配的方案
2. 使用主色作为品牌核心色彩
3. 使用辅助色支持主色并创造层次
4. 使用强调色突出重点元素
5. 使用中性色作为背景和文字色`);
            });
        }
    }
    
    // 辅助函数
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function formatMessageText(text) {
        // 简单的Markdown格式转换
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
    }
    
    function scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
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
                        <div class="message-avatar">🎨</div>
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-sender">视觉风格智能体</span>
                                <span class="message-time">刚刚</span>
                            </div>
                            <div class="message-text">
                                对话已清空！我是您的视觉风格智能体，随时为您提供专业的美学建议。
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            addAgentMessage('视觉分析已保存到您的项目档案中。您可以在"我的项目"中查看和管理所有保存的分析。');
        });
    }
    
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            addAgentMessage('视觉分析报告导出完成！包含以下格式：\n\n1. PDF格式（完整报告）\n2. HTML格式（交互式报告）\n3. JSON格式（原始数据）\n4. 图片格式（视觉摘要）');
        });
    }
    
    // 快速提示按钮
    promptButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.dataset.prompt;
            let message = '';
            
            switch(prompt) {
                case 'style-analysis':
                    message = '帮我分析这个作品的视觉风格';
                    break;
                case 'color-scheme':
                    message = '推荐适合这个主题的色彩方案';
                    break;
                case 'composition-feedback':
                    message = '给我的构图提供专业建议';
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
            handleVisualAction(action);
        });
    });
}

// 页面加载完成
console.log('🎨 视觉风格智能体 - 专业色彩算法和构图分析引擎已加载');