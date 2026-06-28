# std::hash&lt;std::chrono::month_day&gt;

Definido no header `[<chrono>](<#/doc/header/chrono>)`

```cpp
template<> struct hash<std::chrono::month_day>;  // (desde C++26)
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::month_day`](<#/doc/chrono/month_day>) permite aos usuários obter hashes de objetos do tipo [std::chrono::month_day](<#/doc/chrono/month_day>). Esta especialização é [habilitada](<#/doc/utility/hash>).

O operator() desta especialização é noexcept.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [Hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)