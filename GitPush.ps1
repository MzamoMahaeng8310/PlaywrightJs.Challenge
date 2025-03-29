Write-Host "Enter commit message:" -ForegroundColor Cyan
$commitMsg = Read-Host

# Stage all changes
git add .

# Show the current status
git status

# Commit with user-provided message
git commit -m "$commitMsg"

# Push to the main branch
git push -u origin main
