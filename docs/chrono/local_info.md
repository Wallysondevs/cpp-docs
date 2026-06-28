# std::chrono::local_info

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
struct local_info;
```

A classe `local_info` descreve o resultado da conversão de um `std::chrono::local_time` para um `std::chrono::sys_time`.

  * Se o resultado da conversão for único, então `result == local_info::unique`, `first` é preenchido com o `std::chrono::sys_info` correto, e `second` é inicializado com zero.
  * Se o `local_time` for inexistente, então `result == local_info::nonexistent`, `first` é preenchido com o `std::chrono::sys_info` que termina imediatamente antes do `local_time`, e `second` é preenchido com o `std::chrono::sys_info` que começa imediatamente após o `local_time`.
  * Se o `local_time` for ambíguo, então `result == local_info::ambiguous`, `first` é preenchido com o `std::chrono::sys_info` que termina imediatamente após o `local_time`, e `second` é preenchido com o `std::chrono::sys_info` que começa imediatamente antes do `local_time`.

Esta é uma estrutura de dados de baixo nível; conversões típicas de `local_time` para `sys_time` a utilizarão implicitamente em vez de explicitamente.

### Constantes Membro

Nome | Valor
---|---
constexpr int unique[static] | ​0​
(constante membro estática pública)
constexpr int nonexistent[static] | 1
(constante membro estática pública)
constexpr int ambiguous[static] | 2
(constante membro estática pública)

### Objetos Membro

Objeto Membro | Tipo
---|---
`result` | int
`first`, `second` | `std::chrono::sys_info`

### Funções Não-Membro

[ operator<<](<#/doc/chrono/local_info/operator_ltlt>)(C++20) | envia um `local_info` para um stream
(modelo de função)

### Classes Auxiliares

[ std::formatter<std::chrono::local_info>](<#/doc/chrono/local_info/formatter>)(C++20) | suporte de formatação para `local_info`
(especialização de modelo de classe)