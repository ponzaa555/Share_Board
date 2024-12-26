// query boards

import { v } from "convex/values";
import { query } from "./_generated/server";
import {getAllOrThrow} from "convex-helpers/server/relationships"

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorite : v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    console.log("args",args)
    
    if(args.favorite){
      const favoriteBoards = await ctx.db
          .query("userFavorite")
          .withIndex("by_user_org" ,(q) => 
          q
            .eq("orgId" , args.orgId)
            .eq("userId" , identity.subject)
          ).order("desc")
          .collect();

          // map boardsId
      const ids = favoriteBoards.map((b) => b.boardId);
      console.log("ids" , ids)

      const boards = await getAllOrThrow(ctx.db , ids)
      return boards.map((board) => ({
        ...board,
        isFavorite: true
      }))
    }

    let boards = []
    const title = args.search as string
    if(title){
      boards = await ctx.db
              .query("boards")
              .withSearchIndex("search_title", (q) => 
                q
                .search("title" , title)
                .eq("orgId" , args.orgId)
              ).collect();
    }else{
      boards = await ctx.db
      .query("boards") 
      .withIndex("by_org",(q) => q.eq("orgId",args.orgId))
      .order("desc")
      .collect()
    }

    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
          .query("userFavorite")
          .withIndex("by_user_board", (q) => q
              .eq("boardId" , board._id )
              .eq("userId", identity.subject)
      ).unique()
      .then((favorite) => {
        return {
          ...board,
          isFavorite : !!favorite
        }
      })       
    })

    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation)
    console.log(" boardsWithFavoriteBoolean" , boardsWithFavoriteBoolean)
    return boardsWithFavoriteBoolean
  },
});
