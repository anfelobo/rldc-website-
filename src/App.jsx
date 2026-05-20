import { useEffect, useRef, useState } from "react";
// Carrusel de galería

function GalleryCarousel() {
  const images = [
    "/galeria/grupo.jpeg",
    "/galeria/grupo2.jpeg",
    "/galeria/04.JPG",
    "/galeria/05.JPG",
    "/galeria/06.JPG",
    "/galeria/07.jpg",
    "/galeria/11.png",
    "/galeria/12.png",
    "/galeria/10.png",
    "/galeria/09.png"
  

  ];
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [fade, setFade] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setPrevIdx((prev) => current);
          setCurrent((prev) => (prev + 1) % images.length);
          setFade(false);
        }, 400);
      }, 3000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [paused, images.length, current]);

  // Solo pausar cuando el usuario interactúa
  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setPrevIdx(current);
      setCurrent((prev) => (prev + 1) % images.length);
      setFade(false);
    }, 400);
    setPaused(true);
  };
  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setPrevIdx(current);
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
      setFade(false);
    }, 400);
    setPaused(true);
  };
  const goTo = (idx) => {
    setFade(true);
    setTimeout(() => {
      setPrevIdx(current);
      setCurrent(idx);
      setFade(false);
    }, 400);
    setPaused(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/40 min-h-[400px] flex items-center justify-center">
        {/* Imagen anterior para el fade */}
        <img
          src={images[prevIdx]}
          alt="prev"
          className={`absolute inset-0 w-full h-[400px] object-contain transition-opacity duration-500 ${fade ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          draggable={false}
        />
        {/* Overlay negro para el fade */}
        {fade && (
          <div className="absolute inset-0 bg-black/80 transition-opacity duration-500 z-20 pointer-events-none" />
        )}
        {/* Imagen actual */}
        <img
          src={images[current]}
          alt={`Imagen ${current + 1}`}
          className={`relative w-full h-[400px] object-contain transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
          draggable={false}
        />
        {/* Controles */}
        <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-3 hover:bg-black/80 transition z-30">
          &#8592;
        </button>
        <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-3 hover:bg-black/80 transition z-30">
          &#8594;
        </button>
        <button
          onClick={() => setPaused((p) => !p)}
          className="absolute bottom-4 right-1/2 translate-x-1/2 bg-black/60 text-white rounded-full px-6 py-2 text-base hover:bg-black/80 transition z-30"
        >
          {paused ? "Reanudar" : "Pausar"}
        </button>
        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-4 h-4 rounded-full border-2 ${idx === current ? "bg-blue-400 border-blue-400" : "bg-white/40 border-white/70"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
// ...existing code...
import { Mail, Users, Calendar, Home, Image as ImageIcon } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const NavItem = ({ icon: IconComponent, label, value, onClick, isActive }) => ( // eslint-disable-line no-unused-vars
  <button
    onClick={() => onClick(value)}
    className={`flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-2xl transition-all duration-300 font-medium cursor-pointer text-sm md:text-base ${
      isActive
        ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg scale-105"
        : "hover:bg-white/5 text-gray-300 hover:text-white hover:scale-105 backdrop-blur-sm"
    }`}
  >
    <IconComponent size={18} className="md:w-5 md:h-5" />
    <span className="hidden md:inline">{label}</span>
  </button>
);


export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
        <div>
          <nav className="flex justify-center gap-2 md:gap-6 p-4 md:p-6 bg-black/10 backdrop-blur-md border-b border-white/5 overflow-x-auto">
            <NavItem icon={Home} label="Inicio" value="home" onClick={setPage} isActive={page === "home"} currentPage={page} />
            <NavItem icon={Users} label="Nosotros" value="about" onClick={setPage} isActive={page === "about"} currentPage={page} />
            <NavItem icon={Calendar} label="Actividades" value="activities" onClick={setPage} isActive={page === "activities"} currentPage={page} />
            <NavItem icon={ImageIcon} label="Galería" value="gallery" onClick={setPage} isActive={page === "gallery"} currentPage={page} />
            <NavItem icon={Mail} label="Contacto" value="contact" onClick={setPage} isActive={page === "contact"} currentPage={page} />

          </nav>
        </div>
      </header>

      {/* CONTENT */}
      {page !== "gallery" && (
        <main className="p-8 max-w-6xl mx-auto">
          {page === "home" && <HomePage setPage={setPage} />}
          {page === "about" && <About />}
          {page === "activities" && <Activities />}
          {page === "contact" && <Contact />}
        </main>
      )}
      {/* Galería a pantalla completa */}
      {page === "gallery" && (
        <section className="w-full min-h-[80vh] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16">
          <h2 className="text-4xl font-bold mb-10 text-center text-white">Galería</h2>
          <GalleryCarousel />
        </section>
      )}
    </div>
  );
}

function Activities() {
  const events = [
    {
      title: "Festival de Astronomía de Villa de Leyva",
      date: "Marzo 2026",
      description: "Únete al festival astronómico más importante de Colombia. Observaciones nocturnas, charlas con expertos y actividades para toda la familia.",
      icon: "🎭",
      link: "https://festivaldeastronomia.com"
    },
     {
      title: "CISMA CONGRESO INTERNACIONAL DE STEAM Y METODOGIAS ACTIVAS",
      date: "Noviembre 2026",
      description: "Prepárate para vivir una experiencia transformadora con ponencias de alto impacto, talleres exclusivos y una comunidad vibrante que está cambiando el mundo.",
      icon: "⚛️",
      link: "https://www.instagram.com/cismasteamm"
    },
  {
      title: "NASA Space Apps Challenge",
      date: "Octubre 2026",
      description: "Participa en el hackathon global de NASA Space Apps. Resuelve problemas reales del espacio con datos de la NASA y crea soluciones innovadoras.",
      icon: "🚀",
      link: "https://www.spaceappschallenge.org/"
    },
    {
      title: "SEMANA DEL CEREBRO",
      date: "Marzo 2026",
      description: "La Semana del Cerebro Colombia fue mucho más que actividades: fue encuentro, curiosidad, preguntas que nos movieron por dentro y personas increíbles dejando huella en cada espacio.",
      icon: "🌙",
      link: "https://www.instagram.com/baw_colombia?igsh=MXNlajI4YmZ5NjduaA%3D%3D"
    },
    {
      title: "Aula bajo las estrellas",
      date: "Agosto 2026",
      description: "Descubre los secretos de la fotografía astronómica con expertos que compartirán técnicas y equipo necesario.",
      icon: "🌙",
      /*icon: "📸",*/
      link: "https://rac.net.co/nuevositio/aula-bajo-las-estrellas-2026/"
    },
   
    {
      title: "Noche de las Estrellas",
      date: "Julio 2026",
      description: "Evento especial con telescopios profesionales y charlas sobre constelaciones y mitología astronómica.",
      icon: "⭐",
      link: "https://tusitio.com/fisica-cuantica"
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Próximas Actividades
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Descubre nuestros eventos científicos diseñados para inspirar y educar.
          Desde observaciones astronómicas hasta talleres interactivos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl mb-4">{event.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-white">{event.title}</h2>
                <p className="text-purple-300 font-medium mb-3">{event.date}</p>
                <p className="text-gray-300 leading-relaxed">{event.description}</p>
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg shadow hover:from-emerald-600 hover:to-blue-600 transition-colors duration-200 font-semibold"
                  >
                    Ver más
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Red Latinoamericana de Divulgación Científica
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Conectamos científicos, educadores y entusiastas para democratizar el conocimiento científico en América Latina
        </p>
      </div>

      {/* ¿Qué es la red? */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            ¿Qué es la Red Latinoamericana de Divulgación Científica?
          </h2>
        </div>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                La divulgación científica surge de la necesidad de acercar el conocimiento a diferentes espacios de investigación, transformando las temáticas científicas en productos de enseñanza accesibles para un público general.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Muchas personas no han tenido la oportunidad de abordar ciertos contenidos en sus espacios institucionales, ya sea por limitaciones curriculares, falta de acceso a la información o escasez de estrategias pedagógicas adecuadas.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                En este sentido, la divulgación científica permite cerrar esta brecha, promoviendo un aprendizaje más inclusivo, dinámico y comprensible para toda la sociedad.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <div className="w-[250px] h-[250px] rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/divulgadores/logo_red_circular.png" alt="Logo RLDC" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Misión */}
          <div className="bg-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-blue-300">Nuestra Misión</h3>
            <p className="text-gray-300 leading-relaxed">
              La Red Latinoamericana de Divulgación Científica (RLDC) tiene como propósito ser un espacio colaborativo para divulgadores científicos, facilitando la creación y difusión de contenidos rigurosos y accesibles a través de medios digitales. Buscamos fortalecer la cultura científica en Latinoamérica, promoviendo el pensamiento crítico y el acceso a información confiable para todas las comunidades.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Nuestra Visión</h3>
            <p className="text-gray-300 leading-relaxed">
              La Red Latinoamericana de Divulgación Científica (RLDC) aspira a convertirse en la principal red de divulgación científica en Latinoamérica, con presencia en múltiples plataformas digitales y una comunidad activa de divulgadores comprometidos con la educación y la ciencia. Queremos inspirar a las nuevas generaciones a aprender, cuestionar y contribuir al desarrollo del conocimiento científico en la región.
            </p>
          </div>
        </div>
      </div>

      {/* ¿Por qué importa? */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ¿Por qué importa la divulgación científica?
          </h2>
        </div>
        <div className="space-y-6 mb-8">
          <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            A lo largo del tiempo, la divulgación ha impactado a un sinnúmero de comunidades, inspirando a nuevas generaciones a formar parte del ciclo de formación de divulgadores científicos. Gracias a su capacidad de traducir conceptos complejos en información accesible, la divulgación ha permitido que más personas comprendan, valoren y se interesen por la ciencia.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            En los últimos años, el auge de las redes sociales ha transformado profundamente la manera en que se difunde el conocimiento. Los espacios digitales se han convertido en una herramienta esencial, pero también han dado lugar a la propagación de desinformación y contenidos pseudocientíficos.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/10 rounded-xl">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-3 text-emerald-300">Pensamiento Crítico</h3>
            <p className="text-gray-300">
              Fomenta el análisis racional y la toma de decisiones informadas en una sociedad cada vez más compleja.
            </p>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-xl">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-3 text-cyan-300">Combate la Desinformación</h3>
            <p className="text-gray-300">
              Enfrenta el reto de combatir la desinformación con rigor, claridad y accesibilidad en la era digital.
            </p>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-xl">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-3 text-blue-300">Cohesión Social</h3>
            <p className="text-gray-300">
              Une comunidades diversas alrededor de intereses comunes y construye puentes entre ciencia y sociedad.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-300 leading-relaxed">
            A este desafío se suma la falta de inversión en los procesos de divulgación científica. La producción de contenidos de calidad requiere tiempo, recursos y formación, lo que implica una carga considerable para los divulgadores.
          </p>
        </div>
      </div>

      {/* ¿Por qué unirme? */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            ¿Por qué unirte a nuestra red?
          </h2>
        </div>
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            La RLDC está dirigida a entidades jurídicas y naturales que, a través del uso de redes sociales, tengan como objetivo crear, diseñar, publicar y/o colaborar con contenido de alto valor científico. Asimismo, está abierta a eventos científicos cuyo propósito sea la creación, enseñanza y/o difusión de conocimientos científicos, fomentando la colaboración entre los miembros y expandiendo el acceso a la divulgación científica en toda Latinoamérica.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">🚀</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-emerald-300">Amplifica tu impacto</h3>
                <p className="text-gray-300">Únete a una comunidad que multiplica el alcance de tu trabajo divulgativo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">🤝</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-cyan-300">Colaboración</h3>
                <p className="text-gray-300">Trabaja en proyectos conjuntos con colegas de toda América Latina.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">📚</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-blue-300">Aprendizaje continuo</h3>
                <p className="text-gray-300">Accede a recursos, capacitaciones y experiencias de otros divulgadores.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">🌟</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-indigo-300">Visibilidad</h3>
                <p className="text-gray-300">Aumenta la visibilidad de tu trabajo y llega a nuevas audiencias.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">🎯</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-violet-300">Propósito compartido</h3>
                <p className="text-gray-300">Forma parte de un movimiento que transforma la relación entre ciencia y sociedad.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">💪</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-pink-300">Apoyo mutuo</h3>
                <p className="text-gray-300">Recibe y brinda apoyo en tus iniciativas divulgativas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-6 text-white">¿Listo para unirte?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Si eres un divulgador científico apasionado por compartir conocimiento, queremos conocerte.
        </p>
        <button
          onClick={() => {
            console.log('Navegando a contact');
            setPage("contact");
          }}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          Únete a Nuestra Red
        </button>
      </div>
    </div>
  );
}

function About() {
  const teamMembers = [
       {
      name: "Semillero Ceres",
      role: "Semillero de investigación",
      photo: "/divulgadores/@semillero_ceres.png",
      description: "Dedicada  al asesoramiento, investigación y divulgación de proyectos científicos, promoviendo el conocimiento, la innovación y el desarrollo en distintos campos de la ciencia.",
      instagram: "@semillero_ceres"
    },
    {
      name: "Semillero Tejedores",
      role: "Semillero de investigación",
      photo: "/divulgadores/@semillero_tejedores.png",
      description: "Semillero de investigación que forma jóvenes científicos enfocado en el área de la salud. Nos enfocamos en proyectos relacionados al campo de lo quirúrgico",
      instagram: "@semillero_tejedores"
    },
    {
      name: "Proyecto Constelación",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@proyecto_constelacion_.png",
      description: "Somos una cuenta de divulgación que crea contenido para que las ciencias astronómicas sean más visibles y mucho más fáciles de entender. Además, apoyamos el trabajo de las mujeres en la ciencia y visibilizamos su labor; realizamos publicaciones, talleres y charlas relacionadas con esta temática.",
      instagram: "@proyecto_constelacion_"
    },
    {
      name: "Space Fan",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@s_spacefan.png",
      description: "Cuenta dedicada a la divulgación cíentifica, comparte curiosidades, conocimientos, recomendaciones y noticias;   enfocada principalmente en astronomia, exploración espacial física y astrofísica. Esto con el fin de acercar la ciencia a personas de todas las edades.",
      instagram: "@s_spacefan"
    },
    {
      name: "Turismo hacia las Estrellas",
      role: "Guía Astronómico Turístico",
      photo: "/divulgadores/@turismohacialasestrellas.png",
      description: "Es una agencia de viajes que promueve  la divulgación científica a través de experiencias como el Astroturismo y también lleva a cabo actividades de apropiación Cultural, de Naturaleza, Bienestar y Deportivo.",
      instagram: "@turismohacialasestrellas"
    },

         {
      name: "Shaula Grupo Bioastronomía",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@shaulagrupobioastronomia.png",
      description: "Comunidad de aprendizaje intergeneracional integrada por niñas y niños entre los 5 y los 125 años, que integra astronomía, biología y ciencias humanas, promoviendo la lectura, la curiosidad, la conversación y el aprendizaje compartido como formas de acercamiento a las ciencias.",
      instagram: "@shaulagrupobioastronomia"
    },
    {
      name: "Anfelobo",
      role: "Divulgador Científico",
      photo: "/divulgadores/@anfelobo.png",
      description: "Divulgador de ciencia apasionado por la astronomía y la naturaleza. Busco transformar la curiosidad en conocimiento y acercar el universo a las personas, creando puentes entre la ciencia, la Tierra y nuestra forma de habitarla",
      instagram: "@anfelobo"
    },
        {
      name: "Revista Petroglifos",
      role: "Revista Cientifica",
      photo: "/divulgadores/@revistapetroglifos.png",
      description: "Es una revista científica indexada y arbitrada de la Fundación GIFET. Con un enfoque de publicación continua y revisión por pares, difunde y divulga investigaciones transdisciplinares sobre realidades socioculturales, educativas, agroproductivas y tecnológicas para investigadores y profesionales de América Latina y el Caribe.",
      instagram: "@revistapetroglifos"
    },
    {
      name: "Museo del Vidrio de Bogotá",
      role: "Institución Cultural Científica",
      photo: "/divulgadores/@museodelvidriodebogota.png",
      description: "Museo que combina arte, ciencia y tecnología del vidrio. Realizamos exposiciones y talleres sobre ciencia de materiales.",
      instagram: "@museodelvidriodebogota"
    },
    {
      name: "Arka Vitae",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@arkavitae.png",
      description: "Enfocada en biología y naturaleza, compartiendo contenido educativo, visual y accesible sobre biodiversidad, evolución y ciencia, acercando el conocimiento al público general de forma clara y atractiva.",
      instagram: "@arkavitae"
    },
    {
      name: "Laura Sofía",
      role: "Divulgadora Científica",
      photo: "/divulgadores/@lau_sofiaoficial.png",
      description: "Comunicadora científica enfocada en astronomía y física. Creo contenido educativo para jóvenes y familias.",
      instagram: "@lau_sofiaoficial"
    },
    {
      name: "Cefeidas BDI",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@cefeidas.bdi.png",
      description: "Grupo de divulgación científica enfocado en inspirar, educar y empoderar a niñas, jóvenes y mujeres en el ámbito de la ciencia. Buscamos acercar la ciencia a diversos territorios y contextos, promoviendo la curiosidad, el pensamiento crítico y la construcción de referentes.Grupo dedicado al estudio de estrellas variables Cefeidas. Usamos estos 'candiles cósmicos' para medir distancias en el universo.",
      instagram: "@cefeidas.bdi"
    },/*
    {
      name: "Alexander Urzola",
      role: "Divulgador Científico",
      photo: "/divulgadores/@alexanderurzola.png",
      description: "Especialista en neurociencia y psicología. Comparto conocimientos sobre el funcionamiento del cerebro humano.",
      instagram: "@alexanderurzola"
    },*/
    {
      name: "Planetario Cosmo",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@planetario_cosmo.png",
      description: "Planetario dedicado a la educación astronómica. Ofrecemos proyecciones, talleres y charlas sobre el universo.",
      instagram: "@planetario_cosmo"
    },
    {
      name: "Sci Cousins",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@scicousins.png",
      description: "Compartimos contenido científico, avances, curiosidades y nuestras experiencias, porque la ciencia es de todos y para todos!Hermanos dedicados a la divulgación científica familiar. Creamos contenido educativo divertido para todas las edades.",
      instagram: "@scicousins"
    },
    {
      name: "Exploradores de Estrellas",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@exploradoresdeestrellas.png",
      description: "Grupo de jóvenes exploradores del universo. Realizamos observaciones, proyectos científicos y actividades educativas.",
      instagram: "@exploradoresdeestrellas"
    },
    {
      name: "Astronomízate",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@astronomizate_oficial.png",
      description: "Astronomízate es un proyecto de comunicación y divulgación de la ciencia, principalmente de la Astronomía. Realizamos nuestra labor a través de redes sociales y plataformas de contenido multimedia. Así como también a través de actividades presenciales y virtuales donde se imparten talleres, conferencias, cursos, asesorías y observaciones con telescopio.",
      instagram: "@astronomizate_oficial"
    },

    {
      name: "Grupo Astro Wow",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@grupoastrowow.png",
      description: "Equipo apasionado por compartir el 'wow' de la astronomía. Creamos contenido que maravilla y educa sobre el universo.",
      instagram: "@grupoastrowow"
    },
    {
      name: "Gauteovan de Astronomía",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@Gauteovan.png",
      description: "Grupo de Aficionados de Santa Marta Colombia,  dedicados a la divulgación científica.",
      instagram: "@gauteovanastronomia"
    },
    {
      name: "El Microscopio Podcast",
      role: "Podcast Científico",
      photo: "/divulgadores/@el_microscopio_podcast.png",
      description: "Pódcast de divulgación científica creado para acercar a los niños, niñas y niñes entre 5 y 12 años y a sus familias a la ciencia.",
      instagram: "@el_microscopio_podcast"
    },
       {
      name: "Samuel Restrepo",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@logo_vacio.png",
      description: "El contenido que comparto es sobre geología, explicando conceptos, fenómenos, temas, o acontecimientos de actualidad que en esencia pueden ser complejos en términos técnicos de una manera sencilla, con el fin de expandir el conocimientos de estos mientras le doy visibilidad a la geología como ciencia.",
      instagram: "@restrepolito__"
    },
       {
      name: "Macientifica",
      role: "Divulgadora cientifica",
      photo: "/divulgadores/@macientifica.png",
      description: "Descripción: Microbiologa y mamá, me gusta divulgar ciencia accesible sobre los microorganismos que nos rodean, desde el pan hasta las enfermedades.",
      instagram: "@macientifica"
    },
           {
      name: "Biología con Brandon",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@biologiaconbrandon_.png",
      description: "Es una cuenta de Instagram dedicada a la difusión y divulgación de las ciencias biológicas, desde su nivel molecular hasta las complejas interacciones poblacionales y evolución. Nace de un intento de complementar la literatura de divulgación con contenido digital para buscar que más personas se interesen por leer temas biológicos.",
      instagram: "@biologiaconbrandon_"
    },
           {
      name: "Astroñoña de Confianza",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@astronona_deconfianza.png",
      description: "Dedicada a la  divulgación y pedagogía en ciencias del universo para aquellos que estén interesados en empezar y aprender sobre este campo de conocimiento.",
      instagram: "@astronona_deconfianza"
    },
           {
      name: "Capítulos SPIEEAFIT",
      role: "Grupo estudiantil",
      photo: "/divulgadores/@capitulospieeafit.png",
      description: "Grupo estudiantil que promueve, divulga y fortalece el conocimiento científico, con énfasis en el fascinante mundo de la óptica y la fotónica",
      instagram: "@capitulospieeafit"
    }    ,
           {
      name: "Genesitamedialuna",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@logo_vacio.png",
      description: "Divulgadora cientifica con datos curiosos, recursos y explicaciones accesibles sobre biotecnología. También comparto contenido de humor y experiencias reales sobre la vida en el laboratorio y mi trayectoria como estudiante del área STEM",
      instagram: "@genesitamedialuna"
    }    ,
           {
      name: "Cienciatropical",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@cienciatropical.png",
      description: "Somos un equipo interdisciplinario de jóvenes comprometidos con la divulgación de la ciencia y la naturaleza para aportar a la construcción de un mejor país. Desde 2019, Ciencia Tropical impulsa la divulgación de la biodiversidad, la ciencia participativa y la construcción de conocimiento colectivo a través de plataformas digitales.",
      instagram: "@cienciatropical"
    }       ,
           {
      name: "Alejandra Villalvazo",
      role: "Divulgador cientifico",
      photo: "/divulgadores/@logo_vacio.png",
      description: "Dedicada a la  divulgación y pedagogía en ciencias del universo para aquellos que estén interesados en empezar y aprender sobre este campo de conocimiento.",
      instagram: "@avlvppr"
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Nuestra Red de Divulgadores
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Conoce a los miembros de nuestra comunidad de divulgadores científicos en América Latina
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {/* Imagen de fondo */}
            <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-2xl">
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 object-contain rounded-lg"
              />
            </div>

            {/* Contenido principal */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
              <p className="text-blue-300 font-medium text-sm mb-2">{member.role}</p>
              <p className="text-purple-200 text-xs">{member.instagram}</p>
            </div>

            {/* Descripción en hover */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center text-center">
              <h3 className="text-lg font-bold mb-2">{member.name}</h3>
              <p className="text-blue-300 font-medium mb-2 text-sm">{member.role}</p>
              <p className="text-purple-200 text-xs mb-3">{member.instagram}</p>
              <p className="text-xs leading-relaxed text-gray-200">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Mapa />
    </div>
  );
}

function Mapa() {
  // Ubicaciones con coordenadas y colores
  const locations = [
    {
      country: "Colombia",
      count: 19,
      position: [4.5709, -74.2973],
      description: "18 divulgadores científicos",
      color: "#10b981" // Emerald
    },
    {
      country: "México",
      count: 4,
      position: [23.6345, -102.5528],
      description: "4 divulgadores científicos",
      color: "#3b82f6" // Blue
    },
      {
      country: "Ecuador",
      count: 1,
      position: [-1.831239, -78.183406],
      description: "1 divulgador científico",
      color: "#f59e0b"
    }, 
    {
      country: "Guatemala",
      count: 1,
      position: [15.7835, -90.2308],
      description: "1 divulgador científico",
      color: "#8b5cf6"
    },
      {
      country: "Venezuela",
      count: 1,
      position: [6.4238, -66.5897],
      description: "1 divulgador científico",
      color: "#ec4899"
    },
    /*
    {
      country: "Estados Unidos",
      count: 0,
      position: [37.0902, -95.7129],
      description: "0 divulgadores científicos",
      color: "#f97316"
    },
    {
      country: "Canadá",
      count: 0,
      position: [56.1304, -106.3468],
      description: "0 divulgadores científicos",
      color: "#38bdf8"
    },
    {
      country: "Belice",
      count: 0,
      position: [17.1899, -88.4976],
      description: "0 divulgadores científicos",
      color: "#a855f7"
    },   
    {
      country: "El Salvador",
      count: 0,
      position: [13.7942, -88.8965],
      description: "0 divulgadores científicos",
      color: "#14b8a6"
    },
    {
      country: "Honduras",
      count: 0,
      position: [15.199999, -86.241905],
      description: "0 divulgadores científicos",
      color: "#22c55e"
    },
    {
      country: "Nicaragua",
      count: 0,
      position: [12.865416, -85.207229],
      description: "0 divulgadores científicos",
      color: "#0ea5e9"
    },
    {
      country: "Costa Rica",
      count: 0,
      position: [9.748917, -83.753428],
      description: "0 divulgadores científicos",
      color: "#6366f1"
    },
    {
      country: "Panamá",
      count: 0,
      position: [8.537981, -80.782127],
      description: "0 divulgadores científicos",
      color: "#f43f5e"
    },
    {
      country: "Cuba",
      count: 0,
      position: [21.521757, -77.781167],
      description: "0 divulgadores científicos",
      color: "#fb7185"
    },
    {
      country: "República Dominicana",
      count: 0,
      position: [18.735693, -70.162651],
      description: "0 divulgadores científicos",
      color: "#8b5cf6"
    },
    {
      country: "Haití",
      count: 0,
      position: [18.971187, -72.285215],
      description: "0 divulgadores científicos",
      color: "#f59e0b"
    },
    {
      country: "Jamaica",
      count: 0,
      position: [18.109581, -77.297508],
      description: "0 divulgadores científicos",
      color: "#14b8a6"
    },
    {
      country: "Bahamas",
      count: 0,
      position: [25.03428, -77.39628],
      description: "0 divulgadores científicos",
      color: "#22c55e"
    },
    {
      country: "Barbados",
      count: 0,
      position: [13.193887, -59.543198],
      description: "0 divulgadores científicos",
      color: "#0ea5e9"
    },
    {
      country: "Trinidad y Tobago",
      count: 0,
      position: [10.691803, -61.222503],
      description: "0 divulgadores científicos",
      color: "#6366f1"
    },
    {
      country: "Antigua y Barbuda",
      count: 0,
      position: [17.060816, -61.796428],
      description: "0 divulgadores científicos",
      color: "#fb7185"
    },
    {
      country: "Dominica",
      count: 0,
      position: [15.415, -61.371],
      description: "0 divulgadores científicos",
      color: "#f97316"
    },
    {
      country: "Santa Lucía",
      count: 0,
      position: [13.909444, -60.978893],
      description: "0 divulgadores científicos",
      color: "#22c55e"
    },
    {
      country: "San Vicente y las Granadinas",
      count: 0,
      position: [12.984305, -61.287228],
      description: "0 divulgadores científicos",
      color: "#0ea5e9"
    },
    {
      country: "Granada",
      count: 0,
      position: [12.1165, -61.6790],
      description: "0 divulgadores científicos",
      color: "#14b8a6"
    },
    {
      country: "San Cristóbal y Nieves",
      count: 0,
      position: [17.357822, -62.782998],
      description: "0 divulgadores científicos",
      color: "#8b5cf6"
    },
  
  
    {
      country: "Perú",
      count: 0,
      position: [-9.189967, -75.015152],
      description: "0 divulgadores científicos",
      color: "#fb7185"
    },
    {
      country: "Bolivia",
      count: 0,
      position: [-16.290154, -63.588653],
      description: "0 divulgadores científicos",
      color: "#0ea5e9"
    },
    {
      country: "Chile",
      count: 0,
      position: [-35.675147, -71.542969],
      description: "0 divulgadores científicos",
      color: "#22c55e"
    },
    {
      country: "Argentina",
      count: 0,
      position: [-38.416097, -63.616672],
      description: "0 divulgadores científicos",
      color: "#6366f1"
    },
    {
      country: "Uruguay",
      count: 0,
      position: [-32.522779, -55.765835],
      description: "0 divulgadores científicos",
      color: "#3b82f6"
    },
    {
      country: "Paraguay",
      count: 0,
      position: [-23.442503, -58.443832],
      description: "0 divulgadores científicos",
      color: "#8b5cf6"
    },
    {
      country: "Brasil",
      count: 0,
      position: [-14.235004, -51.925278],
      description: "0 divulgadores científicos",
      color: "#10b981"
    },
    {
      country: "Surinam",
      count: 0,
      position: [3.919305, -56.027783],
      description: "0 divulgadores científicos",
      color: "#f97316"
    },
    {
      country: "Guyana",
      count: 0,
      position: [4.860416, -58.93018],
      description: "0 divulgadores científicos",
      color: "#f43f5e"
    }
    */
  ];

  // Posición inicial centrada en América Latina
  const centerMap = [10.5, -80];
  const zoomLevel = 4;

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          Nuestra Presencia en América Latina
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Descubre dónde están ubicados nuestros divulgadores científicos en la región
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        {/* Contenedor del Mapa */}
        <div className="map-container mb-8">
          <MapContainer
            center={centerMap}
            zoom={zoomLevel}
            style={{ height: '100%', width: '100%' }}
            className="rounded-xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Renderizar Marcadores */}
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={location.position}
                icon={createCustomIcon(location.color)}
              >
                <Popup className="custom-popup">
                  <div className="text-center">
                    <h4 className="font-bold text-lg mb-2">{location.country}</h4>
                    <p className="text-sm mb-1">{location.description}</p>
                    <div className="text-2xl font-bold text-blue-600">
                      {location.count}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Círculos de radio para visualizar cobertura */}
            {locations.map((location, index) => (
              <CircleMarker
                key={`circle-${index}`}
                center={location.position}
                radius={15}
                fillOpacity={0.1}
                color={location.color}
                weight={2}
              />
            ))}
          </MapContainer>
        </div>

        {/* Estadísticas bajo el mapa */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locations.map((location, index) => (
            <div
              key={index}
              className="text-center p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl hover:from-white/20 hover:to-white/10 transition-all cursor-pointer border border-white/5"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                {location.count}
              </div>
              <div className="text-sm text-gray-300 mt-1">{location.country}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Función auxiliar para crear iconos personalizados
function createCustomIcon(color) {
  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 41" width="32" height="41">
        <path d="M16 0C7.16 0 0 7.16 0 16c0 11 16 25 16 25s16-14 16-25c0-8.84-7.16-16-16-16z" fill="${color}"/>
        <circle cx="16" cy="15" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 41],
    iconAnchor: [16, 41],
    popupAnchor: [0, -35],
    className: 'marker-icon-custom'
  });
}

// ...existing code...
function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Formspree endpoint proporcionado por el usuario
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgpzwya";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });
      if (res.ok) {
        setShowSuccess(true);
        form.reset();
      }
    } catch (err) {
      // Error handling opcional
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Únete a Nuestra Red
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          ¿Eres un divulgador científico apasionado? Completa el formulario y únete a nuestra comunidad.
        </p>
      </div>

      {/* Popup de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-emerald-600">¡Solicitud enviada!</h2>
            <p className="text-gray-700 mb-6">Hemos recibido tus datos, pronto nos pondremos en contacto contigo.<br/>¡Gracias por tu interés!</p>
            <button
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-xl font-bold hover:from-emerald-600 hover:to-blue-600 transition"
              onClick={() => setShowSuccess(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Formulario */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">Solicitud de Membresía</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                required
                placeholder="Tu nombre completo"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Correo electrónico</label>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Especialidad/Área de interés</label>
              <input
                type="text"
                name="especialidad"
                required
                placeholder="Ej: Astronomía, Biología, Física, etc."
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Perfil en redes sociales</label>
              <input
                type="text"
                name="redes"
                placeholder="@tuusuario o enlace a tu perfil"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Cuéntanos sobre ti</label>
              <textarea
                rows="5"
                name="mensaje"
                required
                placeholder="Describe tu experiencia en divulgación científica, proyectos en los que has trabajado, y por qué quieres unirte a la RLDC..."
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 p-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "🚀 Enviar Solicitud de Membresía"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
