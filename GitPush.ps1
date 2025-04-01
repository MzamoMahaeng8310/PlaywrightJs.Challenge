Write-Host "Enter commit message:" -ForegroundColor Cyan
$commitMsg = Read-Host
git add .
git status
git commit -m "$commitMsg"
git push -u origin main
