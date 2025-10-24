# Auto-push script for GitHub
# Run this script to automatically commit and push changes

param(
    [string]$Message = "Auto-commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "🚀 Auto-push script starting..." -ForegroundColor Green

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Not in a git repository. Please run this from your project root." -ForegroundColor Red
    exit 1
}

# Add all changes
Write-Host "📁 Adding all changes..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "ℹ️  No changes to commit." -ForegroundColor Blue
    exit 0
}

# Commit changes
Write-Host "💾 Committing changes: $Message" -ForegroundColor Yellow
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to commit changes." -ForegroundColor Red
    exit 1
}

# Get current branch
$currentBranch = git branch --show-current

# Check if origin remote exists
$originUrl = git remote get-url origin 2>$null

if ($originUrl) {
    Write-Host "🌐 Pushing to origin/$currentBranch..." -ForegroundColor Yellow
    git push origin $currentBranch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to push to GitHub. Please check your connection and credentials." -ForegroundColor Red
        Write-Host "You may need to set up your GitHub remote:" -ForegroundColor Yellow
        Write-Host "  git remote add origin https://github.com/yourusername/yourrepo.git" -ForegroundColor Cyan
        Write-Host "  git push -u origin main" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ No remote origin found. Please set up your GitHub repository:" -ForegroundColor Red
    Write-Host "  git remote add origin https://github.com/yourusername/yourrepo.git" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
}

Write-Host "🎉 Auto-push script completed!" -ForegroundColor Green
