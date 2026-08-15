# Harsh Yadav - Personal Website

A minimal, static “About Me” website built with Jekyll and Markdown.

The project focuses on simplicity, fast load times, and consistent rendering across modern browsers and mobile devices. Content is written in Markdown and injected into a lightweight HTML layout with minimal CSS.

Inspired by Jake Ginesin’s [site](https://jakegines.in/about), recreated from scratch with a reduced footprint and a black-and-white aesthetic.

The **Favicon** and the **Background (Python created GIF)** are original creations.

---

## 🐳 Container Setup (Docker & Podman)

This repository includes a multi-stage `Dockerfile` and `compose.yaml` compatible with **Docker** (and `podman-docker` on Fedora).

### 1. Local Development (LiveReload Server)

Mounts your local source code into the container with live-reload enabled at [http://localhost:4000](http://localhost:4000):

#### Using Docker / Podman CLI:
```bash
# Build the dev image
docker build --target dev -t hydv-dev .

# Run with volume mount for live reloading
docker run --rm -it -p 4000:4000 -p 35729:35729 --security-opt label=disable -v "$(pwd):/srv/jekyll" hydv-dev
```

#### Using Compose:
```bash
docker compose up dev
# or
podman compose up dev
```

---

### 2. Production Build (Nginx Static Server)

Generates the static site using Jekyll and serves it via an ultra-lightweight Nginx container at [http://localhost:8080](http://localhost:8080):

#### Using Docker / Podman CLI:
```bash
# Build the production image
docker build --target prod -t hydv-prod .

# Run Nginx static server
docker run --rm -d -p 8080:80 --name hydv-site hydv-prod
```

#### Using Compose:
```bash
docker compose up prod
# or
podman compose up prod
```
