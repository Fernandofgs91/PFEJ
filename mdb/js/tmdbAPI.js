/**
 * CONFIGURAÇÃO DA API DO TMDB
 * Gerencia todas as chamadas para a API
 */
const TMDB_API = {
    API_KEY: 'b0912ef8babf4f2775e2607852f64d76',
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500', // Aumentado para w500 para melhor resolução
    
    async fetchFromAPI(endpoint, params = {}) {
        const queryParams = new URLSearchParams({
            api_key: this.API_KEY,
            language: 'pt-BR',
            ...params
        });
        
        const url = `${this.BASE_URL}${endpoint}?${queryParams}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    },
    
    // Função unificada para buscar filmes com ou sem filtro (resolve o bug da paginação)
    getMovies(page = 1, genreId = 'all') {
        if (genreId === 'all') {
            return this.fetchFromAPI('/movie/popular', { page });
        } else {
            // Usa o endpoint "discover" que permite filtrar por gênero no servidor
            return this.fetchFromAPI('/discover/movie', { 
                page, 
                with_genres: genreId,
                sort_by: 'popularity.desc' 
            });
        }
    },
    
    async getGenres() {
        const data = await this.fetchFromAPI('/genre/movie/list');
        return data.genres;
    },
    
    getImageUrl(path) {
        if (!path) return 'https://via.placeholder.com/500x750/1E1E1E/FFFFFF?text=Sem+Imagem';
        return `${this.IMAGE_BASE_URL}${path}`;
    }
};

window.TMDB_API = TMDB_API;