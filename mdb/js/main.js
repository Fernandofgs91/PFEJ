/**
 * APLICAÇÃO PRINCIPAL
 * Gerencia filmes, filtros e interface
 */
class MovieApp {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 1;
        this.movies = [];
        this.genres = [];
        this.currentGenre = 'all';
        
        this.init();
    }
    
    async init() {
        this.showLoading();
        try {
            await this.loadGenres();
            await this.loadMovies();
            this.setupEventListeners();
        } catch (error) {
            this.showError('Erro ao inicializar a aplicação. Verifique sua conexão.');
        } finally {
            this.hideLoading();
        }
    }
    
    async loadGenres() {
        this.genres = await TMDB_API.getGenres() || [];
        this.renderGenreFilter();
    }
    
    // Agora busca filmes já paginados e filtrados diretamente do TMDB
    async loadMovies() {
        this.showLoading();
        try {
            const data = await TMDB_API.getMovies(this.currentPage, this.currentGenre);
            this.movies = data.results || [];
            // O TMDB permite paginação até a página 500
            this.totalPages = Math.min(data.total_pages, 500); 
            
            this.renderMovies();
            this.updatePagination();
            
            // Rola suavemente para o topo ao carregar nova página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            this.showError('Erro ao carregar os filmes. Tente novamente mais tarde.');
        } finally {
            this.hideLoading();
        }
    }
    
    setupEventListeners() {
        document.getElementById('genre-filter').addEventListener('change', (e) => {
            this.currentGenre = e.target.value;
            this.currentPage = 1; // Reseta para a página 1 ao mudar o filtro
            this.loadMovies();
        });
        
        document.getElementById('prev-page').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadMovies();
            }
        });
        
        document.getElementById('next-page').addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadMovies();
            }
        });

        // Adicionar navegação por teclado com setas
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.currentPage > 1) {
                this.currentPage--;
                this.loadMovies();
            } else if (e.key === 'ArrowRight' && this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadMovies();
            }
        });
    }
    
    renderGenreFilter() {
        const select = document.getElementById('genre-filter');
        this.genres
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                select.appendChild(option);
            });
    }
    
    renderMovies() {
        const grid = document.getElementById('movies-grid');
        grid.innerHTML = '';
        
        if (!this.movies.length) {
            grid.innerHTML = `
                <div class="no-movies">
                    <i class="fas fa-film"></i>
                    <p>Nenhum filme encontrado para este filtro.</p>
                </div>`;
            return;
        }
        
        // Renderiza apenas os primeiros 10 filmes por página
        this.movies.slice(0, 10).forEach(movie => {
            grid.appendChild(this.createMovieCard(movie));
        });
    }
    
    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        const poster = TMDB_API.getImageUrl(movie.poster_path);
        const genres = this.getGenreNames(movie.genre_ids);
        const date = this.formatDate(movie.release_date);
        const rating = movie.vote_average?.toFixed(1) || 'N/A';
        const overview = movie.overview || 'Sinopse não disponível para este título.';

        card.innerHTML = `
            <div class="movie-poster">
                <img src="${poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-rating-badge">
                    <i class="fas fa-star"></i> ${rating}
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-genres">
                    ${genres.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                </div>
                <div class="movie-release">
                    <i class="far fa-calendar-alt"></i> ${date}
                </div>
                
                <details class="movie-details">
                    <summary>
                        <p class="movie-overview-preview">${overview}</p>
                        <span class="read-more-btn">Clique aqui para ver a sinopse completa</span>
                    </summary>
                    <p class="movie-overview-full">${overview}</p>
                </details>
            </div>
        `;

        // Adicionar event listener para controlar o comportamento do details
        setTimeout(() => {
            const details = card.querySelector('.movie-details');
            const summary = details.querySelector('summary');
            
            summary.addEventListener('click', (e) => {
                e.preventDefault(); // Previne o comportamento padrão
                
                if (details.open) {
                    details.open = false; // Fecha se estiver aberto
                } else {
                    // Fecha outros details abertos primeiro
                    document.querySelectorAll('details.movie-details').forEach(d => {
                        if (d !== details) d.open = false;
                    });
                    details.open = true; // Abre este
                }
            });
        }, 0);

        return card;
    }
    
    getGenreNames(genreIds) {
        if (!genreIds || !this.genres.length) return [];
        return genreIds
            .map(id => this.genres.find(g => g.id === id)?.name)
            .filter(name => name)
            .slice(0, 3); // Limita a 3 gêneros na interface para não quebrar o layout
    }
    
    formatDate(dateString) {
        if (!dateString) return 'Data não informada';
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch {
            return dateString;
        }
    }
    
    updatePagination() {
        document.getElementById('page-info').textContent = `Página ${this.currentPage} de ${this.totalPages}`;
        document.getElementById('prev-page').disabled = this.currentPage === 1;
        document.getElementById('next-page').disabled = this.currentPage === this.totalPages;
    }
    
    showLoading() {
        document.getElementById('loading-spinner').classList.add('active');
        document.getElementById('movies-grid').style.opacity = '0.5';
    }
    
    hideLoading() {
        document.getElementById('loading-spinner').classList.remove('active');
        document.getElementById('movies-grid').style.opacity = '1';
    }
    
    showError(message) {
        document.getElementById('movies-grid').innerHTML = `
            <div class="no-movies">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MovieApp();
});