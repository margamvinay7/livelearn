"use client"
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  Search,
  ArrowLeft,
  User,
  Check,
  CheckCheck,
  Mic,
  Image as ImageIcon,
  File,
  Minimize2,
  Maximize2
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file'
}

interface ChatContact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  status: string
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<ChatContact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock chat contacts
  const chatContacts: ChatContact[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey, how are you doing?',
      lastMessageTime: '2:30 PM',
      unreadCount: 2,
      isOnline: true,
      status: 'Hey there! I am using LMS Chat'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'The course materials are ready',
      lastMessageTime: '1:45 PM',
      unreadCount: 0,
      isOnline: false,
      status: 'Available'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for the help!',
      lastMessageTime: '12:20 PM',
      unreadCount: 1,
      isOnline: true,
      status: 'In a meeting'
    },
    {
      id: '4',
      name: 'Emily Brown',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Can we schedule a call?',
      lastMessageTime: '11:15 AM',
      unreadCount: 0,
      isOnline: false,
      status: 'Busy'
    }
  ]

  // Mock messages for selected chat
  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Hey! How are you doing today?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished the React course assignment.',
      sender: 'me',
      timestamp: new Date(Date.now() - 3500000),
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      text: 'That\'s awesome! How did it go?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3400000),
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      text: 'Really well! I learned a lot about hooks and state management.',
      sender: 'me',
      timestamp: new Date(Date.now() - 3300000),
      status: 'read',
      type: 'text'
    },
    {
      id: '5',
      text: 'Great to hear! Are you ready for the next module?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3200000),
      status: 'read',
      type: 'text'
    }
  ]

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages)
      scrollToBottom()
    }
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'me',
        timestamp: new Date(),
        status: 'sent',
        type: 'text'
      }
      setMessages(prev => [...prev, message])
      setNewMessage('')
      
      // Simulate typing indicator
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        // Simulate reply
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for your message! I\'ll get back to you soon.',
          sender: 'other',
          timestamp: new Date(),
          status: 'sent',
          type: 'text'
        }
        setMessages(prev => [...prev, reply])
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Chat List Sidebar */}
      <div className={`w-80 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isMinimized ? 'w-0 overflow-hidden' : ''}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-700">Chats</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chatContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedChat(contact)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedChat?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12">
                  <Image
                    src={contact.avatar}
                    alt={contact.name}
                    fill={true}
                    className="rounded-full object-cover"
                  />
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-blue-700 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{contact.lastMessage}</p>
                </div>
                {contact.unreadCount > 0 && (
                  <div className="flex-shrink-0">
                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {contact.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="relative w-10 h-10">
                    <Image
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      fill={true}
                      className="rounded-full object-cover"
                    />
                    {selectedChat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-blue-700">{selectedChat.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedChat.isOnline ? 'Online' : selectedChat.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Search className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                        message.sender === 'me'
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-white text-blue-700 rounded-bl-md border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {message.sender === 'me' && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-blue-700 rounded-2xl rounded-bl-md border border-gray-200 px-4 py-2 shadow-sm">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  {/* Attachment Menu */}
                  {showAttachmentMenu && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ImageIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <File className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
                
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Smile className="w-5 h-5 text-gray-600" />
                </button>
                
                {newMessage.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 hover:bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                ) : (
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Mic className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Welcome to LMS Chat</h2>
              <p className="text-gray-600 mb-6">Select a chat to start messaging</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Offline</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Minimize/Maximize Button */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors z-50"
      >
        {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
      </button>
    </div>
  )
}
