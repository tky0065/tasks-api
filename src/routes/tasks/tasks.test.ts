import {describe, expect, expectTypeOf, it} from 'vitest'

import router from "@/routes/tasks/tasks.index";
import createApp, {createTestApp} from "@/lib/create-app";
import { testClient } from 'hono/testing'

describe('Tasks List', () => {

    it('response should be an array', async () => {
       const testRouter= createTestApp(router);
        const response = await testRouter.request("/tasks");
        const result = await response.json();
       // @ts-expect-error
        expectTypeOf(result).toBeArray();

    });


    it('response should be an array again from cleint', async () => {
        const client = testClient(createApp().route("/",router));

        const response = await client.tasks.$get();
        const result = await response.json();
        expectTypeOf(result).toBeArray();

    });

    it('It should be a valid param', async () => {

        const client = testClient(createApp().route("/",router));

        const response = await client.tasks[":id"].$get({
            param:{
                id:"zzz"
            }
        });

       expect(response.status).toBe(422);

    });

    it('It should be a valid body', async () => {

        const client = testClient(createApp().route("/",router));

        const response = await client.tasks.$post({
            // @ts-expect-error
            json:{
                title : "learn testing api"
            }
        });

        expect(response.status).toBe(422);

    });
})
