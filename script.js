// AI导演工作室 - 交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initNavigation();
    initEditor();
    initAnimations();
    initAgentStatus();
    
    console.log('🎬 AI导演工作室已加载');
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
            }
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
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
    
    // 滚动时更新活动链接
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// 编辑器功能
function initEditor() {
    const scriptEditor = document.getElementById('scriptEditor');
    const previewMode = document.getElementById('previewMode');
    const previewContent = document.getElementById('previewContent');
    
    if (scriptEditor) {
        // 实时预览更新
        scriptEditor.addEventListener('input', function() {
            updatePreview(this.value);
        });
        
        // 初始预览
        updatePreview(scriptEditor.value);
    }
    
    if (previewMode) {
        previewMode.addEventListener('change', function() {
            updatePreviewMode(this.value);
        });
    }
}

function updatePreview(text) {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;
    
    // 简单的Markdown解析
    let html = '';
    const lines = text.split('\n');
    
    lines.forEach(line => {
        line = line.trim();
        
        if (line.startsWith('# ')) {
            html += `<h4>${line.substring(2)}</h4>`;
        } else if (line.startsWith('**') && line.endsWith('**')) {
            const content = line.substring(2, line.length - 2);
            if (content.includes(':')) {
                const [key, value] = content.split(':').map(s => s.trim());
                html += `<p><strong>${key}</strong>: ${value}</p>`;
            } else {
                html += `<p><strong>${content}</strong></p>`;
            }
        } else if (line.includes('(') && line.includes(')')) {
            // 对话行
            html += `<p><strong>对话</strong>: "${line}"</p>`;
        } else if (line) {
            html += `<p>${line}</p>`;
        }
    });
    
    previewContent.innerHTML = html + `
        <div class="preview-action">
            <button class="btn btn-primary" onclick="generateImage()">
                <i class="fas fa-magic"></i> 生成场景图片
            </button>
        </div>
    `;
}

function updatePreviewMode(mode) {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;
    
    switch(mode) {
        case 'image':
            previewContent.innerHTML = `
                <div class="image-preview">
                    <div class="image-placeholder">
                        <i class="fas fa-image fa-3x"></i>
                        <p>图片生成预览</p>
                        <p class="text-sm">点击"生成场景图片"按钮开始</p>
                    </div>
                </div>
            `;
            break;
        case 'storyboard':
            previewContent.innerHTML = `
                <div class="storyboard-preview">
                    <h4>分镜预览</h4>
                    <div class="storyboard-grid">
                        <div class="storyboard-frame">
                            <div class="frame-number">1</div>
                            <div class="frame-content">远景</div>
                        </div>
                        <div class="storyboard-frame">
                            <div class="frame-number">2</div>
                            <div class="frame-content">中景</div>
                        </div>
                        <div class="storyboard-frame">
                            <div class="frame-number">3</div>
                            <div class="frame-content">特写</div>
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            // 文本模式，使用当前编辑器内容
            const scriptEditor = document.getElementById('scriptEditor');
            if (scriptEditor) {
                updatePreview(scriptEditor.value);
            }
    }
}

// 生成图片功能
function generateImage() {
    const scriptEditor = document.getElementById('scriptEditor');
    const previewContent = document.getElementById('previewContent');
    
    if (!scriptEditor || !previewContent) return;
    
    const prompt = scriptEditor.value.split('\n')[0] || '梦境侦探场景';
    
    // 显示加载状态
    previewContent.innerHTML = `
        <div class="generating">
            <div class="spinner"></div>
            <p>正在生成图片...</p>
            <p class="text-sm">提示词: "${prompt}"</p>
        </div>
    `;
    
    // 模拟API调用
    setTimeout(() => {
        const imageUrl = `https://picsum.photos/600/400?random=${Date.now()}`;
        previewContent.innerHTML = `
            <div class="image-result">
                <h4>生成结果</h4>
                <img src="${imageUrl}" alt="生成的图片" class="generated-image">
                <div class="image-info">
                    <p><strong>提示词</strong>: ${prompt}</p>
                    <p><strong>生成时间</strong>: ${new Date().toLocaleTimeString()}</p>
                </div>
                <div class="image-actions">
                    <button class="btn btn-sm" onclick="regenerateImage()">
                        <i class="fas fa-redo"></i> 重新生成
                    </button>
                    <button class="btn btn-sm" onclick="downloadImage('${imageUrl}')">
                        <i class="fas fa-download"></i> 下载
                    </button>
                </div>
            </div>
        `;
    }, 2000);
}

function regenerateImage() {
    generateImage();
}

function downloadImage(url) {
    // 在实际应用中，这里应该调用真实的下载API
    alert('下载功能需要后端API支持。在实际部署中，这里会调用OpenClaw API下载图片。');
}

// 动画初始化
function initAnimations() {
    // 观察器配置
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .work-card, .agent-card').forEach(el => {
        observer.observe(el);
    });
}

// 智能体状态模拟
function initAgentStatus() {
    const agentItems = document.querySelectorAll('.agent-item');
    
    // 模拟状态变化
    setInterval(() => {
        agentItems.forEach(item => {
            if (Math.random() > 0.7) {
                const dot = item.querySelector('.status-dot');
                if (dot) {
                    const isActive = dot.classList.contains('active');
                    dot.classList.toggle('active', !isActive);
                    
                    // 添加动画效果
                    dot.style.animation = 'pulse 1s';
                    setTimeout(() => {
                        dot.style.animation = '';
                    }, 1000);
                }
            }
        });
    }, 5000);
}

// 添加脉冲动画
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }
    
    .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #6366f1;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .generating {
        text-align: center;
        padding: 2rem;
    }
    
    .generated-image {
        width: 100%;
        border-radius: 0.5rem;
        margin: 1rem 0;
    }
    
    .image-info {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
    }
    
    .image-actions {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }
    
    .text-sm {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .storyboard-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .storyboard-frame {
        background: white;
        border: 2px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        text-align: center;
    }
    
    .frame-number {
        font-weight: bold;
        color: #6366f1;
        margin-bottom: 0.5rem;
    }
    
    .image-placeholder {
        text-align: center;
        padding: 3rem;
        color: #9ca3af;
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