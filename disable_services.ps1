# 禁用Windows Defender实时保护和服务
Write-Host "正在禁用Windows Defender..." -ForegroundColor Yellow

# 禁用实时保护
Set-MpPreference -DisableRealtimeMonitoring $true -ErrorAction SilentlyContinue

# 通过注册表禁用Windows Defender
$defenderPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender"
if (!(Test-Path $defenderPath)) {
    New-Item -Path $defenderPath -Force | Out-Null
}
Set-ItemProperty -Path $defenderPath -Name "DisableAntiSpyware" -Value 1 -Type DWord -Force

# 禁用实时保护（注册表）
$rtpPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection"
if (!(Test-Path $rtpPath)) {
    New-Item -Path $rtpPath -Force | Out-Null
}
Set-ItemProperty -Path $rtpPath -Name "DisableRealtimeMonitoring" -Value 1 -Type DWord -Force

Write-Host "Windows Defender已禁用" -ForegroundColor Green

# 禁用Intel XTU服务
Write-Host "`n正在禁用Intel XTU服务..." -ForegroundColor Yellow

$xtuServices = @("XtuService")
foreach ($service in $xtuServices) {
    $svc = Get-Service -Name $service -ErrorAction SilentlyContinue
    if ($svc) {
        Stop-Service -Name $service -Force -ErrorAction SilentlyContinue
        Set-Service -Name $service -StartupType Disabled -ErrorAction SilentlyContinue
        Write-Host "已禁用服务: $service" -ForegroundColor Green
    }
}

# 禁用不必要的ASUS服务
Write-Host "`n正在禁用ASUS服务..." -ForegroundColor Yellow

$asusServices = @(
    "AsusCertService",
    "atkexComSvc",
    "AsusOptimization",
    "ArmouryCrate.Service",
    "AsusPTPService",
    "AsusAppService",
    "AsusSwitch",
    "AsusSoftwareManager",
    "ArmouryCrateControlInterface",
    "GameSDK",
    "AsusSystemDiagnosis",
    "ROGLiveService",
    "AsusSystemAnalysis"
)

foreach ($service in $asusServices) {
    $svc = Get-Service -Name $service -ErrorAction SilentlyContinue
    if ($svc) {
        Stop-Service -Name $service -Force -ErrorAction SilentlyContinue
        Set-Service -Name $service -StartupType Disabled -ErrorAction SilentlyContinue
        Write-Host "已禁用服务: $service" -ForegroundColor Green
    } else {
        Write-Host "服务未找到: $service" -ForegroundColor Gray
    }
}

Write-Host "`n所有操作完成！" -ForegroundColor Green
Write-Host "建议重启电脑以使所有更改生效。" -ForegroundColor Yellow
