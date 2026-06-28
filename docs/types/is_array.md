# std::is_array

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_array;
```

`std::is_array` é um [`UnaryTypeTrait`](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo array. Fornece a constante membro `value` que é igual a true, se `T` for um tipo array. Caso contrário, `value` é igual a false.

Se o programa adicionar especializações para `std::is_array` ou `std::is_array_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo para verificar

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_array_v = is_array<T>::value;  // (desde C++17)
```

## Herdado de [`std::integral_constant`](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo array, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [`std::integral_constant`](<#/doc/types/integral_constant>)<bool, value>

### Implementação possível
```cpp
    template<class T>
    struct is_array : std::false_type {};
    
    template<class T>
    struct is_array<T[]> : std::true_type {};
    
    template<class T, std::size_t N>
    struct is_array<T[N]> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <type_traits>
    
    class A {};
    static_assert(std::is_array<A>::value == false);
    static_assert(std::is_array<A[]>::value == true);
    static_assert(std::is_array<A[3]>::value == true);
    
    static_assert(std::is_array<float>::value == false);
    static_assert(std::is_array<int>::value == false);
    static_assert(std::is_array<int[]>::value == true);
    static_assert(std::is_array<int[3]>::value == true);
    static_assert(std::is_array<std::array<int, 3>>::value == false);
    
    int main() {}
```

### Veja também

[`is_bounded_array`](<#/doc/types/is_bounded_array>)(C++20) | verifica se um tipo é um tipo array com limite conhecido
(template de classe)
[`is_unbounded_array`](<#/doc/types/is_unbounded_array>)(C++20) | verifica se um tipo é um tipo array com limite desconhecido
(template de classe)
[`rank`](<#/doc/types/rank>)(C++11) | obtém o número de dimensões de um tipo array
(template de classe)
[`extent`](<#/doc/types/extent>)(C++11) | obtém o tamanho de um tipo array ao longo de uma dimensão especificada
(template de classe)
[`remove_extent`](<#/doc/types/remove_extent>)(C++11) | remove uma extensão do tipo array fornecido
(template de classe)
[`remove_all_extents`](<#/doc/types/remove_all_extents>)(C++11) | remove todas as extensões do tipo array fornecido
(template de classe)