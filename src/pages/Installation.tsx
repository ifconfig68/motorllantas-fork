      import React from 'react';
      import './Installation.css';
      // @ts-ignore
      import installation1 from '../assets/img/instalacion1.JPG';
      // @ts-ignore
      import installation2 from '../assets/img/instalacion2.JPG';
      
      const Installation: React.FC = () => {
        return (
          <div className="page-container installation-page">
            <div className="installation-content">
             <h2 className="installation-title">Instalación Segura y precisa</h2>
             
             <div className="installation-section-full">
               <p>En <strong>Motorllantas</strong> el proceso de instalación comienza con una revisión completa del vehículo para garantizar que cada llanta sea la indicada. Nuestro equipo técnico analiza el tipo de vehículo, el uso que se le da y las condiciones de manejo antes de realizar cualquier cambio. Así aseguramos que tu inversión se traduzca en seguridad, agarre y rendimiento. Desde el primer momento, recibes asesoría personalizada y una atención rápida para que tu vehículo quede listo en el menor tiempo posible, con la confianza de estar en manos expertas.</p>
             </div>
     
             <div className="installation-section">
               <div className="installation-image">
                 <img src={installation1} alt="Instalación de llantas 1" className="installation-img-1"/>
               </div>
               <div className="installation-text">
                 <p>Durante la instalación, aplicamos tecnología de última generación para lograr un montaje y balanceo preciso. Cada llanta se ajusta con herramientas profesionales, calibradas al detalle, evitando daños en los rines y garantizando un desempeño óptimo. Nuestro equipo verifica presión, válvulas y torque de seguridad, asegurando que cada pieza quede en su punto exacto. Además, te mantenemos informado de cada paso, para que sepas exactamente qué se está haciendo con tu vehículo y por qué es importante hacerlo con especialistas certificados como los de <strong>Motorllantas</strong>.</p>
               </div>
             </div>
     
             <div className="installation-section">
               <div className="installation-text">
                 <p>Al finalizar, realizamos una revisión final y prueba de calidad para que salgas con la tranquilidad de que tus llantas están instaladas correctamente y listas para rendir al máximo. Te entregamos recomendaciones de mantenimiento y calibración para que prolongues su vida útil y disfrutes de una conducción segura. En  <strong>Motorllantas</strong> no solo cambiamos llantas, te ayudamos a cuidar tu inversión y tu seguridad en la vía. Agenda tu instalación hoy mismo y siente la diferencia de un servicio profesional, rápido y garantizado.</p>
               </div>
               <div className="installation-image">
                 <img src={installation2} alt="Instalación de llantas 2" className="installation-img-2"/>
               </div>
             </div>
     
           </div>
         </div>
       );
     };
     
     export default Installation;