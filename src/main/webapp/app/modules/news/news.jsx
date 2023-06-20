import React from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import {useParams} from "react-router-dom";
import {useAppSelector} from "app/config/store";
import newsData from './newsData';
import {Translate} from "react-jhipster";
const News = () => {
  const {id} = useParams();
  const currentLocale = useAppSelector(state => state.locale.currentLocale);



  const leftContentBenefits ={
    en:[
      "Simplified Application Process: OGR simplifies and digitizes applications, reducing paperwork and hurdles.",
    "Streamlined Monitoring and Inspection: Robust mechanisms ensure compliance, safety, and environmental standards.",
    "Enhanced Transparency and Accountability: Real-time access to licensing information improves trust and accountability.",
    "Efficient Resource Allocation: Enables better planning and utilization of oil and gas reserves.",
    "Facilitates Investment: Attracts foreign investment, fostering confidence and encouraging partnerships.",
    "Promotes Growth and Diversification: Supports innovation, technology transfer, and local talent development.",
  ],
    pt:[
      "Processo de inscrição simplificado: o OGR simplifica e digitaliza os aplicativos, reduzindo a burocracia e os obstáculos.",
      "Monitoramento e inspeção simplificados: Mecanismos robustos garantem conformidade, segurança e padrões ambientais.",
      "Transparência e responsabilidade aprimoradas: o acesso em tempo real às informações de licenciamento aumenta a confiança e a responsabilidade.",
      "Alocação Eficiente de Recursos: Permite um melhor planejamento e utilização das reservas de petróleo e gás.",
      "Facilita o Investimento: Atrai o investimento estrangeiro, fomentando a confiança e incentivando parcerias.",
      "Promove o crescimento e a diversificação: Apoia a inovação, a transferência de tecnologia e o desenvolvimento de talentos locais.",
    ]
}

  return (
    <Container fluid className={"p-4"} >
      <Row>
        <Col md={3} sm={12}>
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h3"><Translate  contentKey={"news.heading"} /></CardTitle>
              <CardText><Translate  contentKey={"news.desc1"} /></CardText>
              <CardText>
                <Translate  contentKey={"news.desc2"} />
              </CardText>
              <ul>
                {currentLocale == 'pt-pt' ?
                  <>
                  {leftContentBenefits.pt?.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </>
                  :
                  <>
                  {leftContentBenefits.en?.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </>
                }

              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">

            <CardBody>
              {currentLocale == "pt-pt"
                  ?

                <>
                  <CardImg top src={newsData.pt[id-1].image} alt="News Image" />
                  <CardTitle tag="h1" className={"mt-1"}>{newsData.pt[id-1]?.title}</CardTitle>
                  {newsData.pt[id-1]?.content.split('\n\n').map((paragraph, index) => (
                    <CardText key={index}>{paragraph}</CardText>
                  ))}
                </>

                :
                <>
                  <CardImg top src={newsData.en[id-1].image} alt="News Image" />
                  <CardTitle tag="h1" className={"mt-1"}>{newsData.en[id-1]?.title}</CardTitle>
                  {newsData.en[id-1]?.content.split('\n\n').map((paragraph, index) => (
                    <CardText key={index}>{paragraph}</CardText>
                  ))}
                </>
              }
            </CardBody>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <h3 className="mb-4"><Translate  contentKey={"news.recent"} /></h3>

          {currentLocale == "pt-pt"
            ?
            <>
              {newsData.pt?.map((news,index)=>(

                  <Card tag={"a"} href={`/news/${index+1}`} className={String(index+1) == id ? "d-none":"mb-3 card-hover3"}>
                    <CardImg top  src={news.image} alt="Recent News Image" />
                    <CardBody>
                      <CardTitle tag="h5">{news.title}</CardTitle>
                    </CardBody>
                  </Card>
                )
              )
              }
            </>
            :
            <>
          {newsData.en?.map((news,index)=>(

            <Card tag={"a"} href={`/news/${index+1}`} className={String(index+1) == id ? "d-none":"mb-3 card-hover3"}>
            <CardImg top  src={news.image} alt="Recent News Image" />
            <CardBody>
            <CardTitle tag="h5">{news.title}</CardTitle>
            </CardBody>
            </Card>
            )
            )
          }
            </>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default News;
