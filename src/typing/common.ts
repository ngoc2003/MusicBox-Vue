export interface ImageType {
  width: number
  height: number
  url: string
}

export interface CommonType {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface AlbumType extends CommonType {
  collaborative: boolean
  description: string
  images: ImageType[]
  owner: { display_name: string; external_urls: { spotify: string } }
  primary_color: string | null
  public: boolean | null
  snapshot_id: string
}

export interface TrackType {
  added_at: string
  added_by: CommonType
  is_local: boolean
  primary_color: null
  track: CommonType &
    ExtendsInformation & {
      album: CommonType & {
        album_type: string
        artists: CommonType[]
        available_markets: string[]
        images: ImageType[]
        release_date: string
        release_date_precision: string
        total_tracks: number
      }
      artists: CommonType[]
      episode: boolean
      external_ids: {
        isrc: string
      }
      popularity: number
      track: boolean
    }
  video_thumbnail: {
    url: null
  }
}

export interface ExtendsInformation {
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  is_local: boolean
  preview_url: string
  track_number: 11
}
