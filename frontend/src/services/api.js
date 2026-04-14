export async function simulateRequest(payload, delay = 220) {
  await new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });

  return payload instanceof Function ? payload() : payload;
}
