import { GrRobot } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const LogoLink = () => {
  return (
    <div className="items-center">
      <Link to="/" className="">
        {/* dark */}
        <div className="flex text-center">
          <GrRobot size={25} className="text-sky-500" />
          <span className="text-neutral-900 text-xl font-semibold dark:text-neutral-200">
            SUSAN-AI
          </span>
        </div>
      </Link>
    </div>
  );
};

export default LogoLink;
