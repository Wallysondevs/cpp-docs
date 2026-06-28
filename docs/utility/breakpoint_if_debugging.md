# std::breakpoint_if_debugging

Definido no cabeçalho `[<debugging>](<#/doc/header/debugging>)`

```c
void breakpoint_if_debugging() noexcept;
```

Ponto de interrupção condicional: tenta interromper temporariamente a execução do programa e transferir o controle para o depurador se for capaz de determinar que o depurador está presente. Age como uma no-op (operação nula) caso contrário.

Formalmente, o comportamento desta função é completamente definido pela implementação. Equivalente a if ([std::is_debugger_present](<#/doc/utility/is_debugger_present>)()) [std::breakpoint](<#/doc/utility/breakpoint>)();.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_debugging`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Biblioteca de suporte a depuração
[`202403L`](<#/>) | (C++26) | `std::is_debugger_present` substituível

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ is_debugger_present](<#/doc/utility/is_debugger_present>)(C++26) | verifica se um programa está sendo executado sob o controle de um depurador
(função)
[ breakpoint](<#/doc/utility/breakpoint>)(C++26) | pausa o programa em execução quando chamado
(função)