# std::is_unbounded_array

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_unbounded_array;
```

`std::is_unbounded_array` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um [array de tamanho desconhecido](<#/doc/language/array>). Fornece a constante membro `value` que é igual a `true` se `T` for um tipo de array de tamanho desconhecido. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_unbounded_array` ou `std::is_unbounded_array_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_unbounded_array_v = is_unbounded_array<T>::value;  // (desde C++20)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for um tipo de array de tamanho desconhecido, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | `bool`
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    template<class T>
    struct is_unbounded_array: std::false_type {};
    
    template<class T>
    struct is_unbounded_array<T[]> : std::true_type {};
```

---

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_bounded_array_traits`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | [std::is_bounded_array](<#/doc/types/is_bounded_array>), `std::is_unbounded_array`

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    class A {};
    
    static_assert
    (""
        && std::is_unbounded_array_v<A> == false
        && std::is_unbounded_array_v<A[]> == true
        && std::is_unbounded_array_v<A[3]> == false
        && std::is_unbounded_array_v<float> == false
        && std::is_unbounded_array_v<int> == false
        && std::is_unbounded_array_v<int[]> == true
        && std::is_unbounded_array_v<int[3]> == false
    );
    
    int main() {}
```

### Veja também

[is_array](<#/doc/types/is_array>)(desde C++11) | verifica se um tipo é um tipo de array
(template de classe)
[is_bounded_array](<#/doc/types/is_bounded_array>)(desde C++20) | verifica se um tipo é um tipo de array de tamanho conhecido
(template de classe)
[extent](<#/doc/types/extent>)(desde C++11) | obtém o tamanho de um tipo de array ao longo de uma dimensão especificada
(template de classe)