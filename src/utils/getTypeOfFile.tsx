function getTypeOfFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const buffer = event.target.result;
      const dataView = new DataView(buffer as any, 0, 5);
      const firstByte = dataView.getUint8(0);
      const secondByte = dataView.getUint8(1);
      const thirdByte = dataView.getUint8(2);
      let type;
      if (firstByte === 0x89 && secondByte === 0x50 && thirdByte === 0x4e) {
        type = 'image/png';
      } else if (firstByte === 0xff && secondByte === 0xd8) {
        type = 'image/jpeg';
      } else if (firstByte === 0x47 && secondByte === 0x49 && thirdByte === 0x46) {
        type = 'image/gif';
      } else if (firstByte === 0x42 && secondByte === 0x4d) {
        type = 'image/bmp';
      } else if (firstByte === 0x52 && secondByte === 0x49 && thirdByte === 0x46) {
        type = 'image/webp';
      } else {
        type = 'unknown';
      }
      resolve(type);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
export default getTypeOfFile;