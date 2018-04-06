import axios from 'axios';
import jQuery from 'jquery-slim';
import AppStyles from "./sass/app.scss";

jQuery($ => {

	const title = $('#--hello-title');
	const input = $('#--scotch-author');
	const button = $('#--search-scotch-button');
	const articles = $('#--scotch-articles');
	const loading = $('#--global-loader');

	const initialTitle = title.text();

	button.on('click', evt => {
		evt.preventDefault();
		articles.html('');
		title.html(initialTitle);

		loading.html('<div class="loader-bubble-1 m-auto position-absolute"></div><div class="loader-bubble-2 m-auto position-absolute"></div>').removeClass('d-none').addClass('d-flex');

		const author = input.val();

		axios.get(`/scotch/${author}`)
			.then(({ data: response }) => {
				const { author, avatar, url, posts } = response.data;
				loading.html('').addClass('d-none').removeClass('d-flex');

				title.append(`<small class="py-2 pl-4 ml-4 border-gray border-left"><a class="text-dark" rel="nofollow noopener noreferrer" href="${url}" target="_blank"><img class="mr-2 align-text-top" src="${avatar}" alt="Avatar" style="height: 32px; width: 32px; border-radius: 16px;">${author}<span class="badge badge-danger badge-pill ml-3 align-text-bottom">${posts.length}</span></a></small>`);

				$.each(posts, (i, post) => {
					articles.append(`<a class="post-card d-block col-md-4 mb-5" rel="nofollow noopener noreferrer" href="${post.url}" target="_blank" style="height: 240px;"><div class="w-100 h-100 position-relative d-flex flex-row justify-content-center" style="overflow: hidden; border-radius: 10px;"><img class="post-card__img mh-100" src="${post.image}" alt="Post Image"></div><div class="post-info d-flex flex-row flex-wrap w-100 align-items-start"></div></a>`);
				});
			})
			.catch(error => {
				loading.html('').addClass('d-none').removeClass('d-flex');
			});
	});

	(function init() {
		input.val('gladchinda');
		button.trigger('click');
		input.trigger('blur');
	})();

});
