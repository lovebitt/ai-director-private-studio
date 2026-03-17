// DreamAI专家智能体 - 基础功能
console.log('🤖 DreamAI专家智能体初始化...');

document.addEventListener('DOMContentLoaded', function() {
    // 导航切换
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
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
            }
        });
    });
    
    // 预设卡片点击
    const presetCards = document.querySelectorAll('.preset-card');
    presetCards.forEach(card => {
        card.addEventListener('click', function() {
            const preset = this.dataset.preset;
            alert(`DreamAI专家：已选择 ${preset} 预设`);
        });
    });
    
    // 工具按钮
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tool = this.dataset.tool;
            alert(`DreamAI专家：${tool} 工具启动中...`);
        });
    });
    
    console.log('✅ DreamAI专家智能体初始化完成');
});