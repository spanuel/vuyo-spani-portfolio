console.log("JavaScript code is running!");

const projectDetails = {
    'ToDoApp': {
        description: 'A web page to manage your to-dos. Add tasks with titles, dates, and descriptions. It even reminds you to save changes before you leave!',
        image: 'images/projects/todo-app-icon.png',
        github: 'https://github.com/spanuel/ToDoApp',
    },
    'banking_app': {
        description: 'Simple banking app for easy account management.',
        image: 'images/projects/banking-app-icon.png',
        github: 'https://github.com/spanuel/banking_app',
    },
    'BalanceSheet': {
        description: 'This is a web page showing a financial balance sheet for AcmeWidgetCorp. It visualizes assets, liabilities, and net worth.',
        image: 'images/projects/balance-sheet-icon.jpg',
        github: 'https://github.com/spanuel/BalanceSheet',
    },
    'Slot-Machine---Python':{
        description:'A text-based slot machine simulator in Python. Features customizable bets, multiple paylines, and different symbol values. Includes deposit and balance management.',
        image:'images/projects/slot-machine-icon.png',
        github: 'https://github.com/spanuel/Slot-Machine---Python',
    },
};

function fetchGitHubProjects() {
    return Object.entries(projectDetails).map(([name, details]) => ({
        name,
        description: details.description,
        custom_image: details.image,
        html_url: details.github,
        homepage: details.demo
    }));
}

function createProjectCard(project) {
    return `
        <div class="project-card">
            <img src="${project.custom_image}" alt="${project.name}" class="project-image" onerror="this.src='images/projects/placeholder.png';">
            <div class="project-info">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description || 'No description available.'}</p>
                <div class="project-links">
                    <a href="${project.html_url}" target="_blank" class="project-link github-link">GitHub</a>
                    ${project.homepage ? `<a href="${project.homepage}" target="_blank" class="project-link demo-link">Demo</a>` : ''}
                </div>
            </div>
        </div>
    `;
}

function displayProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) {
        console.error("Couldn't find .projects-container element");
        return;
    }
    
    const projects = fetchGitHubProjects();
    
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects found.</p>';
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
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav li a');

    function setActiveNavItem() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === currentSection) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem(); // Call once to set initial state

    // Smooth scrolling for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});

    const navToggler = document.querySelector(".nav-toggler");
    const sideMenu = document.querySelector(".side-menu");

    navToggler.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
    });

    const codeSnippets = [
        'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, I\'m Vuyo!");\n    }\n}',
        'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("C# Developer");\n    }\n}',
        'SELECT skills FROM developer\nWHERE name = "Vuyo Spani"\n  AND passion = "Coding";'
    ];

    let currentSnippet = 0;
    let charIndex = 0;
    const typingSpeed = 20; // Speed of typing in milliseconds
    const delayBetweenSnippets = 3000; // Delay before switching to the next snippet

    const snippetElement = document.getElementById('snippet');

    function typeSnippet() {
        snippetElement.innerHTML = ''; // Clear the current snippet

        function typeChar() {
            if (charIndex < codeSnippets[currentSnippet].length) {
                // Append the next character
                snippetElement.innerHTML += codeSnippets[currentSnippet].charAt(charIndex)
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

                charIndex++;
                setTimeout(typeChar, typingSpeed); // Type the next character
            } else {
                // Highlight the final snippet
                Prism.highlightElement(snippetElement);

                // Move to the next snippet after a delay
                setTimeout(() => {
                    currentSnippet = (currentSnippet + 1) % codeSnippets.length;
                    charIndex = 0;
                    typeSnippet(); // Start typing the next snippet
                }, delayBetweenSnippets);
            }
        }

        typeChar(); // Start typing the first character
    }

    typeSnippet();