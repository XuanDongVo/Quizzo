export default function CollectionCard({ collection }: any) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg bg-card hover:scale-105 transition">
      <div className={`${collection.image} h-40`} />
      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold">{collection.title}</h3>
        <p className="text-sm text-muted-foreground">
          {collection.count} quizzes
        </p>
      </div>
    </div>
  );
}
