document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const modeIcon = document.getElementById('mode-icon');
    const body = document.body;
    const video = document.getElementById('myVideo');

    // Function to set mode
    function setMode(mode) {
        if (mode === 'light') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            modeIcon.setAttribute('src', 'media/dark-mode.png');
            video.setAttribute('src', 'media/light-mode.mp4');
            video.play();
            localStorage.setItem('mode', 'light');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            modeIcon.setAttribute('src', 'media/light-mode.png');
            video.setAttribute('src', 'media/quantum-video.mp4');
            video.play();
            localStorage.setItem('mode', 'dark');
        }
    }

    function getTimeBasedMode() {
        const now = new Date();
        const hour = now.getHours();
        return hour >= 6 && hour < 18 ? 'light' : 'dark';
    }

    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        setMode(savedMode);
    } else {
        const timeBasedMode = getTimeBasedMode();
        setMode(timeBasedMode);
    }

    // Event listener for toggle button
    toggleButton.addEventListener('click', () => {
        const currentMode = body.classList.contains('light-mode') ? 'dark' : 'light';
        setMode(currentMode);
    });
});
