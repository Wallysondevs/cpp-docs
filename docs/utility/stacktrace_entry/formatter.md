# std::formatter&lt;std::stacktrace_entry&gt;

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
template<>
struct formatter<std::stacktrace_entry>;
```

A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para `std::stacktrace_entry` permite aos usuários converter um objeto de entrada de stacktrace para string usando [funções de formatação](<#/doc/utility/format>) como [std::format](<#/doc/utility/format/format>).

### Especificação de formato

A sintaxe das especificações de formato é:

---
fill-and-align ﻿(opcional) width ﻿(opcional)

`fill-and-align` e `width` têm o mesmo significado que na [especificação de formato padrão](<#/doc/utility/format/formatter>).

A saída formatada corresponde ao resultado de [`to_string`](<#/doc/utility/stacktrace_entry/to_string>), ajustada conforme apropriado para os especificadores de formato.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(modelo de classe)
[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando a representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)