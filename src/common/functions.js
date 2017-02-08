export function getExtension($filename) {
  return $filename.substring($filename.lastIndexOf('.') + 1);
}

export function getFileName($filename) {
  return $filename.substring($filename.lastIndexOf('/') + 1);
}

export function resolveCountryName(country) {

  switch (country) {
    case 'Kuwait' :
      return 'KW';
    default :
      return undefined;
  }

}