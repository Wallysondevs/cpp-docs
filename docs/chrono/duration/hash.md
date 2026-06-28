# std::hash&lt;std::chrono::duration&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Rep, class Period >
struct hash<std::chrono::duration<Rep, Period>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::duration`](<#/doc/chrono/duration>) permite aos usuários obter hashes de objetos do tipo [std::chrono::duration](<#/doc/chrono/duration>)<Rep, Period>. Esta especialização é [habilitada](<#/doc/utility/hash>) se e somente se tanto [std::hash](<#/doc/utility/hash>)&lt;Rep&gt; quanto [std::hash](<#/doc/utility/hash>)&lt;Period&gt; estiverem habilitadas.

### Observações

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a hashing para classes de valor `std::chrono`

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)