document.addEventListener('DOMContentLoaded', function() {
    // 导航栏选项
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.feature-section');
    
    // 初始化显示第一个部分
    if (sections.length > 0) {
        sections[0].classList.add('active-section');
    }
    
    // 检查URL中是否有锚点，如果有则自动滚动到对应部分
    const checkHash = () => {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.replace('#', '');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 移除所有活动状态
                sections.forEach(section => {
                    section.classList.remove('active-section');
                });
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // 添加活动状态到目标部分
                targetSection.classList.add('active-section');
                
                // 激活对应的导航项
                const targetNavItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
                if (targetNavItem) {
                    targetNavItem.classList.add('active');
                }
                
                // 平滑滚动
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    };
    
    // 页面加载时检查锚点
    checkHash();
    
    // 处理导航项点击
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // 更新URL（不刷新页面）
            history.pushState(null, null, `#${targetId}`);
            
            // 移除所有活动状态
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // 添加活动状态
            document.getElementById(targetId).classList.add('active-section');
            this.classList.add('active');
            
            // 滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // 监听URL变化（如浏览器前进/后退按钮）
    window.addEventListener('popstate', checkHash);
    
    // 处理从其他页面传入的锚点参数
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    // 检查是否从联系页面跳转过来
    const section = getUrlParameter('section');
    if (section) {
        const targetSection = document.getElementById(`section-${section}`);
        const targetNavItem = document.querySelector(`.nav-item[data-target="section-${section}"]`);
        
        if (targetSection && targetNavItem) {
            // 移除所有活动状态
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // 添加活动状态
            targetSection.classList.add('active-section');
            targetNavItem.classList.add('active');
            
            // 更新URL
            history.replaceState(null, null, `#section-${section}`);
        }
    }
    
    // 实现导航栏随页面滚动的动态高亮效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // 仅在页面滚动时才进行这个检查
        if (scrollPosition > 100) {
            // 获取当前可视区域中心点
            const viewportCenter = scrollPosition + (windowHeight / 2);
            
            // 检查哪个部分正处于中心位置
            let currentSection = null;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (viewportCenter >= sectionTop && 
                    viewportCenter <= (sectionTop + sectionHeight) && 
                    section.classList.contains('active-section')) {
                    currentSection = section.id;
                }
            });
            
            // 更新导航栏高亮
            if (currentSection) {
                navItems.forEach(item => {
                    if (item.getAttribute('data-target') === currentSection) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        }
    });
});

// 添加平滑效果，实现动态跳转
document.addEventListener('click', function(e) {
    // 检查是否点击的是需要平滑跳转的链接
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === 'needs-intro.html') {
        e.preventDefault();
        // 保存当前页面URL
        const currentPage = window.location.href;
        
        // 模拟页面转场效果
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            // 跳转到功能介绍页面
            window.location.href = 'introduction.html?from=contact';
        }, 500);
    }
});

// 检测是否是从联系页面跳转过来
window.addEventListener('load', function() {
    const fromContact = new URLSearchParams(window.location.search).get('from');
    if (fromContact === 'contact') {
        // 添加淡入效果
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
    }
});