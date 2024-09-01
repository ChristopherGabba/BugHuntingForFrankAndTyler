import {
  Instance,
  ReferenceIdentifier,
  SnapshotOut,
  castToReferenceSnapshot,
  types,
} from "mobx-state-tree"
import { api } from "../services/api"
import { Episode, EpisodeModel } from "./Episode"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const EpisodeStoreModel = types
  .model("EpisodeStore")
  .props({
    episodes: types.array(EpisodeModel),
    favorites: types.array(
      types.safeReference(EpisodeModel, {
        onInvalidated(event) {
          console.log("INVALIDATED", JSON.stringify(event, null, 4))
        },
      }),
    ),
    favoritesOnly: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchEpisodes() {
      const response = await api.getEpisodes()
      if (response.kind === "ok") {
        store.setProp("episodes", response.episodes)
      } else {
        console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      }
    },
    addFavorite(episode: Episode) {
      const bsEpisode: ReferenceIdentifier[] = ["BS_EPISODE_REFERENCE"]
      store.setProp("favorites", bsEpisode)
    },
    removeFavorite(episode: Episode) {
      store.favorites.remove(episode)
    },
  }))
  .views((store) => ({
    get episodesForList() {
      return store.favoritesOnly ? store.favorites : store.episodes
    },

    hasFavorite(episode: Episode) {
      return store.favorites.includes(episode)
    },
  }))
  .actions((store) => ({
    toggleFavorite(episode: Episode) {
      if (store.hasFavorite(episode)) {
        store.removeFavorite(episode)
      } else {
        store.addFavorite(episode)
      }
    },
  }))

export interface EpisodeStore extends Instance<typeof EpisodeStoreModel> {}
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof EpisodeStoreModel> {}
