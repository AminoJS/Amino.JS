require('../helpers/loadEnv');

describe('how the methods should response (With NO false input)', () => {
    it('should return the user\'s personal information like UID, username and icon', async () => {
        const Amino = require('../../index');
        const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
        const getMyProfile = await Amino.getJoinedComs();
        expect(getMyProfile.status).toBe('ok');
        expect(getMyProfile.error).toBeNull();
    });
});