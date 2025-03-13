document.addEventListener('DOMContentLoaded', function() {
    // 头像预览功能
    const avatarInput = document.getElementById('id_avatar');
    const avatarPreview = document.querySelector('.avatar-large') || document.querySelector('.avatar-placeholder');
    
    if (avatarInput && avatarPreview) {
        avatarInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // 如果是 img 标签
                    if (avatarPreview.tagName === 'IMG') {
                        avatarPreview.src = e.target.result;
                    } 
                    // 如果是占位符 div
                    else {
                        // 创建新的 img 元素替换占位符
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = 'User Avatar';
                        img.className = 'avatar-large rounded-circle';
                        
                        avatarPreview.parentNode.replaceChild(img, avatarPreview);
                    }
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // 表单验证增强
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // 简单的客户端验证示例
            const emailInput = document.getElementById('id_email');
            if (emailInput && emailInput.value && !isValidEmail(emailInput.value)) {
                event.preventDefault();
                showValidationError(emailInput, '请输入有效的电子邮件地址');
            }
            
            const phoneInput = document.getElementById('id_phone');
            if (phoneInput && phoneInput.value && !isValidPhone(phoneInput.value)) {
                event.preventDefault();
                showValidationError(phoneInput, '请输入有效的电话号码');
            }
        });
    }
    
    // 电子邮件验证
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // 电话号码验证
    function isValidPhone(phone) {
        const re = /^[\d\+\-\(\) ]{7,15}$/;
        return re.test(phone);
    }
    
    // 显示验证错误
    function showValidationError(inputElement, message) {
        // 查找或创建错误消息容器
        let errorDiv = inputElement.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('text-danger')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'text-danger';
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
        
        // 设置错误消息
        errorDiv.innerHTML = `<small>${message}</small>`;
        
        // 添加错误样式
        inputElement.classList.add('is-invalid');
        
        // 焦点到错误字段
        inputElement.focus();
    }
});