// Initialize speech synthesis
let selectedVoice = null;
let isSpeaking = false;
let allVoices = [];

function loadVoices() {
    allVoices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voice-select');
    voiceSelect.innerHTML = '';

    console.log('Available voices:', allVoices.map(v => `${v.name} (${v.lang})`));

    // Add "No Voice" option first
    const noVoiceOption = document.createElement('option');
    noVoiceOption.value = '';
    noVoiceOption.textContent = 'No Voice';
    voiceSelect.appendChild(noVoiceOption);

    // Filter for US, UK, and AU voices
    const englishVoices = allVoices.filter(voice =>
        voice.lang === 'en-US' || voice.lang === 'en-GB' || voice.lang === 'en-AU'
    );

    // Separate male and female voices (heuristic based on common names)
    const maleNames = ['Aaron', 'Daniel', 'Fred', 'Thomas', 'Alex', 'Google US English Male', 'Microsoft David', 'Microsoft Mark'];
    const femaleNames = ['Samantha', 'Karen', 'Moira', 'Kate', 'Victoria', 'Fiona', 'Google US English Female', 'Microsoft Zira'];

    const maleVoices = englishVoices.filter(v =>
        maleNames.some(name => v.name.includes(name))
    ).slice(0, 2);

    const femaleVoices = englishVoices.filter(v =>
        femaleNames.some(name => v.name.includes(name))
    ).slice(0, 2);

    const selectedVoices = [...maleVoices, ...femaleVoices];

    // If we don't have enough, just take first 4 English voices
    if (selectedVoices.length < 4) {
        englishVoices.slice(0, 4).forEach(voice => {
            if (!selectedVoices.includes(voice)) {
                selectedVoices.push(voice);
            }
        });
    }

    // Populate dropdown
    selectedVoices.forEach((voice) => {
        const index = allVoices.indexOf(voice);
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    // Default to "No Voice"
    voiceSelect.value = '';
    selectedVoice = null;
}

// Load voices on page load and when they change
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Handle voice selection change
document.getElementById('voice-select').addEventListener('change', function() {
    if (this.value === '') {
        selectedVoice = null;
    } else {
        selectedVoice = allVoices[this.value];
        console.log('Selected voice:', selectedVoice.name, selectedVoice.lang);
    }
});

function toggleSpeak(text) {
    // Don't speak if no voice is selected
    if (!selectedVoice) {
        return;
    }

    if (isSpeaking) {
        // Stop speaking
        speechSynthesis.cancel();
        isSpeaking = false;
    } else {
        // Start speaking
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.lang = 'en-GB';
        utterance.rate = 1; // Normal speed
        utterance.pitch = 1.1; // Slightly higher pitch, friendlier

        utterance.onstart = () => {
            isSpeaking = true;
            console.log('Playing voice:', utterance.voice.name, utterance.voice.lang);
        };
        utterance.onend = () => isSpeaking = false;
        utterance.onerror = () => isSpeaking = false;

        speechSynthesis.speak(utterance);
    }
}

// Add click listeners to letters with draw effect
document.querySelectorAll('[data-letter]').forEach(card => {
    const letterDiv = card.querySelector('.fredericka-the-great');
    letterDiv.style.cursor = 'pointer';
    letterDiv.addEventListener('click', function() {
        const letter = this.textContent.trim();
        const letterName = letter.toLowerCase();

        // Add draw/write effect
        this.classList.add('draw');
        setTimeout(() => this.classList.remove('draw'), 600);

        toggleSpeak(letterName);
    });
});

// Add click listeners to story content
document.querySelectorAll('.story-content').forEach(story => {
    story.style.cursor = 'pointer';
    story.addEventListener('click', function() {
        toggleSpeak(this.textContent);
    });
});

document.querySelectorAll('.word-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const word = this.dataset.word;
        const card = this.closest('[data-letter]');
        const storyContent = card.querySelector('.story-content');
        const storyData = card.querySelector(`[data-story="${word}"]`);

        // Update active state
        card.querySelectorAll('.word-link').forEach(w => w.classList.remove('active-word', 'text-blue-600'));
        this.classList.add('active-word', 'text-blue-600');

        // Update story
        if (storyData) {
            storyContent.innerHTML = storyData.innerHTML;
            // Speak the word
            toggleSpeak(word);
        }
    });
});
