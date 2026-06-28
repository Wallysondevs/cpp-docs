# std::is_bounded_array

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_bounded_array;
```

`std::is_bounded_array` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo array de tamanho conhecido. Fornece a constante membro `value` que é igual a true, se `T` for um tipo array de tamanho conhecido. Caso contrário, `value` é igual a false.

Se o programa adicionar especializações para `std::is_bounded_array` ou `std::is_bounded_array_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_bounded_array_v = is_bounded_array<T>::value;  // (desde C++20)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo array de tamanho conhecido, false caso contrário
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
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Implementação possível
```cpp
    template<class T>
    struct is_bounded_array : std::false_type {};
    
    template<class T, std::size_t N>
    struct is_bounded_array<T[N]> : std::true_type {};
```

---

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_bounded_array_traits`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | `std::is_bounded_array`, [std::is_unbounded_array](<#/doc/types/is_unbounded_array>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    #define OUT(...) std::cout << #__VA_ARGS__ << " : " << __VA_ARGS__ << '\n'
    
    class A {};
    
    int main()
    {
        std::cout << std::boolalpha;
        OUT(std::is_bounded_array_v<A>);
        OUT(std::is_bounded_array_v<A[]>);
        OUT(std::is_bounded_array_v<A[3]>);
        OUT(std::is_bounded_array_v<float>);
        OUT(std::is_bounded_array_v<int>);
        OUT(std::is_bounded_array_v<int[]>);
        OUT(std::is_bounded_array_v<int[3]>);
    }
```

Saída:
```
    std::is_bounded_array_v<A> : false
    std::is_bounded_array_v<A[]> : false
    std::is_bounded_array_v<A[3]> : true
    std::is_bounded_array_v<float> : false
    std::is_bounded_array_v<int> : false
    std::is_bounded_array_v<int[]> : false
    std::is_bounded_array_v<int[3]> : true
```

### Veja também

[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(modelo de classe)
[ is_unbounded_array](<#/doc/types/is_unbounded_array>)(C++20) | verifica se um tipo é um tipo array de tamanho desconhecido
(modelo de classe)
[ extent](<#/doc/types/extent>)(C++11) | obtém o tamanho de um tipo array ao longo de uma dimensão especificada
(modelo de classe)