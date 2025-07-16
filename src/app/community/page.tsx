"use client"
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { 
  Hash, 
  Volume2, 

  Plus, 
  Search, 
  MoreVertical, 
  UserPlus, 
  Shield, 
  Crown,
  Mic,
  MicOff,
 
  HeadphoneOff,
  Users,
  MessageCircle,
  Bell,

  Pin,
  FileText,
  Image as ImageIcon,
  Send,
  Smile,
  Paperclip,
 
  
  Minimize2,
  Maximize2,
  GraduationCap,
  TrendingUp
} from 'lucide-react'

interface Server {
  id: string
  name: string
  icon: string
  isActive: boolean
  memberCount: number
  description: string
}

interface Channel {
  id: string
  name: string
  type: 'text' | 'voice'
  memberCount?: number
  isActive: boolean
  hasUnread: boolean
  lastMessage?: string
  lastMessageTime?: string
}

interface Member {
  id: string
  name: string
  avatar: string
  status: 'online' | 'idle' | 'dnd' | 'offline'
  role: 'owner' | 'admin' | 'moderator' | 'member'
  isSpeaking?: boolean
  isMuted?: boolean
  isDeafened?: boolean
}

interface Message {
  id: string
  text: string
  sender: Member
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file'
}

export default function CommunityPage() {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showMemberList, setShowMemberList] = useState(true)
  const [showServerList, setShowServerList] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock servers
  const servers: Server[] = [
    {
      id: '1',
      name: 'LMS Community',
      icon: '🎓',
      isActive: true,
      memberCount: 1247,
      description: 'Main community for all LMS users'
    },
    {
      id: '2',
      name: 'React Developers',
      icon: '⚛️',
      isActive: false,
      memberCount: 892,
      description: 'React and frontend development discussions'
    },
    {
      id: '3',
      name: 'Design Hub',
      icon: '🎨',
      isActive: false,
      memberCount: 456,
      description: 'UI/UX design and creative discussions'
    },
    {
      id: '4',
      name: 'Study Group',
      icon: '📚',
      isActive: false,
      memberCount: 234,
      description: 'Study sessions and academic support'
    },
    {
      id: '5',
      name: 'Gaming Zone',
      icon: '🎮',
      isActive: false,
      memberCount: 567,
      description: 'Gaming and entertainment discussions'
    }
  ]

  // Mock channels for LMS Community
  const channels: Channel[] = [
    {
      id: '1',
      name: 'general',
      type: 'text',
      isActive: true,
      hasUnread: false,
      lastMessage: 'Welcome to the LMS Community!',
      lastMessageTime: '2:30 PM'
    },
    {
      id: '2',
      name: 'announcements',
      type: 'text',
      isActive: false,
      hasUnread: true,
      lastMessage: 'New course available: Advanced React',
      lastMessageTime: '1:45 PM'
    },
    {
      id: '3',
      name: 'help-support',
      type: 'text',
      isActive: false,
      hasUnread: false,
      lastMessage: 'How do I reset my password?',
      lastMessageTime: '12:20 PM'
    },
    {
      id: '4',
      name: 'voice-chat',
      type: 'voice',
      memberCount: 3,
      isActive: false,
      hasUnread: false
    },
    {
      id: '5',
      name: 'study-sessions',
      type: 'voice',
      memberCount: 0,
      isActive: false,
      hasUnread: false
    },
    {
      id: '6',
      name: 'course-discussions',
      type: 'text',
      isActive: false,
      hasUnread: true,
      lastMessage: 'Great discussion about hooks!',
      lastMessageTime: '11:15 AM'
    }
  ]

  // Mock members
  const members: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      role: 'owner'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      role: 'admin',
      isSpeaking: true
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'idle',
      role: 'moderator'
    },
    {
      id: '4',
      name: 'Emily Brown',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      role: 'member'
    },
    {
      id: '5',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'dnd',
      role: 'member',
      isMuted: true
    },
    {
      id: '6',
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'offline',
      role: 'member'
    }
  ]

  // Mock messages
  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Welcome everyone to the LMS Community! 🎉',
      sender: members[0],
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      text: 'Thanks for having us! Excited to be part of this community.',
      sender: members[1],
      timestamp: new Date(Date.now() - 3500000),
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      text: 'Anyone working on the React course? I have some questions about hooks.',
      sender: members[3],
      timestamp: new Date(Date.now() - 3400000),
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      text: 'I just finished the hooks section! What specific questions do you have?',
      sender: members[2],
      timestamp: new Date(Date.now() - 3300000),
      status: 'read',
      type: 'text'
    },
    {
      id: '5',
      text: 'The useEffect hook is giving me trouble. How do you handle cleanup functions?',
      sender: members[3],
      timestamp: new Date(Date.now() - 3200000),
      status: 'read',
      type: 'text'
    }
  ]

  useEffect(() => {
    if (selectedChannel) {
      setMessages(mockMessages)
      scrollToBottom()
    }
  }, [selectedChannel])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChannel) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: members[0], // Current user
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
          text: 'Great question! Let me help you with that.',
          sender: members[1],
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

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case 'sent':
  //       return <Check className="w-4 h-4 text-gray-400" />
  //     case 'delivered':
  //       return <CheckCheck className="w-4 h-4 text-gray-400" />
  //     case 'read':
  //       return <CheckCheck className="w-4 h-4 text-blue-500" />
  //     default:
  //       return null
  //   }
  // }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'idle':
        return 'bg-yellow-500'
      case 'dnd':
        return 'bg-red-500'
      case 'offline':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-500" />
      case 'admin':
        return <Shield className="w-4 h-4 text-red-500" />
      case 'moderator':
        return <Shield className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Community</h1>
        <p className="text-gray-600">Connect with fellow learners and instructors in our vibrant community.</p>
      </div>

      <div className="flex gap-6">
        {/* Server List */}
        <div className={`w-80 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col transition-all duration-300 ${showServerList ? '' : 'w-0 overflow-hidden'}`}>
          {/* Server List Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-blue-700">Communities</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Server List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {servers.map((server) => (
                <div
                  key={server.id}
                  onClick={() => setSelectedServer(server)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    server.isActive 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                      server.isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {server.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-blue-700 truncate">{server.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{server.description}</p>
                      <div className="flex items-center mt-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500 ml-1">{server.memberCount} members</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {selectedServer ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-200px)]">
              {/* Server Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-xl text-white">
                      {selectedServer.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-blue-700">{selectedServer.name}</h2>
                      <p className="text-sm text-gray-600">{selectedServer.memberCount} members</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Bell className="w-5 h-5 text-gray-600" />
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

              <div className="flex flex-1 overflow-hidden">
                {/* Channel List */}
                <div className="w-64 border-r border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Channels</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2">
                    <div className="space-y-1">
                      {channels.map((channel) => (
                        <div
                          key={channel.id}
                          onClick={() => setSelectedChannel(channel)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            channel.isActive 
                              ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                          }`}
                        >
                          {channel.type === 'text' ? (
                            <Hash className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">{channel.name}</span>
                          {channel.hasUnread && (
                            <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
                          )}
                          {channel.type === 'voice' && channel.memberCount !== undefined && (
                            <span className="text-xs text-gray-500 ml-auto">{channel.memberCount}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {selectedChannel ? (
                    <>
                      {/* Channel Header */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {selectedChannel.type === 'text' ? (
                              <Hash className="w-5 h-5 text-gray-600" />
                            ) : (
                              <Volume2 className="w-5 h-5 text-gray-600" />
                            )}
                            <h3 className="text-lg font-semibold text-blue-700">{selectedChannel.name}</h3>
                            {selectedChannel.type === 'voice' && (
                              <span className="text-sm text-gray-500">({selectedChannel.memberCount} members)</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Bell className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Pin className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Users className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-1 flex overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4">
                          <div className="space-y-4">
                            {messages.map((message) => (
                              <div key={message.id} className="flex  items-start space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                                <div className='relative w-10 h-10'>
                                <Image
                                  src={message.sender.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                                  alt={message.sender.name}
                                  fill={true}
                                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-blue-700">{message.sender.name}</span>
                                    {getRoleIcon(message.sender.role)}
                                    <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                                  </div>
                                  <p className="text-gray-700 mt-1">{message.text}</p>
                                </div>
                              </div>
                            ))}
                            
                            {/* Typing Indicator */}
                            {isTyping && (
                              <div className="flex  items-start space-x-3 p-3">
                                <div className='relative w-10 h-10'>
                                <Image
                                  src={members[1].avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                                  alt={members[1].name}
                                  fill={true}
                                  className="object-cover rounded-full flex-shrink-0"
                                />
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                  </div>
                                  <span className="text-sm text-gray-500 ml-2">typing...</span>
                                </div>
                              </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                          </div>
                        </div>

                        {/* Member List */}
                        {showMemberList && (
                          <div className="w-64 border-l border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Members — {members.length}</h3>
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <UserPlus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              {members.map((member) => (
                                <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                  <div className="relative w-8 h-8">
                                    <Image
                                      src={member.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                                      alt={member.name}
                                      fill={true}
                                      className="w-8 h-8 rounded-full"
                                    />
                                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} border-2 border-white rounded-full`}></div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-1">
                                      <span className="text-sm font-medium text-blue-700 truncate">{member.name}</span>
                                      {getRoleIcon(member.role)}
                                    </div>
                                    <p className="text-xs text-gray-500 capitalize">{member.status}</p>
                                  </div>
                                  {member.isSpeaking && (
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  )}
                                  {member.isMuted && (
                                    <MicOff className="w-4 h-4 text-red-500" />
                                  )}
                                  {member.isDeafened && (
                                    <HeadphoneOff className="w-4 h-4 text-red-500" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Message Input */}
                      {selectedChannel.type === 'text' && (
                        <div className="p-4 border-t border-gray-200">
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
                                      <FileText className="w-5 h-5 text-gray-600" />
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
                                placeholder={`Message #${selectedChannel.name}`}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
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
                                className="p-2 bg-blue-500 hover:bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-colors"
                              >
                                <Send className="w-5 h-5" />
                              </button>
                            ) : (
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Mic className="w-5 h-5 text-gray-600" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Welcome Screen */
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <MessageCircle className="w-12 h-12 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">Welcome to {selectedServer.name}</h2>
                        <p className="text-gray-600 mb-6">Select a channel to start chatting with the community</p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Online</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Idle</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Do Not Disturb</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Welcome Screen */
            <div className="flex-1 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-12 h-12 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">Welcome to Community</h2>
                <p className="text-gray-600 mb-6">Select a community to start connecting with fellow learners</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-700">Connect</h3>
                    <p className="text-sm text-gray-600">Join communities of learners</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-700">Chat</h3>
                    <p className="text-sm text-gray-600">Discuss topics and ask questions</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-700">Learn</h3>
                    <p className="text-sm text-gray-600">Grow together with peers</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Toggle Buttons */}
      <div className="lg:hidden fixed bottom-4 right-4 flex space-x-2 z-50">
        <button
          onClick={() => setShowServerList(!showServerList)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors"
        >
          {showServerList ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setShowMemberList(!showMemberList)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors"
        >
          <Users className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}