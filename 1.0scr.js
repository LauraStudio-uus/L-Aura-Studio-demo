/* =========================================================
   ACCOUNT SYSTEM
   Đăng ký / Đăng nhập / Đăng xuất / Hồ sơ
   ========================================================= */

const USER_STORAGE_KEY = "ddStudioUsers";
const CURRENT_USER_KEY = "ddCurrentUser";
const COMMENTS_STORAGE_KEY = "ddStudioComments";

let currentArticleId = null;


/* =========================================================
   USER STORAGE
   ========================================================= */

function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

    if (Array.isArray(users)) {
      return users;
    }

    return [];
  } catch (error) {
    console.error("Không thể đọc danh sách tài khoản:", error);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  try {
    const user = JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));

    if (user && user.email) {
      return user;
    }

    return null;
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
      createdAt: user.createdAt
    })
  );
}

function clearCurrentUser() {
  sessionStorage.removeItem(CURRENT_USER_KEY);
}


/* =========================================================
   ACCOUNT ELEMENTS
   ========================================================= */

const accountOpen = document.getElementById("accountOpen");
const accountModal = document.getElementById("accountModal");

const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const profileView = document.getElementById("profileView");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerError = document.getElementById("registerError");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileDate = document.getElementById("profileDate");
const logoutUser = document.getElementById("logoutUser");


/* =========================================================
   ACCOUNT VIEW
   ========================================================= */

function hideAccountViews() {
  if (loginView) loginView.hidden = true;
  if (registerView) registerView.hidden = true;
  if (profileView) profileView.hidden = true;
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
  const user = getCurrentUser();

  if (!user) {
    showAccountLogin();
    return;
  }

  hideAccountViews();

  if (profileView) {
    profileView.hidden = false;
  }

  if (profileName) {
    profileName.textContent = user.name;
  }

  if (profileEmail) {
    profileEmail.textContent = user.email;
  }

  if (profileDate) {
    profileDate.textContent = user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("vi-VN")
      : "";
  }
}


/* =========================================================
   OPEN / CLOSE ACCOUNT MODAL
   ========================================================= */

if (accountOpen && accountModal) {
  accountOpen.addEventListener("click", function () {
    accountModal.classList.add("active");

    const user = getCurrentUser();

    if (user) {
      showAccountProfile();
    } else {
      showAccountLogin();
    }
  });
}


/*
  Nếu HTML của bạn có nút đóng modal với một trong các ID này,
  code sẽ tự nhận.
*/

const accountClose =
  document.getElementById("accountClose") ||
  document.querySelector("#accountModal .modal-close") ||
  document.querySelector("#accountModal .close");

if (accountClose && accountModal) {
  accountClose.addEventListener("click", function () {
    accountModal.classList.remove("active");
  });
}


/* Click ra ngoài modal */

if (accountModal) {
  accountModal.addEventListener("click", function (event) {
    if (event.target === accountModal) {
      accountModal.classList.remove("active");
    }
  });
}


/* =========================================================
   SWITCH LOGIN / REGISTER
   ========================================================= */

if (showRegister) {
  showRegister.addEventListener("click", function (event) {
    event.preventDefault();
    showAccountRegister();
  });
}

if (showLogin) {
  showLogin.addEventListener("click", function (event) {
    event.preventDefault();
    showAccountLogin();
  });
}


/* =========================================================
   REGISTER
   ========================================================= */

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = registerName
      ? registerName.value.trim()
      : "";

    const email = registerEmail
      ? registerEmail.value.trim().toLowerCase()
      : "";

    const password = registerPassword
      ? registerPassword.value
      : "";

    if (registerError) {
      registerError.textContent = "";
    }

    /* Kiểm tra họ tên */

    if (name.length < 2) {
      if (registerError) {
        registerError.textContent =
          "Vui lòng nhập họ tên hợp lệ.";
      }

      return;
    }

    /* Kiểm tra email */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      if (registerError) {
        registerError.textContent =
          "Email không hợp lệ.";
      }

      return;
    }

    /* Kiểm tra password */

    if (password.length < 6) {
      if (registerError) {
        registerError.textContent =
          "Mật khẩu phải có ít nhất 6 ký tự.";
      }

      return;
    }

    const users = getUsers();

    /* Kiểm tra email đã tồn tại */

    const existingUser = users.find(function (user) {
      return (
        user.email &&
        user.email.toLowerCase() === email
      );
    });

    if (existingUser) {
      if (registerError) {
        registerError.textContent =
          "Email này đã được đăng ký.";
      }

      return;
    }

    /* Tạo tài khoản */

    const newUser = {
      id:
        "user_" +
        Date.now() +
        "_" +
        Math.random()
          .toString(36)
          .substring(2, 8),

      name: name,

      email: email,

      password: password,

      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    saveUsers(users);

    /* Tự động đăng nhập */

    setCurrentUser(newUser);

    /* Reset form */

    registerForm.reset();

    /* Hiển thị profile */

    showAccountProfile();

    /* Cập nhật phần bình luận */

    updateCommentUI();
  });
}


/* =========================================================
   LOGIN
   ========================================================= */

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = loginEmail
      ? loginEmail.value.trim().toLowerCase()
      : "";

    const password = loginPassword
      ? loginPassword.value
      : "";

    if (loginError) {
      loginError.textContent = "";
    }

    const users = getUsers();

    const user = users.find(function (item) {
      return (
        item.email &&
        item.email.toLowerCase() === email &&
        item.password === password
      );
    });

    if (!user) {
      if (loginError) {
        loginError.textContent =
          "Email hoặc mật khẩu không chính xác.";
      }

      return;
    }

    /* Đăng nhập thành công */

    setCurrentUser(user);

    loginForm.reset();

    showAccountProfile();

    updateCommentUI();
  });
}


/* =========================================================
   LOGOUT
   ========================================================= */

if (logoutUser) {
  logoutUser.addEventListener("click", function () {
    clearCurrentUser();

    showAccountLogin();

    updateCommentUI();

    if (accountModal) {
      accountModal.classList.remove("active");
    }
  });
}


/* =========================================================
   COMMENTS STORAGE
   ========================================================= */

function getComments() {
  try {
    const comments = JSON.parse(
      localStorage.getItem(COMMENTS_STORAGE_KEY)
    );

    if (Array.isArray(comments)) {
      return comments;
    }

    return [];
  } catch (error) {
    console.error(
      "Không thể đọc bình luận:",
      error
    );

    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(
    COMMENTS_STORAGE_KEY,
    JSON.stringify(comments)
  );
}


/* =========================================================
   COMMENT ELEMENTS
   ========================================================= */

const commentLoginMessage =
  document.getElementById("commentLoginMessage");

const commentForm =
  document.getElementById("commentForm");

const commentText =
  document.getElementById("commentText");

const commentUserName =
  document.getElementById("commentUserName");

const commentList =
  document.getElementById("commentList");


/* =========================================================
   UPDATE COMMENT UI
   ========================================================= */

function updateCommentUI() {
  const user = getCurrentUser();

  if (commentLoginMessage) {
    commentLoginMessage.hidden = !!user;
  }

  if (commentForm) {
    commentForm.hidden = !user;
  }

  if (commentUserName) {
    if (user) {
      commentUserName.textContent =
        "Đang bình luận với tư cách: " +
        user.name;
    } else {
      commentUserName.textContent = "";
    }
  }

  if (currentArticleId) {
    renderComments(currentArticleId);
  }
}


/* =========================================================
   RENDER COMMENTS
   ========================================================= */

function renderComments(postId) {
  if (!commentList) {
    return;
  }

  const comments = getComments()
    .filter(function (comment) {
      return comment.postId === postId;
    })
    .sort(function (a, b) {
      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    });

  commentList.innerHTML = "";

  if (comments.length === 0) {
    const emptyMessage =
      document.createElement("div");

    emptyMessage.className =
      "comment-empty";

    emptyMessage.textContent =
      "Chưa có bình luận nào. Hãy là người đầu tiên bình luận.";

    commentList.appendChild(emptyMessage);

    return;
  }

  const currentUser = getCurrentUser();

  comments.forEach(function (comment) {
    const item =
      document.createElement("div");

    item.className = "comment-item";

    const header =
      document.createElement("div");

    header.className = "comment-header";

    const author =
      document.createElement("strong");

    author.className = "comment-author";

    author.textContent = comment.name;

    const date =
      document.createElement("span");

    date.className = "comment-date";

    date.textContent =
      new Date(
        comment.createdAt
      ).toLocaleString("vi-VN");

    header.appendChild(author);
    header.appendChild(date);

    const text =
      document.createElement("p");

    text.className = "comment-text";

    /*
      Dùng textContent để tránh người dùng
      chèn HTML/JavaScript vào bình luận.
    */

    text.textContent = comment.text;

    item.appendChild(header);
    item.appendChild(text);

    /* Cho phép người dùng xóa bình luận của chính mình */

    if (
      currentUser &&
      comment.userId === currentUser.id
    ) {
      const deleteButton =
        document.createElement("button");

      deleteButton.type = "button";

      deleteButton.className =
        "comment-delete";

      deleteButton.textContent =
        "Xóa";

      deleteButton.addEventListener(
        "click",
        function () {
          deleteComment(comment.id);
        }
      );

      item.appendChild(deleteButton);
    }

    commentList.appendChild(item);
  });
}


/* =========================================================
   ADD COMMENT
   ========================================================= */

if (commentForm) {
  commentForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      const user = getCurrentUser();

      /* Không đăng nhập thì không cho bình luận */

      if (!user) {
        alert(
          "Bạn cần đăng nhập tài khoản để bình luận."
        );

        return;
      }

      if (!currentArticleId) {
        alert(
          "Không xác định được bài viết."
        );

        return;
      }

      const text = commentText
        ? commentText.value.trim()
        : "";

      if (!text) {
        alert(
          "Vui lòng nhập nội dung bình luận."
        );

        return;
      }

      if (text.length > 1000) {
        alert(
          "Bình luận tối đa 1000 ký tự."
        );

        return;
      }

      const comments = getComments();

      const newComment = {
        id:
          "comment_" +
          Date.now() +
          "_" +
          Math.random()
            .toString(36)
            .substring(2, 8),

        postId: currentArticleId,

        userId: user.id,

        name: user.name,

        email: user.email,

        text: text,

        createdAt:
          new Date().toISOString()
      };

      comments.push(newComment);

      saveComments(comments);

      /* Xóa nội dung ô nhập */

      if (commentText) {
        commentText.value = "";
      }

      /* Render lại */

      renderComments(currentArticleId);
    }
  );
}


/* =========================================================
   DELETE OWN COMMENT
   ========================================================= */

function deleteComment(commentId) {
  const user = getCurrentUser();

  if (!user) {
    return;
  }

  const comments = getComments();

  const comment =
    comments.find(function (item) {
      return item.id === commentId;
    });

  if (!comment) {
    return;
  }

  /* Chỉ chủ bình luận mới được xóa */

  if (comment.userId !== user.id) {
    return;
  }

  const confirmed = confirm(
    "Bạn có chắc muốn xóa bình luận này?"
  );

  if (!confirmed) {
    return;
  }

  const newComments =
    comments.filter(function (item) {
      return item.id !== commentId;
    });

  saveComments(newComments);

  renderComments(currentArticleId);
}


/* =========================================================
   LOGIN MESSAGE → OPEN ACCOUNT
   ========================================================= */

if (commentLoginMessage) {
  commentLoginMessage.addEventListener(
    "click",
    function () {
      if (accountModal) {
        accountModal.classList.add("active");
      }

      showAccountLogin();
    }
  );
}


/* =========================================================
   KẾT NỐI VỚI OPEN ARTICLE CŨ
   =========================================================

   Hàm openArticle() cũ của bạn cần có:

   currentArticleId = post.id;
   renderComments(post.id);
   updateCommentUI();

   Nếu muốn chắc chắn, thay hàm openArticle cũ
   bằng phiên bản bên dưới.
*/


function openArticleWithComments(post) {
  if (!post) {
    return;
  }

  currentArticleId = post.id;

  const articleModal =
    document.getElementById("articleModal");

  const articleImage =
    document.getElementById("articleImage");

  const articleCategory =
    document.getElementById("articleCategory");

  const articleTitle =
    document.getElementById("articleTitle");

  const articleDate =
    document.getElementById("articleDate");

  const articleContent =
    document.getElementById("articleContent");

  if (articleImage) {
    articleImage.src = post.image || "";
    articleImage.alt = post.title || "";
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
    /*
      escapeHTML() là hàm đã có trong JS cũ của bạn.
      Nếu chưa có thì dùng textContent.
    */

    if (typeof escapeHTML === "function") {
      articleContent.innerHTML =
        escapeHTML(post.content || "")
          .replace(/\n/g, "<br>");
    } else {
      articleContent.textContent =
        post.content || "";
    }
  }

  renderComments(post.id);

  updateCommentUI();

  if (articleModal) {
    articleModal.classList.add("active");
  }
}


/* =========================================================
   KHỞI TẠO
   ========================================================= */

updateCommentUI();


/* =========================================================
   ESC ĐỂ ĐÓNG ACCOUNT MODAL
   ========================================================= */

document.addEventListener(
  "keydown",
  function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (
      accountModal &&
      accountModal.classList.contains("active")
    ) {
      accountModal.classList.remove("active");
    }
  }
);