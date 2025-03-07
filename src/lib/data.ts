import type { PipelineData } from "@/types/job-pipline/pipeline";

export const pipelineData: PipelineData = {
  totalCandidates: 5,
  stages: [
    {
      id: "all",
      label: "All",
      count: 5,
      candidates: [
        {
          id: "1",
          name: "Guy Hawkins",
          email: "jeandoe@mail.com",
          avatar: "/placeholder.svg",
          title: "Senior Java Developer",
          status: "Tagged",
          expPayRate: "$65/Hr",
          dateAdded: "20 Oct 2023",
          source: "Pool",
          views: 3,
          matchPercentage: 80,
          skills: ["Java", ".Net", "SQL", "+5"],
          jobId: "1234",
          jobType: "Remote",
          city: "New York"
        },
        // {
        //   id: "2",
        //   name: "Ronald Richards",
        //   email: "jeandoe@mail.com",
        //   avatar: "/placeholder.svg",
        //   title: "Senior Java Developer",
        //   status: "Applied",
        //   expPayRate: "$65/Hr",
        //   dateAdded: "20 Oct 2023",
        //   source: "Pool",
        //   views: 3,
        //   matchPercentage: 80,
        //   skills: ["Java", ".Net", "SQL", "+5"],
        //   jobId: "1234",
        //   jobType: "Remote",
        //   city: "New York"
        // },
        // {
        //   id: "3",
        //   name: "Devon Lane",
        //   email: "jeandoe@mail.com",
        //   avatar: "/placeholder.svg",
        //   title: "Senior Java Developer",
        //   status: "Applied",
        //   expPayRate: "$65/Hr",
        //   dateAdded: "20 Oct 2023",
        //   source: "Pool",
        //   views: 3,
        //   matchPercentage: 80,
        //   skills: ["Java", ".Net", "SQL", "+5"],
        //   jobId: "1234",
        //   jobType: "Remote",
        //   city: "New York"
        // },
        // {
        //   id: "4",
        //   name: "Hope Doe",
        //   email: "Esther Howard",
        //   avatar: "/placeholder.svg",
        //   title: "Senior Java Developer",
        //   status: "Interview",
        //   expPayRate: "$65/Hr",
        //   dateAdded: "20 Oct 2023",
        //   source: "Pool",
        //   views: 3,
        //   matchPercentage: 80,
        //   skills: ["Java", ".Net", "SQL", "+5"],
        //   jobId: "1234",
        //   jobType: "Remote",
        //   city: "New York"
        // },
        // {
        //   id: "5",
        //   name: "Brooklyn Simmons",
        //   email: "jeandoe@mail.com",
        //   avatar: "/placeholder.svg",
        //   title: "Senior Java Developer",
        //   status: "Submitted to Client",
        //   expPayRate: "$65/Hr",
        //   dateAdded: "20 Oct 2023",
        //   source: "Pool",
        //   views: 3,
        //   matchPercentage: 80,
        //   skills: ["Java", ".Net", "SQL", "+5"],
        //   jobId: "1234",
        //   jobType: "Remote",
        //   city: "New York"
        // }
      ]
    },
    // {
    //   id: "submitted",
    //   label: "Submitted to Client",
    //   count: 2,
    //   candidates: [
    //     {
    //       id: "6",
    //       name: "Cody Fisher",
    //       email: "jeandoe@mail.com",
    //       avatar: "/placeholder.svg",
    //       title: "Senior Java Developer",
    //       status: "Submitted to Client",
    //       expPayRate: "$65/Hr",
    //       dateAdded: "20 Oct 2023",
    //       source: "Pool",
    //       views: 3,
    //       matchPercentage: 80,
    //       skills: ["Java", ".Net", "SQL"],
    //       jobId: "1234",
    //       jobType: "Remote",
    //       city: "New York"
    //     },
    //     {
    //       id: "7",
    //       name: "Arlene McCoy",
    //       email: "jeandoe@mail.com",
    //       avatar: "/placeholder.svg",
    //       title: "Senior Java Developer",
    //       status: "Submitted to Client",
    //       expPayRate: "$65/Hr",
    //       dateAdded: "20 Oct 2023",
    //       source: "Pool",
    //       views: 3,
    //       matchPercentage: 80,
    //       skills: ["Java", ".Net", "SQL"],
    //       jobId: "1234",
    //       jobType: "Remote",
    //       city: "New York"
    //     }
    //   ]
    // },
    // {
    //   id: "first-round",
    //   label: "First Round",
    //   count: 2,
    //   candidates: [
    //     {
    //       id: "8",
    //       name: "Marvin McKinney",
    //       email: "jeandoe@mail.com",
    //       avatar: "/placeholder.svg",
    //       title: "Senior Java Developer",
    //       status: "First Round",
    //       expPayRate: "$65/Hr",
    //       dateAdded: "20 Oct 2023",
    //       source: "Pool",
    //       views: 3,
    //       matchPercentage: 80,
    //       skills: ["Java", ".Net", "SQL"],
    //       jobId: "1234",
    //       jobType: "Remote",
    //       city: "New York"
    //     },
    //     {
    //       id: "9",
    //       name: "Kristin Watson",
    //       email: "jeandoe@mail.com",
    //       avatar: "/placeholder.svg",
    //       title: "Senior Java Developer",
    //       status: "First Round",
    //       expPayRate: "$65/Hr",
    //       dateAdded: "20 Oct 2023",
    //       source: "Pool",
    //       views: 3,
    //       matchPercentage: 80,
    //       skills: ["Java", ".Net", "SQL"],
    //       jobId: "1234",
    //       jobType: "Remote",
    //       city: "New York"
    //     }
    //   ]
    // },
    // {
    //   id: "manager-round",
    //   label: "Manager Round",
    //   count: 1,
    //   candidates: [
    //     {
    //       id: "10",
    //       name: "Wade Warren",
    //       email: "jeandoe@mail.com",
    //       avatar: "/placeholder.svg",
    //       title: "Senior Java Developer",
    //       status: "Manager Round",
    //       expPayRate: "$65/Hr",
    //       dateAdded: "20 Oct 2023",
    //       source: "Pool",
    //       views: 3,
    //       matchPercentage: 80,
    //       skills: ["Java", ".Net", "SQL"],
    //       jobId: "1234",
    //       jobType: "Remote",
    //       city: "New York"
    //     }
    //   ]
    // },
    // {
    //   id: "onboarded",
    //   label: "Onboarded",
    //   count: 2,
    //   candidates: [
    //     {
    //       id: "11",
    //       name: "Albert Flores",
    //       email: "jeandoe@mail.com",
    //       avatar: "/placeholder.svg",
    //       title: "Senior Java Developer",
    //       status: "Onboarded",
    //       expPayRate: "$65/Hr",
    //       dateAdded: "20 Oct 2023",
    //       source: "Pool",
    //       views: 3,
    //       matchPercentage: 80,
    //       skills: ["Java", ".Net", "SQL"],
    //       jobId: "1234",
    //       jobType: "Remote",
    //       city: "New York"
    //     },
    //     {
    //       id: "12",
    //       name: "Jacob Jones",
    //       email: "jeandoe@mail.com",
    //       avatar: "/placeholder.svg",
    //       title: "Senior Java Developer",
    //       status: "Onboarded",
    //       expPayRate: "$65/Hr",
    //       dateAdded: "20 Oct 2023",
    //       source: "Pool",
    //       views: 3,
    //       matchPercentage: 80,
    //       skills: ["Java", ".Net", "SQL"],
    //       jobId: "1234",
    //       jobType: "Remote",
    //       city: "New York"
    //     }
    //   ]
    // }
  ]
};
