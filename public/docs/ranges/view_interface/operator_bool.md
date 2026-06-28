# std::ranges::view_interface&lt;D&gt;::operator bool

```cpp
constexpr explicit operator bool() requires /* see below */;  // (1) (desde C++20)
constexpr explicit operator bool() const requires /* see below */;  // (2) (desde C++20)
```

  
A implementação padrão da função membro operator bool verifica se a view não está vazia. Ela torna o tipo derivado [contextualmente conversível para bool](<#/doc/language/implicit_cast>). 

1) Seja `derived` igual a static_cast<D&>(*this). A expressão na cláusula requires é igual a requires { [ranges::empty](<#/doc/ranges/empty>)(derived); }, e o corpo da função é equivalente a return ![ranges::empty](<#/doc/ranges/empty>)(derived);.

2) O mesmo que (1), exceto que `derived` é static_cast&lt;const D&&gt;(*this).

### Parâmetros

(nenhum) 

### Valor de retorno

false se o valor do tipo derivado estiver vazio (determinado por [std::ranges::empty](<#/doc/ranges/empty>)), true caso contrário. 

### Observações

Em C++20, nenhum tipo derivado de [std::ranges::view_interface](<#/doc/ranges/view_interface>) na standard library fornece seu próprio operator bool. Quase todos esses tipos usam a implementação padrão. 

Uma exceção notável é [std::ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>). Como seu tipo de iterator nunca satisfaz [`forward_iterator`](<#/doc/iterator/forward_iterator>), a view não pode usar o operator bool herdado. 

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        const std::array<int, 5> ints {0, 1, 2, 3, 4};
        auto odds = ints | std::views::filter( { return 0 != i % 2; });
        auto negs = ints | std::views::filter( { return i < 0; });
        std::cout << std::boolalpha
                  << "Has odd numbers: " << (!!odds) << ' ' << '\n'
                  << "Has negative numbers: " << (!!negs) << ' ' << '\n';
    }
```

Saída: 
```
    Has odd numbers: true
    Has negative numbers: false
```

### Ver também

[ ranges::empty](<#/doc/ranges/empty>)(C++20) | verifica se um range está vazio  
(objeto de ponto de customização)  
[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio   
(function template)