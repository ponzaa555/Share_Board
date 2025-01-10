import { useSelf , useMutation } from "@liveblocks/react";


export const useDeleteLayer = () =>
{
    const selection = useSelf((me) => me.presence.selection)

    return useMutation((
        {storage , setMyPresence},

    ) => {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");

        for(const id of selection!){
            liveLayers.delete(id);

            const index = liveLayerIds.indexOf(id);
            if(index !== -1){
                //it exist in array
                liveLayerIds.delete(index)
            }
        }

        setMyPresence({selection:[]} ,{addToHistory : true})
    },[selection])
}