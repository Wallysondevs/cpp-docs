# std::ranges::elements_of

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::range R, class Allocator = std::allocator<std::byte> >
struct elements_of;
```

Encapsula um [`range`](<#/doc/ranges/range>). Especializações de `elements_of` atuam como uma tag em conjuntos de sobrecarga para desambiguar quando um range deve ser tratado como uma sequência em vez de um único valor.

### Parâmetros de template

- **R** — um tipo que satisfaz [`range`](<#/doc/ranges/range>)
- **Allocator** — um tipo de allocator que atende aos requisitos de [Allocator](<#/doc/named_req/Allocator>)

### Membros de dados

Nome do membro | Definição
---|---
range | um range do tipo `R`
(objeto membro público)
allocator | um allocator do tipo `Allocator`. Possui um inicializador de membro padrão que o inicializa por valor
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.

### Guia de dedução

```cpp
template< class R, class Allocator = std::allocator<std::byte> >
elements_of( R&&, Allocator = Allocator() ) -> elements_of<R&&, Allocator>;  // (desde C++23)
```

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <generator>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    template<bool Elementwise>
    std::generator<std::any> gen(std::ranges::input_range auto&& r)
    {
        if constexpr (Elementwise)
            co_yield std::ranges::elements_of(r); // produz cada elemento de r
        else
            co_yield r;                           // produz r como um único valor
    }
    
    int main()
    {
        auto test = std::string_view{"test"};
    
        for (std::any a : gen<true>(test))
            std::cout << '' << [std::any_cast<char>(a) << "] ";
        std::cout << '\n';
    
        for (std::any a : gen<false>(test))
            std::cout << '' << [std::any_cast<std::string_view>(a) << "] ";
        std::cout << '\n';
    }
```

Saída:
```
    [t] [e] [s] [t] 
    [test]
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 26.5.6 Class template elements_of [range.elementsof]
