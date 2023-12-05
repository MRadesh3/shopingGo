import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "@constants";

const FAQS = () => {
  return (
    <div>
      {faqs.map((item) => (
        <div key={item.question}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <b>{item.question}</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}

      <style>
        {`
            .css-ahj2mt-MuiTypography-root{
                font-family: Satoshi,sans-serif;
              
            }
        `}
      </style>
    </div>
  );
};

export default FAQS;
