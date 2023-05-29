import React, {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody} from 'reactstrap';
import {Translate} from "react-jhipster";

const LicencesFaq = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const [open, setOpen] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");




  return (
    <>
      <Card> <CardBody>
        <div className="mt-4">
          <h1><Translate  contentKey={"information.titles.faq"}/></h1>
          <Accordion className={"text-justify"} open={open}>
            <AccordionItem onClick={() => {
              open == '1' ? setOpen('') : setOpen("1")
            }}>
              <AccordionHeader targetId="1">
                <Translate contentKey={`information.pageKey.${params.get('pageKey')}.faq.question1`}/>
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Translate contentKey={`information.pageKey.${params.get('pageKey')}.faq.answer1`}/>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem onClick={() => {
              open == '2' ? setOpen('') : setOpen("2")
            }}>
              <AccordionHeader targetId="2"><Translate contentKey={`information.pageKey.${params.get('pageKey')}.faq.question2`}/></AccordionHeader>
              <AccordionBody accordionId="2">
                <Translate contentKey={`information.pageKey.${params.get('pageKey')}.faq.answer2`}/>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem onClick={() => {
              open == '3' ? setOpen('') : setOpen("3")
            }}>
              <AccordionHeader targetId="3"><Translate contentKey={`information.pageKey.${params.get('pageKey')}.faq.question3`}/></AccordionHeader>
              <AccordionBody accordionId="3">
                <Translate contentKey={`information.pageKey.${params.get('pageKey')}.faq.answer3`}/>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>

      </CardBody> </Card>

    </>
  );
};

export default LicencesFaq;
