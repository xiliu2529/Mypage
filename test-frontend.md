# 前端测试指南

## 启动前端开发服务器

```bash
cd Mypage
npm run dev
```

前端将在 http://localhost:5173 启动

## 测试功能

### 1. 用户认证
- 访问登录页面
- 测试用户注册和登录功能

### 2. 文章管理
- 登录后进入用户页面
- 点击"写作"按钮创建文章
- 使用富文本编辑器编写内容
- 发布文章并查看效果

### 3. 文章列表
- 查看已发布的文章列表
- 点击文章查看详情
- 测试文章编辑和删除功能

### 4. API集成测试
- 打开浏览器开发者工具
- 查看Network标签页
- 验证API请求是否正常发送

## 后端API连接测试

### 1. 确保后端服务运行
```bash
# 在另一个终端窗口
cd backend/Mypage-spring-backend
./mvnw spring-boot:run
```

### 2. 测试API连接
- 前端会自动尝试连接后端API
- 如果连接失败，会回退到localStorage
- 查看控制台日志了解连接状态

### 3. 手动测试API
```bash
# 测试健康检查
curl http://localhost:8080/api/ping

# 测试用户注册
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'

# 测试用户登录
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

## 数据同步测试

### 1. API模式
- 后端服务运行时，数据存储在PostgreSQL数据库
- 数据在不同浏览器/设备间同步

### 2. 回退模式
- 后端服务不可用时，数据存储在localStorage
- 数据仅在当前浏览器中保存

### 3. 模式切换
- 停止后端服务，前端会自动切换到localStorage模式
- 重启后端服务，前端会自动切换回API模式

## 性能测试

### 1. 富文本编辑器
- 测试大量文本的编辑性能
- 验证工具栏功能
- 测试图片和链接插入

### 2. 文章列表
- 测试大量文章的加载性能
- 验证分页和搜索功能

### 3. 响应式设计
- 在不同屏幕尺寸下测试布局
- 验证移动端适配

## 错误处理测试

### 1. 网络错误
- 断开网络连接测试
- 模拟API服务器错误

### 2. 数据验证
- 提交空文章
- 提交超长标题或内容
- 测试特殊字符处理

### 3. 认证错误
- 使用过期token访问API
- 测试未授权访问

## 调试工具

### 1. 浏览器开发者工具
- Console: 查看日志和错误
- Network: 监控API请求
- Application: 检查localStorage

### 2. 测试数据库功能
在浏览器控制台运行：
```javascript
// 测试数据库功能
testDatabase()
```

### 3. 手动API测试
```javascript
// 在控制台手动测试API
articleService.getArticles().then(console.log)
```