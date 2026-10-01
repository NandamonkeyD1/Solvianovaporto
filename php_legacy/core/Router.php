<?php
class Router {
    private array $routes = [];

    public function get(string $path, string $handler): void {
        $this->routes[] = ['method' => 'GET', 'path' => $path, 'handler' => $handler];
    }

    public function post(string $path, string $handler): void {
        $this->routes[] = ['method' => 'POST', 'path' => $path, 'handler' => $handler];
    }

    public function any(string $path, string $handler): void {
        $this->routes[] = ['method' => 'ANY', 'path' => $path, 'handler' => $handler];
    }

    public function dispatch(): void {
        $requestUri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        // Strip base path (subfolder install, e.g. /Portofolio_Solvia)
        $scriptDir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
        // Remove /public suffix — entry point lives in public/ but URLs are relative to parent
        $scriptDir = preg_replace('#/public$#', '', $scriptDir);
        if ($scriptDir !== '' && strpos($requestUri, $scriptDir) === 0) {
            $requestUri = substr($requestUri, strlen($scriptDir));
        }

        // Normalize URI
        $requestUri = '/' . trim($requestUri, '/');
        if ($requestUri !== '/') $requestUri = rtrim($requestUri, '/');

        foreach ($this->routes as $route) {
            $pattern = $this->buildPattern($route['path']);
            if (preg_match($pattern, $requestUri, $matches)) {
                if ($route['method'] !== 'ANY' && $route['method'] !== $requestMethod) {
                    continue;
                }
                // Extract named params
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                $this->callHandler($route['handler'], $params);
                return;
            }
        }

        // 404
        http_response_code(404);
        $this->call404();
    }

    private function buildPattern(string $path): string {
        $pattern = preg_replace('/\{([a-zA-Z_]+)\}/', '(?P<$1>[^/]+)', $path);
        return '#^' . $pattern . '$#';
    }

    private function callHandler(string $handler, array $params = []): void {
        [$controllerName, $method] = explode('@', $handler);
        $controllerFile = APP_PATH . '/controllers/' . $controllerName . '.php';

        if (!file_exists($controllerFile)) {
            http_response_code(500);
            die('Controller not found: ' . htmlspecialchars($controllerName));
        }

        require_once $controllerFile;
        $controller = new $controllerName();

        if (!method_exists($controller, $method)) {
            http_response_code(500);
            die('Method not found: ' . htmlspecialchars($method));
        }

        call_user_func_array([$controller, $method], $params);
    }

    private function call404(): void {
        $file = APP_PATH . '/views/errors/404.php';
        if (file_exists($file)) {
            require $file;
        } else {
            echo '<h1>404 — Page Not Found</h1>';
        }
    }
}
