# std::hash&lt;std::error_code&gt;

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
template<> struct hash<std::error_code>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::error_code](<#/doc/error/error_code>) permite aos usuários obter hashes de objetos do tipo [std::error_code](<#/doc/error/error_code>).