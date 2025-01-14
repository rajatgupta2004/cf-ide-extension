// Inject Monaco Editor script into the page
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/loader.js';
script.onload = function () {
    // Configure Monaco Editor
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' }});
    require(['vs/editor/editor.main'], function () {

            // Create a container for the editor
            const ideContainer = document.createElement('div');
            ideContainer.id = 'ide-container';
            // ideContainer.style.position = 'absolute';
            ideContainer.style.right = '0';
            ideContainer.style.top = '150px'; // Increased margin from the menu bar
            ideContainer.style.width = '100%'; // Adjust width to take up full right side
            ideContainer.style.backgroundColor = '#f0f0f0';
            ideContainer.style.zIndex = '1000';
            ideContainer.style.overflow = 'hidden';
            ideContainer.style.marginBottom = '20px';
            
            document.getElementById('pageContent').style.width= '48%';
            document.getElementById('sidebar').style.width = '50%';
            document.querySelector('div.problem-statement').style.width='100%';
            document.querySelector('div.problem-statement').style.paddingLeft='10px';
            document.querySelector('div.problem-statement').style.paddingTop='10px';
            document.getElementById('body').style.maxWidth= '100%';
            document.getElementById('sidebar').style.margin = '42px 0px 1em -22em';
            // document.getElementById('sidebar').style.margin = '0px';

            document.body.appendChild(ideContainer);
            const firstChild = document.getElementById('sidebar').firstChild;
            document.getElementById('sidebar').insertBefore(ideContainer,firstChild);


            // Create a navigation bar
            const navBar = document.createElement('div');
            navBar.style.display = 'flex';
            navBar.style.justifyContent = 'space-between';
            navBar.style.padding = '10px';
            navBar.style.backgroundColor = '#333';
            navBar.style.color = '#fff';

            // Create a dropdown for selecting the programming language
            const languageSelect = document.createElement('select');
            const languages = ['cpp', 'java', 'python', 'javascript'];
            languages.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang;
                option.text = lang.toUpperCase();
                languageSelect.appendChild(option);
            });
            navBar.appendChild(languageSelect);

            // Create a dropdown for selecting the theme
            const themeSelect = document.createElement('select');
            const themes = ['vs-dark', 'vs-light','hc-black'];
            themes.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme;
                option.text = theme.split('-')[1].toUpperCase();
                themeSelect.appendChild(option);
            });

            themeSelect.addEventListener('change',()=>{
                // console.log("i am changed ");
                monaco.editor.setTheme(themeSelect.value);
            })
            
            navBar.appendChild(themeSelect);

            // Create a button to reset the code
            const resetButton = document.createElement('button');
            resetButton.innerText = 'Reset Code';
            resetButton.addEventListener('click',()=>{
            editor.setValue("// Type your code here");
            })
            navBar.appendChild(resetButton);



            ideContainer.appendChild(navBar);

            // Create a container for the editor
            const editorContainer = document.createElement('div');
            editorContainer.style.height = '500px'; // Adjust height to fit below the nav bar and above the buttons
            ideContainer.appendChild(editorContainer);

            // Initialize Monaco Editor
            const editor = monaco.editor.create(editorContainer, {
                value: '// Type your code here',
                language: 'cpp',
                theme: 'vs-dark',
                automaticLayout: true // Ensure the editor takes up the full container
            });


            // Create a container for the buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'space-between';
            buttonContainer.style.padding = '10px';
            buttonContainer.style.backgroundColor = '#333';
            buttonContainer.style.color = '#fff';
            buttonContainer.style.position = 'relative';
            buttonContainer.style.bottom = '0';
            buttonContainer.style.width = '100%';
            buttonContainer.style.boxSizing = 'border-box'; // Ensure the buttons fit within the container


            const resultContainer = document.createElement('div');
            resultContainer.style.display = 'flex';
            resultContainer.style.justifyContent = 'space-between';
            resultContainer.style.padding = '10px';
            resultContainer.style.backgroundColor = '#333';
            resultContainer.style.color = '#fff';
            resultContainer.style.position = 'relative';
            resultContainer.style.bottom = '0';
            resultContainer.style.width = '100%';
            resultContainer.style.height = '100%';
            resultContainer.style.boxSizing = 'border-box';
            
            // Create and style the output label
            const outputLabel = document.createElement('label');
            outputLabel.innerText = 'Output';
            outputLabel.style.color = '#fff';
            outputLabel.style.marginBottom = '5px';
            
            // Create and style the output container
            const outputContainer = document.createElement('textarea');
            outputContainer.id = "outputContainer";
            outputContainer.style.display = 'flex';
            outputContainer.style.justifyContent = 'space-between';
            outputContainer.style.padding = '10px';
            outputContainer.style.backgroundColor = '#000000';
            outputContainer.style.color = '#fff';
            outputContainer.style.position = 'flex';
            outputContainer.style.marginRight = '2px';
            outputContainer.style.bottom = '0';
            outputContainer.style.width = '100%';
            outputContainer.style.height = '100px';
            outputContainer.style.boxSizing = 'border-box';
            outputContainer.style.overflowY = 'scroll';


            const inputBox = document.createElement('div');
            inputBox.style.width='50%';
            inputBox.style.marginRight='10px'
            inputBox.style.height="130px";
            const outputBox = document.createElement('div');
            outputBox.style.width="50%";
            outputBox.style.height='130px';



            
            // Create and style the input label
            const inputLabel = document.createElement('label');
            inputLabel.innerText = 'Input';
            inputLabel.style.color = '#fff';
            inputLabel.style.height = '5px';

            
            // Create and style the input container
            const inputContainer = document.createElement('textarea');
            inputContainer.style.display = 'flex';
            inputContainer.style.justifyContent = 'space-between';
            inputContainer.style.padding = '10px';
            inputContainer.style.backgroundColor = '#000000';
            inputContainer.style.color = '#fff';
            inputContainer.style.position = 'flex';
            inputContainer.style.marginBottom = '2px';
            inputContainer.style.width = '100%';
            inputContainer.style.height = '100px';
            inputContainer.style.boxSizing = 'border-box';
            inputContainer.style.overflowY = 'scroll';
            
            // Append labels and containers to the result container
            inputBox.appendChild(inputLabel);
            inputBox.appendChild(inputContainer);
            outputBox.appendChild(outputLabel);
            outputBox.appendChild(outputContainer);
                
            resultContainer.appendChild(inputBox);
            resultContainer.appendChild(outputBox);
            const preElement = document.querySelector('pre');
            
            if (!preElement) {
                console.log('No <pre> element found. Please check the selector.');
                return;
            }
            const lines = preElement.querySelectorAll('div');
            let inputText = '';
            // Concatenate the text content of each <div> element, adding a newline character after each line
            lines.forEach(line => {
                inputText += line.textContent + '\n';
            });
            inputContainer.value=inputText.trim();
        
            inputContainer.style.left= '10px';
            inputContainer.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') { 
                    event.preventDefault(); // Prevent the default action (new line) 
                    var start = inputContainer.selectionStart;
                    var end = inputContainer.selectionEnd; // Insert a new line at the cursor position 
                    inputContainer.value = inputContainer.value.substring(0, start) + '\n' + inputContainer.value.substring(end); // Move the cursor to the new line 
                    inputContainer.selectionStart = inputContainer.selectionEnd = start + 1; 
                }
            });
            // Create a submit button
            const submitButton = document.createElement('button');
            submitButton.innerText = 'Submit';
            // Add event listener for the submit button
            // Add event listener for the submit button
            submitButton.addEventListener('click', function () {
                const code = editor.getValue();
                const selectedLanguage = languageSelect.value;
                console.log(selectedLanguage);

                // Define language mapping for Codeforces
                const languageMap = {
                    cpp: '54', // C++ (GCC 9.2.0)
                    java: '87', // Java (OpenJDK 13.0.1)
                    python: '70', // Python (3.8.1)
                    javascript: '34' // JavaScript (Node.js 12.14.0)
                };

                // Fetch the CSRF token from the submission page
                fetch('https://codeforces.com/problemset/submit')
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const csrfToken = doc.querySelector('input[name="csrf_token"]').value;
                    
                    const url = window.location.href;
                    const urlParts = url.split('/');
                    let contestId = urlParts[urlParts.length - 2];

                    if(contestId==="problem"){
                        contestId=urlParts[urlParts.length - 3];
                    }
                    const problemId = urlParts[urlParts.length - 1];

                    // Use the CSRF token in your submission request
                    const payload = new FormData();
                    payload.append('submittedProblemIndex', problemId); // Problem index (e.g., 'B')
                    payload.append('programTypeId', languageMap[selectedLanguage]);
                    payload.append('source', code); // Source code should be a string
                    payload.append('contestId', contestId);
                    payload.append('csrf_token', csrfToken); // Include the CSRF token

                    // Make a POST request to Codeforces submission endpoint
                    fetch('https://codeforces.com/problemset/submit', {
                        method: 'POST',
                        body: payload,
                        credentials: 'include' // Include cookies for authentication
                    })
                    .then(response => response.text())
                    .then(data => {
                        // Handle the response from Codeforces
                        console.log('Submission successful:', data);

                        // Open a new tab showing the submission for the problem
                        const submissionUrl = `https://codeforces.com/contest/${contestId}/my`;
                        window.open(submissionUrl, '_blank');
                    })
                    .catch(error => {
                        console.error('Error submitting the solution:', error);
                    });
                })
                .catch(error => {
                    console.error('Error fetching the CSRF token:', error);
                });
            });


            buttonContainer.appendChild(submitButton);
            

            // Create a run button
            const runButton = document.createElement('button');
            runButton.innerText = 'Run';
            runButton.addEventListener('click', function () {
                const code = editor.getValue();
                const selectedLanguage = languageSelect.value;
                const input = inputContainer.value; // Get the value from the input box
                // Define language mapping for Judge0
                const languageMap = {
                    cpp: 54, // C++ (GCC 9.2.0)
                    java: 62, // Java (OpenJDK 13.0.1)
                    python: 71, // Python (3.8.1)
                    javascript: 63 // JavaScript (Node.js 12.14.0)
                };
                const payload = {
                    source_code: code,
                    language_id: languageMap[selectedLanguage],
                    stdin: input, // Include the input value here
                    redirect_stderr_to_stdout: true // Combine stdout and stderr
                };
                // Make a POST request to Judge0 API
                fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': 'eeecc15162mshc8081c3207c092ep1827ecjsn99125515be0c', // Your RapidAPI key
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    outputContainer.value=`${data.stdout || data.stderr || data.compile_output|| ' '}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while running the code.');
                });
            });
            buttonContainer.appendChild(runButton);
            ideContainer.appendChild(buttonContainer);
            ideContainer.appendChild(resultContainer);

        });
    };
    document.head.appendChild(script);

    // Adjust the problem statement container
    const problemContainer = document.querySelector('.problem-statement');
    if (problemContainer) {
        problemContainer.style.width = '50%';
        problemContainer.style.float = 'left';
        problemContainer.style.boxSizing = 'border-box';
        problemContainer.style.paddingRight = '10px';
        problemContainer.style.border = '1px solid black'; // Add a thin black border
    }
