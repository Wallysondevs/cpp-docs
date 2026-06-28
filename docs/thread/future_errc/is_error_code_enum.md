# std::is_error_code_enum&lt;std::future_errc&gt;

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
template<>
struct is_error_code_enum<std::future_errc> : std::true_type;
```

Especifica que [`std::future_errc`](<#/doc/thread/future_errc>) é um enum de código de erro. Isso habilita conversões automáticas de [`std::error_code`](<#/doc/error/error_code>).

### Veja também

[`is_error_code_enum`](<#/doc/error/error_code/is_error_code_enum>)(desde C++11) | identifica uma classe como uma enumeração de `error_code`
(class template)