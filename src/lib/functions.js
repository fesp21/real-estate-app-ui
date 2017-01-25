export function getExtension($filename) {
  return $filename.substring($filename.lastIndexOf('.') + 1);
}

export function getFileName($filename) {
  return $filename.substring($filename.lastIndexOf('/') + 1);
}
