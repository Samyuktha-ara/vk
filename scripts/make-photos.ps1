# Regenerates /public/photos from the originals in /photos-src.
# Usage: powershell -File scripts/make-photos.ps1

Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot "../photos-src"
$out  = Join-Path $PSScriptRoot "../public/photos"
New-Item -ItemType Directory -Force $out | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
function Save-Jpeg($bmp, $path, $q) {
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$q)
  $bmp.Save($path, $jpegCodec, $ep)
  $ep.Dispose()
}

function Load-Oriented($path) {
  $img = [System.Drawing.Image]::FromFile($path)
  if ($img.PropertyIdList -contains 0x112) {
    $o = $img.GetPropertyItem(0x112).Value[0]
    switch ($o) {
      3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  }
  return $img
}

function Resize-Crop($src, $crop, $w) {
  $h = [int][Math]::Round($w * $crop.Height / $crop.Width)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $crop, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  return $bmp
}

# name, source, top of the 3:2 landscape crop (px, in oriented image space)
$jobs = @(
  @{ name = "house-1"; file = "IMG_5763.JPG.jpeg"; top = 1232 },
  @{ name = "house-2"; file = "IMG_6149.JPG.jpeg"; top = 968  },
  @{ name = "house-3"; file = "IMG_6198.JPG.jpeg"; top = 880  },
  @{ name = "land-1";  file = "IMG_6213.PNG";      top = 597  }
)

foreach ($j in $jobs) {
  $src = Load-Oriented (Join-Path $root $j.file)
  $W = $src.Width; $H = $src.Height
  Write-Output ("{0}: {1}x{2}" -f $j.name, $W, $H)

  # --- wide (3:2) art-directed crop
  $ch = [int][Math]::Round($W * 2 / 3)
  $top = [Math]::Min($j.top, $H - $ch)
  $wideCrop = New-Object System.Drawing.Rectangle(0, $top, $W, $ch)
  foreach ($w in @(640, 960, 1280, 1980)) {
    if ($w -gt $W) { continue }
    $bmp = Resize-Crop $src $wideCrop $w
    Save-Jpeg $bmp (Join-Path $out ("{0}-wide-{1}.jpg" -f $j.name, $w)) 78
    $bmp.Dispose()
  }

  # --- tall (full frame, portrait)
  $tallCrop = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
  foreach ($w in @(480, 720, 1080)) {
    if ($w -gt $W) { continue }
    $bmp = Resize-Crop $src $tallCrop $w
    Save-Jpeg $bmp (Join-Path $out ("{0}-tall-{1}.jpg" -f $j.name, $w)) 78
    $bmp.Dispose()
  }
  $src.Dispose()
}

Get-ChildItem $out | Select-Object Name, @{n="KB";e={[int]($_.Length/1KB)}} | Format-Table -AutoSize
