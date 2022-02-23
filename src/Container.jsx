import { useState, useCallback, useEffect } from "react";
import { ListItem } from "./Card";
import { Box } from "@mui/material";
import update from "immutability-helper";

export const Container = () => {
  {
    const [cards, setCards] = useState([]);

    useEffect(
      () =>
        (async () => {
          const response = await fetch(
            "https://api.mockaroo.com/api/becb10e0?count=10&key=256fc480"
          );
          const data = await response.json();
          setCards(data);
        })(),
      []
    );

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]]
          ]
        })
      );
    }, []);
    const renderCard = useCallback((card, index) => {
      return (
        <ListItem
          key={card._id.$oid}
          index={index}
          id={card.id}
          text={card.firstName}
          moveCard={moveCard}
        />
      );
    }, []);

    return (
      <>
        <Box sx={{ width: 200 }}>
          {cards.map((card, i) => renderCard(card, i))}
        </Box>
      </>
    );
  }
};
