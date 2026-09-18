# Generates square favicons from /public/vk-mark.png into /public.
# Usage: powershell -File scripts/make-favicons.ps1

Add-Type -AssemblyName System.Drawing

$public = Join-Path $PSScriptRoot "../public"
$src = [System.Drawing.Image]::FromFile((Join-Path $public "vk-mark.png"))

# Draw the mark centred on a transparent square canvas with a little padding.
function New-Square($size, $pad) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)
  $box = $size - 2 * $pad
  $scale = [Math]::Min($box / $src.Width, $box / $src.Height)
  $w = [int][Math]::Round($src.Width * $scale)
  $h = [int][Math]::Round($src.Height * $scale)
  $g.DrawImage($src, [int](($size - $w) / 2), [int](($size - $h) / 2), $w, $h)
  $g.Dispose()
  return $bmp
}

function Get-PngBytes($bmp) {
  $ms = New-Object System.IO.MemoryStream
  $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  $bytes = $ms.ToArray()
  $ms.Dispose()
  return ,$bytes
}

# PNG icons
foreach ($p in @(@{ n = "favicon-32.png"; s = 32; pad = 1 },
                 @{ n = "apple-touch-icon.png"; s = 180; pad = 14 })) {
  $bmp = New-Square $p.s $p.pad
  $bmp.Save((Join-Path $public $p.n), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

# favicon.ico with 16, 32 and 48 px PNG-compressed entries
$sizes = @(16, 32, 48)
$images = @()
foreach ($s in $sizes) {
  $bmp = New-Square $s 0
  $images += ,(Get-PngBytes $bmp)
  $bmp.Dispose()
}
$fs = [System.IO.File]::Create((Join-Path $public "favicon.ico"))
$bw = New-Object System.IO.BinaryWriter($fs)
$bw.Write([UInt16]0); $bw.Write([UInt16]1); $bw.Write([UInt16]$sizes.Count)
$offset = 6 + 16 * $sizes.Count
for ($i = 0; $i -lt $sizes.Count; $i++) {
  $bw.Write([Byte]$sizes[$i]); $bw.Write([Byte]$sizes[$i])
  $bw.Write([Byte]0); $bw.Write([Byte]0)
  $bw.Write([UInt16]1); $bw.Write([UInt16]32)
  $bw.Write([UInt32]$images[$i].Length); $bw.Write([UInt32]$offset)
  $offset += $images[$i].Length
}
foreach ($img in $images) { $bw.Write($img) }
$bw.Close()

$src.Dispose()
Get-ChildItem $public -Filter "*icon*" | Select-Object Name, Length | Format-Table -AutoSize
