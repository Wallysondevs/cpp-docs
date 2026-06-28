# std::hash&lt;std::chrono::weekday&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<> struct hash<std::chrono::weekday>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::weekday`](<#/doc/chrono/weekday>) permite aos usuários obter hashes de objetos do tipo [std::chrono::weekday](<#/doc/chrono/weekday>). Esta especialização está [habilitada](<#/doc/utility/hash>).

O operator() desta especialização é noexcept.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)