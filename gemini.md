Gemini-CLI 终极使用教程：从入门到精通 (完整版)
欢迎来到 Gemini-CLI 的世界！这不仅仅是一个命令行工具，更是一个与您的开发环境深度集成的 AI 编程伙伴。本教程将引导您从零开始，逐步掌握其全部功能，释放其最大潜力。

前言：为什么选择 Gemini-CLI？
在众多 AI 工具中，Gemini-CLI 凭借其独特的设计理念脱颖而出：

终端原生: 它直接生活在您最熟悉的开发环境——终端中，无需切换窗口，实现沉浸式工作流。

上下文感知: 通过 @ 命令和 GEMINI.md 文件，它能深刻理解您的项目结构和编码规范。

强大的工具集: 它不仅能聊天，还能读写文件、执行命令、搜索网络，像一个真正的助理一样执行任务。

高度可扩展: 支持自定义命令，您可以根据自己的需求，打造专属的自动化工具。

第一部分：安装与初次启动
1. 环境准备
在安装前，请确保您的系统已安装 Node.js (推荐 v20 或更高版本) 和 npm。您可以在终端运行 node -v 和 npm -v 来检查。

2. 全局安装
打开您的终端，运行以下命令进行全局安装：

npm install -g @google/gemini-cli

3. 首次运行与认证
安装成功后，在终端输入 gemini 并按回车。首次运行时，它会引导您完成认证：

选择认证方式，推荐 "Login with Google"。

您的浏览器将自动打开一个 Google 登录和授权页面。

完成授权后，返回终端，您就可以开始与 Gemini 对话了。

第二部分：核心交互模式
在深入了解具体的 / 命令之前，您需要掌握与 Gemini-CLI 交互的三种基本方式：

自然语言提示 (Natural Language Prompts)
这是最基础的交互方式。直接输入您的问题或指令，就像聊天一样。

请帮我用 Python 写一个快速排序算法。

@ 命令：文件/目录上下文注入
使用 @ 符号，可以将本地文件或整个目录的内容作为上下文提供给 Gemini。这是其理解项目背景的关键。

请根据 @./src/utils.js 文件中的代码风格，为这个新函数添加注释。

! 命令：直接执行 Shell 命令
使用 ! 符号，可以直接在 CLI 内部执行任何终端命令，无需退出。

!git status

第三部分：斜杠(/)命令终极解析 (深度详解版)
斜杠 (/) 命令是控制和管理 Gemini-CLI 的核心。下面是对每个命令的详细剖析。

一、 会话与历史管理 (Session & History)
/chat: 管理对话会话的生命周期。

/chat save <tag>: 保存当前完整的对话状态。

/chat resume <tag>: 恢复一个之前保存的对话。

/chat list**: 列出所有已保存的会话标签。

/chat clear: 清空当前对话的历史记录**。

/history: 查看当前会話的详细历史记录。

/compress: 将当前冗长的对话历史压缩成一个简洁的摘要，以节省 Token。

/clear: 清空终端屏幕（视觉操作，不影响会话数据）。

/copy: 将 Gemini 的上一个回答完整地复制到您的系统剪贴板中。

/restore: 撤销由工具对项目所做的更改（需在启动时使用 --checkpointing 标志）。

/quit 或 /exit: 退出 Gemini-CLI 交互式会话。

二、 上下文与记忆管理 (Context & Memory)
/memory: 管理从 GEMINI.md 文件中加载的长期记忆。

/memory show**: 显示当前所有已加载的 GEMINI.md 文件内容。

/memory refresh**: 重新加载所有记忆文件，让更改立即生效。

/memory add "<text>": 临时向当前会话的记忆中添加**一段文本指令。

/context: 查看当前完整的上下文。

/context show**: 这是一个强大的调试工具，它会显示即将发送给模型的所有信息。

/directory: 管理工作区目录。与 /path 类似，用于指定和切换 Gemini-CLI 的工作环境。

三、 工具与集成 (Tools & Integrations)
/tools: 列出当前会话所有可用的工具及其状态（启用/禁用）。

/extensions: 列出当前活动的扩展。扩展可以为 Gemini-CLI 增加新的功能和工具。

/init: 分析当前项目并创建一个量身定制的 GEMINI.md 文件。这是一个非常有用的命令，它会自动扫描您的代码库，识别技术栈和编码规范，并生成一个初始的记忆文件作为起点。

/mcp: 管理与模型上下文协议 (MCP) 服务器的连接，用于和 IDE 等外部应用集成。

/ide: 控制与 IDE 的集成功能。

/ide enable: 启用集成。

/ide disable: 禁用集成。

/setup-github: 帮助您在当前的 Git 仓库中配置 Gemini-CLI 的 GitHub Actions 工作流。

/yolo: "You Only Look Once" 模式。启用后，工具执行无需手动确认，会自动批准。请谨慎使用。

四、 配置与信息 (Configuration & Info)
/help 或 /?: 显示所有可用的斜杠命令及其简要说明。

/about: 显示 Gemini-CLI 的版本号和相关的官方链接。

/auth: 管理您的身份验证方式。

/bug: 引导您报告一个 Bug。

/docs: 在您的默认浏览器中打开 Gemini-CLI 的官方完整文档页面。

/editor: 设置当 Gemini 需要打开文件时使用的默认命令行编辑器。

/feedback: 提供一个快速的渠道来提交关于 Gemini-CLI 使用体验的反馈。

/log: 显示日志文件的路径，或者直接输出最新的日志内容。

/privacy: 显示隐私政策声明。

/settings: 打开全局 settings.json 配置文件，或者显示其路径。

/stats: 显示当前会话的详细统计数据。

/theme: 更改 CLI 界面的颜色主题。

/terminal-setup: 配置终端快捷键，以支持多行输入（尤其适用于 VS Code 的集成终端）。

五、 特殊模式与切换 (Special Modes & Toggles)
/corgi: 切换 Corgi 模式。这是一个有趣的彩蛋功能，开启后可能会在交互中出现一些与柯基犬相关的趣味内容。

/vim: 开启或关闭 Vim 模式。对于 Vim 用户来说，这允许您在输入提示时使用熟悉的 Vim 快捷键进行文本编辑。

第四部分：高级技巧与工作流
1. 代码调试工作流
使用 @/path/to/file.py 载入问题代码。

提问：“分析这段代码可能出现的 IndexError 异常，并给出修复建议。”

使用 !pytest tests/ 运行相关测试。

让 Gemini 直接生成修复后的代码，并使用 /copy 粘贴。

2. 自动化文档生成
在项目根目录创建 GEMINI.md，写入指令：“所有文档需为 Markdown 格式，包含代码示例。”

运行 /memory refresh 加载指令。

提问：“请为 @./src/ 目录下的所有模块生成 API 文档。”

第五部分：深度自定义
1. 配置 settings.json
运行 /settings 找到并打开配置文件。

修改默认模型: "model": "gemini-1.5-pro-latest"

调整创造性: "temperature": 0.8

禁用危险工具: "tools": { "shell": { "execute": false } }

2. 创建自定义斜杠命令
找到您的命令目录（通常是 ~/.gemini/commands）。

在该目录下创建一个名为 deploy 的可执行脚本文件（例如 Bash 脚本）。

脚本内容 (deploy):

#!/bin/bash
echo "🚀 开始部署项目..."
# 在此添加您的部署命令，例如：
# gcloud app deploy
echo "✅ 部署完成！"

赋予执行权限：chmod +x ~/.gemini/commands/deploy

重启 Gemini-CLI，现在您就可以直接运行 /deploy 了！

第六部分：常见问题解答 (FAQ)
Q: 安装时出现权限错误怎么办？
A: 尝试修复 npm 的全局包权限，避免直接使用 sudo。可以搜索 "npm fix permissions" 查找解决方案。

Q: Gemini 似乎没有理解我的项目文件？
A: 确认您使用了 @ 命令正确注入了文件或目录。使用 /context show 检查当前上下文是否包含了您期望的文件内容。

Q: 如何重置认证信息？
A: 运行 /auth 命令，里面通常会提供重置或重新登录的选项。

结语
您已经完成了 Gemini-CLI 的终极教程。但真正的掌握来自于不断的实践。现在，就把它应用到您的日常工作中，探索它与您的个人工作流相结合的无限可能。祝您编码愉快！