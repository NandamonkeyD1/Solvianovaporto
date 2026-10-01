<?php
// ============================================================
// LANGUAGE SWITCHER
// ============================================================
$router->get('/lang/{code}', 'HomeController@switchLang');

// ============================================================
// PUBLIC ROUTES
// ============================================================
$router->get('/', 'HomeController@index');
$router->get('/about', 'HomeController@about');
$router->get('/services', 'HomeController@services');
$router->get('/services/{slug}', 'HomeController@serviceDetail');

$router->get('/portfolio', 'PortfolioController@index');
$router->get('/portfolio/{slug}', 'PortfolioController@show');

$router->get('/case-study', 'PortfolioController@caseStudy');
$router->get('/case-study/{slug}', 'PortfolioController@caseStudyDetail');

$router->get('/gallery', 'GalleryController@index');

$router->get('/team', 'HomeController@team');

$router->get('/articles', 'ArticleController@index');
$router->get('/articles/category/{slug}', 'ArticleController@category');
$router->get('/articles/{slug}', 'ArticleController@show');

$router->get('/contact', 'HomeController@contact');
$router->post('/contact', 'HomeController@sendContact');

// Sitemap & Robots
$router->get('/sitemap.xml', 'SeoController@sitemap');
$router->get('/robots.txt', 'SeoController@robots');

// ============================================================
// ADMIN ROUTES
// ============================================================
$router->any('/sso', 'AdminController@login');
$router->get('/sso/logout', 'AdminController@logout');
$router->get('/sso/dashboard', 'AdminController@dashboard');

// Portfolio Admin
$router->get('/sso/portfolio', 'AdminPortfolioController@index');
$router->any('/sso/portfolio/create', 'AdminPortfolioController@create');
$router->any('/sso/portfolio/edit/{id}', 'AdminPortfolioController@edit');
$router->post('/sso/portfolio/delete/{id}', 'AdminPortfolioController@delete');

// Services Admin
$router->get('/sso/services', 'AdminServicesController@index');
$router->any('/sso/services/create', 'AdminServicesController@create');
$router->any('/sso/services/edit/{id}', 'AdminServicesController@edit');
$router->post('/sso/services/delete/{id}', 'AdminServicesController@delete');

// Gallery Admin
$router->get('/sso/gallery', 'AdminGalleryController@index');
$router->any('/sso/gallery/create', 'AdminGalleryController@create');
$router->post('/sso/gallery/delete/{id}', 'AdminGalleryController@delete');

// Team Admin
$router->get('/sso/team', 'AdminTeamController@index');
$router->any('/sso/team/create', 'AdminTeamController@create');
$router->any('/sso/team/edit/{id}', 'AdminTeamController@edit');
$router->post('/sso/team/delete/{id}', 'AdminTeamController@delete');

// Articles Admin
$router->get('/sso/articles', 'AdminArticleController@index');
$router->any('/sso/articles/create', 'AdminArticleController@create');
$router->any('/sso/articles/edit/{id}', 'AdminArticleController@edit');
$router->post('/sso/articles/delete/{id}', 'AdminArticleController@delete');

// Testimonials Admin
$router->get('/sso/testimonials', 'AdminTestimonialController@index');
$router->any('/sso/testimonials/create', 'AdminTestimonialController@create');
$router->any('/sso/testimonials/edit/{id}', 'AdminTestimonialController@edit');
$router->post('/sso/testimonials/delete/{id}', 'AdminTestimonialController@delete');

// Messages Admin
$router->get('/sso/messages', 'AdminMessageController@index');
$router->get('/sso/messages/{id}', 'AdminMessageController@show');
$router->post('/sso/messages/delete/{id}', 'AdminMessageController@delete');

// SEO Admin
$router->get('/sso/seo', 'AdminSeoController@index');
$router->post('/sso/seo/update', 'AdminSeoController@update');

// Settings Admin
$router->get('/sso/settings', 'AdminController@settings');
$router->post('/sso/settings/update', 'AdminController@updateSettings');

// Invoice Admin
$router->get('/sso/invoice', 'AdminInvoiceController@index');
$router->any('/sso/invoice/create', 'AdminInvoiceController@create');
$router->get('/sso/invoice/{id}', 'AdminInvoiceController@show');
$router->get('/sso/invoice/{id}/print', 'AdminInvoiceController@printInvoice');
$router->any('/sso/invoice/{id}/edit', 'AdminInvoiceController@edit');
$router->post('/sso/invoice/{id}/delete', 'AdminInvoiceController@delete');

// Categories Admin
$router->get('/sso/categories', 'AdminCategoryController@index');
$router->any('/sso/categories/create', 'AdminCategoryController@create');
$router->any('/sso/categories/edit/{id}', 'AdminCategoryController@edit');
$router->post('/sso/categories/delete/{id}', 'AdminCategoryController@delete');
