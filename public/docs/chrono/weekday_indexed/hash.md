# std::hash&lt;std::chrono::weekday_indexed&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<> struct hash<std::chrono::weekday_indexed>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::weekday_indexed`](<#/doc/chrono/weekday_indexed>) permite aos usuários obter hashes de objetos do tipo [std::chrono::weekday_indexed](<#/doc/chrono/weekday_indexed>). Esta especialização está [habilitada](<#/doc/utility/hash>).

O operator() desta especialização é noexcept.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a hashing para classes de valor `std::chrono`

### Ver também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(template de classe)