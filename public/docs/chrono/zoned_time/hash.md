# std::hash&lt;std::chrono::zoned_time&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Duration, class TimeZonePtr >
struct hash<std::chrono::zoned_time<Duration, TimeZonePtr>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::zoned_time`](<#/doc/chrono/zoned_time>) permite aos usuários obter hashes de objetos do tipo [std::chrono::zoned_time](<#/doc/chrono/zoned_time>)<Duration, TimeZonePtr>. Esta especialização é [habilitada](<#/doc/utility/hash>) se e somente se ambos [std::hash](<#/doc/utility/hash>)&lt;Duration&gt; e [std::hash](<#/doc/utility/hash>)&lt;TimeZonePtr&gt; estiverem habilitados.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(class template)