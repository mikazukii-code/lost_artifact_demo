const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backButtonElement = document.getElementById('back-button'); // Back button
const speed = 30; /* The speed/duration of the effect in milliseconds */
let typingTimeout; // Save current timeout
let historyStack;

const textNodes = [
    {
        id: 0,
        text: `You are Alex, a young scholar in the town of Eldoria. Legends tell of a powerful artifact hidden deep within the Whispering Woods, an object said to grant immense wisdom to whoever possesses it. 
        For centuries, treasure hunters and historians have searched for it, but none have returned. 
        One evening, while researching ancient texts, you uncover a cryptic map-your only clue to unlocking the mystery. 
        Now, you must decide: will you embark on this dangerous journey alone, or seek guidance before venturing into the unknown?`,
        options: [
            {
                text: "Continue",
                nextText: 1
            }
        ],
        background: `../images/PremiseOpenScene.png`
    },

    {
        id: 1,
        text: `As you study the fragile map, your heart races. The markings hint at a hidden
            path leading to the artifact's resting place. A name scribbled in the corner catches your
            eye—Professor Eldrin, a historian who once pursued the legend himself. What will you do?` ,
        options: [
            {
                text: "Visit Professor Eldrin to learn more about the artifact and possible dangers.",
                nextText: 2
            },

            {
                text: "Head straight into the Whispering Woods, trusting your instincts and the map.",
                nextText: 3
            }
        ],
        background: `../images/PremiseOpenScene.png`
    },

    {
        id: 2,
        text: `You knock on the professor's door, and he greets you with wary eyes. "The artifact is not just a myth." he admits, "but its resting place is riddled with traps." He offers two things: a survival kit and a warning.`,
        options: [
            {
                text: "Accept the survival kit - It could be useful.",
                nextText: 3
            },
            {
                text: "Ignore his advice - You prefer to figure things out on your own.",
                nextText: 3
            }
        ],
        background: `./images/Path1.webp`
    },

    {
        id: 3,
        text: `As you leave, the professor shakes his head. "Choose wisely," he murmurs.`,
        options: [
            {
                text: "Continue",
                nextText: 6
            }
        ],
        background: `./images/Path1.webp`
    },

    {
        id: 4,
        text: `The forest is dense, the air thick with the scent of damp earth. After an hour of walking, you reach a fork in the path. The map is unclear both routes could lead forward, but which should you trust?`,
        options: [
            {
                text: "Follow the well-trodden trail - it seems safer.",
                nextText: 6
            },
            {
                text: "Take the overgrown shortcut - it might get you there faster.",
                nextText: 5
            }
        ],
        background: `./images/Path2.webp`
    },

   {
        id: 5,
        text: `If you choose the shortcut, the underbrush tangles around your feet. Suddenly, the ground shifts-it's a trap! You must think fast:`,
        options: [
            {
                text: "Leap forward, hoping to escape",
                nextText: 6
            },
            {
                text: "Grab a nearby tree branch, trying to pull yourself out.",
                nextText: 6
            }
        ],
        background: `./images/Path2.webp`
    },

    {
        id: 6,
        text: `Regardless of your path, you soon arrive at a massive stone tablet covered in ancient runes. To proceed, you must decipher the riddle:
                "I have cities but no houses, I have mountains but no trees. I have water but no fish. What am I?"`,
        options: [
            {
                text: "Solve the riddle - If you get it right, the tablet reveals the way forward.",
                nextText: 7
            },
            {
                text: "Guess incorrectly - A hidden mechanism triggers, and a wild animal emerges from the shadows!",
                nextText: 7
            }
        ],
        background: `./images/ProblemSolvingChallenges.webp`
    },

    {
        id: 7,
        text: `At last, you reach the artifact's chamber a dimly lit cavern where the relic rests on a stone pedestal. A message is etched onto the floor: Only those who prove their wisdom may claim this power.
        Do you:`,
        options: [
            {
                text: "Examine the pedestal carefully - There may be hidden traps.",
                nextText: 9
            },
            {
                text: "Grab the artifact immediately - Before anything happens.",
                nextText: 8
            }
        ],
        background: `./images/FinalTrial.webp`
    },

    {
        id: 8,
        text: `If you take it without thinking, the room begins to collapse! You must act fast to escape with the artifact... or be buried forever.`,
        options: [
            {
                text: "Bittersweet Ending",
                nextText: 10
            },
            {
                text: "Failure Ending",
                nextText: 11
            }
        ],
        background: `./images/FinalTrial.webp`
    },

    {
        id: 9,
        text: `You successfully retrieve the artifact and gain its wisdom, returning to Eldoria as a legend.`,
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ],
        background: `./images/Endings.webp`
    },

    {
        id: 10,
        text: `You find the artifact, but its power comes with unforeseen consequences.`,
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ],
        background: `./images/Endings.webp`
    },

    {
        id: 11,
        text: `The artifact is lost to time, and you return empty-handed but wiser.`,
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ],
        background: `./images/Endings.webp`
    }
]

function typeWriter(txt, index = 0) {
    clearTimeout(typingTimeout); // Dừng hiệu ứng typing cũ trước khi chạy mới

    if (index === 0) textElement.innerHTML = ""; // Xóa nội dung cũ nếu bắt đầu lại

    if (index < txt.length) {
        textElement.innerHTML += txt.charAt(index);
        typingTimeout = setTimeout(() => typeWriter(txt, index + 1), speed);
    }
}

function changeBackground(url) {
    document.body.style.backgroundImage = `url('${url}')`; // Use template literal
}

function saveHistory(textNodeIndex) {
    if (textNodeIndex > 0 && !historyStack.includes(textNodeIndex)) {
        historyStack.push(textNodeIndex);
        localStorage.setItem("storyHistory", JSON.stringify(historyStack));
    }
}

function resetUI() {
    i = 0;
    textElement.innerHTML = "";
    optionButtonsElement.innerHTML = "";
}

function createOptionButtons(options) {
    return options.map(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("btn");
        button.disabled = true;
        button.addEventListener("click", () => {
            selectOption(option)
        });
        optionButtonsElement.appendChild(button);
        return button;
    });
}

function showTextNode(textNodeIndex) {
    clearTimeout(typingTimeout); // Dừng typing trước đó
    resetUI();
    
    const textNode = textNodes.find(node => node.id === textNodeIndex);
    const buttons = createOptionButtons(textNode.options);
    
    typeWriter(textNode.text); // Gọi typing mới
    setTimeout(() => buttons.forEach(button => button.disabled = false), textNode.text.length * speed);

    changeBackground(textNode.background);
    updateBackButtonState();
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId < 0) {
        resetGame();
    } else {
        saveHistory(option.nextText); // Save only when selecting a new branch
        showTextNode(nextTextNodeId);
    }
}


function goBack() {
    if (historyStack.length > 0) {
        historyStack.pop(); // Delete current stage
        let previousNode;
        if(historyStack.length == 0 || historyStack == null) {
            previousNode = 0;
        } else {
            previousNode = historyStack[historyStack.length - 1]; // Get the previous step
        }
        localStorage.setItem("storyHistory", JSON.stringify(historyStack));
        showTextNode(previousNode);
    }
}

// Update Back button state
function updateBackButtonState() {
    if (historyStack.length > 0) {
        backButtonElement.style.display = "block";
    } else {
        backButtonElement.style.display = "none";
    }
}

function resetGame() {
    historyStack = [];
    localStorage.setItem("storyHistory", JSON.stringify(historyStack));
    showTextNode(0);
}

function startGame() {
    historyStack = JSON.parse(localStorage.getItem("storyHistory")) || [];
    
    if (historyStack.length > 0) {
        showTextNode(historyStack[historyStack.length - 1]);
    } else {
        showTextNode(0);
    }
    document.getElementById("back-button").addEventListener("click", goBack);
}

startGame();