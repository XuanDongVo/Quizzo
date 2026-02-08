import { Navbar } from "@/components/layout/navbar";
import { HeroBanner } from "@/app/(main)/home/components/HeroBanner";
import { QuizCard } from "@/app/(main)/home/components/QuizCard";
import { SectionHeader } from "@/app/(main)/home/components/SectionHeader";
import { AuthorCard } from "@/app/(main)/home/components/AuthorCard";
import { CollectionCard } from "@/app/(main)/home/components/CollectionCardProps";

const discoverQuizzes = [
  {
    id: 1,
    title: "Get Smarter with Productivity Quizz...",
    author: "Titus Kitamura",
    authorAvatar: "https://i.pravatar.cc/100?img=1",
    questionCount: 16,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Great Ideas Come from Brilliant Min...",
    author: "Athena Schuessler",
    authorAvatar: "https://i.pravatar.cc/100?img=2",
    questionCount: 10,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Master Your Time Management Skills",
    author: "David Chen",
    authorAvatar: "https://i.pravatar.cc/100?img=3",
    questionCount: 12,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Creative Thinking for Beginners",
    author: "Sarah Miller",
    authorAvatar: "https://i.pravatar.cc/100?img=4",
    questionCount: 8,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
  },
];

const topAuthors = [
  { name: "Rayford", avatar: "https://i.pravatar.cc/100?img=11", color: "#6C63FF" },
  { name: "Willard", avatar: "https://i.pravatar.cc/100?img=12", color: "#FF6B6B" },
  { name: "Hannah", avatar: "https://i.pravatar.cc/100?img=13", color: "#4ECDC4" },
  { name: "Geoffrey", avatar: "https://i.pravatar.cc/100?img=14", color: "#FFE66D" },
  { name: "Maria", avatar: "https://i.pravatar.cc/100?img=15", color: "#95E1D3" },
  { name: "James", avatar: "https://i.pravatar.cc/100?img=16", color: "#F38181" },
];

const collections = [
  {
    id: 1,
    title: "Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Games",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Science",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "History",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400&h=250&fit=crop",
  },
];

const trendingQuizzes = [
  {
    id: 1,
    title: "Let's Memorize the Names of Flowers",
    author: "Cyndy Lillbridge",
    authorAvatar: "https://i.pravatar.cc/100?img=21",
    questionCount: 11,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Earth is Our Home and Will Always be",
    author: "Elmer Laverty",
    authorAvatar: "https://i.pravatar.cc/100?img=22",
    questionCount: 20,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Discover the Wonders of Space",
    author: "Mike Johnson",
    authorAvatar: "https://i.pravatar.cc/100?img=23",
    questionCount: 15,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Learn About World Cultures",
    author: "Anna Lee",
    authorAvatar: "https://i.pravatar.cc/100?img=24",
    questionCount: 18,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=300&fit=crop",
  },
];

const topPicks = [
  {
    id: 1,
    title: "Save Life Around, Green Our Earth!",
    author: "Willard Purnell",
    authorAvatar: "https://i.pravatar.cc/100?img=31",
    questionCount: 60,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Play Quizzes, Be Smart & Have Fun!",
    author: "Geoffrey Mott",
    authorAvatar: "https://i.pravatar.cc/100?img=32",
    questionCount: 60,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Unlock Your Creative Potential",
    author: "Lisa Brown",
    authorAvatar: "https://i.pravatar.cc/100?img=33",
    questionCount: 25,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "The Art of Problem Solving",
    author: "Tom Wilson",
    authorAvatar: "https://i.pravatar.cc/100?img=34",
    questionCount: 30,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Hero Banner */}
        <section className="mb-8 md:mb-12">
          <HeroBanner />
        </section>

        {/* Discover Section */}
        <section className="mb-8 md:mb-12">
          <SectionHeader title="Discover" href="/discover" />
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {discoverQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        </section>

        {/* Top Authors Section */}
        <section className="mb-8 md:mb-12">
          <SectionHeader title="Top Authors" href="/authors" />
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2 md:gap-6 lg:gap-8">
            {topAuthors.map((author) => (
              <AuthorCard key={author.name} {...author} />
            ))}
          </div>
        </section>

        {/* Top Collections Section */}
        <section className="mb-8 md:mb-12">
          <SectionHeader title="Top Collections" href="/collections" />
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} {...collection} />
            ))}
          </div>
        </section>

        {/* Trending Quiz Section */}
        <section className="mb-8 md:mb-12">
          <SectionHeader title="Trending Quiz" href="/trending" />
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {trendingQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        </section>

        {/* Top Picks Section */}
        <section className="mb-8 md:mb-12">
          <SectionHeader title="Top Picks" href="/top-picks" />
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {topPicks.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">Q</span>
              </div>
              <span className="text-xl font-bold text-foreground">Quizzo</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 Quizzo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
