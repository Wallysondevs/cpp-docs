# std::hash&lt;std::chrono::month&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<> struct hash<std::chrono::month>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::month`](<#/doc/chrono/month>) permite aos usuários obter hashes de objetos do tipo [std::chrono::month](<#/doc/chrono/month>). Esta especialização está [habilitada](<#/doc/utility/hash>).

O operator() desta especialização é noexcept.

### Notas

[Macro de teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)