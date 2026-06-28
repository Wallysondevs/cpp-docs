# std::hash&lt;std::chrono::day&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<> struct hash<std::chrono::day>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::day`](<#/doc/chrono/day>) permite aos usuários obter hashes de objetos do tipo [std::chrono::day](<#/doc/chrono/day>). Esta especialização está [habilitada](<#/doc/utility/hash>).

O operator() desta especialização é noexcept.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [Hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)