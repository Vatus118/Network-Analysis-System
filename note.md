# Django 用户管理系统功能实现逻辑

## 1. 用户模型系统

### User 和 UserProfile 模型

- **User 模型**：继承自 Django 的 `AbstractUser`，做了几个关键修改：
  - 将 email 设为唯一且作为登录标识 (`USERNAME_FIELD = 'email'`)
  - 添加了头像字段 (`avatar`)
  - 自定义了用户管理器 (`UserManager`)

- **UserProfile 模型**：创建了一对一关系的扩展个人资料：
  - 与 User 通过 `OneToOneField` 关联
  - 包含额外信息如个人简介、电话、地址
  - 这种设计将主要身份信息 (User) 与扩展信息 (UserProfile) 分离，便于管理

### UserManager

自定义用户管理器处理用户创建逻辑：

- `create_user`：普通用户创建
- `create_superuser`：管理员创建，设置权限标志

---

## 2. 表单系统

使用四个主要表单：

- **UserRegistrationForm**：
  - 继承自 Django 的 `UserCreationForm`
  - 处理用户注册，包含用户名、邮箱和密码字段
  - 重写 `save()` 方法自动创建关联的 `UserProfile`

- **UserLoginForm**：
  - 继承自 `AuthenticationForm`，将登录字段改为邮箱
  - 自定义字段属性改善用户体验

- **UserProfileForm**：
  - 管理个人资料的补充信息

- **UserUpdateForm**：
  - 处理用户基本信息更新

---

## 3. 视图系统

视图层实现了完整的用户生命周期管理：

### 注册流程 (`register_view`)：
1. 处理表单提交
2. 验证用户输入
3. 创建用户并自动登录
4. 重定向到仪表板

### 登录流程 (`login_view`)：
1. 接收邮箱和密码
2. 使用 `authenticate` 验证凭据
3. 成功时创建会话并重定向

### 个人资料管理 (`profile_view`)：
1. 同时处理两个表单：用户信息和扩展资料
2. 实现并保存
3. 使用 `@login_required` 装饰器确保只有已登录用户能访问

### 用户列表与详情：
- 提供查看其他用户信息的功能

---

## 4. URL 路由系统

URL 路由将 URL 模式映射到对应视图：

- 使用了 Django 的命名 URL 模式，便于在模板中引用
- 包含了所有用户管理的入口点
- 支持带参数的 URL（如用户详情页）

---

## 5. 模板组织

模板层采用了继承结构：

- `base.html` 提供通用布局和骨架结构
- 各功能模块继承基础模板，只需填写内容区域
- 分组管理，便于查找和维护

---

## 6. 信号系统

使用 Django 信号机制确保数据一致性：

- 当创建 User 实例时自动创建关联的 `UserProfile`
- 当 User 更新时同步更新 `UserProfile`

---

## 7. 权限与安全

- 使用 `@login_required` 装饰器保护敏感视图
- 在 admin 界面中自定义用户管理
- 用户安全由 Django 内置系统处理

---

## 8. 配置集成

- 自定义用户模型 (`AUTH_USER_MODEL`)
- 重定向设置 (`LOGIN_REDIRECT_URL` 等)
- 媒体文件处理（用于头像）
- 消息框架配置（用于通知）

---

## 流程示例

### 用户注册流程：
1. 用户访问注册页面，视图返回 `register.html` 与 `UserRegistrationForm`
2. 用户填写表单并提交
3. `register_view` 验证表单：
   - 若有效：创建 User，通过信号创建 `UserProfile`，自动登录，重定向到仪表板
   - 若无效：返回表单与错误信息

### 个人资料更新流程：
1. 已登录用户访问个人资料页面
2. `profile_view` 返回两个预填充表单：`UserUpdateForm` 和 `UserProfileForm`
3. 用户修改表单并提交
4. 视图验证两个表单：
   - 若有效：保存两个表单，显示成功消息
   - 若无效：返回表单与错误信息
