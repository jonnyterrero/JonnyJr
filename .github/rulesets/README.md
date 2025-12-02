# GitHub Rulesets for Branch Protection

This directory contains JSON ruleset files that can be uploaded to GitHub to protect your repository branches.

## Available Rulesets

### 1. `master-ruleset.json` - Main Branch Protection
**Protects:** `main` and `master` branches

**Rules:**
- ✅ Prevents branch deletion
- ✅ Prevents force pushes (non-fast-forward)
- ✅ Requires pull requests before merging
- ✅ Requires 1 approval
- ✅ Dismisses stale reviews
- ✅ Requires conversation resolution
- ✅ Requires branches to be up to date

**Use this for:** Protecting your main branch from direct commits

### 2. `workflow-branches.json` - Workflow Branch Rules
**Protects:** `workflow/*` branches (e.g., `workflow/homework-help`)

**Rules:**
- ✅ Prevents accidental deletion
- ✅ Allows force pushes (for workflow updates)
- ✅ Allows updates from workflows

**Use this for:** AI helper workflow branches that need to be updated by GitHub Actions

## How to Upload Rulesets

### Option 1: GitHub Web UI (Easiest)

1. Go to: **Settings** → **Rules** → **Rulesets**
2. Click **New ruleset**
3. Select **Branch ruleset**
4. Copy and paste the JSON content from one of the files
5. Adjust as needed
6. Click **Create**

### Option 2: GitHub CLI

```bash
# Upload main branch protection
gh api repos/jonnyterrero/JonnyJr/rulesets \
  --method POST \
  --input .github/rulesets/master-ruleset.json

# Upload workflow branches rules
gh api repos/jonnyterrero/JonnyJr/rulesets \
  --method POST \
  --input .github/rulesets/workflow-branches.json
```

### Option 3: GitHub API (curl)

```bash
# Set your token
export GITHUB_TOKEN="your_token_here"

# Upload main branch protection
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/jonnyterrero/JonnyJr/rulesets \
  -d @.github/rulesets/master-ruleset.json

# Upload workflow branches rules
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/jonnyterrero/JonnyJr/rulesets \
  -d @.github/rulesets/workflow-branches.json
```

## Recommended Setup

1. **Upload `master-ruleset.json`** first to protect main branch
2. **Upload `workflow-branches.json`** to allow workflows to update their branches
3. Verify rules are active in **Settings** → **Rules** → **Rulesets**

## What Each Ruleset Does

### Main Branch Protection
- **Prevents**: Direct commits, force pushes, deletions
- **Requires**: Pull requests with approval
- **Allows**: Merging approved PRs only

### Workflow Branches
- **Prevents**: Accidental deletion
- **Allows**: Force pushes (for workflow updates)
- **Allows**: Automatic updates from GitHub Actions

## Customization

You can customize these rulesets by editing the JSON files:

- **Change approval count**: Modify `required_approving_review_count`
- **Add status checks**: Add to `required_status_checks` array
- **Change branch patterns**: Modify `ref_name.include` array
- **Add bypass actors**: Add to `bypass_actors` array

## Notes

- Rulesets work alongside (not instead of) branch protection rules
- More restrictive rules take precedence
- You can have multiple rulesets for different branch patterns
- Rulesets are evaluated in order (more specific first)

## Troubleshooting

### "Ruleset validation failed"
- Check JSON syntax is valid
- Ensure required fields are present
- Verify branch name patterns are correct

### "Cannot push to branch"
- Check if ruleset is too restrictive
- Verify bypass actors are configured
- Check if PR requirements are blocking

### "Workflow can't push"
- Ensure workflow branches ruleset allows updates
- Check GitHub Actions has proper permissions
- Verify PAT has repo write access

