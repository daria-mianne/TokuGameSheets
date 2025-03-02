import { SessionToken } from '@models/SessionToken';
import { thirtyDays } from '@util/constants';
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
}