# std::rank

Definido no cabeçalho `<type_traits>`

```c
template< class T >
struct rank;
```

Se `T` for um tipo array, fornece a constante membro value igual ao número de dimensões do array. Para qualquer outro tipo, value é ​0​.

Se o programa adicionar especializações para `std::rank` ou `std::rank_v`(desde C++17), o comportamento é indefinido.

### Template de variável auxiliar

```cpp
template< class T >
constexpr std::size_t rank_v = rank<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | o número de dimensões de `T` ou zero
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | [std::size_t](<#/doc/types/size_t>)
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>

### Implementação possível
```cpp
    template<class T>
    struct rank : public std::integral_constant<std::size_t, 0> {};
    
    template<class T>
    struct rank<T[]> : public std::integral_constant<std::size_t, rank<T>::value + 1> {};
    
    template<class T, std::size_t N>
    struct rank<T[N]> : public std::integral_constant<std::size_t, rank<T>::value + 1> {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    static_assert(std::rank<int>{} == 0);
    static_assert(std::rank<int[5]>{} == 1);
    static_assert(std::rank<int[5][5]>{} == 2);
    static_assert(std::rank<int[][5][5]>{} == 3);
    
    int main()
    {
        [[maybe_unused]] int ary[][3] = {{1, 2, 3}};
    
        // O rank de um tipo de referência, por exemplo, ary[0], que é int(&)[3], é 0:
        static_assert(std::rank_v<decltype(ary[0])> == 0);
        static_assert(std::is_same_v<decltype(ary[0]), int(&)[3]>);
    
        // A solução é remover o tipo de referência.
        static_assert(std::rank_v<std::remove_cvref_t<decltype(ary[0])>> == 1);
    }
```

### Veja também

[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(template de classe)
[ extent](<#/doc/types/extent>)(C++11) | obtém o tamanho de um tipo array ao longo de uma dimensão especificada
(template de classe)
[ remove_extent](<#/doc/types/remove_extent>)(C++11) | remove uma extensão do tipo array fornecido
(template de classe)
[ remove_all_extents](<#/doc/types/remove_all_extents>)(C++11) | remove todas as extensões do tipo array fornecido
(template de classe)