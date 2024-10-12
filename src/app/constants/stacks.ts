interface StacksType {
  title: string;
  stacks: StackType[];
}

interface StackType {
  title: string;
  url: string;
}

export const Stacks: StacksType[] = [
  {
    title: "Front-end",
    stacks: [
      {
        title: "React",
        url: "https://react.dev/",
      },
      {
        title: "Next.js",
        url: "https://nextjs.org/",
      },
      {
        title: "Typescript",
        url: "https://www.typescriptlang.org/",
      },
      {
        title: "Tailwind CSS",
        url: "https://tailwindcss.com/",
      },
    ],
  },
  {
    title: "Back-end",
    stacks: [
      {
        title: "Node.js",
        url: "https://nodejs.org/",
      },
      {
        title: "Prisma",
        url: "https://www.prisma.io/",
      },
    ],
  },
  {
    title: "Infra",
    stacks: [
      {
        title: "Supabase",
        url: "https://supabase.io/",
      },
      {
        title: "Vercel",
        url: "https://vercel.com/",
      },
    ],
  },
];
