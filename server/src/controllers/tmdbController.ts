import { Request, Response } from 'express';

const TMDB_API_KEY = process.env.API_TMDB_KEY;
const TMDB_BASE_URL = process.env.API_TMDB_URL;

const tmdbHeaders = {
  Authorization: `Bearer ${TMDB_API_KEY}`,
  'Content-Type': 'application/json',
};

export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const { page = 1 } = req.query;
    const pageNumber = parseInt(page as string, 10);

    if (pageNumber > 100) {
      return res.status(400).json({
        message: 'Página não disponível. Máximo permitido: 100 páginas',
      });
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?page=${page}&language=pt-BR&include_adult=false&include_video=false&sort_by=release_date.asc`,
      {
        headers: tmdbHeaders,
      },
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar filmes populares');
    }

    const data = await response.json();

    if (data.total_pages > 100) {
      data.total_pages = 100;
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erro ao buscar filmes populares',
      error: error.message,
    });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  try {
    const { query, page = 1 } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Termo de busca é obrigatório' });
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query as string)}&page=${page}&language=pt-BR&include_adult=false`,
      {
        headers: tmdbHeaders,
      },
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar filmes');
    }

    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erro ao buscar filmes',
      error: error.message,
    });
  }
};

export const getMovieGenres = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?language=pt-BR`,
      {
        headers: tmdbHeaders,
      },
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar gêneros');
    }

    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erro ao buscar gêneros',
      error: error.message,
    });
  }
};

export const getMovieDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?language=pt-BR`,
      {
        headers: tmdbHeaders,
      },
    );

    if (!response.ok) {
      throw new Error('Filme não encontrado');
    }

    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erro ao buscar detalhes do filme',
      error: error.message,
    });
  }
};
