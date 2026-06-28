# std::is_fundamental

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_fundamental;
```

`std::is_fundamental` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um [tipo fundamental](<#/doc/language/types>) (isto é, tipo aritmético, void, ou nullptr_t), fornece a constante membro `value` igual a `true`. Para qualquer outro tipo, `value` é `false`.

Se o programa adicionar especializações para `std::is_fundamental` ou `std::is_fundamental_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_fundamental_v = is_fundamental<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` é um tipo fundamental, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    template<class T>
    struct is_fundamental
        : std::integral_constant<
            bool,
            std::is_arithmetic<T>::value ||
            std::is_void<T>::value ||
            std::is_same<std::nullptr_t, typename std::remove_cv<T>::type>::value
            // you can also use 'std::is_null_pointer<T>::value' instead in C++14
    > {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    static_assert(std::is_fundamental_v<int> == true);
    static_assert(std::is_fundamental_v<int&> == false);
    static_assert(std::is_fundamental_v<int*> == false);
    static_assert(std::is_fundamental_v<void> == true);
    static_assert(std::is_fundamental_v<void*> == false);
    static_assert(std::is_fundamental_v<float> == true);
    static_assert(std::is_fundamental_v<float&> == false);
    static_assert(std::is_fundamental_v<float*> == false);
    static_assert(std::is_fundamental_v<std::nullptr_t> == true);
    static_assert(std::is_fundamental_v<std::is_fundamental<int>> == false);
    
    class A {};
    static_assert(std::is_fundamental_v<A> == false);
    static_assert(std::is_fundamental_v<std::is_fundamental<A>::value_type>);
    
    int main() {}
```

### Veja também

[ is_compound](<#/doc/types/is_compound>)(C++11) | verifica se um tipo é um tipo composto
(template de classe)
[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) | verifica se um tipo é um tipo aritmético
(template de classe)
[ is_void](<#/doc/types/is_void>)(C++11) | verifica se um tipo é `void`
(template de classe)
[ is_null_pointer](<#/doc/types/is_null_pointer>)(C++11)(DR*) | verifica se um tipo é [`std::nullptr_t`](<#/doc/types/nullptr_t>)
(template de classe)