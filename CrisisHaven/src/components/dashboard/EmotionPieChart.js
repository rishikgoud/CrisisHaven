import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell,
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const EmotionPieChart = ({ emotionData, getEmotionColor }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card-3d p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center"
        >
          <PieChartIcon className="w-5 h-5 text-white" />
        </motion.div>
        <h3 className="text-xl font-bold text-white">Emotion Distribution</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={emotionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {emotionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getEmotionColor(entry.name)} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default EmotionPieChart; 