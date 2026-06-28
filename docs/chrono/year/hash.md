# std::hash&lt;std::chrono::year&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<> struct hash<std::chrono::year>;
```

  
A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::year`](<#/doc/chrono/year>) permite aos usuários obter hashes de objetos do tipo [std::chrono::year](<#/doc/chrono/year>). Esta especialização está [habilitada](<#/doc/utility/hash>). 

O operator() desta especialização é noexcept.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [Hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`   
  
### Veja também

[ hash](<#/doc/utility/hash>)(C++11) |  objeto de função hash   
(modelo de classe)  