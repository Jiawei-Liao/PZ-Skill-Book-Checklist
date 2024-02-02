document.addEventListener('DOMContentLoaded', function () {
    // Data
    let data = [
        { text: 'Carpentry Vol. 1', checked: false },
        { text: 'Carpentry Vol. 2', checked: false },
        { text: 'Carpentry Vol. 3', checked: false },
        { text: 'Carpentry Vol. 4', checked: false },
        { text: 'Carpentry Vol. 5', checked: false },
        { text: 'Cooking Vol. 1', checked: false },
        { text: 'Cooking Vol. 2', checked: false },
        { text: 'Cooking Vol. 3', checked: false },
        { text: 'Cooking Vol. 4', checked: false },
        { text: 'Cooking Vol. 5', checked: false },
        { text: 'Electrician Vol. 1', checked: false },
        { text: 'Electrician Vol. 2', checked: false },
        { text: 'Electrician Vol. 3', checked: false },
        { text: 'Electrician Vol. 4', checked: false },
        { text: 'Electrician Vol. 5', checked: false },
        { text: 'Farming Vol. 1', checked: false },
        { text: 'Farming Vol. 2', checked: false },
        { text: 'Farming Vol. 3', checked: false },
        { text: 'Farming Vol. 4', checked: false },
        { text: 'Farming Vol. 5', checked: false },
        { text: 'First Aid Vol. 1', checked: false },
        { text: 'First Aid Vol. 2', checked: false },
        { text: 'First Aid Vol. 3', checked: false },
        { text: 'First Aid Vol. 4', checked: false },
        { text: 'First Aid Vol. 5', checked: false },
        { text: 'Fishing Vol. 1', checked: false },
        { text: 'Fishing Vol. 2', checked: false },
        { text: 'Fishing Vol. 3', checked: false },
        { text: 'Fishing Vol. 4', checked: false },
        { text: 'Fishing Vol. 5', checked: false },
        { text: 'Foraging Vol. 1', checked: false },
        { text: 'Foraging Vol. 2', checked: false },
        { text: 'Foraging Vol. 3', checked: false },
        { text: 'Foraging Vol. 4', checked: false },
        { text: 'Foraging Vol. 5', checked: false },
        { text: 'Mechanics Vol. 1', checked: false },
        { text: 'Mechanics Vol. 2', checked: false },
        { text: 'Mechanics Vol. 3', checked: false },
        { text: 'Mechanics Vol. 4', checked: false },
        { text: 'Mechanics Vol. 5', checked: false },
        { text: 'Tailoring Vol. 1', checked: false },
        { text: 'Tailoring Vol. 2', checked: false },
        { text: 'Tailoring Vol. 3', checked: false },
        { text: 'Tailoring Vol. 4', checked: false },
        { text: 'Tailoring Vol. 5', checked: false },
        { text: 'Trapping Vol. 1', checked: false },
        { text: 'Trapping Vol. 2', checked: false },
        { text: 'Trapping Vol. 3', checked: false },
        { text: 'Trapping Vol. 4', checked: false },
        { text: 'Trapping Vol. 5', checked: false },
        { text: 'Dancing Vol. 1', checked: false },
        { text: 'Dancing Vol. 2', checked: false },
        { text: 'Dancing Vol. 3', checked: false },
        { text: 'Dancing Vol. 4', checked: false },
        { text: 'Dancing Vol. 5', checked: false },
    ];

    // Remembering last loaded run for quick saving
    let currentRun = '';
    if (localStorage.getItem('lastLoadedRun') == null) {
        localStorage.setItem('lastLoadedRun', '');
    } else {
        currentRun = localStorage.getItem('lastLoadedRun');
    }

    // Initialise if there is a last loaded run
    if (currentRun !== '') {
        document.getElementById('run').innerText = "Current Run: " + currentRun;
        data = JSON.parse(localStorage.getItem(currentRun));
    }

    // Buttons
    window.saveData = function () {
        const saveName = prompt('Enter a save name: (empty is saved to current run)');
        if ((saveName !== null) && (saveName !== '')) {
            localStorage.setItem(saveName, JSON.stringify(data));

            localStorage.setItem('lastLoadedRun', saveName);
            document.getElementById('run').innerText = "Current Run: " + saveName;
    
            console.log(saveName + ' saved');
        }
    };

    window.quickSave = function () {
        if (currentRun !== '') {
            localStorage.setItem(currentRun, JSON.stringify(data));

            console.log(currentRun + ' saved')
        }
    };

    window.loadData = function () {
        const saveNames = Object.keys(localStorage);
        saveNames.splice(saveNames.indexOf('lastLoadedRun'), 1);
        const saveName = prompt('Enter a save name:\n\nAvailable saves:\n' + saveNames.join(', '));
    
        if ((saveName !== null) && (saveName !== 'lastLoadedRun')) {
            const savedData = localStorage.getItem(saveName);
            if (savedData !== null) {
                data = JSON.parse(savedData);
                renderRows();
            } else {
                alert('No save data found with that name.');
            }

            currentRun = saveName;
            localStorage.setItem('lastLoadedRun', saveName);
            document.getElementById('run').innerText = "Current Run: " + saveName;
            renderRows();

            console.log(saveName + ' loaded');
        }
    };
    
    window.removeData = function () {
        const saveNames = Object.keys(localStorage);
        saveNames.splice(saveNames.indexOf('lastLoadedRun'), 1);
        const saveName = prompt('Enter a save name:\n\nAvailable saves:\n' + saveNames.join(', '));
    
        if ((saveName !== null) && (saveName !== 'lastLoadedRun')){
            const savedData = localStorage.getItem(saveName);
            if (savedData !== null) {
                localStorage.removeItem(saveName);
            } else {
                alert('No save data found with that name.');
            }
        }

        if (currentRun === saveName) {
            currentRun = '';
            localStorage.setItem('lastLoadedRun', '');
            document.getElementById('run').innerText = '';
            data.forEach(item => item.checked = false);
            renderRows();

            console.log("Current run is being removed, resetting to default state.")
        }

        if (saveName) {
            console.log(saveName + ' removed');
        }
    }

    window.uncheckAll = function () {
        data.forEach(item => item.checked = false);
        renderRows();
    }

    // Rendering rows
    const foundContainer = document.getElementById('found-container');
    const unfoundContainer = document.getElementById('unfound-container');

    function renderRows() {
        foundContainer.innerHTML = '';
        unfoundContainer.innerHTML = '';

        data.forEach((item, index) => {
            const row = document.createElement('div');
            row.classList.add('row');

            const img = document.createElement('img');
            img.src = 'img/' + item.text.split(' ')[0].toLowerCase() + '.png';
            img.alt = item.text;

            const text = document.createElement('div');
            text.innerText = item.text;

            const checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            checkbox.innerHTML = item.checked ? '&#10003;' : '&#10063;';
            checkbox.addEventListener('click', () => toggleCheckbox(index));

            row.appendChild(img);
            row.appendChild(text);
            row.appendChild(checkbox);

            if (item.checked) {
                foundContainer.appendChild(row);
            } else {
                unfoundContainer.appendChild(row);
            }
        });
    }

    function toggleCheckbox(index) {
        data[index].checked = !data[index].checked;
        renderRows();
    }

    renderRows();
});