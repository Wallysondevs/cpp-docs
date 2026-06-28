# std::hash&lt;std::error_condition&gt;

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
template<> struct hash<std::error_condition>;
```

  
A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::error_condition](<#/doc/error/error_condition>) permite aos usuários obter hashes de objetos do tipo [std::error_condition](<#/doc/error/error_condition>). 