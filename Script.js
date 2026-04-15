let users = JSON.parse(localStorage.getItem("users")) || [];
let votes = JSON.parse(localStorage.getItem("votes")) || [0,0,0,0];
let selected = -1;

let labels = [
    "AI",
    "Web Development",
    "Cyber Security",
    "Data Science"
];

function showPage(pageId){
    document.querySelectorAll(".page")
    .forEach(page => page.classList.remove("active"));

    document.getElementById(pageId)
    .classList.add("active");
}

function register(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(!username || !password){
        alert("Please fill all fields");
        return;
    }

    users.push({username,password});

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("🎉 Registered successfully");
}

function login(){
    showPage("votePage");
}

function selectVote(index){
    selected = index;

    document.querySelectorAll(".option")
    .forEach(x => x.classList.remove("selected"));

    document.querySelectorAll(".option")[index]
    .classList.add("selected");
}

function submitVote(){
    if(selected === -1){
        alert("Please select an option");
        return;
    }

    votes[selected]++;

    localStorage.setItem(
        "votes",
        JSON.stringify(votes)
    );

    loadDashboard();
    showPage("dashboardPage");
}

function loadDashboard(){
    let total = votes.reduce((a,b)=>a+b,0);
    let maxVote = Math.max(...votes);
    let winnerIndex = votes.indexOf(maxVote);

    document.getElementById("totalUsers").innerText =
        "👥 Total Users: " + users.length;

    document.getElementById("totalVotes").innerText =
        "🗳 Total Votes: " + total;

    document.getElementById("winner").innerText =
        "🏆 Winner: " + labels[winnerIndex];

    let html = "";

    votes.forEach((vote,index)=>{
        let percent = total
            ? ((vote/total)*100).toFixed(1)
            : 0;

        html += `<p>${labels[index]} - ${percent}%</p>`;
    });

    document.getElementById("results").innerHTML = html;
}

function logout(){
    showPage("homePage");
}
