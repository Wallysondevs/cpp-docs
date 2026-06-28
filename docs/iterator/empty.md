# std::empty

Definido no header `[<array>](<#/doc/header/array>)`

```cpp
Definido no header `<deque>`
Definido no header `<flat_map>`
Definido no header `<flat_set>`
Definido no header `<forward_list>`
Definido no header `<inplace_vector>`
Definido no header `<iterator>`
Definido no header `<list>`
Definido no header `<map>`
Definido no header `<regex>`
Definido no header `<set>`
Definido no header `<span>`
Definido no header `<string>`
Definido no header `<string_view>`
Definido no header `<unordered_map>`
Definido no header `<unordered_set>`
Definido no header `<vector>`
template< class C >
constexpr auto empty( const C& c ) -> decltype(c.empty());  // (1) (desde C++17)
template< class T, std::size_t N >
constexpr bool empty( const T (&array)[N] ) noexcept;  // (2) (desde C++17)
template< class E >
constexpr bool empty( std::initializer_list<E> il ) noexcept;  // (3) (desde C++17)
```

Retorna se o range fornecido está vazio.

1) Retorna c.empty().

2) Retorna false.

3) Retorna il.size() == 0.

### Parâmetros

- **c** — um container ou view com uma função membro `empty`
- **array** — um array de tipo arbitrário
- **il** — um [std::initializer_list](<#/doc/utility/initializer_list>)

### Valor de retorno

1) c.empty()

2) false

3) il.size() == 0

### Exceções

1) Pode lançar exceções definidas pela implementação.

### Observações

A sobrecarga para [std::initializer_list](<#/doc/utility/initializer_list>) é necessária porque ele não possui uma função membro `empty`.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_nonmember_container_access`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | [std::size()](<#/doc/iterator/size>), [std::data()](<#/doc/iterator/data>), e `std::empty()`

### Implementação possível

[Primeira versão](<#/doc/iterator/empty>)
```cpp
    template<class C>
    [[nodiscard]] constexpr auto empty(const C& c) -> decltype(c.empty())
    {
        return c.empty();
    }
```

[Segunda versão](<#/doc/iterator/empty>)
```cpp
    template<class T, std::size_t N>
    [[nodiscard]] constexpr bool empty(const T (&array)[N]) noexcept
    {
        return false;
    }
```

[Terceira versão](<#/doc/iterator/empty>)
```cpp
    template<class E>
    [[nodiscard]] constexpr bool empty(std::initializer_list<E> il) noexcept
    {
        return il.size() == 0;
    }
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    template<class T>
    void print(const T& container)
    {
        if (std::empty(container))
            std::cout << "Empty\n";
        else
        {
            std::cout << "Elements:";
            for (const auto& element : container)
                std::cout << ' ' << element;
            std::cout << '\n';
        }
    }
    
    int main()
    {
        std::vector<int> c = {1, 2, 3};
        print(c);
        c.clear();
        print(c);
    
        int array[] = {4, 5, 6};
        print(array);
    
        auto il = {7, 8, 9};
        print(il);
    }
```

Saída:
```
    Elements: 1 2 3
    Empty
    Elements: 4 5 6
    Elements: 7 8 9
```

### Veja também

[ ranges::empty](<#/doc/ranges/empty>)(C++20) | verifica se um range está vazio
(objeto de ponto de customização)