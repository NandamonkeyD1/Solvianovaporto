<?php
define('ROOT_PATH', dirname(__DIR__));
define('APP_PATH', ROOT_PATH . '/app');
define('PUBLIC_PATH', __DIR__);

require_once APP_PATH . '/config/config.php';
require_once APP_PATH . '/core/App.php';
require_once APP_PATH . '/core/Router.php';
require_once APP_PATH . '/core/Controller.php';
require_once APP_PATH . '/core/Model.php';
require_once APP_PATH . '/core/Database.php';
require_once APP_PATH . '/helpers/helpers.php';
require_once APP_PATH . '/helpers/banks.php';

$router = new Router();
require_once APP_PATH . '/routes/web.php';
$router->dispatch();
