# std::hash&lt;std::chrono::month_weekday_last&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<> struct hash<std::chrono::month_weekday_last>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::month_weekday_last`](<#/doc/chrono/month_weekday_last>) permite aos usuários obter hashes de objetos do tipo [std::chrono::month_weekday_last](<#/doc/chrono/month_weekday_last>). Esta especialização é [habilitada](<#/doc/utility/hash>).

O operator() desta especialização é noexcept.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [Hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
---|---
(template de classe) |