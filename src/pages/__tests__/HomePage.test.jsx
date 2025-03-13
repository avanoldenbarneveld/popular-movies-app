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

test('handles sorting by rating', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    // Get the sorting dropdown
    const select = screen.getByRole('combobox');

    // Change the value to "rating"
    await act(async () => {
        fireEvent.change(select, { target: { value: 'rating' } });
    });

    // Wait for the state to update and assert sorting order
    await waitFor(() => {
        const movies = screen.getAllByRole('heading', { level: 3 });
        expect(movies[0]).toHaveTextContent('Movie One'); // Highest rated movie should be first
        expect(movies[1]).toHaveTextContent('Movie Two');
    });
});
