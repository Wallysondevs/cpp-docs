# std::hash&lt;std::text_encoding&gt;

Definido no cabeçalho `[<text_encoding>](<#/doc/header/text_encoding>)`

```c
template<> struct hash<std::text_encoding>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para std::text_encoding permite aos usuários obter hashes do id e nome codificados do tipo std::text_encoding.

O `operator()` desta especialização é noexcept.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)
[ std::hash<std::basic_stacktrace>](<#/doc/utility/basic_stacktrace/hash>)(C++23) | suporte a hash para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>)
(especialização de modelo de classe)