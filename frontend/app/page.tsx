"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Plus, Users } from "lucide-react"

export default function HomePage() {
  const [roomId, setRoomId] = useState("")
  const [newRoomName, setNewRoomName] = useState("")
  const [username, setUsername] = useState("")
  const router = useRouter()

  const handleJoinRoom = () => {
    if (roomId.trim() && username.trim()) {
      // Navigate to the room with username as query parameter
      router.push(`/room/${roomId}?username=${encodeURIComponent(username)}`)
    }
  }

  const handleCreateRoom = () => {
    if (newRoomName.trim() && username.trim()) {
      // Generate a simple room ID (in real app, this would be handled by backend)
      const generatedRoomId = newRoomName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now()
      router.push(`/room/${generatedRoomId}?username=${encodeURIComponent(username)}&creator=true`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Chat Rooms</CardTitle>
          <CardDescription>Join an existing room or create a new one to start chatting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                id="username"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <Tabs defaultValue="join" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="join" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Join Room
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Room
              </TabsTrigger>
            </TabsList>

            <TabsContent value="join" className="space-y-4">
              <div>
                <label htmlFor="roomId" className="block text-sm font-medium mb-2">
                  Room ID
                </label>
                <Input
                  id="roomId"
                  placeholder="Enter room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </div>
              <Button onClick={handleJoinRoom} className="w-full" disabled={!roomId.trim() || !username.trim()}>
                Join Room
              </Button>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <div>
                <label htmlFor="newRoomName" className="block text-sm font-medium mb-2">
                  Room Name
                </label>
                <Input
                  id="newRoomName"
                  placeholder="Enter room name"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateRoom} className="w-full" disabled={!newRoomName.trim() || !username.trim()}>
                Create Room
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
