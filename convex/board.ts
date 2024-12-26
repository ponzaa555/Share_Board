
import {mutation, query} from "./_generated/server"
import {v} from "convex/values"


// API endpoints for boards


const images = [
    "/placeholder/1.svg",
    "/placeholder/2.svg",
    "/placeholder/3.svg",
    "/placeholder/4.svg",
    "/placeholder/5.svg",
]
export const create = mutation({
    // schema for the board
    args:{
        title: v.string(),
        orgId: v.string(),
    },
    // function to create the board
    handler: async (ctx,args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new Error("Not authorized")
        }
        const randomImage = images[Math.floor(Math.random() * images.length)]
        const board = await ctx.db.insert("boards",{
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        })
        return board
    }
})

export const remove = mutation({
    args:{id:v.id("boards")},
    handler: async (ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
        }
        // TODO late check to delete favorite as well 
        const userId = identity.subject
        const existFavorite  = await ctx.db
                                .query("userFavorite")
                                .withIndex("by_user_board",(q) => q
                                    .eq("boardId" , args.id)
                                    .eq("userId" , userId)
                                ).unique();
        if(existFavorite){
            // ไม่ต้องระบุตรางเนื่องจาก id type v.id("boards")
            await ctx.db.delete(existFavorite._id);
        }
                                    
        //normaly we would specific where table we want to delete but args:{id:v.id("boards")} this identify the table by v.id("boards")
        await ctx.db.delete(args.id);


    }
})

// API for rename board
export const update = mutation({
    args:{
        id: v.id("boards"),
        title: v.string(),
    },
    handler: async (ctx ,args) =>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
        }
        const title = args.title.trim();
        if(!title){
            throw new Error("Title is required");
        }
        if(title.length > 60){
            throw new Error("Title must be less than 60 characters");
        }
        const board = await ctx.db.patch(args.id,{
            title:args.title,
        });

        return board
    }
})

export const favorite = mutation({
    args:{id: v.id("boards") , orgId : v.string()},
    handler: async(ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if(!identity) {
            throw new Error("unAuthorize");
        }

        const board = await ctx.db.get(args.id);

        if(!board){
            throw new Error("Board not founds")
        }

        const userId = identity.subject;

        // already Favorite ?
        const existFavorite = await ctx.db.
                            query("userFavorite")
                            .withIndex("by_user_board_org",(q) => q
                            .eq("boardId" , board._id)
                            .eq("orgId" , args.orgId)
                            .eq("userId" , userId)
                        ).unique()
        if(existFavorite){
            throw new Error("Board already favorite")
        }
        
        // Add userFavorite db
        await ctx.db.insert("userFavorite", {
            userId:userId,
            orgId:args.orgId,
            boardId:board._id
        })

        return board
    }
})

export const unfavorite = mutation({
    args:{id: v.id("boards") },
    handler: async(ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if(!identity) {
            throw new Error("unAuthorize");
        }

        const board = await ctx.db.get( args.id);

        if(!board){
            throw new Error("Board not founds")
        }

        const userId = identity.subject;

        // already Favorite ?
        const existFavorite = await ctx.db.
                            query("userFavorite")
                            .withIndex("by_user_board",(q) => q
                            .eq("boardId" , board._id)
                            .eq("userId" , userId)
                        ).unique()
        if(!existFavorite){
            throw new Error("Favorite board not found")
        }
        
        // Add userFavorite db
        await ctx.db.delete(existFavorite._id);

        return board
    }
})

export const get = query({
    args:{
        id: v.id("boards")
    },
    handler : async (ctx , args) =>{
        const board = ctx.db.get(args.id);
        
        return board
    },
});