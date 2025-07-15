"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Users, Copy, Check } from "lucide-react"

interface Message {
  id: string
  username: string
  content: string
  timestamp: Date
  isOwn: boolean
}

interface ChatRoomPageProps {
  params: {
    roomId: string
  }
}

export default function ChatRoomPage({ params }: ChatRoomPageProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [username, setUsername] = useState("")
  const [isCreator, setIsCreator] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get username and creator status from URL parameters
    const usernameParam = searchParams.get("username")
    const creatorParam = searchParams.get("creator")

    if (usernameParam) setUsername(usernameParam)
    if (creatorParam === "true") setIsCreator(true)

    // Add some sample messages for demonstration
    setMessages([
      {
        id: "1",
        username: "System",
        content: `Welcome to room: ${params.roomId}`,
        timestamp: new Date(),
        isOwn: false,
      },
    ])
  }, []) //  ✅ run only once

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        username: username,
        content: newMessage,
        timestamp: new Date(),
        isOwn: true,
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(params.roomId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy room ID")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Leave Room
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Room: {params.roomId}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />1 online
                </Badge>
                {isCreator && <Badge variant="outline">Creator</Badge>}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={copyRoomId} className="flex items-center gap-2 bg-transparent">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Room ID"}
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Chat Messages</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? "bg-blue-500 text-white"
                          : message.username === "System"
                            ? "bg-gray-100 text-gray-600 text-center"
                            : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {!message.isOwn && message.username !== "System" && (
                        <div className="text-xs font-medium mb-1">{message.username}</div>
                      )}
                      <div className="text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
