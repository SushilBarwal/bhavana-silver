import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import PropTypes from "prop-types";

const MeetTheTeam = ({ members }) => {
  if (!members || members.length === 0) {
    return null;
  }

  return (
    <section id="meet-the-team" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id || index}
              className="bg-white rounded-lg shadow-lg p-6 text-center group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-transparent group-hover:border-primary transition-all duration-300 object-cover"
              />
              <h3 className="text-xl font-serif mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.position}</p>
              <div className="flex justify-center space-x-4">
                {member.linkedin_link && (
                  <motion.a
                    href={member.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <FaLinkedin size={24} />
                  </motion.a>
                )}
                {member.twitter_link && (
                  <motion.a
                    href={member.twitter_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                  >
                    <FaTwitter size={24} />
                  </motion.a>
                )}
                {member.instagram_link && (
                  <motion.a
                    href={member.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <FaInstagram size={24} />
                  </motion.a>
                )}
                {member.facebook_link && (
                  <motion.a
                    href={member.facebook_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <FaFacebook size={24} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

MeetTheTeam.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      linkedin_link: PropTypes.string,
      twitter_link: PropTypes.string,
      instagram_link: PropTypes.string,
      facebook_link: PropTypes.string,
    })
  ),
};

export default MeetTheTeam;
