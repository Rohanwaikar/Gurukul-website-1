import logo from "../assets/logo.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 100], [0, 40]);

  return (
    <header id="main-header">
      <motion.div id="title" style={{ y }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.1 }}
            >
        <motion.img src={logo} alt="" whileHover={{ scale: 1.1 }} />
        <h1>
          <span>
            Shinobi Lakeview Agritourism - Villa
          </span>
        </h1>
      </motion.div>
    </header>
  );
}
