import { Context, Next } from "hono";
import { jwt } from "hono/jwt";

export const jwtMiddleWare = async (c:Context,next:Next) => {
    const jwtHandler = jwt({
        secret : c.env.JWT_SECRET,
        cookie : 'token'
    });
    await jwtHandler(c,next);
}