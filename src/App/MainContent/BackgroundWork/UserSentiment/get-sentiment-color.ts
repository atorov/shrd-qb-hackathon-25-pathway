function getSentimentColor(sentiment: number) {
  if (sentiment >= 4) return 'success';
  if (sentiment >= 3) return 'info';
  if (sentiment >= 2) return 'warning';
  return 'error';
}

export default getSentimentColor;
