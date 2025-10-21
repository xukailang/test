@echo off
echo ========================================
echo 禁用Windows Defender、Intel XTU和ASUS服务
echo ========================================
echo.

echo 正在以管理员权限运行...
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 错误: 需要管理员权限！
    echo 请右键点击此文件，选择"以管理员身份运行"
    pause
    exit /b 1
)

echo.
echo [1/4] 禁用Windows Defender...
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender" /v DisableAntiSpyware /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection" /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f >nul 2>&1
powershell -Command "Set-MpPreference -DisableRealtimeMonitoring $true" >nul 2>&1
echo Windows Defender实时保护已禁用

echo.
echo [2/4] 禁用Intel XTU服务...
sc stop XtuService >nul 2>&1
sc config XtuService start=disabled >nul 2>&1
echo Intel XTU服务已禁用

echo.
echo [3/4] 禁用ASUS服务...

REM 禁用ASUS证书服务
sc stop AsusCertService >nul 2>&1
sc config AsusCertService start=disabled >nul 2>&1
echo - AsusCertService 已禁用

REM 禁用ASUS COM服务
sc stop atkexComSvc >nul 2>&1
sc config atkexComSvc start=disabled >nul 2>&1
echo - atkexComSvc 已禁用

REM 禁用ASUS优化服务
sc stop AsusOptimization >nul 2>&1
sc config AsusOptimization start=disabled >nul 2>&1
echo - AsusOptimization 已禁用

REM 禁用Armoury Crate服务
sc stop "ArmouryCrate.Service" >nul 2>&1
sc config "ArmouryCrate.Service" start=disabled >nul 2>&1
echo - ArmouryCrate.Service 已禁用

REM 禁用ASUS PTP服务
sc stop AsusPTPService >nul 2>&1
sc config AsusPTPService start=disabled >nul 2>&1
echo - AsusPTPService 已禁用

REM 禁用ASUS应用服务
sc stop AsusAppService >nul 2>&1
sc config AsusAppService start=disabled >nul 2>&1
echo - AsusAppService 已禁用

REM 禁用ASUS开关服务
sc stop AsusSwitch >nul 2>&1
sc config AsusSwitch start=disabled >nul 2>&1
echo - AsusSwitch 已禁用

REM 禁用ASUS软件管理器
sc stop AsusSoftwareManager >nul 2>&1
sc config AsusSoftwareManager start=disabled >nul 2>&1
echo - AsusSoftwareManager 已禁用

REM 禁用Armoury Crate控制接口
sc stop ArmouryCrateControlInterface >nul 2>&1
sc config ArmouryCrateControlInterface start=disabled >nul 2>&1
echo - ArmouryCrateControlInterface 已禁用

REM 禁用GameSDK
sc stop GameSDK >nul 2>&1
sc config GameSDK start=disabled >nul 2>&1
echo - GameSDK 已禁用

REM 禁用ASUS系统诊断
sc stop AsusSystemDiagnosis >nul 2>&1
sc config AsusSystemDiagnosis start=disabled >nul 2>&1
echo - AsusSystemDiagnosis 已禁用

REM 禁用ROG Live服务
sc stop ROGLiveService >nul 2>&1
sc config ROGLiveService start=disabled >nul 2>&1
echo - ROGLiveService 已禁用

REM 禁用ASUS系统分析
sc stop AsusSystemAnalysis >nul 2>&1
sc config AsusSystemAnalysis start=disabled >nul 2>&1
echo - AsusSystemAnalysis 已禁用

echo.
echo [4/4] 禁用开机启动项...

REM 禁用ASUS开机启动项
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v "ArmouryCrate.Service" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v "AsusOptimization" /f >nul 2>&1
reg delete "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v "ArmouryCrate" /f >nul 2>&1

echo 开机启动项已清理

echo.
echo ========================================
echo 所有操作完成！
echo ========================================
echo.
echo 建议立即重启电脑以使更改生效。
echo 重启后，您的内存使用率将显著降低。
echo.
pause
