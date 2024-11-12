export default function handler(req, res) {
  if (req.method === 'GET') {
    const currentDay = new Date().toISOString().split('T')[0];
    res.status(200).json({ current_day: currentDay });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}