import { useState } from "react";
import ListInnerBtn from "../../components/Button/ListInnerBtn";
import { ListWrapper } from "./Style";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ToDoList({ mapdata, update }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //삭제 기능

  return (
    <ListWrapper>
      {mapdata.map((item, idx) => {
        return (
          <Accordion
            key={item.id}
            expanded={expanded === `panel${idx}`}
            onChange={handleChange(`panel${idx}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#4485ff;" }} />}
              aria-controls={`panel${idx}bh-content`}
              id={`panel${idx}bh-header`}
            >
              <Typography
                sx={{
                  width: "33%",
                  flexGrow: 1,
                  color: "#4485ff;",
                  fontFamily: "Pretendard-Medium",
                  fontSize: "1.2rem",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  flexGrow: 0.1,
                  lineHeight: "30px",
                  color: "text.secondary",
                  fontFamily: "Pretendard-ExtraLight",
                  fontSize: "0.9rem",
                }}
              >
                {item.createdAt.slice(0, 10)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingBottom: "8px" }}>
              <Typography
                sx={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "1.1rem",
                }}
              >
                {item.content}
              </Typography>
              <ListInnerBtn contentId={item.id} update={update} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </ListWrapper>
  );
}

export default ToDoList;
