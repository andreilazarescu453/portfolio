// ============================================
//  Portfolio JS — Reveal, Modal
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // ---------- REVEAL ON SCROLL ----------
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // ---------- VIDEO HOVER PLAY/PAUSE (desktop only) ----------
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (!isTouch) {
    document.querySelectorAll(".work__video-wrap").forEach((wrap) => {
      const video = wrap.querySelector("video");
      if (!video) return;

      wrap.addEventListener("mouseenter", () => {
        video.play().catch(() => {});
      });

      wrap.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  }

  // ---------- SMOOTH SCROLL FOR NAV LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});

// ---------- VIDEO MODAL ----------
function openVideoModal(videoEl) {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const source = videoEl.querySelector("source");

  modalVideo.querySelector("source").src = source.src;
  modalVideo.load();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  modal.classList.remove("active");
  modalVideo.pause();
  modalVideo.currentTime = 0;
  document.body.style.overflow = "";
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideoModal();
});
