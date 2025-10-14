import { PrismaClient } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { formatDateToYMD } from '../utils/formatDate';
import {
  GetMoviesQuery,
  Movie,
  MovieDTO,
  MoviesResponse,
} from '../models/movie';

const prisma = new PrismaClient();

export const getMovies = async (
  req: Request<{}, MoviesResponse, {}, GetMoviesQuery>,
  res: Response<MoviesResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      genre,
      startDate,
      endDate,
      minRating,
      minDuration,
      maxDuration,
      sortBy = 'popularity',
      search,
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;

    const where: any = {};

    if (search && typeof search === 'string') {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (genre && typeof genre === 'string') {
      const genreConditions = [
        { genres: { has: genre } },
        { genres: { has: genre.toLowerCase() } },
        {
          genres: {
            has: genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase(),
          },
        },
        { genres: { has: genre.toUpperCase() } },
      ];

      if (where.OR) {
        where.AND = [{ OR: where.OR }, { OR: genreConditions }];
        delete where.OR;
      } else {
        where.OR = genreConditions;
      }
    }

    if (startDate || endDate) {
      where.release_date = {};

      if (startDate && typeof startDate === 'string') {
        where.release_date.gte = startDate;
      }

      if (endDate && typeof endDate === 'string') {
        where.release_date.lte = endDate;
      }
    }

    if (minRating && typeof minRating === 'string') {
      const rating = parseFloat(minRating);
      where.vote_average = {
        gte: rating,
      };
    }

    if (minDuration || maxDuration) {
      where.duration = {};

      if (minDuration && typeof minDuration === 'string') {
        const minDur = parseInt(minDuration, 10);
        if (!isNaN(minDur)) {
          where.duration.gte = minDur;
        }
      }

      if (maxDuration && typeof maxDuration === 'string') {
        const maxDur = parseInt(maxDuration, 10);
        if (!isNaN(maxDur)) {
          where.duration.lte = maxDur;
        }
      }
    }

    let orderBy: any = {};
    switch (sortBy) {
      case 'title':
        orderBy = { title: 'asc' };
        break;
      case 'release_date':
        orderBy = { release_date: 'desc' };
        break;
      case 'vote_average':
        orderBy = { vote_average: 'desc' };
        break;
      case 'duration':
        orderBy = { duration: 'desc' };
        break;
      case 'popularity':
      default:
        orderBy = { popularity: 'desc' };
        break;
    }

    const [movies, totalCount] = await Promise.all([
      prisma.movie.findMany({
        where,
        orderBy,
        skip: offset,
        take: limitNumber,
      }),
      prisma.movie.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limitNumber);

    res.json({
      results: movies,
      page: pageNumber,
      totalPages: totalPages,
      totalResults: totalCount,
    });
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    } as any);
  }
};

export const createMovie = async (
  req: Request<{}, { message: string; movie: Movie }, MovieDTO>,
  res: Response<{ message: string; movie: Movie } | { message: string }>,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      title,
      original_title,
      original_language,
      overview,
      release_date,
      genres,
      vote_average,
      vote_count,
      popularity,
      poster_path,
      backdrop_path,
      situation,
      duration,
      budget,
      revenue,
      trailer,
    } = req.body;

    if (
      !title ||
      !overview ||
      !release_date ||
      !budget ||
      !revenue ||
      !duration ||
      !trailer
    ) {
      res.status(400).json({
        message:
          'Campos obrigatórios: title, overview, release_date, budget, revenue, duration, trailer',
      });

      return;
    }

    const profit = revenue - budget;

    const formattedDate = formatDateToYMD(release_date);

    const newMovie = await prisma.movie.create({
      data: {
        title,
        original_title: original_title || title,
        original_language: original_language || 'pt',
        overview,
        release_date: formattedDate,
        genres: genres || [],
        vote_average: vote_average || 0,
        vote_count: vote_count || 0,
        popularity: popularity || 0,
        poster_path: poster_path || '',
        backdrop_path: backdrop_path || '',
        situation: situation || 'Lançado',
        duration: duration,
        budget: budget,
        revenue: revenue,
        profit: profit,
        trailer: trailer,
      },
    });

    res.status(201).json({
      message: 'Filme criado com sucesso',
      movie: newMovie as Movie,
    });
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    } as any);
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: 'ID do filme não informado',
      });

      return;
    }

    const movie = await prisma.movie.findUnique({
      where: { id: id },
    });

    if (!movie) {
      res.status(404).json({
        message: 'Filme não encontrado',
      });

      return;
    }

    res.json(movie as Movie);
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    } as any);
  }
};

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: 'ID do filme não informado',
      });

      return;
    }

    const {
      title,
      original_title,
      original_language,
      overview,
      release_date,
      genres,
      vote_average,
      vote_count,
      popularity,
      poster_path,
      backdrop_path,
      situation,
      duration,
      budget,
      revenue,
      trailer,
    } = req.body;

    const existingMovie = await prisma.movie.findUnique({
      where: { id: id },
    });

    if (!existingMovie) {
      res.status(404).json({
        message: 'Filme não encontrado',
      });

      return;
    }

    const profit = budget && revenue ? revenue - budget : existingMovie.profit;

    const formattedDate = release_date
      ? formatDateToYMD(release_date)
      : undefined;

    const updatedMovie = await prisma.movie.update({
      where: { id: id },
      data: {
        ...(title && { title }),
        ...(original_title && { original_title }),
        ...(original_language && { original_language }),
        ...(overview && { overview }),
        ...(release_date && { release_date: formattedDate }),
        ...(genres && { genres }),
        ...(vote_average !== undefined && { vote_average }),
        ...(vote_count !== undefined && { vote_count }),
        ...(popularity !== undefined && { popularity }),
        ...(poster_path !== undefined && { poster_path }),
        ...(backdrop_path !== undefined && { backdrop_path }),
        ...(situation && { situation }),
        ...(duration !== undefined && { duration }),
        ...(budget !== undefined && { budget }),
        ...(revenue !== undefined && { revenue }),
        ...(trailer !== undefined && { trailer }),
        profit,
        updatedAt: new Date(),
      },
    });

    res.json({
      message: 'Filme atualizado com sucesso',
      movie: updatedMovie as Movie,
    });
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    } as any);
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: 'ID não informado',
      });

      return;
    }

    const existingMovie = await prisma.movie.findUnique({
      where: { id: id },
    });

    if (!existingMovie) {
      res.status(404).json({
        message: 'Filme não encontrado',
      });

      return;
    }

    await prisma.movie.delete({
      where: { id: id },
    });

    res.json({
      message: 'Filme excluído com sucesso',
    });
  } catch (error) {
    console.error('Erro ao excluir filme:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    } as any);
  }
};
