const getUTF8Buffer = (message: string): Buffer => {
  return Buffer.from(message, 'utf-8');
};

export default getUTF8Buffer;
