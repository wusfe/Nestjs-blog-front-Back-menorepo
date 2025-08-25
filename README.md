# Next.js training scenarios and exercises
_Exported on 8/15/2025 at 16:48:59 GMT+8 from Cursor (1.0.0)_


## 项目概述
**智能博客管理系统** - 使用Next.js 14 + Nest.js + MySQL + TypeORM的完整博客系统

## 技术栈
- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Nest.js + TypeScript + TypeORM
- **数据库**: MySQL
- **认证**: JWT + 中间件
- **文件上传**: 本地存储

## 核心功能模块

### 1. 用户系统 (30分钟)
- 用户注册/登录
- JWT认证
- 角色权限 (管理员/普通用户)
- 用户资料管理

### 2. 文章管理系统 (45分钟)
- 文章CRUD操作
- 富文本编辑器
- 文章分类和标签
- 文章状态管理 (草稿/发布)
- 文章搜索功能

### 3. 评论系统 (30分钟)
- 评论发布和回复
- 评论审核
- 评论嵌套显示
- 评论通知

### 4. 文件管理 (20分钟)
- 图片上传
- 文件存储管理
- 图片压缩和优化
- 文件删除

### 5. 前端展示 (40分钟)
- 响应式博客首页
- 文章详情页
- 分类和标签页面
- 搜索页面
- 用户中心

### 6. 管理后台 (30分钟)
- 数据统计面板
- 用户管理
- 文章审核
- 评论管理
- 系统设置

## 技术要点覆盖

### Next.js 14 核心特性
- App Router 路由系统
- 服务端组件 (RSC)
- 客户端组件
- 动态路由 `[id]`
- 中间件 (middleware)
- API Routes
- 静态生成 (SSG)
- 服务端渲染 (SSR)
- 图片优化 (next/image)
- 字体优化 (next/font)

### Nest.js + TypeORM 核心特性
- 控制器 (Controllers)
- 服务 (Services)
- 中间件 (Middleware)
- 守卫 (Guards)
- 拦截器 (Interceptors)
- 管道 (Pipes)
- 装饰器 (Decorators)
- 依赖注入 (DI)
- 模块化架构
- 异常过滤器
- 验证管道
- **TypeORM实体设计**
- **数据库关系映射**
- **查询构建器**
- **事务管理**
- **数据库迁移**

## 项目结构

### 前端 (Next.js)
```
blog-frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── blog/
│   │   ├── api/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   └── types/
```

### 后端 (Nest.js + TypeORM)
```
blog-backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── guards/
│   │   └── strategies/
│   ├── users/
│   │   ├── entities/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── posts/
│   │   ├── entities/
│   │   ├── posts.controller.ts
│   │   ├── posts.service.ts
│   │   └── posts.module.ts
│   ├── comments/
│   │   ├── entities/
│   │   ├── comments.controller.ts
│   │   ├── comments.service.ts
│   │   └── comments.module.ts
│   ├── files/
│   │   ├── entities/
│   │   ├── files.controller.ts
│   │   ├── files.service.ts
│   │   └── files.module.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── app.module.ts
│   └── main.ts
├── typeorm.config.ts
└── package.json
```

## 数据库设计 (TypeORM实体)

### 核心实体关系
1. **User** - 用户表
2. **Post** - 文章表
3. **Category** - 分类表
4. **Tag** - 标签表
5. **Comment** - 评论表
6. **File** - 文件表

### 关系映射
- User ↔ Post (一对多)
- Post ↔ Category (多对一)
- Post ↔ Tag (多对多)
- Post ↔ Comment (一对多)
- User ↔ Comment (多对一)
- Post ↔ File (一对多)

## 开发时间分配

### 第一阶段：项目搭建 (20分钟)
1. 创建Next.js项目
2. 创建Nest.js项目
3. 配置MySQL和TypeORM
4. 设置开发环境

### 第二阶段：后端API开发 (60分钟)
1. **TypeORM实体设计** (15分钟)
2. **用户认证模块** (15分钟)
3. **文章管理模块** (15分钟)
4. **分类管理模块** (15分钟)
5. **标签管理模块** (15分钟)
6. **评论系统模块** (15分钟)
7. **文件上传模块** (15分钟)

### 第三阶段：前端开发 (60分钟)
1. 认证页面 (15分钟)
2. 博客展示页面 (20分钟)
3. 管理后台 (20分钟)
4. 响应式设计 (5分钟)

### 第四阶段：集成测试 (20分钟)
1. API测试
2. 前后端联调
3. 功能验证
4. 性能优化

## TypeORM 学习要点

### 实体设计
- 装饰器语法 (@Entity, @Column, @PrimaryGeneratedColumn)
- 关系映射 (@OneToMany, @ManyToOne, @ManyToMany)
- 索引和约束
- 继承和抽象

### 数据库操作
- Repository模式
- QueryBuilder使用
- 事务管理
- 数据库迁移
- 连接池配置

### 高级特性
- 软删除
- 审计字段
- 数据验证
- 缓存策略

## 学习目标

### Next.js 掌握要点
- 理解App Router vs Pages Router
- 掌握服务端组件和客户端组件的使用场景
- 学会动态路由和API路由
- 理解SSR、SSG、ISR的区别
- 掌握中间件的使用

### Nest.js + TypeORM 掌握要点
- 理解装饰器模式
- 掌握依赖注入原理
- 学会模块化设计
- 理解中间件、守卫、拦截器的作用
- 掌握异常处理和验证
- **TypeORM实体设计**
- **数据库关系映射**
- **查询优化**
- **事务管理**

## 扩展功能 (可选)
如果时间充裕，可以添加：
1. 实时通知 (WebSocket)
2. 缓存系统 (Redis)
3. 邮件服务
4. 第三方登录
5. 移动端适配

## 部署准备
- Vercel部署前端
- Railway/Heroku部署后端
- MySQL数据库配置
- 环境变量配置

这个项目将让您在2-3小时内：
1. 掌握Next.js 14的所有核心用法
2. 熟悉Nest.js的完整开发流程
3. **精通TypeORM的实体设计和数据库操作**
4. 理解前后端分离架构
5. 学会数据库设计和API设计
6. 掌握现代Web开发的最佳实践

您准备好开始这个TypeORM版本的速成项目了吗？我可以为您提供详细的开发步骤和代码实现。

## 你学到了什么

### 后端

- 全局管道
- 路由守卫


#### 路由执行流程里大概

Middleware → Guard → Interceptor(before) → Pipe → Controller → Service
                                    ↑
                           Interceptor(after)

#### 路由守卫
A 先执行路由守卫 -> 判断库中是否存在该用户 B
B 不存在 -> 提示未授权
B 存在 -> 生成jwt Token C
C  -> 返回前端 D



