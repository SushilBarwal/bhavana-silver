import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Arjun Sonkia",
    role: "Director",
    image:
      "https://plus.unsplash.com/premium_photo-1689629941068-d63f36e8bb8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Gaurav Jain",
    role: "Director Former President SGJIA",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },

  {
    name: "Gaurav Jain",
    role: "Director Former President SGJIA",
    image:
      "https://plus.unsplash.com/premium_photo-1689629941068-d63f36e8bb8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  // Add more team members as needed
];

const MeetTheTeam = () => {
  return (
    <section id="meet-the-team" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
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
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <motion.a
                  href={member.social.linkedin}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <FaLinkedin size={24} />
                </motion.a>
                <motion.a
                  href={member.social.twitter}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                >
                  <FaTwitter size={24} />
                </motion.a>
                <motion.a
                  href={member.social.github}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <FaGithub size={24} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
