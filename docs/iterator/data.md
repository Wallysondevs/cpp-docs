# std::data

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
Definido no cabeçalho `<deque>`
Definido no cabeçalho `<flat_map>`
Definido no cabeçalho `<flat_set>`
Definido no cabeçalho `<forward_list>`
Definido no cabeçalho `<inplace_vector>`
Definido no cabeçalho `<iterator>`
Definido no cabeçalho `<list>`
Definido no cabeçalho `<map>`
Definido no cabeçalho `<regex>`
Definido no cabeçalho `<set>`
Definido no cabeçalho `<span>`
Definido no cabeçalho `<string>`
Definido no cabeçalho `<string_view>`
Definido no cabeçalho `<unordered_map>`
Definido no cabeçalho `<unordered_set>`
Definido no cabeçalho `<vector>`
template< class C >
constexpr auto data( C& c ) -> decltype(c.data());
template< class C >
constexpr auto data( const C& c ) -> decltype(c.data());
template< class T, std::size_t N >
constexpr T* data( T (&array)[N] ) noexcept;
template< class E >
constexpr const E* data( std::initializer_list<E> il ) noexcept;
```

Retorna um ponteiro para o bloco de memória contendo os elementos do range.

1,2) Retorna c.data().

3) Retorna array.

4) Retorna il.begin().

### Parâmetros

- **c** — um container ou view com uma função membro data()
- **array** — um array de tipo arbitrário
- **il** — um [std::initializer_list](<#/doc/utility/initializer_list>)

### Valor de retorno

1,2) c.data()

3) array

4) il.begin()

### Exceções

1) Pode lançar exceções definidas pela implementação.

### Notas

A sobrecarga para [std::initializer_list](<#/doc/utility/initializer_list>) é necessária porque ele não possui uma função membro `data`.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_nonmember_container_access`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | [std::size()](<#/doc/iterator/size>), `std::data()`, e [std::empty()](<#/doc/iterator/empty>)

### Possível implementação

[Primeira versão](<#/doc/iterator/data>)
```cpp
    template<class C>
    constexpr auto data(C& c) -> decltype(c.data())
    {
        return c.data();
    }
```

[Segunda versão](<#/doc/iterator/data>)
```cpp
    template<class C>
    constexpr auto data(const C& c) -> decltype(c.data())
    {
        return c.data();
    }
```

[Terceira versão](<#/doc/iterator/data>)
```cpp
    template<class T, std::size_t N>
    constexpr T* data(T (&array)[N]) noexcept
    {
        return array;
    }
```

[Quarta versão](<#/doc/iterator/data>)
```cpp
    template<class E>
    constexpr const E* data(std::initializer_list<E> il) noexcept
    {
        return il.begin();
    }
```

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s{"Hello world!\n"};
    
        char a[20]; // armazenamento para uma string estilo C
        std::strcpy(a, std::data(s));
    //  [s.data(), s.data() + s.size()] é garantido ser um NTBS desde C++11
    
        std::cout << a;
    }
```

Saída:
```
    Hello world!
```

### Ver também

[ ranges::data](<#/doc/ranges/data>)(C++20) | obtém um ponteiro para o início de um range contíguo
(objeto de ponto de customização)
[ ranges::cdata](<#/doc/ranges/cdata>)(C++20) | obtém um ponteiro para o início de um range contíguo somente leitura
(objeto de ponto de customização)