import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import HomePage from '../HomePage';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const mockMovies = [
    { id: 1, title: 'Movie One', vote_average: 8.2, popularity: 200, poster_path: '/path1.jpg' },
    { id: 2, title: 'Movie Two', vote_average: 7.5, popularity: 180, poster_path: '/path2.jpg' }
];

beforeEach(() => {
    axios.get.mockResolvedValue({
        data: {
            results: mockMovies
        }
    });
});

test('renders movie list', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    expect(await screen.findByText('Movie One')).toBeInTheDocument();
    expect(screen.getByText('Movie Two')).toBeInTheDocument();
});

test('handles search input', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');
    await act(async () => {
        fireEvent.change(searchInput, { target: { value: 'Movie One' } });
    });

    await waitFor(() => {
        expect(screen.getByText('Movie One')).toBeInTheDocument();
        expect(screen.queryByText('Movie Two')).not.toBeInTheDocument();
    });
});

test('handles sorting by rating', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    const select = screen.getByRole('combobox');
    await act(async () => {
        fireEvent.change(select, { target: { value: 'rating' } });
    });

    await waitFor(() => {
        const movies = screen.getAllByRole('heading', { level: 3 });
        expect(movies[0]).toHaveTextContent('Movie One');
        expect(movies[1]).toHaveTextContent('Movie Two');
    });
});

test('handles adding to favorites', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    const buttons = await screen.findAllByText('Add to Favorites');
    await act(async () => {
        fireEvent.click(buttons[0]);
    });

    await waitFor(() => {
        expect(screen.getByText('Remove from Favorites')).toBeInTheDocument();
    });
});

test('handles removing from favorites', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    const buttons = await screen.findAllByText('Add to Favorites');
    await act(async () => {
        fireEvent.click(buttons[0]);
    });

    const removeButtons = await screen.findAllByText('Remove from Favorites');
    await act(async () => {
        fireEvent.click(removeButtons[0]);
    });

    await waitFor(() => {
        expect(screen.getAllByText('Add to Favorites').length).toBe(2);
    });
});

test('renders no results message when search returns no matches', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');
    await act(async () => {
        fireEvent.change(searchInput, { target: { value: 'Non-existent movie' } });
    });

    await waitFor(() => {
        expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
});

test('renders favorites link', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    const link = screen.getByText('View Favorites');
    expect(link).toBeInTheDocument();
});
