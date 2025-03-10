import { apiBaseUrl } from '../constants';
import { ApiResponse, BadRequestResponse } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const encodeQueryParams = (queryParams: any) => {
    let result = '?';
    for (const key in queryParams) {
        const stringifiedParam = JSON.stringify(queryParams[key]);
        result += `${encodeURIComponent(key)}=${encodeURIComponent(stringifiedParam)}`;
    }
    return result;
};

export const apiGet = async (endpoint: string, queryParams?: object): Promise<ApiResponse | BadRequestResponse> => {
    const params = queryParams ? '?' + encodeQueryParams(queryParams) : '';

    return await fetch(`${apiBaseUrl}/${endpoint}${params}`, {
        method: 'GET',
    });
};

export const apiPost = async (endpoint: string, body?: object): Promise<ApiResponse | BadRequestResponse> => {
    return await fetch(`${apiBaseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
};
