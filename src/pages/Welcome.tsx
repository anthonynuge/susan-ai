import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

const Welcome = () => {
  const { user } = useLoaderData();

  return (
    <div className="flex flex-col h-full justify-center">
      <h1 className="text-3xl font-semibold text-center tracking-tight">
        <motion.span
          initial={{ backgroundPositionX: '100%' }}
          animate={{ backgroundPositionX: '0%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="bg-gradient-to-r from-cyan-400 via-[60%] to-transparent to-80% bg-[length:350%_100%] bg-[position:100%_0] bg-clip-text text-transparent"
        >
          Salutations, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
        </motion.span>
        <br />
        <motion.span>What can do for you today?</motion.span>
      </h1>
    </div>
  );
};

export default Welcome;
