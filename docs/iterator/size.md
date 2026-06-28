# std::size, std::ssize

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
constexpr auto size( const C& c ) -> decltype(c.size());
template< class C >
constexpr auto ssize( const C& c )
-> std::common_type_t<std::ptrdiff_t,
std::make_signed_t<decltype(c.size())>>;
template< class T, std::size_t N >
constexpr std::size_t size( const T (&array)[N] ) noexcept;
template< class T, std::ptrdiff_t N >
constexpr std::ptrdiff_t ssize( const T (&array)[N] ) noexcept;
```

Retorna o tamanho do range fornecido.

1,2) Retorna c.size(), convertido para o tipo de retorno se necessário.

3,4) Retorna N.

### Parâmetros

- **c** — um container ou view com uma função membro `size`
- **array** — um array de tipo arbitrário

### Valor de retorno

1) c.size()

2) static_cast<[std::common_type_t](<#/doc/types/common_type>)<[std::ptrdiff_t](<#/doc/types/ptrdiff_t>),
[std::make_signed_t](<#/doc/types/make_signed>)<decltype(c.size())>>>(c.size())

3,4) N

### Exceções

1,2) Pode lançar exceções definidas pela implementação.

### Sobrecargas

Sobrecargas personalizadas de `size` podem ser fornecidas para classes e enumerações que não expõem uma função membro `size()` adequada, mas que podem ser detectadas.

Sobrecargas de `size` encontradas por [argument-dependent lookup](<#/doc/language/adl>) podem ser usadas para personalizar o comportamento de std::[ranges::size](<#/doc/ranges/size>), std::[ranges::ssize](<#/doc/ranges/ssize>), e std::[ranges::empty](<#/doc/ranges/empty>). | (desde C++20)

### Possível implementação

[size (1)](<#/doc/iterator/size>)
```cpp
    template<class C>
    constexpr auto size(const C& c) -> decltype(c.size())
    {
        return c.size();
    }
```

[ssize (2)](<#/doc/iterator/size>)
```cpp
    template<class C>
    constexpr auto ssize(const C& c)
        -> std::common_type_t<std::ptrdiff_t,
                              std::make_signed_t<decltype(c.size())>>
    {
        using R = std::common_type_t<std::ptrdiff_t,
                                     std::make_signed_t<decltype(c.size())>>;
        return static_cast<R>(c.size());
    }
```

[size (3)](<#/doc/iterator/size>)
```cpp
    template<class T, std::size_t N>
    constexpr std::size_t size(const T (&array)[N]) noexcept
    {
        return N;
    }
```

[ssize (4)](<#/doc/iterator/size>)
```cpp
    template<class T, std::ptrdiff_t N>
    constexpr std::ptrdiff_t ssize(const T (&array)[N]) noexcept
    {
        return N;
    }
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_nonmember_container_access`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | `std::size()`, [std::data](<#/doc/iterator/data>) e [std::empty](<#/doc/iterator/empty>)
[`__cpp_lib_ssize`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | `std::ssize()` ([2,4](<#/doc/iterator/size>)) e `std::span::size()` sem sinal

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstring>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        // Funciona com containers
        std::vector<int> v{3, 1, 4};
        assert(std::size(v) == 3);
    
        // E também funciona com arrays embutidos
        int a[]{-5, 10, 15};
        // Retorna o número de elementos (não bytes) em oposição a sizeof
        assert(std::size(a) == 3);
        std::cout << "size of a[]: " << sizeof a << '\n'; // 12, if sizeof(int) == 4
    
        // Fornece uma maneira segura (comparado a sizeof) de obter o tamanho do buffer de string
        const char str[] = "12345";
        // Estes estão corretos e fornecem o resultado correto
        assert(std::size(str) == 6);
        assert(sizeof(str) == 6);
    
        // Mas o uso de sizeof aqui é uma fonte comum de bugs
        const char* str_decayed = "12345";
        // std::cout << std::size(str_decayed) << '\n'; // Falha útil na compilação
        std::cout << sizeof(str_decayed) << '\n'; // Imprime o tamanho do ponteiro!
    
        // Desde C++20, o tamanho com sinal (std::ssize) está disponível
        auto i = std::ssize(v);
        for (--i; i != -1; --i)
            std::cout << v[i] << (i ? ' ' : '\n');
        assert(i == -1);
    
        // Note que o literal de string inclui o caractere nulo final, que
        // fará parte do array de caracteres construído. Isso faz com que std::size
        // se comporte de forma diferente de std::strlen e std::string::size:
        constexpr char symbols[] = "0123456789";
    
        static_assert(std::size(symbols) == 11);
        static_assert(std::string(symbols).size() == 10);
        assert(std::strlen(symbols) == 10);
    }
```

Saída possível:
```
    size of a[]: 12
    8
    4 1 3
```

### Veja também

[ ptrdiff_t](<#/doc/types/ptrdiff_t>) | tipo inteiro com sinal retornado ao subtrair dois ponteiros
(typedef)
[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador `sizeof`
(typedef)
[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro com sinal igual ao tamanho de um range
(objeto de ponto de customização)