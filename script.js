// script.js

// JSON data containing list items and initial states
const dataList = [
    {"name": "Operative system: Debian / QubesOS", "state": 1},
    {"name": "Web browser: Firefox / LibreWolf / Chromium / Tor Browser", "state": 1},
    {"name": "Password manager: Bitwarden s.h. / Spectre", "state": 1},
    {"name": "Code editor: VSCodium / Vim / Neovim", "state": 1},
    {"name": "Version control: Codeberg / GitLab / Gogs", "state": 1},
    {"name": "Cloud storage: Nextcloud", "state": 1},
    {"name": "AI Chatbot: llama-gpt / LocalAI", "state": 1},
    {"name": "Search engine: Searx / DuckDuckGo / Startpage", "state": 1},
    {"name": "VPN: ProtonVPN", "state": 1},
    {"name": "DNS: NextDNS", "state": 1},
    {"name": "Firewall: ?", "state": 1},
    {"name": "Two-factor authentication: Authenticator Pro", "state": 1},
    {"name": "Secure messaging: Telegram FOSS / Session", "state": 1},
    {"name": "Secure email: ProtonMail", "state": 1},
    {"name": "Secure notes: ?", "state": 1},
    {"name": "Music streaming: Navidrome", "state": 1},
    {"name": "YouTube frontend: Piped", "state": 1},
    {"name": "Instagram forntend: ProxiGram", "state": 1},
    {"name": "Photos: ? s.h", "state": 1},
    {"name": "Incogni", "state": 1},
    {"name": "Disk encryption: VeraCrypt", "state": 1},
    {"name": "File encryption: ?", "state": 1},
    {"name": "Secure file sharing: ?", "state": 1},
    {"name": "Calendar: Proton Calendar", "state": 1},
    {"name": "Phone: Google Pixel + Graphene OS", "state": 1},
    {"name": "App store: F-Droid / Neostore / Aurora Store", "state": 1},
    {"name": "Mobile Web Browser: DuckDuckGo, Firefox Focus, Vanadium", "state": 1},
    {"name": "All FOSS apps", "state": 1}
];

document.addEventListener('DOMContentLoaded', function () {
    const listContainer = document.getElementById('list-container');

    // Function to render the list
    function renderList() {
        listContainer.innerHTML = ''; // Clear previous content
        dataList.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('item');
            listItem.textContent = item.name; // Assuming each item in JSON has a "name" property

            // Add class based on state
            switch (item.state) {
                case 0:
                    listItem.classList.add('deselected');
                    break;
                case 1:
                    listItem.classList.add('selected');
                    break;
                case 2:
                    listItem.classList.add('active');
                    break;
                case 3:
                    listItem.classList.add('error');
                    break;
                default:
                    break;
            }

            // Event listener for clicking on items
            listItem.addEventListener('click', () => {
                item.state = (item.state + 1) % 3; // Cycle through states 0 to 2
                saveState();
                renderList(); // Re-render list with updated states
            });

            listContainer.appendChild(listItem);
        });
    }

    // Function to save state to local storage
    function saveState() {
        localStorage.setItem('listState', JSON.stringify(dataList.map(item => item.state)));
    }

    // Function to load state from local storage
    function loadState() {
        const savedState = localStorage.getItem('listState');
        return savedState ? JSON.parse(savedState) : [];
    }

    // Initial setup: Load state from local storage and render list
    const savedStates = loadState();
    dataList.forEach((item, index) => {
        if (savedStates[index] !== undefined) {
            item.state = savedStates[index];
        }
    });
    renderList();
});
