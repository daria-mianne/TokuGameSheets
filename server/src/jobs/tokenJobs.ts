import { Invitation } from '@models';
import { SessionToken } from '@models/SessionToken';
import { oneHour, thirtyDays } from '@util/constants';
import cron from 'node-cron';
import { Op } from 'sequelize';

export const initTokenJobs = () => {
    cron.schedule('0 7 * * *', async () => {
        SessionToken.destroy({
            where: {
                createdAt: {
                    [Op.lte]: new Date(Date.now() - thirtyDays),
                },
            },
        });
    });

    cron.schedule('0 8 * * *', async () => {
        Invitation.destroy({
            where: {
                deletedAt: {
                    [Op.lte]: new Date(Date.now() - oneHour),
                },
            },
        });
    });
};
