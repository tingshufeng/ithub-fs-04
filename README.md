---
target:
---

# Node.js 第6天课程笔记

## 知识点

- 综合案例

---

## 复习

- 中间件
  + 切面
- 文件操作路径
  + 文件操作路径中的相对路径永远是相对于执行 node 命令所处路径
  + `__dirname` 属性，动态的获取当前文件模块所属目录的绝对路径
  + 可以利用 `__dirname` 拼接处想要的动态的绝对路劲
  + 建议：凡是涉及到文件操作的相对路径，最好都转换成动态的绝对路径
  + 注意：模块标识路径和文件操作的路径没有一毛钱关系
- path 模块
  + 处理路径的模块
  + path.join()
- 统一错误处理中间件
- 使用中间件进行权限控制
- app.locals
- jQuery form Plugin 使用
- 404 中间件
- 补充第三方中间件

---

## 反馈

---

## 上午总结

- 404 中间件
- 补充第三方中间件
  + morgan
  + serve-index
  + compression
  + responseTime
- Session 数据持久化
  + mysql
  + MongoDB
  + Redis
  + memcached
  + ...

---

## 下午总结

---

## 总结

---

## 反馈目标
