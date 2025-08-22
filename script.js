// All of the JavaScript from your original HTML file goes here.
// It has been moved from inline to an external file to comply with the Content Security Policy.

document.addEventListener('DOMContentLoaded', () => {
    // --- UI Elements ---
    const body = document.body;
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteSection = document.getElementById('quote-section');
    const websitesSection = document.getElementById('websites-section');
    const websitesTitle = document.getElementById('websites-title');
    const websitesList = document.getElementById('websites-list');
    const modeButtonsContainer = document.getElementById('mode-buttons-container');
    const studyWidgetsSection = document.getElementById('study-widgets-section');
    const entertainmentWidgetsSection = document.getElementById('entertainment-widgets-section');
    const relaxWidgetsSection = document.getElementById('relax-widgets-section');
    const timerDisplay = document.getElementById('timer-display');
    const timerStartBtn = document.getElementById('timer-start-btn');
    const timerResetBtn = document.getElementById('timer-reset-btn');
    const timerPlusBtn = document.getElementById('timer-plus-btn');
    const timerMinusBtn = document.getElementById('timer-minus-btn');
    const sortWebsitesToggle = document.getElementById('sort-websites-toggle');
    const customQuoteTextarea = document.getElementById('custom-quote-text');
    const customQuoteAuthor = document.getElementById('custom-quote-author');
    const customQuoteForm = document.getElementById('custom-quote-form');
    const customQuoteSettingsSection = document.getElementById('custom-quote-settings-section');
    const customQuoteModeName = document.getElementById('custom-quote-mode-name');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const addWebsiteForm = document.getElementById('add-website-form');
    const websiteNameInput = document.getElementById('website-name');
    const websiteUrlInput = document.getElementById('website-url');
    const websiteCategorySelect = document.getElementById('website-category');
    const savedWebsitesList = document.getElementById('saved-websites-list');
    const exportDataBtn = document.getElementById('export-data-btn');
    const importFileInput = document.getElementById('import-file-input');
    const customizationForm = document.getElementById('customization-form');
    const backgroundUrlInput = document.getElementById('background-url');
    const uploadWallpaperInput = document.getElementById('upload-wallpaper-input');
    const solidBackgroundColorInput = document.getElementById('solid-background-color');
    const textColorInput = document.getElementById('text-color');
    const uiOpacityInput = document.getElementById('ui-opacity');
    const cardBgColorInput = document.getElementById('card-bg-color');
    const iconColorInput = document.getElementById('icon-color');
    const solidIconBgInput = document.getElementById('solid-icon-bg');
    const gradientButtons = document.querySelectorAll('#customization-form [data-gradient]');
    const messageBox = document.getElementById('custom-message-box');
    const defaultModeForm = document.getElementById('default-mode-form');
    const defaultModeSelect = document.getElementById('default-mode-select');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const timeDisplay = document.getElementById('time-display');
    const dateDisplay = document.getElementById('date-display');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const modeForm = document.getElementById('mode-form');
    const modeNameInput = document.getElementById('mode-name');
    const savedModesList = document.getElementById('saved-modes-list');
    const deleteModeBtn = document.getElementById('delete-mode-btn');
    const saveModeBtn = document.getElementById('save-mode-btn');
    const toggleModesBtn = document.getElementById('toggle-modes-btn');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const audioFileInput = document.getElementById('audio-file-input');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const trackName = document.getElementById('track-name');
    const breathingText = document.getElementById('breathing-text');
    const favoriteBtn = document.getElementById('favorite-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const playlistContainer = document.getElementById('playlist-container');

    // --- Add Donation Section Dynamically ---
    const modalScrollArea = document.getElementById('modal-scroll-area');
    if (modalScrollArea) {
        const donationSection = document.createElement('div');
        donationSection.className = 'mt-8 border-t border-gray-700 pt-6';
        donationSection.innerHTML = `
            <h4 class="text-lg font-bold text-white mb-3">Support this Project</h4>
            <p class="text-sm text-gray-400 mb-4">If you enjoy this extension, please consider supporting its development. It's completely free, open-source, and does not track you in any way.</p>
            <a href="https://buymeacoffee.com/pyouneetm" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-block text-center px-4 py-2 rounded-md font-semibold text-black bg-white hover:bg-gray-200 transition-colors">
                Buy me a coffee ☕
            </a>
            <p class="text-sm text-gray-400 mt-4">Or via UPI: pyouneetm@oksbi</p>
        `;
        modalScrollArea.appendChild(donationSection);
    }

    // --- State Variables ---
    let currentMode = null;
    let timerInterval;
    let timeRemaining = 25 * 60; // 25 minutes in seconds
    let isTimerRunning = false;
    let clockInterval;
    let editingModeName = null;
    let breathingInterval;

    // Music Player State
    let playlist = [];
    let originalPlaylist = [];
    let currentTrackIndex = 0;
    let isShuffle = false;
    let repeatState = 'none'; // 'none', 'one', 'all'

    // Quotes for each mode
    const modeQuotes = {
        study: { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
        relax: { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
        entertainment: { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        minimal: { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
    };
    
    // Default websites for first-time use
    const defaultWebsites = {
        study: [
            { name: 'Buy me a coffee', url: 'https://buymeacoffee.com/pyouneetm' },
            { name: 'Google Scholar', url: 'https://scholar.google.com' },
            { name: 'Khan Academy', url: 'https://www.khanacademy.org' },
            { name: 'Stack Overflow', url: 'https://stackoverflow.com' }
        ],
        relax: [
            { name: 'Spotify', url: 'https://www.spotify.com' },
            { name: 'Calm', url: 'https://www.calm.com' },
            { name: 'Focusmate', url: 'https://www.focusmate.com' }
        ],
        entertainment: [
            { name: 'Netflix', url: 'https://www.netflix.com' },
            { name: 'Disney+', url: 'https://www.disneyplus.com' },
            { name: 'JioCinema', url: 'https://www.jiocinema.com' },
            { name: 'Twitch', url: 'https://www.twitch.tv' }
        ],
    };

    // --- Utility Functions ---
    function showMessage(message, type = 'success') {
        if (!messageBox) return;
        messageBox.textContent = message;
        messageBox.className = `p-2 rounded-md transition-all duration-300 show`;
        if (type === 'success') {
            messageBox.classList.add('bg-green-500');
        } else if (type === 'error') {
            messageBox.classList.add('bg-red-500');
        } else {
            messageBox.classList.add('bg-white', 'text-gray-900');
        }
        setTimeout(() => {
            if (messageBox) messageBox.classList.remove('show');
        }, 3000);
    }

    function applyCustomizations(state) {
        if (body) body.style.color = state.textColor || '#ffffff';
        if (body) {
            if (state.solidBackgroundColor) {
                body.style.backgroundImage = 'none';
                body.style.backgroundColor = state.solidBackgroundColor;
            } else if (state.backgroundImage) {
                body.style.backgroundImage = `url(${state.backgroundImage})`;
                body.style.backgroundColor = 'transparent';
            } else if (state.backgroundGradient) {
                body.style.backgroundImage = state.backgroundGradient;
                body.style.backgroundColor = 'transparent';
            } else {
                body.style.backgroundImage = 'none';
                body.style.backgroundColor = '#000000'; // Default black background
            }
        }
        // Apply UI Opacity to card elements
        const cardElements = document.querySelectorAll('#study-widgets-section > div > div, #entertainment-widgets-section > div > div, #relax-widgets-section > div > div, #search-form, #top-buttons-wrapper, #websites-title, .website-card, #saved-websites-list > div');
        cardElements.forEach(el => {
            if (el.id === 'top-buttons-wrapper' && !state.solidIconBg) {
                 el.style.backgroundColor = 'rgba(17, 24, 39, 0.5)'; // A default semi-transparent background for the wrapper
            } else if (el.classList.contains('mode-btn') && !state.solidIconBg) {
                el.style.backgroundColor = 'transparent';
            } else {
                el.style.backgroundColor = state.cardBgColor || '#1f2937'; // Default to gray-800
            }
        });

        const textElements = document.querySelectorAll('body, h1, h2, h3, h4, p, label, .website-card > div, #todo-list label, #mode-buttons-container span, #settings-btn svg, #toggle-modes-btn svg');
        textElements.forEach(el => {
            if (el.classList.contains('no-theme-text')) return;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return;
            el.style.color = state.textColor || '#ffffff';
        });
        
        renderIconsWithColor(state.iconColor);
        
        // Re-apply the active button color override
        const activeBtn = document.querySelector('.mode-btn.active');
        if (activeBtn) {
            activeBtn.style.setProperty('background-color', 'transparent', 'important');
            activeBtn.style.setProperty('color', state.iconColor || 'white', 'important');
        }
    }
    
    function renderIconsWithColor(color) {
        document.querySelectorAll('.mode-btn:not(.active), .favorite-btn, #shuffle-btn, #repeat-btn, .edit-mode-btn').forEach(btn => {
            if(btn) btn.style.color = color || 'white';
        });
        document.querySelectorAll('.mode-btn:not(.active) svg, .favorite-btn svg, #shuffle-btn svg, #repeat-btn svg, .edit-mode-btn svg').forEach(svg => {
            if(svg) svg.style.stroke = color || 'white';
        });
        document.querySelectorAll('.delete-site-btn svg').forEach(svg => {
            if(svg) svg.style.stroke = color || 'white';
        });
    }

    // --- Storage Logic ---
    const storage = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local ? chrome.storage.local : {
        get: (keys, callback) => {
            const result = {};
            keys.forEach(key => {
                try {
                    const item = localStorage.getItem(key);
                    result[key] = item ? JSON.parse(item) : undefined;
                } catch (e) {
                    console.error(`Error parsing localStorage item for key "${key}":`, e);
                    result[key] = undefined;
                }
            });
            callback(result);
        },
        set: (items, callback = () => {}) => {
            try {
                Object.keys(items).forEach(key => {
                    localStorage.setItem(key, JSON.stringify(items[key]));
                });
            } catch (e) {
                console.error('Error setting localStorage item:', e);
            }
            callback();
        }
    };

    const loadState = async () => {
        let state;
        try {
            const result = await new Promise(resolve => {
                storage.get(['minimalistHomepageState'], result => resolve(result));
            });
            const savedState = result.minimalistHomepageState;
            if (savedState) {
                state = JSON.parse(savedState);
            }
        } catch (e) {
            console.error('Failed to load state from storage', e);
        }

        if (!state) {
            state = {
                websites: defaultWebsites,
                customQuotes: {},
                timerState: { timeRemaining: 25 * 60, isRunning: false },
                sortAlphabetically: true,
                backgroundImage: '',
                backgroundGradient: '',
                solidBackgroundColor: '#000000',
                textColor: '#ffffff',
                defaultMode: 'study',
                uiOpacity: 0.7,
                cardBgColor: '#1f2937', // Default to gray-800
                iconColor: '#ffffff',
                solidIconBg: false,
                searchEngines: {
                    study: 'google',
                    relax: 'lofi',
                    entertainment: 'youtube'
                },
                todos: [],
                favorites: [],
                modes: [
                    { name: 'study', icon: 'S' },
                    { name: 'relax', icon: 'R' },
                    { name: 'entertainment', icon: 'E' },
                ]
            };
        }

        // Migration from old searchEngine string to new searchEngines object
        if (state.searchEngine && !state.searchEngines) {
            state.searchEngines = {};
            const defaultEngines = { study: 'google', entertainment: 'youtube', relax: 'lofi' };
            state.modes.forEach(mode => {
                state.searchEngines[mode.name] = state.searchEngine || defaultEngines[mode.name] || 'google';
            });
        }
        delete state.searchEngine;

        if (!state.searchEngines) {
            state.searchEngines = {
                study: 'google',
                relax: 'lofi',
                entertainment: 'youtube'
            };
        }
        
        // Migration from old single customQuote to new per-mode customQuotes object
        if (state.customQuote && Object.keys(state.customQuote).length > 0) {
            state.customQuotes = { [state.defaultMode || 'study']: state.customQuote };
        }
        delete state.customQuote;

        const defaultModeData = [
            { name: 'study', icon: 'S' },
            { name: 'relax', icon: 'R' },
            { name: 'entertainment', icon: 'E' },
        ];
        
        let userModes = state.modes || [];
        // Filter out any of the default modes from the user's list to avoid duplicates
        userModes = userModes.filter(mode => !defaultModeData.some(d => d.name === mode.name));
        // Prepend the defaults to ensure they are always present and in order
        state.modes = [...defaultModeData, ...userModes];
        
        // Ensure all modes have a search engine setting
        state.modes.forEach(mode => {
            if (!state.searchEngines[mode.name]) {
                state.searchEngines[mode.name] = 'google'; // default for new custom modes
            }
        });


        return state;
    };

    const saveState = async (newState) => {
        const currentState = await loadState();
        const mergedState = { ...currentState, ...newState };
        await new Promise(resolve => {
            storage.set({ minimalistHomepageState: JSON.stringify(mergedState) }, resolve);
        });
    };
    
    // Load initial state and render everything
    loadState().then(state => {
        if (state.customQuotes) {
            const currentModeQuote = state.customQuotes[currentMode] || {};
            if (customQuoteTextarea) customQuoteTextarea.value = currentModeQuote.text || '';
            if (customQuoteAuthor) customQuoteAuthor.value = currentModeQuote.author || '';
        }
        if (state.timerState) {
            timeRemaining = state.timerState.timeRemaining;
            isTimerRunning = state.timerState.isRunning;
            if (isTimerRunning) {
                startTimer(false);
            }
        }
        if (sortWebsitesToggle) sortWebsitesToggle.checked = state.sortAlphabetically;
        applyCustomizations(state);
        updateTimerDisplay();
        renderTodos();
    
        currentMode = state.defaultMode || 'study';
        setMode(currentMode);
        renderModeButtons();
    });

    // --- Event Listeners for UI State and Storage ---
    if (customQuoteForm) {
        customQuoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const text = customQuoteTextarea.value.trim();
            const author = customQuoteAuthor.value.trim();
            
            const state = await loadState();
            if (!state.customQuotes) state.customQuotes = {};
            state.customQuotes[currentMode] = { text, author };
            await saveState({ customQuotes: state.customQuotes });
            
            updateQuote(currentMode);
            showMessage('Custom quote saved!', 'success');
        });
    }

    // --- Clock and Date Logic ---
    function updateClockAndDate() {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (timeDisplay) timeDisplay.textContent = time;
        if (dateDisplay) dateDisplay.textContent = date;
    }
    updateClockAndDate();
    clockInterval = setInterval(updateClockAndDate, 1000);

    // --- Search Bar Logic ---
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            loadState().then(state => {
                const searchEngine = state.searchEngines[currentMode] || 'google';
                let url;
                if (query) {
                    switch (searchEngine) {
                        case 'bing':
                            url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
                            break;
                        case 'duckduckgo':
                            url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
                            break;
                        case 'youtube':
                            url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
                            break;
                        case 'lofi':
                             url = `https://www.youtube.com/results?search_query=lofi+${encodeURIComponent(query)}`;
                            break;
                        case 'google':
                        default:
                            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                            break;
                    }
                } else {
                     switch (searchEngine) {
                        case 'bing':
                            url = 'https://www.bing.com';
                            break;
                        case 'duckduckgo':
                            url = 'https://duckduckgo.com';
                            break;
                        case 'youtube':
                            url = 'https://www.youtube.com';
                            break;
                        case 'lofi':
                            url = 'https://www.youtube.com/watch?v=jfKfPfyJRdk';
                            break;
                        case 'google':
                        default:
                            url = 'https://www.google.com';
                            break;
                    }
                }
                window.open(url, '_self');
            });
        });
    }

    // --- Timer Logic ---
    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        if (timerDisplay) {
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    function startTimer(saveStateToStorage = true) {
        if (!isTimerRunning) {
            isTimerRunning = true;
            if (timerStartBtn) timerStartBtn.textContent = 'Pause';
            timerInterval = setInterval(() => {
                timeRemaining--;
                updateTimerDisplay();
                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    showMessage("Time's up! Take a break.", 'success');
                    if (timerStartBtn) timerStartBtn.textContent = 'Start';
                    timeRemaining = 25 * 60; // Reset for a new session
                    updateTimerDisplay();
                }
            }, 1000);
            if (saveStateToStorage) {
                saveState({ timerState: { timeRemaining, isRunning: true } });
            }
        } else {
            pauseTimer();
        }
    }

    function pauseTimer(saveStateToStorage = true) {
        isTimerRunning = false;
        clearInterval(timerInterval);
        if (timerStartBtn) timerStartBtn.textContent = 'Start';
        if (saveStateToStorage) {
            saveState({ timerState: { timeRemaining, isRunning: false } });
        }
    }

    function resetTimer() {
        pauseTimer();
        timeRemaining = 25 * 60;
        updateTimerDisplay();
        saveState({ timerState: { timeRemaining, isRunning: false } });
    }
    
    function adjustTimer(minutes) {
        if (!isTimerRunning) {
            timeRemaining = Math.max(0, timeRemaining + (minutes * 60));
            updateTimerDisplay();
            saveState({ timerState: { timeRemaining, isRunning: false } });
        } else {
            showMessage('Cannot change timer while it is running. Please pause it first.', 'error');
        }
    }

    if (timerStartBtn) timerStartBtn.addEventListener('click', () => startTimer());
    if (timerResetBtn) timerResetBtn.addEventListener('click', () => resetTimer());
    if (timerPlusBtn) timerPlusBtn.addEventListener('click', () => adjustTimer(1));
    if (timerMinusBtn) timerMinusBtn.addEventListener('click', () => adjustTimer(-1));

    // --- To-Do List Logic ---
    function renderTodos() {
        loadState().then(state => {
            const todos = state.todos || [];
            if (!todoList) return;

            todoList.innerHTML = '';
            todos.forEach((todo, index) => {
                const todoItem = document.createElement('li');
                todoItem.className = 'flex items-center justify-between p-2 rounded-md bg-gray-700 bg-opacity-50';
                todoItem.innerHTML = `
                    <div class="flex items-center">
                        <input type="checkbox" id="todo-${index}" class="form-checkbox h-4 w-4 rounded text-white bg-gray-600 border-gray-500 cursor-pointer" ${todo.completed ? 'checked' : ''}>
                        <label for="todo-${index}" class="ml-2 text-white ${todo.completed ? 'line-through text-gray-400' : ''}">${todo.text}</label>
                    </div>
                    <button class="delete-todo-btn p-1 rounded hover:bg-gray-600 transition-colors" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                `;
                todoList.appendChild(todoItem);
            });

            document.querySelectorAll('.delete-todo-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.currentTarget.dataset.index, 10);
                    deleteTodo(index);
                });
            });
            document.querySelectorAll('#todo-list input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const index = parseInt(e.target.id.split('-')[1], 10);
                    toggleTodoCompletion(index);
                });
            });
        });
    }

    function addTodo(text) {
        loadState().then(state => {
            const todos = state.todos || [];
            todos.push({ text, completed: false });
            const newState = { ...state, todos: todos };
            storage.set({ minimalistHomepageState: JSON.stringify(newState) }, () => {
                renderTodos();
            });
        });
    }

    function deleteTodo(index) {
        loadState().then(state => {
            const todos = state.todos || [];
            todos.splice(index, 1);
            const newState = { ...state, todos: todos };
            storage.set({ minimalistHomepageState: JSON.stringify(newState) }, () => {
                renderTodos();
            });
        });
    }

    function toggleTodoCompletion(index) {
        loadState().then(state => {
            const todos = state.todos || [];
            todos[index].completed = !todos[index].completed;
            const newState = { ...state, todos: todos };
             storage.set({ minimalistHomepageState: JSON.stringify(newState) }, () => {
                renderTodos();
            });
        });
    }

    if (todoForm && todoInput) {
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = todoInput.value.trim();
            if (text) {
                addTodo(text);
                todoInput.value = '';
            }
        });
    }

    // --- UI State Management Functions ---
    function updateQuote(mode) {
        loadState().then(state => {
            const quoteData = state.customQuotes && state.customQuotes[mode] ? state.customQuotes[mode] : modeQuotes[mode];
            if (quoteData) {
                if (quoteText) quoteText.textContent = `"${quoteData.text}"`;
                if (quoteAuthor) quoteAuthor.textContent = quoteData.author ? `- ${quoteData.author}` : '';
            } else {
                if (quoteText) quoteText.textContent = "The future belongs to those who believe in the beauty of their dreams.";
                if (quoteAuthor) quoteAuthor.textContent = "- Eleanor Roosevelt";
            }
        });
    }

    function setMode(modeName) {
        loadState().then(state => {
            document.querySelectorAll('.mode-btn[data-mode]').forEach(btn => {
                btn.classList.remove('active');
                btn.style.setProperty('background-color', 'transparent', '');
                btn.style.setProperty('color', state.iconColor || 'white', '');
            });
            
            currentMode = modeName;
            const activeBtn = document.querySelector(`[data-mode="${currentMode}"]`);
            if(activeBtn) {
                activeBtn.classList.add('active');
                activeBtn.style.setProperty('background-color', 'transparent', 'important');
                activeBtn.style.setProperty('color', state.iconColor || 'white', 'important');
            }

            const isMinimalMode = currentMode === 'minimal' || currentMode === 'none';

            // Always hide all widgets first
            if(studyWidgetsSection) studyWidgetsSection.classList.add('hidden');
            if(entertainmentWidgetsSection) entertainmentWidgetsSection.classList.add('hidden');
            if(relaxWidgetsSection) relaxWidgetsSection.classList.add('hidden');
            
            if (breathingInterval) clearInterval(breathingInterval);

            // Then, selectively show the correct widgets
            if (isMinimalMode) {
                if(quoteSection) quoteSection.classList.add('hidden');
                if(websitesSection) websitesSection.classList.add('hidden');
            } else {
                if(quoteSection) quoteSection.classList.remove('hidden');
                if(websitesSection) websitesSection.classList.remove('hidden');
                
                if (currentMode === 'study') {
                    if(studyWidgetsSection) studyWidgetsSection.classList.remove('hidden');
                } else if (currentMode === 'entertainment') {
                    if(entertainmentWidgetsSection) entertainmentWidgetsSection.classList.remove('hidden');
                } else if (currentMode === 'relax') {
                    if(relaxWidgetsSection) relaxWidgetsSection.classList.remove('hidden');
                    startBreathingExercise();
                } else { // This handles any custom modes, defaulting them to the study layout.
                    if(studyWidgetsSection) studyWidgetsSection.classList.remove('hidden');
                }
            }

            renderWebsites(currentMode);
            updateQuote(currentMode);
            renderTodos();
            applyCustomizations(state);
        });
    }

    function renderModeButtons() {
        loadState().then(state => {
            const modes = state.modes;
            const iconColor = state.iconColor;
            const solidBg = state.solidIconBg;

            if (!modeButtonsContainer) return;
            modeButtonsContainer.innerHTML = '';
            
            modes.forEach(mode => {
                const button = document.createElement('button');
                button.className = `mode-btn`;
                button.title = `${mode.name.charAt(0).toUpperCase() + mode.name.slice(1)} Mode`;
                button.dataset.mode = mode.name;
                button.style.backgroundColor = solidBg ? (state.cardBgColor || '#1f2937') : 'transparent';
                button.style.color = iconColor || 'white';
                button.innerHTML = `<span>${mode.icon.charAt(0).toUpperCase()}</span>`;
                modeButtonsContainer.appendChild(button);
            });

            const addModeButton = document.createElement('button');
            addModeButton.className = 'mode-btn';
            addModeButton.title = 'Add Custom Mode';
            addModeButton.style.backgroundColor = solidBg ? (state.cardBgColor || '#1f2937') : 'transparent';
            addModeButton.style.color = iconColor || 'white';
            addModeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
            modeButtonsContainer.appendChild(addModeButton);

            addModeButton.addEventListener('click', () => {
                if (settingsModal) settingsModal.classList.remove('hidden');
                if (modeNameInput) {
                    editingModeName = null;
                    modeNameInput.value = '';
                    if (saveModeBtn) saveModeBtn.textContent = 'Create Mode';
                    if (deleteModeBtn) deleteModeBtn.classList.add('hidden');
                    modeNameInput.focus();
                }
            });

            document.querySelectorAll('.mode-btn[data-mode]').forEach(button => {
                button.addEventListener('click', () => {
                    const mode = button.dataset.mode;
                    if (mode) setMode(mode);
                });
            });
            
            const activeBtn = document.querySelector(`[data-mode="${currentMode}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
                activeBtn.style.setProperty('background-color', 'transparent', 'important');
                activeBtn.style.setProperty('color', state.iconColor || 'white', 'important');
            }
            
            if (localStorage.getItem('modeButtonsVisible') !== 'true') {
                modeButtonsContainer.classList.add('hidden');
            } else {
                modeButtonsContainer.classList.remove('hidden');
            }
        });
    }

    function renderWebsites(mode) {
        loadState().then(state => {
            const savedWebsites = state.websites;
            const sortAlphabetically = state.sortAlphabetically;
            const cardBgColor = state.cardBgColor || '#1f2937';

            if (!websitesList) return;
            websitesList.innerHTML = '';
            if (mode && websitesTitle) {
                let titleText = mode.charAt(0).toUpperCase() + mode.slice(1);
                if (titleText.length > 25) titleText = titleText.substring(0, 22) + '...';
                websitesTitle.textContent = `${titleText} Options`;
            }
            
            if (savedWebsites[mode]) {
                const websites = sortAlphabetically
                    ? savedWebsites[mode].slice().sort((a, b) => a.name.localeCompare(b.name))
                    : savedWebsites[mode];

                websites.forEach(site => {
                    const siteCard = document.createElement('a');
                    siteCard.href = site.url;
                    siteCard.target = '_blank';
                    siteCard.className = 'website-card flex items-center justify-center p-2 text-sm font-bold text-center text-white rounded-lg';
                    siteCard.style.backgroundColor = cardBgColor;
                    siteCard.textContent = site.name;
                    websitesList.appendChild(siteCard);
                });
            }
            
            // Add the "Add Website" button
            const addCard = document.createElement('a');
            addCard.href = '#';
            addCard.className = 'website-card flex items-center justify-center p-2 rounded-lg cursor-pointer';
            addCard.style.backgroundColor = cardBgColor;
            addCard.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
            addCard.addEventListener('click', (e) => {
                e.preventDefault();
                if(settingsBtn) settingsBtn.click();
            });
            websitesList.appendChild(addCard);

            websitesList.classList.add('active');
        });
    }

    // --- Settings Modal Logic ---
    function renderSavedWebsites() {
        loadState().then(state => {
            const websites = state.websites;
            const sortAlphabetically = state.sortAlphabetically;
            const cardBgColor = state.cardBgColor || '#1f2937';
            if (!savedWebsitesList) return;
            savedWebsitesList.innerHTML = '';
    
            const allModes = state.modes.map(mode => mode.name);
            allModes.forEach(category => {
                if (websites[category] && websites[category].length > 0) {
                    const categoryWebsites = websites[category];
                    const websitesToRender = sortAlphabetically
                        ? [...categoryWebsites].sort((a, b) => a.name.localeCompare(b.name))
                        : categoryWebsites;
    
                    websitesToRender.forEach((site) => {
                        const siteItem = document.createElement('div');
                        siteItem.className = 'flex justify-between items-center bg-gray-700 p-2 rounded-md';
                        siteItem.style.backgroundColor = cardBgColor;
                        siteItem.innerHTML = `
                            <div>
                                <p class="font-medium text-white">${site.name}</p>
                                <p class="text-xs text-gray-400 truncate w-48">${site.url}</p>
                            </div>
                            <button class="delete-site-btn p-1 text-white hover:text-gray-400 transition-colors" data-category="${category}" data-name="${site.name}" data-url="${site.url}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>
                        `;
                        savedWebsitesList.appendChild(siteItem);
                    });
                }
            });
    
            document.querySelectorAll('.delete-site-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const { category, name, url } = e.currentTarget.dataset;
                    deleteWebsite(category, name, url);
                });
            });
            if(lucide) lucide.createIcons();
        });
    }

    async function deleteWebsite(category, name, url) {
        const state = await loadState();
        const websites = state.websites;
        if (websites[category]) {
            const siteIndex = websites[category].findIndex(site => site.name === name && site.url === url);
            if (siteIndex > -1) {
                websites[category].splice(siteIndex, 1);
                await saveState({ websites: websites });
                renderSavedWebsites();
                renderWebsites(currentMode);
                showMessage('Website deleted successfully.', 'success');
            } else {
                 showMessage('Could not find the website to delete.', 'error');
            }
        }
    }

    function renderSearchEngineSettings() {
        const modeSearchEngineSettings = document.getElementById('search-settings-section');
        if (!modeSearchEngineSettings) return;

        loadState().then(state => {
            const modes = state.modes;
            const searchEngines = state.searchEngines || {};

            let html = `<h4 class="text-lg font-bold text-white mb-3">Search Engine per Mode</h4>
                        <div id="mode-search-engine-list" class="space-y-4">`;

            modes.forEach(mode => {
                const currentEngine = searchEngines[mode.name] || 'google';
                const modeName = mode.name.charAt(0).toUpperCase() + mode.name.slice(1);
                html += `
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <label for="search-engine-${mode.name}" class="block text-sm font-medium text-gray-400 mb-2 sm:mb-0">${modeName}</label>
                        <div class="flex items-center gap-2">
                            <select id="search-engine-${mode.name}" data-mode="${mode.name}" class="mode-search-engine-select block w-full sm:w-auto rounded-md bg-gray-700 border-gray-600 text-white shadow-sm p-2 focus:border-white focus:ring-white">
                                <option value="google" ${currentEngine === 'google' ? 'selected' : ''}>Google</option>
                                <option value="duckduckgo" ${currentEngine === 'duckduckgo' ? 'selected' : ''}>DuckDuckGo</option>
                                <option value="bing" ${currentEngine === 'bing' ? 'selected' : ''}>Bing</option>
                                <option value="youtube" ${currentEngine === 'youtube' ? 'selected' : ''}>YouTube</option>
                                <option value="lofi" ${currentEngine === 'lofi' ? 'selected' : ''}>Lofi Radio</option>
                            </select>
                            <button type="button" title="Apply to all modes" class="apply-all-search-btn p-2 rounded-md font-semibold text-white bg-gray-600 hover:bg-gray-500 transition-colors" data-mode="${mode.name}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-check"><path d="m12 15 2 2 4-4"/><path d="M5 12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/><path d="M5 12V7a2 2 0 0 1 2-2h7"/></svg>
                            </button>
                        </div>
                    </div>
                `;
            });

            html += `</div>`;
            modeSearchEngineSettings.innerHTML = html;

            document.querySelectorAll('.mode-search-engine-select').forEach(select => {
                select.addEventListener('change', (e) => {
                    const modeName = e.target.dataset.mode;
                    const newEngine = e.target.value;
                    loadState().then(state => {
                        state.searchEngines[modeName] = newEngine;
                        saveState({ searchEngines: state.searchEngines });
                        showMessage(`Search engine for ${modeName} updated!`, 'success');
                    });
                });
            });

            document.querySelectorAll('.apply-all-search-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const modeName = e.currentTarget.dataset.mode;
                    const selectedEngine = document.getElementById(`search-engine-${modeName}`).value;
                    loadState().then(state => {
                        const newSearchEngines = {};
                        state.modes.forEach(mode => {
                            newSearchEngines[mode.name] = selectedEngine;
                        });
                        saveState({ searchEngines: newSearchEngines });
                        renderSearchEngineSettings(); // Re-render to show changes
                        const engineName = selectedEngine.charAt(0).toUpperCase() + selectedEngine.slice(1);
                        showMessage(`'${engineName}' applied to all modes!`, 'success');
                    });
                });
            });
        });
    }

    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            if (settingsModal) settingsModal.classList.remove('hidden');
            loadState().then(state => {
                if (backgroundUrlInput) backgroundUrlInput.value = state.backgroundImage || '';
                if (solidBackgroundColorInput) solidBackgroundColorInput.value = state.solidBackgroundColor || '#000000';
                if (textColorInput) textColorInput.value = state.textColor || '#ffffff';
                if (uiOpacityInput) uiOpacityInput.value = state.uiOpacity;
                if (cardBgColorInput) cardBgColorInput.value = state.cardBgColor || '#1f2937';
                if (iconColorInput) iconColorInput.value = state.iconColor || '#ffffff';
                if (solidIconBgInput) solidIconBgInput.checked = state.solidIconBg;
                if (defaultModeSelect) defaultModeSelect.value = state.defaultMode;
                renderSearchEngineSettings();
                renderSavedWebsites();
                renderModeManagement();
                renderModeCustomQuoteSection(currentMode);
            });
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', () => {
        if (settingsModal) settingsModal.classList.add('hidden');
        if (customQuoteSettingsSection) customQuoteSettingsSection.classList.add('hidden');
    });
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay && settingsModal) {
            settingsModal.classList.add('hidden');
            if (customQuoteSettingsSection) customQuoteSettingsSection.classList.add('hidden');
        }
    });

    if (solidBackgroundColorInput) solidBackgroundColorInput.addEventListener('input', (e) => {
        if (body) {
            body.style.backgroundImage = 'none';
            body.style.backgroundColor = e.target.value;
        }
    });

    if (addWebsiteForm) addWebsiteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = websiteNameInput.value.trim();
        const url = websiteUrlInput.value.trim();
        const category = websiteCategorySelect.value;
        if (name && url) {
            loadState().then(state => {
                const websites = state.websites;
                websites[category] = websites[category] || [];
                websites[category].push({ name, url });
                saveState({ websites: websites });
                websiteNameInput.value = '';
                websiteUrlInput.value = '';
                renderSavedWebsites();
                renderWebsites(currentMode);
                showMessage('Website added successfully!', 'success');
            });
        } else {
            showMessage('Please fill out both website name and URL.', 'error');
        }
    });

    if (customizationForm) customizationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customizations = {
            backgroundImage: backgroundUrlInput.value.trim(),
            solidBackgroundColor: solidBackgroundColorInput.value,
            textColor: textColorInput.value,
            uiOpacity: uiOpacityInput.value,
            cardBgColor: cardBgColorInput.value,
            iconColor: iconColorInput.value,
            solidIconBg: solidIconBgInput.checked,
            backgroundGradient: ''
        };
        saveState(customizations);
        loadState().then(state => {
            applyCustomizations(state);
            renderModeButtons();
            showMessage('Theme applied successfully!', 'success');
        });
    });

    if (gradientButtons) gradientButtons.forEach(button => {
        button.addEventListener('click', () => {
            const customizations = {
                backgroundGradient: button.dataset.gradient,
                textColor: textColorInput.value,
                uiOpacity: uiOpacityInput.value,
                cardBgColor: cardBgColorInput.value,
                iconColor: iconColorInput.value,
                solidIconBg: solidIconBgInput.checked,
                backgroundImage: '',
                solidBackgroundColor: ''
            };
            saveState(customizations);
            loadState().then(state => {
                applyCustomizations(state);
                renderModeButtons();
                showMessage('Theme applied successfully!', 'success');
            });
        });
    });

    if (uploadWallpaperInput) uploadWallpaperInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                loadState().then(state => {
                    const customizations = {
                        backgroundImage: dataUrl,
                        backgroundGradient: '',
                        solidBackgroundColor: '',
                        textColor: textColorInput.value,
                        uiOpacity: uiOpacityInput.value,
                        cardBgColor: cardBgColorInput.value,
                        iconColor: iconColorInput.value,
                        solidIconBg: solidIconBgInput.checked
                    };
                    saveState(customizations);
                    applyCustomizations({ ...state, ...customizations });
                    renderModeButtons();
                    showMessage('Wallpaper uploaded and applied successfully!', 'success');
                });
            };
            reader.readAsDataURL(file);
        }
    });
    
    if (defaultModeForm) defaultModeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveState({ defaultMode: defaultModeSelect.value });
        showMessage(`Default homepage mode set!`, 'success');
    });

    if (exportDataBtn) exportDataBtn.addEventListener('click', () => {
        loadState().then(data => {
            const dataStr = JSON.stringify(data, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'minimalist-homepage-backup.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showMessage('Data exported successfully!', 'success');
        });
    });

    if (importFileInput) importFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (importedData.websites !== undefined) {
                    storage.set({ minimalistHomepageState: JSON.stringify(importedData) }, () => {
                        showMessage('Data imported successfully! Reloading...', 'success');
                        setTimeout(() => window.location.reload(), 1000);
                    });
                } else {
                    showMessage('Invalid file format.', 'error');
                }
            } catch (error) {
                showMessage('Error parsing file.', 'error');
                console.error(error);
            }
        };
        reader.readAsText(file);
    });
    
    if (sortWebsitesToggle) sortWebsitesToggle.addEventListener('change', (e) => {
        saveState({ sortAlphabetically: e.target.checked });
        renderSavedWebsites();
        renderWebsites(currentMode);
    });

    // --- Mode Management Logic ---
    function renderModeManagement() {
        loadState().then(state => {
            const modes = state.modes;
            if (!savedModesList) return;
            savedModesList.innerHTML = '';
            modes.forEach(mode => {
                const modeItem = document.createElement('div');
                modeItem.className = 'flex items-center justify-between p-2 rounded-md bg-gray-700 bg-opacity-50';
                const iconHtml = `<div class="p-1 rounded-xl bg-gray-700 text-white font-bold text-lg leading-none flex items-center justify-center w-8 h-8">${mode.icon.charAt(0).toUpperCase()}</div>`;
                
                modeItem.innerHTML = `
                    <div class="flex items-center text-white font-medium mr-2">
                        ${iconHtml}
                    </div>
                    <span class="text-white flex-1">${mode.name.charAt(0).toUpperCase() + mode.name.slice(1)}</span>
                    <div class="flex items-center space-x-2">
                        <button class="edit-quote-btn p-1 text-white hover:text-gray-400 transition-colors" data-mode="${mode.name}" title="Edit Quote">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote"><path d="M3 21h18"/><path d="M16 11H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h13a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><path d="M19 10h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"/></svg>
                        </button>
                        <button class="edit-mode-btn p-1 text-white hover:text-gray-400 transition-colors" data-mode="${mode.name}" title="Edit Mode">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                        </button>
                    </div>
                `;
                savedModesList.appendChild(modeItem);
            });
            
            if (defaultModeSelect) {
                defaultModeSelect.innerHTML = '';
                modes.forEach(mode => {
                    const option = document.createElement('option');
                    option.value = mode.name;
                    option.textContent = mode.name.charAt(0).toUpperCase() + mode.name.slice(1);
                    defaultModeSelect.appendChild(option);
                });
                ['minimal', 'none'].forEach(val => {
                    const option = document.createElement('option');
                    option.value = val;
                    option.textContent = val.charAt(0).toUpperCase() + val.slice(1);
                    defaultModeSelect.appendChild(option);
                });
                defaultModeSelect.value = state.defaultMode;
            }

            document.querySelectorAll('.edit-mode-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const modeName = e.currentTarget.dataset.mode;
                    const mode = state.modes.find(m => m.name === modeName);
                    if (mode) {
                        if (modeNameInput) modeNameInput.value = mode.name;
                        editingModeName = mode.name;
                        if (saveModeBtn) saveModeBtn.textContent = 'Save Changes';
                        if (deleteModeBtn) deleteModeBtn.classList.remove('hidden');
                    }
                });
            });

            document.querySelectorAll('.edit-quote-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const modeName = e.currentTarget.dataset.mode;
                    currentMode = modeName; // Set current mode to the one being edited
                    loadState().then(state => {
                        const quote = state.customQuotes[modeName] || { text: '', author: '' };
                        if (customQuoteSettingsSection) {
                            customQuoteSettingsSection.classList.remove('hidden');
                            customQuoteModeName.textContent = modeName.charAt(0).toUpperCase() + modeName.slice(1);
                        }
                        if (customQuoteTextarea) customQuoteTextarea.value = quote.text || '';
                        if (customQuoteAuthor) customQuoteAuthor.value = quote.author || '';
                    });
                });
            });
        });
    }

    if (modeForm) modeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newModeName = modeNameInput.value.trim().toLowerCase();
        if (!newModeName) {
            showMessage('Please enter a mode name.', 'error');
            return;
        }
        loadState().then(state => {
            let modes = state.modes;
            let websites = state.websites;
            let searchEngines = state.searchEngines;
            let customQuotes = state.customQuotes;

            if (editingModeName) {
                const modeIndex = modes.findIndex(m => m.name === editingModeName);
                if (modeIndex !== -1) {
                    if (newModeName !== editingModeName && modes.some(m => m.name === newModeName)) {
                        showMessage('A mode with this name already exists.', 'error');
                        return;
                    }
                    modes[modeIndex].name = newModeName;
                    modes[modeIndex].icon = newModeName.charAt(0).toUpperCase();
                    if (newModeName !== editingModeName) {
                        websites[newModeName] = websites[editingModeName] || [];
                        delete websites[editingModeName];
                        searchEngines[newModeName] = searchEngines[editingModeName] || 'google';
                        delete searchEngines[editingModeName];
                        customQuotes[newModeName] = customQuotes[editingModeName] || {};
                        delete customQuotes[editingModeName];
                        if (state.defaultMode === editingModeName) state.defaultMode = newModeName;
                    }
                }
            } else {
                if (modes.some(m => m.name === newModeName)) {
                    showMessage('A mode with this name already exists.', 'error');
                    return;
                }
                modes.push({ name: newModeName, icon: newModeName.charAt(0).toUpperCase() });
                websites[newModeName] = [];
                searchEngines[newModeName] = 'google';
                customQuotes[newModeName] = {};
            }
            saveState({ modes, websites, searchEngines, customQuotes, defaultMode: state.defaultMode });
            if (modeNameInput) modeNameInput.value = '';
            editingModeName = null;
            if (saveModeBtn) saveModeBtn.textContent = 'Create Mode';
            if (deleteModeBtn) deleteModeBtn.classList.add('hidden');
            renderModeButtons();
            renderModeManagement();
            renderSavedWebsites();
            updateWebsiteCategorySelect(modes);
            renderSearchEngineSettings();
            showMessage('Mode saved successfully!', 'success');
        });
    });

    if (deleteModeBtn) deleteModeBtn.addEventListener('click', () => {
        if (editingModeName && !['study', 'relax', 'entertainment'].includes(editingModeName)) {
            loadState().then(state => {
                state.modes = state.modes.filter(m => m.name !== editingModeName);
                delete state.websites[editingModeName];
                delete state.searchEngines[editingModeName];
                delete state.customQuotes[editingModeName];
                if (state.defaultMode === editingModeName) state.defaultMode = 'none';
                saveState(state);
                if (modeNameInput) modeNameInput.value = '';
                editingModeName = null;
                if (saveModeBtn) saveModeBtn.textContent = 'Create Mode';
                if (deleteModeBtn) deleteModeBtn.classList.add('hidden');
                renderModeButtons();
                renderModeManagement();
                renderSavedWebsites();
                updateWebsiteCategorySelect(state.modes);
                renderSearchEngineSettings();
                showMessage('Mode deleted successfully.', 'success');
            });
        } else {
            showMessage('Cannot delete a default mode.', 'error');
        }
    });
    
    if (toggleModesBtn) toggleModesBtn.addEventListener('click', () => {
        const isVisible = !modeButtonsContainer.classList.contains('hidden');
        modeButtonsContainer.classList.toggle('hidden');
        localStorage.setItem('modeButtonsVisible', !isVisible);
    });

    function updateWebsiteCategorySelect(modes) {
        if (!websiteCategorySelect) return;
        websiteCategorySelect.innerHTML = '';
        modes.forEach(mode => {
            const option = document.createElement('option');
            option.value = mode.name;
            option.textContent = mode.name.charAt(0).toUpperCase() + mode.name.slice(1);
            websiteCategorySelect.appendChild(option);
        });
    }

    function renderModeCustomQuoteSection(modeName) {
        loadState().then(state => {
            if (customQuoteSettingsSection) {
                const quote = state.customQuotes[modeName] || { text: '', author: '' };
                if (customQuoteTextarea) customQuoteTextarea.value = quote.text || '';
                if (customQuoteAuthor) customQuoteAuthor.value = quote.author || '';
            }
        });
    }
    
    // --- Music Player Logic ---
    if (audioFileInput) audioFileInput.addEventListener('change', (e) => {
        playlist = Array.from(e.target.files).filter(file => file.type.startsWith('audio/'));
        originalPlaylist = [...playlist];
        currentTrackIndex = 0;
        if (playlist.length > 0) {
            loadTrack(currentTrackIndex);
            renderPlaylist();
        } else {
            if(trackName) trackName.textContent = "No audio files found in folder.";
        }
    });

    function loadTrack(index) {
        const file = playlist[index];
        if(trackName) trackName.textContent = file.name;
        if(audioPlayer) audioPlayer.src = URL.createObjectURL(file);
        updateFavoriteIcon();
        if(audioPlayer) {
            const playPromise = audioPlayer.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name !== 'AbortError') {
                        console.error("Audio play failed:", error);
                    }
                });
            }
        }
    }

    function renderPlaylist() {
        if(!playlistContainer) return;
        playlistContainer.innerHTML = '';
        playlist.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'p-1 cursor-pointer hover:bg-gray-700 rounded';
            item.textContent = file.name;
            if (index === currentTrackIndex) item.classList.add('bg-gray-600');
            item.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(index);
                renderPlaylist();
            });
            playlistContainer.appendChild(item);
        });
    }

    if (playPauseBtn) playPauseBtn.addEventListener('click', () => {
        if (audioPlayer && audioPlayer.paused) audioPlayer.play();
        else if (audioPlayer) audioPlayer.pause();
    });

    if (audioPlayer) {
        audioPlayer.addEventListener('play', () => { if(playPauseBtn) playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>` });
        audioPlayer.addEventListener('pause', () => { if(playPauseBtn) playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>` });
        audioPlayer.addEventListener('timeupdate', () => {
            if (audioPlayer.duration && progressBar) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressBar.style.width = `${progress}%`;
            }
        });
        audioPlayer.addEventListener('ended', playNext);
    }

    function playNext() {
        if (repeatState === 'one') {
            if(audioPlayer) audioPlayer.play();
            return;
        }
        currentTrackIndex++;
        if (currentTrackIndex >= playlist.length) {
            if (repeatState === 'all') {
                currentTrackIndex = 0;
            } else {
                return; // Stop playback
            }
        }
        loadTrack(currentTrackIndex);
        renderPlaylist();
    }

    if (volumeSlider) volumeSlider.addEventListener('input', (e) => {if(audioPlayer) audioPlayer.volume = e.target.value});
    if (progressContainer) progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        if (audioPlayer && audioPlayer.duration) audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
    });

    if (shuffleBtn) shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('text-blue-400', isShuffle);
        if (isShuffle) {
            // Fisher-Yates shuffle
            for (let i = playlist.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
            }
        } else {
            playlist = [...originalPlaylist];
        }
        if(trackName) currentTrackIndex = playlist.findIndex(track => track.name === trackName.textContent);
        renderPlaylist();
    });

    if (repeatBtn) repeatBtn.addEventListener('click', () => {
        if (repeatState === 'none') repeatState = 'all';
        else if (repeatState === 'all') repeatState = 'one';
        else repeatState = 'none';
        
        repeatBtn.classList.toggle('text-blue-400', repeatState !== 'none');
        if (repeatState === 'one') {
            repeatBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-1"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h1v4"/></svg>`;
        } else {
            repeatBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`;
        }
    });

    function updateFavoriteIcon() {
        loadState().then(state => {
            const isFavorited = state.favorites && state.favorites.includes(playlist[currentTrackIndex]?.name);
            if(favoriteBtn) favoriteBtn.classList.toggle('favorited', isFavorited);
        });
    }

    if (favoriteBtn) favoriteBtn.addEventListener('click', () => {
        if (!playlist[currentTrackIndex]) return;
        const currentTrackName = playlist[currentTrackIndex].name;
        loadState().then(state => {
            let favorites = state.favorites || [];
            if (favorites.includes(currentTrackName)) {
                favorites = favorites.filter(name => name !== currentTrackName);
            } else {
                favorites.push(currentTrackName);
            }
            saveState({ favorites });
            updateFavoriteIcon();
        });
    });

    // --- Breathing Exercise Logic ---
    function startBreathingExercise() {
        const cycle = ['Breathe In', 'Hold', 'Breathe Out'];
        let index = 0;
        function updateText() {
            if(breathingText) breathingText.textContent = cycle[index];
            index = (index + 1) % cycle.length;
        }
        updateText();
        breathingInterval = setInterval(updateText, 4000);
    }

    loadState().then(state => {
        updateWebsiteCategorySelect(state.modes);
        renderModeButtons();
    });

    // Make Lucide icons active
    if(typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
