document.addEventListener('DOMContentLoaded', function() {
    // 获取功能介绍链接元素
    const introLink = document.getElementById('viewIntroduction');
    
    // 添加点击事件监听器
    if (introLink) {
        introLink.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认跳转行为
            
            // 获取目标URL
            const targetUrl = this.getAttribute('href');
            
            // 创建淡出效果
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease';
            
            // 开始淡出动画
            setTimeout(function() {
                document.body.style.opacity = '0';
            }, 10);
            
            // 等待动画完成后跳转
            setTimeout(function() {
                window.location.href = targetUrl + '?from=login';
            }, 500);
        });1
    }
    
    // 检查是否是从introduction页面返回
    const fromIntro = new URLSearchParams(window.location.search).get('from');
    if (fromIntro === 'introduction') {
        // 添加淡入效果
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
    }
});