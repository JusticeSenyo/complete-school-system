"use client"

import { useEffect, useState } from "react"

interface Teacher {
  id: string
  name: string
  subject: string
  email: string
  phone: string
  avatar: string
  availability: string
}

interface Child {
  id: string
  name: string
  grade: string
  class: string
}

interface Message {
  id: string
  teacherId: string
  teacherName: string
  subject: string
  message: string
  response?: string
  date: string
  status: "sent" | "read" | "replied"
}

export default function ParentContactPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedChild, setSelectedChild] = useState<string>("")
  const [selectedTeacher, setSelectedTeacher] = useState<string>("")
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedChild) {
      fetchTeachers(selectedChild)
    }
  }, [selectedChild])

  const fetchData = async () => {
    try {
      const [childrenResponse, messagesResponse] = await Promise.all([
        fetch("/api/parent/children"),
        fetch("/api/parent/messages"),
      ])

      if (childrenResponse.ok && messagesResponse.ok) {
        const childrenData = await childrenResponse.json()
        const messagesData = await messagesResponse.json()

        setChildren(childrenData.children)
        setMessages(messagesData.messages)

        if (childrenData.children.length > 0) {
          setSelectedChild(childrenData.children[0].id)
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      // Mock data
      const mockChildren = [
        { id: "1", name: "Emma Smith", grade: "Grade 10", class: "10A" },
        { id: "2", name: "James Smith", grade: "Grade 8", class: "8B" },
      ]
      setChildren(mockChildren)
      setSelectedChild(mockChildren[0].id)
      setMessages([
        {
          id: "1",
          teacherId: "1",
          teacherName: "Mr. Johnson",
          subject: "Mathematics Progress",
          message: "I wanted to discuss Emma's recent improvement in algebra. She's showing great progress!",
          response: "Thank you for the update! We're very proud of her hard work.",
          date: "2024-01-18",
          status: "replied",
        },
        {
          id: "2",
          teacherId: "2",
          teacherName: "Dr. Smith",
          subject: "Lab Safety Reminder",
          message: "Please remind Emma to bring her safety goggles for tomorrow's chemistry lab.",
          date: "2024-01-17",
          status: "read",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchTeachers = async (childId: string) => {
    try {
      const response = await fetch(`/api/parent/teachers/${childId}`)
      if (response.ok) {
        const data = await response.json()
        setTeachers(data.teachers)
      }
    } catch (error) {
      console.error("Error fetching teachers:", error)
      // Mock data
      setTeachers([
        {
          id: "1",
          name: "Mr. Johnson",
          subject: "Mathematics",
          email: "johnson@school.com",
          phone: "(555) 123-4567",
          avatar: "/placeholder.svg?height=40&width=40",
          availability: "Mon-Fri 2:00-4:00 PM",
        },
        {
          id: "2",
          name: "Dr. Smith",
          subject: "Physics",
          email: "smith@school.com",
          phone: "(555) 234-5678",
          avatar: "/placeholder.svg?height=40&width=40",
          availability: "Mon-Wed 3:00-5:00 PM",
        },
        {
          id: "3",
          name: "Ms. Davis",
          subject: "English",
          email: "davis@school.com",
          phone: "(555) 345-6789",
          avatar: "/placeholder.svg?height=40&width=40",
          availability: "Tue-Thu 1:00-3:00 PM",
        },
        {
          id: "4",
          name: "Dr. Wilson",
          subject: "Chemistry",
          email: "wilson@school.com",
          phone: "(555) 456-7890",
          avatar: "/placeholder.svg?height=40&width=40",
          availability: "Mon-Fri 2:30-4:30 PM",
        },
      ])
    }
  }

  const sendMessage = async () => {
    if (!selectedTeacher || !messageSubject || !messageContent) return

    setSending(true)
    try {
      const response = await fetch("/api/parent/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: selectedTeacher,
          childId: selectedChild,
          subject: messageSubject,
          message: messageContent,
        }),
      })

      if (response.ok) {
        // Reset form
        setSelectedTeacher("")
        setMessageSubject("")
        setMessageContent("")
        // Refresh messages
        fetchData()
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSending(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-yellow-100 text-yellow-800"
      case "replied":
        return "bg-green-100 text-green-800"
      default:\
        return "bg
