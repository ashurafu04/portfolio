import styles from "./ProjectsStyles.module.css";
import EchoHive from "../../assets/EchoHiveNb.png";
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
          p="Moroccan Intelligent Travel Guide"
        />
        <ProjectCard
          src={EchoHive}
          link="https://github.com/ashurafu04"
          h3="EchoHive"
          p="Blog Web App"
        />
        <ProjectCard
          src={LybroSync}
          link="https://github.com/ashurafu04"
          h3="LybroSync"
          p="Book Reviews Web App"
        />
        <ProjectCard
          src={CashAura}
          link="https://github.com/ashurafu04"
          h3="CashAura"
          p="Banking App"
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
