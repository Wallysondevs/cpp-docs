# std::hash&lt;std::chrono::leap_second&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<> struct hash<std::chrono::leap_second>;
```

  
A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::leap_second`](<#/doc/chrono/leap_second>) permite que usuários obtenham hashes de objetos do tipo [std::chrono::leap_second](<#/doc/chrono/leap_second>). Esta especialização está [habilitada](<#/doc/utility/hash>). 

O operator() desta especialização é noexcept.

### Notas

Macro de teste de recurso  | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [Hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`   
  
### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash   
(class template)  