import { useState } from "react";
import { Mail, Users, Calendar, Home } from "lucide-react";
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
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10" />
        <div className="relative">
          <nav className="flex justify-center gap-2 md:gap-6 p-4 md:p-6 bg-black/10 backdrop-blur-md border-b border-white/5 overflow-x-auto">
            <NavItem icon={Home} label="Inicio" value="home" onClick={setPage} isActive={page === "home"} currentPage={page} />
            <NavItem icon={Users} label="Nosotros" value="about" onClick={setPage} isActive={page === "about"} currentPage={page} />
            <NavItem icon={Calendar} label="Actividades" value="activities" onClick={setPage} isActive={page === "activities"} currentPage={page} />
            <NavItem icon={Mail} label="Contacto" value="contact" onClick={setPage} isActive={page === "contact"} currentPage={page} />
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="p-8 max-w-6xl mx-auto">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "about" && <About />}
        {page === "activities" && <Activities />}
        {page === "contact" && <Contact />}
      </main>
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
      link: "https://festivalvillaastronomia.com"
    },
    {
      title: "Observación Lunar",
      date: "Abril 2026",
      description: "Únete a nuestra sesión de observación astronómica para admirar la Luna y aprender sobre sus fases y características.",
      icon: "🌙",
      link: "https://tusitio.com/fisica-cuantica"
    },
    {
      title: "Charla de Astrofotografía",
      date: "Mayo 2026",
      description: "Descubre los secretos de la fotografía astronómica con expertos que compartirán técnicas y equipo necesario.",
      icon: "📸",
      link: "https://tusitio.com/fisica-cuantica"
    },
    {
      title: "Taller de Física Cuántica",
      date: "Junio 2026",
      description: "Explora los fundamentos de la mecánica cuántica a través de experimentos interactivos y demostraciones.",
      icon: "⚛️",
      link: "https://tusitio.com/fisica-cuantica"
    },
    {
      title: "NASA Space Apps Challenge",
      date: "Junio 2026",
      description: "Participa en el hackathon global de NASA Space Apps. Resuelve problemas reales del espacio con datos de la NASA y crea soluciones innovadoras.",
      icon: "🚀",
      link: "https://www.spaceappschallenge.org/"
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
                <h2 className="text-2xl font-bold mb-2 text-blue-300">{event.title}</h2>
                <p className="text-purple-300 font-medium mb-3">{event.date}</p>
                <p className="text-gray-300 leading-relaxed">{event.description}</p>
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
                <div className="text-6xl">🔬</div>
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
      name: "Shaula Grupo Bioastronomía",
      role: "Grupo de Investigación Bioastronómica",
      photo: "/divulgadores/@shaulagrupobioastronomia.png",
      description: "Grupo dedicado al estudio de la vida en el universo. Realizamos investigaciones sobre exoplanetas habitables y la búsqueda de vida extraterrestre.",
      instagram: "@shaulagrupobioastronomia"
    },
    {
      name: "Proyecto Constelación",
      role: "Iniciativa Educativa Astronómica",
      photo: "/divulgadores/@proyecto_constelacion_.png",
      description: "Proyecto que conecta estudiantes con el cielo nocturno. Organizamos observaciones astronómicas y talleres de astronomía básica.",
      instagram: "@proyecto_constelacion_"
    },
    {
      name: "Semillero Tejedores",
      role: "Grupo de Investigación Juvenil",
      photo: "/divulgadores/@semillero_tejedores.png",
      description: "Semillero de investigación que forma jóvenes científicos. Nos enfocamos en proyectos interdisciplinarios de ciencia y tecnología.",
      instagram: "@semillero_tejedores"
    },
    {
      name: "S Space Fan",
      role: "Divulgador Espacial",
      photo: "/divulgadores/@s_spacefan.png",
      description: "Apasionado por el espacio y la exploración espacial. Comparto noticias, curiosidades y conocimientos sobre el universo.",
      instagram: "@s_spacefan"
    },
    {
      name: "Turismo hacia las Estrellas",
      role: "Guía Astronómico Turístico",
      photo: "/divulgadores/@turismohacialasestrellas.png",
      description: "Especialistas en turismo astronómico. Organizamos viajes a lugares con cielos oscuros y experiencias de observación únicas.",
      instagram: "@turismohacialasestrellas"
    },
    {
      name: "Semillero Ceres",
      role: "Grupo de Astronomía",
      photo: "/divulgadores/@semillero_ceres.png",
      description: "Semillero dedicado al estudio de asteroides y cuerpos menores del sistema solar. Investigamos el asteroide Ceres y otros objetos.",
      instagram: "@semillero_ceres"
    },
    {
      name: "Anfelobo",
      role: "Divulgador Científico",
      photo: "/divulgadores/@anfelobo.png",
      description: "Comunicador científico especializado en biología y ecología. Trabajo en hacer accesible la ciencia a través de contenido digital.",
      instagram: "@anfelobo"
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
      role: "Grupo de Paleontología",
      photo: "/divulgadores/@arkavitae.png",
      description: "Especialistas en paleontología y evolución. Estudiamos fósiles y la historia de la vida en la Tierra.",
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
      role: "Grupo de Astronomía Estelar",
      photo: "/divulgadores/@cefeidas.bdi.png",
      description: "Grupo dedicado al estudio de estrellas variables Cefeidas. Usamos estos 'candiles cósmicos' para medir distancias en el universo.",
      instagram: "@cefeidas.bdi"
    },
    {
      name: "Alexander Urzola",
      role: "Divulgador Científico",
      photo: "/divulgadores/@alexanderurzola.png",
      description: "Especialista en neurociencia y psicología. Comparto conocimientos sobre el funcionamiento del cerebro humano.",
      instagram: "@alexanderurzola"
    },
    {
      name: "Planetario Cosmo",
      role: "Centro de Divulgación Astronómica",
      photo: "/divulgadores/@planetario_cosmo.png",
      description: "Planetario dedicado a la educación astronómica. Ofrecemos proyecciones, talleres y charlas sobre el universo.",
      instagram: "@planetario_cosmo"
    },
    {
      name: "Sci Cousins",
      role: "Divulgadores Familiares",
      photo: "/divulgadores/@scicousins.png",
      description: "Hermanos dedicados a la divulgación científica familiar. Creamos contenido educativo divertido para todas las edades.",
      instagram: "@scicousins"
    },
    {
      name: "Exploradores de Estrellas",
      role: "Grupo de Astronomía Juvenil",
      photo: "/divulgadores/@exploradoresdeestrellas.png",
      description: "Grupo de jóvenes exploradores del universo. Realizamos observaciones, proyectos científicos y actividades educativas.",
      instagram: "@exploradoresdeestrellas"
    },
    {
      name: "Astronomízate",
      role: "Plataforma de Divulgación Astronómica",
      photo: "/divulgadores/@astronomizate_oficial.png",
      description: "Plataforma dedicada a popularizar la astronomía. Ofrecemos cursos, talleres y contenido educativo sobre el universo.",
      instagram: "@astronomizate_oficial"
    },
    {
      name: "Revista Petroglifos",
      role: "Publicación Científica",
      photo: "/divulgadores/@revistapetroglifos.png",
      description: "Revista especializada en arqueoastronomía y petroglifos. Exploramos la relación entre antiguas culturas y el cielo.",
      instagram: "@revistapetroglifos"
    },
    {
      name: "Grupo Astro Wow",
      role: "Divulgadores Astronómicos",
      photo: "/divulgadores/@grupoastrowow.png",
      description: "Equipo apasionado por compartir el 'wow' de la astronomía. Creamos contenido que maravilla y educa sobre el universo.",
      instagram: "@grupoastrowow"
    },
    {
      name: "Gaute de Astronomía",
      role: "Divulgador Astronómico",
      photo: "/divulgadores/@gauteovanastronomia.png",
      description: "Especialista en astronomía con enfoque en la divulgación. Comparto conocimientos sobre el universo de manera clara y apasionada.",
      instagram: "@gauteovanastronomia"
    },
    {
      name: "El Microscopio Podcast",
      role: "Podcast Científico",
      photo: "/divulgadores/@el_microscopio_podcast.png",
      description: "Podcast dedicado a explorar el mundo microscópico. Hablamos de biología celular, microbiología y ciencia molecular.",
      instagram: "@el_microscopio_podcast"
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
      count: 17,
      position: [4.5709, -74.2973],
      description: "17 divulgadores científicos",
      color: "#10b981" // Emerald
    },
    {
      country: "México",
      count: 2,
      position: [23.6345, -102.5528],
      description: "2 divulgadores científicos",
      color: "#3b82f6" // Blue
    },
    {
      country: "Guatemala",
      count: 1,
      position: [15.7835, -90.2308],
      description: "1 divulgador científico",
      color: "#8b5cf6" // Purple
    },
    {
      country: "Venezuela",
      count: 1,
      position: [6.4238, -66.5897],
      description: "1 divulgador científico",
      color: "#ec4899" // Pink
    }
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

function Contact() {
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

      {/* Formulario */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">Solicitud de Membresía</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Nombre completo</label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Especialidad/Área de interés</label>
              <input
                type="text"
                placeholder="Ej: Astronomía, Biología, Física, etc."
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Perfil en redes sociales</label>
              <input
                type="text"
                placeholder="@tuusuario o enlace a tu perfil"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Cuéntanos sobre ti</label>
              <textarea
                rows="5"
                placeholder="Describe tu experiencia en divulgación científica, proyectos en los que has trabajado, y por qué quieres unirte a la RLDC..."
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 p-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              🚀 Enviar Solicitud de Membresía
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
