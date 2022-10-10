import { start } from "../out";

describe('App', () => {
    describe('start', () => {
        it('start should be app object.', () => {
            start({
                port: 3523,
                websiteDirectory: __dirname,
            }).then(app => {
                expect(app).not.toBeNull();
            });
        });
    });
});
