describe("Módulo Calculadora", function () {
  describe("Operação de soma", function () {
    it("deve somar dois números positivos", function () {
      expect(somar(10, 5)).toBe(15);
    });

    it("deve somar números negativos", function () {
      expect(somar(-10, -5)).toBe(-15);
    });

    it("deve retornar o mesmo número ao somar zero", function () {
      expect(somar(10, 0)).toBe(10);
    });
  });

  describe("Operação de subtração", function () {
    it("deve subtrair dois números", function () {
      expect(subtrair(10, 5)).toBe(5);
    });

    it("deve permitir resultado negativo", function () {
      expect(subtrair(5, 10)).toBe(-5);
    });
  });

  describe("Operação de multiplicação", function () {
    it("deve multiplicar dois números", function () {
      expect(multiplicar(10, 5)).toBe(50);
    });

    it("deve retornar zero quando um dos valores for zero", function () {
      expect(multiplicar(10, 0)).toBe(0);
    });
  });

  describe("Operação de divisão", function () {
    it("deve dividir dois números corretamente", function () {
      expect(dividir(10, 2)).toBe(5);
    });

    it("deve retornar resultado decimal quando necessário", function () {
      expect(dividir(5, 2)).toBe(2.5);
    });

    it("deve impedir divisão por zero", function () {
      expect(function () {
        dividir(10, 0);
      }).toThrowError("Não é possível dividir por zero");
    });
  });
});
