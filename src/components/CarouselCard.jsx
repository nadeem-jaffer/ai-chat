import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
//import { primary } from "@mui/joy/colors";

//const primarie = primary[500]; // #f44336

export default function CarouselCard({ imgURL }) {
  return (
    <Card variant="outlined" sx={{ bgcolor: "black" }}>
      <CardContent>
        <img src={imgURL} className="cardImg" />
      </CardContent>
    </Card>
  );
}
