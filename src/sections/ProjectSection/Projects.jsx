import styles from "./ProjectsStyles.module.css";
import Listo from "../../assets/listoLogo.png";
import Journeo from "../../assets/journeoLogo.png";
import LybroSync from "../../assets/LybroSyncNb.png";
import CashAura from "../../assets/CashAuraNb.png";
import RoomEase from "../../assets/RoomEaseNb.png";
import Nwitat from "../../assets/NwitatNb.png";
import More from "../../assets/more.png";
import ProjectCard from "../../common/ProjectCard";
import NomadAI from "../../assets/NomadAI.png";
function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={NomadAI}
          link="https://github.com/ashurafu04/NomadAI"
          h3="NomadAI"
          p="Intelligent Travel Guide"
        />
        <ProjectCard
          src={CashAura}
          link="https://github.com/ashurafu04/cashaura"
          h3="CashAura"
          p="Banking App"
        />
        <ProjectCard
          src={Listo}
          link="https://github.com/bilal-essafrioui/Gestion-Des-Annonces-App"
          h3="Listo"
          p="Classified ads platform"
        />
        <ProjectCard
          src={Journeo}
          link="https://github.com/ashurafu04/mgvc"
          h3="Journeo"
          p="Journey planner"
        />
        <ProjectCard
          src={LybroSync}
          link="https://github.com/ashurafu04/lybrosync"
          h3="LybroSync"
          p="Book Reviews Web App"
        />
        <ProjectCard
          src={RoomEase}
          link="https://github.com/ashurafu04"
          h3="RoomEase"
          p="Conference Room Reservation"
        />
        <ProjectCard
          src={Nwitat}
          link="https://github.com/ashurafu04"
          h3="Nwitat"
          p="Note Managing Web App"
        />
        <ProjectCard
          src={More}
          link="https://github.com/ashurafu04"
          h3="More Projects"
          p="Explore more remarkable projects..."
        />
      </div>
    </section>
  );
}

export default Projects;
