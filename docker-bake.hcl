variable "TAG" {
  default = "latest"
}

variable "REGISTRY" {
  default = "ghcr.io"
}

variable "OWNER" {
  default = "infraniaga-technology-division"
}

variable "REPO" {
  default = "manajerku-fe"
}

variable "VITE_API_URL" {
  default = "https://api.manajerku.com"
}

variable "VITE_ACCESS_TOKEN" {
  default = "thisIsJustRandomString"
}

variable "VITE_USER_DATA" {
  default = "userData"
}

variable "VITE_API_URL_NODE_ENVIRONMENT" {
  default = "DEVELOPMENT"
}

group "default" {
  targets = ["app"]
}

group "prod" {
  targets = ["app-prod"]
}

group "development" {
  targets = ["app-development"]
}

target "base" {
  context    = "."
  dockerfile = "Dockerfile"
  platforms  = ["linux/amd64"]
  args = {
    VITE_API_URL                  = "${VITE_API_URL}"
    VITE_ACCESS_TOKEN             = "${VITE_ACCESS_TOKEN}"
    VITE_USER_DATA               = "${VITE_USER_DATA}"
    VITE_API_URL_NODE_ENVIRONMENT = "${VITE_API_URL_NODE_ENVIRONMENT}"
  }
}

# App
target "app" {
  inherits = ["base"]
  tags     = ["${REGISTRY}/${OWNER}/${REPO}:${TAG}"]
}

target "app-prod" {
  inherits = ["app"]
  tags = [
    "${REGISTRY}/${OWNER}/${REPO}:latest",
    "${REGISTRY}/${OWNER}/${REPO}:${TAG}"
  ]
}

target "app-development" {
  inherits = ["app"]
  tags = [
    "${REGISTRY}/${OWNER}/${REPO}:development",
    "${REGISTRY}/${OWNER}/${REPO}:${TAG}"
  ]
}
