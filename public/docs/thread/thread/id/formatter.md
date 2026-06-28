# std::formatter&lt;std::thread::id&gt;

Definido no cabeçalho `[<thread>](<#/doc/header/thread>)`

```c
template< class CharT >
struct formatter<std::thread::id, CharT>;
```

A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para a classe [std::thread::id](<#/doc/thread/thread/id>) permite aos usuários converter um identificador de thread para sua representação textual usando [funções de formatação](<#/doc/utility/format>).

### Especificação de Formato

A sintaxe das especificações de formato é:

---
preenchimento-e-alinhamento ﻿(opcional) largura ﻿(opcional)

preenchimento-e-alinhamento e largura têm o mesmo significado que na [especificação de formato padrão](<#/doc/utility/format/formatter>). O alinhamento padrão é `>`.

A saída formatada corresponde à saída de [`operator<<`](<#/doc/thread/thread/id/operator_ltlt>), ajustada conforme apropriado para os especificadores de formato.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_formatters`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | Formatação de `std::thread::id` e std::stacktrace

### Exemplo

Execute este código
```
    #include <format>
    #include <iostream>
    #include <thread>
    
    int main()
    {
        std::thread::id this_id = std::this_thread::get_id();
        std::thread::id null_id;
    
        std::cout << std::format("current thread id: {}\n", this_id);
        std::cout << std::format("{:=^10}\n", null_id);
    }
```

Saída possível:
```
    current thread id: 140046396632256
    ====0=====
```

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)