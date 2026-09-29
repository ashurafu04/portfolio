Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$portraitPath = Join-Path $projectRoot "public\profile.png"
$outputPath = Join-Path $projectRoot "public\og.png"

$canvas = New-Object System.Drawing.Bitmap 1200, 630
$canvas.SetResolution(96, 96)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml("#F3FFFE"))

$blue = [System.Drawing.ColorTranslator]::FromHtml("#0987F2")
$ink = [System.Drawing.ColorTranslator]::FromHtml("#222222")
$steel = [System.Drawing.ColorTranslator]::FromHtml("#555555")
$white = [System.Drawing.Color]::White

$blueBrush = New-Object System.Drawing.SolidBrush $blue
$inkBrush = New-Object System.Drawing.SolidBrush $ink
$steelBrush = New-Object System.Drawing.SolidBrush $steel
$whiteBrush = New-Object System.Drawing.SolidBrush $white
$graphics.FillRectangle($blueBrush, 0, 0, 18, 630)

$nameFont = New-Object System.Drawing.Font "Segoe UI", 54, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$roleFont = New-Object System.Drawing.Font "Consolas", 25, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$bodyFont = New-Object System.Drawing.Font "Consolas", 20, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$domainFont = New-Object System.Drawing.Font "Consolas", 18, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)

$graphics.DrawString("ACHRAF MALKI", $nameFont, $inkBrush, 72, 142)
$graphics.DrawString("Software Engineer & IT Consultant", $roleFont, $blueBrush, 76, 224)
$graphics.DrawString("Enterprise AI  |  Headless Commerce", $bodyFont, $steelBrush, 76, 294)
$graphics.DrawString("Cloud Infrastructure  |  Secure B2B Systems", $bodyFont, $steelBrush, 76, 330)

$domainRect = New-Object System.Drawing.RectangleF 76, 451, 245, 48
$graphics.FillRectangle($blueBrush, $domainRect)
$domainFormat = New-Object System.Drawing.StringFormat
$domainFormat.Alignment = [System.Drawing.StringAlignment]::Center
$domainFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
$graphics.DrawString("achrafmalki.dev", $domainFont, $whiteBrush, $domainRect, $domainFormat)

$portrait = [System.Drawing.Image]::FromFile($portraitPath)
$portraitRect = New-Object System.Drawing.Rectangle 744, 78, 430, 430
$graphics.DrawImage($portrait, $portraitRect)
$portrait.Dispose()

$canvas.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$domainFormat.Dispose()
$nameFont.Dispose()
$roleFont.Dispose()
$bodyFont.Dispose()
$domainFont.Dispose()
$blueBrush.Dispose()
$inkBrush.Dispose()
$steelBrush.Dispose()
$whiteBrush.Dispose()
$graphics.Dispose()
$canvas.Dispose()

Write-Output "Generated $outputPath (1200x630)"
