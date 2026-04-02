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

group "default" {
  targets = ["app"]
}

group "prod" {
  targets = ["app-prod"]
}

target "base" {
  context    = "."
  dockerfile = "Dockerfile"
  platforms  = ["linux/amd64"]
  args = {
    VITE_API_URL      = "${VITE_API_URL}"
    VITE_ACCESS_TOKEN = "${VITE_ACCESS_TOKEN}"
    VITE_USER_DATA    = "${VITE_USER_DATA}"
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
