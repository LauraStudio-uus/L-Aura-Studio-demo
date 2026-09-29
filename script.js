"use strict";

/* =========================================================
   L'AURA STUDIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. HEADER / MENU
========================================================= */

const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");

    menuToggle.textContent =
      nav.classList.contains("open")
        ? "×"
        : "☰";
  });
}

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    if (nav) nav.classList.remove("open");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  }
});


/* =========================================================
   02. REVEAL ANIMATION
========================================================= */

const revealItems =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          }

        });

      },
      {
        threshold: 0.12
      }
    );

  revealItems.forEach(item => {
    observer.observe(item);
  });

} else {

  revealItems.forEach(item => {
    item.classList.add("visible");
  });

}


/* =========================================================
   03. PORTFOLIO LIGHTBOX
========================================================= */

const imageModal =
  document.getElementById("imageModal");

const modalImage =
  document.getElementById("modalImage");

const modalClose =
  document.getElementById("modalClose");


function openImageModal(image) {

  if (!imageModal || !modalImage) {
    return;
  }

  modalImage.src = image;

  imageModal.classList.add("open");

  document.body.classList.add(
    "lightbox-open"
  );
}


function closeImageModal() {

  if (!imageModal) {
    return;
  }

  imageModal.classList.remove("open");

  document.body.classList.remove(
    "lightbox-open"
  );

  if (modalImage) {
    setTimeout(() => {
      modalImage.src = "";
    }, 200);
  }
}


document
  .querySelectorAll(".gallery-card")
  .forEach(card => {

    card.addEventListener("click", () => {

      const image =
        card.dataset.image;

      if (image) {
        openImageModal(image);
      }

    });

  });


if (modalClose) {
  modalClose.addEventListener(
    "click",
    closeImageModal
  );
}


if (imageModal) {

  imageModal.addEventListener(
    "click",
    event => {

      if (
        event.target === imageModal
      ) {
        closeImageModal();
      }

    }
  );

}


/* =========================================================
   04. BOOKING
========================================================= */

const bookingForm =
  document.getElementById(
    "bookingForm"
  );

const formNote =
  document.getElementById(
    "formNote"
  );


function getContacts() {

  try {

    const data =
      localStorage.getItem(
        "ddStudioContacts"
      );

    if (!data) {
      return [];
    }

    const contacts =
      JSON.parse(data);

    return Array.isArray(contacts)
      ? contacts
      : [];

  } catch (error) {

    console.error(
      "Không thể đọc contacts:",
      error
    );

    return [];
  }
}


function saveContacts(contacts) {

  localStorage.setItem(
    "ddStudioContacts",
    JSON.stringify(contacts)
  );
}


if (bookingForm) {

  bookingForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const data =
        new FormData(bookingForm);

      const contact = {

        id:
          "contact-" +
          Date.now(),

        name:
          String(
            data.get("name") || ""
          ).trim(),

        phone:
          String(
            data.get("phone") || ""
          ).trim(),

        service:
          String(
            data.get("service") || ""
          ).trim(),

        date:
          String(
            data.get("date") || ""
          ).trim(),

        message:
          String(
            data.get("message") || ""
          ).trim(),

        createdAt:
          new Date().toLocaleString(
            "vi-VN"
          ),

        status: "new"
      };


      const contacts =
        getContacts();

      contacts.unshift(contact);

      saveContacts(contacts);


      if (formNote) {

        formNote.textContent =
          `Cảm ơn ${contact.name}! Yêu cầu đã được gửi vào hộp thư Admin. Studio sẽ liên hệ lại sớm.`;

      }


      bookingForm.reset();

    }
  );

}


/* =========================================================
   05. SMOOTH SCROLL
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      function (event) {

        const href =
          this.getAttribute("href");

        if (
          !href ||
          href === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================================
   06. BLOG CMS
========================================================= */

const DEFAULT_POSTS = [

  {
    id: "post-1",

    title:
      "5 nguyên tắc tạo ánh sáng chân dung có chiều sâu",

    category:
      "Photography",

    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85",

    excerpt:
      "Từ hướng sáng, kích thước nguồn sáng đến khoảng cách giữa đèn và chủ thể.",

    content:
      `Ánh sáng là một trong những yếu tố quan trọng nhất quyết định cảm xúc của một bức chân dung.

1. Xác định hướng sáng trước khi chọn modifier.

2. Quan sát vùng highlight và shadow trên khuôn mặt.

3. Điều chỉnh kích thước nguồn sáng để kiểm soát độ chuyển.

4. Kiểm soát khoảng cách đèn với chủ thể.

5. Luôn thử nghiệm bằng chính hình ảnh trên màn hình máy ảnh.

Một setup tốt không nhất thiết phải nhiều đèn. Quan trọng là bạn biết mỗi nguồn sáng đang làm nhiệm vụ gì.`,

    date: "29/09/2026"
  },

  {
    id: "post-2",

    title:
      "Một ngày phía sau camera tại D+Đ Studio",

    category:
      "Behind the scenes",

    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85",

    excerpt:
      "Từ lúc chuẩn bị concept, set đèn đến những khung hình cuối cùng.",

    content:
      `Một buổi chụp tốt bắt đầu từ trước khi mẫu bước vào studio.

Ekip kiểm tra moodboard, camera, lens, trigger, đèn và modifier.

Sau đó chúng tôi dựng ánh sáng thử, kiểm tra exposure và thống nhất direction.

Trong lúc chụp, photographer tập trung vào ánh sáng và khoảnh khắc; support theo dõi thiết bị, thay đổi modifier và giữ workflow ổn định.`,

    date: "25/09/2026"
  },

  {
    id: "post-3",

    title:
      "Studio nhỏ cần gì để bắt đầu?",

    category:
      "Studio",

    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",

    excerpt:
      "Không gian, ánh sáng, phông nền và cách ưu tiên ngân sách khi bắt đầu.",

    content:
      `Bạn không cần một studio quá lớn để bắt đầu.

Hãy ưu tiên một không gian có trần đủ cao, điện ổn định, khu vực thay đồ và khoảng cách hợp lý giữa background, chủ thể và đèn.

Sau đó đầu tư theo thứ tự:

Nguồn sáng ổn định → modifier → background → camera/lens → thiết bị phụ trợ.`,

    date: "20/09/2026"
  }

];


function getPosts() {

  try {

    const saved =
      localStorage.getItem(
        "ddStudioPosts"
      );

    if (!saved) {

      localStorage.setItem(
        "ddStudioPosts",
        JSON.stringify(
          DEFAULT_POSTS
        )
      );

      return DEFAULT_POSTS;
    }

    const posts =
      JSON.parse(saved);

    return Array.isArray(posts)
      ? posts
      : DEFAULT_POSTS;

  } catch (error) {

    return DEFAULT_POSTS;
  }
}


function savePosts(posts) {

  localStorage.setItem(
    "ddStudioPosts",
    JSON.stringify(posts)
  );
}


/* =========================================================
   07. ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(
    value ?? ""
  ).replace(
    /[&<>"']/g,
    character => {

      const map = {

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      };

      return map[character];
    }
  );
}


/* =========================================================
   08. RENDER BLOG
========================================================= */

function renderBlog(
  category = "all"
) {

  const grid =
    document.getElementById(
      "blogGrid"
    );

  const empty =
    document.getElementById(
      "blogEmpty"
    );

  if (!grid) {
    return;
  }

  const posts =
    getPosts().filter(post => {

      return (
        category === "all" ||
        post.category === category
      );

    });


  grid.innerHTML = "";


  if (empty) {

    empty.hidden =
      posts.length > 0;

  }


  posts.forEach(post => {

    const card =
      document.createElement(
        "article"
      );

    card.className =
      "blog-card";


    card.innerHTML = `

      <div class="blog-card-image">

        <img
          src="${escapeHTML(post.image)}"
          alt="${escapeHTML(post.title)}"
          loading="lazy"
        >

      </div>

      <div class="blog-card-body">

        <div class="blog-card-meta">

          <span>
            ${escapeHTML(post.category)}
          </span>

          <span>
            ${escapeHTML(post.date)}
          </span>

        </div>

        <h3>
          ${escapeHTML(post.title)}
        </h3>

        <p>
          ${escapeHTML(post.excerpt)}
        </p>

        <span class="blog-card-more">
          Đọc bài viết ↗
        </span>

      </div>

    `;


    card.addEventListener(
      "click",
      () => openArticle(post)
    );


    grid.appendChild(card);

  });

}


/* =========================================================
   09. ARTICLE + COMMENTS
========================================================= */

const articleModal =
  document.getElementById(
    "articleModal"
  );

const articleClose =
  document.getElementById(
    "articleClose"
  );

let currentArticleId = null;


function openArticle(post) {

  if (!post) {
    return;
  }


  currentArticleId =
    post.id;


  const articleImage =
    document.getElementById(
      "articleImage"
    );

  const articleCategory =
    document.getElementById(
      "articleCategory"
    );

  const articleTitle =
    document.getElementById(
      "articleTitle"
    );

  const articleDate =
    document.getElementById(
      "articleDate"
    );

  const articleContent =
    document.getElementById(
      "articleContent"
    );


  if (articleImage) {

    articleImage.src =
      post.image || "";

    articleImage.alt =
      post.title || "";

  }


  if (articleCategory) {

    articleCategory.textContent =
      post.category || "";

  }


  if (articleTitle) {

    articleTitle.textContent =
      post.title || "";

  }


  if (articleDate) {

    articleDate.textContent =
      post.date || "";

  }


  if (articleContent) {

    articleContent.textContent =
      post.content || "";

  }


  renderComments(
    currentArticleId
  );

  updateCommentUI();


  if (articleModal) {

    articleModal.classList.add(
      "open"
    );

    document.body.classList.add(
      "lightbox-open"
    );

  }

}


if (articleClose) {

  articleClose.addEventListener(
    "click",
    closeArticle
  );

}


function closeArticle() {

  if (!articleModal) {
    return;
  }

  articleModal.classList.remove(
    "open"
  );

  document.body.classList.remove(
    "lightbox-open"
  );

  currentArticleId = null;
}


if (articleModal) {

  articleModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        articleModal
      ) {
        closeArticle();
      }

    }
  );

}


/* =========================================================
   10. BLOG FILTER
========================================================= */

document
  .querySelectorAll(".filter-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".filter-btn"
          )
          .forEach(btn => {

            btn.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );


        renderBlog(
          button.dataset.category ||
          "all"
        );

      }
    );

  });


/* =========================================================
   11. ACCOUNT SYSTEM
========================================================= */

const USERS_KEY =
  "ddStudioUsers";

const CURRENT_USER_KEY =
  "ddCurrentUser";


function getUsers() {

  try {

    const saved =
      localStorage.getItem(
        USERS_KEY
      );

    if (!saved) {
      return [];
    }

    const users =
      JSON.parse(saved);

    return Array.isArray(users)
      ? users
      : [];

  } catch (error) {

    console.error(
      "Không thể đọc tài khoản:",
      error
    );

    return [];
  }
}


function saveUsers(users) {

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}


function getCurrentUser() {

  try {

    const saved =
      sessionStorage.getItem(
        CURRENT_USER_KEY
      );

    if (!saved) {
      return null;
    }

    return JSON.parse(saved);

  } catch (error) {

    return null;
  }
}


function setCurrentUser(user) {

  sessionStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({

      id: user.id,

      name: user.name,

      email: user.email,

      createdAt:
        user.createdAt

    })
  );
}


function logoutUserAccount() {

  sessionStorage.removeItem(
    CURRENT_USER_KEY
  );

}


/* =========================================================
   12. ACCOUNT ELEMENTS
========================================================= */

const accountOpen =
  document.getElementById(
    "accountOpen"
  );

const accountModal =
  document.getElementById(
    "accountModal"
  );

const accountClose =
  document.getElementById(
    "accountClose"
  );


const loginView =
  document.getElementById(
    "loginView"
  );

const registerView =
  document.getElementById(
    "registerView"
  );

const profileView =
  document.getElementById(
    "profileView"
  );


const loginForm =
  document.getElementById(
    "loginForm"
  );

const registerForm =
  document.getElementById(
    "registerForm"
  );


const loginEmail =
  document.getElementById(
    "loginEmail"
  );

const loginPassword =
  document.getElementById(
    "loginPassword"
  );

const loginError =
  document.getElementById(
    "loginError"
  );


const registerName =
  document.getElementById(
    "registerName"
  );

const registerEmail =
  document.getElementById(
    "registerEmail"
  );

const registerPassword =
  document.getElementById(
    "registerPassword"
  );

const registerError =
  document.getElementById(
    "registerError"
  );


const showRegister =
  document.getElementById(
    "showRegister"
  );

const showLogin =
  document.getElementById(
    "showLogin"
  );


const profileName =
  document.getElementById(
    "profileName"
  );

const profileEmail =
  document.getElementById(
    "profileEmail"
  );

const profileDate =
  document.getElementById(
    "profileDate"
  );

const logoutButton =
  document.getElementById(
    "logoutUser"
  );


/* =========================================================
   13. ACCOUNT VIEWS
========================================================= */

function hideAccountViews() {

  if (loginView) {
    loginView.hidden = true;
  }

  if (registerView) {
    registerView.hidden = true;
  }

  if (profileView) {
    profileView.hidden = true;
  }

}


function showAccountLogin() {

  hideAccountViews();

  if (loginView) {
    loginView.hidden = false;
  }

  if (loginError) {
    loginError.textContent = "";
  }

}


function showAccountRegister() {

  hideAccountViews();

  if (registerView) {
    registerView.hidden = false;
  }

  if (registerError) {
    registerError.textContent = "";
  }

}


function showAccountProfile() {

  const user =
    getCurrentUser();


  if (!user) {

    showAccountLogin();

    return;
  }


  hideAccountViews();


  if (profileView) {
    profileView.hidden = false;
  }


  if (profileName) {

    profileName.textContent =
      user.name;

  }


  if (profileEmail) {

    profileEmail.textContent =
      user.email;

  }


  if (profileDate) {

    profileDate.textContent =
      user.createdAt
        ? new Date(
            user.createdAt
          ).toLocaleDateString(
            "vi-VN"
          )
        : "";

  }

}


/* =========================================================
   14. ACCOUNT MODAL
========================================================= */

function openAccountModal() {

  if (!accountModal) {

    console.error(
      "Không tìm thấy #accountModal"
    );

    return;
  }


  accountModal.classList.add(
    "open"
  );


  document.body.classList.add(
    "lightbox-open"
  );


  const user =
    getCurrentUser();


  if (user) {

    showAccountProfile();

  } else {

    showAccountLogin();

  }

}


function closeAccountModal() {

  if (!accountModal) {
    return;
  }


  accountModal.classList.remove(
    "open"
  );


  document.body.classList.remove(
    "lightbox-open"
  );

}


if (accountOpen) {

  accountOpen.addEventListener(
    "click",
    event => {

      event.preventDefault();

      openAccountModal();

    }
  );

}


if (accountClose) {

  accountClose.addEventListener(
    "click",
    closeAccountModal
  );

}


if (accountModal) {

  accountModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        accountModal
      ) {

        closeAccountModal();

      }

    }
  );

}


/* =========================================================
   15. SWITCH LOGIN / REGISTER
========================================================= */

if (showRegister) {

  showRegister.addEventListener(
    "click",
    event => {

      event.preventDefault();

      showAccountRegister();

    }
  );

}


if (showLogin) {

  showLogin.addEventListener(
    "click",
    event => {

      event.preventDefault();

      showAccountLogin();

    }
  );

}


/* =========================================================
   16. REGISTER ACCOUNT
========================================================= */

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        registerName
          ? registerName.value.trim()
          : "";


      const email =
        registerEmail
          ? registerEmail.value
              .trim()
              .toLowerCase()
          : "";


      const password =
        registerPassword
          ? registerPassword.value
          : "";


      if (registerError) {
        registerError.textContent = "";
      }


      if (name.length < 2) {

        if (registerError) {

          registerError.textContent =
            "Vui lòng nhập họ và tên.";

        }

        return;
      }


      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!emailRegex.test(email)) {

        if (registerError) {

          registerError.textContent =
            "Email không hợp lệ.";

        }

        return;
      }


      if (password.length < 6) {

        if (registerError) {

          registerError.textContent =
            "Mật khẩu phải có ít nhất 6 ký tự.";

        }

        return;
      }


      const users =
        getUsers();


      const exists =
        users.some(user => {

          return (
            user.email &&
            user.email
              .toLowerCase() ===
            email
          );

        });


      if (exists) {

        if (registerError) {

          registerError.textContent =
            "Email này đã được đăng ký.";

        }

        return;
      }


      const newUser = {

        id:
          "user-" +
          Date.now() +
          "-" +
          Math.random()
            .toString(36)
            .substring(2, 8),

        name,

        email,

        password,

        createdAt:
          new Date().toISOString()

      };


      users.push(
        newUser
      );

      saveUsers(
        users
      );


      setCurrentUser(
        newUser
      );


      registerForm.reset();


      showAccountProfile();


      updateCommentUI();

    }
  );

}


/* =========================================================
   17. LOGIN ACCOUNT
========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const email =
        loginEmail
          ? loginEmail.value
              .trim()
              .toLowerCase()
          : "";


      const password =
        loginPassword
          ? loginPassword.value
          : "";


      if (loginError) {
        loginError.textContent = "";
      }


      const users =
        getUsers();


      const user =
        users.find(item => {

          return (
            item.email &&
            item.email
              .toLowerCase() ===
            email &&
            item.password ===
            password
          );

        });


      if (!user) {

        if (loginError) {

          loginError.textContent =
            "Email hoặc mật khẩu không chính xác.";

        }

        return;
      }


      setCurrentUser(
        user
      );


      loginForm.reset();


      showAccountProfile();


      updateCommentUI();

    }
  );

}


/* =========================================================
   18. LOGOUT
========================================================= */

if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    () => {

      logoutUserAccount();

      showAccountLogin();

      updateCommentUI();

      closeAccountModal();

    }
  );

}


/* =========================================================
   19. COMMENTS
========================================================= */

const COMMENTS_KEY =
  "ddStudioComments";


function getComments() {

  try {

    const saved =
      localStorage.getItem(
        COMMENTS_KEY
      );

    if (!saved) {
      return [];
    }

    const comments =
      JSON.parse(saved);

    return Array.isArray(comments)
      ? comments
      : [];

  } catch (error) {

    console.error(
      "Không thể đọc bình luận:",
      error
    );

    return [];
  }

}


function saveComments(
  comments
) {

  localStorage.setItem(
    COMMENTS_KEY,
    JSON.stringify(comments)
  );

}


const commentLoginMessage =
  document.getElementById(
    "commentLoginMessage"
  );

const commentForm =
  document.getElementById(
    "commentForm"
  );

const commentText =
  document.getElementById(
    "commentText"
  );

const commentUserName =
  document.getElementById(
    "commentUserName"
  );

const commentList =
  document.getElementById(
    "commentList"
  );


/* =========================================================
   20. COMMENT UI
========================================================= */

function updateCommentUI() {

  const user =
    getCurrentUser();


  if (commentLoginMessage) {

    commentLoginMessage.hidden =
      !!user;

  }


  if (commentForm) {

    commentForm.hidden =
      !user;

  }


  if (commentUserName) {

    commentUserName.textContent =
      user
        ? `Đang bình luận với tư cách: ${user.name}`
        : "";

  }


  if (currentArticleId) {

    renderComments(
      currentArticleId
    );

  }

}


/* =========================================================
   21. RENDER COMMENTS
========================================================= */

function renderComments(
  postId
) {

  if (!commentList) {
    return;
  }


  const comments =
    getComments()
      .filter(comment => {

        return (
          comment.postId ===
          postId
        );

      })
      .sort((a, b) => {

        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );

      });


  commentList.innerHTML = "";


  if (
    comments.length ===
    0
  ) {

    const empty =
      document.createElement(
        "div"
      );

    empty.className =
      "comment-empty";

    empty.textContent =
      "Chưa có bình luận nào. Hãy là người đầu tiên bình luận.";

    commentList.appendChild(
      empty
    );

    return;
  }


  const currentUser =
    getCurrentUser();


  comments.forEach(
    comment => {

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "comment-item";


      const head =
        document.createElement(
          "div"
        );

      head.className =
        "comment-head";


      const author =
        document.createElement(
          "strong"
        );

      author.className =
        "comment-author";

      author.textContent =
        comment.name;


      const date =
        document.createElement(
          "span"
        );

      date.className =
        "comment-date";

      date.textContent =
        new Date(
          comment.createdAt
        ).toLocaleString(
          "vi-VN"
        );


      head.appendChild(
        author
      );

      head.appendChild(
        date
      );


      const body =
        document.createElement(
          "div"
        );

      body.className =
        "comment-body";

      body.textContent =
        comment.text;


      item.appendChild(
        head
      );

      item.appendChild(
        body
      );


      /* Xóa bình luận của chính mình */

      if (
        currentUser &&
        comment.userId ===
          currentUser.id
      ) {

        const deleteButton =
          document.createElement(
            "button"
          );

        deleteButton.type =
          "button";

        deleteButton.className =
          "comment-delete";

        deleteButton.textContent =
          "Xóa bình luận";


        deleteButton.addEventListener(
          "click",
          () => {

            deleteComment(
              comment.id
            );

          }
        );


        item.appendChild(
          deleteButton
        );

      }


      commentList.appendChild(
        item
      );

    }
  );

}


/* =========================================================
   22. SUBMIT COMMENT
========================================================= */

if (commentForm) {

  commentForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const user =
        getCurrentUser();


      if (!user) {

        openAccountModal();

        return;
      }


      if (!currentArticleId) {

        alert(
          "Không xác định được bài viết."
        );

        return;
      }


      const text =
        commentText
          ? commentText.value.trim()
          : "";


      if (!text) {

        alert(
          "Vui lòng nhập bình luận."
        );

        return;
      }


      if (text.length > 1000) {

        alert(
          "Bình luận tối đa 1000 ký tự."
        );

        return;
      }


      const comments =
        getComments();


      const comment = {

        id:
          "comment-" +
          Date.now() +
          "-" +
          Math.random()
            .toString(36)
            .substring(2, 8),

        postId:
          currentArticleId,

        userId:
          user.id,

        name:
          user.name,

        email:
          user.email,

        text,

        createdAt:
          new Date().toISOString()

      };


      comments.push(
        comment
      );


      saveComments(
        comments
      );


      if (commentText) {
        commentText.value = "";
      }


      renderComments(
        currentArticleId
      );

    }
  );

}


/* =========================================================
   23. DELETE COMMENT
========================================================= */

function deleteComment(
  commentId
) {

  const user =
    getCurrentUser();


  if (!user) {
    return;
  }


  const comments =
    getComments();


  const comment =
    comments.find(
      item =>
        item.id ===
        commentId
    );


  if (!comment) {
    return;
  }


  if (
    comment.userId !==
    user.id
  ) {

    return;
  }


  const confirmed =
    confirm(
      "Bạn có chắc muốn xóa bình luận này?"
    );


  if (!confirmed) {
    return;
  }


  const newComments =
    comments.filter(
      item =>
        item.id !==
        commentId
    );


  saveComments(
    newComments
  );


  renderComments(
    currentArticleId
  );

}


/* =========================================================
   24. CLICK "ĐĂNG NHẬP ĐỂ BÌNH LUẬN"
========================================================= */

if (commentLoginMessage) {

  commentLoginMessage.addEventListener(
    "click",
    () => {

      openAccountModal();

    }
  );

}


/* =========================================================
   25. ADMIN CMS
========================================================= */

const adminModal =
  document.getElementById(
    "adminModal"
  );

const adminOpen =
  document.getElementById(
    "adminOpen"
  );

const adminClose =
  document.getElementById(
    "adminClose"
  );

const adminLogin =
  document.getElementById(
    "adminLogin"
  );

const adminDashboard =
  document.getElementById(
    "adminDashboard"
    
  );
renderAdminComments();
renderAdminUsers();
renderAdminComments();
renderAdminUsers();

function openAdmin() {

  if (!adminModal) {
    return;
  }


  adminModal.classList.add(
    "open"
  );


  document.body.classList.add(
    "lightbox-open"
  );


  if (
    sessionStorage.getItem(
      "ddAdmin"
    ) === "1"
  ) {

    showDashboard();

  } else {

    showAdminLogin();

  }

}


if (adminOpen) {

  adminOpen.addEventListener(
    "click",
    openAdmin
  );

}


if (adminClose) {

  adminClose.addEventListener(
    "click",
    closeAdmin
  );

}


function closeAdmin() {

  if (!adminModal) {
    return;
  }

  adminModal.classList.remove(
    "open"
  );

  document.body.classList.remove(
    "lightbox-open"
  );

}


if (adminModal) {

  adminModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        adminModal
      ) {

        closeAdmin();

      }

    }
  );

}


/* =========================================================
   26. ADMIN LOGIN
========================================================= */

const adminLoginForm =
  document.getElementById(
    "adminLoginForm"
  );


if (adminLoginForm) {

  adminLoginForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const email =
        document
          .getElementById(
            "adminEmail"
          )
          ?.value
          .trim();


      const password =
        document
          .getElementById(
            "adminPassword"
          )
          ?.value;


      const error =
        document.getElementById(
          "adminError"
        );


      if (
        email ===
          "admin@studio.com" &&
        password ===
          "123456"
      ) {

        sessionStorage.setItem(
          "ddAdmin",
          "1"
        );


        if (error) {
          error.textContent = "";
        }


        showDashboard();

      } else {

        if (error) {

          error.textContent =
            "Email hoặc mật khẩu không đúng.";

        }

      }

    }
  );

}


/* =========================================================
   27. ADMIN DASHBOARD
========================================================= */

function showDashboard() {

  if (adminLogin) {
    adminLogin.hidden = true;
  }

  if (adminDashboard) {
    adminDashboard.hidden = false;
  }

  renderAdminPosts();

  renderAdminContacts();

}


function showAdminLogin() {

  if (adminLogin) {
    adminLogin.hidden = false;
  }

  if (adminDashboard) {
    adminDashboard.hidden = true;
  }

}


const adminLogout =
  document.getElementById(
    "adminLogout"
  );


if (adminLogout) {

  adminLogout.addEventListener(
    "click",
    () => {

      sessionStorage.removeItem(
        "ddAdmin"
      );

      showAdminLogin();

    }
  );

}


/* =========================================================
   28. ADMIN TABS
========================================================= */

document
  .querySelectorAll(".admin-tab")
  .forEach(tab => {

    tab.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".admin-tab"
          )
          .forEach(item => {

            item.classList.remove(
              "active"
            );

          });


        document
          .querySelectorAll(
            ".admin-tab-content"
          )
          .forEach(item => {

            item.classList.remove(
              "active"
            );

          });


        tab.classList.add(
          "active"
        );


        const target =
          {

            posts:
              "adminPostsTab",

            new:
              "adminNewTab",

            contacts:
              "adminContactsTab"

          }[
            tab.dataset.adminTab
          ];


        const targetElement =
          document.getElementById(
            target
          );


        if (targetElement) {

          targetElement.classList.add(
            "active"
          );

        }


        if (
          tab.dataset.adminTab ===
          "contacts"
        ) {

          renderAdminContacts();

        }

      }
    );

  });


/* =========================================================
   29. ADMIN CONTACTS
========================================================= */

function renderAdminContacts() {

  const contacts =
    getContacts();


  const list =
    document.getElementById(
      "adminContactList"
    );

  const count =
    document.getElementById(
      "contactCount"
    );

  const newCount =
    document.getElementById(
      "newContactCount"
    );


  if (
    !list ||
    !count ||
    !newCount
  ) {
    return;
  }


  count.textContent =
    contacts.length;


  newCount.textContent =
    contacts.filter(
      contact =>
        contact.status ===
        "new"
    ).length;


  list.innerHTML = "";


  if (
    contacts.length ===
    0
  ) {

    list.innerHTML =
      `<p style="color:#777;padding:30px 0;">
        Chưa có yêu cầu liên hệ nào.
      </p>`;

    return;
  }


  contacts.forEach(
    contact => {

      const row =
        document.createElement(
          "div"
        );

      row.className =
        "admin-contact-row";


      row.innerHTML = `

        <div class="admin-contact-head">

          <div>

            <h4>
              ${escapeHTML(
                contact.name
              )}
            </h4>

            <small>
              ${escapeHTML(
                contact.createdAt
              )}
              ·
              ${
                contact.status ===
                "new"
                  ? "Chưa xử lý"
                  : "Đã xem"
              }
            </small>

          </div>

        </div>


        <div class="admin-contact-info">

          <div>
            <strong>SĐT:</strong>
            ${escapeHTML(
              contact.phone
            )}
          </div>

          <div>
            <strong>Dịch vụ:</strong>
            ${escapeHTML(
              contact.service
            )}
          </div>

          <div>
            <strong>Ngày:</strong>
            ${escapeHTML(
              contact.date ||
              "Chưa chọn"
            )}
          </div>

        </div>


        <div class="admin-contact-message">

          <strong>Nội dung:</strong><br>

          ${escapeHTML(
            contact.message ||
            "Không có nội dung thêm."
          )}

        </div>


        <div class="admin-contact-actions">

          <button
            class="contact-new"
            data-read="${contact.id}"
          >
            ${
              contact.status ===
              "new"
                ? "Đánh dấu đã xem"
                : "Đã xem"
            }
          </button>

          <button
            data-delete-contact="${contact.id}"
          >
            Xóa
          </button>

        </div>

      `;


      const readButton =
        row.querySelector(
          "[data-read]"
        );


      if (readButton) {

        readButton.addEventListener(
          "click",
          () => {

            const updated =
              getContacts()
                .map(item => {

                  if (
                    item.id ===
                    contact.id
                  ) {

                    return {
                      ...item,
                      status: "read"
                    };

                  }

                  return item;

                });


            saveContacts(
              updated
            );


            renderAdminContacts();

          }
        );

      }


      const deleteButton =
        row.querySelector(
          "[data-delete-contact]"
        );


      if (deleteButton) {

        deleteButton.addEventListener(
          "click",
          () => {

            if (
              !confirm(
                "Bạn có chắc muốn xóa yêu cầu này?"
              )
            ) {
              return;
            }


            saveContacts(
              getContacts()
                .filter(
                  item =>
                    item.id !==
                    contact.id
                )
            );


            renderAdminContacts();

          }
        );

      }


      list.appendChild(
        row
      );

    }
  );

}


/* =========================================================
   30. ADMIN POSTS
========================================================= */

function renderAdminPosts() {

  const posts =
    getPosts();


  const postCount =
    document.getElementById(
      "postCount"
    );

  const publishedCount =
    document.getElementById(
      "publishedCount"
    );

  const list =
    document.getElementById(
      "adminPostList"
    );


  if (!list) {
    return;
  }


  if (postCount) {
    postCount.textContent =
      posts.length;
  }


  if (publishedCount) {
    publishedCount.textContent =
      posts.length;
  }


  list.innerHTML = "";


  posts.forEach(post => {

    const row =
      document.createElement(
        "div"
      );

    row.className =
      "admin-post-row";


    row.innerHTML = `

      <img
        src="${escapeHTML(post.image)}"
        alt=""
      >

      <div>

        <h4>
          ${escapeHTML(post.title)}
        </h4>

        <p>
          ${escapeHTML(post.category)}
          ·
          ${escapeHTML(post.date)}
        </p>

      </div>

      <div class="admin-row-actions">

        <button
          data-edit="${post.id}"
        >
          Sửa
        </button>

        <button
          data-delete="${post.id}"
        >
          Xóa
        </button>

      </div>

    `;


    const editButton =
      row.querySelector(
        "[data-edit]"
      );


    if (editButton) {

      editButton.addEventListener(
        "click",
        () => {

          editPost(
            post.id
          );

        }
      );

    }


    const deleteButton =
      row.querySelector(
        "[data-delete]"
      );


    if (deleteButton) {

      deleteButton.addEventListener(
        "click",
        () => {

          deletePost(
            post.id
          );

        }
      );

    }


    list.appendChild(
      row
    );

  });

}


/* =========================================================
   31. ADMIN POST FORM
========================================================= */

function resetPostForm() {

  const form =
    document.getElementById(
      "postForm"
    );

  const editId =
    document.getElementById(
      "editPostId"
    );

  const submit =
    document.getElementById(
      "postSubmit"
    );


  if (form) {
    form.reset();
  }


  if (editId) {
    editId.value = "";
  }


  if (submit) {

    submit.innerHTML =
      'Đăng bài <span>↗</span>';

  }

}


function editPost(id) {

  const post =
    getPosts().find(
      item =>
        item.id === id
    );


  if (!post) {
    return;
  }


  const editId =
    document.getElementById(
      "editPostId"
    );

  const title =
    document.getElementById(
      "postTitle"
    );

  const category =
    document.getElementById(
      "postCategory"
    );

  const image =
    document.getElementById(
      "postImage"
    );

  const excerpt =
    document.getElementById(
      "postExcerpt"
    );

  const content =
    document.getElementById(
      "postContent"
    );

  const submit =
    document.getElementById(
      "postSubmit"
    );


  if (editId) {
    editId.value = post.id;
  }

  if (title) {
    title.value = post.title;
  }

  if (category) {
    category.value = post.category;
  }

  if (image) {
    image.value = post.image;
  }

  if (excerpt) {
    excerpt.value = post.excerpt;
  }

  if (content) {
    content.value = post.content;
  }

  if (submit) {

    submit.innerHTML =
      'Cập nhật bài <span>↗</span>';

  }


  const newTab =
    document.querySelector(
      '[data-admin-tab="new"]'
    );


  if (newTab) {
    newTab.click();
  }

}


function deletePost(id) {

  if (
    !confirm(
      "Bạn có chắc muốn xóa bài viết này?"
    )
  ) {
    return;
  }


  savePosts(
    getPosts().filter(
      post =>
        post.id !== id
    )
  );


  renderAdminPosts();


  const activeFilter =
    document.querySelector(
      ".filter-btn.active"
    );


  renderBlog(
    activeFilter
      ?.dataset.category ||
    "all"
  );

}


const postCancel =
  document.getElementById(
    "postCancel"
  );


if (postCancel) {

  postCancel.addEventListener(
    "click",
    () => {

      resetPostForm();


      const postsTab =
        document.querySelector(
          '[data-admin-tab="posts"]'
        );


      if (postsTab) {
        postsTab.click();
      }

    }
  );

}


const postForm =
  document.getElementById(
    "postForm"
  );


if (postForm) {

  postForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const posts =
        getPosts();


      const editId =
        document.getElementById(
          "editPostId"
        )?.value;


      const payload = {

        title:
          document.getElementById(
            "postTitle"
          )?.value.trim() || "",

        category:
          document.getElementById(
            "postCategory"
          )?.value || "Photography",

        image:
          document.getElementById(
            "postImage"
          )?.value.trim() ||
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",

        excerpt:
          document.getElementById(
            "postExcerpt"
          )?.value.trim() || "",

        content:
          document.getElementById(
            "postContent"
          )?.value.trim() || "",

        date:
          new Date().toLocaleDateString(
            "vi-VN"
          )

      };


      if (editId) {

        const index =
          posts.findIndex(
            post =>
              post.id ===
              editId
          );


        if (index !== -1) {

          posts[index] = {

            ...posts[index],

            ...payload

          };

        }

      } else {

        posts.unshift({

          id:
            "post-" +
            Date.now(),

          ...payload

        });

      }


      savePosts(
        posts
      );


      resetPostForm();


      renderAdminPosts();

      renderBlog();


      const postsTab =
        document.querySelector(
          '[data-admin-tab="posts"]'
        );


      if (postsTab) {
        postsTab.click();
      }

    }
  );

}


/* =========================================================
   32. ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !==
      "Escape"
    ) {
      return;
    }


    closeImageModal();

    closeArticle();

    closeAccountModal();

    closeAdmin();

  }
);


/* =========================================================
   33. INITIALIZE
========================================================= */

renderBlog();

updateCommentUI();

/* =========================
   ADMIN COMMENT MANAGEMENT
========================= */

function getComments() {
  return JSON.parse(
    localStorage.getItem("ddStudioComments") || "[]"
  );
}

function saveComments(comments) {
  localStorage.setItem(
    "ddStudioComments",
    JSON.stringify(comments)
  );
}

function getUsers() {
  return JSON.parse(
    localStorage.getItem("ddStudioUsers") || "[]"
  );
}

function saveUsers(users) {
  localStorage.setItem(
    "ddStudioUsers",
    JSON.stringify(users)
  );
}


/* =========================
   RENDER ADMIN COMMENTS
========================= */

function renderAdminComments() {

  const container =
    document.getElementById("adminCommentList");

  const count =
    document.getElementById("adminCommentCount");

  if (!container) return;

  const comments = getComments();

  if (count) {
    count.textContent = comments.length;
  }

  if (!comments.length) {

    container.innerHTML = `
      <div class="admin-comment-row">
        <p style="color:#777">
          Chưa có bình luận nào.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = comments
    .slice()
    .reverse()
    .map(comment => {

      const date = comment.date
        ? new Date(comment.date).toLocaleString("vi-VN")
        : "";

      return `
        <div class="admin-comment-row">

          <div class="admin-comment-head">

            <div>
              <div class="admin-comment-author">
                ${escapeHTML(comment.userName || "Người dùng")}
              </div>

              <div class="admin-comment-meta">
                ${escapeHTML(comment.userEmail || "")}
                · ${escapeHTML(date)}
              </div>
            </div>

            <button
              class="admin-danger"
              onclick="adminDeleteComment('${comment.id}')">
              Xóa
            </button>

          </div>

          <div class="admin-comment-article">
            Bài viết:
            ${escapeHTML(comment.articleTitle || comment.articleId || "Không xác định")}
          </div>

          <div class="admin-comment-text">
            ${escapeHTML(comment.text || "")}
          </div>

        </div>
      `;

    })
    .join("");
}


/* =========================
   DELETE COMMENT
========================= */

function adminDeleteComment(commentId) {

  const comments = getComments();

  const comment =
    comments.find(c => String(c.id) === String(commentId));

  if (!comment) return;

  const confirmed = confirm(
    `Bạn có chắc muốn xóa bình luận của "${comment.userName}"?`
  );

  if (!confirmed) return;

  const updated =
    comments.filter(
      c => String(c.id) !== String(commentId)
    );

  saveComments(updated);

  renderAdminComments();

  // Cập nhật bình luận đang hiển thị trên bài viết
  if (typeof renderComments === "function") {
    renderComments();
  }
}

/* =========================
   ADMIN USER MANAGEMENT
========================= */

function renderAdminUsers() {

  const container =
    document.getElementById("adminUserList");

  const count =
    document.getElementById("adminUserCount");

  if (!container) return;

  const users = getUsers();

  if (count) {
    count.textContent = users.length;
  }

  if (!users.length) {

    container.innerHTML = `
      <div class="admin-user-row">
        <p style="color:#777">
          Chưa có tài khoản nào.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = users.map(user => {

    const blocked = user.blocked === true;

    return `
      <div class="admin-user-row">

        <div class="admin-user-head">

          <div>

            <div class="admin-user-name">
              ${escapeHTML(user.name || "Không tên")}
            </div>

            <div class="admin-user-email">
              ${escapeHTML(user.email || "")}
            </div>

            <div class="admin-user-status ${blocked ? "blocked" : ""}">
              ${blocked ? "Đã khóa" : "Đang hoạt động"}
            </div>

          </div>

          <div class="admin-row-actions">

            <button
              class="admin-warning"
              onclick="adminToggleUser('${user.id}')">
              ${blocked ? "Mở khóa" : "Khóa"}
            </button>

            <button
              class="admin-danger"
              onclick="adminDeleteUser('${user.id}')">
              Xóa
            </button>

          </div>

        </div>

      </div>
    `;

  }).join("");
}


/* =========================
   BLOCK / UNBLOCK USER
========================= */

function adminToggleUser(userId) {

  const users = getUsers();

  const user =
    users.find(u => String(u.id) === String(userId));

  if (!user) return;

  user.blocked = !user.blocked;

  saveUsers(users);

  renderAdminUsers();

  alert(
    user.blocked
      ? "Đã khóa tài khoản."
      : "Đã mở khóa tài khoản."
  );
}


/* =========================
   DELETE USER
========================= */

function adminDeleteUser(userId) {

  const users = getUsers();

  const user =
    users.find(u => String(u.id) === String(userId));

  if (!user) return;

  const confirmed = confirm(
    `Xóa tài khoản "${user.name}"?`
  );

  if (!confirmed) return;

  const updated =
    users.filter(
      u => String(u.id) !== String(userId)
    );

  saveUsers(updated);

  renderAdminUsers();
}