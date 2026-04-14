function buildQrPayload(shareId) {
  return {
    shareId,
    url: `/api/emergency/${shareId}`,
    status: 'ready',
  };
}

module.exports = {
  buildQrPayload,
};
