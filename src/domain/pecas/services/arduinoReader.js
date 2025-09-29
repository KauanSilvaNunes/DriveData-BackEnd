const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const automovelRepository = require("../repositorys/automovelRepository");

// Porta do Arduino
const port = new SerialPort({
  path: "COM4",
  baudRate: 250000
});

// Parser para ler linhas inteiras
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", async (data) => {
  try {
    const incremento4 = parseInt(data.trim());
    if (isNaN(incremento4)) return;

    const ID_Autenticaco = 1;
    const ID_Automovel = 1; // ajuste conforme veículo
    const automovel = await automovelRepository.buscarAutomoveisPorID(ID_Automovel);
    if (!automovel) return console.log("Automóvel não encontrado");

    // Converter para km (ajuste o divisor conforme necessidade)
    const incrementoKm = incremento4 / 10 ;

    // Somar à quilometragem atual
    const novaQuilometragem = (automovel.quilometragem || 0) + incrementoKm;

    await automovelRepository.atualizarAutomovel({
      ID:ID_Automovel,
      ID_Autenticacao:ID_Autenticaco,
      nome_automovel: automovel.nome_automovel,
      ID_Icone: automovel.ID_Icone,
      quilometragem: novaQuilometragem
    });

    console.log(`Atualizado: +${incrementoKm.toFixed(2)} km | Total: ${novaQuilometragem} km`);
  } catch (err) {
    console.error("Erro ao processar dados do Arduino:", err);
  }
});

port.on("open", () => {
  console.log("Conexão Serial com Arduino aberta!");
});
