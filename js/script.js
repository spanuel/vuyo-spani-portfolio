console.log("JavaScript code is running!");


const projectDetails = {
    'ToDoApp': {
        description: 'A web page to manage your to-dos. Add tasks with titles, dates, and descriptions. It even reminds you to save changes before you leave!',
        image: 'images/projects/todo-app-icon.png'  
    },
    'banking_app': {
        description: 'Simple banking app for easy account management.',
        image: 'images/projects/banking-app-icon.png'  
    },
    'BalanceSheet': {
        description: 'This is a web page showing a financial balance sheet for AcmeWidgetCorp.It visualizes assets, liabilities, and net worth.',
        image: 'images/projects/balance-sheet-icon.jpg'  
    },
    'Slot-Machine---Python':{
        description:'A text-based slot machine simulator in Python. Features customizable bets, multiple paylines, and different symbol values. Includes deposit and balance management.',
        image:'images/projects/slot-machine-icon.png'
    },
};

async function fetchGitHubProjects() {
    const username = 'spanuel';
    let token;
  
    try {
      const response = await fetch('/config');
      const data = await response.json();
      token = data.GIT_TOKEN;
    } catch (error) {
      console.error('Error fetching config:', error);
      return [];
    }
  
    const projects = [];
  
    for (const [projectName, details] of Object.entries(projectDetails)) {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${projectName}`, {
          headers: {
            'Authorization': `token ${token}`
          }
        });
        if (response.ok) {
          const project = await response.json();
          projects.push({
            ...project,
            custom_description: details.description,
            custom_image: details.image
          });
        } else {
          console.error(`Failed to fetch ${projectName}: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching ${projectName}:`, error);
      }
    }
  
    return projects;
  }

function createProjectCard(project) {
    return `
        <div class="project-card">
            <img src="${project.custom_image}" alt="${project.name}" class="project-image" onerror="this.src='images/projects/placeholder.png';">
            <div class="project-info">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.custom_description || project.description || 'No description available.'}</p>
                <div class="project-links">
                    <a href="${project.html_url}" target="_blank" class="project-link github-link">GitHub</a>
                    ${project.homepage ? `<a href="${project.homepage}" target="_blank" class="project-link demo-link">Demo</a>` : ''}
                </div>
            </div>
        </div>
    `;
}

async function displayProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) {
        console.error("Couldn't find .projects-container element");
        return;
    }
    
    const projects = await fetchGitHubProjects();
    
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects found. Please check the console for errors.</p>';
        return;
    }
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.innerHTML += projectCard;
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', displayProjects);


document.addEventListener('DOMContentLoaded', function() {
    const sendMessageButton = document.getElementById('send-message-btn');
    sendMessageButton.addEventListener('click', sendMessage);
});

function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name ||!email ||!subject ||!message) {
        alert('Please fill in all fields.');
        return;
    }

    const data = {
        name,
        email,
        subject,
        message
    };

    const url = 'http://localhost:3000/send_message'; 

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
   .then(response => response.json())
   .then(data => {
        if (data.success) {
            alert('Message sent successfully!');
            // Reset form fields
            document.querySelectorAll('.form-control').forEach(input => input.value = '');
        } else {
            alert('Error sending message: ' ,message);
        }
    })
   .catch(error => {
        console.error('Error:', error);
        alert('Error sending message. Please try again later.');
    });
}