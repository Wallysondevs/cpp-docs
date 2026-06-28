# std::experimental::void_t

Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
template< class... >
using void_t = void;
```

  
Uma metafunção utilitária que mapeia uma sequência de quaisquer tipos para o tipo void.

### Notas

Esta metafunção utilitária é usada em metaprogramação de template para detectar tipos malformados no contexto [SFINAE](<#/doc/language/sfinae>). Primeiramente votada para C++17 como [std::void_t](<#/doc/types/void_t>), ela foi posteriormente adicionada também ao library fundamentals TS como `std::experimental::void_t`, porque é uma dependência do [detection idiom](<#/doc/experimental/is_detected>) e o LFTS v2 é baseado em C++14.

### Veja também

[ void_t](<#/doc/types/void_t>)(C++17) |  template de alias variádico void   
(template de alias)  