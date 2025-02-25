// Function to load and display campaigns on the home page
async function loadCampaigns() {
    try {
        const response = await fetch("http://localhost:5000/api/projects");
        const campaigns = await response.json();
        const campaignList = document.getElementById("campaignList");
        campaignList.innerHTML = "";

        if (Array.isArray(campaigns)) {
            campaigns.forEach((campaign) => {
                const div = document.createElement("div");
                div.className = "campaign";
                div.innerHTML = `
          <h3>${campaign.title}</h3>
          <p>${campaign.description}</p>
          <p>Goal: $${parseFloat(campaign.goal).toFixed(2)}</p>
          <p>Raised: $${parseFloat(campaign.raised).toFixed(2)}</p>
          <button onclick="openDonationModal('${campaign._id}')">Donate</button>
        `;
                campaignList.appendChild(div);
            });
        } else {
            campaignList.innerHTML = "<p>No campaigns found.</p>";
        }
    } catch (error) {
        console.error("Error loading campaigns:", error);
        document.getElementById("campaignList").innerHTML = "<p>Error loading campaigns.</p>";
    }
}

// Opens the donation modal and sets the selected project ID
function openDonationModal(projectId) {
    document.getElementById("donationProjectId").value = projectId;
    document.getElementById("donationAmount").value = "";
    document.getElementById("donationError").textContent = "";
    document.getElementById("donationSuccess").textContent = "";
    document.getElementById("donationModal").style.display = "block";
}

// Handle donation form submission
if (document.getElementById("donationForm")) {
    document.getElementById("donationForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            document.getElementById("donationError").textContent = "You must be logged in to donate.";
            return;
        }

        const amount = parseFloat(document.getElementById("donationAmount").value);
        const projectId = document.getElementById("donationProjectId").value;

        if (isNaN(amount) || amount <= 0) {
            document.getElementById("donationError").textContent = "Please enter a valid donation amount.";
            return;
        }

        const data = { amount, projectId };

        try {
            const response = await fetch("/api/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                document.getElementById("donationSuccess").textContent =
                    result.message || "Donation successful!";
                // Optionally refresh the campaign list to update raised amounts
                loadCampaigns();
            } else {
                document.getElementById("donationError").textContent = result.message || result.error;
            }
        } catch (error) {
            document.getElementById("donationError").textContent = error.message;
        }
    });
}

// Admin Dashboard: Load stats, users, projects, and donations
async function loadAdminDashboard() {
    const token = localStorage.getItem("token");
    if (!token) {
        document.getElementById("adminError").textContent = "You must be logged in as admin.";
        return;
    }

    // Load Stats
    try {
        const statsResponse = await fetch("/api/admin/stats", {
            headers: { Authorization: "Bearer " + token }
        });
        const stats = await statsResponse.json();
        if (statsResponse.ok) {
            document.getElementById("stats").innerHTML = `
        <p>Total Users: ${stats.totalUsers}</p>
        <p>Total Projects: ${stats.totalProjects}</p>
        <p>Total Donations: ${stats.totalDonations}</p>
      `;
        } else {
            document.getElementById("adminError").textContent = stats.message || "Error loading stats.";
        }
    } catch (error) {
        document.getElementById("adminError").textContent = error.message;
    }

    // Load Users
    try {
        const usersResponse = await fetch("http://localhost:5000/api/admin/users", {
            headers: { Authorization: "Bearer " + token }
        });
        const users = await usersResponse.json();
        const usersList = document.getElementById("usersList");
        usersList.innerHTML = "";
        if (Array.isArray(users)) {
            users.forEach((user) => {
                const div = document.createElement("div");
                div.className = "user";
                div.innerHTML = `<h3>${user.username}</h3><p>Email: ${user.email}</p><p>Role: ${user.role}</p>`;
                usersList.appendChild(div);
            });
        } else {
            usersList.innerHTML = "<p>No users found.</p>";
        }
    } catch (error) {
        document.getElementById("adminError").textContent = error.message;
    }

    // Load Projects
    try {
        const projectsResponse = await fetch("http://localhost:5000/api/admin/projects", {
            headers: { Authorization: "Bearer " + token }
        });
        const projects = await projectsResponse.json();
        const projectsList = document.getElementById("projectsList");
        projectsList.innerHTML = "";
        if (Array.isArray(projects)) {
            projects.forEach((project) => {
                const div = document.createElement("div");
                div.className = "project";
                div.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p><p>Goal: $${parseFloat(project.goal).toFixed(2)}</p><p>Raised: $${parseFloat(project.raised).toFixed(2)}</p>`;
                projectsList.appendChild(div);
            });
        } else {
            projectsList.innerHTML = "<p>No projects found.</p>";
        }
    } catch (error) {
        document.getElementById("adminError").textContent = error.message;
    }

    // Load Donations
    try {
        const donationsResponse = await fetch("http://localhost:5000/api/admin/donations", {
            headers: { Authorization: "Bearer " + token }
        });
        const donations = await donationsResponse.json();
        const donationsList = document.getElementById("donationsList");
        donationsList.innerHTML = "";
        if (Array.isArray(donations)) {
            donations.forEach((donation) => {
                const div = document.createElement("div");
                div.className = "donation";
                div.innerHTML = `<h3>Donation</h3><p>Amount: $${parseFloat(donation.amount).toFixed(2)}</p><p>Donor: ${donation.donor.username}</p><p>Campaign: ${donation.project.title}</p>`;
                donationsList.appendChild(div);
            });
        } else {
            donationsList.innerHTML = "<p>No donations found.</p>";
        }
    } catch (error) {
        document.getElementById("adminError").textContent = error.message;
    }
}
