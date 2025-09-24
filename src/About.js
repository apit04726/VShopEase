import HeroSection from './components/HeroSection';
import { useProductContext } from "./context/productcontex";
import Card from './components/card';



const About = () => {
  const { myName } = useProductContext();

  const data = {
    name:"VShopEase",
   }
   return (
    <>
     { myName }
      
    <HeroSection myData={data}/>{""}
    <Card/>
   </>
   );
};

export default About

