export const categoryColors = {
  Backend: { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-400' },
  Frontend: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-400' },
  DevOps: { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-400' },
  Database: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-400' },
  Mobile: { bg: 'bg-pink-50', text: 'text-pink-600', dot: 'bg-pink-400' },
};

export const getColor = (cat) =>
  categoryColors[cat] || {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
  };