# JonnyJr Repository

Welcome to your personal repository! This repository is set up with automatic push functionality to GitHub.

## Features

- ✅ Automatic Git configuration
- ✅ Comprehensive .gitignore file
- ✅ Auto-push script for easy GitHub synchronization
- ✅ Git hooks for automatic pushing after commits

## Usage

### Automatic Push Script

To automatically commit and push all changes to GitHub, run:

```powershell
.\auto-push.ps1
```

Or with a custom commit message:

```powershell
.\auto-push.ps1 -Message "Your custom commit message"
```

### Manual Git Operations

If you prefer manual control:

```bash
# Add all changes
git add .

# Commit with a message
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

## Setup GitHub Remote

If you haven't set up your GitHub remote yet, run:

```bash
git remote add origin https://github.com/yourusername/yourrepo.git
git push -u origin main
```

## File Structure

- `.gitignore` - Git ignore rules for common files
- `auto-push.ps1` - PowerShell script for automatic pushing
- `README.md` - This file

## Notes

- The repository is configured to automatically push changes after commits
- All common file types are ignored (see .gitignore)
- The auto-push script handles errors gracefully and provides helpful messages

Happy coding! 🚀
