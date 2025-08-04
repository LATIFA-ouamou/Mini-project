const projectsContainer = document.querySelector(".projects-container");
const form = document.getElementById('project-form');


const afficherProjects = () => {
    axios.get(`http://localhost:4000/project`)
        .then(res => {
            projectsContainer.innerHTML = ''; 
            res.data.forEach(element => {
                const card= document.createElement('div');
                card.classList.add("project");
                card.innerHTML = `
                    <div class="image" style="background-image: url('${element.image ||'./images/eco1.jpg'}');"></div>
                    <div class="catre">
                        <h3>${element.title}</h3>
                        <p>${element.description}</p>
                    </div>
                    <button class="delete" onClick="supprimerProjet('${element.id}')">🗑️</button>
                `;
                projectsContainer.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            projectsContainer.innerHTML = '<p>Erreur lors du chargement des projets</p>';
        });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const nouv = {
        title: form.title.value,
        description: form.description.value,
        image: form.image.value
    };
    
    axios.post(`http://localhost:4000/project`, nouv)
        .then(() => {
            afficherProjects(); 
            form.reset();

        })
        .catch(err => {
            console.error(err);
        });
});

const supprimerProjet = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
        axios.delete(`http://localhost:4000/project/${id}`)
            .then(() => afficherProjects())
            .catch(err => console.error(err));
    }
}

afficherProjects();