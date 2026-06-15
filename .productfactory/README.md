# ProductFactory

你不用记 ProductFactory 的命令。

这个项目已经接入 ProductFactory。以后你正常说话就可以：

```text
这个功能要不要做？
```

```text
这个页面/工作流怎么设计更好？
```

```text
开始实现这个功能，但先别做大。
```

```text
review 一下这个原型，看看产品形态对不对。
```

Codex / Claude 应该主动做这些事：

1. 先查 ProductFactory 记忆。
2. 先判断 `build / narrow / research / kill`。
3. 如果要做，再写清楚本轮最小范围。
4. 做完后记录哪些判断有用、哪些没用。

## 跨平台入口

如果 agent 需要一个明确的项目内入口，可以用同一个 Python helper。它在 macOS / Linux 的 Bash 或 zsh、Windows 的 PowerShell / cmd.exe 下使用同一套参数。

macOS / Linux:

```bash
python /path/to/ProductFactory/integrations/project-adapters/productfactory_project_copilot.py --repo . start --task "开始实现这个功能，但先别做大"
python /path/to/ProductFactory/integrations/project-adapters/productfactory_project_copilot.py --repo . finish --verification "tests/browser/manual"
```

Windows PowerShell:

```powershell
python C:\path\to\ProductFactory\integrations\project-adapters\productfactory_project_copilot.py --repo . start --task "开始实现这个功能，但先别做大"
python C:\path\to\ProductFactory\integrations\project-adapters\productfactory_project_copilot.py --repo . finish --verification "tests/browser/manual"
```

它会自动安装/刷新项目 adapter，并在 `.productfactory/runs/` 下生成本次任务的 `ship-pack.md`、`delivery-harness.md`、`ship-review.md`，同时把复盘追加到 `.productfactory/shipping-package/impact-log.md`。

## 最常用的一句话

```text
你按 ProductFactory 的方式处理这个任务。
```

## 你不用说的词

你不需要记：

- Product Committee
- Ship Pack
- Delivery Harness
- Impact Log
- Review Queue

这些是 agent 应该自动处理的内部流程。

## 什么时候会自动触发

- 新功能
- 新页面
- 产品方向
- 用户体验
- 原型 review
- PRD
- 路线图取舍
- 定价/定位
- 复杂一点的 web coding 任务

## 什么时候不会触发

- 改错别字
- 小 bug
- 跑命令
- 单纯格式化

## 如果 agent 忘了

直接说：

```text
这应该走 ProductFactory，重新来。
```
