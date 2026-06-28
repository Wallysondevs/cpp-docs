# Guias de dedução para std::array

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
template< class T, class... U >
array( T, U... ) -> array<T, 1 + sizeof...(U)>;
```

Um [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::array](<#/doc/container/array>) para oferecer um equivalente a [std::experimental::make_array](<#/doc/experimental/make_array>) para a construção de `std::array` a partir de um [pacote de parâmetros variádicos](<#/doc/language/parameter_pack>).

O programa é malformado se ([std::is_same_v](<#/doc/types/is_same>)<T, U> && ...) não for verdadeiro. Note que ([std::is_same_v](<#/doc/types/is_same>)<T, U> && ...) é verdadeiro quando sizeof...(U) é zero.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <array>
    #include <cassert>
    #include <type_traits>
    
    int main()
    {
        const int x = 10;
        std::array a{1, 2, 3, 5, x}; // OK, cria std::array<int, 5>
        assert(a.back() == x);
    
    //  std::array b{1, 2u}; // Erro, todos os argumentos devem ter o mesmo tipo
    
    //  std::array<short> c{3, 2, 1}; // Erro, número incorreto de argumentos de template
        std::array c{std::to_array<short>({3, 2, 1})}; // Recurso do C++20
        assert(std::ranges::equal(c, std::array{3, 2, 1}));
        static_assert(std::is_same_v<short, decltype(c)::value_type>);
    }
```