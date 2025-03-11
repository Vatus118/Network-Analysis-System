// ... existing code ...

// 添加平滑效果，实现动态跳转
document.addEventListener('click', function(e) {
    // 检查是否点击的是需要平滑跳转的链接
    if (e.target.classList.contains('contact-button') || 
        (e.target.tagName === 'A' && e.target.getAttribute('href') === 'login.html')) {
        e.preventDefault();
        
        // 模拟页面转场效果
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            document.body.style.opacity = '0';
        }, 10);
        
        setTimeout(function() {
            // 跳转到联系页面
            window.location.href = e.target.getAttribute('href') + '?from=introduction';
        }, 500);
    }
});

// 检测是否是从login页面跳转过来
window.addEventListener('load', function() {
    const fromLogin = new URLSearchParams(window.location.search).get('from');
    if (fromLogin === 'login') {
        // 添加淡入效果
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
    }
});

// ... existing code ...