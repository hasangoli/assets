const medias = document.querySelectorAll('.media');

function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      if (!$(entry.target).attr('src')) {
        let src = $(entry.target).attr('data-src');
        $(entry.target).attr('src', src);
      }
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  threshold: 0,
  rootMargin: "0px"
});

medias?.forEach(media => observer.observe(media));
