import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { sendMail } from '../lib/Mailer';
import { User } from '../entity';
import { toLower } from 'lodash';

export default class UserController {
    private static userRepository: Repository<User>;

    constructor() {
        UserController.userRepository = getRepository(User);
    }

    // Get ALL user
    static all = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User);
        return await userRepository
            .find()
            .then(result => response.json(result).status(200))
            .catch(error => response.status(500).json(error));
    };
    // Get user by id
    static one = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User);
        return await userRepository
            .findOne({
                where: { uuid: request.params.id },
                relations: ['plants'],
            })
            .then(result => {
                return response.json(result).status(200);
            })
            .catch(error => {
                return response.status(500).json(error);
            });
    };
    // Get user by id
    static checkUserInfo = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User, process.env.APP_ENV);
        console.log(request.user);
        return await userRepository
            .findOne({
                where: { uuid: (request.user as any).uuid },
            })
            .then(result => {
                return response.json(result).status(200);
            })
            .catch(error => {
                return response.status(500).json(error);
            });
    };
    // Get Post user
    static post = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const { firstName, lastName, email, password } = request.body;
        console.log(request.body);
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = toLower(email);
        user.password = password;
        user.password = user.hashPassword();
        const token = jwt.sign(
            {
                firstName,
                email,
            },
            `${process.env.jwtSecret as string}`,
        );
        return await getRepository(User, process.env.APP_ENV)
            .save(user)
            .then(async () => {
                return await sendMail(
                    user,
                    'Welcome to Scanny Plant App',
                    `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
p { display:block;margin:13px 0; }</style><!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if lte mso 11]>
    <style type="text/css">
        .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
    }</style><style type="text/css">@media only screen and (max-width:480px) {
        table.mj-full-width-mobile { width: 100% !important; }
        td.mj-full-width-mobile { width: auto !important; }
    }</style></head><body style="background-color:#ffffff;"><div style="background-color:#ffffff;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:600px;"><img alt="" height="auto" src="https://i.ibb.co/6gVWQ2s/image.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600"></td></tr></tbody></table></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#22577a;background-color:#22577a;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#22577a;background-color:#22577a;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#22577a;background-color:#22577a;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#22577a;background-color:#22577a;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%"><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:22px;line-height:1;text-align:left;color:#ffffff;"><span style="color:#57cc99">Dear ${user.firstName} ${user.lastName}</span><br><br>Welcome to SCANNYPLANT APP.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:left;color:#ffffff;"></div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:left;color:#ffffff;">Thanks,<br>The ScannyPlant Team</div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`,
                )
                    .then(() => {
                        return response.json({ meta: { token } }).status(200);
                    })
                    .catch((err: Error) => {
                        return response.json({ err }).status(500);
                    });
            })
            .catch(error => {
                return response.status(500).json({
                    error: request.statusCode,
                    message: error.message,
                });
            });
    };
    // verifier afta
    // Get Delete by user
    static deleteUser = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User, process.env.APP_ENV);
        const user = await userRepository.findOne({ uuid: request.params.id });
        return await userRepository
            .remove(user as User)
            .then((result: User) => {
                return response.json(result).status(200);
            })
            .catch((err: Error) => {
                return response.status(500).json(err);
            });
    };
    // Verifier afta
    static update = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User, process.env.APP_ENV);
        const { firstName, lastName, email } = request.body;
        return await userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                firstName,
                lastName,
                email,
            })
            .where({ uuid: request.params.id })
            .returning('*')
            .execute()
            .then(result => {
                console.log('returning', result);
                return response.status(200).json({
                        uuid: result.raw[0].uuid,
                        firstName: result.raw[0].firstName,
                        lastName: result.raw[0].lastName,
                        email: result.raw[0].email,
                        createdAt: result.raw[0].createdAt,
                        updatedAt: result.raw[0].updatedAt,
                });
            })
            .catch(err => {
                return response.status(500).json(err);
            });
    };
    // Post reset password user
    static resetPassword = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User, process.env.APP_ENV);
        const { password, passwordConfirm } = request.body;
        console.log(request.body)
        console.log(request.user)
        if (password === passwordConfirm) {
            const userTemps = new User();
            userTemps.password = password;
            userTemps.password = userTemps.hashPassword();
            const { user } = request as any;
            return await userRepository
                .createQueryBuilder()
                .update(User)
                .set({
                    password: userTemps.password,
                })
                .where({
                    uuid: user.uuid,
                })
                .execute()
                .then(() => {
                    const token = jwt.sign(
                        {
                            uuid: user.uuid,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        },
                        `${process.env.jwtSecret as string}`,
                        { expiresIn: '1h' },
                    );
                    return response.status(200).json({ meta: { token } });
                })
                .catch((err: Error) => {
                    return response.status(500).json(err);
                });
        } else {
            return response
                .status(500)
                .json({ error: 'password don\'t match with passwordConfirm' });
        }
    };
}
