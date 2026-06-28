# std::hash&lt;std::stacktrace_entry&gt;

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
template<> struct hash<std::stacktrace_entry>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para std::stacktrace_entry permite aos usuários obter hashes de valores do tipo std::stacktrace_entry.

O `operator()` desta especialização é `noexcept`.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)
[ std::hash<std::basic_stacktrace>](<#/doc/utility/basic_stacktrace/hash>)(C++23) | suporte a hash para [`std::basic_stacktrace`](<#/doc/utility/basic_stacktrace>)
(especialização de modelo de classe)