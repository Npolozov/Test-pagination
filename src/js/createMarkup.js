export function createMarkup(news) {
  return news
    .map(
      ({
        urlToImage,
        author,
        content,
        description,
      }) => `<div class="photo-card">
    <img src="${urlToImage}" alt="${author}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes:</b>
         ${content}
      </p>
      <p class="info-item">
        <b>Views:</b>
        ${description}
      </p>
    </div>
    </div>`
    )
    .join('');
}
