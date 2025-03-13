// 设置 Bootstrap 工具提示
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // 设置警告框自动消失
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000); // 5秒后关闭
    });
    
    // 为返回顶部按钮添加滚动事件
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
    
    // 初始化移动导航关闭
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, {toggle: false}) : null;
    
    if (bsCollapse && navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    bsCollapse.toggle();
                }
            });
        });
    }
});