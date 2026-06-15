# ProductFactory Prompt Cards

这些不是命令，是你可以随口说的话。

## 判断要不要做

```text
这个功能要不要做？帮我判断 build / narrow / research / kill。
```

## 判断产品形态

```text
这个东西应该做成 app、agent、workflow、dashboard、plugin，还是根本不该做成产品？
```

## 开始实现前

```text
先确认这个需求的最小范围、非目标和验收标准，再开始写代码。
```

## 跨平台准备本次任务

Bash / zsh:

```bash
python /path/to/ProductFactory/integrations/project-adapters/productfactory_project_copilot.py --repo . start --task "先确认这个需求的最小范围、非目标和验收标准，再开始写代码"
```

PowerShell:

```powershell
python C:\path\to\ProductFactory\integrations\project-adapters\productfactory_project_copilot.py --repo . start --task "先确认这个需求的最小范围、非目标和验收标准，再开始写代码"
```

## 原型/页面评审

```text
从产品品味和用户第一眼承诺角度 review 一下，不要只看 UI 好不好看。
```

## 做完之后

```text
复盘一下这次 ProductFactory 哪些判断有用，哪些没帮上忙，写进 impact-log。
```

```bash
python /path/to/ProductFactory/integrations/project-adapters/productfactory_project_copilot.py --repo . finish --verification "tests/browser/manual"
```

```powershell
python C:\path\to\ProductFactory\integrations\project-adapters\productfactory_project_copilot.py --repo . finish --verification "tests/browser/manual"
```

## 回流到 ProductFactory

```text
看一下这个项目有没有值得回流到 ProductFactory 的产品学习，只生成 candidate，不要直接变正式知识。
```
