# std::hash&lt;std::chrono::weekday_last&gt;

Definido no header `[<chrono>](<#/doc/header/chrono>)`

```cpp
template<> struct hash<std::chrono::weekday_last>;  // (desde C++26)
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::weekday_last`](<#/doc/chrono/weekday_last>) permite aos usuários obter hashes de objetos do tipo [std::chrono::weekday_last](<#/doc/chrono/weekday_last>). Esta especialização está [habilitada](<#/doc/utility/hash>).

O operator() desta especialização é noexcept.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [Hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(class template)