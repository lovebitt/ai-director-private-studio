// 视觉风格智能体 - 基础功能
console.log('🎨 视觉风格智能体初始化...');

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
    
    // 快速动作按钮
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.id;
            alert(`视觉风格智能体：${action} 功能开发中...`);
        });
    });
    
    console.log('✅ 视觉风格智能体初始化完成');
});