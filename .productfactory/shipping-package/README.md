# ProductFactory Shipping Package

This folder is the small operating kit for web coding work after ProductFactory has made a `build` or `narrow` product decision.

Use it like this:

1. Fill `ship-pack.md` before implementation.
2. Fill `delivery-harness.md` before or during implementation.
3. Fill `ship-review.md` after implementation.
4. Append `impact-log.md` after repeated tasks so ProductFactory can learn which guidance actually reduced rework.

Keep the files short. The point is not process. The point is to help the agent build the right thing, verify it, and remember the useful lesson.

Cross-platform helper:

```bash
python /path/to/ProductFactory/integrations/project-adapters/productfactory_project_copilot.py --repo . start --task "USER TASK"
python /path/to/ProductFactory/integrations/project-adapters/productfactory_project_copilot.py --repo . finish --verification "tests/browser/manual"
```

```powershell
python C:\path\to\ProductFactory\integrations\project-adapters\productfactory_project_copilot.py --repo . start --task "USER TASK"
python C:\path\to\ProductFactory\integrations\project-adapters\productfactory_project_copilot.py --repo . finish --verification "tests/browser/manual"
```
