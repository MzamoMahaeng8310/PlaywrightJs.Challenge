Write-Host "Enter commit message:" -ForegroundColor Cyan
$commitMsg = Read-Host
git add .
git status
git commit -m "$commitMsg"
Write-Host "What is the branch you are comming to: " -ForegroundColor Cyan
$brachName = Read-Host
git push -u origin $brachName
