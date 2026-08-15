# =========================================================
# Stage 1: Base Environment & Dependency Installation
# =========================================================
FROM docker.io/library/ruby:3.3-slim AS base

WORKDIR /srv/jekyll

# Install system dependencies required for native gem compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Cache and install Ruby dependencies
COPY Gemfile Gemfile.lock* ./
RUN bundle install --jobs "$(nproc)" --retry 3

# =========================================================
# Stage 2: Development (Jekyll LiveReload Server)
# =========================================================
FROM base AS dev

COPY . /srv/jekyll

EXPOSE 4000 35729

ENV JEKYLL_ENV=development

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000", "--livereload", "--livereload-port", "35729", "--force_polling", "--config", "_config.yml,_config.dev.yml"]

# =========================================================
# Stage 3: Builder (Production Static Site Generation)
# =========================================================
FROM base AS builder

COPY . /srv/jekyll

ENV JEKYLL_ENV=production

RUN bundle exec jekyll build

# =========================================================
# Stage 4: Production (Nginx Web Server)
# =========================================================
FROM docker.io/library/nginx:alpine AS prod

COPY --from=builder /srv/jekyll/_site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
