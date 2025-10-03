/**
 * Projects Page JavaScript
 * Handles filtering, searching, and dynamic project display
 */

// Function to get background image for project
function getProjectBackgroundImage(projectTitle, category, technologies) {
    // Convert title to filename format (remove spaces, special chars)
    const filename = projectTitle.replace(/[^a-zA-Z0-9]/g, '');
    
    // Check for local image first
    const localImagePath = `images/ProjectCardBackground/${filename}`;
    // Note: In a real implementation, you'd check if the file exists
    // For now, we'll use the generic selection system
    
    // Generic image collections based on technology/category
    const imageCollections = {
        android: [
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=250&fit=crop&q=80'
        ],
        web: [
            'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&q=80'
        ],
        'machine-learning': [
            'https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&q=80',
        ],
        iot: [
            'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=250&fit=crop&q=80'
        ],
        database: [
            'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&q=80'
        ],
        'web-games': [
            'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop&q=80'
        ],
        programming: [
            'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&q=80',
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop&q=80'
        ]
    };
    
    // Determine appropriate collection based on technology/category
    let selectedCollection = imageCollections.programming; // default
    
    if (technologies.includes('android')) selectedCollection = imageCollections.android;
    else if (technologies.includes('web')) selectedCollection = imageCollections.web;
    else if (technologies.includes('machine-learning')) selectedCollection = imageCollections['machine-learning'];
    else if (technologies.includes('iot')) selectedCollection = imageCollections.iot;
    else if (technologies.includes('database')) selectedCollection = imageCollections.database;
    else if (category === 'web-games') selectedCollection = imageCollections['web-games'];
    
    // Use project ID to consistently select same image for same project
    const projectHash = projectTitle.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    const imageIndex = Math.abs(projectHash) % selectedCollection.length;
    return selectedCollection[imageIndex];
}

// Project data updated daily by GitHub Actions
const projectsData = [
    // Professional Portfolio Repositories (8 projects)
    {
        id: 1,
        title: "YouTube Auto Uploader",
        category: "production",
        description: "Automated video uploading application with GUI interface, scheduling, and monitoring. Features real-time progress tracking, SQLite database integration, and YouTube API authentication.",
        languages: ["python"],
        technologies: ["gui", "api", "database"],
        frameworks: ["tkinter", "sqlite"],
        status: "production",
        year: "2024",
        featured: true,
        githubUrl: "https://github.com/NathanLCleary/YouTube-Auto-Uploader",
        downloadUrl: "https://github.com/NathanLCleary/YouTube-Auto-Uploader-Public/releases/latest",
        hasDownload: true
    },
    {
        id: 2,
        title: "Java Learning Portfolio",
        category: "professional",
        description: "Comprehensive showcase of Java development from fundamentals to enterprise applications. Includes object-oriented programming, data structures, algorithms, and enterprise patterns.",
        languages: ["java"],
        technologies: ["database", "gui"],
        frameworks: ["jdbc", "jpa"],
        status: "showcase",
        year: "2022-2024",
        githubUrl: "https://github.com/NathanLCleary/Java-Learning-Portfolio",
        hasDownload: false
    },
    {
        id: 3,
        title: "Python Learning Portfolio",
        category: "professional",
        description: "Data science, machine learning, GUI development, and software engineering demonstrations. Features comprehensive ML algorithms and data analysis techniques.",
        languages: ["python"],
        technologies: ["machine-learning", "gui", "api"],
        frameworks: ["jupyter", "pandas", "scikit-learn"],
        status: "showcase",
        year: "2022-2024",
        githubUrl: "https://github.com/NathanLCleary/Python-Learning-Portfolio",
        hasDownload: false
    },
    {
        id: 4,
        title: "Android Development Portfolio",
        category: "professional",
        description: "Native mobile applications with modern architecture patterns and enterprise solutions. Includes sensor integration, GPS functionality, and notification services.",
        languages: ["java", "kotlin"],
        technologies: ["android", "database", "api"],
        frameworks: ["android-sdk"],
        status: "showcase",
        year: "2022-2024",
        githubUrl: "https://github.com/NathanLCleary/Android-Development-Portfolio",
        hasDownload: false
    },
    {
        id: 5,
        title: "Web Development Showcase",
        category: "professional",
        description: "Full-stack web applications demonstrating modern web technologies and frameworks. Features responsive design, interactive games, and e-commerce solutions.",
        languages: ["javascript", "html-css", "php"],
        technologies: ["web", "database"],
        frameworks: ["html5", "css3", "mysql"],
        status: "showcase",
        year: "2022-2024",
        githubUrl: "https://github.com/NathanLCleary/Web-Development-Showcase",
        hasDownload: false
    },
    {
        id: 6,
        title: "Game Development Portfolio",
        category: "professional",
        description: "Unity projects, Java games, and interactive entertainment system development. Includes 3D graphics, game logic, and AI opponents.",
        languages: ["csharp", "java"],
        technologies: ["unity", "gui"],
        frameworks: ["unity-engine"],
        status: "showcase",
        year: "2022-2024",
        githubUrl: "https://github.com/NathanLCleary/Game-Development-Portfolio",
        hasDownload: false
    },
    {
        id: 7,
        title: "Arduino IoT Projects",
        category: "professional",
        description: "Embedded systems development, sensor integration, and connected device solutions. Features robotics projects and smart home automation.",
        languages: ["cpp"],
        technologies: ["iot", "arduino"],
        frameworks: ["arduino-ide"],
        status: "showcase",
        year: "2022-2024",
        githubUrl: "https://github.com/NathanLCleary/Arduino-IoT-Projects",
        hasDownload: false
    },
    {
        id: 8,
        title: "DevOps Tools Portfolio",
        category: "professional",
        description: "CI/CD pipelines, testing frameworks, automation tools, and modern development workflows.",
        languages: ["python", "javascript"],
        technologies: ["automation", "ci-cd"],
        frameworks: ["jenkins", "docker"],
        status: "showcase",
        year: "2022-2024",
        githubUrl: "https://github.com/NathanLCleary/DevOps-Tools-Portfolio",
        hasDownload: false
    },

    // Production Applications (5 projects)
    {
        id: 9,
        title: "Raven Messaging System",
        category: "production",
        description: "Enterprise messaging platform with real-time communication capabilities between mobile devices and Alexa. Features secure messaging protocols and push notifications.",
        languages: ["java", "python"],
        technologies: ["android", "api"],
        frameworks: ["alexa-skills-kit"],
        status: "production",
        year: "2024",
        githubUrl: "https://github.com/NathanLCleary/Raven-Messaging-System",
        hasDownload: false
    },
    {
        id: 10,
        title: "JDBC Smart Home System",
        category: "production",
        description: "Database-driven home automation system with enterprise architecture. Features device control, scheduling, and comprehensive data management.",
        languages: ["java"],
        technologies: ["database", "iot"],
        frameworks: ["jdbc", "mysql"],
        status: "production",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/JDBC-Smart-Home-System",
        hasDownload: false
    },
    {
        id: 11,
        title: "Weather App",
        category: "mobile",
        description: "Android weather application with API integration and modern UI design. Features location-based forecasts and interactive weather maps.",
        languages: ["java", "kotlin"],
        technologies: ["android", "api"],
        frameworks: ["android-sdk"],
        status: "production",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/weather-app",
        hasDownload: false
    },
    {
        id: 12,
        title: "MerchGeekStore",
        category: "production",
        description: "E-commerce platform with inventory management and payment processing. Features shopping cart, user accounts, and admin dashboard.",
        languages: ["php", "javascript"],
        technologies: ["web", "database", "e-commerce"],
        frameworks: ["mysql", "bootstrap"],
        status: "production",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/MerchGeekStore",
        hasDownload: false
    },

    // Web Games & Interactive Projects (12 projects)
    {
        id: 13,
        title: "Rock Paper Scissors Web Game",
        category: "web-games",
        description: "Classic game implementation with JavaScript and responsive design. Features smooth animations and score tracking.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["html5", "css3"],
        status: "academic",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/RockPaperScissors-webGame",
        hasDownload: false
    },
    {
        id: 14,
        title: "Target Game",
        category: "web-games",
        description: "Interactive target shooting game with HTML5 Canvas and animation. Features physics-based gameplay and high score system.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["html5-canvas"],
        status: "academic",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/TargetGame",
        hasDownload: false
    },
    {
        id: 15,
        title: "Memory Game",
        category: "web-games",
        description: "Memory matching game with card flip animations and scoring system. Features progressive difficulty and visual effects.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["css3-animations"],
        status: "academic",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/memoryGame",
        hasDownload: false
    },
    {
        id: 16,
        title: "Poker Game",
        category: "web-games",
        description: "Poker game implementation with hand evaluation and betting mechanics. Features AI opponents and tournament mode.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["game-logic"],
        status: "academic",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/pokerGame",
        hasDownload: false
    },
    {
        id: 17,
        title: "Naughty or Nice",
        category: "web-games",
        description: "Christmas-themed interactive application with user input validation. Features festive animations and scoring system.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["html5", "css3"],
        status: "academic",
        year: "2022",
        githubUrl: "https://github.com/NathanLCleary/NaughtyOrNice",
        hasDownload: false
    },
    {
        id: 18,
        title: "Lotto Number Generator",
        category: "web-games",
        description: "Lottery number generator with random selection algorithms. Features multiple lottery formats and statistics tracking.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["random-algorithms"],
        status: "academic",
        year: "2022",
        githubUrl: "https://github.com/NathanLCleary/lotto",
        hasDownload: false
    },
    {
        id: 19,
        title: "Fill the Cup",
        category: "web-games",
        description: "Physics-based game with CSS animations and interactive elements. Features fluid dynamics simulation and level progression.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["physics-engine"],
        status: "academic",
        year: "2022",
        githubUrl: "https://github.com/NathanLCleary/fill-the-cup",
        hasDownload: false
    },
    {
        id: 20,
        title: "Bucket List App",
        category: "web-games",
        description: "Personal goal tracking application with local storage persistence. Features task management and progress visualization.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["local-storage"],
        status: "academic",
        year: "2022",
        githubUrl: "https://github.com/NathanLCleary/bucketList",
        hasDownload: false
    },
    {
        id: 21,
        title: "Games Night Platform",
        category: "web-games",
        description: "Multi-game platform with various mini-games and score tracking. Features multiplayer support and leaderboards.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["multiplayer"],
        status: "academic",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/GamesNight1",
        hasDownload: false
    },
    {
        id: 22,
        title: "Low FPS Demo",
        category: "web-games",
        description: "Performance optimization demonstration with frame rate monitoring. Features various optimization techniques and benchmarking.",
        languages: ["javascript", "html-css"],
        technologies: ["web", "optimization"],
        frameworks: ["performance"],
        status: "experimental",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/LowFPS",
        hasDownload: false
    },
    {
        id: 23,
        title: "Fallout 4 Stats Tracker",
        category: "web-games",
        description: "Fallout 4 themed statistics tracker with game-inspired UI design. Features character progression and achievement tracking.",
        languages: ["javascript", "html-css"],
        technologies: ["web"],
        frameworks: ["game-ui"],
        status: "academic",
        year: "2023",
        githubUrl: "https://github.com/NathanLCleary/fallout4Stats",
        hasDownload: false
    }
];

// DOM elements
let projectsContainer;
let categoryFilter;
let languageFilter;
let technologyFilter;
let statusFilter;
let searchFilter;
let clearFiltersBtn;
let noResultsDiv;

// Initialize the projects page
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    renderProjects(projectsData);
});

function initializeElements() {
    projectsContainer = document.getElementById('projectsContainer');
    categoryFilter = document.getElementById('categoryFilter');
    languageFilter = document.getElementById('languageFilter');
    technologyFilter = document.getElementById('technologyFilter');
    statusFilter = document.getElementById('statusFilter');
    searchFilter = document.getElementById('searchFilter');
    clearFiltersBtn = document.getElementById('clearFilters');
    noResultsDiv = document.getElementById('noResults');
}

function setupEventListeners() {
    categoryFilter.addEventListener('change', filterProjects);
    languageFilter.addEventListener('change', filterProjects);
    technologyFilter.addEventListener('change', filterProjects);
    statusFilter.addEventListener('change', filterProjects);
    searchFilter.addEventListener('input', debounce(filterProjects, 300));
    clearFiltersBtn.addEventListener('click', clearAllFilters);
}

function renderProjects(projects) {
    if (projects.length === 0) {
        projectsContainer.style.display = 'none';
        noResultsDiv.style.display = 'block';
        return;
    }

    projectsContainer.style.display = 'grid';
    noResultsDiv.style.display = 'none';

    projectsContainer.innerHTML = projects.map(project => createProjectCard(project)).join('');
}

function createProjectCard(project) {
    const featuredClass = project.featured ? 'featured' : '';
    const downloadButton = project.hasDownload 
        ? `<a href="${project.downloadUrl}" class="project-link primary" target="_blank">Download</a>`
        : `<span class="project-link disabled">No Download</span>`;

    return `
        <div class="project-card ${featuredClass}" data-category="${project.category}" data-languages="${project.languages.join(',')}" data-technologies="${project.technologies.join(',')}" data-status="${project.status}">
            <div class="project-card-header" style="background-image: url('${getProjectBackgroundImage(project.title, project.category, project.technologies)}'); background-size: cover; background-position: center; position: relative;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(249, 134, 26, 0.9) 0%, rgba(29, 27, 55, 0.8) 100%);"></div>
                <div style="position: relative; z-index: 2;">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-category">${getCategoryDisplayName(project.category)}</div>
                </div>
            </div>
            <div class="project-card-body">
                <p class="project-description">${project.description}</p>
                
                <div class="project-tags">
                    ${project.languages.map(lang => `<span class="project-tag language">${getLanguageDisplayName(lang)}</span>`).join('')}
                    ${project.technologies.map(tech => `<span class="project-tag technology">${getTechnologyDisplayName(tech)}</span>`).join('')}
                    ${project.frameworks.map(fw => `<span class="project-tag framework">${fw}</span>`).join('')}
                </div>
                
                <div class="project-meta">
                    <span class="project-status ${project.status}">${getStatusDisplayName(project.status)}</span>
                    <span class="project-year">${project.year}</span>
                </div>
                
                <div class="project-actions">
                    <a href="${project.githubUrl}" class="project-link secondary" target="_blank">View Code</a>
                    ${downloadButton}
                </div>
            </div>
        </div>
    `;
}

function filterProjects() {
    const categoryValue = categoryFilter.value;
    const languageValue = languageFilter.value;
    const technologyValue = technologyFilter.value;
    const statusValue = statusFilter.value;
    const searchValue = searchFilter.value.toLowerCase();

    const filteredProjects = projectsData.filter(project => {
        const matchesCategory = categoryValue === 'all' || project.category === categoryValue;
        const matchesLanguage = languageValue === 'all' || project.languages.includes(languageValue);
        const matchesTechnology = technologyValue === 'all' || project.technologies.includes(technologyValue);
        const matchesStatus = statusValue === 'all' || project.status === statusValue;
        const matchesSearch = searchValue === '' || 
            project.title.toLowerCase().includes(searchValue) ||
            project.description.toLowerCase().includes(searchValue) ||
            project.languages.some(lang => getLanguageDisplayName(lang).toLowerCase().includes(searchValue)) ||
            project.technologies.some(tech => getTechnologyDisplayName(tech).toLowerCase().includes(searchValue));

        return matchesCategory && matchesLanguage && matchesTechnology && matchesStatus && matchesSearch;
    });

    renderProjects(filteredProjects);
}

function clearAllFilters() {
    categoryFilter.value = 'all';
    languageFilter.value = 'all';
    technologyFilter.value = 'all';
    statusFilter.value = 'all';
    searchFilter.value = '';
    renderProjects(projectsData);
}

// Helper functions
function getCategoryDisplayName(category) {
    const categories = {
        'professional': 'Professional Portfolio',
        'production': 'Production Application',
        'web-games': 'Web Game',
        'academic': 'Academic Project',
        'mobile': 'Mobile Development',
        'iot': 'IoT & Hardware',
        'data-science': 'Data Science',
        'game-dev': 'Game Development',
        'web-dev': 'Web Development'
    };
    return categories[category] || category;
}

function getLanguageDisplayName(language) {
    const languages = {
        'python': 'Python',
        'java': 'Java',
        'javascript': 'JavaScript',
        'csharp': 'C#',
        'cpp': 'C/C++',
        'php': 'PHP',
        'kotlin': 'Kotlin',
        'html-css': 'HTML/CSS',
        'sql': 'SQL'
    };
    return languages[language] || language;
}

function getTechnologyDisplayName(technology) {
    const technologies = {
        'android': 'Android',
        'unity': 'Unity',
        'database': 'Database',
        'api': 'API Integration',
        'machine-learning': 'Machine Learning',
        'iot': 'IoT/Arduino',
        'web': 'Web Technologies',
        'gui': 'GUI Applications',
        'robotics': 'Robotics',
        'automation': 'Automation',
        'sensors': 'Sensors',
        'voice-recognition': 'Voice Recognition',
        'messaging': 'Messaging',
        'e-commerce': 'E-commerce',
        'cli': 'Command Line',
        'optimization': 'Optimization',
        'responsive': 'Responsive Design',
        'marketing': 'Marketing',
        '3d-graphics': '3D Graphics',
        'ai': 'Artificial Intelligence',
        'data-science': 'Data Science',
        'arduino': 'Arduino',
        'ci-cd': 'CI/CD'
    };
    return technologies[technology] || technology;
}

function getStatusDisplayName(status) {
    const statuses = {
        'production': 'Production Ready',
        'showcase': 'Portfolio Showcase',
        'academic': 'Academic Complete',
        'experimental': 'Experimental'
    };
    return statuses[status] || status;
}

// Utility function for debouncing search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}