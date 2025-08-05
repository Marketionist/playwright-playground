const { test, expect, } = require('@playwright/test');

test.describe.parallel('ReqRes API', () => {
    const baseUrl = 'https://reqres.in/api';

    test('GET /users/{id} - assert valid endpoint response.', async ({ request, }) => {
        const response = await request.get(
            `${baseUrl}/users/4`,
            {
                headers: {
                    'x-api-key': 'reqres-free-v1',
                },
            }
        );
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
    });

    test('GET /users/some-wrong-url - assert invalid endpoint response.', async ({ request, }) => {
        const response = await request.get(
            `${baseUrl}/users/some-wrong-url`,
            {
                headers: {
                    'x-api-key': 'reqres-free-v1',
                },
            }
        );

        expect(response.status()).toBe(404);
    });

    test('GET /users/{id} - assert user email.', async ({ request, }) => {
        const existingUserId = 4;
        const response = await request.get(
            `${baseUrl}/users/${existingUserId}`,
            {
                headers: {
                    'x-api-key': 'reqres-free-v1',
                },
            }
        );
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(existingUserId);
        expect(responseBody.data.email).toBe('eve.holt@reqres.in');
        expect(responseBody.data.first_name).toBeTruthy();
    });

    test('POST /user - create new user.', async ({ request, }) => {
        const userId = 999;
        const response = await request.post(`${baseUrl}/user`, {
            headers: {
                'x-api-key': 'reqres-free-v1',
            },
            data: {
                id: userId,
            },
        });
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(201);
        expect(responseBody.id).toBe(userId);
        expect(responseBody.createdAt).toBeTruthy();
    });

    test('POST /login - log in with correct credentials.', async ({ request, }) => {
        const response = await request.post(`${baseUrl}/login`, {
            headers: {
                'x-api-key': 'reqres-free-v1',
            },
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            },
        });
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.token).toBeTruthy();
    });

    test('POST /login - log in with incorrect credentials.', async ({ request, }) => {
        const response = await request.post(`${baseUrl}/login`, {
            headers: {
                'x-api-key': 'reqres-free-v1',
            },
            data: {
                email: 'eve.holt@reqres.in',
            },
        });
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe('Missing password');
    });

    test('PUT /users/{id} - update user.', async ({ request, }) => {
        const newName = 'updated name';
        const newJob = 'updated job';
        const existingUserId = 2;
        const response = await request.put(`${baseUrl}/users/${existingUserId}`, {
            headers: {
                'x-api-key': 'reqres-free-v1',
            },
            data: {
                name: newName,
                job: newJob,
            },
        });
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe(newName);
        expect(responseBody.job).toBe(newJob);
        expect(responseBody.updatedAt).toBeTruthy();
    });

    test('DELETE /users/{id} - delete user.', async ({ request, }) => {
        const existingUserId = 2;
        const response = await request.delete(
            `${baseUrl}/users/${existingUserId}`,
            {
                headers: {
                    'x-api-key': 'reqres-free-v1',
                },
            }
        );

        expect(response.status()).toBe(204);
    });

});
