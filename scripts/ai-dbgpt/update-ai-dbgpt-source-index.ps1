param(
  [string]$SourceRoot = "",
  [string]$OutputDir = "04-sources\ai-dbgpt"
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($SourceRoot)) {
  $projectText = [string]([char]0x9879) + [string]([char]0x76EE)
  $codeText = [string]([char]0x4EE3) + [string]([char]0x7801)
  $SourceRoot = Join-Path (Join-Path (Join-Path "D:\Users\Desktop" $projectText) $codeText) "AI_DB_GPT"
}

function Read-TextFile {
  param([string]$Path)
  return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
}

function Get-RelativePathSafe {
  param([string]$Base, [string]$Path)
  try {
    return [System.IO.Path]::GetRelativePath($Base, $Path)
  } catch {
    return $Path
  }
}

function Get-FrontMatter {
  param([string]$Text)
  $result = [ordered]@{}
  if ($Text -match "(?s)^---\s*\r?\n(.*?)\r?\n---") {
    $block = $Matches[1]
    foreach ($line in ($block -split "\r?\n")) {
      if ($line -match "^\s*([A-Za-z0-9_-]+):\s*(.*?)\s*$") {
        $key = $Matches[1]
        $value = $Matches[2].Trim().Trim('"').Trim("'")
        $result[$key] = $value
      }
    }
  }
  return $result
}

function Get-Headings {
  param([string]$Text)
  $headings = New-Object System.Collections.Generic.List[string]
  foreach ($line in ($Text -split "\r?\n")) {
    if ($line -match "^(#{1,3})\s+(.+)$") {
      $headings.Add($Matches[2].Trim())
    }
    if ($headings.Count -ge 6) { break }
  }
  return $headings
}

function Get-AuthorityLevel {
  param([string]$RelativePath, [System.Collections.IDictionary]$FrontMatter)

  $lower = $RelativePath.ToLowerInvariant()
  $status = ""
  $lifecycle = ""
  $canonical = ""
  if ($FrontMatter.Contains("status")) { $status = [string]$FrontMatter["status"] }
  if ($FrontMatter.Contains("lifecycle")) { $lifecycle = [string]$FrontMatter["lifecycle"] }
  if ($FrontMatter.Contains("canonical")) { $canonical = [string]$FrontMatter["canonical"] }

  if ($status -match "superseded|deprecated" -or $lifecycle -match "superseded|deprecated|scratch" -or $lower -match "completion-audit|local-demo-guide") {
    return "historical"
  }
  if ($canonical -match "true" -or $lifecycle -match "canonical") {
    return "canonical"
  }
  if ($lower -match "docs\\research\\decisions") {
    return "accepted-decision"
  }
  if ($lower -match "acceptance|validation|assessment|eval") {
    return "acceptance-record"
  }
  if ($lower -match "doc\\prd") {
    return "proposal"
  }
  if ($lower -match "inspiration|gather|research") {
    return "research"
  }
  return "research"
}

function Get-SourceGroup {
  param([string]$RelativePath)
  $lower = $RelativePath.ToLowerInvariant()
  if ($lower -match "docs\\research\\inspiration") { return "inspiration" }
  if ($lower -match "docs\\research\\gather") { return "gather" }
  if ($lower -match "docs\\research\\context-packs") { return "context-pack" }
  if ($lower -match "docs\\research\\document-governance") { return "document-governance" }
  if ($lower -match "doc\\prd") { return "prd" }
  return "other"
}

function Get-LinkTargets {
  param([string]$Text, [string]$RelativePath, [string]$AuthorityLevel)

  $targets = New-Object System.Collections.Generic.List[object]
  $rules = @(
    @{ pattern = "Dataset|DataSet|SourceRef|数据集|字段|指标"; target = "03-architecture/contracts/dataset-contract-v0.md"; reason = "dataset, metric, field, or SourceRef contract impact" },
    @{ pattern = "Artifact|Evidence|ReportArtifact|证据|引用|trace|RunTrace|运行"; target = "03-architecture/contracts/run-artifact-contract-v0.md"; reason = "run, artifact, evidence, or trace contract impact" },
    @{ pattern = "GoldenQuestion|Eval|eval|评测|验收|失败样例|golden"; target = "07-evals/"; reason = "evaluation or acceptance impact" },
    @{ pattern = "roadmap|V2|v2|V3|v3|迭代|路线|版本"; target = "02-roadmap/"; reason = "roadmap or version-boundary impact" },
    @{ pattern = "PRD|需求|产品|wedge|试点|MVP"; target = "01-product/prd/"; reason = "product definition impact" },
    @{ pattern = "ADR|决策|边界|不做|non-goal|non goal"; target = "05-decisions/"; reason = "decision or boundary impact" },
    @{ pattern = "Manus|UI|UX|workbench|前端|工作台|原型"; target = "08-design-prototypes/"; reason = "workflow or prototype impact" },
    @{ pattern = "报告|汇报|presentation|share|brief|材料"; target = "06-iteration/reports/"; reason = "report or presentation material" },
    @{ pattern = "agent|Agent|runtime|planner|tool|skill|harness"; target = "09-agents/"; reason = "agent runtime, tool, skill, or harness impact" }
  )

  foreach ($rule in $rules) {
    if ($Text -match $rule.pattern -or $RelativePath -match $rule.pattern) {
      $confidence = "review"
      if ($AuthorityLevel -in @("canonical", "accepted-decision", "acceptance-record")) {
        $confidence = "strong-review"
      }
      $targets.Add([pscustomobject]@{
        target = $rule.target
        reason = $rule.reason
        confidence = $confidence
      })
    }
  }

  return $targets
}

function Get-DateValue {
  param([System.Collections.IDictionary]$FrontMatter, [System.IO.FileInfo]$File)
  foreach ($key in @("updated_at", "updated", "created_at", "created", "date", "version")) {
    if ($FrontMatter.Contains($key)) {
      $value = [string]$FrontMatter[$key]
      if ($value -match "(\d{4}-\d{2}-\d{2})") {
        return $Matches[1]
      }
    }
  }
  return $File.LastWriteTime.ToString("yyyy-MM-dd")
}

function Find-LineMatches {
  param([array]$Sources, [string]$Pattern)

  $lineMatches = New-Object System.Collections.Generic.List[object]
  foreach ($source in $Sources) {
    $lines = $source.text -split "\r?\n"
    for ($i = 0; $i -lt $lines.Count; $i++) {
      if ($lines[$i] -match $Pattern) {
        $snippet = $lines[$i].Trim()
        if ($snippet.Length -gt 180) { $snippet = $snippet.Substring(0, 180) + "..." }
        $lineMatches.Add([pscustomobject]@{
          path = $source.relative_path
          line = $i + 1
          text = $snippet
          authority = $source.authority_level
        })
      }
    }
  }
  return $lineMatches
}

$outputPath = Resolve-Path -LiteralPath "."
$outputFull = Join-Path $outputPath $OutputDir
New-Item -ItemType Directory -Force -Path $outputFull | Out-Null

$sourceSpecs = @(
  "docs\research",
  "doc\prd",
  "skills"
)

$fileMap = @{}
foreach ($spec in $sourceSpecs) {
  $dir = Join-Path $SourceRoot $spec
  if (Test-Path -LiteralPath $dir) {
    Get-ChildItem -LiteralPath $dir -Recurse -Filter "*.md" | Sort-Object FullName | ForEach-Object {
      $fileMap[$_.FullName] = $_
    }
  }
}
$files = $fileMap.Values | Sort-Object FullName

$sources = New-Object System.Collections.Generic.List[object]
foreach ($file in $files) {
  $text = Read-TextFile -Path $file.FullName
  $relative = Get-RelativePathSafe -Base $SourceRoot -Path $file.FullName
  $frontMatter = Get-FrontMatter -Text $text
  $authority = Get-AuthorityLevel -RelativePath $relative -FrontMatter $frontMatter
  $headings = Get-Headings -Text $text
  $links = Get-LinkTargets -Text $text -RelativePath $relative -AuthorityLevel $authority
  $title = if ($frontMatter.Contains("title")) { [string]$frontMatter["title"] } elseif ($headings.Count -gt 0) { $headings[0] } else { $file.BaseName }
  $sources.Add([pscustomobject]@{
    title = $title
    path = $file.FullName
    relative_path = $relative
    source_group = Get-SourceGroup -RelativePath $relative
    authority_level = $authority
    status = if ($frontMatter.Contains("status")) { [string]$frontMatter["status"] } else { "" }
    lifecycle = if ($frontMatter.Contains("lifecycle")) { [string]$frontMatter["lifecycle"] } else { "" }
    date = Get-DateValue -FrontMatter $frontMatter -File $file
    last_write_time = $file.LastWriteTime.ToString("s")
    headings = @($headings)
    link_targets = @($links)
    text = $text
  })
}

$jsonSources = $sources | ForEach-Object {
  [pscustomobject]@{
    title = $_.title
    relative_path = $_.relative_path
    source_group = $_.source_group
    authority_level = $_.authority_level
    status = $_.status
    lifecycle = $_.lifecycle
    date = $_.date
    last_write_time = $_.last_write_time
    headings = $_.headings
    link_targets = $_.link_targets
  }
}
$jsonSources | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $outputFull "generated-manifest.json") -Encoding UTF8

$manifest = New-Object System.Collections.Generic.List[string]
$manifest.Add("---")
$manifest.Add("type: generated-source-manifest")
$manifest.Add("status: generated")
$manifest.Add("updated: $(Get-Date -Format yyyy-MM-dd)")
$manifest.Add("---")
$manifest.Add("")
$manifest.Add("# AI_DB_GPT Generated Manifest")
$manifest.Add("")
$manifest.Add("Source root: $SourceRoot")
$manifest.Add("")
$manifest.Add("| Source | Group | Authority | Date | Suggested Targets |")
$manifest.Add("|---|---|---|---|---|")
foreach ($source in ($sources | Sort-Object source_group, relative_path)) {
  $targetText = (($source.link_targets | Select-Object -ExpandProperty target -Unique) -join "<br>")
  $manifest.Add("| $($source.relative_path) | $($source.source_group) | $($source.authority_level) | $($source.date) | $targetText |")
}
$manifest | Set-Content -LiteralPath (Join-Path $outputFull "generated-manifest.md") -Encoding UTF8

$linkMap = New-Object System.Collections.Generic.List[string]
$linkMap.Add("---")
$linkMap.Add("type: generated-link-map")
$linkMap.Add("status: review")
$linkMap.Add("updated: $(Get-Date -Format yyyy-MM-dd)")
$linkMap.Add("---")
$linkMap.Add("")
$linkMap.Add("# AI_DB_GPT Candidate Link Map")
$linkMap.Add("")
$linkMap.Add("These are candidate dispatch targets. Review before editing target artifacts.")
$linkMap.Add("")
$linkMap.Add("| Source | Authority | Candidate Target | Why | Confidence |")
$linkMap.Add("|---|---|---|---|---|")
foreach ($source in ($sources | Sort-Object relative_path)) {
  foreach ($target in $source.link_targets) {
    $linkMap.Add("| $($source.relative_path) | $($source.authority_level) | $($target.target) | $($target.reason) | $($target.confidence) |")
  }
}
$linkMap | Set-Content -LiteralPath (Join-Path $outputFull "generated-link-map.md") -Encoding UTF8

$timeline = New-Object System.Collections.Generic.List[string]
$timeline.Add("---")
$timeline.Add("type: generated-timeline")
$timeline.Add("status: review")
$timeline.Add("updated: $(Get-Date -Format yyyy-MM-dd)")
$timeline.Add("---")
$timeline.Add("")
$timeline.Add("# AI_DB_GPT Source Timeline")
$timeline.Add("")
$timeline.Add("| Date | Source | Group | Authority | Title |")
$timeline.Add("|---|---|---|---|---|")
foreach ($source in ($sources | Sort-Object date, relative_path)) {
  $safeTitle = ([string]$source.title).Replace("|", "/")
  $timeline.Add("| $($source.date) | $($source.relative_path) | $($source.source_group) | $($source.authority_level) | $safeTitle |")
}
$timeline | Set-Content -LiteralPath (Join-Path $outputFull "generated-timeline.md") -Encoding UTF8

$conflictRules = @(
  @{
    name = "Completion claim vs warning or blocked status"
    a = "Done|Pass|closure|closed"
    b = "Accepted with Warning|Blocked|warning|not.*complete|cannot.*complete"
  },
  @{
    name = "Demo/API route vs native app route"
    a = "demo|/api/chatreport/v1/demo|external.*API|standalone.*API"
    b = "native app|not.*demo|cannot.*demo"
  },
  @{
    name = "Open dynamic agents vs controlled runtime"
    a = "arbitrary.*DAG|dynamic.*agent|open.*Tool|open.*Skill|auto.*agent"
    b = "Controlled|fixed.*registry|PlanValidator|Capability Registry|not.*arbitrary.*DAG"
  },
  @{
    name = "Manus reference vs product copying"
    a = "Manus|manus"
    b = "reference-only|not.*copy|cannot.*copy|brand|screenshot|logo"
  },
  @{
    name = "Real business quality vs synthetic fixture"
    a = "real business|production quality|business quality"
    b = "synthetic|fixture|mini|sanitized|Accepted with Warning|warning"
  }
)

$conflicts = New-Object System.Collections.Generic.List[string]
$conflicts.Add("---")
$conflicts.Add("type: generated-conflict-candidates")
$conflicts.Add("status: review")
$conflicts.Add("updated: $(Get-Date -Format yyyy-MM-dd)")
$conflicts.Add("---")
$conflicts.Add("")
$conflicts.Add("# AI_DB_GPT Conflict Candidates")
$conflicts.Add("")
$conflicts.Add("These are candidate conflicts. They identify exact source lines that need review; they do not prove a real contradiction by themselves.")
$conflicts.Add("")

foreach ($rule in $conflictRules) {
  $aMatches = Find-LineMatches -Sources $sources -Pattern $rule.a
  $bMatches = Find-LineMatches -Sources $sources -Pattern $rule.b
  if ($aMatches.Count -gt 0 -and $bMatches.Count -gt 0) {
    $conflicts.Add("## $($rule.name)")
    $conflicts.Add("")
    $conflicts.Add("Signal A:")
    foreach ($match in ($aMatches | Select-Object -First 8)) {
      $conflicts.Add("- $($match.path):$($match.line) [$($match.authority)] $($match.text)")
    }
    $conflicts.Add("")
    $conflicts.Add("Signal B:")
    foreach ($match in ($bMatches | Select-Object -First 8)) {
      $conflicts.Add("- $($match.path):$($match.line) [$($match.authority)] $($match.text)")
    }
    $conflicts.Add("")
    $conflicts.Add("Review action: decide whether this is historical evolution, a real conflict, or a term that should be normalized in 06-iteration/drafts or a formal ADR.")
    $conflicts.Add("")
  }
}

$conflicts | Set-Content -LiteralPath (Join-Path $outputFull "generated-conflict-candidates.md") -Encoding UTF8

Write-Output "Generated $($sources.Count) source entries under $OutputDir"
