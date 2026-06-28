# std::ranges::subrange_kind

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
enum class subrange_kind : bool {
unsized,
sized
};
```

Especifica se um [std::ranges::subrange](<#/doc/ranges/subrange>) modela [std::ranges::sized_range](<#/doc/ranges/sized_range>) ou não.

### Constantes

Nome | Explicação
---|---
`unsized` | especifica que o `subrange` não modela [`sized_range`](<#/doc/ranges/sized_range>)
`sized` | especifica que o `subrange` modela [`sized_range`](<#/doc/ranges/sized_range>)