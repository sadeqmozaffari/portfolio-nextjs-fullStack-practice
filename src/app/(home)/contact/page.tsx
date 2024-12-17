'use client';
import React from 'react';
import ContactForm from '../../../components/contactForm';
import {motion} from 'framer-motion';

function Contact() {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 m-5 mt-10 rounded-[18px] items-start p-5 ">
      <div className="flex flex-row  m-4 mt-10 items-center ">
        <h1 className="font-bold text-3xl font-robotoslab dark:text-white">
          Contact
        </h1>
        <div className="bg-gradient-to-r to-pink-500 from-rose-500 dark:to-pink-300 dark:from-rose-300 w-[10rem] h-[0.2rem] rounded-lg ml-6" />
      </div>

      <motion.div
        className="flex items-center justify-center flex-col "
        initial={{y: 10, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.6, ease: 'easeInOut'}}
      >
        <div className="flex flex-col   w-full self-center p-5">
          <h2 className="font-poppins text-3xl text-gray-500 tracking-wide">
            Let&apos;s Connect!
          </h2>
          <h1 className="font-poppins mt-5 text-gray-700 dark:text-gray-300">
            Have questions or project ideas?
            <br />
            Fill out the form below and I&apos;ll get back to you as soon as
            possible.
          </h1>
          <ContactForm />
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
