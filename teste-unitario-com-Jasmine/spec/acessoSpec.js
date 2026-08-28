describe("Módulo de Acesso", function () {
  it("deve identificar uma pessoa de 18 anos como maior de idade", function () {
    expect(verificarMaioridade(18)).toBe("Maior Idade");
  });

  it("deve identificar uma pessoa acima de 18 anos como maior de idade", function () {
    expect(verificarMaioridade(25)).toBe("Maior Idade");
  });

  it("deve identificar uma pessoa abaixo de 18 anos como menor de idade", function () {
    expect(verificarMaioridade(17)).toBe("Menor Idade");
  });

  it("deve identificar uma pessoa de 10 anos como menor de idade", function () {
    expect(verificarMaioridade(10)).toBe("Menor Idade");
  });

  it("deve considerar 18 anos como limite para maioridade", function () {
    expect(verificarMaioridade(18)).not.toBe("Menor Idade");
  });
});
