# 🌟 GitHub Name Card Generate

## 项目简介

**GitHub Name Card Generate** 是一个基于 **Express.js** 的应用程序，旨在为用户生成个性化的 GitHub 用户卡片。无论是展示个人项目还是分享你的开发经历，这款工具都能帮助你轻松创建美观的名片，便于分享和展示。

## 🚀 特性

- **用户友好界面**：简洁直观的设计，让每个人都能轻松上手。
- **GitHub 登录**：通过 GitHub 进行身份验证，确保信息的准确性和安全性。
- **Vercel 部署**：支持一键部署到 Vercel，让你的应用随时在线。
- **自定义样式**：用户可以根据个人喜好定制卡片的外观，展现独特风格。

## 🛠️ 技术栈

- **Node.js**：后端服务使用 **Express.js** 框架构建。
- **GitHub API**：利用 GitHub API 获取用户信息，展示在卡片上。
- **Vercel**：用于无缝部署和托管应用程序。

## 🔑 配置 API 密钥

在使用 GitHub API 之前，你需要配置自己的 API 密钥：

1. 登录你的 [GitHub 账号](https://github.com)。
2. 前往 **Settings** > **Developer settings** > **Personal access tokens**。
3. 点击 **Generate new token**，选择所需的权限（例如 `public_repo`）。
4. 复制生成的令牌。

然后，在项目中创建一个 `.env` 文件，并添加以下内容：

```
GITHUB_TOKEN=你的API密钥
```

## 📦 安装与使用

1. **克隆项目到本地**：
   ```bash
   git clone https://github.com/yourusername/github-name-card-generate.git
   cd github-name-card-generate
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **启动应用**：
   ```bash
   npm start
   ```

4. **打开浏览器，访问** `http://localhost:3000`。

## ☁️ 部署到 Vercel

1. 登录 **Vercel** 账号。
2. 点击 **New Project**，选择你的 GitHub 仓库。
3. 按照提示完成部署，轻松上线你的应用。

## 🤝 贡献

欢迎任何形式的贡献！无论是提交问题、功能请求，还是直接提交 Pull Request，您的参与都将使这个项目更完美。

## 📄 许可证

该项目采用 **MIT 许可证**，详细信息请查看 [LICENSE](LICENSE) 文件。

---

希望这个项目能够帮助你更好地展示你的 GitHub 个人资料，展现你的开发魅力！✨
