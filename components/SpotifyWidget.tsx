'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Music, Headphones, ListMusic, Clock, User } from 'lucide-react'

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const REDIRECT_URI = 'http://localhost:3000/callback'
const SCOPES = ['user-top-read', 'playlist-read-private', 'user-read-recently-played']

interface Track {
  id: string
  name: string
  artists: string[]
  album: string
  image: string
}

interface Playlist {
  id: string
  name: string
  image: string
  trackCount: number
}

export function SpotifyWidget() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [topTracks, setTopTracks] = useState<Track[]>([])
  const [recentTracks, setRecentTracks] = useState<Track[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token')
    const expiry = localStorage.getItem('spotify_token_expiry')

    if (token && expiry && parseInt(expiry) > Date.now()) {
      setAccessToken(token)
    }
  }, [])

  useEffect(() => {
    if (accessToken) {
      fetchUserData()
    }
  }, [accessToken])

  const login = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&response_type=token&show_dialog=true`
  }

  const logout = () => {
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_token_expiry')
    setAccessToken(null)
    setTopTracks([])
    setRecentTracks([])
    setPlaylists([])
  }

  const fetchUserData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [topTracksData, recentTracksData, playlistsData] = await Promise.all([
        fetchTopTracks(),
        fetchRecentTracks(),
        fetchPlaylists()
      ])
      setTopTracks(topTracksData)
      setRecentTracks(recentTracksData)
      setPlaylists(playlistsData)
    } catch (err) {
      setError('Failed to fetch Spotify data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTopTracks = async (): Promise<Track[]> => {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    if (!response.ok) throw new Error('Failed to fetch top tracks')
    const data = await response.json()
    return data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artists: item.artists.map((artist: any) => artist.name),
      album: item.album.name,
      image: item.album.images[0].url
    }))
  }

  const fetchRecentTracks = async (): Promise<Track[]> => {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    if (!response.ok) throw new Error('Failed to fetch recent tracks')
    const data = await response.json()
    return data.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artists: item.track.artists.map((artist: any) => artist.name),
      album: item.track.album.name,
      image: item.track.album.images[0].url
    }))
  }

  const fetchPlaylists = async (): Promise<Playlist[]> => {
    const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=10', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    if (!response.ok) throw new Error('Failed to fetch playlists')
    const data = await response.json()
    return data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.images[0]?.url || '/placeholder.svg?height=300&width=300',
      trackCount: item.tracks.total
    }))
  }

  const renderTracks = (tracks: Track[], title: string) => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-4">
          {tracks.map((track, index) => (
            <motion.div
              key={`${track.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-4"
            >
              <img src={track.image} alt={track.name} className="w-16 h-16 rounded-md" />
              <div>
                <p className="font-semibold">{track.name}</p>
                <p className="text-sm text-muted-foreground">{track.artists.join(', ')}</p>
                <p className="text-xs text-muted-foreground">{track.album}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )

  const renderPlaylists = () => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Your Playlists</h3>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {playlists.map((playlist, index) => (
            <motion.div
              key={`${playlist.id}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <img src={playlist.image} alt={playlist.name} className="w-32 h-32 rounded-md shadow-md" />
              <p className="mt-2 text-sm font-semibold text-center">{playlist.name}</p>
              <p className="text-xs text-muted-foreground">{playlist.trackCount} tracks</p>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <Card className="bg-card text-card-foreground h-[calc(100vh-120px)] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-3xl font-bold">
          <div className="flex items-center space-x-2">
            <Music className="mr-2 text-primary" />
            <span>Spotify Explorer</span>
          </div>
          <div className="flex items-center">
            <Button onClick={logout} variant="outline" className="ml-4">
              Log out
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-y-auto">
        {!accessToken ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Headphones className="w-24 h-24 text-primary mb-4" />
            <Button onClick={login} size="lg">
              Connect to Spotify
            </Button>
          </div>
        ) : (
          <>
            {loading && <p className="text-center mt-4">Loading your Spotify data...</p>}
            {error && <p className="text-center mt-4 text-destructive">{error}</p>}
            {!loading && !error && (
              <>
                <Tabs defaultValue="top-tracks" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="top-tracks">
                      <ListMusic className="mr-2 h-4 w-4" />
                      Top Tracks
                    </TabsTrigger>
                    <TabsTrigger value="recent-tracks">
                      <Clock className="mr-2 h-4 w-4" />
                      Recent Tracks
                    </TabsTrigger>
                    <TabsTrigger value="playlists">
                      <User className="mr-2 h-4 w-4" />
                      Playlists
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="top-tracks">
                    {renderTracks(topTracks, 'Your Top Tracks')}
                  </TabsContent>
                  <TabsContent value="recent-tracks">
                    {renderTracks(recentTracks, 'Your Recently Played')}
                  </TabsContent>
                  <TabsContent value="playlists">
                    {renderPlaylists()}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
