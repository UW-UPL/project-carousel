import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export default function FinalSlide() {
  return (
    <section className="bg-primary w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Container will shift up when QR appears */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -60 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 1.5
        }}
        className="flex flex-col items-center"
      >
        {/* CTA pops in first */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1
          }}
          className="text-center mb-16"
        >
          <h1 className="text-8xl font-black text-white">
            Submit your project!
          </h1>
        </motion.div>

        {/* QR Code: pops in after 0.5 seconds */}
        <motion.div
          initial={{ 
            scale: 0, 
            opacity: 0.5, 
            rotateY: 360, 
            rotateX: 45, 
            rotateZ: 10 
          }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotateY: 0, 
            rotateX: 0, 
            rotateZ: 0 
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 1.5
            },
            rotateY: {
              type: "spring",
              stiffness: 200,
              damping: 30,
              delay: 1.5
            },
            rotateX: {
              type: "spring", 
              stiffness: 250,
              damping: 25,
              delay: 1.5
            },
            rotateZ: {
              type: "spring",
              stiffness: 280,
              damping: 22,
              delay: 1.5
            },
            opacity: {
              duration: 0.3,
              delay: 1.5
            }
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
        <div className="w-72 h-72 bg-white rounded-3xl p-6 shadow-2xl">
          <QRCodeSVG 
            value="https://github.com/UW-UPL/project-carousel-slides" 
            size={256}
            level="H"
            className="w-full h-full"
          />
        </div>
        </motion.div>
      </motion.div>
    </section>
  );
}