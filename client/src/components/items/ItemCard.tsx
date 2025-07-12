
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, User } from 'lucide-react';

interface ItemCardProps {
  item: {
    _id: string;
    title: string;
    category: string;
    size: string;
    condition: string;
    points: number;
    images: string[];
    owner: {
      name: string;
      email: string;
    };
  };
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={item.images[0] || '/placeholder.svg'} 
            alt={item.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Badge className="absolute top-2 left-2">
            {item.points} pts
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="text-xs">
              {item.category}
            </Badge>
            <span>Size {item.size}</span>
            <span>•</span>
            <span>{item.condition}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="w-3 h-3" />
              {item.owner.name}
            </div>
            <Button asChild size="sm">
              <Link to={`/item/${item._id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
