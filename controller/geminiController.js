const prompts = {
  table:
    'Extraia a tabela dessa imagem. O texto é em PT-BR. Identifique a posição de cada item na tabela como se fosse um excel. Colunas usarão letras em ordem crescente. Linhas usarão números em ordem crescente. Use essa identificação como prefixo de cada item. Não organize nem altere a ordem da tabela. Apresente o resultado por linhas. Separe cada item com uma "|". No início do Output, contabilize o número total de colunas e de linhas. Exemplo: colunas:3|linhas:2|A1-Vitamina A|B1-UL/KG|C1-330000|A2-Vitamina D3|B2-UL/KG|C2-445000',
  list: 'Extraia o texto dessa imagem. O texto é em PT-BR. É uma listagem de produtos. Separe cada item com o caractere "|". Não organize nem altere a ordem dos itens. Não inclua novos itens. Não inclua nenhuma informação adicional. Não omita nenhum item. No início do Output, contabilize o número total de itens. Exemplo: total:5|triguilho|farinha de carne e ossos|farinha de milho moída|farinha de trigo|sulfato de ferro',
  createTable:
    'Extraia o texto dessa imagem. O texto é em PT-BR. Crie uma tabela a partir do texto. A estrutura do texto é o nome de um produto seguido por um valor e sua porcentagem. Em seguida, outro produto seguido por um valor e sua porcentagem. Se não houver nenhuma porcentagem, apenas considere o nome do produto e os valores brutos e exclua a coluna da porcentagem. Cada linha da tabela deverá ser um produto. Em uma coluna, os produtos. Na coluna seguinte, os valores brutos. Na seguinte, se houver porcentagem, os valores em porcentagem.  Identifique a posição de cada item na tabela como se fosse um excel. Colunas usarão letras em ordem crescente. Linhas usarão números em ordem crescente. Use essa identificação como prefixo de cada item. Não organize nem altere a ordem da tabela. Não omita nenhum produto identificado. Apresente o resultado por linhas. Separe cada item com uma "|". No início do Output, contabilize o número total de colunas e de linhas. Exemplo de input: Umidade(max) 110,0g/11,0%-Proteína bruta(min) 270g/27,0%. Output esperado: colunas:3|linhas:2|A1-Umidade(max)|B1-110,0g|C1-11,0%. Exemplo de input sem porcentagem: Vitamina A (min) 20.000 UI, Vitamina D3 (min) 2.000 UI. Output esperado sem porcentagem: colunas:2|linhas:2|A1-Vitamina A (min)|B1-20.000 UI|A2-Vitamina D3 (min)|B2-2.000 UI',
  text: 'Extraia o texto dessa imagem, como se fosse uma ferramenta de OCR. Não faça nenhuma alteração no texto original. O output deve corresponder ao texto da imagem.',
};

const fs = require('fs');
const officegen = require('officegen');
const SendMail = require('../util/email');

let lastArchive = '';

exports.getGeminiAnswer = async (req, res, next) => {
  const model = require('./../util/geminiModel');

  const { prompt } = req.params;

  const dataObject = {
    inlineData: {
      data: req.file.buffer.toString('base64'),
      mimeType: req.file.mimetype,
    },
  };

  const result = await model.generateContent([prompts[prompt], dataObject]);

  const response = await result.response;

  const text = response.text();

  res.status(200).json({
    status: 'success',
    data: {
      text,
    },
  });
};

exports.sendMail = async (req, res, next) => {
  const { sendToMail: mail } = req.query;
  if (!mail) return next();

  const mailer = new SendMail(mail, 'Documento exportado');

  req.mailer = mailer;

  next();
};

exports.createExport = async (req, res, next) => {
  const { type } = req.params;

  const data = JSON.parse(req.body.data);

  if (lastArchive) {
    fs.unlinkSync(`./${lastArchive}`, (err) =>
      console.log(`${lastArchive}: deleted!`)
    );
    lastArchive = '';
  }

  if (type === 'xlsx') {
    const xlsx = officegen('xlsx');

    const dataArr = JSON.parse(req.body.data);

    xlsx.on('finalize', (written) => {
      console.log('Created XLSX document!');
      lastArchive = sheetName;
      if (req.mailer) req.mailer.send(sheetName);

      setTimeout(() => {
        res.download(`./${sheetName}`);
      }, 2000);
    });

    xlsx.on('error', (err) => console.log(err));

    const sheet = xlsx.makeNewSheet();
    sheet.name = 'teste';

    dataArr.forEach((data) => {
      sheet.setCell(data.id, data.data);
    });

    const sheetName = `sheet-${Date.now()}.xlsx`;

    const output = fs.createWriteStream(sheetName);

    output.on('error', (err) => console.log(err));

    xlsx.generate(output);
  }

  if (type === 'docx') {
    const docx = officegen('docx');

    docx.on('finalize', () => {
      console.log('Docx created!');
      lastArchive = docName;
      if (req.mailer) req.mailer.send(docName);
      setTimeout(() => {
        res.download(`./${docName}`);
      }, 2000);
    });

    data.forEach((item) => {
      const paragraph = docx.createListOfDots();
      paragraph.addText(item);
    });

    const docName = `output-${Date.now()}.docx`;

    const out = fs.createWriteStream(docName);

    await docx.generate(out);
  }
};
